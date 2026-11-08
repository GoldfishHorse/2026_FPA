# Vim：在命令行中编辑文本

在服务器上工作时，我们不一定有图形编辑器可用；此时，直接在终端中修改代码或配置文件就很方便。[Vim](https://www.vim.org/) 的名字意为 *Vi IMproved*，即“功能更加丰富的 vi 系编辑器”。它可以让我们只用键盘完成复杂的编辑操作。

Linux 用户一般可以通过发行版包管理器安装 Vim，macOS 用户可以使用 Homebrew。Windows 用户可以访问 [Vim 官方下载页](https://www.vim.org/download.php)，也可以安装 [Neovim](https://neovim.io)。习惯 VS Code 的同学还可以尝试 [VSCode Vim 插件](https://marketplace.visualstudio.com/items?itemName=vscodevim.vim)，使用类似 Vim 的快捷键进行编辑。

## Vim 的模式

Vim 的一个突出特点是**模式**（mode）。启动后通常进入 Normal（普通）模式，键盘按键会被解释为编辑操作；此时直接输入文字可能不会得到预期结果。最常用的四种模式是：

| 模式 | 主要任务 | 常见进入方式 |
|---|---|---|
| Normal | 移动光标、删除或修改文本、组合操作 | 启动 Vim 后默认进入；按 `Esc` 返回 |
| Insert | 正常输入文字 | Normal 模式下按 `i`，也可用 `a`、`o` 等 |
| Command-line（命令行模式） | 输入保存、退出等冒号命令 | Normal 模式下按 `:` |
| Visual | 选择文字，再执行复制、删除等操作 | Normal 模式下按 `v`，或使用其他 Visual 相关快捷键 |

<div align="center">
  <img src="https://raw.githubusercontent.com/TonyCrane/PracticalSkillsTutorial/master/slides/src/lec1/modes.png" alt="Vim 的模式转换关系">
</div>

很多 Vim 新手最常见的困惑是：为什么按键后不能输入，甚至不知道怎样退出？理解“模式”以后就知道了：此时的按键可能正在执行 Normal 模式命令。

## 入门操作

| 操作 | 说明 |
|---|---|
| `vim hello.txt` | 从 Shell 打开文件 |
| 按 `i` | 进入 Insert 模式，可以输入文字 |
| 按 `Esc` | 回到 Normal 模式 |
| 输入 `:w` | 保存文件 |
| 输入 `:q` | 退出 Vim |
| 输入 `:wq` | 保存并退出 |
| 输入 `:q!` | 放弃未保存的修改并强制退出 |
| 输入 `:x` | 在需要时写入修改并退出 |

!!! note
    `:w`、`:q`、`:wq`、`:q!` 和 `:x` 都是在 Vim 内部输入的编辑器命令，不能直接拿到 Shell 中执行。

在 Normal 模式中，Vim 的经典移动按键是 `h`（左）、`j`（下）、`k`（上）、`l`（右），因此不需要频繁把手移到方向键区域。`i` 用来在光标前进入 Insert 模式，`a` 可以在光标后追加，`o` 则在下一行打开新行；按 `Esc` 返回 Normal 模式。

Vim 的命令还可以组合起来。例如，按 `Ctrl-V` 进入 Visual Block（可视块）模式，选中若干行的行首，按大写 `I` 输入注释符号（如 `//`），再按 `Esc`，即可在选定的多行前插入相同内容。

## 快捷键速查

下面几张速查图汇集了 Normal 模式中的常用操作，适合在练习时查阅。

<div align="center">
  <img src="https://raw.githubusercontent.com/TonyCrane/PracticalSkillsTutorial/master/slides/src/lec1/vimcheatsheet.png" alt="Vim 快捷键速查表">
  <p><em>来源：<a href="https://vimcheatsheet.com">vimcheatsheet.com</a>。</em></p>
</div>

<div align="center">
  <img src="https://raw.githubusercontent.com/TonyCrane/PracticalSkillsTutorial/master/slides/src/lec1/vim-cheat-sheet.gif" alt="ViEmu 的 Vim 操作图解">
  <p><em>来源：<a href="http://www.viemu.com/a_vi_vim_graphical_cheat_sheet_tutorial.html">ViEmu 图形教程</a>。</em></p>
</div>

<div align="center">
  <img src="https://raw.githubusercontent.com/TonyCrane/PracticalSkillsTutorial/master/slides/src/lec1/vi-vim-tutorial-1.gif" alt="ViEmu 的 Vim 基础操作图">
  <p><em>其他操作图解也可在 <a href="http://www.viemu.com/a_vi_vim_graphical_cheat_sheet_tutorial.html">ViEmu</a> 查看。</em></p>
</div>

## 基础配置

Vim 的个人配置文件一般位于 `~/.vimrc`。如果希望 Vim 打开代码时自动显示行号、启用缩进和语法高亮等功能，可以加入下面的配置：

```vim
syntax on           " 启用语法高亮
colorscheme slate   " 颜色主题
set tabstop=4       " Tab 算作的空格数
set expandtab       " 用空格替换 Tab
set softtabstop=4   " 输入 Tab 时替换的空格数
set shiftwidth=4    " 自动缩进空格数
set autoindent      " 自动缩进
set smartindent     " 智能缩进
set number          " 行号
set ruler           " 显示光标所在行列
set scrolloff=3     " 光标上下两侧保留的行数
set showmatch       " 提示配对的括号
set hlsearch        " 高亮显示搜索结果
set incsearch       " 实时显示搜索结果
```

## 继续学习

这里对 Vim 的介绍比较简略。如下是更多学习资料：

+ 最直接的学习方法是在终端输入 `vimtutor`，启动 Vim 自带的交互式教程。
+ 如果喜欢边玩边学，可以尝试 [Vim Adventures](https://vim-adventures.com)。
+ 需要速查时，推荐 [vimcheatsheet.com](https://vimcheatsheet.com)、[ViEmu](http://www.viemu.com/a_vi_vim_graphical_cheat_sheet_tutorial.html) 和 [vim.rtorr.com 中文版](https://vim.rtorr.com/lang/zh_cn)。
+ 如果希望系统学习，可以参考中文资料[《Vim 从入门到精通》](https://gitlab.com/wsdjeg/vim-galore-zh_cn)。
