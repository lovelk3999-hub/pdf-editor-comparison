# PDF编辑工具对比 — Agent 工作手册

---

## 启动须知（新接手者必读）

### 恢复状态
按以下顺序恢复项目上下文：
1. `ROADMAP.md` — 了解项目全局
2. `STATUS.md` — 了解当前进度
3. `doing/CHECKPOINT.md` — 如有，从中断处接续
4. `todo/` — 获取下一个任务
5. `done/` 最新文件 — 了解最近完成的工作

### 技能工具 → 自主决策
往下翻，找到**'可用技能与工具清单'**一节。遇到任务需要时，自主判断需要什么能力，从清单中选最合适的工具调用。不需要问用户。

### 核心工作模式
1. **任务驱动**：`todo/`取 → `doing/`移 → 执行 → `done/`移 → 更新 `STATUS.md`
2. **每步Checkpoint**：大任务每完成一个子步骤，更新 `doing/CHECKPOINT.md`
3. **连续执行**：完成一个任务后自动取下一个，不需等待用户指令
4. **只停三种情况**：`todo/`空 / 遇到 [NEEDS_USER] / 用户主动打断

---

## 防止上下文压缩 / 状态持久化

**DeepSeek / Claude 等 LLM 在长对话中会压缩上下文，导致丢失项目状态。** 必须用文件系统持久化状态：

