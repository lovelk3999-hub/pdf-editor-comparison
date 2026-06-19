# 09. 配置GA4+Search Console

## 任务描述
配置 Google Analytics 4 和 Google Search Console。

## 详细步骤

### Step 1: GA4
登录 analytics.google.com，获取 Measurement ID（G-XXXXXXXX）
在 templates/base.html 中更新 GA4 ID

### Step 2: 重新生成并部署
python scripts/generate.py
git add .; git commit -m 'feat: add GA4'; git push

### Step 3: Search Console
登录 search.google.com/search-console
添加资源 -> 输入 *.pages.dev 域名 -> DNS验证

### Step 4: 提交 Sitemap
在 Search Console 中提交 sitemap.xml

## 预期产出
- GA4已配置，Search Console已验证

## 完成标准
- [ ] GA4 ID已配置
- [ ] Search Console已验证
- [ ] sitemap已提交
- [ ] 已更新 STATUS.md
- [ ] 本文件已移入 done/
## Checkpoint 规则（重要！）

执行过程中，每完成一步就更新 doing/CHECKPOINT.md：

```markdown
# CHECKPOINT - {时间}
## 当前任务
09-配置GA4+Search Console
## 已完成
- 子步骤1 -> 完成
- 子步骤2 -> 完成
## 下一步
- 下一步操作
## 已产出中间文件
- 位置
```

> 每完成一个子步骤就checkpoint，context压缩时不丢进度。
> 任务全部完成后删除 CHECKPOINT.md，本任务移入 done/。

> **省token提示**: 部署相关的Git操作，用 Shell 直接执行，不需要Agnes。