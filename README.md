# 暗黑地牢 MOD 排序工具

一个功能强大的 Web 工具，用于读取、自定义排序并覆盖《暗黑地牢》游戏存档中的 MOD 加载顺序。

## 功能特性

- **读取存档**: 支持上传 `persist.game.json` 存档文件
- **提取 MOD 列表**: 自动解析存档中的 MOD 信息
- **自定义排序**: 
  - 拖拽排序 MOD 加载顺序
  - 使用上下箭头按钮快速调整位置
  - 按名称升序/降序排列
  - 搜索功能快速定位 MOD
- **覆盖存档**: 生成修改后的存档文件供下载
- **多种导出方式**: 支持直接下载或复制 JSON 内容

## 项目结构

```
dd-mod-sorter/
├── src/
│   ├── components/
│   │   ├── FileUploader.tsx      # 文件上传组件
│   │   ├── ModSorter.tsx         # MOD 排序主组件
│   │   ├── DraggableModList.tsx  # 可拖拽 MOD 列表
│   │   └── FileDownloader.tsx    # 文件下载组件
│   ├── utils/
│   │   └── saveFileParser.ts     # 存档文件解析工具
│   ├── App.tsx                   # 主应用组件
│   ├── main.tsx                  # 应用入口
│   └── index.css                 # 全局样式
├── index.html                    # HTML 入口
├── vite.config.ts               # Vite 配置
├── tsconfig.json                # TypeScript 配置
├── tailwind.config.js           # Tailwind CSS 配置
└── package.json                 # 项目依赖
```

## 技术栈

- **前端框架**: React 18
- **构建工具**: Vite
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **包管理**: npm

## 安装和运行

### 前置要求

- Node.js 16+ 
- npm 或 yarn

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

访问 `http://localhost:5173` 即可使用工具。

### 构建生产版本

```bash
npm run build
```

## 使用指南

### 第一步：上传存档文件

1. 找到您的《暗黑地牢》存档文件 `persist.game.json`
   - **Windows**: `%APPDATA%\LocalLow\Red Hook Studios\Darkest Dungeon\profile_1\persist.game.json`
   - **macOS**: `~/Library/Application Support/Darkest Dungeon/profile_1/persist.game.json`
   - **Linux**: `~/.config/unity3d/Red Hook Studios/Darkest Dungeon/profile_1/persist.game.json`

2. 拖拽文件到上传区域，或点击选择文件

### 第二步：自定义 MOD 排序

1. **拖拽排序**: 直接拖拽 MOD 项目来调整顺序
2. **按钮调整**: 使用上下箭头按钮微调位置
3. **快速排序**: 使用升序/降序按钮快速排列
4. **搜索过滤**: 输入 MOD 名称或 ID 快速查找

### 第三步：下载修改后的存档

1. 点击"下载修改后的存档文件"按钮
2. 或复制 JSON 内容到剪贴板

### 第四步：应用到游戏

1. **备份原文件**: 保存原始的 `persist.game.json` 作为备份
2. **替换文件**: 将下载的文件重命名为 `persist.game.json`
3. **覆盖原文件**: 将其放回游戏存档目录
4. **启动游戏**: 新的 MOD 加载顺序将被应用

## 存档文件格式

工具支持以下 MOD 存储格式：

- `mods`: MOD 对象数组
- `modlist`: MOD 对象数组
- `mod_list`: MOD 对象数组
- `enabled_mods`: MOD ID 字符串数组

每个 MOD 对象包含：
- `id`: MOD 的唯一标识符
- `name`: MOD 的显示名称
- `version`: MOD 版本（可选）

## 常见问题

### Q: 工具支持哪些存档格式？
A: 工具支持标准 JSON 格式的 `persist.game.json` 文件。

### Q: 修改后的存档会损坏游戏吗？
A: 工具只修改 MOD 加载顺序，不会改变其他游戏数据。但建议在修改前备份原文件。

### Q: 可以同时修改多个存档吗？
A: 可以。每次上传新文件时，工具会重置状态，您可以重复该过程。

### Q: 如何恢复原始 MOD 顺序？
A: 使用备份的原始 `persist.game.json` 文件覆盖当前文件即可。

## 安全性说明

- 所有文件处理都在浏览器本地进行，不会上传到服务器
- 工具不会修改除 MOD 列表外的任何游戏数据
- 强烈建议在修改前备份原始存档文件

## 许可证

此项目仅供个人使用。

## 贡献

欢迎提交 Issue 和 Pull Request！

## 支持

如遇到问题，请检查：
1. 文件是否为有效的 `persist.game.json`
2. 浏览器是否支持现代 JavaScript 特性
3. 是否有足够的磁盘空间用于下载文件

---

**注意**: 此工具与《暗黑地牢》官方无关，仅为社区工具。使用本工具修改游戏文件的后果由用户自行承担。
