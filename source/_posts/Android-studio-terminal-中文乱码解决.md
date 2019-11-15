---
title: Android studio terminal 中文乱码解决
tags:
  - Android
categories:
  - 程序员
toc: false
date: 2018-03-10 11:45:36
---

Android studio terminal中文乱码，如下图：
![](http://qiniu.mnclub.club/68c9e13df012b7ac702f5c98716c6225)

解决办法打开`~/.zshrc`找到如下：
```
# You may need to manually set your language environment
# export LANG=en_US.UTF-8
```
将 `export LANG=en_US.UTF-8` 这一行解注。
![](http://qiniu.mnclub.club/b07a6381b955735cf8c2b72746b57e9b)
