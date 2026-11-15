# GitHub 与项目协作

[GitHub](https://github.com/) <img src="https://github.com/fluidicon.png" width="16"> 是一个基于 Git 的在线代码托管与协作平台，为开源项目免费提供 Git 存储。当然，它的意义远不止于此：

+ GitHub 上有海量的开源项目，任何人都可以看、可以学、可以用。
+ GitHub 是一个开源生态交流的大型社区，每个人都可以可以关注（Follow）他人、Star 收藏项目、Fork 复制仓库，形成类似社交网络的关系链。
+ 对于 CS 人而言，他的 GitHub 主页（贡献图、仓库、Star 数）就是技术力的展示。
+ GitHub 提供了开源项目的协作机制：Issue 用于讨论问题，Pull Request 用于提交代码变更并接受审查， Discussions 用于开放式交流。

GitHub于 2008 年 4 月 10 日正式上线。时至今日，它已经成了全世界最大的代码托管平台，拥有超过1亿开发者和超过 4.2 亿个仓库，其中至少有 2800 万个公共仓库（见 [Wikiprdia](https://en.wikipedia.org/wiki/GitHub)）。

> github是共产主义在软件开发领域的具体实现样板之一，即以生产资料社会公有制为基础（代码开源），以社会化合作（离散化的个人、组织等社会颗粒）为主要生产方式，主要采用合作社组织形式（项目组）的技术支撑平台。
> —— 作者：古土雷柏 来源：知乎 https://www.zhihu.com/question/28976652  （原回答已被删除）

除了 GitHub，还有一些其它的代码托管平台，如 [GitLab](https://about.gitlab.com/)、[Gitee](https://gitee.com/)（码云）。我们学校有 [Zju Git](https://git.zju.edu.cn)，是由浙江大学信息中心支持、浙江大学超算队运营的面向浙江大学校内的 Git 代码托管服务：

+ 【编程技术】ZJU Git Pages 公开测试中 https://www.cc98.org/topic/5340077 复制本链接到浏览器或者打开【CC98】微信小程序查看~
+ 【编程技术】ZJU Git 101: 学习如何管理代码 https://www.cc98.org/topic/5573802 复制本链接到浏览器或者打开【CC98】微信小程序查看~

后面我们只介绍 GitHub。

## 初识 Github
### GitHub  的功能

Github 在仓库托管之外，还提供账号、权限、问题追踪、代码审查、自动化构建和项目组织等等各种各样的功能。

在 GitHub 中，代码仓库通常简称 **Repository / Repo**。新建仓库时需要填写仓库名称、可见性以及初始化选项。Public 仓库面向公众开放浏览，Private 仓库则只有指定人员才能访问（仓库所有者可在 Settings 中管理协作者与访问权限，允许相关成员阅读、推送或管理仓库）。可见 [Github 仓库文档](https://githubdocs.cn/en/repositories)。

如下是其它功能，用于若干不同场景：

- **New repository / Import repository**：创建新仓库，或从已有地址导入仓库。
- **Codespaces**：在云端创建开发环境，可以直接打开编辑器进行开发。
- **Gist**：保存和分享代码片段或简单文档。
- **Organization**：以组织身份管理仓库和成员权限。
- **Projects**：用看板、表格等视图管理任务与开发进度。

<div align="center">
  <img src="https://raw.githubusercontent.com/TonyCrane/PracticalSkillsTutorial/master/slides/src/lec2/github-new.png" alt="GitHub 的新建功能菜单">
</div>

日常浏览 GitHub 可以使用浏览器扩展 [Refined GitHub](https://github.com/refined-github/refined-github)，它为仓库和 Pull Request 页面补充了一些便捷操作。

下图展示了 GitHub 仓库页面中的常见入口：

<div align="center">
  <img src="https://raw.githubusercontent.com/TonyCrane/PracticalSkillsTutorial/master/slides/src/lec2/github-repo.png" alt="GitHub 仓库页面中的常见入口">
  <br>
  <font size="2" color="gray"><i>图片 Credit：<a href="https://github.com/TonyCrane">@TonyCrane</a></i></font>
</div>

### 让 GitHub 识别提交身份

GitHub 根据提交记录中的邮箱与账号绑定的邮箱建立关联。打开 GitHub 的 **Settings → Access → Emails**，添加并验证提交时使用的邮箱。 这里可以参考文档：<https://docs.github.com/en/account-and-profile/how-tos/email-preferences/setting-your-commit-email-address>

<div align="center">
  <img src="https://raw.githubusercontent.com/TonyCrane/PracticalSkillsTutorial/master/slides/src/lec2/github-email.png" alt="GitHub 邮箱设置界面">
</div>

对应地在本地，邮箱是用 `git config` 设置的，我们一开始就已经介绍了。

### 从零创建一个 GitHub 仓库

假设已经在本地写好了 `hello-git` 文件夹，想把它发布到 GitHub，我们需要先在 GitHub 中创建一个名为 `hello-git` 的空仓库，复制它的 HTTPS 地址，然后回到终端：

```bash
cd hello-git
git add .                                                            # 注意先在本地完成提交
git commit -m "docs: create initial project"

git branch -M main                                                   # 把本地分支命名为 main

git remote add origin https://github.com/<GitHub 用户名>/hello-git.git  # 关联远程仓库

git push -u origin main                                              # 第一次推送并建立上游关联
```

如果在已经关联某个远程仓库时，要重新关联别的仓库地址，可以通过 `git remote set-url origin <url>` 进行修改。


### GitHub 的自动化与网页发布功能

[GitHub Pages](https://docs.github.com/en/pages) 可以将仓库中的静态网站文件发布到互联网上，常见用途包括个人主页、项目文档和技术博客。你现在看到的这个网页就是用 Github Pages 来实现的。仓库地址是 <https://github.com/GoldfishHorse/2026_FPA>。

<div align="center">
  <img src="https://raw.githubusercontent.com/TonyCrane/PracticalSkillsTutorial/master/slides/src/lec2/github-pages.png" alt="GitHub Pages 的发布设置">
  <br>
  <font size="2" color="gray"><i>图片 Credit：<a href="https://github.com/TonyCrane">@TonyCrane</a></i></font>
</div>

参考 [GitHub Pages 文档](https://docs.github.com/en/pages)。

## 在 GitHub 上参与项目协作

### README

在一个 GitHub 仓库中，`README.md` 是最重要的项目说明文件。打开一个陌生的开源仓库，应该首先读它的 `README.md`。

<div align="center">
<img src = "https://i0.wp.com/i-blog.csdnimg.cn/blog_migrate/69b234a9b0adee757c36c6f17ca70369.png">
</div>

<!-- 它通常会介绍项目的目标、安装/配置方法、使用说明与维护状态。 -->
一个好的 `README.md` 会包含

+ 项目的名称、简介和维护者；
+ 项目的功能，使用或操作说明
+ 项目的安装或配置指南；
+ 项目的维护状态和历史版本更新；
+ 版权声明/许可证信息
+ 相关资源
+ ……

可以参考：[RichardLitt/standard-readme](https://github.com/RichardLitt/standard-readme)。

### Issue

GitHub 的 **Issue** 用于记录软件缺陷（Bug）、功能需求、待办事项以及需要讨论的问题。对于一个公开的仓库，每个人都可以向作者提出自己的  Issue。不过在我们创建 Issue 前，需要先搜索一下已有 Issue，查看是否已有人反馈类似问题。

部分仓库提供 Bug Report、Feature Request 等模板，按模板填写有助于维护者复现问题。一个清楚的 Bug Report 通常包括运行环境、触发步骤、实际输出和期望行为等等。

见 [Github Issues 文档](https://docs.github.com/en/issues)。

### Discussion

GitHub **Discussions** 提供更接近论坛的讨论空间。它可以用于经验分享、问题求助、功能构想、项目公告和开放式讨论。

见 [Github Discussions 文档](https://docs.github.com/en/discussions)。

### Pull Request

**Pull Request（PR）** 是向目标仓库提出代码修改请求的协作方式。如果你对一个公开仓库项目感兴趣，并且希望在这个项目里出自己的一份力，就可以使用 PR 功能。PR 汇集了代码差异、提交记录、讨论、测试等，让项目成员在合并之前检查改动。

PR 的描述应解释修改解决了什么问题、采用什么实现方法以及如何验证结果。若它用于修复已有 Issue，可以写 `Fixes #42` 或 `Closes #42`，GitHub 会建立关联，并在符合条件的合并后关闭对应 Issue。

向公开项目贡献代码时，常用 **Fork** 的方式：在自己的 GitHub 账号下创建项目副本，我们在副本中开发，再请求原仓库接收修改。

<div align="center">
  <img src="https://raw.githubusercontent.com/TonyCrane/PracticalSkillsTutorial/master/slides/src/lec2/workflow.png" alt="Fork、修改、Pull Request 与代码合并的流程">
  <br>
  <font size="2" color="gray"><i>图片 Credit：<a href="https://github.com/TonyCrane">@TonyCrane</a></i></font>
</div>

### Release

项目发布版本时，还可以在 GitHub 的 **Releases** 页面进行发布。其中，可以填写标签（tag），版本说明，并附上编译好的程序、压缩包等文件。

<div align="center">
  <img src="https://docs.github.com/assets/cb-90524/mw-1440/images/help/releases/release-link.webp" alt="GitHub Realease">
  <br>
  <font size="2" color="gray"><i>图片 来自<a href="https://docs.github.com/en/repositories/releasing-projects-on-github/managing-releases-in-a-repository">GitHub 文档</a></i></font>
</div>

对 GitHub 仓库中的开源软件，我们一般也是从 Release 里来下载它们。
