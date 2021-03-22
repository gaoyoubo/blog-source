---
title: MacOS安装PHP
tags:
  - php
  - 程序员
originContent: ''
categories:
  - 程序员
toc: false
date: 2021-03-22 14:04:19
---

> 偶然的机会需要用一下PHP，记录下安装方式。本身mac系统是自带php的，但是自带的修改起来及其不方便，不好安装扩展。所以直接使用brew安装。

## brew安装php

```shell
brew search php  使用此命令搜索可用的PHP版本
brew install php@7.3.21 使用此命令安装指定版本的php
brew install brew-php-switcher 安装php多版本切换工具
brew-php-switcher 7.3.21 切换PHP版本到7.3.21（需要brew安装多个版本）
```

## 安装PHP扩展

```shell
pecl version 查看版本信息
pecl help 可以查看命令帮助
pecl search redis  搜索可以安装的扩展信息
pecl install redis 安装扩展
pecl install http://pecl.php.net/get/redis-4.2.0.tgz 安装指定版本扩展
```

