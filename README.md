# 競品拆解 Agent（貼牌版）規格包

本專案為「競品拆解 Agent」的產品化規格，用於 **可貼牌、可複製、可私有部署** 的設計/品牌競品分析。

## 目標
- 讓客戶輸入「網址清單 + 品牌關鍵字」，快速獲得：
  - 競品拆解報告（Markdown / PDF）
  - 設計資產（色票 / 字體 / 版型摘要）
- **最省算力**：以非 LLM 抽取為主，LLM 僅做少量摘要與結論。

## 核心輸入
- **品牌關鍵字**（必填）：name / industry / region
- **網址清單**（必填）：官網/活動頁/落地頁
- **社群來源**（可選）：IG/FB/Twitter/YouTube/LinkedIn
- **廣告來源**（可選）：Meta Ads Library / Google Ads 公開頁面

## 核心輸出
1. **競品拆解報告**
   - Markdown（預設）
   - PDF（可選）
2. **設計資產**
   - 色票（HEX / RGB / LAB）
   - 字體推測（從 CSS / Font-family）
   - 版型摘要（Hero / CTA / Layout 模式）

## 快速啟用
- 只需輸入 API Key（LLM）
- 其他流程採本地解析 / 低成本抓取

---

## 安裝
```bash
# 1) 下載

git clone https://github.com/sooneocean/artically-ai
cd artically-ai

# 2) 確認 Node 與 Python
node -v
python3 --version
```

## 快速開始
```bash
# 先做一次 Onboard（產生 config/config.json）
node ./cli/onboard.js

# 之後執行
node ./cli/index.js ./config/config.json
```

## 輸出
- `output/report.md`
- `output/report.pdf`（若系統有 `npx` 可用）

## ComfyUI（可選）
在 `config/config.json` 內設定：
```json
"comfyui": {
  "enabled": true,
  "base_url": "http://YOUR_COMFYUI_HOST:8188",
  "workflow": "./config/comfyui-workflow.json"
}
```

## 基本測試
```bash
bash ./tests/run_basic_test.sh
```

## FAQ
- **PDF 產出失敗？**
  - 請確認 `npx` 可用（Node 安裝完整）

- **網站抓不到資料？**
  - 該網站可能高度依賴 JS，可改用 headless（後續可擴充）

下一步：請見 `spec.md` 了解完整規格。
