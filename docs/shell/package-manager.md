# 包管理器

安装应用时，我们通常需要访问官方网站、下载安装包、运行安装程序，再手动配置环境变量。对于需要频繁安装开发工具的用户而言，这套流程相当繁琐；应用更新、版本切换和卸载也可能需要重复类似的操作。

**包管理器**（Package Manager）可以帮助我们完成这些工作。通过简单的命令，就能够搜索、安装、更新和卸载应用，并自动处理部分依赖关系。

例如，要安装名为 `ripgrep` 的工具，可以在不同操作系统中分别执行：

- Windows（Scoop）：`scoop install ripgrep`
- macOS（Homebrew）：`brew install ripgrep`
- Ubuntu / Debian（APT）：`sudo apt install ripgrep`

这样就做到了“一行命令完成安装应用”的效果。

## 不同操作系统的包管理器

=== "Windows"

    ### Scoop

    [Scoop](https://scoop.sh/) 是 Windows 平台上的命令行包管理器，尤其适合管理 Git、Python、Neovim、ripgrep 等开发工具。

    Scoop 默认将应用安装在用户目录下（通常为 `C:\Users\<用户名>\scoop`），大多数操作不需要管理员权限。它会为应用创建相应的命令入口，并配置必要的路径，使我们可以直接在终端中调用安装好的工具。

    可以在 PowerShell 中运行以下命令安装 Scoop：

    ```powershell
    Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
    irm get.scoop.sh | iex
    ```

    安装完成后，可以执行 `scoop --version` 检查是否成功。Scoop 的基本用法如下：

    ```powershell
    scoop search <应用名>       # 搜索应用
    scoop install <应用名>      # 安装应用
    scoop list                  # 查看已安装的应用
    scoop info <应用名>         # 查看应用信息
    scoop update                # 更新 Scoop 及应用清单
    scoop update <应用名>       # 更新某个应用
    scoop update *              # 更新所有已安装的应用
    scoop uninstall <应用名>    # 卸载应用
    scoop cleanup *             # 清理所有应用的旧版本
    ```

    包管理器通常需要从应用仓库（Repository）中获取应用包。Scoop 将存放应用安装清单的仓库称为 **Bucket**。

    Scoop 默认提供 `main` Bucket，主要包含常见的命令行程序。对于更丰富的应用，可以添加其他 Bucket，例如 `extras`：

    ```powershell
    scoop install git          # 先安装 Git
    scoop bucket add extras    # 添加 extras 仓库
    scoop install vscode       # 安装 Visual Studio Code
    ```

    进一步阅读：[Scoop 官方文档](https://github.com/ScoopInstaller/Scoop/wiki)。

    ### WinGet

    Windows 还提供微软的包管理工具 [WinGet](https://learn.microsoft.com/en-us/windows/package-manager/winget/)，可以直接使用 `winget` 命令：

    ```powershell
    winget search git                         # 搜索应用
    winget install --id Git.Git --exact       # 安装 Git
    winget list                               # 查看已安装的应用
    winget upgrade                            # 查看可更新的应用
    winget upgrade --all                      # 更新所有支持更新的应用
    winget uninstall --id Git.Git --exact     # 卸载应用
    ```

    WinGet 对传统 Windows 安装程序和各类桌面应用有较好的支持。

=== "macOS"

    [Homebrew](https://brew.sh/) 是 macOS 上广泛使用的包管理器，同时也支持 Linux。它可以管理开发工具、编程语言环境、命令行程序和桌面应用。

    Homebrew 的常用命令如下：

    ```bash
    brew search git       # 搜索应用
    brew install git      # 安装应用
    brew list             # 查看已安装的应用
    brew info git         # 查看应用信息
    brew update           # 更新 Homebrew 的应用信息
    brew upgrade          # 更新已安装的应用
    brew uninstall git    # 卸载应用
    brew cleanup          # 清理旧版本和缓存
    ```

    Homebrew 将应用包主要分为两类：

    - **Formula**：通常用于安装命令行程序、开发工具和库，例如 Git、Python、wget。
    - **Cask**：主要用于安装图形界面应用，例如 Visual Studio Code、Firefox。

    例如：

    ```bash
    brew install wget
    brew install --cask visual-studio-code
    ```

=== "Linux"

    Linux 发行版通常自带包管理器。不同发行版使用的应用仓库、包格式和管理命令各有区别。例如，Fedora 等发行版使用 DNF 管理应用包，Arch Linux 使用 Pacman。

    下面以 APT（Advanced Packaging Tool）为例。APT 是 Debian、Ubuntu 等发行版常用的包管理工具：

    ```bash
    sudo apt update         # 更新本地应用包索引
    apt search git          # 搜索应用
    sudo apt install git    # 安装应用
    sudo apt upgrade        # 升级已安装的应用包
    sudo apt remove git     # 卸载应用
    sudo apt autoremove     # 清理不再需要的依赖
    ```

    这里的 `sudo` 用于以系统管理员权限执行命令：系统级应用安装通常需要修改受保护的目录，因此需要相应权限。`apt update` 更新本地应用包索引，`apt upgrade` 升级已经安装的应用；初学时要注意区分这两个命令。


除了操作系统级别的包管理器，许多编程语言也有自己的包管理工具：

| 编程语言 | 包管理器 |
|---|---|
| Python | pip、uv、Conda |
| JavaScript / Node.js | npm、pnpm |
| Rust | Cargo |
| Ruby | RubyGems（gem） |

这些都是用于在使用某种语言编写代码时，方便地引入第三方库、并管理库之间的依赖等。不过，C/C++ 是没有包管理器的 ¯\\\_(ツ)\_/¯。
