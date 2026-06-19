# ROADMAP — PDF编辑工具对比

> 最后更新：2026-06-19
> 目标：建成 PDF编辑工具对比 程序化SEO站，获取Google搜索流量 + AdSense收入

---

## 上下文恢复规则（重要）

**当上下文被压缩或新开会话时：**
1. 读本文件 → 了解项目全局阶段
2. 读 STATUS.md → 了解当前进度
3. 读 doing/ → 检查有无未完成任务
4. 读 todo/ → 获取下一个任务（按编号顺序）
5. 读最新的 done/*.md → 了解最近完成的工作

> 永远不要假设LLM记得任何状态。一切从文件系统恢复。

---

## 总体路线图（6个Phase）

### Phase 0: 方向调研 ✅ 已完成
- 头脑风暴 + pytrends搜索量 + 3层竞品搜索 + 修正评分

### Phase 1: 数据采集（当前阶段）
- [ ] 调研 PDF editor 市场，列出10-15个工具
- [ ] 采集各工具官网定价
- [ ] 采集功能特性 + G2评分 + Reddit讨论
- [ ] 整理成 data/tools.json

### Phase 2: 模板定制
- [ ] 修改 templates/ 四个HTML文件
- [ ] 添加FAQ + JSON-LD结构化数据

### Phase 3: 生成器与测试
- [ ] 修改 scripts/generate.py
- [ ] 本地生成所有页面
- [ ] 检查 sitemap/robots/OG/meta

### Phase 4: 部署上线
- [ ] GitHub仓库 + Cloudflare Pages + CI/CD

### Phase 5: SEO与增长
- [ ] Search Console + GA4 + AdSense + 持续更新

---

## 参考项目
- 完整项目: E:\\ai\\program\\google seo web\\ai-video-tools-comparison\\
- 生成器: scripts/generate.py | 数据结构: data/tools.json | 模板: templates/
