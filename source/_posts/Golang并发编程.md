---
title: Golang并发编程
tags:
  - 程序员
  - Go
categories:
  - 程序员
toc: false
date: 2019-07-15 16:23:19
---

Go语言的并发是基于 goroutine 的，goroutine 类似于线程，但并非线程。可以将 goroutine 理解为一种虚拟线程。Go语言运行时会参与调度 goroutine，并将 goroutine 合理地分配到每个 CPU 中，最大限度地使用CPU性能。

Go 程序从 main 包的 main() 函数开始，在程序启动时，Go 程序就会为 main() 函数创建一个默认的 goroutine。

![](https://i.loli.net/2019/07/15/5d2c2e4fe2f4d88322.jpg)

下面我们来看一个例子，在线演示：https://play.golang.org/p/U9U-qjuY0t1

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

下面我们利用goroutine+channel来实现一个生产消费者模型，示例代码如下，在线执行：https://play.golang.org/p/lqUBugLdU-I

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