#!/usr/bin/env node

// 新建文件：cli.js（CLI 入口）
const { program } = require("commander");
const download = require("download-git-repo");
const path = require("path");
const { execSync } = require("child_process");

// 定义命令：react-starter <project-name>
program
  .command("create <projectName>")
  .description("创建 React + AntD + Zustand + TS 项目")
  .action((projectName) => {
    // 从 Git 仓库拉取模板（替换为你的模板仓库地址）
    const repo = "github:jackywq/react-antd-zustand-scaffold#main";
    const targetPath = path.join(process.cwd(), projectName);

    // 下载模板到本地
    download(repo, targetPath, {}, (err) => {
      if (err) {
        console.error("❌ 模板下载失败：", err);
        return;
      }
      console.log("✅ 模板下载完成！");

      // 自动安装依赖（可选，也可让用户手动执行 npm install）
      console.log("📦 开始安装依赖...");
      try {
        execSync(`cd ${projectName} && npm install`, { stdio: "inherit" });
        console.log("✅ 依赖安装完成！");
        console.log(
          `\n✅ 项目创建成功，可执行：cd ${projectName} && npm run start`
        );
      } catch (installErr) {
        console.error("❌ 依赖安装失败：", installErr);
      }
    });
  });

program.parse(process.argv);