1. **读 STATUS.md** → 了解当前整体进度（每次启动时第一件事）
2. **读 doing/*.md** → 了解当前正在执行的任务
3. **读 todo/*.md** → 了解下一步要做什么（按优先级排列）
4. **写 done/*.md** → 完成任务后归档
5. **更新 DECISIONS.md** → 记录关键决策
6. **更新 STATUS.md** → 每次重大进展后更新状态

> 严格遵守'文件即状态'原则。不要依赖LLM的记忆，每次启动从文件恢复状态。

---

## 项目定位

**PDF编辑工具对比** — 聚合 PDF editor 的定价、功能、评分等公开数据，做中立对比站。

- 不生产原创评测内容
- 只聚合公开数据（官网定价、第三方评分、用户讨论）
- 盈利方式：Google AdSense 广告收入
- 目标流量来源：Google搜索（SEO）
- 参考项目：`E:\ai\program\google seo web\ai-video-tools-comparison\`
- 部署域名：待定（Cloudflare Pages）

### 来源
- **评分**: 第6轮实地调研修正评分 **45.3分**
- **搜索量**: pytrends 查询 `PDF editor` 平均搜索量数据
- **竞品**: Chrome扩展3层搜索法确认无程序化对比站竞品
- **详细报告**: C:\Users\Administrator\Desktop\调研讨论\结构化网站方向选取\07_第六轮_实地调研修正评分.md

### 代表工具
Adobe Acrobat / Foxit / PDFelement / Nitro / Sejda

### 核心对比维度
定价/编辑功能/OCR/格式转换/电子签名/批量处理/协作

---

## 技术架构

```
用户 -> Google搜索 -> Cloudflare Pages (静态站点)
                     ^
             GitHub Actions (CI/CD)
                     ^
             git push main 分支
                     ^
             本地 Python 生成器 (generate.py)
```

| 组件 | 选型 | 原因 |
|------|------|------|
| 静态生成 | Python 3.12 (generate.py) | 简单直接，不需要框架 |
| 托管 | Cloudflare Pages | 免费，全球CDN，自动HTTPS |
| CI/CD | GitHub Actions | 免费，push自动部署 |
| 版本控制 | GitHub | 免费 |
| 数据分析 | Google Analytics 4 | 免费，流量监测 |

### 项目结构
```
pdf editor match/
+-- data/tools.json        # 工具数据（定价/功能/评分）
+-- scripts/
|   +-- generate.py       # 静态站生成器
|   +-- collect_data.py   # 数据采集脚本
+-- templates/
|   +-- base.html         # 基础模板
|   +-- index.html        # 首页
|   +-- tool.html         # 工具详情
|   +-- compare.html      # 对比页
+-- output/               # 生成静态HTML
+-- doing/                # 当前任务
+-- done/                 # 完成任务
+-- todo/                 # 待办任务
+-- agent.md              # 本文件
+-- ROADMAP.md            # 路线图
+-- STATUS.md             # 当前状态
+-- DECISIONS.md          # 决策日志
```

---

## 工作规范

### Karpathy 四原则（必须遵守）
1. **Think Before Coding**：改代码前先想3分钟，不要上来就写
2. **Simplicity First**：最简单方案优先，不要过度设计
3. **Surgical Changes**：一次只改一个模块，不改无关代码
4. **Goal-Driven**：每一步都要推进核心目标（生成页面->获取流量）

### Git 规范
- 分支前缀：`codex/`
- 提交格式：`type: description`
- 自动部署：Cloudflare Pages 监听 GitHub main 分支

---

## 连续执行规则（重要）

完成一个任务后，自动执行下一个 todo/ 任务，**不要停下来汇报**。
只有在以下情况才停止：
1. todo/ 全部完成
2. 遇到标记 [NEEDS_USER] 的阻塞任务
3. 用户主动打断

执行每个任务时：
1. 从 todo/ 取第一个 .md，移到 doing/
2. 执行任务
3. 完成后再移到 done/
4. 更新 STATUS.md
5. 立即取下一个 todo 继续

不需要每做完一个就问我'下一步做什么'，直接干。

---

## 参考项目

**必须参考**：`E:\ai\program\google seo web\ai-video-tools-comparison\`
- `scripts/generate.py` -> 静态站生成核心（改数据源+模板路径）
- `data/tools.json` -> 数据结构模板
- `templates/` -> HTML模板样式来源
- `output/index.html` -> 已部署成品参考

---

## 启动步骤
1. 采集工具数据 -> `data/tools.json`
2. 修改模板 -> `templates/*.html`
3. 编写/修改生成器 -> `scripts/generate.py`
4. 本地生成 -> `python scripts/generate.py`
5. 创建 GitHub 仓库 + Cloudflare Pages 部署
6. 配置 GA4 + Search Console
7. 持续优化SEO

---

## 上下文恢复流程

### Step 0: 优先检查 Checkpoint
```
检查 doing/CHECKPOINT.md 是否存在
  |
if 存在:
    -> 读 CHECKPOINT.md + 中间文件 -> 从中断处接续
    -> 完成后删除 CHECKPOINT.md -> 任务移入 done/
    -> 更新 STATUS.md -> 取下一个 todo
else:
    -> 执行标准恢复流程（下方 Step 1-5）
```

### 标准恢复流程（无Checkpoint时）

| 步骤 | 操作 | 目的 |
|:----:|:-----|:-----|
| 1 | 读 **ROADMAP.md** | 了解项目全局阶段 |
| 2 | 读 **STATUS.md** | 了解当前进度 |
| 3 | 读 **doing/** | 检查未完成任务 |
| 4 | 读 **todo/** | 取编号最小的任务 |
| 5 | 读最新 **done/*.md** | 了解最近完成的工作 |

**决策树：**
```
if doing/ 有未完成任务:
    -> 读该任务描述 -> 继续执行 -> 完成后移入 done/
else:
    -> 从 todo/ 取编号最小的 .md -> 移入 doing/ -> 开始执行
```

> 永远不要假设LLM记忆中的任何状态。每次启动都从文件系统重建上下文。

---

## 防压缩 Checkpoint 机制（核心！）

### 问题
AI执行大任务时（比如采集15个工具的定价），每采集完1个工具就有部分成果。但如果此时context被压缩，成果就丢失了。

### 规则：每完成一个子步骤，立即 checkpoint

**以下时刻必须更新 `doing/CHECKPOINT.md`：**
- 采集完一个工具的数据
- 写完一段代码/一个文件
- 列表任务完成了一项
- 遇到阻塞需要暂停
- 任何'这部分数据丢了可惜'的时刻

### 格式
```markdown
# CHECKPOINT - {时间}

## 当前任务
task: 01-调研市场名单 | status: 进行中 (5/15)

## 已完成
1. 工具A -> 采集完成
2. 工具B -> 采集完成

## 下一步
采集第6个工具

## 已产出中间文件
- doing/collected_data.md（部分数据）
```

### 恢复
- **有 CHECKPOINT.md** = 从中断处接续
- **没有** = 任务还没开始或已完成
- **完成后** = 删除 CHECKPOINT.md

---

## 可用技能与工具清单（自主决策版）

**AI接手任务时，自主判断需要什么能力，从以下清单选最合适的工具。不需要问用户。**

### 决策树
```
需要外部数据/调研？
  +-> Google搜索真实结果 -> chrome:control-chrome
  +-> 快速扫网页 -> browser:control-in-app-browser
  +-> 搜索引擎查资料 -> agent-reach
  +-> 批量抓取网页 -> firecrawl
  +-> 查搜索量 -> pytrends

需要写代码/处理文件？
  +-> 读写中文文件 -> node_repl (js)  << 推荐
  +-> 运行Python -> shell (python xxx.py)
  +-> Git操作 -> shell

需要做图？-> imagegen
需要编码规范？-> karpathy-skills（已生效）
```

### Codex 系统技能
| 技能 | 用途 | 本项目的应用场景 |
|:-----|:-----|:----------------|
| chrome:control-chrome | 控制Chrome浏览器 | Google搜索竞品/查定价/搜评分 |
| browser:control-in-app-browser | 控制内置浏览器 | 快速看网页/预览本地页面 |
| agent-reach | Exa搜索引擎 | 调研工具/查用户讨论/竞品分析 |
| firecrawl | 网页转Markdown | 批量抓取定价页（需API key） |
| karpathy-skills | 编码四原则 | 所有编码工作必须遵守（已集成） |
| agnes-workflow | 任务工作流 | 核心工作流（已集成） |
| imagegen | AI生成图片 | 网站logo/OG图/配图 |

### MCP 工具
| 工具 | 用途 | 最佳实践 |
|:-----|:-----|:---------|
| mcp__node_repl-js | Node.js执行 | 读写中文文件首选 |
| shell_command | PowerShell执行 | 注意GBK编码问题 |

### Agnes API（免费！省token神器）
|:-----|:-----|:---------|
| 文字生成 | agnes-2.0-flash，免费，OpenAI兼容 | scripts/agnes_helper.js 或直接fetch |
| 图片生成 | agnes-image-2.1-flash，免费 | POST /v1/images/generations |
| 视频生成 | agnes-video-v2.0，免费 | POST /v1/videos（异步） |

**体力活专用**：需要批量写文案、格式化JSON、翻译、生成FAQ时，
用 Agnes 代替主AI，省token。
调用方式：node scripts/agnes_helper.js 或 require('./agnes_helper')

| 场景 | 用主AI还是Agnes？ |
|:-----|:------------------|
| 写generate.py代码 | 主AI（需要复杂推理） |
| 批量格式化15个工具数据为JSON | Agnes（纯体力活） |
| 写FAQ/描述/OG标签 | Agnes（批量生产） |
| 设计网站架构 | 主AI（需要判断） |
| 修改模板HTML | 主AI（需要看样式效果） |
| 翻译100页meta description | Agnes（纯体力活） |
| 整理采集的定价数据 | Agnes（格式转换） |



### 何时调用 Agnes — 决策规则

**核心原则：不要把主AI的token浪费在纯体力活上。**

#### 决策流程
```
当前任务 →
  ↓
需要写代码？(generate.py/模板/脚本)
  → YES → 主AI自己写（需要推理和调试）
  → NO  ↓
  
需要操作文件系统？(读/写项目文件)
  → YES → 主AI自己操作（node_repl或shell）
  → NO  ↓

需要浏览器/Chrome？(搜网页/看官网)
  → YES → 主AI自己控制（chrome:control-chrome）
  → NO  ↓

需要复杂判断？(选哪个工具/怎么设计)
  → YES → 主AI自己决策
  → NO  ↓

→ **以上都是NO → 交给Agnes**
```

#### 简单判断表

| 任务类型 | 用谁 | 原因 |
|:---------|:----|:------|
| **写generate.py代码** | 主AI | 需要调试、理解项目结构 |
| **改HTML模板** | 主AI | 需要看样式效果 |
| **控制Chrome搜网页** | 主AI | chrome:control-chrome只有主AI能调 |
| **Git操作/部署** | 主AI | 需要Shell环境 |
| **决策：选哪个工具、怎么对比** | 主AI | 需要全局context |
| --- | --- | --- |
| **把采集的数据格式化成JSON** | **Agnes** 🔥 | 纯体力活，给个模板就能干 |
| **写30条FAQ文案** | **Agnes** 🔥 | 批量生产，不需要判断 |
| **生成meta description/OG标签** | **Agnes** 🔥 | 模板化输出 |
| **翻译100页内容** | **Agnes** 🔥 | 纯转换 |
| **总结长文本为短描述** | **Agnes** 🔥 | 简单的summarize |
| **把定价表转成标准格式** | **Agnes** 🔥 | 格式转换 |

#### 一句话口诀
**"动脑子的我干，动手的Agnes干。"**

- 要改代码/操作文件/控制浏览器 = 主AI
- 只要输入→处理→输出 = Agnes



### Agnes 输出审核机制

**Agnes干完活后，不能直接信任输出。必须经过审核。**

#### 审核分三级

| 级别 | 适用场景 | 怎么做 | 耗时 |
|:----:|:---------|:-------|:----:|
| L1 自动校验 | 结构化数据（JSON/CSV） | 程序跑检查：JSON格式√ 字段完整√ 数量正确√ | 毫秒级 |
| L2 主AI抽检 | 文案类（FAQ/描述/OG标签） | 主AI随机抽20%看质量 | ~200 tokens |
| L3 人类审核 | 上线前终审 | 在 STATUS.md 标记 [NEEDS_REVIEW] | 用户有空时 |

#### L1 自动校验（推荐，主AI顺手就干了）

Agnes输出后，主AI马上跑一个验证，不通过就重试：

```powershell
# 校验JSON是否合法 + 字段是否完整
python -c "
import json
data = json.load(open('data/tools.json','r',encoding='utf-8'))
print(f'工具数: {len(data)}')
for t in data:
    assert 'id' in t, f'{t.get("name","?")} 缺id'
    assert 'plans' in t, f'{t["name"]} 缺plans'
print('校验通过')
"
```

#### L2 主AI抽检

对于文案类，主AI只看抽取的20%样本：

```
Agnes写了30条FAQ → 主AI只读第3、10、20条
  → 质量OK → 全量通过
  → 有问题 → 给Agnes反馈重写
```

#### L3 人类审核标记

对于上线前的内容，在 STATUS.md 中标记：
- [ ] 上线前终审 — 标记 [NEEDS_REVIEW]

#### 审核失败的处理流程

```
Agnes输出 → 审核
  ↓
通过 → 写入正式文件 → 继续下一步
  ↓
不通过 → 把错误信息发给Agnes重试 → 再审核（最多3次）
  ↓
3次仍不通过 → 标记 [NEEDS_USER] 暂停
```


### 苦工AI Agnes（省token神器）

本机已安装 **苦工ai-agnes** Skill（`.codex/skills/苦工ai-agnes/`），提供：
- 9个免费Agnes API Key自动轮换
- 调用 "agnes" / "苦工" / "省token" 即可触发
- 脚本位置：`scripts/agnes_helper.js`

**判断规则**：
```
需要写代码/改模板/调浏览器/操作文件？ → 主AI自己干
需要复杂判断/选方案？                → 主AI自己干
以上都不是（纯体力活）               → 叫苦工Agnes！
```

**调用示例**：
```javascript
var agnes = require('./scripts/agnes_helper');
var result = await agnes.agnesChat('提示词', '系统提示');
```

**输出审核**：苦工干完活必须校验。scripts/agnes_helper.js 有 validateJson() 函数。
审核不通过最多重试3次，仍失败则 [NEEDS_USER] 暂停。

### 外部工具
| 工具 | 用途 | 调用方式 |
|:-----|:-----|:---------|
| pytrends | Google Trends | pip install pytrends, 代理 127.0.0.1:7897 |
| TinyFish API | 搜索+采集 | Key: sk-tinyfish-6JgE2jSpgIiwPrHdXjMvrclc5638kcAx |
| Playwright | 浏览器自动化 | Node.js/Python |

### 本机环境
| 项目 | 说明 |
|:-----|:------|
| PowerShell 5.1 | `&&`无效用`;`, GBK编码 |
| Python 3.12.10 | |
| Node.js 22.14.0 | |
| Git 2.51.0 | 分支前缀`codex/` |
| 代理 | http://127.0.0.1:7897 |
| 参考项目 | E:\ai\program\google seo web\ai-video-tools-comparison\ |

### 常用命令
```powershell
python scripts/generate.py
Get-Content file.json -Encoding UTF8
Set-Content file.md -Encoding UTF8
pip install pytrends playwright
git add .; git commit -m "type: desc"; git push
```

> **自主决策原则**：接手任务时，先判断需要什么能力，从表中选最合适的工具。直接干，不问用户。