# GitHub Actions 详细解释

## 📚 目录

1. [什么是 GitHub Actions](#什么是-github-actions)
2. [核心概念](#核心概念)
3. [工作原理](#工作原理)
4. [配置文件详解](#配置文件详解)
5. [实际例子](#实际例子)
6. [常见场景](#常见场景)
7. [调试和故障排除](#调试和故障排除)

---

## 什么是 GitHub Actions？

### 简单定义

**GitHub Actions** 是 GitHub 提供的自动化工具，可以在特定事件发生时自动执行任务。

### 类比

想象一个机器人，当您：
- 推送代码到仓库
- 创建 Pull Request
- 发布 Release
- 定时执行任务

机器人就会自动：
- 运行测试
- 构建项目
- 部署网站
- 发送通知

### 用途

| 用途 | 说明 |
|------|------|
| **CI/CD** | 自动化测试和部署 |
| **代码质量** | 运行 Linter、格式化检查 |
| **构建** | 编译、打包项目 |
| **部署** | 发布到服务器、Pages 等 |
| **通知** | 发送邮件、Slack 通知 |
| **定时任务** | 定时运行脚本 |

---

## 核心概念

### 1. Workflow（工作流）

**定义**：一个完整的自动化流程

**特点**：
- 由一个 YAML 文件定义
- 存放在 `.github/workflows/` 目录
- 一个仓库可以有多个工作流

**示例文件**：
```
.github/workflows/ci.yml
.github/workflows/deploy.yml
.github/workflows/schedule.yml
```

### 2. Event（事件）

**定义**：触发工作流的条件

**常见事件**：

| 事件 | 触发条件 |
|------|---------|
| `push` | 推送代码到仓库 |
| `pull_request` | 创建或更新 PR |
| `release` | 发布 Release |
| `schedule` | 定时执行 |
| `workflow_dispatch` | 手动触发 |
| `issues` | Issue 相关操作 |
| `pull_request_review` | PR 审查 |

**示例**：
```yaml
on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]
```

### 3. Job（任务）

**定义**：工作流中的一个工作单元

**特点**：
- 一个工作流可以有多个 Job
- 默认并行运行
- 可以设置依赖关系

**示例**：
```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    steps: [...]
  
  test:
    runs-on: ubuntu-latest
    steps: [...]
  
  deploy:
    needs: [build, test]  # 依赖 build 和 test
    runs-on: ubuntu-latest
    steps: [...]
```

### 4. Step（步骤）

**定义**：Job 中的单个任务

**两种类型**：
- **运行命令**：`run`
- **使用 Action**：`uses`

**示例**：
```yaml
steps:
  - name: Checkout code
    uses: actions/checkout@v3
  
  - name: Install dependencies
    run: npm install
  
  - name: Run tests
    run: npm test
```

### 5. Runner（运行器）

**定义**：执行工作流的虚拟机

**常见选项**：
- `ubuntu-latest` - Ubuntu 系统
- `windows-latest` - Windows 系统
- `macos-latest` - macOS 系统
- 自托管运行器

**示例**：
```yaml
jobs:
  build:
    runs-on: ubuntu-latest  # 使用 Ubuntu 运行器
```

### 6. Action（操作）

**定义**：可复用的代码块

**来源**：
- GitHub 官方 Actions
- 社区 Actions
- 自定义 Actions

**使用**：
```yaml
- uses: actions/checkout@v3
- uses: actions/setup-node@v3
  with:
    node-version: '18'
```

---

## 工作原理

### 执行流程

```
1. 事件触发
   ↓
2. GitHub 创建运行器（虚拟机）
   ↓
3. 检出代码（checkout）
   ↓
4. 执行每个 Job（可能并行）
   ↓
5. 执行每个 Step
   ├─ 运行命令或 Action
   ├─ 记录输出
   └─ 检查返回码
   ↓
6. 生成报告
   ↓
7. 销毁运行器
```

### 详细执行示例

假设您有以下工作流：

```yaml
name: CI

on: [push]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm test
      - run: npm run build
```

**执行过程**：

```
时间    操作
----    ----
T0      您执行 git push
        ↓
T1      GitHub 检测到 push 事件
        ↓
T2      GitHub 创建 Ubuntu 虚拟机
        ↓
T3      虚拟机启动，开始执行工作流
        ↓
T4      Step 1: 检出代码
        运行 actions/checkout@v3
        输出: ✓ Checked out code
        ↓
T5      Step 2: 安装 Node.js
        运行 actions/setup-node@v3
        输出: ✓ Node.js 18 installed
        ↓
T6      Step 3: 安装依赖
        运行 npm install
        输出: ✓ 100 packages installed
        ↓
T7      Step 4: 运行测试
        运行 npm test
        输出: ✓ All tests passed
        ↓
T8      Step 5: 构建项目
        运行 npm run build
        输出: ✓ Build successful
        ↓
T9      所有 Step 完成
        ↓
T10     虚拟机销毁
        ↓
T11     GitHub 生成报告
        工作流状态: ✓ Success
```

---

## 配置文件详解

### 基本结构

```yaml
name: 工作流名称                    # 工作流显示名称

on: [push, pull_request]           # 触发事件

env:                                # 环境变量（全局）
  NODE_VERSION: '18'

jobs:
  job-name:                         # Job 名称
    runs-on: ubuntu-latest          # 运行器
    
    env:                            # 环境变量（Job 级别）
      DEBUG: true
    
    steps:
      - name: Step 名称             # Step 名称
        run: echo "Hello"           # 运行命令
      
      - name: 使用 Action
        uses: actions/checkout@v3   # 使用 Action
        with:                       # Action 参数
          fetch-depth: 0
```

### 完整示例

```yaml
name: Build and Deploy

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]
  schedule:
    - cron: '0 0 * * 0'  # 每周日午夜运行

env:
  NODE_VERSION: '18'
  REGISTRY: ghcr.io

jobs:
  build:
    name: Build Project
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run linter
        run: npm run lint
      
      - name: Run tests
        run: npm test
      
      - name: Build project
        run: npm run build
      
      - name: Upload artifacts
        uses: actions/upload-artifact@v3
        with:
          name: build-output
          path: dist/

  deploy:
    name: Deploy to Production
    needs: build  # 依赖 build Job
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'  # 只在 main 分支部署
    
    steps:
      - name: Download artifacts
        uses: actions/download-artifact@v3
        with:
          name: build-output
      
      - name: Deploy to server
        env:
          DEPLOY_KEY: ${{ secrets.DEPLOY_KEY }}
        run: |
          mkdir -p ~/.ssh
          echo "$DEPLOY_KEY" > ~/.ssh/id_rsa
          chmod 600 ~/.ssh/id_rsa
          ssh -i ~/.ssh/id_rsa user@example.com 'deploy.sh'
```

---

## 实际例子

### 例子 1：简单的 CI 流程

```yaml
name: Node.js CI

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    
    strategy:
      matrix:
        node-version: [16.x, 18.x, 20.x]  # 在多个 Node 版本测试
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Use Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v3
        with:
          node-version: ${{ matrix.node-version }}
      
      - run: npm ci
      - run: npm run build --if-present
      - run: npm test
```

### 例子 2：部署到 GitHub Pages

```yaml
name: Deploy to Pages

on:
  push:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - run: npm install
      - run: npm run build
      
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

### 例子 3：定时任务

```yaml
name: Daily Report

on:
  schedule:
    - cron: '0 9 * * 1-5'  # 工作日早上 9 点

jobs:
  report:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Generate report
        run: python scripts/generate_report.py
      
      - name: Send email
        env:
          EMAIL_TOKEN: ${{ secrets.EMAIL_TOKEN }}
        run: python scripts/send_email.py
```

---

## 常见场景

### 场景 1：自动测试和部署

```
代码推送
  ↓
运行测试
  ↓
构建项目
  ↓
部署到服务器
```

### 场景 2：PR 自动检查

```
创建 PR
  ↓
运行 Linter
  ↓
运行测试
  ↓
检查代码覆盖率
  ↓
显示结果在 PR 中
```

### 场景 3：自动发布

```
创建 Release
  ↓
构建二进制文件
  ↓
上传到 Release
  ↓
发送通知
```

---

## 调试和故障排除

### 1. 查看工作流日志

1. 访问仓库的 "Actions" 标签
2. 选择工作流运行
3. 点击 Job 查看详细日志

### 2. 常见错误

| 错误 | 原因 | 解决方案 |
|------|------|---------|
| `Command not found` | 依赖未安装 | 添加安装步骤 |
| `Permission denied` | 权限不足 | 检查文件权限 |
| `Timeout` | 任务超时 | 优化代码或增加超时时间 |
| `Out of memory` | 内存不足 | 优化构建过程 |

### 3. 调试技巧

**添加调试输出**：
```yaml
- name: Debug info
  run: |
    echo "Branch: ${{ github.ref }}"
    echo "Event: ${{ github.event_name }}"
    echo "Actor: ${{ github.actor }}"
    pwd
    ls -la
```

**使用 tmate 进行交互式调试**：
```yaml
- name: Setup tmate session
  uses: mxschmitt/action-tmate@v3
```

### 4. 查看工作流状态

```yaml
# 在 README 中添加状态徽章
[![CI](https://github.com/username/repo/actions/workflows/ci.yml/badge.svg)](https://github.com/username/repo/actions)
```

---

## 高级特性

### 1. 条件执行

```yaml
steps:
  - name: Deploy
    if: github.ref == 'refs/heads/main'
    run: npm run deploy
  
  - name: Notify on failure
    if: failure()
    run: send-notification "Build failed"
```

### 2. 矩阵策略

```yaml
strategy:
  matrix:
    os: [ubuntu-latest, windows-latest, macos-latest]
    node-version: [16.x, 18.x, 20.x]
    exclude:
      - os: macos-latest
        node-version: 16.x
```

### 3. 输出和工件

```yaml
- name: Build
  run: npm run build

- name: Upload artifacts
  uses: actions/upload-artifact@v3
  with:
    name: dist
    path: dist/

- name: Download artifacts
  uses: actions/download-artifact@v3
  with:
    name: dist
```

### 4. 环境变量和 Secrets

```yaml
env:
  PUBLIC_VAR: value

steps:
  - name: Use secrets
    env:
      SECRET_VAR: ${{ secrets.MY_SECRET }}
    run: echo "Secret: $SECRET_VAR"
```

---

## 最佳实践

### 1. 使用缓存加速

```yaml
- uses: actions/setup-node@v3
  with:
    node-version: '18'
    cache: 'npm'  # 自动缓存 node_modules
```

### 2. 使用 Concurrency 防止并发

```yaml
concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true
```

### 3. 设置超时

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    timeout-minutes: 30
```

### 4. 使用 Actions 而不是脚本

```yaml
# ✅ 推荐
- uses: actions/setup-node@v3

# ❌ 不推荐
- run: |
    curl https://nodejs.org/...
    tar -xzf node-v18.0.0-linux-x64.tar.gz
```

---

## 与您的项目相关

### 您的 MOD 排序工具的工作流

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm install
    
    - name: Build
      run: npm run build
    
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
```

**工作流程**：
1. 您推送代码到 main 分支
2. GitHub 检测到 push 事件
3. 创建 Ubuntu 虚拟机
4. 检出代码
5. 安装 Node.js
6. 安装项目依赖
7. 构建项目（生成 dist 文件夹）
8. 使用 peaceiris/actions-gh-pages 部署到 gh-pages 分支
9. GitHub Pages 自动发布网站

---

## 总结

### GitHub Actions 的关键点

| 概念 | 说明 |
|------|------|
| **Event** | 什么时候触发 |
| **Job** | 做什么任务 |
| **Step** | 具体怎么做 |
| **Runner** | 在哪里运行 |
| **Action** | 用什么工具 |

### 工作流程

```
事件 → 创建运行器 → 执行 Job → 执行 Step → 生成报告 → 销毁运行器
```

### 常用命令

```bash
# 查看工作流日志
# 访问 GitHub 仓库 → Actions 标签

# 手动触发工作流
# 在 GitHub 网页上点击 "Run workflow"

# 查看工作流文件
cat .github/workflows/ci.yml
```

---

**现在您应该理解 GitHub Actions 的工作原理了！** 🚀
