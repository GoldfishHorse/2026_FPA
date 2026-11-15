# 开源软件与许可证

## 开源与自由软件的含义

我们知道，Github 项目把源代码放在互联网，方便其他人阅读与研究。在提供源代码的基础上，**开源软件**（Open Source Software）还通过相应许可证授予使用、修改和再分发等权利，供个人与组织开展开发协作。

一个类似的定义是“**自由软件**（Free Software）”，这个概念是由“软件使用者的权利”来定义的。根据 [GNU 对自由软件的说明](https://www.gnu.org/philosophy/free-sw.zh-cn.html)，使用者拥有以下四项自由：

1. 为任何目的运行程序的自由。
2. 研究程序如何工作，并按自己的需要修改它的自由。
3. 再分发程序副本的自由。
4. 将修改后的版本分发给其他人的自由。

自由软件强调的是使用者拥有的权利，所以是允许采用收费发行、商业支持等经营方式。[自由软件基金会（FSF）](https://www.fsf.org/) 是推动相关理念的组织。开源与自由软件各有自身的定义和倡议机构，许多软件许可证同时满足两者的条件。

<div align="center">
  <img src="https://www.gnu.org/philosophy/category.zh-cn.svg" alt="GNU 对不同类型软件的分类示意图">
  <font size = 2 color = "gray"><i>图片来自 <a href=https://www.gnu.org/philosophy/categories.zh-cn.html>自由与非自由软件的分类</a></i></font>
</div>

可以参考：[什么是自由软件？](https://www.gnu.org/philosophy/free-sw.zh-cn.html)。

## Copyright 与 Copyleft

**Copyright（著作权）** 确定作品及其权利归属。软件作者通常自创作完成时即拥有相应权利，常见的版权声明形式是：

```text
Copyright © 2026 Example Author. All rights reserved.
```

需要保留版权声明的开源许可证同样以著作权制度为基础，作者通过许可证将一部分权利授予使用者。见后文的 [`LICENSE` 和许可证](#licenses)。

**Copyleft** 是一个相对应的概念，简而言之，它是利用著作权及许可证条款，要求再分发的修改版本或某些衍生作品继续遵守指定的许可条件的一种方式。GNU GPL 就是典型的 Copyleft 许可证，它会让项目的后续版本继续提供相应的软件自由。

<a id="licenses"></a>

## `LICENSE` 和许可证

项目公开代码时，仓库根目录会放置 `LICENSE` 文件，载明相应许可证的完整内容。GitHub 创建仓库时提供了许可证模板，也会自动识别一部分常见许可证。

一个**许可证**规定了使用、复制、修改、分发软件的条件。希望在项目之外复制、修改或再分发代码，应先取得作者授予的相应许可。

下面列出几类经常遇到的软件许可证：

| 许可证 | 主要特点 | 链接 |
| --- | --- | --- |
| **MIT** | 相当宽松的许可证， 允许使用、修改、商业利用与再分发，要求保留版权和许可声明。 | <https://mit-license.org/> |
| **Apache-2.0** | 比较宽松许可证，包含明确的专利授权以及保留许可证、标明修改等要求。 | <https://www.apache.org/licenses/LICENSE-2.0.html> |
| **GPLv3** | 较强的 Copyleft 许可证，分发这个许可证下的程序时，需要履行相应的源码开放和同许可证义务。 | <https://www.gnu.org/licenses/gpl-3.0.en.html> |
| **LGPLv3** | 较弱的 Copyleft 许可证，常用于程序库，对库本身的修改及其使用方式作出了规定。 |<https://www.gnu.org/licenses/lgpl-3.0.en.html>|
| **AGPLv3** | 在 GPL 相关要求之外，对经过修改并通过网络向用户提供交互的软件，还增加了提供源代码的义务。 | <https://www.gnu.org/licenses/agpl-3.0.html> |
| **Unlicense** | 放弃版权及相关许可。 | <https://unlicense.org/>|

<div align="center">
  <img src="https://www.ruanyifeng.com/blogimg/asset/201105/free_software_licenses.png" alt="常见软件许可证对比图">
  <br>
  <font size = 2 color = "gray"><i>图片来自 <a href="https://www.ruanyifeng.com/blog/2011/05/how_to_choose_free_software_licenses.html">如何选择开源许可证？ - 阮一峰的网络日志</a></i></font>
</div>

关于各种许可证，大家可以参考： [Choose a License](https://choosealicense.com/licenses/) 及其 [完整许可证列表](https://choosealicense.com/appendix/)。

## 文档、图片与其他内容：Creative Commons

软件以外的文章、图片、图表、影音作品等，经常采用 [Creative Commons（CC）](https://creativecommons.org/share-your-work/cclicenses/) 系列许可证，这类许可证明确了作品如何被分享、引用和改编。

CC 的常见的标记有：

| 标记 | 含义 | 标识 |
| --- | --- | --- |
| **CC0** | 作者通过专用法律工具尽可能放弃相关权利，让作品用于公共领域。 | <img src="https://mirrors.creativecommons.org/presskit/buttons/88x31/png/cc-zero.png" alt="CC0" style="display: block; margin: 0 auto;"> |
| **CC BY** | 允许分享与改编，使用时需要署名原作者（Attribution）。 | <img src="https://mirrors.creativecommons.org/presskit/buttons/88x31/png/by.png" alt="CC BY" style="display: block; margin: 0 auto;"> |
| **CC BY-SA** | 在署名基础上，分发改编作品时要求使用相同的许可条件（ShareAlike）。 | <img src="https://mirrors.creativecommons.org/presskit/buttons/88x31/png/by-sa.png" alt="CC BY-SA" style="display: block; margin: 0 auto;"> |
| **CC BY-NC** | 禁止商用（NonCommercial）。 | <img src="https://mirrors.creativecommons.org/presskit/buttons/88x31/png/by-nc.png" alt="CC BY-NC" style="display: block; margin: 0 auto;"> |
| **CC BY-NC-SA** | 署名原作者、禁止商用、并要求使用相同许可证。 | <img src="https://mirrors.creativecommons.org/presskit/buttons/88x31/png/by-nc-sa.png" alt="CC BY-NC-SA" style="display: block; margin: 0 auto;"> |
| **CC BY-ND** | 署名原作者，且不能修改作品（NoDerivatives）。 | <img src="https://mirrors.creativecommons.org/presskit/buttons/88x31/png/by-nd.png" alt="CC BY-ND" style="display: block; margin: 0 auto;"> |
| **CC BY-NC-ND** | 署名、禁止商用，且不能修改作品。 | <img src="https://mirrors.creativecommons.org/presskit/buttons/88x31/png/by-nc-nd.png" alt="CC BY-NC-ND" style="display: block; margin: 0 auto;"> |

CC 许可证当前的版本是 4.0，写法如 `CC BY 4.0`。
