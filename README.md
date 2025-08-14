### react-scaffold-starter-cli 命令行工具使用说明
`react-scaffold-starter-cli` 是一个用于快速创建 `React` 项目脚手架的命令行工具，旨在简化 `React` 应用的初始化流程，提供多种预设模板和配置选项，帮助开发者快速启动项目开发。
安装方法
通过 npm 或 yarn 全局安装：

```bash
# 使用 npm
npm install -g react-scaffold-starter-cli

# 使用 yarn
yarn global add react-scaffold-starter-cli
```
安装完成后，可通过以下命令验证是否安装成功：

```bash
react-scaffold-starter-cli -v
# 或
rs-cli -v  # 简写形式
```

### 基本使用流程
##### 创建新项目
```bash
# 基本用法
react-scaffold-starter-cli create <项目名称>
rs-cli create <项目名称> # 简写形式
```

例如，创建名为 my-react-app 的项目：

```bash
rs-cli create my-react-app
```