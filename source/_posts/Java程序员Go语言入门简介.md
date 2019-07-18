---
title: Java程序员Go语言入门简介
tags:
  - 程序员
  - Java
  - Go
categories:
  - 程序员
toc: false
date: 2019-07-15 16:20:11
---

## 为什么是Go语言

- 类C的语法，这意味着Java、C#、JavaScript程序员能很快的上手
- 有自己的垃圾回收机制
- 跨平台、编译即可执行无需安装依赖环境
- 支持反射

## Go语言简介

Go 语言（或 Golang）起源于 2007 年，并在 2009 年正式对外发布。Go 是非常年轻的一门语言，它的主要目标是“兼具Python等动态语言的开发速度和 C/C++ 等编译型语言的性能与安全性”。

## 数据类型

| 数据类型 | 说明                                              |
| -------- | ------------------------------------------------- |
| bool     | 布尔                                              |
| string   | 字符串                                            |
| int      | uint8,uint16,uint32,uint64,int8,int16,int32,int64 |
| float    | float32,float64                                   |
| byte     | byte                                              |

参考：https://www.runoob.com/go/go-data-types.html

## 基本语法

### HelloWorld

在线运行示例：https://play.golang.org/p/-4RylAqUV36

```go
package main

import "fmt"

var name string

func init() {
  name = "world"
}

func main() {
  fmt.Println("hello " + name)
}
```

我们来执行一下：

```shell
$ go run main.go # main.go 为刚刚创建的那个文件的名称
$ hello world
```

### 变量

#### 变量声明

在线运行示例：https://play.golang.org/p/zPqCkRZgrgp

```go
package main

import (
	"fmt"
)

func main() {
	var name string   // 声明
	name = "gaoyoubo" // 赋值
	fmt.Println(name)

	var age int = 18 // 声明并赋值
	fmt.Println(age)
}
```

#### 类型推断

在线运行示例：https://play.golang.org/p/0My8veBvtJ8

```go
package main

import (
	"fmt"
)

func main() {
	name := "gaoyoubo"
	fmt.Println(name)

	age := 18
	fmt.Println(age)
}
```

### 函数

- 函数可以有多个返回值
- 隐式的指定函数是private还是public，函数首字母大写的为public、小写的为private
- 没有类似Java中的`try cache`、`throw`，Go语言是通过将`error`作为返回值来处理异常。
- 不支持重载

下面我们通过一个示例来了解一下，在线运行示例：https://play.golang.org/p/PYy3ueuPFS6

```go
package main

import (
	"errors"
	"fmt"
	"strconv"
)

func main() {
	log1()

	log2("hello world")

	ret1 := add1(1, 1)
	fmt.Println("add1 result:" + strconv.Itoa(ret1))

	ret2, err := Add2(0, 1)
	if err == nil {
		fmt.Println("Add2 result:" + strconv.Itoa(ret2))
	} else {
		fmt.Println("Add2 error", err)
	}
}

// 私有、无入参、无返回值
func log1() {
	fmt.Println("execute func log1")
}

// 私有、入参、无返回值
func log2(msg string) {
	fmt.Println("execute func log2:" + msg)
}

// 私有、两个入参、一个返回值
func add1(count1, count2 int) int {
	total := count1 + count2
	fmt.Println("execute func add3, result=" + strconv.Itoa(total))
	return total
}

// Public、两个入参、多个返回值
func Add2(count1, count2 int) (int, error) {
	if count1 < 1 || count2 < 1 {
		return 0, errors.New("数量不能小于1")
	}
	total := count1 + count2
	return total, nil
}
```

该示例输出结果为：

```
execute func log1
execute func log2:hello world
execute func add3, result=2
add1 result:2
Add2 error 数量不能小于1
```

但函数有多个返回值的时候，有时你只关注其中一个返回值，这种情况下你可以将其他的返回值赋值给空白符：`_`，如下：

```go
_, err := Add2(1, 2)
if err != nil {
  fmt.Println(err)
}	
```

空白符特殊在于实际上返回值并没有赋值，所以你可以随意将不同类型的值赋值给他，而不会由于类型不同而报错。

### 结构体
Go语言不是像Java那样的面向对象的语言，他没有对象和继承的概念。也没有`class`的概念。在Go语言中有个概念叫做结构体（`struct`），结构体和Java中的`class`比较类似。下面我们定义一个结构体：

```go
type User struct {
	Name   string
	Gender string
	Age    int
}
```

上面我们定义了一个结构体`User`，并为该结构体分别设置了三个公有属性：Name/Gender/Age，下面我们来创建一个User对象。

