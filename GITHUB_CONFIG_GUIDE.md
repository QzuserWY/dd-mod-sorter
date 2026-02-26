# GitHub 项目配置检查指南

## 🔍 需要检查的配置项

### 1️⃣ 基本设置

**访问**: https://github.com/QzuserWY/dd-mod-sorter/settings

#### 检查项：
- [ ] **Repository name** - 应该是 `dd-mod-sorter`
- [ ] **Description** - 可以填写项目描述
- [ ] **Visibility** - 检查是否为 **Private** 或 **Public**
  - 如果是 **Private**，GitHub Pages 需要特殊配置
  - 建议改为 **Public**（开源项目）

---

### 2️⃣ GitHub Pages 设置

**访问**: https://github.com/QzuserWY/dd-mod-sorter/settings/pages

#### 检查项：
- [ ] **Source** - 应该选择 "Deploy from a branch"
- [ ] **Branch** - 应该选择 "gh-pages" 分支
- [ ] **Folder** - 应该选择 "/ (root)"
- [ ] **Enforce HTTPS** - 建议勾选

#### 如果看到 "No Pages site published"：
这意味着 `gh-pages` 分支还没有被创建或内容还没有发布。

---

### 3️⃣ Actions 权限设置

**访问**: https://github.com/QzuserWY/dd-mod-sorter/settings/actions

#### 检查项：
- [ ] **Actions permissions** - 应该选择 "Allow all actions and reusable workflows"
- [ ] **Workflow permissions** - 应该选择 "Read and write permissions"
- [ ] **Allow GitHub Actions to create and approve pull requests** - 可以勾选

---

### 4️⃣ 分支保护规则

**访问**: https://github.com/QzuserWY/dd-mod-sorter/settings/branches

#### 检查项：
- [ ] 不应该有对 `main` 分支的保护规则
- [ ] 不应该有对 `gh-pages` 分支的保护规则

---

### 5️⃣ Secrets 和 Variables

**访问**: https://github.com/QzuserWY/dd-mod-sorter/settings/secrets/actions

#### 检查项：
- [ ] 不需要添加任何 secrets（我们使用 `GITHUB_TOKEN`）
- [ ] 可以查看是否有其他 secrets 干扰

---

## 🛠️ 常见问题和解决方案

### 问题 1：GitHub Pages 显示 404

**可能原因**：
- `gh-pages` 分支不存在
- 分支中没有构建输出
- 源配置错误

**解决方案**：
1. 检查 `gh-pages` 分支是否存在
2. 如果不存在，需要 GitHub Actions 成功运行来创建它
3. 检查 Pages 设置中的 "Source" 是否正确

### 问题 2：GitHub Actions 失败

**可能原因**：
- 权限不足
- 构建命令失败
- 依赖问题

**解决方案**：
1. 访问 Actions 页面查看具体错误
2. 检查 Actions 权限设置
3. 查看构建日志中的错误信息

### 问题 3：私人仓库无法使用 GitHub Pages

**可能原因**：
- 免费账户的私人仓库不支持 GitHub Pages

**解决方案**：
1. 将仓库改为公开（推荐）
2. 或使用 Netlify/Vercel 部署

---

## 📋 推荐的配置步骤

### 步骤 1：检查仓库可见性

1. 访问 https://github.com/QzuserWY/dd-mod-sorter/settings
2. 向下滚动到 "Danger Zone"
3. 如果是 Private，点击 "Change repository visibility"
4. 选择 "Make this repository public"
5. 输入仓库名确认

**为什么改为 Public？**
- 开源项目应该是公开的
- 免费的 GitHub Pages 需要公开仓库
- 社区用户可以看到源代码

### 步骤 2：配置 GitHub Pages

1. 访问 https://github.com/QzuserWY/dd-mod-sorter/settings/pages
2. 在 "Source" 选择 "Deploy from a branch"
3. 选择分支 "gh-pages"
4. 选择文件夹 "/ (root)"
5. 点击 "Save"

### 步骤 3：检查 Actions 权限

1. 访问 https://github.com/QzuserWY/dd-mod-sorter/settings/actions
2. 确保 "Actions permissions" 为 "Allow all actions"
3. 确保 "Workflow permissions" 为 "Read and write"

### 步骤 4：触发新的构建

1. 访问 https://github.com/QzuserWY/dd-mod-sorter
2. 点击 "Actions" 标签
3. 找到最新的工作流运行
4. 如果失败，点击 "Re-run all jobs"

---

## 🔗 快速链接

| 页面 | 链接 |
|------|------|
| 仓库主页 | https://github.com/QzuserWY/dd-mod-sorter |
| 基本设置 | https://github.com/QzuserWY/dd-mod-sorter/settings |
| Pages 设置 | https://github.com/QzuserWY/dd-mod-sorter/settings/pages |
| Actions 设置 | https://github.com/QzuserWY/dd-mod-sorter/settings/actions |
| Actions 日志 | https://github.com/QzuserWY/dd-mod-sorter/actions |
| 分支管理 | https://github.com/QzuserWY/dd-mod-sorter/branches |

---

## 📊 配置检查清单

完成以下检查：

- [ ] 仓库名称正确
- [ ] 仓库可见性为 Public（如果使用 GitHub Pages）
- [ ] GitHub Pages 源设置为 "gh-pages" 分支
- [ ] Actions 权限设置为 "Read and write"
- [ ] 没有分支保护规则阻止 Actions
- [ ] 最近的 Actions 运行成功
- [ ] `gh-pages` 分支存在且包含构建文件

---

## 🚀 部署检查流程

1. **检查 Actions 日志**
   - 访问 https://github.com/QzuserWY/dd-mod-sorter/actions
   - 查看最新的工作流运行
   - 检查是否有错误信息

2. **检查 gh-pages 分支**
   - 访问 https://github.com/QzuserWY/dd-mod-sorter/branches
   - 确认 `gh-pages` 分支存在
   - 点击进去查看是否有文件

3. **检查 Pages 发布状态**
   - 访问 https://github.com/QzuserWY/dd-mod-sorter/settings/pages
   - 查看 "Your site is live at" 下的 URL
   - 访问该 URL 查看是否正常

4. **测试网站**
   - 访问 https://QzuserWY.github.io/dd-mod-sorter/
   - 检查是否能加载
   - 测试上传文件功能

---

## 💡 提示

- **不确定？** 截图发给我，我可以帮您看
- **需要帮助？** 告诉我具体的错误信息
- **想改为公开？** 我可以指导您完成

---

## 下一步

完成以上检查后，告诉我结果，我会帮您进一步诊断问题！
