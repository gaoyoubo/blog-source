---
title: Golang指针类型和值类型
tags:
  - Go
  - 程序员
originContent: ''
categories:
  - 程序员
toc: false
date: 2019-07-15 16:22:22
---

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