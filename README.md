# 浙江大学 2026-2027 秋冬《程序设计与算法基础》

本仓库是浙江大学 2026-2027 秋冬学期《程序设计与算法基础》课程辅助文档，适用于[应晶老师](https://person.zju.edu.cn/0095096)的教学班，主要为零基础同学提供开发环境安装、第一次编译运行和调试等方面的说明。

在线文档：<https://goldfishhorse.github.io/2026_FPA/>

## 本地预览

首先安装 MkDocs、Material for MkDocs 和本文档使用的排版插件：

```bash
pip install mkdocs-material mkdocs-heti-plugin
```

在仓库根目录启动实时预览服务：

```bash
mkdocs serve
```

然后访问 <http://127.0.0.1:8000/>。如果 8000 端口已被占用，可以指定其他端口，例如：

```bash
mkdocs serve -a 127.0.0.1:8001
```

对应的访问地址为 <http://127.0.0.1:8001/>。

提交并推送到 `main` 分支后，GitHub Actions 会自动构建文档并部署到 GitHub Pages。

## 致谢与许可

本文档基于 [ZhouTimeMachine/2023_FPA](https://github.com/ZhouTimeMachine/2023_FPA) 修改和扩充。感谢原作者以及文档中列出的其他资料作者。

原项目采用 [CC BY 4.0](LICENSE) 许可协议发布，本项目保留原项目的署名和许可证信息。
