# GitHub 完整使用指南（从 GitLab 用户的角度）

## 📚 目录

1. [基本概念](#基本概念)
2. [账户和仓库管理](#账户和仓库管理)
3. [分支和工作流](#分支和工作流)
4. [Pull Request（PR）](#pull-request)
5. [Issues 和项目管理](#issues-和项目管理)
6. [Actions（CI/CD）](#actions)
7. [Pages（静态网站托管）](#pages)
8. [与 GitLab 的对比](#与-gitlab-的对比)
9. [常用命令](#常用命令)
10. [最佳实践](#最佳实践)

---

## 基本概念

### GitHub vs GitLab

| 功能 | GitHub | GitLab |
|------|--------|--------|
| **定位** | 代码托管 + 社区 | 完整 DevOps 平台 |
| **免费 CI/CD** | 有限制 | 更宽松 |
| **私人仓库** | 免费 | 免费 |
| **社区** | 非常活跃 | 较小 |
| **企业功能** | 需付费 | 更多免费功能 |
| **自托管** | 有（GitHub Enterprise） | 有（GitLab CE） |

### GitHub 的核心概念

- **Repository（仓库）** - 项目代码存储位置
- **Branch（分支）** - 代码版本
- **Commit（提交）** - 代码变更记录
- **Pull Request（PR）** - 代码审查和合并请求
- **Fork（分叉）** - 复制他人的仓库
- **Star（星标）** - 收藏项目
- **Watch（关注）** - 接收项目更新通知

---

## 账户和仓库管理

### 1. 创建账户

1. 访问 https://github.com
2. 点击 "Sign up"
3. 填写邮箱、密码、用户名
4. 验证邮箱

### 2. 创建仓库

**方式 A：网页创建**
1. 点击右上角 "+" → "New repository"
2. 填写仓库名称
3. 选择 Public（公开）或 Private（私人）
4. 可选：初始化 README、.gitignore、License
5. 点击 "Create repository"

**方式 B：命令行创建**
```bash
# 本地初始化仓库
git init
git add .
git commit -m "Initial commit"

# 添加远程仓库
git remote add origin https://github.com/username/repo-name.git

# 推送到 GitHub
git branch -M main
git push -u origin main
```

### 3. 仓库设置

**访问**：https://github.com/username/repo-name/settings

**重要设置**：

| 设置项 | 说明 |
|--------|------|
| **General** | 仓库基本信息、可见性 |
| **Branches** | 分支保护规则 |
| **Collaborators** | 添加协作者 |
| **Pages** | 静态网站托管 |
| **Actions** | CI/CD 权限 |
| **Secrets** | 存储敏感信息（API Key 等） |
| **Deploy keys** | SSH 密钥管理 |

---

## 分支和工作流

### 1. 分支基础

```bash
# 查看所有分支
git branch -a

# 创建新分支
git branch feature/new-feature

# 切换分支
git checkout feature/new-feature

# 创建并切换分支（推荐）
git checkout -b feature/new-feature

# 删除本地分支
git branch -d feature/new-feature

# 删除远程分支
git push origin --delete feature/new-feature
```

### 2. GitHub Flow（推荐工作流）

这是 GitHub 官方推荐的工作流：

```
main 分支（生产环境）
  ↑
  ├─ feature/login（功能分支）
  ├─ bugfix/404-error（修复分支）
  └─ docs/readme（文档分支）
```

**工作流程**：

1. **创建分支**
   ```bash
   git checkout -b feature/user-login
   ```

2. **进行开发**
   ```bash
   # 修改文件
   git add .
   git commit -m "Add user login feature"
   ```

3. **推送分支**
   ```bash
   git push origin feature/user-login
   ```

4. **创建 Pull Request**
   - 访问仓库主页
   - GitHub 会自动提示创建 PR
   - 或点击 "Pull requests" → "New pull request"

5. **代码审查和讨论**
   - 团队成员评论和建议
   - 进行修改

6. **合并到 main**
   - 审查通过后，点击 "Merge pull request"
   - 删除分支

### 3. 分支保护规则

**设置位置**：Settings → Branches

**常用规则**：
- 需要 Pull Request 审查
- 需要状态检查通过（CI/CD）
- 需要代码所有者审查
- 禁止强制推送

---

## Pull Request

### 创建 PR

1. **推送分支到 GitHub**
   ```bash
   git push origin feature/new-feature
   ```

2. **创建 PR**
   - GitHub 会在仓库页面显示提示
   - 或访问 "Pull requests" 标签 → "New pull request"

3. **填写 PR 信息**
   - **Title**：简洁的描述
   - **Description**：详细说明
   - **Reviewers**：选择审查者
   - **Labels**：添加标签（bug、feature 等）
   - **Projects**：关联项目

### PR 模板

创建 `.github/pull_request_template.md`：

```markdown
## 描述
简要描述这个 PR 的目的

## 相关 Issue
关闭 #123

## 修改类型
- [ ] Bug 修复
- [ ] 新功能
- [ ] 文档更新

## 测试
- [ ] 已在本地测试
- [ ] 添加了测试用例

## 检查清单
- [ ] 代码遵循风格指南
- [ ] 自我审查已完成
- [ ] 添加了必要的注释
```

### PR 审查

**作为审查者**：
1. 查看 "Files changed" 标签
2. 点击行号添加评论
3. 提交审查意见
4. 选择：
   - "Approve"（批准）
   - "Request changes"（要求修改）
   - "Comment"（仅评论）

---

## Issues 和项目管理

### 1. Issues（问题跟踪）

**创建 Issue**：
1. 点击 "Issues" 标签
2. 点击 "New issue"
3. 填写标题和描述
4. 添加标签、指派人员、里程碑

**Issue 模板**：

创建 `.github/ISSUE_TEMPLATE/bug_report.md`：

```markdown
---
name: Bug 报告
about: 报告一个 Bug
---

## 描述
清楚地描述这个 Bug

## 复现步骤
1. 进行...
2. 然后...
3. 看到...

## 预期行为
应该发生什么

## 实际行为
实际发生了什么

## 环境
- OS: [e.g. Windows, macOS]
- Browser: [e.g. Chrome, Firefox]
- Version: [e.g. 1.0.0]
```

### 2. 项目管理

**访问**：Projects 标签

**功能**：
- 看板视图（Kanban board）
- 自动化工作流
- 关联 Issues 和 PR

---

## Actions

### 什么是 GitHub Actions？

GitHub Actions 是 GitHub 的 CI/CD 系统，可以自动化工作流。

### 基本概念

- **Workflow**：自动化流程定义
- **Job**：工作流中的任务
- **Step**：工作中的单个步骤
- **Action**：可复用的代码块

### 创建工作流

1. **创建文件**
   `.github/workflows/ci.yml`

2. **基本示例**
   ```yaml
   name: CI

   on:
     push:
       branches: [ main ]
     pull_request:
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
       
       - name: Install dependencies
         run: npm install
       
       - name: Run tests
         run: npm test
       
       - name: Build
         run: npm run build
   ```

3. **查看运行结果**
   - 访问 "Actions" 标签
   - 查看工作流运行日志

### 常用 Actions

| Action | 用途 |
|--------|------|
| `actions/checkout` | 检出代码 |
| `actions/setup-node` | 安装 Node.js |
| `actions/setup-python` | 安装 Python |
| `peaceiris/actions-gh-pages` | 部署到 GitHub Pages |
| `actions/upload-artifact` | 上传构建产物 |

---

## Pages

### 什么是 GitHub Pages？

免费的静态网站托管服务。

### 使用方式

**方式 1：使用 gh-pages 分支**
1. 构建项目
2. 创建 `gh-pages` 分支
3. 推送构建文件到该分支
4. 设置 Pages 源为 `gh-pages` 分支

**方式 2：使用 main 分支中的 docs 文件夹**
1. 在 `main` 分支创建 `docs` 文件夹
2. 放入静态文件
3. 设置 Pages 源为 `main` 分支 `/docs` 文件夹

**方式 3：使用 GitHub Actions 自动部署**
```yaml
name: Deploy to Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    - name: Build
      run: npm run build
    - uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
```

### 访问网站

```
https://username.github.io/repo-name/
```

---

## 与 GitLab 的对比

### 相似之处

| 功能 | GitHub | GitLab |
|------|--------|--------|
| Git 仓库管理 | ✅ | ✅ |
| 分支和 PR | ✅ | ✅ |
| Issues | ✅ | ✅ |
| CI/CD | ✅ | ✅ |
| Pages | ✅ | ✅ |
| Wiki | ✅ | ✅ |

### 主要差异

| 功能 | GitHub | GitLab |
|------|--------|--------|
| **PR 名称** | Pull Request | Merge Request |
| **CI/CD 配置** | `.github/workflows/*.yml` | `.gitlab-ci.yml` |
| **Pages 部署** | `gh-pages` 分支 | `public` 文件夹 |
| **免费 CI 分钟数** | 2000/月（私人） | 400/月 |
| **自托管** | GitHub Enterprise | GitLab CE/EE |
| **社区** | 非常大 | 中等 |

### GitLab 用户需要调整的地方

| GitLab | GitHub | 说明 |
|--------|--------|------|
| Merge Request | Pull Request | 名称不同 |
| `.gitlab-ci.yml` | `.github/workflows/` | 配置位置和格式不同 |
| `public/` 文件夹 | `gh-pages` 分支 | Pages 部署方式不同 |
| CI 变量 | Secrets | 名称和位置不同 |
| Pipeline | Workflow | 概念相同，名称不同 |

---

## 常用命令

### 基础命令

```bash
# 克隆仓库
git clone https://github.com/username/repo.git

# 查看状态
git status

# 添加文件
git add .
git add file.txt

# 提交
git commit -m "Commit message"

# 推送
git push origin main

# 拉取
git pull origin main

# 查看日志
git log --oneline
```

### 分支命令

```bash
# 创建并切换分支
git checkout -b feature/new-feature

# 切换分支
git checkout main

# 删除本地分支
git branch -d feature/new-feature

# 删除远程分支
git push origin --delete feature/new-feature

# 重命名分支
git branch -m old-name new-name
```

### 高级命令

```bash
# 合并分支
git merge feature/new-feature

# 变基
git rebase main

# 查看远程
git remote -v

# 添加远程
git remote add origin https://github.com/username/repo.git

# 强制推送（谨慎使用）
git push origin main --force

# 撤销最后一次提交
git reset --soft HEAD~1

# 查看某个文件的历史
git log -p file.txt
```

---

## 最佳实践

### 1. 提交信息规范

**格式**：
```
<type>(<scope>): <subject>

<body>

<footer>
```

**示例**：
```
feat(auth): add user login functionality

- Implement login form
- Add authentication API integration
- Add error handling

Closes #123
```

**类型**：
- `feat` - 新功能
- `fix` - 修复 Bug
- `docs` - 文档
- `style` - 代码风格
- `refactor` - 重构
- `test` - 测试
- `chore` - 构建、依赖等

### 2. 分支命名规范

```
feature/user-login          # 新功能
bugfix/fix-404-error        # Bug 修复
hotfix/security-patch       # 紧急修复
docs/update-readme          # 文档
refactor/optimize-database  # 重构
```

### 3. PR 审查最佳实践

- 及时审查 PR
- 提供建设性反馈
- 检查代码质量和测试
- 验证 CI/CD 通过

### 4. 安全实践

- 不要提交敏感信息（密钥、密码）
- 使用 `.gitignore` 排除文件
- 使用 Secrets 存储敏感信息
- 启用分支保护规则
- 定期更新依赖

### 5. 文档

创建以下文件：
- `README.md` - 项目说明
- `CONTRIBUTING.md` - 贡献指南
- `LICENSE` - 开源协议
- `CODE_OF_CONDUCT.md` - 行为准则
- `.github/ISSUE_TEMPLATE/` - Issue 模板
- `.github/PULL_REQUEST_TEMPLATE.md` - PR 模板

---

## 常见问题

### Q1: 如何更新我的 fork？

```bash
# 添加上游仓库
git remote add upstream https://github.com/original-owner/repo.git

# 拉取上游更改
git fetch upstream

# 合并到本地 main
git merge upstream/main

# 推送到自己的 fork
git push origin main
```

### Q2: 如何撤销已推送的提交？

```bash
# 创建新提交来撤销更改
git revert <commit-hash>

# 或者强制推送（谨慎使用）
git reset --hard <commit-hash>
git push origin main --force
```

### Q3: 如何处理合并冲突？

```bash
# 1. 查看冲突文件
git status

# 2. 手动编辑文件，解决冲突

# 3. 标记为已解决
git add .

# 4. 完成合并
git commit -m "Resolve merge conflict"
```

### Q4: GitHub Actions 如何访问私密信息？

使用 Secrets：
1. Settings → Secrets and variables → Actions
2. 点击 "New repository secret"
3. 在工作流中使用：`${{ secrets.SECRET_NAME }}`

---

## 资源链接

- **GitHub 官方文档**: https://docs.github.com
- **GitHub 学习路径**: https://skills.github.com
- **Awesome GitHub**: https://github.com/phillipadsmith/awesome-github
- **GitHub Marketplace**: https://github.com/marketplace

---

## 总结

GitHub 的核心工作流：

```
1. 创建仓库
   ↓
2. 创建分支
   ↓
3. 进行开发
   ↓
4. 提交代码
   ↓
5. 创建 PR
   ↓
6. 代码审查
   ↓
7. 合并到 main
   ↓
8. 自动部署（可选）
```

相比 GitLab，GitHub 更注重社区和开源，GitLab 更注重企业功能。但两者的基本工作流是相同的。

---

**祝您在 GitHub 上的开发顺利！** 🚀
