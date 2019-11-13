---
title: Use Go Channels as Promises and Async/Await
tags:
  - Go
categories:
  - 程序员
toc: false
date: 2019-11-13 17:52:29
---

原文地址：https://levelup.gitconnected.com/use-go-channels-as-promises-and-async-await-ee62d93078ec


If you’ve ever programmed with *Javascript*, you definitely know about `Promise` and `async`/`await`. *C#*, *Java, Python, *and some other programming languages apply the same pattern but with other names such as `Task` or `Future`.

On the contrary, Go doesn’t follow the pattern at all. Instead, it introduces `goroutines` and `channels`. However, it isn’t difficult to replicate the pattern with `goroutines` and `channels`.

---

# Single async/await

First, let’s experiment with a simple use case: `await` a result from an `async` function.

```
// Javascript.

const longRunningTask = async () => {
    // Simulate a workload.
    sleep(3000)
    return Math.floor(Math.random() * Math.floor(100))
}

const r = await longRunningTask()
console.log(r)
```

```go
// Go.

package main

import (
	"fmt"
        "math/rand"
	"time"
)

func longRunningTask() <-chan int32 {
	r := make(chan int32)

	go func() {
		defer close(r)
		
		// Simulate a workload.
		time.Sleep(time.Second * 3)
		r <- rand.Int31n(100)
	}()

	return r
}

func main() {
	r := <-longRunningTask()
	fmt.Println(r)
}
```

Single async/await in Javascript vs. Golang

To declare an “async” function in Go:

* The return type is `<-chan ReturnType`.
* Within the function, create a channel by `make(chan ReturnType)` and return the created channel at the end of the function.
* Start an anonymous goroutine by `go func() {...}` and implement the function’s logic inside that anonymous function.
* Return the result by sending the value to channel.
* At the beginning of the anonymous function, add `defer close(r)` to close the channel once done.

To “await” the result, simply read the value from channel by `v := <- fn()`.

---

# Promise.all()

It’s very common that we start multiple async tasks then wait for all of them to finish and gather their results. Doing that is quite simple in both Javascript and Golang.

```javascript
// Javascript.

const longRunningTask = async () => {
    // Simulate a workload.
    sleep(3000)
    return Math.floor(Math.random() * Math.floor(100))
}

const [a, b, c] = await Promise.all(longRunningTask(), longRunningTask(), longRunningTask())
console.log(a, b, c)
```

```go
// Go.

package main

import (
	"fmt"
        "math/rand"
	"time"
)

func longRunningTask() <-chan int32 {
	r := make(chan int32)

	go func() {
		defer close(r)
		
		// Simulate a workload.
		time.Sleep(time.Second * 3)
		r <- rand.Int31n(100)
	}()

	return r
}

func main() {
	aCh, bCh, cCh := longRunningTask(), longRunningTask(), longRunningTask()
	a, b, c := <-aCh, <-bCh, <-cCh
	
	fmt.Println(a, b, c)
}
```

We have to do it in 2 lines of code and introduce 3 more variables, but it’s clean and simple enough.

We can not do `<-longRun(), <-longRun(), <-longRun()`, which will `longRun()` one by one instead all in once.

---

# Promise.race()

Sometimes, a piece of data can be received from several sources to avoid high latencies, or there’re cases that multiple results are generated but they’re equivalent and the only first response is consumed. This first-response-win pattern, therefore, is quite popular. Achieving that in both Javascript and Go is very simple.

```javascript
// Javascript.

const one = async () => {
    // Simulate a workload.
    sleep(Math.floor(Math.random() * Math.floor(2000)))
    return 1
}

const two = async () => {
    // Simulate a workload.
    sleep(Math.floor(Math.random() * Math.floor(1000)))
    sleep(Math.floor(Math.random() * Math.floor(1000)))
    return 2
}

const r = await Promise.race(one(), two())
console.log(r)
```

```go
// Go.

package main

import (
	"fmt"
	"math/rand"
	"time"
)

func one() <-chan int32 {
	r := make(chan int32)

	go func() {
		defer close(r)

		// Simulate a workload.
		time.Sleep(time.Millisecond * time.Duration(rand.Int63n(2000)))
		r <- 1
	}()

	return r
}

func two() <-chan int32 {
	r := make(chan int32)

	go func() {
		defer close(r)

		// Simulate a workload.
		time.Sleep(time.Millisecond * time.Duration(rand.Int63n(1000)))
		time.Sleep(time.Millisecond * time.Duration(rand.Int63n(1000)))
		r <- 2
	}()

	return r
}

func main() {
	var r int32
	select {
	case r = <-one():
	case r = <-two():
	}

	fmt.Println(r)
}
```

`select-case` is the pattern that Go designed specifically for racing channel operations. We can even do more stuff within each case, but we’re focusing only on the result so we just leave them all empty.

---

# Promise.then() and Promise.catch()

Because Go’s error propagation model is very different from Javascript, there’s any clean way to replicate `Promise.then()` and `Promise.catch()`. In Go, error is returned along with return values instead of being thrown as exception. Therefore, if your function can fail, you can consider changing your return `<-chan ReturnType` into `<-chan ReturnAndErrorType`, which is a struct holding both the result and error.