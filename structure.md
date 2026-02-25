# 資料夾結構（可直接打包）

```
competitor-debrief-spec/
  README.md
  spec.md
  structure.md
  roadmap.md
  config/
    config.example.json
  templates/
    report.md.hbs
    layout_summary.md.hbs
  scripts/
    extract_css.js
    extract_palette.py
    extract_layout.js
    build_report.js
    render_pdf.js
  cli/
    index.js
  output/.gitkeep
```

說明：
- `scripts/`：低算力抽取與報告組裝
- `templates/`：報告與摘要模板
- `cli/`：命令列入口
- `config/`：使用者配置（API key、輸入來源）
