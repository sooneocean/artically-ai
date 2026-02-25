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

## 使用方式（MVP）
```bash
# 先做一次 Onboard
node ./cli/onboard.js

# 之後執行
node ./cli/index.js ./config/config.json
```

## ComfyUI（可選）
- 在 `config/config.example.json` 啟用 `comfyui.enabled=true`
- 填入 `base_url` 與 workflow JSON

## 基本測試
```bash
bash ./tests/run_basic_test.sh
```

下一步：請見 `spec.md` 了解完整規格。
