// 版型簡易摘要（示意）
// TODO: DOM 解析 + CTA/Hero 偵測

function extractLayout(html) {
  return {
    hero: 'Detected hero section (placeholder)',
    cta: 'CTA near top fold (placeholder)',
    features: 'Features block present (placeholder)',
    pricing: 'Pricing block unknown (placeholder)'
  };
}

module.exports = { extractLayout };
