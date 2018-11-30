---
title: HexoClient使用帮助
tags:
  - Hexo
  - HexoClient
originContent: |-
  ## 阅读前提

  > 本文不会讲解如何安装、配置、使用Hexo，所以阅读前请确保掌握以下技能。

  - 能独立安装使用Hexo
  - 能够正确的将Hexo部署到GitHub Pages
  - 熟练掌握markdown语法
  - 了解基本的Git用法

  ## 最佳实践

  ### 原理概述
  我在Github上创建以下两个项目
  - blog.mspring.org 该项目开启GitHub Pages用来存放`hexo deploy`之后的静态网页
  - blog-source 该项目用来存放我的hexo原始项目（也就是没有你通过hexo init创建的博客）

  ### 使用Travis-CI自动发布
  > TODO 

  ### 使用HexoClient管理你的文章
  > TODO

  ## 常见问题
  - 出现莫名其妙的未知错误怎么办
  > TODO

  - Hexo中有文章，但是打开之后却显示空白

  HexoClient的数据加载是完全依赖于Hexo的，所以在打开HexoClient之前要确保你的Hexo是install成功的。

  ## HexoClient更新记录
  ### 1.2.2
  - 支持文章搜索
  - 优化新建、编辑文章页布局
  - 优化调整发布功能按钮
  - 支持新建文章、发布快捷键操作
  - 其他页面细节优化

  ### v1.2.1
  - MacOS下无边框样式
  - 调整菜单栏布局
  - 修改UI配色和界面细节
  - 修复初始化时选择hexo目录失败的问题
  - 升级electron版本到3.x
  - 其他细节修改

  ## v1.1.3
  - 升级markdown编辑器，使用mavonEditor编辑器（https://github.com/hinesboy/mavonEditor）。
  - 修复图片文章列表过长是，切换页面滚动位置丢失的问题。
  - 重构代码，优化调用逻辑和布局层级关系。
  - 升级electron版本到2.0.6。

  ## v1.1.0
  - 优化页面配色。
  - 优化文章预览、详情页面展示样式。
  - 文章内容修改后离开页面进行友好提示。
  - 支持hexo generate 和 hexo deploy。
categories:
  - 程序员
toc: true
date: 2018-11-29 19:18:29
---

## 阅读前提

> 本文不会讲解如何安装、配置、使用Hexo，所以阅读前请确保掌握以下技能。

- 能独立安装使用Hexo
- 能够正确的将Hexo部署到GitHub Pages
- 熟练掌握markdown语法
- 了解基本的Git用法

## 最佳实践

### 原理概述
我在Github上创建以下两个项目
- blog.mspring.org 该项目开启GitHub Pages用来存放`hexo deploy`之后的静态网页
- blog-source 该项目用来存放我的hexo原始项目（也就是没有你通过hexo init创建的博客）

### 使用Travis-CI自动发布
> TODO

### 使用HexoClient管理你的文章
> TODO

## 常见问题
- 出现莫名其妙的未知错误怎么办
> TODO

- Hexo中有文章，但是打开之后却显示空白

HexoClient的数据加载是完全依赖于Hexo的，所以在打开HexoClient之前要确保你的Hexo是install成功的。

## HexoClient更新记录
### 1.2.2
- 支持文章搜索
- 优化新建、编辑文章页布局
- 优化调整发布功能按钮
- 支持新建文章、发布快捷键操作
- 其他页面细节优化

### v1.2.1
- MacOS下无边框样式
- 调整菜单栏布局
- 修改UI配色和界面细节
- 修复初始化时选择hexo目录失败的问题
- 升级electron版本到3.x
- 其他细节修改

## v1.1.3
- 升级markdown编辑器，使用mavonEditor编辑器（https://github.com/hinesboy/mavonEditor）。
- 修复图片文章列表过长是，切换页面滚动位置丢失的问题。
- 重构代码，优化调用逻辑和布局层级关系。
- 升级electron版本到2.0.6。

## v1.1.0
- 优化页面配色。
- 优化文章预览、详情页面展示样式。
- 文章内容修改后离开页面进行友好提示。
- 支持hexo generate 和 hexo deploy。