---
title: mac下，mds_stores占用过高cpu，导致风扇狂转，怎么解决？
tags:
  - mac
originContent: ''
categories:
  - 碎碎念
toc: false
date: 2020-06-12 10:35:10
---

网上的以下方法，是不行的：

```
sudo mdutil -a -i off
```

运行了这一行，mds mds_stores等还是在20% 左右运行中

于是，发现了一个新方法，在终端运行这个：

```
sudo launchctl unload -w /System/Library/LaunchDaemons/com.apple.metadata.mds.plist
```

等你想开的时候，在终端运行这个就行了：

```
sudo launchctl load -w /System/Library/LaunchDaemons/com.apple.metadata.mds.plist
```

哈哈，成功关闭后，世界都变流畅了！！！

相关文章：

https://www.jianshu.com/p/d76dbc097521