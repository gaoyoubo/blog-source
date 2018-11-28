---
title: HexoClient
description: HexoClient介绍
layout: hexo-client
comments: true
sidebar: none
---

## 介绍
> TODO

## 更新记录
> TODO

## 最佳实践

### 安装和使用hexo
> TODO

### 使用Github Pages托管
> TODO 

### 使用Travis-CI自动发布
> TODO

### 使用HexoClient管理你的文章
> TODO

## 常见问题
- 出现莫名其妙的未知错误怎么办

- Hexo中有文章，但是打开之后却显示空白
HexoClient的数据加载是完全依赖于Hexo的，所以在打开HexoClient之前要确保你的Hexo是install成功的。

- 发布失败
HexoClient的发布操作其实也是先调用`hexo generate`再调用`hexo deploy`。如果要想能够发布成功，那么首先要确保自己在命令行能够成功调用这两个命令。另外如果你的deployer是git，请使用ssh协议，不要使用http(s)协议。


