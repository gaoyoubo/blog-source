---
title: Go 简易教程
tags:
  - Go
originContent: ''
categories:
  - 程序员
toc: false
date: 2019-04-28 12:15:05
---

# 关于本书

## 授权许可

本书中的内容使用 [CC BY-NC-SA 4.0](http://creativecommons.org/licenses/by-nc-sa/4.0/)（署名 - 非商业性使用 - 相同方式共享4.0许可协议）授权。你不必为此书付费。
你可以免费的复制、发布、修改或者展示此书。但是，这本书的版权归原作者Karl Seguin所有，不要将此书用于商业目的。

关于许可证的全部内容你可以浏览以下网站：

http://creativecommons.org/licenses/by-nc-sa/4.0/

## 最新版本

这本书的最新版本可以在以下网站获得:
http://github.com/karlseguin/the-little-go-book



# 前言

每次提起学习一门新语言，我真的是又爱又恨。一方面，语言是我们的行事之本，即使一些小的变化都会对事情有重大的影响。可能有时一闪而过的 *灵感* 就会对你如何编程产生长久的影响力，并重新定义你对其他语言的期望。而头疼的是，语言的设计是呈增量式的，要学习新的关键字、类型系统、代码风格以及新的库、社区和范例真的是难言其苦。相比于所有其他必须学习的事情，花时间在一门新的语言上貌似真的是很糟糕的投资。

即便如此，我们还是得走下去。我们 *必须* 得乐于每天一点点地进步，因为“语言是我们的行事之本”。虽然语言的变化往往会是循序渐进的，但它影响范围仍然很广，包括了有生产率、可读性、性能、可测试性、依赖性管理、错误处理、文档、简要、社区、标准库等等。所以，有好点的说法来形容 *千刀万剐* 么？

 留给我们一个重要问题就是：为什么选择 **Go?** 。对于我来说，有两条原因。第一条，它是一种相对简单的语言，且具有相对简单的标准库。在很多方面，Go 的特性语法是为了简化我们在过去几十年中添加到编程语言中的一些复杂特性。另外一条原因就是对于许多开发者来说，它将补充您的知识面。

Go 是作为系统语言（例如：操作系统，设备驱动程序）创建的，因此它针对的是 C 和 C++ 开发人员。按照 Go 团队的说法，应用程序开发人员已经成为 Go 的主要用户而不是系统开发人员了，这个说法我也是相信的。为什么？我不能权威的代表系统开发人员说话，但对于我们这些构建网站，服务，桌面应用程序等的人来说，它可以部分的归结为对一类系统的新兴需求，这类系统介于低级系统应用程序和更高级的应用程序之间。

可能 Go 语言有消息传递机制，缓存，重计算数据分析，命令行接口，体制和监控，我不知道给 Go 语言什么样的标签，但是在我的职业生涯中，随着系统的复杂性不断增加，以及动辄成千上万的并发，显然对定制基础类型系统的需求不断增加。你可以使用 Ruby 或者 Python 构建这样的系统（大多人都这样做），但这些类型的系统可以从更严格的类型系统和更高的性能中受益。类似地，你可以使用 Go 来构建网站（很多人都愿意这样做），但我仍然喜欢 Node 或者 Ruby 对这类系统展现出的表现力。

Go 语言还擅长其他领域。比如，当运行一个编译过的 Go 程序时，他没有依赖性。你不必担心用户是安装了 Ruby 或者 JVM，如果这样，你还要考虑版本。出于这个原因，Go  作为命令行程序以及其他并发类型的工具（日志收集器）的开发语言变得越来越流行。

坦白来说，学习 Go 可以有效利用你的时间。你不必担心会花费很长时间学习 Go 甚至掌握它，你最终会从你的努力中得到一些实用的东西。


## 作者注解

对于写这本书我犹豫再三，主要有两个原因。第一个是 Go 有自己的文档，特别是 [Effective Go](https://golang.org/doc/effective_go.html)。

另一个是在写一本关于语言类的书的时候我会有点不安。当我们写 《 The Little MongoDB Book》 这本书的时候，我完全假设大多数读者已经理解了关系型数据库和建模的基本知识。在写 《The Little Redis Book》这本书的时候，你也可以同样假设读者已经熟悉键值存储。

在我考虑未来的某些章节的时候，我知道不能再做出同样的假设。你花多长时间学习并理解接口，这是个新的概念，我希望你从中学到的不仅仅是 **Go 有提供接口**，并且还有如何使用它们。最终，我希望你向我反馈本书的哪部分讲得太细或者太粗，我会感到很欣慰，也算是我对读者们的小小要求了。


# 第一章 · 基础
## 入门

如果你想去尝试运行 Go 的代码，你可以去看看  [Go Playground](https://play.golang.org/)  ,它可以在线运行你的代码并且不要安装任何东西。这也是你在 [Go 的论坛区](https://groups.google.com/forum/#!forum/golang-nuts)和 StackOverflow 等地方寻求帮助时分享 Go 代码的最常用方法。

Go 的安装很简单。你可以用源码去安装，但是我还是建议你使用其中一个预编译的二进制文件。当你 [跳转到下载页面](https://golang.org/dl/)，你将会看到 Go 语言的在各个平台上的安装包。我们会避免这些东西并且学会如何在自己的平台上安装好 Go。正如你所看到的的那样，安装 Go 并不是很难。

除了一些简单的例子， Go 被设计成代码在工作区内运行。工作区是一个文件夹，这个文件夹由 `bin` ，`pkg`，以及`src`子文件夹组成的。你可能会试图强迫 Go 遵循自己的风格-不要这么去做。

一般，我把我的项目放在 `~/code` 文件夹下。比如，`~/code/blog` 目录就包含了我的 blog 项目。对于 Go 来说，我的工作区域就是 `~/code/go` ，然后我的 Go 写的项目代码就在 `~/code/go/src/blog` 文件夹下。

简单来说，无论你希望把你的项目放在哪里，你最好创建一个 `go` 的文件夹，再在里面创建一个 `src` 的子文件夹。

### OSX / Linux 系统安装 Go

下载适合你自己电脑系统的 `tar.gz` 文件。对于 OSX 系统来说，你可能会对 `go#.#.#.darwin-amd64-osx10.8.tar.gz` 感兴趣，其中 `#.#.#` 代表 Go 的最新版本号。

通过  `tar -C /usr/local -xzf go#.#.#.darwin-amd64-osx10.8.tar.gz` 命令将文件加压缩到 `/usr/local` 目录下

设置两个环境变量：

1.`GOPATH` 指向的是你的工作目录，对我来说，那个目录就是 `$HOME/code/go`
2.我们需要将 Go 的二进制文件添加到的 `PATH`变量中。 

你可以通过下面的 shell 去设置这两个环境变量：

    echo 'export GOPATH=$HOME/code/go' >> $HOME/.profile
    echo 'export PATH=$PATH:/usr/local/go/bin' >> $HOME/.profile

你需要将这些环境变量激活。你可以关掉 shell 终端，然后在打开 shell 终端，或者你可以在 shell 终端运行 `source $HOME/.profile`。

在命令终端输入 `go version`，你将会得到一个 `go version go1.3.3 darwin / amd64` 的输出，Go 就安装完成了。

### Windows 系统
下载最新的 zip 文件。如果你的电脑是 64 位的系统，你将需要 `go#.#.#.windows-amd64.zip` ，这里的  `#.#.#` 是 Go 的最新版本号。

解压缩  `go#.#.#.windows-amd64.zip` 文件到你选择的位置。 `c:\Go`这个位置是个不错的选择。

在系统中设置两个环境变量：

1.  `GOPATH` 同样的指向的是你的工作目录。这个变量看起来像`c:\users\goku\work\go` 这个样子。
2. 添加 `c:\Go\bin`  到系统的 `PATH` 环境变量。

你可以通过「系统」 控制面板的 「高级」 选项卡上的 「环境变量」按钮设置环境变量。 某些版本的 Windows 通过「系统」控制面板中的「高级系统选项」选项此控制面板。

打开一个 `cmd` 命令终端，输入 `go version`。 你会得到一个 `go version go1.3.3 windows/amd64` 的输出，即表示 Go 安装完成。


Go 是一门编译型，具有静态类型和类 C 语言语法的语言，并且有垃圾回收（GC）机制。这是什么意思？

## 编译

编译是将源代码翻译为更加低级的语言的过程——翻译成汇编语言（例如 Go），或是翻译成其他中间语言（如 Java 和 C#）。

编译型语言可能会让你很不爽，因为编译过程实在是太慢了。如果每次都需要花好几分钟甚至好几个小时去等待代码编译的话，很难进行快速迭代。而编译速度是 Go 的主要优化目标之一。这对我们这些从事大型项目开发或者是习惯用解释型快速看到程序结果的人来说，确实是一件好事。

编译型语言注重于运行速度和无依赖执行程序（至少对于 C/C++ 和 Go 来说是这样的，直接将依赖编译到程序中）。


## 静态类型

静态类型意味着变量必须是特定的类型（如：int, string, bool, []byte 等等），这可以通过在声明变量的时候，指定变量的类型来实现，或者让编译器自行推断变量的类型（我们将很快可以看到实例）。

关于静态类型的东西，可以说的还有很多，但是我相信通过看代码能更好的理解静态类型是什么。如果你习惯于动态类型语言， 你可能会发现这很麻烦。这种想法没错，但是静态类型语言也有优点，特别是当你将静态类型和编译配对使用时。这两者经常混为一谈。确实当你有其中一个的时候，通常也会有另一个，但是这不是硬性规定的。使用强类型系统，编译器能够检测除语法错误之外的问题从而进一步优化。



## 类 C 语法

当说到一门语言是类 C 语法的时候，通常意味着如果你用过其他类 C 语言如：C，C++，Java，JavaScript 和 C#，你会觉得 Go 的语法很熟悉——最少表面上是这样的。举个例子，`&&` 用于逻辑 AND，`==` 用于判断是否相等，`{` 和 `}` 是块的开始和结束，数组下标的起始值为 0。

类 Ｃ 语法也倾向于用分号表示作为语句结束符，并将条件写在括号中。Go 不支持这些，但是仍然使用括号来控制优先级。例如，一个 `if` 语句是这样的：

```go
if name == "Leto" {
  print("the spice must flow")
}
```

在很多复杂系统中，括号符还是很有用的：

```go
if (name == "Goku" && power > 9000) || (name == "gohan" && power < 4000)  {
  print("super Saiyan")
}
```

除此之外，Go 要比 C# 或 Java 更接近 C - 不仅是语法方面，还有目的方面。这反映在语言的简洁和简单上，希望你在学习它的时候能慢慢体会这一点。



## 变量和申明

如果我们用 x = 4 来申明和赋值变量，那么我们就可以同时开始和结束对变量的查看了。遗憾的是，Go 更为复杂些。我们将通过简单的示例来开始我们的学习。然后，在下一章中，我们会在创建和使用结构体时，进一步扩展。尽管如此，你可能还得花一段时间来适应，才能感受到它带给你的舒适感。

你可能会想：“哇！这有什么复杂的？”。 让我们开始一个例子。

下面的例子是 Go 中，申明变量和赋值最为明确的方法，但也是最为冗长的方法：

```go
package main

import (
  "fmt"
)

func main() {
  var power int
  power = 9000
  fmt.Printf("It's over %d\n", power)
}
```

这里我们定义了一个 `int` 类型的变量 `power`。默认情况下，Go 会为变量分配默认值。Integers 的默认值是 `0`，booleans 默认值是 `false`，strings 默认值是 `""` 等等。下面，我们创建一个值为 `9000` 的名为 `power` 的变量。我们可以将定义和赋值两行代码合并起来：

```go
var power int = 9000
```

不过，这么写太长了。Go 提供了一个方便的短变量声明运算符 `:=` ，它可以自动推断变量类型：

```go
power := 9000
```

这非常方便，它可以跟函数结合使用，就像这样：

```go
func main() {
  power := getPower()
}

func getPower() int {
  return 9001
}
```

值得注意的是要用 `:=` 来声明变量以及给变量赋值。相同变量不能被声明两次（在相同作用域下），如果你尝试这样，会收到错误提示。

```go
func main() {
  power := 9000
  fmt.Printf("It's over %d\n", power)

  // 编译器错误：
  //  := 左侧不是新的变量
  power := 9001
  fmt.Printf("It's also over %d\n", power)
}
```

编辑器会告诉你 * := 左侧不是新的变量*。这就意味着当我们首次声明一个变量时应该使用 `:=` ，后面再给变量赋值时应该使用 `=`。这似乎很有道理，但是凭空来记忆且需要根据情况来切换却是很难的事。

如果你仔细阅读代码的错误信息，你会发现 *variables* 单词是个复数，即有多个变量，那是因为go支持多个变量同时赋值（使用 `=` 或者 `:=`）：


```go
func main() {
  name, power := "Goku", 9000
  fmt.Printf("%s's power is over %d\n", name, power)
}
```

另外，多个变量赋值的时候，只要其中有一个变量是新的，就可以使用`:=`。例如：

```go
func main() {
  power := 1000
  fmt.Printf("default power is %d\n", power)

  name, power := "Goku", 9000
  fmt.Printf("%s's power is over %d\n", name, power)
}
```

尽管变量 `power` 使用了两次`:=`，但是编译器不会在第 2 次使用 `:=`时报错，因为这里有一个新的 `name`变量，它可以使用`:=`。然后你不能改变 `power` 变量的类型，它已经被声明成一个整型，所以只能赋值整数。

到目前为止，你最后需要了解的一件事是，Go 会像 import 一样，不允许你在程序中拥有未使用的变量。例如：

```go
func main() {
  name, power := "Goku", 1000
  fmt.Printf("default power is %d\n", power)
}
```

这将不会通过编译，因为 `name` 是一个被申明但是未被使用的变量，就像 import 的包未被使用时，也将会导致编译失败，但总的来说，我认为这有助于提高代码的清洁度和可读性。

还有更多关于的申明和赋值的技巧。初始化一个变量时，请使用：` var NAME TYPE`；给变量申明及赋值时，请使用： `NAME := VALUE` ； 给之前已经申明过的变量赋值时，请使用： `NAME = VALUE` 



## 垃圾回收

一些变量，在创建的时候，就拥有一个简单定义的生命周期。对于函数中的变量，会在函数执行完后进行销毁。在别的语言中，对于编译器而言，这不会很明显。例如：函数返回的变量，或者由其他变量和对象所调用的变量，它们的生命周期是很难确定的。 如果没有垃圾回收机制，那么开发人员就得知道有哪些不需要用到的变量，并将它们释放。就像 C 语言，你需要使用 `free(str);` 来释放变量。 

语言的垃圾回收机制（像：Ruby, Python, Java, JavaScript, C# , Go）是会对变量进行跟踪，并在没有使用它们的时候，进行释放。垃圾回收会增加一些额外的开销，但是也减少了一些致命性的 BUG。



## 运行 go 代码

创建一个简单的程序然后学习如何编译和运行它。打开你的文本编辑器写入下面的代码：

```go
package main

func main() {
  println("it's over 9000!")
}
```

保存文件并命名为 `main.go` 。 你可以将文件保存在任何地方；不必将这些琐碎的例子放在 go 的工作空间内。

接下来，打开一个 shell 或者终端提示符，进入到文件保存的目录内， 对于我而言， 应该输入 `cd ~/code` 进入到文件保存目录。

最后，通过敲入以下命令来运行程序：

```
go run main.go
```

如果一切正常(即你的 golang 环境配置的正确)，你将看到 *it's over 9000!* 。

但是编译步骤是怎么样的呢？ `go run` 命令已经包含了**编译**和**运行**。它使用一个临时目录来构建程序，执行完然后清理掉临时目录。你可以执行以下命令来查看临时文件的位置：

```
go run --work main.go
```

明确要编译代码的话，使用 `go build`:

```
go build main.go
```

这将产生一个可执行文件，名为 `main` ，你可以执行该文件。如果是在 Linux / OSX 系统中，别忘了使用 `./` 前缀来执行，也就是输入 `./main`  。

在开发中，你既可以使用 `go run` 也可以使用 `go build` 。但当你正式部署代码的时候，你应该部署通过 `go build` 产生的二进制文件并且执行它。

### 入口函数 Main

希望刚才执行的代码是可以理解的。我们刚刚创建了一个函数，并且使用内置函数 `println` 打印出了字符串。难道仅因为这里只有一个选择，所以 `go run` 知道执行什么吗？？不。在 go 中程序入口必须是 `main` 函数，并且在 `main` 包内。

我们将在后面的章节中详细介绍`包`。目前，我们将专注于理解 go 基础，一直会在 `main` 包中写代码。

如果你想尝试，你可以修改代码并且可以更改包名。使用 `go run` 执行程序将出现一个错误。 接着你可以将包名改回 `main` ，换一个不同的方法名，你会看到一个不同的错误。尝试使用 `go build` 代替 `go run` 来执行刚才的代码，注意代码编译时，没有入口点可以执行。但当你构建一个库时，确实完全正确的。


## 导入包

Go 有很多内建函数，例如 `println`，可以在没有引用情况下直接使用。但是，如果不使用 Go 的标准库直接使用第三方库，我们就无法走的更远。`import` 关键字被用于去声明文件中代码要使用的包。

修改下我们的程序：

```go
package main

import (
  "fmt"
  "os"
)

func main() {
  if len(os.Args) != 2 {
    os.Exit(1)
  }
  fmt.Println("It's over", os.Args[1])
}
```

你可以这样运行：

```
go run main.go 9000
```

我们现在用了 Go 的两个标准包：`fmt` 和 `os` 。我们也介绍了另一个内建函数  `len` 。`len`  返回字符串的长度，字典值的数量，或者我们这里看到的，它返回了数组元素的数量。如果你想知道我们这里为什么期望得到两个参数，它是因为第一个参数 -- 索引0处 -- 总是当前可运行程序的路径。（更改程序将它打印出来亲自看看就知道了）

你可能注意到了，我们在函数名称前加上了前缀包名，例如，`fmt.PrintLn`。这是不同于其他很多语言的。后续的章节中我们将学习到更多关于包的知识。现在，知道如何导入以及使用一个包就是一个好的开始。

在 Go 中，关于导包是很严格的。如果你导入了一个包却没有使用将会导致编译不通过。尝试运行下面的程序：

```go
package main

import (
  "fmt"
  "os"
)

func main() {
}
```

你应该会得到两个关于 `fmt` 和 `os` 被导入却没有被使用的错误。这很烦人的是不是呀？绝对是这样的，不过随着时间的推移，你将慢慢习惯它（虽然仍然烦人，不过要以 Go 的思维写 Go）。Go 如此严格是因为没用的导入会降低编译速度；诚然，我们大多数人不会关注这个问题。

另一个需要记住的事情是 Go 的标准库已经有了很好的文档。你可以访问 <https://golang.org/pkg/fmt/#Println> 去看更多关于 `PrintLn` 函数的信息。你可以点击那个部分的头去看源代码。另外，也可以滚动到顶部查看关于 Go 格式化功能的更多消息。

如果没有互联网，你可以这样在本地获取文档：

```
godoc -http=:6060
```

然后浏览器中访问  `http://localhost:6060`



## 函数声明

这是个好时机指出函数是可以返回多个值的。让我们看三个函数：一个没有返回值，一个有一个返回值，一个有两个返回值。

```go
func log(message string) {
}

func add(a int, b int) int {
}

func power(name string) (int, bool) {
}
```

我们可以像这样使用最后一个：

```go
value, exists := power("goku")
if exists == false {
  // 处理错误情况
}
```

有时候，你仅仅关注其中一个返回值。这个情况下，你可以将其他的返回值赋值给空白符`_`：

```go
_, exists := power("goku")
if exists == false {
  // handle this error case
}
```

这不仅仅是一个惯例。`_` ，空白标识符，特殊在于实际上返回值并没有赋值。这让你可以一遍又一遍地使用 `_` 而不用管它的类型。

最后，关于函数声明还有些要说的。如果参数有相同的类型，您可以用这样一个简洁的用法：

```go
func add(a, b int) int {

}
```

返回多个值可能是你经常使用的，你也可能会频繁地使用 `_` 丢弃一个值。命名返回值和稍微冗长的参数声明不太常用。尽管如此，你将很快遇到他们，所以了解他们很重要。


## 继续之前

我们之前看了很多小的独立片段，在这点上，可能会感到有点脱节。我们将慢慢地构建更大的例子，将这些小的片段组合在一起。

如果你之前用的是动态类型语言，那么类型和声明的复杂性看起来像是在倒退。我并没有不同意你，在某些系统中动态语言可能更加有效。

如果你来自静态类型的语言，你可能对 Go 感到满意。类型推断以及多值返回的设计非常棒?（尽管这不是 Go 独有）。希望随着我们了解更多，你将会慢慢爱上这干净简洁的语法。


# 第二章 · 结构体
Go 不是像 C ++，Java，Ruby和C＃一样的面向对象的（OO）语言。它没有对象和继承的概念，也没有很多与面向对象相关的概念，例如多态和重载。

Go所具有的是结构体的概念，可以将一些方法和结构体关联。Go 还支持一种简单但有效的组合形式。  总的来说，它会使代码变的更简单，但在某一些场合，你会错过面向对象提供的一些特性。（值得指出的是，通过组合实现继承是一场古老的战斗呐喊，Go 是我用过的第一种坚定立场的语言，在这个问题上。）

虽然 Go 不会像你以前使用的面向对象语言一样，但是你会注意到结构的定义和类的定义之间有很多相似之处。下面的代码定义了一个简单的 `Saiyan` 结构体：

```go
type Saiyan struct {
  Name string
  Power int
}
```

我们将看明白怎么往这个结构体添加一个方法，就像面向对象类，会有方法作为 它的一部分。在这之前，我们先要知道如何申明结构体。

## 声明和初始化

当我们第一次看到变量和声明时，我们只看了内置类型，比如整数和字符串。既然现在我们要讨论结构，那么我们需要扩展讨论范围到指针。

创建结构的值的最简单的方式是：

```go
goku := Saiyan{
  Name: "Goku",
  Power: 9000,
}
```

*注意：* 上述结构末尾的逗号 `,` 是必需的。没有它的话，编译器就会报错。你将会喜欢上这种必需的一致性，尤其当你使用一个与这种风格相反的语言或格式的时候。 

我们不必设置所有或哪怕一个字段。下面这些都是有效的：

```go
goku := Saiyan{}

// or

goku := Saiyan{Name: "Goku"}
goku.Power = 9000
```

就像未赋值的变量其值默认为 0 一样，字段也是如此。

此外，你可以不写字段名，依赖字段顺序去初始化结构体 （但是为了可读性，你应该把字段名写清楚）：

```go
goku := Saiyan{"Goku", 9000}
```

以上所有的示例都是声明变量 `goku` 并赋值。

许多时候，我们并不想让一个变量直接关联到值，而是让它的值为一个指针，通过指针关联到值。一个指针就是内存中的一个地址；指针的值就是实际值的地址。这是间接地获取值的方式。形象地来说，指针和实际值的关系就相当于房子和指向该房子的方向之间的关系。

为什么我们想要一个指针指向值而不是直接包含该值呢？这归结为 Go 中传递参数到函数的方式：就像复制。知道了这个，尝试理解一下下面的代码呢？


```go
func main() {
  goku := Saiyan{"Goku", 9000}
  Super(goku)
  fmt.Println(goku.Power)
}

func Super(s Saiyan) {
  s.Power += 10000
}
```

上面程序运行的结果是 9000，而不是 19000,。为什么？因为 `Super` 修改了原始值 `goku` 的复制版本，而不是它本身，所以，`Super` 中的修改并不影响上层调用者。现在为了达到你的期望，我们可以传递一个指针到函数中： 

```go
func main() {
  goku := &Saiyan{"Goku", 9000}
  Super(goku)
  fmt.Println(goku.Power)
}

func Super(s *Saiyan) {
  s.Power += 10000
}
```

这一次，我们修改了两处代码。第一个是使用了 `&` 操作符以获取值的地址（它就是 *取地址* 操作符）。然后，我们修改了 `Super` 参数期望的类型。它之前期望一个 `Saiyan` 类型，但是现在期望一个地址类型 `*Saiyan`，这里 `*X` 意思是 *指向类型 X 值的指针* 。很显然类型 `Saiyan` 和 `*Saiyan` 是有关系的，但是他们是不同的类型。

这里注意到我们仍然传递了一个 `goku` 的值的副本给 `Super`，但这时 `goku` 的值其实是一个地址。所以这个副本值也是一个与原值相等的地址，这就是我们间接传值的方式。想象一下，就像复制一个指向饭店的方向牌。你所拥有的是一个方向牌的副本，但是它仍然指向原来的饭店。

我们可以证实一下这是一个地址的副本，通过修改其指向的值（尽管这可能不是你真正想做的事情）：

```go
func main() {
  goku := &Saiyan{"Goku", 9000}
  Super(goku)
  fmt.Println(goku.Power)
}

func Super(s *Saiyan) {
  s = &Saiyan{"Gohan", 1000}
}
```

上面的代码，又一次地输出 9000。就像许多语言表现的那样，包括  Ruby，Python， Java 和 C#，Go 以及部分的 C#，只是让这个事实变得更明显一些。

同样很明显的是，复制一个指针比复制一个复杂的结构的消耗小多了。在 64 位的机器上面，一个指针占据 64 bit 的空间。如果我们有一个包含很多字段的结构，创建它的副本将会是一个很昂贵的操作。指针的真正价值在于能够分享它所指向的值。我们是想让 `Super` 修改 `goku` 的副本还是修改共享的 `goku` 值本身呢？

所有这些并不是说你总应该使用指针。这章末尾，在我们见识了结构的更多功能以后，我们将重新检视 指针与值这个问题。



## 结构体上的函数

我们可以把一个方法关联在一个结构体上：

```go
type Saiyan struct {
  Name string
  Power int
}

func (s *Saiyan) Super() {
  s.Power += 10000
}
```

在上面的代码中，我们可以这么理解，`*Saiyan` 类型是 `Super` 方法的*接受者*。然后我们可以通过下面的代码去调用 `Super` 方法：

```go
goku := &Saiyan{"Goku", 9001}
goku.Super()
fmt.Println(goku.Power) // 将会打印出 19001
```



## 构造器

结构体没有构造器。但是，你可以创建一个返回所期望类型的实例的函数（类似于工厂）：

```go
func NewSaiyan(name string, power int) *Saiyan {
  return &Saiyan{
    Name: name,
    Power: power,
  }
}
```

这种模式以错误的方式惹恼了很多开发人员。一方面，这里有一点轻微的语法变化；另一方面，它确实感觉有点不那么明显。

我们的工厂不必返回一个指针；下面的形式是完全有效的：

```go
func NewSaiyan(name string, power int) Saiyan {
  return Saiyan{
    Name: name,
    Power: power,
  }
}
```



## 结构体的字段

到目前为止的例子中，`Saiyan` 有两个字段 `Name` 和 `Power`，其类型分别为 `string` 和 `int`。字段可以是任何类型 -- 包括其他结构体类型以及目前我们还没有提及的 array，maps，interfaces 和 functions 等类型。

例如，我们可以扩展 `Saiyan` 的定义：

```go
type Saiyan struct {
  Name string
  Power int
  Father *Saiyan
}
```

然后我们通过下面的方式初始化：

```go
gohan := &Saiyan{
  Name: "Gohan",
  Power: 1000,
  Father: &Saiyan {
    Name: "Goku",
    Power: 9001,
    Father: nil,
  },
}
```


## New
尽管缺少构造器，Go 语言却有一个内置的 `new` 函数，使用它来分配类型所需要的内存。 `new(X)` 的结果与 `&X{}` 相同。

```go
goku := new(Saiyan)
// same as
goku := &Saiyan{}
```

如何使用取决于你，但是你会发现大多数人更偏爱后一种写法无论是否有字段需要初始化，因为这看起来更具可读性：

```go
goku := new(Saiyan)
goku.name = "goku"
goku.power = 9001

//vs

goku := &Saiyan {
  Name: "goku",
  Power: 9000,
}
```

无论你选择哪一种，如果你遵循上述的工厂模式，就可以保护剩余的代码而不必知道或担心内存分配细节


## 组合

Go 支持组合， 这是将一个结构包含进另一个结构的行为。在某些语言中，这种行为叫做 特质 或者 混合。 没有明确的组合机制的语言总是可以做到这一点。在 Java 中， 可以使用 *继承* 来扩展结构。但是在脚本中并没有这种选项， 混合将会被写成如下形式：

```java
public class Person {
  private String name;

  public String getName() {
    return this.name;
  }
}

public class Saiyan {
  // Saiyan 中包含着 person 对象
  private Person person;

  // 将请求转发到 person 中
  public String getName() {
    return this.person.getName();
  }
  ...
}
```

这可能会非常繁琐。`Person` 的每个方法都需要在 `Saiyan` 中重复。Go 避免了这种复杂性：

```go
type Person struct {
  Name string
}

func (p *Person) Introduce() {
  fmt.Printf("Hi, I'm %s\n", p.Name)
}

type Saiyan struct {
  *Person
  Power int
}

// 使用它
goku := &Saiyan{
  Person: &Person{"Goku"},
  Power: 9001,
}
goku.Introduce()
```

`Saiyan`  结构体有一个 `Person` 类型的字段。由于我们没有显示地给它一个字段名，所以我们可以隐式地访问组合类型的字段和函数。然而，Go 编译器确实给了它一个字段，下面这样完全有效：

```go
goku := &Saiyan{
  Person: &Person{"Goku"},
}
fmt.Println(goku.Name)
fmt.Println(goku.Person.Name)
```

上面两个都打印 「Goku」。

组合比继承更好吗？许多人认为它是一种更好的组织代码的方式。当使用继承的时候，你的类和超类紧密耦合在一起，你最终专注于结构而不是行为。

##  指针类型和值类型

当你写 Go 代码的时候，很自然就会去问自己 *应该是值还是指向值的指针呢？* 这儿有两个好消息，首先，无论我们讨论下面哪一项，答案都是一样的：

* 局部变量赋值
*  结构体指针
* 函数返回值
* 函数参数
* 方法接收器

第二，如果你不确定，那就用指针咯。

正如我们已经看到的，传值是一个使数据不可变的好方法（函数中改变它不会反映到调用代码中）。有时，这是你想要的行为，但是通常情况下，不是这样的。

即使你不打算改变数据，也要考虑创建大型结构体副本的成本。相反，你可能有一些小的结构：

```go
type Point struct {
  X int
  Y int
}
```

这种情况下，复制结构的成本能够通过直接访问 `X` 和 `Y` 来抵消，而没有其它任何间接操作。

还有，这些案例都是很微妙的，除非你迭代成千上万个这样的指针，否则你不会注意到差异。


## 继续之前

从实际的角度看，这章介绍了结构体，如何使一个结构体的实例成为函数的接收者，以及添加指针到现有的 Go 类型系统知识中。下面的章节将建立在我们已经了解了什么是结构体以及其内部工作原理之上。


# 第三章 · 映射、数组和切片

至此，我们已经学了一部分简单的类型和结构。现在，让我们开始学习 Arrays （数组）, Slices （切片） 和 Maps （映射） 吧。

## 数组

如果你学过 Python , Ruby , Perl , JavaScript 或者 PHP （或者更多其它的语言），那么你肯定习惯 *动态数组* 编程啦。这些数组的长度可以在添加数据的时候自行调整的。在 Go 中，像其它大部分语言一样，数据的长度是固定的。我们在声明一个数组时需要指定它的长度，一旦指定了长度，那么它的长度值是不可以改变的了：

```go
var scores [10]int
scores[0] = 339
```

上面的数组最多可以容纳 10 个元素，索引是从 `scores[0]` 到 `scores[9]` 。试图访问超过界限的索引系统将会抛出编译或运行时错误。

我们可以在初始化数组的时候指定值：

```go
scores := [4]int{9001, 9333, 212, 33}
```

我们可以使用 `len` 函数来获取数组的长度。`range` 函数在遍历迭代的时候使用：

```go
for index, value := range scores {

}
```

数组非常高效但是很死板。很多时候，我们在事前并不知道数组的长多是多少。针对这个情况，slices （切片） 出来了。

## 切片

在Go语言中，我们很少直接使用数组。取而代之的是使用切片。切片是轻量的包含并表示数组的一部分的结构。 这里有几种创建切片的方式，我们来看看什么情况下使用它们。首先在数组的基础之上进行一点点变化:

```go
scores := []int{1,4,293,4,9}
```

和数组申明不同的是，我们的切片没有在方括号中定义长度。为了理解两者的不同，我们来看看另一种使用`make`来创建切片的方式:

```go
scores := make([]int, 10)
```

我们使用 `make` 关键字代替 `new`， 是因为创建一个切片不仅是只分配一段内存（这个是 `new`关键字的功能）。具体来讲，我们必须要为一个底层数组分配一段内存，同时也要初始化这个切片。在上面的代码中，我们初始化了一个长度是 10 ，容量是 10 的切片。长度是切片的长度，容量是底层数组的长度。在使用 `make` 创建切片时，我们可以分别的指定切片的长度和容量：

```go
scores := make([]int, 0, 10)
```

上面的代码创建了一个长度是 0 ，容量是 10 的切片。（如果你仔细观察的话，你会注意到 `make` 和 `len` *被*重载了。Go 的一些特性没有暴露出来给开发者使用，这也许会让你感到沮丧。）

为了更好的理解切片的长度和容量之间的关系，我们来看下面的的例子：

```go
func main() {
  scores := make([]int, 0, 10)
  scores[7] = 9033
  fmt.Println(scores)
}
```

我们上面的这个例子不能运行，为什么呢？因为切片的长度是 0 。没错，底层数组可以放 10 个元素，但是我们需要显式的扩展切片，才能访问到底层数组的元素。一种扩展切片的方式是通过 `append`的关键字来实现：

```go
func main() {
  scores := make([]int, 0, 10)
  scores = append(scores, 5)
  fmt.Println(scores) // prints [5]
}
```

但是那并没有改变原始代码的意图。追加一个值到长度为0的切片中将会设置第一个元素。无论什么原因，我们崩溃的代码想去设置索引为7的元素值。为了实现这个，我们可以重新切片：

```go
func main() {
  scores := make([]int, 0, 10)
  scores = scores[0:8]
  scores[7] = 9033
  fmt.Println(scores)
}
```

我们可以调整的切片大小最大范围是多少呢？达到它的容量，这个例子中，是10。你可能在想 *这实际上并没有解决数组固定长度的问题*。但是 `append` 是相当特别的。如果底层数组满了，它将创建一个更大的数组并且复制所有原切片中的值（这个就很像动态语言 PHP，Python，Ruby，JavaScript 的工作方式）。这就是为什么上面的例子中我们必须重新将 `append` 返回的值赋值给 `scores` 变量：`append` 可能在原有底层数组空间不足的情况下创建了新值。

如果我告诉你 Go 使用 2x 算法来增加数组长度，你猜下面将会打印什么？

```go
func main() {
  scores := make([]int, 0, 5)
  c := cap(scores)
  fmt.Println(c)

  for i := 0; i < 25; i++ {
    scores = append(scores, i)

    // 如果容量改变了
    // Go 必须增加数组长度来容纳新的数据
    if cap(scores) != c {
      c = cap(scores)
      fmt.Println(c)
    }
  }
}
```

初始 `scores` 的容量是5。为了存储25个值，它必须扩展三次容量，分别是 10，20，最终是40。

最后一个例子，考虑这个：

```go
func main() {
  scores := make([]int, 5)
  scores = append(scores, 9332)
  fmt.Println(scores)
}
```

这里输出是 `[0, 0, 0, 0, 0, 9332]`，可能你觉得是`[9332, 0, 0, 0, 0]`？对一个用户而言，这可能逻辑上是正确的。然而，对于一个编译器，你告诉他的是追加一个值到一个已经有5个值的切片。

最终，这有四种方式初始化一个切片：

```go
names := []string{"leto", "jessica", "paul"}
checks := make([]bool, 10)
var names []string
scores := make([]int, 0, 20)
```

什么时候该用哪个呢？第一个不用过多解释。当你事先知道数组中的值的时候，你可以使用这个方式。

当你想要写入切片具体的索引时，第二个方法很有用，例如：

```go
func extractPowers(saiyans []*Saiyans) []int {
  powers := make([]int, len(saiyans))
  for index, saiyan := range saiyans {
    powers[index] = saiyan.Power
  }
  return powers
}
```

第三个版本是指向空的切片，用于当元素数量未知时与 `append` 连接。

最后一个版本是让我们声明一个初始的容量。如果我们大概知道元素的数量将是很有用的。

即使当你知道大小的时候，`append` 也可以使用，取决于个人偏好：

```go
func extractPowers(saiyans []*Saiyans) []int {
  powers := make([]int, 0, len(saiyans))
  for _, saiyan := range saiyans {
    powers = append(powers, saiyan.Power)
  }
  return powers
}
```

切片作为数组的包装是一个很强大的概念。许多语言有切片数组的概念。JavaScript 和 Ruby 数组都有一个  `slice` 方法。Ruby 中你可以使用 `[START..END]` 获取一个切片，或者 Python 中可以通过 `[START:END]` 实现。然而，在这些语言中，一个切片实际上是复制了原始值的新数组。如果我们使用 Ruby，下面这段代码的输出是什么呢？

```go
scores = [1,2,3,4,5]
slice = scores[2..4]
slice[0] = 999
puts scores
```

答案是  `[1, 2, 3, 4, 5]` 。那是因为 `slice` 是一个新数组，并且复制了原有的值。现在，考虑 Go 中的情况：

```go
scores := []int{1,2,3,4,5}
slice := scores[2:4]
slice[0] = 999
fmt.Println(scores)
```

输出是  `[1, 2, 999, 4, 5]`。

这改变了你编码的方式。例如，许多函数采用一个位置参数。JavaScript 中，如果你想去找到字符串中前五个字符后面的第一个空格（当然，在Go中切片也可以用于字符串），我们会这样写：

```go
haystack = "the spice must flow";
console.log(haystack.indexOf(" ", 5));
```

在 Go 中，我们这样使用切片：

```go
strings.Index(haystack[5:], " ")
```

我们可以从上面的例子中看到，`[X:]` 是 *从 X 到结尾* 的简写，然而 `[:X]` 是 *从开始到 X 的简写*。不像其他的语言，Go 不支持负数索引。如果我们想要切片中除了最后一个元素的所有值，可以这样写：

```go
scores := []int{1, 2, 3, 4, 5}
scores = scores[:len(scores)-1]
```

上面是从未排序的切片中移除元素的有效方法的开始：

```go
func main() {
  scores := []int{1, 2, 3, 4, 5}
  scores = removeAtIndex(scores, 2)
  fmt.Println(scores) // [1 2 5 4]
}

// 不会保持顺序
func removeAtIndex(source []int, index int) []int {
  lastIndex := len(source) - 1
  // 交换最后一个值和想去移除的值
  source[index], source[lastIndex] = source[lastIndex], source[index]
  return source[:lastIndex]
}
```

最后，我们已经了解了切片，我们再看另一个通用的内建函数：`copy`。正常情况下，将值从一个数组复制到另一个数组的方法有5个参数，`source`， `sourceStart`，`count`,，`destination`  和 `destinationStart`。使用切片，我们仅仅需要两个：

```go
import (
  "fmt"
  "math/rand"
  "sort"
)

func main() {
  scores := make([]int, 100)
  for i := 0; i < 100; i++ {
    scores[i] = int(rand.Int31n(1000))
  }
  sort.Ints(scores)

  worst := make([]int, 5)
  copy(worst, scores[:5])
  fmt.Println(worst)
}
```


花点时间试试上面的代码，并尝试改动。去看看如果你这么做  `copy(worst[2:4], scores[:5])` 或者复制多于或少于 `5` 个值给 `worst` 会发什么？



## 映射

Go语言中的映射，就好比其他语言中的hash表或者字典。它们的工作方式就是：定义键和值，并且可以获取，设置和删除其中的值。

映射和切片一样，使用 `make` 方法来创建。让我们来看看一个例子：

```go
func main() {
  lookup := make(map[string]int)
  lookup["goku"] = 9001
  power, exists := lookup["vegeta"]

  // prints 0, false
  // 0 is the default value for an integer
  fmt.Println(power, exists)
}
```

我们使用 `len`方法类获取映射的键的数量。使用`delete`方法来删除一个键对应的值：

```go
// returns 1
total := len(lookup)

// has no return, can be called on a non-existing key
delete(lookup, "goku")
```

映射是动态变化的。然而我们可以通过传递第二个参数到 `make`方法来设置一个初始大小：

```go
lookup := make(map[string]int, 100)
```

如果你事先知道映射会有多少键值，定义一个初始大小将会帮助改善性能。

当你需要将映射作为结构体字段的时候，你可以这样定义它：

```go
type Saiyan struct {
  Name string
  Friends map[string]*Saiyan
}
```

初始上述结构体的一种方式是：

```go
goku := &Saiyan{
  Name: "Goku",
  Friends: make(map[string]*Saiyan),
}
goku.Friends["krillin"] = ... //加载或者创建 Krillin
```

Go 还有一种定义和初始化值的方式。像 `make`，这种特定用于映射和数组。我们可以定义为复合方式：

```go
lookup := map[string]int{
  "goku": 9001,
  "gohan": 2044,
}
```

我们可以使用 `for` 组合 `range` 关键字迭代映射：

```go
for key, value := range lookup {
  ...
}
```

迭代映射是没有顺序的。每次迭代查找将会随机返回键值对。


## 指针和值

第二章我们讨论了到底是传值还是传指针。现在我们有相同的问题在映射和数组上，到底该使用他们哪个？

```go
a := make([]Saiyan, 10)
// 或者
b := make([]*Saiyan, 10)
```

许多开发者认为应该传递 `b` 或者返回它在一个函数中会更加高效。然而，传递/返回的是切片的副本，但是切片本身就是一个引用。所以传递返回切片本身，没有什么区别。

当你改变切片或者映射值的时候，你将看到不同。这一点上，和我们在第二章看到的逻辑相同。所以决定使用指针数组还是值数组归结为你如何使用单个值，而不是你用数组还是映射。


## 继续之前

Go 中数组和映射的工作方式类似于其他语言。如果你习惯了使用动态数组，这可能就有点小的调整，但是 `append` 应该能解决你大多的不适应。如果我们超越数组的表面语法，将会发现切片。切片功能强大，并且他们对代码的清晰度产生了巨大的影响。

还有一些边缘情况没有覆盖到，不过你不太可能遇到他们。即使遇到了，希望我们在这里建立的基础帮助你理解正在发生的事情。


# 第四章 · 代码组织和接口
现在来看一下如何组织我们的代码。

## 包管理

为了组织复杂的库和系统代码，我们需要学习关于包的知识。在 Go 语言中，包名遵循 Go 项目的目录结构。如果我们建立一个购物系统，我们可能以 "shopping" 包名作为一个开始，然后把所有源代码文件放到 `$GOPATH/src/shopping/` 目录中。

我们不会去想把所有东西都放在这个文件夹中。例如，我们可能想单独把数据库逻辑放在它自己的目录中。为了实现这个，我们创建一个子目录 `$GOPATH/src/shopping/db` 。子目录中文件的包名就是 `db`，但是为了从另一个包访问它，包括 `shopping` 包，我们需要导入 `shopping/db`。

换句话说，当你想去命名一个包的时候，可以通过 `package` 关键字，提供一个值，而不是完整的层次结构（例如：「shopping」或者 「db」）。当你想去导入一个包的时候，你需要指定完整路径。

接下来，我们去尝试下。在你的 Go 的工作目录 `src` 文件夹下（我们已经在*基础*那一章节中介绍了），创建一个新的文件夹叫做 `shopping` ，然后在 `shopping` 文件夹下创建一个 `db` 文件夹。

在 `shopping/db` 文件夹下，创建一个叫做 `db.go` 的文件，然后在 `db.go` 文件中添加如下的代码：

```go
package db

type Item struct {
  Price float64
}

func LoadItem(id int) *Item {
  return &Item{
    Price: 9.001,
  }
}
```

需要注意包名和文件夹名是一样的。而且很明显我们实际并没有连接数据库。这里使用这个例子只是为了展示如何组织代码。

现在，创建在主目录 `shopping` 下创建一个叫 `pricecheck.go` 的文件。它的内容是：

```go
package shopping

import (
  "shopping/db"
)

func PriceCheck(itemId int) (float64, bool) {
  item := db.LoadItem(itemId)
  if item == nil {
    return 0, false
  }
  return item.Price, true
}
```

很有可能认为导入  `shopping/db`  有点特别，因为我们已经在 `shopping` 包/目录中。实际上，我们正在导入 `$GOPATH/src/shopping/db`，这意味着只要你在你的工作区间  `src/test` 目录中有一个名为 `db`  的包，你就可以轻松导入它。

你正在构建一个包，除了我们看到的你不再需要任何东西。为了构建一个可执行程序，你仍然需要 `main` 包。我比较喜欢的方式是在 `shopping` 目录下创建一个 `main` 子目录，然后再创建一个叫 `main.go` 的文件，下面是它的内容：

```go
package main

import (
  "shopping"
  "fmt"
)

func main() {
  fmt.Println(shopping.PriceCheck(4343))
}
```

现在，你可以进入你的 `shopping`  项目运行代码，输入：

```
go run main/main.go
```

### 循环导入

当你编写更复杂的系统的时，你必然会遇到循环导入。例如，当 `A` 包导入 `B` 包，`B` 包又导入 `A` 包（间接或者直接导入）。这是编译器不能允许的。

让我们改变我们的 `shopping` 结构以复现这个错误。

将  `Item` 定义从 `shopping/db/db.go` 移到 `shopping/pricecheck.go`。你的 `pricecheck.go` 文件像下面这样：

```go
package shopping

import (
  "shopping/db"
)

type Item struct {
  Price float64
}

func PriceCheck(itemId int) (float64, bool) {
  item := db.LoadItem(itemId)
  if item == nil {
    return 0, false
  }
  return item.Price, true
}
```

如果你尝试运行代码，你会从 `db/db.go` 得到两个关于 `Item`  未定义的错误。这看起来是说  `Item` 不存在  `db` 包中。它已经被移动到 `shopping` 包中，我们需要将 `shopping/db/db.go` 改变成：

```go
package db

import (
  "shopping"
)

func LoadItem(id int) *shopping.Item {
  return &shopping.Item{
    Price: 9.001,
  }
}
```

现在但你尝试运行代码的时候，你将会得到 *不允许循环导入* 的错误。我们可以通过引入另一个包含共享结构体的包来解决这个问题。你的目录现在看起来像这个样子：

```
$GOPATH/src
  - shopping
    pricecheck.go
    - db
      db.go
    - models
      item.go
    - main
      main.go
```

`pricecheck.go` 将仍然导入 `shopping/db`，但是 `db.go` 现在导入  `shopping/models` 而不是 `shopping`，因此打破了循环。因为我们将共享的  `Item` 结构体移动到  `shopping/models/item.go`，我们现在需要去改变  `shopping/db/db.go` 从 `models` 包中引用  `Item`  结构体。

```go
package db

import (
  "shopping/models"
)

func LoadItem(id int) *models.Item {
  return &models.Item{
    Price: 9.001,
  }
}
```

你经常需要共享某些代码，不止 `models`，所以你可能有其他类似叫做 `utilities` 的目录，这些共享包的重要原则是他们不从 `shopping` 包或者任何子包中导入任何东西。在后面的章节中，我们将介绍可以帮助我们解决这些类型依赖关系的接口。

### 可见性

Go 用了一个简单的规则去定义什么类型和函数可以包外可见。如果类型或者函数名称以一个大写字母开始，它就具有了包外可见性。如果以一个小写字母开始，它就不可以。

这也可以应用到结构体字段。如果一个字段名以一个小写字母开始，只有包内的代码可以访问他们。

例如，我们的 `items.go` 文件中有个这样的函数：

```go
func NewItem() *Item {
  // ...
}
```

它可以通过  `models.NewItem()` 这样被调用。但是如果函数命名为 `newItem`，我们将不能从不同的包访问它了。

去试试更改 `shopping` 代码中的函数，类型以及字段的名称。例如，如果你将 `Item` 的 `Price`  字段命名为 `price`，你应该会获得一个错误。

### 包管理

我们用来 `build` 和 `run` 的 `go` 命令有一个 `get` 子命令，用于获取第三方库。`go get` 支持除了这个例子中的各种协议，我们可以从 Github 中获取一个库，意味着，你需要在你的电脑中安装 `git`。

假设你已经安装了 Git，在 shell 中输入命令：

```
go get github.com/mattn/go-sqlite3
```

`go get` 获取远端的文件并把它们存储在你的工作区间中。去看看你的 `$GOPATH/src` 目录，你会发现除了我们创建的 `shopping`  项目之外，还有一个 `github.com` 目录，在里面，你会看到一个包含了 `go-sqlite3` 目录的  `mattn` 目录。

我们刚才只是讨论了如何导入我们工作区间的包。为了导入新安装的 `go-sqlite3` 包，我们要这样导入：

```go
import (
  "github.com/mattn/go-sqlite3"
)
```

我知道这看起来像一个 URL，实际上，它只是希望导入在 `$GOPATH/src/github.com/mattn/go-sqlite3` 找到的 `go-sqlite3` 包。

### 依赖管理

`go get`  还有一些其他的技巧。如果我们在一个项目内使用 `go get`，它将浏览所有文件，查找 `imports` 的第三方库然后下载他们。某种程度上，我们的源代码变成了  `Gemfile` 或者  `package.json`。

如果你调用  `go get -u` ，它将更新所有包（或者你可以通过 `go get -u FULL_PACKAGE_NAME` 更新一个具体的包）。

最后，你可能发现了 `go get` 的不足。一方面，这儿没有办法指定一个版本。他总是指向 `master/head/trunk/default`。这是一个较大的问题如果你有两个项目需要同一个库的不同版本。

为了解决这个问题，你可以使用一个第三方的依赖管理工具。他们仍然很年轻，但 [goop](https://github.com/nitrous-io/goop) 和 [godep](https://github.com/tools/godep) 是可信的。更多完整的列表在 [go-wiki](https://code.google.com/p/go-wiki/wiki/PackageManagementTools)。



## 接口

接口是定义了合约但并没有实现的类型。举个例子：

```go
type Logger interface {
  Log(message string)
}
```

那这样做有什么作用呢？其实，接口有助于将代码与特定的实现进行分离。例如，我们可能有各种类型的日志记录器：

```go
type SqlLogger struct { ... }
type ConsoleLogger struct { ... }
type FileLogger struct { ... }
```

针对接口而不是具体实现的编程会使我们很轻松的修改（或者测试）任何代码都不会产生影响。

你会怎么用？就像任何其它类型一样，它结构可以这样：

```go
type Server struct {
  logger Logger
}
```

或者是一个函数参数（或者返回值）：

```go
func process(logger Logger) {
  logger.Log("hello!")
}
```

在像 C# 或者 Java 这类语言中，当类实现接口时，我们必须显式的：

```go
public class ConsoleLogger : Logger {
  public void Logger(message string) {
    Console.WriteLine(message)
  }
}
```

在 Go 中，下面的情况是隐式发生的。如果你的结构体有一个函数名为 `Log` 且它有一个 `string` 类型的参数并没有返回值，那么这个结构体被视为 `Logger` 。这减少了使用接口的冗长：

```go
type ConsoleLogger struct {}
func (l ConsoleLogger) Log(message string) {
  fmt.Println(message)
}
```

Go 倾向于使用**小**且**专注**的接口。Go 的标准库基本上由接口组成。像 `io` 包有一些常用的接口诸如 `io.Reader` ， `io.Writer` ， `io.Closer` 等。如果你编写的函数只需要一个能调用 `Close()` 的参数，那么你应该接受一个 `io.Closer` 而不是像 `io` 这样的父类型。
接口可以成为其他接口的一部分，也就是说接口也可以与其他接口组成新的接口。例如， `io.ReadCLoser` 的接口是由 `io.Reader` 接口和 `io.Closer` 接口组成的。

最后，接口通常用于避免循环导入。由于它们没有具体的实现，因此它们的依赖是有限的。


## 继续之前

最后，如何围绕 Go 的工作区间构建你的代码，你只有在写了几个非测试的项目之后才会适应。最重要的是记着包名和目录结构之间的紧密关系（不仅仅在一个项目之内，而是整个工作区间）。

Go 处理类型可见性也是简单有效，而且也是一致的。有一些我们没看过的东西，比如常量和全局变量，但是放心，他们的可见性仍有相同的命名规则决定。

最后，如果你初次接触接口，你可能需要花点时间理解他们。然而，当你第一次看到一个期望类似  `io.Reader` 的函数时，你会发现自己很感谢作者没有要求他或者她需要的东西。


# 第五章 · 花絮

这章中，我们将讨论 Go 功能杂记，放在其他地方都不太合适。

## 错误处理

Go 首选错误处理方式是返回值，而不是异常。考虑 `strconv.Atoi` 函数，它将接受一个字符串然后将它转换为一个整数。

```go
package main

import (
  "fmt"
  "os"
  "strconv"
)

func main() {
  if len(os.Args) != 2 {
    os.Exit(1)
  }

  n, err := strconv.Atoi(os.Args[1])
  if err != nil {
    fmt.Println("not a valid number")
  } else {
    fmt.Println(n)
  }
}
```

你可以创建你自己的错误类型。唯一的要求是你必须实现内建 `error` 接口的契约：

```go
type error interface {
  Error() string
}
```

更一般地，我们可以通过导入 `error` 包然后使用它的 `New` 函数创建我们自己的错误：

```go
import (
  "errors"
)


func process(count int) error {
  if count < 1 {
    return errors.New("Invalid count")
  }
  ...
  return nil
}
```

Go 标准库中有一个使用 error 变量的通用模式。例如， `io` 包中有一个 `EOF` 变量它是这样定义的：

```go
var EOF = errors.New("EOF")
```

这是一个包级别的变量（被定义在函数之外），可以被其他包访问（首字母大写）。各种函数可以返回这个错误，例如，当我们从一个文件或者 STDIN 读取时。如果它具有上下文意义，那么您应该使用此错误。作为调用者，我们可以这样使用：

```go
package main

import (
  "fmt"
  "io"
)

func main() {
  var input int
  _, err := fmt.Scan(&input)
  if err == io.EOF {
    fmt.Println("no more input!")
  }
}
```

作为最后一点，Go 确实有  `panic`  和  `recover`  函数。 `panic`  就像抛出异常，而 `recover` 就像 `catch`，它们很少使用。


## Defer

尽管 Go 有一个垃圾回收器，一些资源仍然需要我们显示地释放他们。例如，我们需要在使用完文件之后  `Close()`  他们。这种代码总是很危险。一方面来说，当我们在写一个函数的时候，很容易忘记关闭我们声明了 10 行的东西。另一方面，一个函数可能有多个返回点。Go 给出的解决方案是使用 `defer` 关键字：

```go
package main

import (
  "fmt"
  "os"
)

func main() {
  file, err := os.Open("a_file_to_read")
  if err != nil {
    fmt.Println(err)
    return
  }
  defer file.Close()
  // 读取文件
}
```

如果你尝试运行上面的代码，你将会得到错误（文件不存在）。这里只是演示 `defer` 如何工作。无论什么情况，在函数返回之后（本例中为 `main()` ），`defer` 将被执行。这使您可以在初始化的位置附近释放资源并处理多个返回点。



## go语言风格

大多数 Go 程序遵循相同的格式化规则，换句话说，一个 tab 键用于缩进，左括号和他们的声明语句在同一行。

我知道，你可能有自己的风格，并且想坚持它。这也是我长期以来所做的事情，但我很高兴我最终放弃了。一个大原因是  `go fmt` 命令。它易于使用而且具有权威性（所以就没有人争论无意义的偏好）。

当你在一个项目内的时候，你可以运用格式化规则到这个项目及其所有子目录：

```
go fmt ./...
```

试一试，它不仅缩进你的代码，也对齐了声明的字段和按字母书序导入。



## 初始化的 if

Go 对 `if` 语句做了稍微修改，支持在条件语句被求值之前先进行初始化：

```go
if x := 10; count > x {
  ...
}
```

这是一个比较蠢的例子，更现实的是，你可能会像下面这样做：

```go
if err := process(); err != nil {
  return err
}
```

有意思的是，虽然 `err` 不能在 `if` 语句之外使用，但他可以在任何  `else if`  或者  `else` 之内使用。



## 空接口和转化

在大多数面向对象的语言中，经常有一个内建的叫 `object` 的基类，是所有其他类的超类。Go 没有继承，也没有这样一个超类。不过他确实有一个没有任何方法的空接口： `interface{}`。因为空接口没有方法，可以说所有类型都实现了空接口，并且由于空接口是隐式实现的，因此每种类型都满足空接口契约。

 如果我们像，我们可以定义如下签名的 `add` 函数：

```go
func add(a interface{}, b interface{}) interface{} {
  ...
}
```

为了将一个接口变量转化为一个显式的类型，又可以用 `.(TYPE)`：

```go
return a.(int) + b.(int)
```

提醒，如果底层类型不是 `int`，上面的结果将是 error。

你也可以访问强大的类型转换：

```go
switch a.(type) {
  case int:
    fmt.Printf("a is now an int and equals %d\n", a)
  case bool, string:
    // ...
  default:
    // ...
}
```

你将会看到，使用空接口可能超出了你的期望。但是虽然它将让代码看起来不那么好看，来回转换代码有时看起来也很丑陋并且危险，但在一个静态语言中，它是唯一的选择。



## 字符串和字节数组

字符串和字节数组是紧密相关的。我们可以轻松地在他们之间转换：

```go
stra := "the spice must flow"
byts := []byte(stra)
strb := string(byts)
```

实际上，这种转换方式在各种类型之间是通用的。一些函数显示地需要一个  `int32` 或者  `int64` 或者它们的无符号部分。你可能发现你必须这样做：

```go
int64(count)
```

然而，当它涉及到字节和字符串时，这可能是你经常做的事情。一定记着当你使用 `[]byte(X)` 或者 `string(X)` 时，你实际上创建了数据的副本。这是必要的，因为字符串是不可变的。

那些由 Unicode 码点 `runes` 构成的字符串，如果你获取字符串的长度，你可能不能得到你期望的。下面的结果是3：

    fmt.Println(len("椒"))

如果你用 `range` 迭代一个字符串，你将得到 runes，而不是字节。当然，当你将字符串转换为 `[]byte` 类型时，你将得到正确的数据。 


## 函数类型

函数是一种类型：

```go
type Add func(a int, b int) int
```

它可以用在任何地方 -- 作为字段类型，参数或者返回值。

```go
package main

import (
  "fmt"
)

type Add func(a int, b int) int

func main() {
  fmt.Println(process(func(a int, b int) int{
      return a + b
  }))
}

func process(adder Add) int {
  return adder(1, 2)
}
```

这样使用函数会帮助我们从具实现中解耦代码，更像在使用接口实现。



## 继续之前

我们研究了使用 Go 编程的各个方面，最值得注意的是，我们看到了错误的处理行为以及如何释放连接和打开的文件资源。许多人不喜欢 Go 的错误处理方法。这感觉像是倒退了一步。 有时，我同意。然而，我也发现这会让代码更容易理解。 `defer` 是一种不寻常但是实用的资源管理方法。事实上，它不仅限于资源管理。您可以将  `defer` 用于任何目的， 比如函数退出时的日志记录。

当然，我们还没有看到 Go 提供的所有花絮，但在你解决遇到的任何问题时你应该感到足够舒服。


# 第六章 · 并发
Go 通常被描述为一种并发友好的语言。 原因是它提供了两种强大机制的简单语法： **协程** 和 **通道**

## Go协程
 **协程** 类似于一个线程，但是由 Go 而不是操作系统预定。在 **协程** 中运行的代码可以与其他代码同时运行。我们来看一个例子：


```go
package main

import (
  "fmt"
  "time"
)

func main() {
  fmt.Println("start")
  go process()
  time.Sleep(time.Millisecond * 10) // this is bad, don't do this!
  fmt.Println("done")
}

func process() {
  fmt.Println("processing")
}
```

这里有一些有趣的事情， 但最重要的是我们如何开始一个 **协程** 。 我们只需使用 `go` 关键字，然后使用我们想要执行的函数。如果我们只想运行一部分代码， 如上所述， 我们可以使用匿名函数。需要注意的是，匿名函数不只是可以在 **协程** 中使用，其他地方也可以。

```go
go func() {
  fmt.Println("processing")
}()
```

 **协程** 易于创建且开销很小。最终多个 **协程** 将会在同一个底层的操作系统线程上运行。这通常也称为 M:N 线程模型，因为我们有 M 个应用线程（ **协程** ）运行在 N 个操作系统线程上。结果就是，一个 **协程** 的开销和系统线程比起来相对很低（几KB）。在现代的硬件上，有可能拥有数百万个 **协程** 。

此外，这里还隐藏了映射和调度的复杂性。我们只需要说 *这段代码需要同时并发执行* 然后让 Go 自己去实现它。

如果我们回到我们的例子中，你将会注意到我们使用 `Sleep` 让程序等了几毫秒。这是因为主进程在退出前 **协程** 才会有机会去执行（主进程在退出前不会等待全部 **协程** 执行完毕）。要解决这个问题，我们需要协调我们的代码。



## 同步

创建一个协程是微不足道的， 它们开销很小我们可以启动很多； 但是，需要协调并发代码。为了解决这个问题， Go 提供了 `通道`。 在我们学习 `通道` 之前，我认为了解并发编程的基础知识非常重要。

编写并发代码要求您特别注意在哪里读取和写入一个值。 在某些方面， 例如没有垃圾回收的语言 -- 它需要您从一个新的角度去考虑您的数据，始终警惕着可能存在的危险。 例如：

```go
package main

import (
  "fmt"
  "time"
)

var counter = 0

func main() {
  for i := 0; i < 20; i++ {
    go incr()
  }
  time.Sleep(time.Millisecond * 10)
}

func incr() {
  counter++
  fmt.Println(counter)
}
```

你觉得将会输出什么呢？

如果你认为输出的是 `1, 2, ... 20` 这既不对也没错。如果你运行了以上的代码确实可能得到这个输出。可是，这个操作就很让人懵逼的。 啥？因为我们可能有多个 (这个情况下两个) 协程 同时写入一个相同变量 `counter` 。或者，同样糟糕的是，一个协程要读取  `counter` 时，另一个协程正在写入。

这个真的很危险吗？当然啦！ `counter++` 看起来可能是一行很简单的代码，但它是实际上被拆分为多个汇编语句 -- 确切的性质依赖于你跑程序的平台。如果你运行这个例子，你将经常看到那些数字是以一种乱七八糟的顺序打印的，亦或数字是重复的/丢失的。别着急还会有更糟糕的情况， 比方说系统崩溃或者访问并增加任意区块的数据！

从变量中读取变量是唯一安全的并发处理变量的方式。 你可以有想要多少就多少的读取者， 但是写操作必须要得同步。 有太多的方法可以做到这个了，包括使用一些依赖于特殊的 CPU 指令集的真原子操作。然而, 常用的操作还是使用互斥量（译者注：mutex）:

```go
package main

import (
  "fmt"
  "time"
  "sync"
)

var (
  counter = 0
  lock sync.Mutex
)

func main() {
  for i := 0; i < 20; i++ {
    go incr()
  }
  time.Sleep(time.Millisecond * 10)
}

func incr() {
  lock.Lock()
  defer lock.Unlock()
  counter++
  fmt.Println(counter)
}
```

互斥量序列化会锁住锁下的代码访问。因为默认的的 `sync.Mutex` 是未锁定状态，这儿我们就得先定义  `lock sync.Mutex`。

这操作是不看着超简单？ 这个例子是具有欺骗性的。当我们进行并发编程时会产生一系列严重的 Bug。 首先，并不是经常能很明显知道什么代码需要保护。使用这样粗糙的锁操作（覆盖着大量代码的锁操作）确实很诱人，这就违背了我们当初进行并发编程的初心了。 我们肯定是需要个优雅的锁操作； 否则，我们最终会把多条快速通道走成单车道的。

另外一个问题是与死锁有关。 使用单个锁时，这没有问题，但是如果你在代码中使用两个或者更多的锁，很容易出现一种危险的情况，当协程A拥有锁 **lockA **，想去访问锁 **lockB **，同时协程B拥有锁 **lockB** 并需要访问锁 **lockA** 。

实际上我们使用一个锁时也有可能发生死锁的问题，就是当我们忘记释放它时。 但是这和多个锁引起的死锁行为相比起来，这并不像多锁死锁那样危险（因为这*真的* 很难发现），当你试着运行下面的代码时，您可以看见发生了什么：

```go
package main

import (
  "time"
  "sync"
)

var (
  lock sync.Mutex
)

func main() {
  go func() { lock.Lock() }()
  time.Sleep(time.Millisecond * 10)
  lock.Lock()
}
```

到现在为止还有很多并发编程我们没有看到过。 首先，有一个常见的锁叫读写互斥锁。它主要提供了两种锁功能: 一个锁定读取和一个锁定写入。它的区别是允许多个同时读取，同时确保写入是独占的。在 Go 中， `sync.RWMutex` 就是这种锁。另外 `sync.Mutex` 结构不但提供了`Lock` 和 `Unlock` 方法 ，也提供了`RLock` 和 `RUnlock` 方法；其中 `R` 代表 *Read*.。虽然读写锁很常用，它也给开发人员带来了额外的负担：我们不但要关注我们正在访问的数据，还要注意如何访问。

此外，部分并发编程不只是通过为数不多的代码按顺序的访问变量； 它也需要协调多个协程。 例如，休眠10毫秒并不是一个特别优雅的解决方案。如果一个协程消耗的时间需要超过10毫秒怎么办？如果协程消耗更少的时间而我们浪费周期怎么办？又或者可以等待协程运行完毕， 我们想另外一个协程 *嗨， 我有新的数据需要你处理*?

这些事在没有 `通道` 的情况下都是可以完成的。当然对于更简单的情况，我相信你应该 **应该** 使用基本的功能比如 `sync.Mutex` 和 `sync.RWMutex`， 但正如我们将会在下一节中看到的那样， `通道` 旨在让并发编程更简洁和不容易出错。


## 通道

并发编程的最大调整源于数据的共享。如果你的协程间不存在数据共享，你完全没必要担心同步问题。但是并非所有系统都是如此简单。现实中，许多系统考虑了相反的目的：跨多个请求共享数据。内存缓存和数据库就是最好的例证。这种情况已经成为一个日趋增长的现实。

通道在共享不相关数据的情况下，让并发编程变得更健壮。通道是协程之间用于传递数据的共享管道。换而言之，一个协程可以通过一个通道向另外一个协程传递数据。因此，在任意时间点，只有一个协程可以访问数据。

一个通道，和其他任何变量一样，都有一个类型。这个类型是在通道中传递的数据的类型。例如，创建一个通道用于传递一个整数，我们要这样做：

```go
c := make(chan int)
```

这个通道的类型是 `chan int`。因此，要将通道传递给函数，我们的函数签名看起来是这个样子的：

```go
func worker(c chan int) { ... }
```

通道只支持两个操作：接收和发送。可以这样往通道发送一个数据：

```
CHANNEL <- DATA
```

这样从通道接收数据：

```
VAR := <-CHANNEL
```

箭头预示着数据流向。当发送的时候，数据流向通道。接收的时候，数据流出通道。

在我们开始第一个例子之前还需要知道的是，接收和发送操作是阻塞的。也就是，当我们从一个通道接收的时候， goroutine 将会直到数据可用才会继续执行。类似地，当我们往通道发送数据的时候，goroutine 会等到数据接收到之后才会继续执行。

考虑这样一个系统，我们希望在各个 goroutine 中处理即将到来的数据。这是一个很平常的需求。如果我们在接收数据的 goroutine 上进行数据密集型处理，那么我们可能导致客户端超时。首先，我们先实现我们的 worker。这可能是一个简单的函数，但是我们让它成为结构的一部分，因此我们之前没有看到这样的 goroutines：

```go
type Worker struct {
  id int
}

func (w Worker) process(c chan int) {
  for {
    data := <-c
    fmt.Printf("worker %d got %d\n", w.id, data)
  }
}
```

我们的 worker 是简单的。他一直等到数据可用然后处理它。尽职尽责，它一直在一个循环中做这个，永远等待更多的数据去处理。

为了去用这个，第一件事情是启动一些 workers：

```go
c := make(chan int)
for i := 0; i < 5; i++ {
  worker := &Worker{id: i}
  go worker.process(c)
}
```

然后，给这些 worker 一些活干：

```go
for {
  c <- rand.Int()
  time.Sleep(time.Millisecond * 50)
}
```

这里有一个完整的可运行代码：

```go
package main

import (
  "fmt"
  "time"
  "math/rand"
)

func main() {
  c := make(chan int)
  for i := 0; i < 5; i++ {
    worker := &Worker{id: i}
    go worker.process(c)
  }

  for {
    c <- rand.Int()
    time.Sleep(time.Millisecond * 50)
  }
}

type Worker struct {
  id int
}

func (w *Worker) process(c chan int) {
  for {
    data := <-c
    fmt.Printf("worker %d got %d\n", w.id, data)
  }
}
```

我们不知道哪个 worker 将得到什么数据。但我们能确保的是 Go 保证了发送到通道的数据只会被一个接收器接收。

记着，唯一的共享状态时通道，我们可以安全地同时从它接收和发送数据。通道提供了所有我们需要的同步代码保证，在任何时间只有一个 goroutine 可以访问特定的数据。

### 缓冲通道

上面给出的代码中，如果有超过能处理的数据到来会发什么？你可以通过更改 worker 接收到数据之后的暂停时间来模拟这个。

```go
for {
  data := <-c
  fmt.Printf("worker %d got %d\n", w.id, data)
  time.Sleep(time.Millisecond * 500)
}
```

我们的主代码中发生的是，接收用户数据的代码（刚刚使用随机数生成器模拟的）是阻塞，因为没有接收器可用。

在某些情况下，你可能需要担保数据被处理掉，这个时候就需要开始阻塞客户端。在某些情况下，你可能会降低这种担保。这有几种常用的策略实现它。第一个就是缓冲数据。如果没有worker可用，我们想去临时存储数据在某些队列中。通道内建这种缓冲容量，当我们使用 `make` 创建通道的时候，可以设置通道的长度：

```go
c := make(chan int, 100)
```

你可以对此更改进行更改，但你会注意到处理仍然不稳定。缓冲通道不会增加容量，他们只提供待处理工作的队列，以及处理突然飙升的任务量的好方法。在我们的示例中，我们不断推送比 worker 可以处理的数据更多的数据。

然而，我们实际上可以通过查看通道的 `len` 来理解缓冲通道是什么。

```go
for {
  c <- rand.Int()
  fmt.Println(len(c))
  time.Sleep(time.Millisecond * 50)
}
```

你可以看到通道长度一直增加直到满了，这个时候往我们的通道发送数据将再一次阻塞。

### Select

即使有缓冲，在某些时候我们需要开始删除消息。我们不能为了让 worker 轻松而耗尽所有内存。为了实现这个，我们使用 Go 的 `select`：

语法上，`select` 看起来有一点像 switch。使用它，我们提供当通道不能发送数据的时候处理代码。首先，让我们移除通道缓冲来看看  `select` 如何工作：

```go
c := make(chan int)
```

接下来，改变我们的 `for` 循环：

```go
for {
  select {
  case c <- rand.Int():
    // 可选的代码在这里
  default:
    // 这里可以留空以静默删除数据
    fmt.Println("dropped")
  }
  time.Sleep(time.Millisecond * 50)
}
```

我们将每秒推送20条消息，但是我们的 worker 每秒仅仅能处理10条。也就是说，一般的消息，将被丢掉。

这只是我们能使用 `select` 实现的一个开始。`select` 的主要目的是管理多个通道，`select` 将阻塞直到第一个通道可用。如果没有通道可用，如果提供了 `default` ，那么他就会被执行。如果多个通道都可用了，随机挑选一个。

很难用一个简单的例子来证明这个行为，因为它是一个相当高级的功能。下一节可能有助于证明这个。

### 超时

我们看过了缓冲消息以及简单地将他们丢弃。另一个通用的选择是去超时。我们将阻塞一段时间，但不会永远。这在 Go 中也是很容易实现的。虽然，语法很难遵循，但是这样一个简洁有用的功能我不能将它排除在外。

为了阻塞最长时间，我们可以用 `time.After` 函数。我们来一起看看它并试着超越魔法。为了去用这个，我们的发送器将变成：

```go
for {
  select {
  case c <- rand.Int():
  case <-time.After(time.Millisecond * 100):
    fmt.Println("timed out")
  }
  time.Sleep(time.Millisecond * 50)
}
```

`time.After` 返回了一个通道，所以我们在 `select` 中使用它。这个通道可以在指定时间之后被写入。就这样，没有其他魔法了。如果你比较好奇，这里有一个 `after` 的实现，看起来大概就是这个样子咯：

```go
func after(d time.Duration) chan bool {
  c := make(chan bool)
  go func() {
    time.Sleep(d)
    c <- true
  }()
  return c
}
```

回到我们的 `select`，还有两个东西可以试试。首先，如果添加回 `default` 会发生什么？能猜到吗？试试它。如果你不确定，记着如果没有可用的通道，`default` 将会立即触发。

还有，`time.After` 是一个 `chan time.Time` 类型的通道。上面的例子中，我们仅仅是简单地丢弃掉了发送到通道的值。如果你想要，你可以接受它：

```go
case t := <-time.After(time.Millisecond * 100):
  fmt.Println("timed out at", t)
```

注意力重新回到我们的 `select`，可以看到我们发送给 `c` 但是却从 `time.After` 接收。无论我们从哪里接收，发送给谁，或者任何通道的组合，`select` 工作方式是相同的：

* 第一个可用的通道被选择。
* 如果多个通道可用，随机选择一个。
* 如果没有通道可用，default 情况将被执行。
* 如果没有 default，select 将会阻塞。

最后，在 `for` 中看到一个 `select` 是很常见的：

```go
for {
  select {
  case data := <-c:
    fmt.Printf("worker %d got %d\n", w.id, data)
  case <-time.After(time.Millisecond * 10):
    fmt.Println("Break time")
    time.Sleep(time.Second)
  }
}
```




## 继续之前

如果你是并发编程的新手，那么看起来似乎都是压倒性的。 它绝对需要非常多的关注。Go旨在让它变得更容易。

Goroutines 有效的抽象了我们需要并发执行的代码。通道帮助消除数据共享时共享数据可能发生的一些严重错误。这不仅可以消除错误， 还可以改变并发编程的方式。你只用考虑通过信息传递实现并发编程，而不是危险的代码区域。

话虽如此，我仍然广泛使用 `sync` 和 `sync / atomic` 包中的各种同步原语。我觉得比较重要的是通过使用这两种方式比较舒适。我建议你首先关注通道，但是当你遇到一个需要短暂锁的简单示例时，请考虑使用互斥锁或读写互斥锁。


# 总结
我最近听说 Go 被描述为一个*枯燥*的语言。枯燥是因为很容易去学，很容易写，以及最重要的，易读。或许，我确实认为这个实现不太好，毕竟，我*确实*花了三章讨论类型和如何声明变量。

如果你有静态类型语言的工作经历，我们所看到的内容仅仅只是一个复习。Go 使得指针可用性增强，并且切片是数组的包装，对于经验丰富的 Java 或 C＃开发人员来说可能并不算是压倒性优势。

如果你曾经大多在使用动态语言，你可能会感到有点不同。它是一个值得学习的东西。其中最重要的是声明和各种初始化的语法。尽管我是 Go 的粉丝，Go 尽管也在简单性方面取得了一些进展，但它并不简单。不过，它归纳为一些基本的规则（比如你只能声明变量一次以及 `:=` 确实声明了变量）以及基本理解（比如 `new(X)`  或者 `&X{}` 仅仅只是分配内存，但是切片，映射以及通道需要更多的初始化，所以用 `make`）。

除了这些，Go 给了我们简单但有效的方式组织我们的代码。接口，基于返回的错误处理，用于资源管理的 `defer`以及实现组合的简单方式。

最后但也最重要的是内置并发支持。关于 **协程** ，除了有效和简单（无论如何简单易用）之外，几乎没有什么可说的了。这是一个很好的抽象。 **通道** 更为复杂。我一直认为在使用高级包装器之前先理解最基本使用方法。我认为不通过 **通道** 学习并发编程是很有用的。但是，对我来说，我觉得 **通道** 的实现方式不像一个简单的抽象。它们几乎都是自己的基本构件。我这样说是因为它们改变了你编写和思考并发编程的方式。 鉴于并发编程有多么困难，这绝对是一件好事。 


以及实现组合的简单方式。

最后但也最重要的是内置并发支持。关于 **协程** ，除了有效和简单（无论如何简单易用）之外，几乎没有什么可说的了。这是一个很好的抽象。 **通道** 更为复杂。我一直认为在使用高级包装器之前先理解最基本使用方法。我认为不通过 **通道** 学习并发编程是很有用的。但是，对我来说，我觉得 **通道** 的实现方式不像一个简单的抽象。它们几乎都是自己的基本构件。我这样说是因为它们改变了你编写和思考并发编程的方式。 鉴于并发编程有多么困难，这绝对是一件好事。 


