# Git 基础

在我们写程序，尤其是大型项目的程序时，代码很少一次就能完成。从开始到完成，这之间可能经过几十次修改：实现新功能、修复错误、调整目录结构、回退某次改动；此外，多人合作时，我们还需要将各自的工作整合起来。这个过程容易出现很多麻烦：

> 如果你用Microsoft Word写过长篇大论，那你一定有这样的经历：
> 想删除一个段落，又怕将来想恢复找不回来怎么办？有办法，先把当前文件“另存为……”一个新的Word文件，再接着改，改到一定程度，再“另存为……”一个新文件，这样一直改下去，最后你的Word文档变成了这样：
> <div align="center">
>   <img src="https://liaoxuefeng.com/books/git/what-is-git/docs.jpg" alt="">
> </div>
> 过了一周，你想找回被删除的文字，但是已经记不清删除前保存在哪个文件里了，只好一个一个文件去找，真麻烦。
> 看着一堆乱七八糟的文件，想保留最新的一个，然后把其他的删掉，又怕哪天会用上，还不敢删，真郁闷。
> 更要命的是，有些部分需要你的财务同事帮助填写，于是你把文件Copy到U盘里给她（也可能通过Email发送一份给她），然后，你继续修改Word文件。一天后，同事再把Word文件传给你，此时，你必须想想，发给她之后到你收到她的文件期间，你作了哪些改动，得把你的改动和她的部分合并，真困难。
> 于是你想，如果有一个软件，不但能自动帮我记录每次文件的改动，还可以让同事协作编辑，这样就不用自己管理一堆类似的文件了，也不需要把文件传来传去。如果想查看某次改动，只需要在软件里瞄一眼就可以，岂不是很方便？
> —— 引用自  廖雪峰的官方网站 -  [Git 是什么？](https://liaoxuefeng.com/books/git/what-is-git/index.html)。

Git 为文件修改建立了可以查询的历史记录；[GitHub](https://github.com/) 则是一个“Git的在线代码托管与协作平台”，既能管理代码版本，也支持多人协作和开源项目分享。在此基础上，公开项目、提交问题反馈、审查代码和管理许可证，就构成了常见的开源协作方式。掌握这些工具后，一个人管理自己的小项目与多人共同维护大型代码库，使用的是同一套基本方法。

## 什么是 Git？

### 版本控制与 Git 的由来

版本控制系统（Version Control System，VCS）负责记录文件在不同时间的状态。它能帮我们追溯：某一行代码是谁修改的、为什么修改、某个错误从哪个版本开始出现，以及怎样恢复先前的文件内容。

[Git](https://git-scm.com/) 是一种**分布式版本控制系统**（Distributed Version Control System，DVCS）。每位开发者的本地仓库都保存着项目的历史信息，因此在没有网络连接时，仍然可以进行提交、创建分支、查看历史和比较差异。需要与其他人交换修改时，再与远程仓库通信。

Git 诞生于 Linux 内核开发。Linux 的创建者 Linus Torvalds 曾使用 BitKeeper 管理内核源码；随着 BitKeeper 的使用条件发生变化，他于 2005 年开始设计 Git。2005 年 4 月 7 日，Git 已经能够[用自身管理源代码](https://github.com/git/git/commit/e83c51633)；同月 16 日，Linux 内核也开始[使用 Git 保存开发历史](https://github.com/torvalds/linux/commit/1da177e4c)。这一设计延续至今。

<div align="center">
  <img src="https://raw.githubusercontent.com/TonyCrane/PracticalSkillsTutorial/master/slides/src/lec2/git-history.png" alt="Git 的历史发展示意图">
</div>

### 安装 Git

=== "Windows"

    Windows 可以从 [Git 官方网站](https://git-scm.com/download/win)下载安装程序，也可以使用 [Scoop](https://scoop.sh/)，见 [包管理器](../shell/package-manager.md)：

    ```powershell
    scoop install git
    ```

    Windows 版 Git 还提供了 **Git Bash**，它是 Git for Windows 自带的终端工具，除了运行 Git 命令外，还可以使用 Linux/Unix 风格的命令（如 ls、grep、ssh 等）。 Shell 的介绍和基础用法参见[终端和 Shell 基础](../shell/shell.md)。

=== "macOS"

    macOS 可以使用 Homebrew 安装：

    ```bash
    brew install git
    ```

=== "Linux"

    Ubuntu / Debian 可以使用 APT 安装：

    ```bash
    sudo apt update
    sudo apt install git
    ```

安装结束后，打开终端执行：

```bash
git --version
```

能够输出版本号，就说明当前终端可以找到 Git。

### 理解工作区、暂存区与仓库

Git 的工作方式涉及三个位置：

- **工作区（Working Directory）**：电脑上直接查看、编辑的项目文件。
- **暂存区（Staging Area / Index）**：保存准备写入下一次提交的文件状态。
- **本地仓库（Repository）**：保存提交记录、文件对象、分支和标签等历史信息，通常存放在项目的 `.git` 目录中。

我们修改文件是发生在工作区的。若再在终端执行 `git add` 的指令，Git 会将选定的改动放入暂存区；再执行 `git commit`，Git 根据暂存区创建新的提交（注意这里是本地提交，不会自动更新 Github 仓库）。`git push` 命令则将这些新提交推送到远程 Github 仓库；如果要把远程仓库的代码更新到本地，则用 `git pull` 命令。

<div align="center">
  <img src="https://raw.githubusercontent.com/TonyCrane/PracticalSkillsTutorial/master/slides/src/lec2/model.png" alt="Git 的工作区、暂存区、本地仓库和远程仓库模型">
  <font size="2" color="gray"><i>图片 Credit：<a href="https://github.com/TonyCrane">@TonyCrane</a></i></font>
</div>

### 创建仓库与配置身份

我们先创建一个练习文件夹：

```bash
mkdir hello-git
cd hello-git
git init
```

`git init` 将当前目录初始化为 Git 仓库，并创建 `.git` 目录。也可以直接写成 `git init hello-git`，让 Git 直接新建文件夹并初始化仓库。

Git 会在提交中记录作者姓名和电子邮箱，先设置这两项信息：

```bash
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```

!!! tip
    参数 `--global` 表示这个设置是“全局”的，也就是说 Git 将总是会使用这个设置来处理你的所有仓库。
    如果不加这个参数，直接写
    ```bash
    git config user.name "Another Name"
    git config user.email "another@example.com"
    ```
    意思是这个设置只用在当前仓库。

`git config --list` 指令可以用来查看配置。

## 从修改文件到保存版本

### 文件状态与 `git status`

如果对工作区的文件进行改动，例如，在我们刚创建的目录中添加一份 `README.md`，则此时 Git 会将 `README.md` 标记为 **Untracked（未跟踪）**：文件已经位于工作区，尚未进入 Git 的版本记录。

`git status` 可以显示出当前的状态，以前面的 `hello-git` 为例，它输出的信息是这样的：

```text
$ git status
On branch master

No commits yet

Untracked files:
  (use "git add <file>..." to include in what will be committed)
        README.md

nothing added to commit but untracked files present (use "git add" to track)
```
它告诉我们：

+ 当前在 master 分支上（`On branch master`）；关于分支请参考后文[用分支组织不同的工作](#branches)。
+ 仓库还没有任何提交（`No commits yet`）
+ 有一个未跟踪文件：`README.md`
+ 暂存区目前是空的

执行：

```bash
git add README.md
```

那么文件`README.md`就会进入暂存区，等待提交。此时 `git status` 的信息是这样的：
```text
$ git status
On branch master

No commits yet

Changes to be committed:
  (use "git rm --cached <file>..." to unstage)
        new file:   README.md
```

Git 管理文件时常见的状态包括：

- **Untracked**：当前仓库尚未跟踪的新文件。
- **Tracked**：已经被 Git 跟踪的文件，可以继续区分为未修改、已修改或已暂存等状态。
- **Ignored**：符合忽略规则、不参与版本管理的文件（见后文 `.gitignore` 节）。

总之，`git status` 会提示当前分支、暂存区内容、尚未暂存的修改以及未跟踪文件。日常操作中可以反复使用它判断下一步需要做什么。

<div align="center">
  <img src="https://raw.githubusercontent.com/TonyCrane/PracticalSkillsTutorial/master/slides/src/lec2/model-add.png" alt="文件修改加入暂存区的过程">
  <br>
  <font size="2" color="gray"><i>图片 Credit：<a href="https://github.com/TonyCrane">@TonyCrane</a></i></font>
</div>

!!! tip
    `git add file` 是指定文件的；也可以用 `git add directory/` ，这个命令将目录内符合条件的改动加入暂存区。也常用 `git add .`，这个命令会暂存当前目录及其子目录下相关改动。
    暂存区中保存的是*执行 `add` 那个时刻的文件内容*，因此在 `add` 之后继续编辑同一个文件，新增的修改仍然留在工作区，需要再次暂存。

### 文件删除、移动与取消暂存

文件操作也需要交给 Git 记录。例如：

```bash
git rm old.txt                  # 这个指令会删除 old.txt 这个文件， 并且把“删除”这个操作暂存起来，准备在下一次提交中记录

git mv oldname.txt newname.txt  # 这个指令把被 Git 跟踪的文件 oldname.txt 重命名为 newname.txt， 并把这次重命名操作暂存起来，准备在下一次提交中记录

git restore --staged README.md  # 从暂存区移除文件，也就是取消 git add README.md 的效果， 但文件本身的内容不会变
```

!!! tip
    注意，`git rm file` 这个命令会在电脑上删除文件本身。此外还有一个指令是 `git rm --cached file`，它的意思是从暂存区移除文件，但不会搞定文件本身。
    我们再区分一下  `git rm --cached file` 和 `git restore --staged`：

    +  `git rm --cached file` 是为了 “停止跟踪”：它表示你希望 Git 不再管理这个文件。它会永久性地改变文件的跟踪状态。
    + `git restore --staged` 是为了 “撤销暂存” ：它的目的只是把文件从暂存区撤回，恢复到上一次提交时的状态，不改变文件是否被 Git 跟踪的状态。这个操作只改变暂存区。

### 使用 `.gitignore` 管理忽略规则

程序运行后往往会产生各种乱七八糟的可执行文件、缓存、临时文件、日志，等等等等。这些文件是需要排除在版本记录之外的。Git 使用 `.gitignore` 文件描述忽略规则，例如：

```gitignore
# 编译产物
*.o
/build/

# 临时文件
*.log

# 在上一个规则基础上，保留一个指定文件
!important.log
```

`.gitignore` 的语法规则是：

+ `#` 注释，类似于代码注释
+ `*` 匹配一组字符
+ `/` 限定目录层级（）
+ `!` 用于重新纳入原本被忽略的路径。

例如，

+ `*.c` 可以匹配任意目录下的 C 源文件，
+ `a/**/b` 可以匹配 `a/b`、`a/x/b` 和 `a/x/y/b` 等路径。
+ 以 `/` 开头的规则以 `.gitignore` 所在目录为起点。`/*.c` 就是“当前目录下的 C 源文件”。

更多语法参见 [gitignore 官方文档](https://git-scm.com/docs/gitignore)；各种编程语言、编辑器与操作系统的通用模板集中在 [github/gitignore](https://github.com/github/gitignore)。

已经被 Git 跟踪的文件继续受版本管理，需要先用 `git rm --cached` ，再让忽略规则生效。

### 用 `git commit` 保存修改

还是以前文里创建的 `hello-git` 新仓库为例，我们已经将 `README.md` 加入了暂存区，此后执行：

```bash
git add README.md
git commit -m "docs: add initial README"
```

+ `git commit` 会将暂存内容生成一个新的提交（Commit），其中记录文件状态、作者、时间和提交说明等信息。
+ 此外，`git commit -a` 这个命令可以帮你自动暂存已经被跟踪的文件中发生的修改和删除，再创建提交。它相当于 `git add -u` + `git commit`。不过要注意，这写操作都不会包含未跟踪的新文件。
+ `-m` 参数的意思是记录这一次的提交说明（Commit Message）；如果省略 `-m` 参数，Git 会打开一个文本编辑器让你填写说明。

<div align="center">
  <img src="https://raw.githubusercontent.com/TonyCrane/PracticalSkillsTutorial/master/slides/src/lec2/model-commit.png" alt="暂存内容形成新提交的过程">
  <br>
  <font size="2" color="gray"><i>图片 Credit：<a href="https://github.com/TonyCrane">@TonyCrane</a></i></font>
</div>

!!! note
    提交说明的主要用途，是让自己和其它合作伙伴迅速理解这一次修改的目的。所以，提交说明应该写得清晰明了，而不要写得太模糊。

    一种常用的写法可以参考 [Angular 的提交约定](https://github.com/angular/angular/blob/main/CONTRIBUTING.md#-commit-message-format)：

    ```text
    <type>(<scope>): <summary>

    <body>

    <footer>
    ```

    其中 `type` 表示修改类别，`scope` 表示涉及的模块（可省略），`summary` 概括修改内容，`body` 补充实现原因与细节，`footer` 适合写关联的问题编号、兼容性变化等信息。
    常见的 `type` 包括 `feat`（功能）、`fix`（修复）、`docs`（文档）、`refactor`（重构）、`perf`（性能）、`test`（测试）等。

在我们的 `hello-git` 仓库里提交后，可以执行 `git log` 指令，它的输出是这样的：

```text
git log
commit 391598cf2aaf8d6181b30725135b9edbc06ebbca (HEAD -> master)
Author: Your Name <you@example.com>
Date:   Sun Nov 15 15:30:00 2026 +0800

    docs: add initial README
```
这里记载了我们刚刚的那一次 commit，具体而言：

+ `391598c...` 这一串字母代表提交 ID；我们的为一次提交都有这个东西。常见的 SHA-1 仓库使用 40 位十六进制数表示对象 ID。
+ Author 这一行是本次提交的作者信息。
+ Date 这一行本次提交的时间。
+ 最后一行是该次提交的说明信息，也就是之前 `git commit -m` 后面跟着的内容。

查询提交历史时还有这些指令：

```bash
git log
git log --oneline     # 将每个提交压缩成一行
git log --stat        # 显示每次提交涉及哪些文件与修改行数
git log -p            # 每个提交都展示具体的代码差异

git show <commit-id>  # 查看某次提交的内容
```

!!! tip
    在使用某个提交 ID 时，我们不一定要写全它的所有字母。只要前几位能够唯一确定对象，就可以用缩写代替完整 ID。例如 `git show 391598` 。

### 比较改动：`git diff`

`git diff` 用于观察两个文件状态之间发生了什么变化：

```bash
git diff               # 当前工作区与暂存区之间的差异

git diff --staged      # 暂存区与前一个提交之间的差异

git diff main          # 工作区与某个分支的最后一个提交之间的差异

git diff main feature  # 比较两个分支的提交内容
```

<a id="branches"></a>

## 用分支组织不同的工作

### 什么是分支

想象一个项目已经有稳定的 `main` 分支，现在要加入新功能。如果直接在 `main` 中改代码，会让未完成的代码与原有已经做好的功能混在一起。Git 可以从已有提交创建一条新分支，然后单独保存新功能的提交。

由此可以看出，分支（Branch）本质上是一个指向某次提交的引用（Reference，简称 Ref）。每当在当前分支创建新提交，分支引用便指向这个新提交。`HEAD` 会指向你当前正在上面工作的那个分支。

在我们执行 `git init` 新建一个仓库时，所处的分支叫作“主分支”，名字默认是 `master` 或者 `main`。

<div align="center">
  <img src="https://raw.githubusercontent.com/TonyCrane/PracticalSkillsTutorial/master/slides/src/lec2/model-branch.png" alt="Git 分支与工作区的关系">
  <br>
  <font size="2" color="gray"><i>图片 Credit：<a href="https://github.com/TonyCrane">@TonyCrane</a></i></font>
</div>

与分支相关的常用命令有：

```bash
git branch                         # 查看本地分支

git branch -a                      # 查看本地分指还有远程跟踪分支

git show-branch                    # 查看更详细的分支信息

git branch feature                 # 基于当前提交创建一个新的分支

git branch experiment <commit-id>  # 基于某个指定提交创建分支

git switch feature                 # 切换分支

git switch -c fix-readme           # 创建并切换到新分支
```

切换分支也可以用 `git checkout` 这个指令; 创建并切换到新分支也可以用 `git checkout -b`。

### 用 `HEAD`、`~` 和 `^` 定位提交

Git 允许基于某个引用查找它之前的提交。例如：

```bash
git show HEAD    # 当前提交
git show HEAD~   # 当前提交的前面一个提交
git show HEAD~2  # 当前提交的前面第二个提交
git show HEAD^   # 当前提交的前面一个提交（父提交），和 git show HEAD~ 相同
git show HEAD^2  # 当前提交的第二个父提交
```

这里“**父提交**（parent commit）”的意思就是当前提交的“上一个提交”。一般来说，普通提交的只会有一个父提交；而合并提交（merge commit）则可能有两个或多个父提交。`^2` 让我们可以沿合并提交的第二个父提交继续查找。

<div align="center">
  <img src="https://raw.githubusercontent.com/TonyCrane/PracticalSkillsTutorial/master/slides/src/lec2/git-relativeref.png" alt="相对引用与多个父提交的示意图">
  <br>
  <font size="2" color="gray"><i>图片 Credit：<a href="https://github.com/TonyCrane">@TonyCrane</a></i></font>
</div>

### 查看旧版本与 detached HEAD

如果我们想把当前的工作区退回到之前的某个提交，可以运行：

```bash
git checkout <commit-id>
```

这时，`HEAD` 就会指向该提交，形成 **detached HEAD** 状态。在这一状态下依然可以修改文件、创建提交，只是新提交暂时没有普通分支名称指向它。

<div align="center">
  <img src="https://raw.githubusercontent.com/TonyCrane/PracticalSkillsTutorial/master/slides/src/lec2/git-detached.png" alt="分离头指针和历史提交关系">
  <br>
  <font size="2" color="gray"><i>图片 Credit：<a href="https://github.com/TonyCrane">@TonyCrane</a></i></font>
</div>

### 合并分支 `git merge`

一项功能完成后，我们旧可以把它的提交合并回主分支上去了。需要进行的操作是：先切换到接受修改的主分支，再指定需要合并的分支：

```bash
git switch main
git merge feature
```

Git 根据两个分支的历史关系决定如何更新：

1. 当前分支已包含对方的全部提交时，Git 提示 `Already up to date`，无需移动分支。
2. 当前分支可以直接沿历史向前推进时，发生 **Fast-forward（快进合并）**，只需要移动当前分支指针。
3. 如果两个分支分别产生了新提交，Git 通常会将两个历史分支结合，并创建一个 **Merge Commit（合并提交）**，它拥有来自两侧的父提交。

<div align="center">
  <img src="https://raw.githubusercontent.com/TonyCrane/PracticalSkillsTutorial/master/slides/src/lec2/git-merge1.png" alt="已经同步、快进合并与合并提交的区别">
  <br>
  <font size="2" color="gray"><i>图片 Credit：<a href="https://github.com/TonyCrane">@TonyCrane</a></i></font>
</div>

Git 能自动整合大量互不冲突的修改。但是，如果两个人同时改动同一文件中的相同位置，就会产生合并冲突（Merge Conflict）。此时，Git 会出现这样的信息：

```text
<<<<<<< HEAD
print("Hello")
=======
print("Hello, Git")
>>>>>>> feature
```

`<<<<<<<` 到 `=======` 是当前一侧（主分支）的内容，`=======` 到 `>>>>>>>` 是另一侧（新分支）的内容。这时我们需要编辑文件，把冲突的地方处理掉，然后重新提交。

多人协作时，还会使用两种常见的提交整合方式。

+ **Squash Merge（压缩合并）** 指的是将新分支中的多次修改整理为目标分支上的一个新提交。
+ **Rebase** 将某个分支的提交依次重新应用到另一条历史的末端，从而得到连续的提交历史。

以如下指令为例：
```bash
git switch feature
git rebase main
```

Git 会以 `main` 的末端为新的起点，重新创建 `feature` 中的相关提交。提交被重新创建后会产生新的 Commit ID。

<div align="center">
  <img src="https://raw.githubusercontent.com/TonyCrane/PracticalSkillsTutorial/master/slides/src/lec2/git-merge2.png" alt="普通合并、压缩合并和变基合并的提交历史">
  <br>
  <font size="2" color="gray"><i>图片 Credit：<a href="https://github.com/TonyCrane">@TonyCrane</a></i></font>
</div>

### 撤销和整理提交

日常使用中，有时还会需要撤回已经提交的修改，相关的操作如下：

| 命令 | 用途 |
| --- | --- |
| `git revert <id>` | 创建一个新提交，撤销指定提交所产生的效果 |
| `git commit --amend` | 调整最近一次提交的说明，也可将当前暂存内容加入到当前最近一次提交，而不产生新提交 |
| `git reset <id>` | 移动当前分支到指定提交，并按选项更新暂存区或工作区 |
| `git rebase -i <id>` | 交互式（interactive）调整指定提交之后的历史，例如合并、重排或修改提交 |

`git revert` 适合在保留既有提交历史的前提下撤销修改。`git reset` 则会更直接地改变分支位置，它有几种常见形式：

```bash
git reset --soft HEAD~1   # 移动提交位置，保留当前的暂存区和工作区

git reset --mixed HEAD~1  # 移动提交位置、更新当前的暂存区，但保留当前保留工作区

git reset --hard HEAD~1   # 将工作区及暂存区中的已跟踪文件恢复到指定提交状态
```

!!! warning
    `git reset --hard` 会覆盖工作区中的相关修改，执行前应确认需要保留的内容已经保存，不然的话新的更改可能会丢失。

<div align="center">
  <img src="https://raw.githubusercontent.com/TonyCrane/PracticalSkillsTutorial/master/slides/src/lec2/git-changelog.png" alt="提交撤销与历史调整示意图">
  <br>
  <font size="2" color="gray"><i>图片 Credit：<a href="https://github.com/TonyCrane">@TonyCrane</a></i></font>
</div>

<div align="center">
  <img src="https://raw.githubusercontent.com/TonyCrane/PracticalSkillsTutorial/master/slides/src/lec2/git-rebase.png" alt="交互式变基的提交关系示意图">
  <br>
  <font size="2" color="gray"><i>图片 Credit：<a href="https://github.com/TonyCrane">@TonyCrane</a></i></font>
</div>

## 远程仓库、`clone`、`push` 和 `pull`

Git 的本地仓库能够独立工作；多人共同开发时，可以在服务器上设置一个供大家访问的**远程仓库**（Remote Repository）。它同样保存 Git 对象与提交历史。

```bash
git clone https://github.com/OWNER/REPO.git               # 从远程仓库创建本地副本

git clone https://github.com/OWNER/REPO.git local-folder  # 指定本地文件夹名称

git remote -v                                             # 查看仓库关联的远程地址

git remote add origin https://github.com/OWNER/REPO.git   # 新增远程仓库

git push -u origin main                                   # 推送当前分支到远程 main 分支

git fetch origin                                          # 获取远程更新

git pull origin main                                      # 获取并合并远程更新
```

这里 `origin` 是远程仓库的名字，也就是 Git 给某个远程仓库地址起的一个别名。

`clone` 会复制历史并自动建立名为 `origin` 的远程关联。`push` 将本地提交传送到远程；`fetch` 获取远程的新对象和引用信息。`pull` 相当于先执行 `fetch`，再进行可能的 merge 或 rebase；日常协作中，`pull` 经常用来同步其他人的新提交。

  <div align="center">
    <img src="https://code.visualstudio.com/assets/docs/sourcecontrol/repos-remotes/git-fetch-pull-push.png" alt="Working with repositories and remotes">
    <br>
    <font size="2" color="gray"><i>图片来自 <a href="https://code.visualstudio.com/docs/sourcecontrol/repos-remotes">Visual Studio Code 文档</a></i></font>
  </div>

<div align="center">
  <img src="https://raw.githubusercontent.com/TonyCrane/PracticalSkillsTutorial/master/slides/src/lec2/model-remote.png" alt="本地与远程仓库的关系">
  <br>
  <font size="2" color="gray"><i>图片 Credit：<a href="https://github.com/TonyCrane">@TonyCrane</a></i></font>
</div>

<div align="center">
  <img src="https://raw.githubusercontent.com/TonyCrane/PracticalSkillsTutorial/master/slides/src/lec2/git-remote.png" alt="远程跟踪分支的提交历史">
    <br>
  <font size="2" color="gray"><i>图片 Credit：<a href="https://github.com/TonyCrane">@TonyCrane</a></i></font>
</div>

[GitHub](https://github.com/) 就提供了远程的代码托管服务，见 [GitHub 与项目协作](./github.md)：

## Git 的存储结构

前面用过的 `commit`、`branch` 等操作，都有相应的记录保存下来。进入项目的 `.git` 目录，会看到几个子目录：

- `.git/objects` 保存 “Git 对象”：包含文件内容对象（Blob）、目录树对象（Tree）、提交对象（Commit） 等。
- `.git/HEAD` 指向当前的分支引用，或在分离状态下记录具体提交 ID。
- `.git/refs/heads` 保存本地分支引用，`.git/refs/remotes` 保存远程跟踪引用，`.git/refs/tags` 保存标签引用。

Git 的对象之间会相互引用，例如提交对象（Commit）旧会记录目录树及父提交；目录树会记录文件名、权限与对应的 Blob 或子目录树。这使 Git 能以历史对象的形式重新构建不同版本的目录状态。

<div align="center">
  <img src="https://raw.githubusercontent.com/TonyCrane/PracticalSkillsTutorial/master/slides/src/lec2/git-objects.png" alt="Git 对象与引用的存储结构">
  <br>
  <font size="2" color="gray"><i>图片 Credit：<a href="https://github.com/TonyCrane">@TonyCrane</a></i></font>
</div>

!!! tip
    除了直接输入 Git 命令，还有一些其它的很方便的工具，例如 [gitui](https://github.com/extrawurst/gitui) 和 [lazygit](https://github.com/jesseduffield/lazygit)。它们是运行于终端内的文本用户界面（TUI）工具，可以浏览修改、操作暂存区、查看提交和处理分支。
!!! tip
    Visual Studio Code 也提供了非常好用、方便的 Git 工具
    <div align="center">
      <img src="https://code.visualstudio.com/assets/docs/sourcecontrol/overview/overview.png" alt="Source control interface"><br>
      <img src="https://code.visualstudio.com/assets/docs/sourcecontrol/branches-worktrees/current-branch.png" alt="Git branches and worktrees in VS Code">
      <br>
      <font size="2" color="gray"><i>图片来自 <a href="https://code.visualstudio.com/docs/sourcecontrol/overview">Visual Studio Code 文档</a></i></font>
    </div>

    请参考 [Visual Studio Code 文档 - Source control in VS Code](https://code.visualstudio.com/docs/sourcecontrol/overview)。
