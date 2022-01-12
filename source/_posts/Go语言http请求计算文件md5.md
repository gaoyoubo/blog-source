---
title: Go语言http请求计算文件md5
tags:
  - Go
originContent: ''
categories:
  - 程序员
toc: false
date: 2022-01-12 16:39:55
---

```go
package main

import (
	"crypto/md5"
	"encoding/hex"
	"fmt"
	"io"
	"net/http"
	"strconv"
)

func main() {
	ret, err := download("http://....")
	if err != nil {
		fmt.Println(err)
	}
	fmt.Println(ret)
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
```

