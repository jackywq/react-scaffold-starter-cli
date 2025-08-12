## react-scaffold-starter-cli CLI 工具使用说明

### 一、工具简介
`react-scaffold-starter-cli` 是一个命令行工具（CLI），用于快速创建基于 `React + AntD + Zustand + TS` 技术栈的前端项目。通过简单的命令，可从指定 Git 仓库拉取项目模板，并自动完成项目依赖安装，帮助开发者快速初始化项目。

### 二、安装
克隆项目：将包含 `cli.js` 及相关代码的项目克隆到本地。

```bash
git clone [项目仓库地址]
cd [项目所在目录]
```
安装依赖：该工具依赖 `commander`、`download-git-repo` 等 `Node.js` 包，执行以下命令安装：

```bash
npm install
```

### 三、使用方法
##### 1. 命令格式
在项目目录下, 执行以下命令，默认创建一个名为 `my-react-app` 的项目
```bash
npm run start
```

也可以通过 node 执行 cli.js，命令格式为：

```bash
node cli.js create <projectName>
```

其中 `<projectName>` 为你要创建的项目名称, 比如使用 `node cli.js create my-react-project` 即可创建一个名为 `my-react-project` 的项目。


执行该命令后，工具会：
从 `github:jackywq/react-antd-zustand-scaffold#main` 仓库拉取项目模板到本地新建的 `my-react-app` 目录。
自动进入 `my-react-app` 目录并执行 `npm install` 安装项目依赖。
若操作成功，提示 项目创建成功，可执行：`cd my-react-app` && `npm run dev` ，此时可按提示进入项目目录启动开发环境。

### 四、注意事项
仓库地址：代码中 `repo` 变量指定了模板仓库地址 `github:jackywq/react-antd-zustand-scaffold#main` ，需确保该仓库可访问。若仓库地址变更或不可用，需修改 `cli.js` 中 `repo` 变量的值为正确的模板仓库地址（格式：github:用户名/仓库名#分支名 ）。
网络环境：拉取模板和安装依赖过程需连接网络，若网络不稳定可能导致模板下载失败或依赖安装失败。
`Node.js` 环境：确保已安装 `Node.js`（建议版本 v16 + ），且 `npm` 可正常使用，否则依赖安装等操作无法执行。
权限问题：执行命令的目录需有读写权限，避免因权限不足导致创建项目目录、写入文件等操作失败。