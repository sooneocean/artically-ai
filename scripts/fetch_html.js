// 簡易抓取（無外部依賴，低算力）
const https = require('https');
const http = require('http');

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    const lib = url.startsWith('https') ? https : http;
    lib.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function fetchAll(urls) {
  const out = [];
  for (const u of urls) {
    try {
      const html = await fetchUrl(u);
      out.push({ url: u, html });
    } catch (e) {
      out.push({ url: u, html: '' });
    }
  }
  return out;
}

module.exports = { fetchAll };
