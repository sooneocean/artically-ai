// PDF 轉出（示意）
// TODO: 用 markdown -> pdf 工具

const { execSync } = require('child_process');

function renderPDF(mdPath, pdfPath) {
  try {
    execSync(`npx -y md-to-pdf ${mdPath} --output ${pdfPath}`, { stdio: 'ignore' });
    return { ok: true, mdPath, pdfPath };
  } catch (e) {
    return { ok: false, error: e.message };
  }
}

module.exports = { renderPDF };
