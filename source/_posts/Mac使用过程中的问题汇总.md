---
title: Mac使用过程中的问题汇总
tags:
  - mac
categories: []
toc: false
date: 2020-11-25 11:18:00
---

## Touchbarbu不显示音量

这应该是一个BUG，在终端执行以下命令可以恢复正常：

```shell
killall ControlStrip
```

## 清理dns缓存

```shell
sudo killall -HUP mDNSResponder
```

## iterm2 lzrz 功能配置

解决办法：[https://www.mspring.org/2021/01/19/mac-iterm2-rz%E4%B8%8Esz%E7%9A%84%E5%8A%9F%E8%83%BD/](https://www.mspring.org/2021/01/19/mac-iterm2-rz%E4%B8%8Esz%E7%9A%84%E5%8A%9F%E8%83%BD/)

