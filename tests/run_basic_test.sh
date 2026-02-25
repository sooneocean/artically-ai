#!/usr/bin/env bash
set -euo pipefail

ROOT=$(cd "$(dirname "$0")/.." && pwd)
cd "$ROOT"

# 使用 file:// 測試（以本機 HTML 當作輸入）
node ./cli/index.js ./config/config.example.json

echo "Basic test finished. Check output/report.md"
