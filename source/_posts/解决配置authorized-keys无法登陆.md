---
title: 解决配置authorized_keys无法登陆
tags:
  - 程序员
originContent: ''
categories:
  - 程序员
toc: false
date: 2019-04-23 13:34:10
---

因为权限问题才无法登陆，这里记录下，方便后面查用。

```shell
sudo chmod 644 ~/.ssh/authorized_keys
sudo chmod 700 ~/.ssh
```