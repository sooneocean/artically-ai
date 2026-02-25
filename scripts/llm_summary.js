// 低用量 LLM 摘要（占位）
// TODO: 依 provider 呼叫 API

async function summarize(meta, layout, palette) {
  return `（占位）\n- 定位：${meta.title || 'N/A'}\n- 語氣：簡潔、直接\n- 視覺：以 ${palette?.[0] || '主色'} 為主`;
}

module.exports = { summarize };
