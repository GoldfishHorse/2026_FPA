# 编程规范

<div align="center" markdown="1">

![](https://pic4.zhimg.com/v2-a7e66b3114a1b673e6c4d9e751da4289_r.jpg)

</div>

!!! note
    有些相关知识课上还未学到，零基础的同学们可以回头再看这里的内容。

C 语言“编程规范”在那些教材中很少提及，但值得在这里特别补充。每个人写代码都有独特的习惯，包括大括号位于行尾还是换行、缩进用 4 空格、2 空格还是 Tab，更深一层还有不同的设计习惯，人们彼此争论不休。

一般来说，团队开发前一般都会为团队制定统一的代码规范。好的代码规范保证了最终的代码能给人看，而且能更好地开发和维护，降低你的 bug 和掉发率。

一个好的程序编写规范是编写高质量程序的保证。清晰、规范的程序不仅仅是**方便阅读**，更重要的是能够写出**更不容易出错**（less error-prone）的代码，以及便于你或者韦来共同开发的同事来检查错误、提高调试效率，从而最终**保证程序的质量和可维护性**。

> 整洁的代码如同优美的散文。—— Grady Booch
>
> 任何一个傻瓜都能写出计算机可以理解的代码。唯有写出人类容易理解的代码，才是优秀的程序员。—— Martin Fowler
>
> A standard says what will work, and how. It does not say what constitudes good and effective use. There are significant differences between understanding the technical details of programming language features and using them effectively in combination with other features, libraries, and tools to produces better software. By "better" I mean "more maintainable, less error-prone, and faster". We need to develop, popularize, and support conherent programming styles. Futher, we must support the evolution of older code to these more modern, effective, and coherent styles. —— Bjanre Stroustrup

首先要明确，在同一个编程语言中，代码规范也有不同标准；不同的情境和项目里，代码规范也大可不必相同。团队内部达成一致即可。以及，除了保持自身的良好编程习惯外，你还可以找到一些帮助，如 VSC 的 `shift+alt+f` 可以自动调整代码排版。


## 命名

常见的命名方式包括下划线命名法、大驼峰命名法和小驼峰命名法。一个项目中应统一不同类别标识符的命名方式。

```c
const char *my_first_name = "Goldfish"; // 下划线命名法
const char *MyFirstName = "Goldfish";   // 大驼峰命名法（又称帕斯卡命名法）
const char *myFirstName = "Goldfish";   // 小驼峰命名法
```

标识符应尽量表达其含义。只在作用范围很小且含义明确时使用 `i`、`j`、`x` 等短名称；应避免 `ll`、`haizi` 等难以理解或容易混淆的命名。

**要遵守的命名原则**：

- 命名方式统一。
- 使用含义清楚的英文单词，避免仅用汉语拼音命名。
- 在含义明确的前提下控制名称长度。
- 避免 `1`、`l`、`I`、`O`、`o`、`0` 等容易混淆的字符，也不要让不同标识符仅依靠大小写区分。

## 缩进、空格和换行

- `if`、`for`、`while`、`switch` 等关键字与后面的圆括号之间留一个空格。二元运算符两侧一般也各留一个空格，例如 `int a = x - y;`。
- 常见缩进宽度有 2 个空格或 4 个空格。一个项目中应保持统一，不要混用 Tab 和空格。
- 不要在 `->`、`.` 前后加空格，不要在 `,`、`;` 之前加空格，也不要在行尾留下多余空格。
- 即使 `if`、`else`、`for`、`while` 的语句体只有一行，也建议使用大括号，避免后续修改时引入错误。

格式化工具可以帮助统一缩进和空格，但不能代替对代码逻辑的检查。

## 注释

注释应说明代码的用途、约束或设计原因，不必重复代码本身已经清楚表达的内容。修改代码时，也要同步更新相关注释。

- 对用途、参数或返回值不容易从声明中看出的函数，可以添加函数注释。
- 对容易误解的逻辑、特殊边界条件或重要约束，应添加说明，可用 `// NOTE ... `。
- 尚未完成或需要进一步优化的代码，可以使用 `// TODO ...` 标记。

如果使用 [Doxygen](https://www.doxygen.nl/index.html) 生成文档，可以为函数添加 Doxygen 风格的注释。例如：

```c
/**
 * 这里写该函数的详细说明。
 * @param a 被测试的变量
 * @param s 指向描述测试信息的字符串
 * @return 测试结果
 */
int test_me(int a, const char *s);
```

## 其他注意事项

除了上述提到的内容外，一个“编程规范”还可以包括许多内容，下面列举了很多规范。 不过，简单的描述总是很不形象，而且若非亲历过某些痛苦和折磨，可能就不会对某一条形成深刻的理解。因此下面这些可以暂时忽略。

### 一般原则
- 在做除法之前，想一下除数是否可能为 0？是否会导致溢出？
- 在引用一个指针的之前（例如 `*p` 或者 `p->XXX`）时， `p` 是否可能是空指针？

### 函数

- 参数较多、一行放不下时，可以将参数分行，并保持统一的缩进方式。
- 一个函数应集中完成一项清晰的任务；逻辑上相关的语句放在一起，不同阶段之间可以用空行分隔。
- 非 `void` 函数应在需要返回结果的执行路径上返回与返回类型相符的值。`main` 执行到末尾等价于返回 `0`，也可以显式写出 `return 0;`。
- 指针参数所指向的数据如果不应被函数修改，可以使用指向 `const` 的指针。
- 不要返回局部变量的地址。
- 使用 `malloc`、`calloc` 后应检查返回值是否为 `NULL`。使用 `realloc` 时应先用临时指针接收返回值，避免失败时丢失原指针。
- 动态分配的内存在不再使用时应释放。将指针置为 `NULL` 只能避免继续误用这一个指针，不能消除其他指向同一内存的悬垂指针。

### 代码块

- 避免在一行中放入多个彼此无关的操作。
- 代码行长度应控制在团队约定的范围内，例如 80、100 或 120 个字符。
- C99 及以后的标准允许在代码块中就近声明变量。变量应尽量靠近首次使用的位置，并在声明时完成初始化。

### `switch` 语句

- `case` 中如果需要声明局部变量，可以使用一对大括号建立清晰的作用域。
- `case` 与 `switch` 的缩进方式应在项目中保持一致。
- 每个 `case` 都应明确结束控制流，例如使用 `break`、`return` 或 `continue`。如果有意继续执行下一个 `case`，应添加清楚的注释。

### 循环

- C 语言中常用 `while (1)` 或 `for (;;)` 表示死循环。
- 循环条件和循环变量的修改应清晰集中，避免在循环体的多个位置隐式改变循环次数。

### 结构体、类型与文件

- 可以用 `typedef` 简化复杂类型名。
- 结构体赋值会复制各成员的值。如果结构体含有指针，复制后两个结构体中的指针可能指向同一块内存，需要明确内存所有权和释放责任。
- 可以用 `enum` 表示一组相关的整数常量。
- 不要为了消除编译器警告而随意添加强制类型转换；确有转换需要时，应确认取值范围、符号和精度是否安全。
- 使用浮点数时，不要假定计算结果能够进行精确的相等比较，并注意 `float` 与 `double` 的精度差异。

## 相关阅读

- Robert C. Martin，*Clean Code*（罗伯特·马丁，《代码整洁之道》）
- Martin Fowler，*Refactoring: Improving the Design of Existing Code*（《重构：改善既有代码的设计》）
- *Beautiful Code: Leading Programmers Explain How They Think*（《代码之美》）
- John Ousterhout，*A Philosophy of Software Design*
- [Linux kernel coding style](https://www.kernel.org/doc/html/latest/process/coding-style.html)
- [Nginx Development Guide: Code style](https://nginx.org/en/docs/dev/development_guide.html#code_style)
- [SEI CERT C Coding Standard](https://wiki.sei.cmu.edu/confluence/display/c/SEI+CERT+C+Coding+Standard)
- [WG14：C 语言标准工作组](https://www.open-std.org/jtc1/sc22/wg14/)

反面示例：

- [trekhleb/state-of-the-art-shitcode](https://github.com/trekhleb/state-of-the-art-shitcode)
