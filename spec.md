# 競品拆解 Agent — 完整規格（最省算力版）

## 1) 產品定位（貼牌/私有部署）
- **事件型產品**：當「需要理解競品設計/品牌策略」發生時，啟動此 Agent。
- **客戶價值**：快速得到可用的品牌視覺與策略拆解，省去人力研究成本。
- **貼牌模式**：客戶買回去，換品牌名 + API Key 即可使用。

---

## 2) 輸入/輸出定義
### 輸入
- 必填
  - `brand_name`
  - `industry`
  - `urls[]`
- 選填
  - `social_urls[]`（IG/FB/Twitter/YouTube/LinkedIn）
  - `ads_urls[]`（Meta Ads Library / Google Ads 公開頁）

### 輸出
- `report.md`：完整拆解報告
- `report.pdf`：可選
- `assets/`
  - `palette.json` / `palette.svg`
  - `fonts.json`
  - `layout_summary.md`
  - `brand_snapshot.png`（關鍵頁面縮圖）

---

## 3) 最省算力策略（核心設計）
### 優先非 LLM：
1. **HTML/CSS 抽取**
   - 抓取 `color`, `background-color`, `font-family`, `font-weight`
2. **圖像色票抽取**
   - 取 Hero/主視覺圖片 → K-means / median cut
3. **結構解析**
   - 解析 DOM 標籤與 CTA 位置（Hero / CTA / Features / Pricing）
4. **模板化報告**
   - 80% 報告內容由模板 + 抽取資料自動產生

### LLM 只做：
- **10% 內摘要**（定位、語氣、品牌策略結論）
- **關鍵結論**（僅 1~2 段）

---

## 4) 核心流程（Pipeline）
1. **URL 解析器**
   - 抓 HTML / CSS / meta / og tags
2. **色票提取器**
   - DOM 色票 + 圖像主色合併
3. **字體推測器**
   - CSS font-family + fallback 推論
4. **版型分析器**
   - DOM 結構掃描 + CTA 分析
5. **社群/廣告抓取**
   - 只抓公開頁面與預覽圖/標題
6. **報告生成**
   - 模板填充 + LLM 短摘要

---

## 5) 報告模板骨架
### 章節建議
1. 品牌概述（自動填 meta）
2. 競品定位與語氣（LLM 精簡）
3. 視覺識別
   - 色票 / 字體 / 風格
4. 版型與視覺語言
   - Hero / CTA / 版面結構
5. 社群與廣告觀察
6. 設計策略結論（LLM 短結論）

---

## 6) 商業化結構（點數制）
- **一口價購買**：可本地部署 / 下載包
- **訂閱點數**：追加分析次數 / 批次報告
- 企業版：
  - 批次多品牌
  - 內部報告模板定制
  - 自訂品牌資產輸出格式

---

## 7) CLI / Agent 形態
### CLI 參數
```
competitor-agent \
  --brand "XXX" \
  --industry "fashion" \
  --urls "https://a.com,https://b.com" \
  --social "https://instagram.com/xxx" \
  --ads "https://www.facebook.com/ads/library/..."
```

### 輸出目錄
```
output/
  report.md
  report.pdf
  assets/
    palette.json
    palette.svg
    fonts.json
    layout_summary.md
    brand_snapshot.png
```

---

## 8) MVP 里程碑
- **M1 (1-2 週)**：HTML/CSS 抽取 + 色票 + 字體 + MD 報告
- **M2 (3-4 週)**：社群/廣告抓取 + 版型分析
- **M3 (5-6 週)**：PDF 報告 + 封裝 CLI

---

## 9) 貼牌包結構
```
competitor-agent-pack/
  README.md
  config.json
  templates/
  scripts/
  output/
```

---

## 10) 成功指標
- 5 分鐘內產出完整報告
- LLM Token 使用 < 10% 總耗時
- 客戶可直接交付報告給內部/客戶端
