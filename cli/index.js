#!/usr/bin/env node
// CLI 入口（示意）

const fs = require('fs');
const path = require('path');

const { fetchAll } = require('../scripts/fetch_html');
const { extractCSS } = require('../scripts/extract_css');
const { detectLayout, extractMeta } = require('../scripts/analyze_html');
const { buildReport } = require('../scripts/build_report');
const { uniq, toList } = require('../scripts/utils');
const { runComfyUI } = require('../scripts/comfyui_client');
const { download } = require('../scripts/fetch_image');
const { renderPDF } = require('../scripts/render_pdf');
const { summarize } = require('../scripts/llm_summary');
const { execSync } = require('child_process');

const configPath = process.argv[2] || './config/config.example.json';
const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));

const outputDir = config.output_dir || './output';
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

(async () => {
  console.log('Competitor Debrief Agent (MVP)');
  console.log('Brand:', config.brand_name);
  console.log('URLs:', config.urls);

  const pages = await fetchAll(config.urls || []);
  const htmlAll = pages.map(p => p.html).join('\n');

  const css = extractCSS(htmlAll);
  const layout = detectLayout(htmlAll);
  const meta = extractMeta(htmlAll);

  const paletteTable = uniq(css.colors).slice(0, 8).map(c => `- ${c}`).join('\n');
  const fontsList = uniq(css.fonts).slice(0, 8).map(f => `- ${f}`).join('\n');

  // optional comfyui hook
  if (config.comfyui && config.comfyui.enabled) {
    await runComfyUI(config.comfyui.base_url, config.comfyui.workflow);
  }

  // palette from og:image
  let paletteFromImage = [];
  if (meta.og_image) {
    const imgPath = path.join(outputDir, 'og_image.jpg');
    try {
      await download(meta.og_image, imgPath);
      const py = execSync(`python3 ./scripts/extract_palette.py ${imgPath}`).toString();
      paletteFromImage = py.replace(/[\[\]\(\)]/g, '').split(',').map(s => s.trim()).filter(Boolean);
    } catch (e) {}
  }

  const paletteMerged = uniq([...paletteFromImage, ...css.colors]).slice(0, 8);
  const paletteTable = paletteMerged.map(c => `- ${c}`).join('\n');

  const llmSummary = await summarize(meta, layout, paletteMerged);

  const reportData = {
    brand_name: config.brand_name,
    industry: config.industry,
    urls: (config.urls || []).join(', '),
    positioning_summary: llmSummary || `Meta title: ${meta.title}\n\nMeta desc: ${meta.desc}`,
    palette_table: paletteTable || '- (no colors detected)',
    fonts_list: fontsList || '- (no fonts detected)',
    layout_summary: `Hero: ${layout.hero}\nCTA: ${layout.cta}\nFeatures: ${layout.features}\nPricing: ${layout.pricing}`,
    social_ads_notes: (config.social_urls || []).length ? toList(config.social_urls) : '- (not provided)',
    conclusion: '（占位）建議以低成本驗證後續策略。'
  };

  const tpl = path.join(__dirname, '../templates/report.md.hbs');
  const out = path.join(outputDir, 'report.md');
  buildReport(reportData, tpl, out);

  // optional PDF
  const pdfOut = path.join(outputDir, 'report.pdf');
  renderPDF(out, pdfOut);

  console.log('Report generated:', out);
})();
