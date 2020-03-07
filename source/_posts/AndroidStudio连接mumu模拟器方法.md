---
title: AndroidStudio连接mumu模拟器方法
tags:
  - Android
originContent: ''
categories:
  - 程序员
toc: false
date: 2020-03-07 13:10:00
---

启动mumu模拟器之后在设备列表中找不到模拟器，于是在网上搜索了下教程。

有个教程提供一下方法：

```
adb connect 127.0.0.1:7555 
```

附模拟器端口：

```
夜神模拟器：adb connect 127.0.0.1:62001
逍遥安卓模拟器：adb connect 127.0.0.1:21503
天天模拟器：adb connect 127.0.0.1:6555 
海马玩模拟器：adb connect 127.0.0.1:53001
网易MUMU模拟器：adb connect 127.0.0.1:7555
原生模拟器：adb connect (你的IP地址)：5555
```

但是这个方法在mac下好像不还用，于是又找到另外一种方法：

```
adb kill-server && adb server && adb shell
```

这个方法终于生效。