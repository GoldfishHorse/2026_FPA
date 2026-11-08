# 浅谈 C 语言的数据类型

本文简单讨论一些常见而又容易混淆的问题。

## 数据类型概览

C 语言的数据类型可以粗略分为以下几类：

- **算术类型**
    - 整数类型：`char`、`short`、`int`、`long`、`long long`，以及对应的有符号或无符号版本；
    - 浮点类型：`float`、`double`、`long double`。
- **构造类型**
    - 数组（array）；
    - 结构体（`struct`）；
    - 联合体（`union`）；
    - 枚举（`enum`）。
- **指针类型**
    - 对象指针；
    - 函数指针；
    - `void *`。

这个只是一种便于理解的分类，不严谨。

## 字符和字符串

### `char` 的符号性

`char` 用于表示“字符 (character)”，也是 C 语言中最小的整数类型。`sizeof(char)` 永远等于 1，这里的“1”表示一个字节；一个字节通常是 8 位（我们不考虑例外情况），那么，如果作为一个符号的8位整型，其取值范围应该是 0~255；如果是一个无符号的 8 位整型，其取值范围应该是 -128~127。

那么 char 是有符号还是无符号呢？其实是不一定的。C 语言标准从未规定一个 char（字符类型）是有符号数还是无符号数，它可能是有符号的（比如通常使用的 char 基本都是个有符号数），但也可能是无符号数（比如在 ARM 处理器上）。C 语言特地有一个关键字 “`signed`”，用于显式指明是否是一个符号数：

```c
unsigned char ch1;    // 明确为无符号
signed char ch2;      // 明确为有符号
char ch3;             // 符号性由实现决定
```

当然，在只用于代表普通字符时，我们并不需要关心 `char` 的符号。

C 程序表示一个字符使用的是 ASCII 码，而且一般仅限于其中的0到127这个范围内。但同样，我们也可以将它当成一个算数类型，因此它也可以进行加减乘除的运算。这也就不难理解 `'a' + 1` 的结果对应 `'b'`了。

