---
title: Golang文件流下载，边下载边计算MD5
tags:
  - Go
originContent: ''
categories:
  - 程序员
toc: false
date: 2022-03-08 19:57:38
---

当时是为了测试文件网卡问题，发现同样的文件，在一个很烂的网卡中不断的下载，计算的文件MD5会不一样的问题。代码记录下，留作参考。

```go
package main

import (
	"crypto/md5"
	"encoding/hex"
	"flag"
	"fmt"
	"io"
	"net/http"
	"os"
	"strconv"
	"time"
)

var (
	url     = "被下载文件链接"
	data    = make(map[string]int)
	logFile = flag.String("logFile", os.Getenv("HOME")+"/"+"network-card-test.log", "日志文件路径") // /Users/xxx/Downloads/fuck.log
)

func main() {
	flag.Parse()
	for {
		handle()
	}
}

func handle() {
	md5Str, err := download(url)
	if err != nil {
		log(err.Error())
		return
	}

	defer func() {
		count := data[md5Str]
		data[md5Str] = count + 1
	}()

	count, found := data[md5Str]
	if !found && len(data) > 0 {
		log("文件MD5异常：" + md5Str + ", count=" + strconv.Itoa(count))
	} else {
		log("文件MD5：" + md5Str + ", count=" + strconv.Itoa(count))
	}
}

func download(url string) (string, error) {
	var (
		err         error
		resp        *http.Response
		contentLen  int64
		downloadLen int
	)
	if resp, err = http.Get(url); err != nil {
		return "", err
	}

	if contentLen, err = strconv.ParseInt(resp.Header.Get("Content-Length"), 10, 64); err != nil {
		return "", err
	}

	defer func() {
		_ = resp.Body.Close()
		fmt.Print("\n")
	}()

	h := md5.New()
	for {
		buf := make([]byte, 1024)
		c, e := resp.Body.Read(buf)
		if e != nil && e != io.EOF {
			return "", e
		}
		downloadLen += c

		printProgress(downloadLen, contentLen)

		h.Write(buf[0:c])

		if e != nil && e == io.EOF {
			break
		}
	}
	return hex.EncodeToString(h.Sum(nil)), nil
}

func printProgress(downloadLen int, contentLen int64) {
	fmt.Printf("\r")
	fmt.Printf("Downloading... %d of %d", downloadLen, contentLen)
}

func log(content string) {
	content = time.Now().Format("2006-01-02 15:04:05") + ": " + content

	fmt.Println(content)

	file, err := os.OpenFile(*logFile, os.O_RDWR|os.O_CREATE|os.O_APPEND, 0644)
	if err != nil {
		fmt.Println(err.Error())
		return
	}
	defer func() {
		_ = file.Close()
	}()

	_, err = file.WriteString(content + "\n")
	if err != nil {
		fmt.Println(err.Error())
	}
}
```

