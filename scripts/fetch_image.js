// 抓取 og:image 並儲存（低算力）
const https = require('https');
const http = require('http');
const fs = require('fs');

function download(url, outPath) {
  return new Promise((resolve, reject) => {
    const lib = url.startsWith('https') ? https : http;
    lib.get(url, (res) => {
      const file = fs.createWriteStream(outPath);
      res.pipe(file);
      file.on('finish', () => file.close(() => resolve(outPath)));
    }).on('error', reject);
  });
}

module.exports = { download };
