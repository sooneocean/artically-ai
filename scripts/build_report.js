// 報告組裝（示意）
// TODO: 套用 Handlebars 模板

const fs = require('fs');

function buildReport(data, templatePath, outputPath) {
  const tpl = fs.readFileSync(templatePath, 'utf-8');
  let out = tpl;
  Object.keys(data).forEach(k => {
    out = out.replace(new RegExp(`{{${k}}}`, 'g'), data[k] ?? '');
  });
  fs.writeFileSync(outputPath, out);
}

module.exports = { buildReport };