ASCII 表可以参考 [ASCII Code](https://www.ascii-code.com/)。

我们称形如 `'a'`、`'1'`、`'*'` 这样的写法称为**字符字面量**，用一对单引号括起来，其中仅允许有一个字符。值得注意的是，虽然字符类型是 8 位的 char，但是字符串字面量在 C 语言中会被翻译成一个 int，其值对应字符的 ASCII码 :

```c
#include <stdio.h>

int main(void)
{
    printf("%zu\n", sizeof('a'));    // 输出 sizeof(int)，一般是 4
    return 0;
}
```

字符参与整数运算时仍要注意范围，例如，把 `'z' + 26` 的结果存入 `char`，就可能会发生溢出。

### 字符串

C 语言没有独立的“字符串”基本类型。字符串通常表示为一个以空字符 `\0` 结尾的 `char` 数组。

由双引号括起来的字符序列我们称作**字符串字面量**，例如 `"Hello World!"`。在 C 语言中，`"Hello World"` 的类型是 `char[12]`：11 个可见字符，末尾还有编译器自动补上的 `\0`。

如果要将字符串字面量赋予给一个纸张，应该使用指向常量字符的指针：

```c
const char *p = "Hello!";
```

不要像下面这样做，这个是未定义行为 （undefined behavior, UB）：

```c
char *p = "Hello!";
p[1] = 'C';    // 未定义行为
```

由于 C 语言会在字符串末尾自动补零，`sizeof` 会把字符串末尾的空字符也计算在内：

```c
#include <stdio.h>

int main(void)
{
    printf("%zu\n", sizeof(""));             // 1
    printf("%zu\n", sizeof("a"));            // 2
    printf("%zu\n", sizeof("CHINA"));        // 6
    printf("%zu\n", sizeof("How are you"));  // 12
    printf("%zu\n", sizeof("I love you"));   // 11
    return 0;
}
```

在 ASCII 码之外的字符，例如汉字，基本采用的是 UTF-8 编码。一个汉字通常编码为 3 个字节，因此 `sizeof("你好")` 应该是 7。

## 数组和指针

### 数组本身也是类型

当写下 `int a = 1` 时，我们自然会说 `a` 的类型是 `int`。同理：若写下 `int a[3]`，这里 `a` 的类型是 `int[3]`，即“包含 3 个 `int` 元素的数组”。

对于`int a[4][3]`，可以理解为：`a` 是一个包含 4 个元素的数组，而它的每个元素都是 `int[3]` 数组，这是因为二维数组的元素按行连续存储。

### 数组到指针的转换

新手们经常不知道如何理解数组和指针的关系。我们应该明确：数组是一段连续存放的、相同类型的数据而已。数组和指针是两种不同的类型（不能说“数组”就是“指针”），但是数组很容易“变成”（或者说“退化”（decay）成）指向首元素地址的指针，而且两者经常通用。例如，无论a是数组还是指针，都可以用`a[n]`和`*(a+n)`来访问“从地址`a`开始数起的第`n`个元素”，这两种写法等价。

Bjanre Stroustrup 在 [What's wrong with arrays?](https://www.stroustrup.com/bs_faq2.html#arrays) 中是这么评价的：

> “……数组是访问内存中一段对象序列的最佳构造。”
>
> " an array is just about the optimal construct for accessing a sequence of objects in memory"
>
> “……但数组的名称轻轻一动就会转换为指向其第一个元素的指针。”
>
> "the name of an array converts to a pointer to its first element at the slightest provocation"

什么时候数组会变成指针呢？最直接的就是：在传参的时候：

```c
#include <stdio.h>

void print_size(int a[])
{
    printf("%zu\n", sizeof(a));    // 得到指针的大小，而不是整个数组的大小
}

int main(void)
{
    int arr[10];
    printf("%zu\n", sizeof(arr));  // 得到整个数组的大小
    print_size(arr);
    return 0;
}
```

但是数组和指针毕竟是不同的数据类型，它们还是不同的。从上例就可以获知，数组和指针运用`sizeof`会得到不同的结果。在常见的 64 位平台上，指针大小通常为 8 字节；`int arr[10]` 的大小通常为 40 字节。

此外，数组定义与外部声明的类型必须兼容。看下例

=== "a.c"

    ```c
    #include <stdio.h>
    extern int* arr;
    int main()
    {
        for(int i = 0; i < 4; ++i)
        {
            printf("%d ", arr[i]);
        }
        return 0;
    }
    ```

=== "b.c"

    ```c
    int arr[4] = {1, 2, 3, 4};
    ```

For example, use `gcc a.c b.c -o a` to compile.

不出意外，上述代码是无法运行的。因为其将 `array` 定义为一个 4 个`int`元素的数组，但是在`a.c`中却又将其声明为`int`型指针。

再举一例，我们已经知道 `char p[100]` 在很多时候中会转换为 `char *`。但是，二维数组不会直接转换为二级指针。例如：`int a[4][3]`，表达式中的 `a` 通常转换为 `int (*)[3]`，也就是“指向 `int[3]` 数组的指针”，而不是 `int **`。

<a id="complex-declarations"></a>

## 阅读复杂声明

### Clockwise/Spiral Rule

我们初学 C 语言的时候，肯定被 `int *p[]` 和 `int (*p)[]` 弄糊涂过。很多人不能弄清楚（或者想明白为什么）前者是是指针的数组，而后者是数组的指针。 在 1997 年，David Anderson 提出了一个非官方的、名叫 Clockwise/Spiral Rule（顺时针螺旋法则）的技巧来帮助我们判断 C 语言中的复杂变量到底是个什么类型。

基本步骤是：

1. 从待解释的标识符开始，以“螺旋状+顺时针”方向移动，当遇到以下内容时，用相应的语句来代替它们；

    ```text
    [X] or []
    => Array X size of... or Array undefined size of... （即，……的数组）

    (type1, type2)
    => function passing type1 and type2 returning... （即，“接收……并返回……的函数”）

    *
    => pointer(s) to.. （即“指向……的指针”）
    ```

2. 一定要先解决括号里的东西！
3. 重复上面的操作直到所有的符号都被遍历。


### 例 1：指针数组

```text
     +-------+
     | +-+   |
     | ^ |   |
char *str[10];
 ^   ^   |   |
 |   +---+   |
 +-----------+
```

从 `str` 开始：

1. 首先问自己的一个问题：`str` 是什么玩意？

    ```text
    str is an ...
    ```

2. 我们从str开始，以螺旋式顺时针方向移动，看到的第一个字符是`[`，这意味着这里有一个数组，所以...

    ```text
    str is an array 10 of...
    ```

3. 继续以螺旋式的顺时针方向前进，我们遇到的下一符号是`*`，这意味着这里有个指针，所以...

    ```text
    str is an array 10 of pointers to...
    ```

4. 继续沿螺旋方向前进，我们到了行的末端（`;`），继续前进得到了 `char` 类型，所以...

    ```text
    str is an array 10 of pointers to char
    ```

5. 现在已经访问了每一个符号，搞定！

因此，`str` 是“包含 10 个 `char *` 元素的数组”。

### 例 2：函数指针

```c
     +--------------------+
     | +---+              |
     | |+-+|              |
     | |^ ||              |
char *(*fp)( int, float *);
 ^   ^ ^  ||              |
 |   | +--+|              |
 |   +-----+              |
 +------------------------+
```

1. 首先问自己的一个问题：fp是什么玩意？

    ```text
    fp is a ...
    ```

2. 我们从`fp`开始，以螺旋式顺时针方向移动，看到的第一个字符是`)`，因此`fp`在括号内，在括号内继续螺旋式移动，看到的下一个字符是`*`，所以...

    ```text
    fp is a pointer to...
    ```

3. 我们离开了小括号，继续以螺旋式顺时针方向前进，我们看到了`(`；因此，我们遇到了一个函数，所以...

    ```text
    fp is a pointer to a function passing an int and a pointer to float returning...
    ```

4. 继续以螺旋方式进行，然后我们看到 `*` 字符，所以...

    ```text
    fp is a pointer to a function passing an int and a pointer to float returning a pointer to...
    ```

5. 以螺旋的方式继续，我们看到了`;`，但还没有访问所有的符号，所以继续，最后到了`char`类型，所以...

    ```text
    fp is a pointer to a function passing an int and a pointer to float returning a pointer to char
    ```

6. 现在已经访问了每一个符号，搞定！

所以 `fp` 是一个指针，它指向一个函数，这个函数输入一个 `int` 和一个 `float *` 为参数，返回一个 `char *`。

### 例 3：终极挑战！

```c
      +-----------------------------+
      |                  +---+      |
      |  +---+           |+-+|      |
      |  ^   |           |^ ||      |
void (*signal(int, void (*fp)(int)))(int);
 ^    ^      |      ^    ^  ||      |
 |    +------+      |    +--+|      |
 |                  +--------+      |
 +----------------------------------+
```

大家可以自己尝试下 :-)

当然，这种声明很难一次读懂。我们在自己写代码中可以用 `typedef` 改写：

```c
typedef void (*handler_t)(int);
handler_t signal(int, handler_t fp);
```

参考阅读：

- [Clockwise/Spiral Rule 原文](https://c-faq.com/decl/spiral.anderson.html)
- [知乎上的相关讨论](https://www.zhihu.com/question/542944040)。

## 顶层和底层 `const`

“顶层 `const`”和“底层 `const`”是《C++ Primer》里的说法（可参考第五版 §2.4.3），但这和 C++ 关系不大，你只需要知道，下面这些同样适用于 C 语言：

> 用名词**顶层 const** (top-level) 表示指针本身是个常量，而用名词**底层 const**（low-level const）表示指针所指的对象是一个常量。

- **顶层 `const`**：对象本身不可修改；
- **底层 `const`**：通过当前指针不能修改所指对象。

我们来看下面这个例子：

```c
const char *p;
```

用之前的 Clockwise/Spiral Rule 来试着解读一下：

- p is a ...
- （因为p右面只有个; ，所以我们一路向左读，第一个读到了`*`） ：p is a pointer to...
- （读到了`char`）p is a pointer to char ...
- （读到了`const`）p is a pointer to char constant （`p`是个指向`char`常量的指针！）

所以：`p`是个“底层const”，你无法通过`p`去修改`p`指向的字符串的值。

那么下面这个是什么意思呢？

```c
char *const p = NULL;
```

- p is a ...
- p is a constant ...
- p is a constant pointer to ...
- p is a constant pointer to char

所以：`p`是个“顶层 const”，即：`p`本身是const的，你无法修改`p`的值（也就是不能让`p`指向别的地方）。

当然，两种限制也可以同时存在：

```c
const char *const p = NULL;
```

此时，指针本身和通过该指针观察到的字符都不可修改。

此外，下面两种写法等价：

```c
const char *p;
char const *p;
```

进一步比较可参考 [Difference between const char *p, char * const p and const char * const p](https://www.geeksforgeeks.org/difference-const-char-p-char-const-p-const-char-const-p/)。

## `<stdint.h>` 中的标准整数类型

C 语言需要适应不同硬件平台，所以，语言本身要掩盖很多硬件的差异。这就导致了极度混乱的问题。例如：

- `long`的大小是多少？一般是 8 个字节，但也可能 4 个
- 一个指针的大小是多少？同样，一般是 8 个字节，但也可能 4 个
- ……

在 C99 之前，并不能指定平台无关的整数大小，导致跨编译器时会有很大的问题。例如：我的代码里两个指针之差，得到了32位的结果，到了你的机器上，就变成了 64 位结果；这可能导致更糟糕的结果：程序在我的电脑上跑得好好的，在你的电脑上就莫名其妙炸了。

有甚者甚至提出：不建议在任何非临时变量中使用`char`、`short`、`int`、`long` 来表示任何整数并参与运算。这样说有点矫枉过正了，但尤其是大型程序中，我们确实十分希望要保持其兼容性，因此就有了stdint.h这个头文件，定义了标准（或者说：平台无关的）的类型：


| 类别 | 示例 | 含义 |
|---|---|---|
| 精确宽度类型 | `int16_t`、`uint64_t` | 保证变量占用的内存空间一定。前面的`u`代表无符号（unsigned） |
| 最小宽度类型 | `int_least16_t` | 至少具有指定的位数 |
| 最快类型 | `int_fast16_t` | 至少具有指定的位数，并倾向于选择运算较快的类型 |
| 指针整数类型 | `intptr_t`、`uintptr_t` | 提供了一种可移植且安全的方法声明指针，而且和系统中使用的指针（或是说地址）长度相同，对于把指针转化成整数形式来说很有用 |
| 最大宽度类型 | `intmax_t`、`uintmax_t` | 能够支持的最大的整型，通常相当于 64 位的（unsigned）long long int |


此外：

- `<limits.h>` 定义了各种类型的最大/最小值（Maximum/Minimum value）等信息，例如 `INT_MAX`；
- `<inttypes.h>` 于当前平台上的整型的格式化字符串转换宏，例如 `PRId64`，用于格式化`int64_t`类型的有符号整数。

```c
#include <stdio.h>
#include <stdint.h>
#include <inttypes.h>

int main() {
    int32_t myInt = 42;
    printf("The value of myInt is: %" PRId32 "\n", myInt);
    return 0;
}
```
大型程序真的经常需要这种“平台无关的类型“以保证兼容性，他们经常自己重新定义一遍类型才放心，这是几个例子：

- [nginx：`ngx_config.h`](https://github.com/nginx/nginx/blob/master/src/core/ngx_config.h)
- [Linux：`include/linux/types.h`](https://elixir.bootlin.com/linux/latest/source/include/linux/types.h#L37)
- [OpenCV：OpenCL 类型声明](https://github.com/opencv/opencv/blob/17234f82d025e3bbfbf611089637e5aa2038e7b8/3rdparty/include/opencl/1.2/CL/cl.h)

## C99 的指定初始化器

在 C99 中带来了非常灵活的初始化数组和结构体的方法，我们不在需要对完整的数组或者结构体进行初始化，可以只对其一部分进行初始化。

```c
#include <stdint.h>

struct thing {
    uint64_t index;
    uint32_t counter;
};

uint32_t a1[64] = {0};                 // 所有元素初始化为 0
struct thing t1 = {0};                 // 所有成员初始化为 0
uint32_t a2[10] = {[2] = 1, [4] = 6};  // 指定数组元素
struct thing t2 = {.index = 3};        // 指定结构体成员，其余成员为 0
struct thing t3 = {.counter = 0};      // 标准 C99 写法
```

这里未显式指定的元素或成员，会按照静态初始化规则补零。

关于现代 C 标准，可以继续阅读：

- [现代 C99、C11 标准下的 C 语言编程](https://www.elliot98.top/post/tech/modern_c_standard/)
- [How to C in 2016](https://matt.sh/howto-c)

## 字面量前缀和后缀

整数与浮点字面量的前缀、后缀会影响进制和类型。例如：

```c
42       // 十进制 int 常量
42U      // unsigned int
42L      // long
42ULL    // unsigned long long
0x2A     // 十六进制整数
3.14f    // float
3.14L    // long double
```

具体规则可参考：

- [Integer literal in C/C++ (Prefixes and Suffixes)](https://www.geeksforgeeks.org/integer-literal-in-c-cpp-prefixes-suffixes/)
- [Integer constant — cppreference](https://en.cppreference.com/w/c/language/integer_constant)
- [Floating constant — cppreference](https://en.cppreference.com/w/c/language/floating_constant)
