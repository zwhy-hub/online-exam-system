# 在线考试系统 (Online Exam System)

## 项目简介

这是一个基于 Vue 3 + TypeScript + Vite 开发的现代化在线考试系统。系统采用前后端分离架构，使用 Element Plus 作为 UI 组件库，提供了完整的考试管理功能。

## 技术栈

- Vue 3
- TypeScript
- Vite
- Element Plus
- Pinia (状态管理)
- Vue Router
- Mock.js (数据模拟)
- Cypress (E2E 测试)

## 环境要求

- Node.js 22.x
- npm 或 yarn 包管理器

## 项目设置

### 安装依赖

```bash
npm install
# 或
yarn install
```

### 开发环境运行

```bash
npm run dev
# 或
yarn dev
```

### 生产环境构建

```bash
npm run build
# 或
yarn build
```

### 预览生产构建

```bash
npm run preview
# 或
yarn preview
```

## 项目端口配置

- 前端开发服务器：`localhost:5173`
- 后端 API 服务器：`localhost:8080`（可在 `config.ts` 中修改代理配置）

## 开发工具

- ESLint：代码质量检查
- Prettier：代码格式化
- TypeScript：类型检查
- Cypress：端到端测试

## 项目结构

```
online-exam-system/
├── src/           # 源代码目录
├── mock/          # Mock数据
├── public/        # 静态资源
├── cypress/       # E2E测试
├── .vscode/       # VS Code配置
└── ...
```

## 可用的脚本命令

- `npm run dev`: 启动开发服务器
- `npm run build`: 构建生产版本
- `npm run preview`: 预览生产构建
- `npm run test:e2e`: 运行端到端测试
- `npm run test:unit`: 运行单元测试
- `npm run lint`: 运行代码检查
- `npm run format`: 格式化代码

## 开发规范

- 使用 TypeScript 进行类型检查
- 遵循 ESLint 和 Prettier 的代码规范
- 使用 Git 进行版本控制

## 测试

项目包含完整的测试套件：

- 端到端测试 (E2E)
- 单元测试
- 组件测试

## 贡献指南

1. Fork 本仓库
2. 创建您的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交您的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启一个 Pull Request

## 许可证

[MIT License](LICENSE)
