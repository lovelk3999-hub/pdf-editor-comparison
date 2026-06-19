# 10. 申请 Google AdSense

## 任务描述
申请 Google AdSense，在网站中放置广告。

## 详细步骤

### Step 1: 确认条件
- 网站已有内容（工具页+对比页）
- 域名可正常访问
- 有 Privacy Policy 页面（可能需要先创建）

### Step 2: 申请
打开 adsense.google.com
提交网站URL，填写网站信息

### Step 3: 添加广告代码
如审核通过，将广告代码添加到 templates/base.html
重新生成并部署

### Step 4: 等待审核
审核通常1-2周。期间继续完善网站内容。

## 预期产出
- AdSense申请已提交

## 完成标准
- [ ] AdSense申请已提交
- [ ] 广告代码已放置（如通过）
- [ ] 已更新 STATUS.md
- [ ] 本文件已移入 done/
## Checkpoint 规则（重要！）

执行过程中，每完成一步就更新 doing/CHECKPOINT.md：

```markdown
# CHECKPOINT - {时间}
## 当前任务
10-申请 Google AdSense
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

> **省token提示**: 配置GA4/Search Console需要手动操作网页，用 chrome:control-chrome。