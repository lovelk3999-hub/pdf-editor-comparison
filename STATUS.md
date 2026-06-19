# 状态 (STATUS) — PDF编辑工具对比

> 最后更新：2026-06-19
> 当前阶段：Phase 1 数据采集（进行中）

---

## 总体进度

| 模块 | 状态 | 备注 |
|------|------|------|
| 方向选定 | ✅ 已完成 | 第6轮实地调研确认 |
| 工具市场名单 | ✅ 已完成 | 确认15个工具 |
| 数据采集-定价 | 🔄 进行中 | 采集合官网定价 |
| 数据采集-功能 | ⏳ 待启动 | 爬工具官网定价/功能 |
| data/tools.json | ⏳ 待启动 | 数据结构参考ai-video-tools-comparison |
| 模板编写 | ⏳ 待启动 | 改base.html/tool.html/compare.html |
| generate.py | ⏳ 待启动 | 改数据源和模板路径 |
| 本地生成 | ⏳ 待启动 | python scripts/generate.py |
| GitHub仓库 | ⏳ 待启动 | 新建仓库 |
| Cloudflare部署 | ⏳ 待启动 | 配置Pages |
| GA4 + Search Console | ⏳ 待启动 | 配置分析工具 |

---

## 待办清单

- [x] 调研 PDF editor 市场，列出首轮15个工具
- [ ] 采集合官网定价数据
- [ ] 采集功能特性 + G2评分 + Reddit讨论
- [ ] 编写 data/tools.json
- [ ] 修改 templates/ 模板（参考 ai-video-tools-comparison）
- [ ] 编写/修改 scripts/generate.py
- [ ] 本地生成测试并检查
- [ ] 创建 GitHub 仓库 + 配置 Cloudflare Pages
- [ ] 首次部署上线
- [ ] 配置 GA4 + Search Console

---

## 已完成

- [x] 01-tools-list.md — 15个工具完整名单（done/01-tools-list.md）

---

## 技术参考
- **参考项目**: E:\\ai\\program\\google seo web\\ai-video-tools-comparison\\
- **生成脚本**: scripts/generate.py
- **数据结构**: data/tools.json
- **模板**: templates/base.html, index.html, tool.html, compare.html
- **部署**: Cloudflare Pages + GitHub main 分支

---

## 已知问题

1. Windows GBK 终端编码 → 文件读写必须 encoding=\"utf-8\"
2. PowerShell 不支持 && → 用 ; 或分多次执行
3. 数据采集可能遇反爬 → 参考 ai-video-tools-comparison 的 Playwright 方案
