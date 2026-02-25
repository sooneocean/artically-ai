// 簡易 DOM 結構偵測（低算力）

function detectLayout(html) {
  const has = (kw) => new RegExp(kw, 'i').test(html);
  return {
    hero: has('<header') || has('hero') ? 'Hero section detected' : 'Hero not obvious',
    cta: has('cta') || has('sign up') || has('get started') ? 'CTA detected' : 'CTA not obvious',
    features: has('features') || has('benefits') ? 'Features detected' : 'Features not obvious',
    pricing: has('pricing') || has('plans') ? 'Pricing detected' : 'Pricing not obvious',
  };
}

function extractMeta(html) {
  const title = (html.match(/<title>(.*?)<\/title>/i) || [,''])[1];
  const desc = (html.match(/<meta name="description" content="(.*?)"/i) || [,''])[1];
  const og = (html.match(/<meta property="og:image" content="(.*?)"/i) || [,''])[1];
  return { title, desc, og_image: og };
}

module.exports = { detectLayout, extractMeta };
