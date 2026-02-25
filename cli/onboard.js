#!/usr/bin/env node
// Onboard 一次完成（互動式）
const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const ask = (q) => new Promise(r => rl.question(q, r));

(async () => {
  const brand_name = await ask('品牌名稱：');
  const industry = await ask('產業：');
  const urls = await ask('官網 URL（逗號分隔）：');
  const social = await ask('社群 URL（逗號分隔，可空）：');
  const ads = await ask('廣告 URL（逗號分隔，可空）：');
  const llm_provider = await ask('LLM provider（openai/anthropic/gemini）：');
  const llm_model = await ask('LLM model：');
  const llm_key = await ask('LLM API key：');
  const comfy_enabled = await ask('啟用 ComfyUI？(y/n)：');
  const comfy_url = comfy_enabled.toLowerCase().startsWith('y') ? await ask('ComfyUI base_url：') : '';
  const comfy_workflow = comfy_enabled.toLowerCase().startsWith('y') ? await ask('ComfyUI workflow JSON path：') : '';

  const config = {
    brand_name,
    industry,
    urls: urls.split(',').map(s=>s.trim()).filter(Boolean),
    social_urls: social.split(',').map(s=>s.trim()).filter(Boolean),
    ads_urls: ads.split(',').map(s=>s.trim()).filter(Boolean),
    llm: { provider: llm_provider, model: llm_model, api_key: llm_key },
    comfyui: { enabled: comfy_enabled.toLowerCase().startsWith('y'), base_url: comfy_url, workflow: comfy_workflow },
    output_dir: './output'
  };

  fs.writeFileSync('./config/config.json', JSON.stringify(config, null, 2));
  console.log('已寫入 ./config/config.json');
  rl.close();
})();
