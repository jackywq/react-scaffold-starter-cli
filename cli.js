#!/usr/bin/env node

const { program } = require("commander");
const download = require("download-git-repo");
const path = require("path");
const { execSync } = require("child_process");
const inquirer = require("inquirer");
const fs = require("fs");
const packageJson = require("./package.json");

// 定义版本号（从package.json中读取，避免硬编码）
program.version(
  packageJson.version,
  "-v, --version", // 支持的选项：-v 和 --version
  "查看当前工具版本" // 选项描述
);

// 模板仓库映射
const templateRepos = {
  redux: "github:jackywq/react-antd-redux-scaffold#main",
  zustand: "github:jackywq/react-antd-zustand-scaffold#main",
};

// 处理目录重复，生成唯一路径
function getUniqueProjectPath(baseName, cwd) {
  let counter = 1;
  let targetPath = path.join(cwd, baseName);

  // 若目录已存在，自动添加数字后缀（如 my-react-redux-app-1）
  while (fs.existsSync(targetPath)) {
    targetPath = path.join(cwd, `${baseName}-${counter}`);
    counter++;
  }

  return targetPath;
}

program
  .command("create <projectName>")
  .description("创建 React + AntD 项目（支持Redux/Zustand）")
  .action(async (projectName) => {
    // 1. 选择状态管理库
    const { stateManager } = await inquirer.prompt([
      {
        type: "list",
        name: "stateManager",
        message: "请选择状态管理库：",
        choices: [
          { name: "Redux", value: "redux" },
          { name: "Zustand", value: "zustand" },
        ],
        default: "zustand",
      },
    ]);

    // 2. 根据选择生成带状态管理库名称的项目名
    // 例如：输入 my-app → 选择Redux → 生成 my-app-redux
    const fullProjectName = `${projectName}-${stateManager}`;

    // 3. 处理目录重复，获取唯一路径
    const cwd = process.cwd();
    const targetPath = getUniqueProjectPath(fullProjectName, cwd);

    // 4. 下载对应模板
    const repo = templateRepos[stateManager];
    download(repo, targetPath, {}, (err) => {
      if (err) {
        console.error("❌ 模板下载失败：", err);
        return;
      }
      console.log(`✅ ${stateManager} 模板下载完成！`);

      try {
        // 5. 初始化Git和安装依赖
        console.log("📦 初始化 Git 仓库...");
        execSync(`cd "${targetPath}" && git init`, { stdio: "inherit" });

        console.log("📦 开始安装依赖...");
        execSync(`cd "${targetPath}" && npm install`, { stdio: "inherit" });

        // 6. 提示启动命令（显示最终生成的项目名）
        const finalDirName = path.basename(targetPath);
        console.log("✅ 依赖安装完成！");
        console.log(
          `✅ 项目创建成功，可执行：cd ${finalDirName} && npm run start`
        );
      } catch (installErr) {
        console.error("❌ 依赖安装失败：", installErr);
      }
    });
  });

program.parse(process.argv);
