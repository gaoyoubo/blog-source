---
title: IDE Goland DEBUG报错
tags:
  - Go
originContent: ''
categories:
  - 程序员
toc: false
date: 2018-12-21 11:27:33
---

在升级GO版本到1.11后发现Goland的Debug报错，错误信息如下：
```
could not launch process: decoding dwarf section info at offset 0x0: too short
```
原因是Goland的dlv不是新版本，导致不能debug调试。

解决办法：

1. 更新dlv：go get -u github.com/derekparker/delve/cmd/dlv
2. 修改goland配置，Help->Edit Custom Properties中增加新版dlv的路径配置：dlv.path=$GOPATH/bin/dlv
3. 重启Goland，再次使用debug调试工具，就没有问题了。

参考：https://stackoverflow.com/questions/43014884/mac-osx-jetbrains-gogland-delve-debugging-meet-could-not-launch-process-could/43014980#43014980