# Mock数据使用指南

## 介绍

本项目使用 `vite-plugin-mock` 实现了前端Mock数据功能，无需后端服务即可进行前端开发和测试。

## Mock数据文件

- `user.ts`: 用户相关接口，包括登录、注册、用户管理等
- `topic.ts`: 题目相关接口，包括题目和题库的增删改查
- `index.ts`: Mock入口文件，统一导出所有Mock数据

## 已实现的接口

### 用户模块接口

- `/api/register` - 用户注册
- `/api/login` - 用户登录
- `/api/user/saveAdmin` - 添加管理员
- `/api/user/deleteUser/:id` - 删除用户
- `/api/user/listUserForPage` - 获取用户列表
- `/api/user/saveUser` - 添加用户
- `/api/user/updateUser/:id` - 编辑用户
- `/api/user/lockUser/:id` - 封禁/解封用户

### 题目模块接口

- `/api/question/listForPage` - 获取题目列表
- `/api/question/getDetail/:id` - 查询题目详情
- `/api/repo/listByQuestionId/:id` - 根据题目id获取题库列表
- `/api/question/save/:id` - 添加题目
- `/api/question/update/:id` - 编辑题目
- `/api/question/delete/:id` - 删除题目
- `/api/repo/listForPage` - 获取题库列表(分页)
- `/api/repo/save/:id` - 添加题库
- `/api/repo/update/:id` - 编辑题库
- `/api/repo/delete/:id` - 删除题库
- `/api/repo/list` - 获取题库列表(不分页)

## 如何使用

1. 项目已配置好 `vite.config.ts` 中的 `viteMockServe` 插件
2. 当 `enable` 设置为 `true` 时，Mock功能处于激活状态
3. 正常启动项目即可使用：`npm run dev`
4. 所有API调用将被Mock拦截并返回模拟数据

## 如何扩展

如需添加新的Mock接口，请遵循以下步骤：

1. 在对应模块的TS文件中添加新的接口定义
2. 参考已有的mock数据格式，实现适当的返回值
3. 如需创建新的模块，创建新的TS文件并在 `index.ts` 中导入

## 数据模拟

使用 `mockjs` 库实现了随机数据生成，使数据更真实。可根据需要修改生成的数据。

## 注意事项

1. 开发完成后，部署生产环境前，需要禁用Mock功能或确保API路径与后端一致
2. 可以根据环境变量动态控制Mock功能的开启/关闭
