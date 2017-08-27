title: Go语言在mac下编译Linux可执行文件
author: 雾非雾的情思
abbrlink: 51618423
tags: []
categories: []
date: 2017-06-02 00:00:00
---
进入源码目录，执行如下命令：
```
CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build 
```