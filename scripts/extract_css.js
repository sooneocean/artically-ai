// 低算力 CSS 抽取（示意）
// 目標：抽取常見的 color / background-color / font-family

function extractCSS(html) {
  const colors = new Set();
  const fonts = new Set();
  const colorRegex = /(color|background-color)\s*:\s*([^;]+);/gi;
  const fontRegex = /font-family\s*:\s*([^;]+);/gi;

  let m;
  while ((m = colorRegex.exec(html))) colors.add(m[2].trim());
  while ((m = fontRegex.exec(html))) fonts.add(m[1].trim());

  return { colors: [...colors], fonts: [...fonts] };
}

module.exports = { extractCSS };

