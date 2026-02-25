# 技術實現細節（網頁抓取工具選型）

## 抓取策略（低算力優先）
1. **Node 原生 http/https**
   - 直接抓 HTML
   - 避免 headless browser 成本
2. **HTML 解析（正則/輕量）**
   - 抓 `<title>`、`meta description`、`og:image`
3. **CSS/Style 抽取**
   - 從 inline style / style tag 解析顏色與字體
4. **圖片色票抽取**
   - 抓 `og:image` 後用 Pillow 抽取主色

## 可選升級（成本更高）
- Playwright / Puppeteer：用於需 JS 渲染的網站
- cheerio：如需更穩定 HTML DOM 解析
- Readability：輸出更乾淨內容

## 結論
- 預設採「原生抓取 + 低算力分析」
- 只有遇到 JS-heavy 網站才升級 headless
