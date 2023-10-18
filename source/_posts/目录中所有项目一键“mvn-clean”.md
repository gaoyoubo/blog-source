---
title: 目录中所有项目一键“mvn clean”
tags:
  - 程序员
originContent: ''
categories:
  - 程序员
toc: false
date: 2023-10-18 19:36:41
---

我的代码都会放到`~/code`下，随着项目越来越多build后的文件会越来越大，占用磁盘空间。于是我写了个命令一键mvn clean

```bash
#!/bin/sh
for dir in $(ls -d */); do
    cd $dir
    if [ -f "pom.xml" ]; then
        mvn clean
    fi
    cd ..
done
```