```go
user := User{
	Name:   "hahaha",
	Gender: "男",
	Age:    18, // 值得一提的是，最后的逗号是必须的，否则编译器会报错，这就是go的设计哲学之一，要求强一致性。
}
```

结构体的属性可以在结构体内直接声明，那么如何为结构体声明函数（即Java中的方法）呢，我们来看下下面的示例：在线运行示例：https://play.golang.org/p/01_cTu0RzdH

```go
package main

import "fmt"

type User struct {
	Name   string
	Gender string
	Age    int
}

// 定义User的成员方法
func (u *User) addAge() {
	u.Age = u.Age + 1
}

func main() {
	user := User{
		Name:   "哈", // 名称
		Gender: "男", // 性别
		Age:    18,  // 值得一提的是，最后的逗号是必须的，否则编译器会报错，这就是go的设计哲学之一，要求强一致性。
	}
	user.addAge()
	fmt.Println(user.Age)
}
```

### 指针类型和值类型

Java中值类型和引用类型都是定死的，int、double、float、long、byte、short、char、boolean为值类型，其他的都是引用类型，而Go语言中却不是这样。

在Go语言中：
* `&`表示取地址，例如你有一个变量`a`那么`&a`就是变量`a`在内存中的地址，对于Golang指针也是有类型的，比如a是一个string那么&a是一个string的指针类型，在Go里面叫&string。
* `*`表示取值，接上面的例子，假设你定义`b := &a` 如果你打印`b`，那么输出的是`&a`的内存地址，如果要取值，那么需要使用：`*b`

下面我们来看下例子，在线运行：https://play.golang.org/p/jxAKyVMjnoy

```go
package main

import (
	"fmt"
)

func main() {
	a := "123"
	b := &a

	fmt.Println(a)
	fmt.Println(b)
	fmt.Println(*b)
}

输出结果为：
123
0x40c128
123
```

### 并发编程

Go语言的并发是基于 goroutine 的，goroutine 类似于线程，但并非线程。可以将 goroutine 理解为一种虚拟线程。Go语言运行时会参与调度 goroutine，并将 goroutine 合理地分配到每个 CPU 中，最大限度地使用CPU性能。

Go 程序从 main 包的 main() 函数开始，在程序启动时，Go 程序就会为 main() 函数创建一个默认的 goroutine。

![](https://i.loli.net/2019/07/15/5d2c2e4fe2f4d88322.jpg)

下面我们来看一个例子（在线演示：https://play.golang.org/p/U9U-qjuY0t1）

```go
package main

import (
	"fmt"
	"time"
)

func main() {
	// 创建一个goroutine
	go runing()
	// 创建一个匿名的goroutine
	go func() {
		fmt.Println("喜特:" + time.Now().String())
	}()

	// 这里sleep一下是因为main方法如果执行完了，main该程序创建的所有goroutine都会退出
	time.Sleep(5 * time.Second)
}

func runing() {
	fmt.Println("法克:" + time.Now().String())
	time.Sleep(3 * time.Second)
}

输出：
法克:2009-11-10 23:00:00 +0000 UTC m=+0.000000001
喜特:2009-11-10 23:00:00 +0000 UTC m=+0.000000001
```

执行结果说明fuck函数中的sleep三秒并没有影响`喜特`的输出。

如果说 goroutine 是Go语言程序的并发体的话，那么 channel 就是它们之间的通信机制。一个 channel 是一个通信机制，它可以让一个 goroutine 通过它给另一个 goroutine 发送值信息。每个 channel 都有一个特殊的类型，也就是 channel 可发送数据的类型。一个可以发送 int 类型数据的 channel 一般写为 chan int。

下面我们利用goroutine+channel来实现一个生产消费者模型，示例代码如下：（在线执行：https://play.golang.org/p/lqUBugLdU-I）

```go
package main

import (
	"fmt"
	"time"
)

func main() {
	// 创建一个通道
	channel := make(chan int64)

	// 异步去生产
	go producer(channel)

	// 数据消费
	consumer(channel)
}

// 生产者
func producer(channel chan<- int64) {
	for {
		// 将数据写入通道
		channel <- time.Now().Unix()
		// 睡1秒钟
		time.Sleep(time.Second)
	}
}

// 消费者
func consumer(channel <-chan int64) {
	for {
		timestamp := <-channel
		fmt.Println(timestamp)
	}
}

输出为如下：(每秒钟打印一次)
1257894000
1257894001
1257894002
1257894003
```


## Java程序员觉得不好用的地方

- 异常处理
- 没有泛型
- 不支持多态、重载
- 不支持注解（但是他的struct中的属性支持`tag`）

## 参考

- https://www.runoob.com/go/go-tutorial.html
- https://books.studygolang.com/the-little-go-book_ZH_CN/