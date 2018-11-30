---
title: HexoClient使用帮助
tags:
  - Hexo
  - HexoClient
originContent: >-
  ## 阅读前提


  > 本文不会讲解如何安装、配置、使用Hexo，所以阅读前请确保掌握以下技能。


  - 能独立安装使用Hexo

  - 能够正确的将Hexo部署到GitHub Pages

  - 熟练掌握markdown语法

  - 了解基本的Git用法


  ## 最佳实践


  ### 原理概述

  我在Github上创建以下两个项目：

  - blog.mspring.org 该项目开启GitHub Pages用来存放`hexo deploy`之后的静态网页

  - blog-source 该项目用来存放我的hexo原始项目（也就是你通过hexo init创建的工程）

  然后我们利用Trvais-ci，进行自动构建和发布。当Travis-ci监控到`blog-source`有新的提交记录，那么会自动执行脚本将更新发布到`blog.mspring.org`。


  ### 使用Travis-CI自动发布


  #### 第一步：生成access token

  进入Github个人主页，找到：Settings -> Developer settings -> Personal access
  tokens，然后取`Generate new token`，参照下图配置即可。

  ![](http://file.mspring.org/a43317347f11ba251d312d68697475ef!detail)

  这里生成的Token，接下来会用到，请先妥善保存好。


  #### 第二步：注册并开启Travis-CI项目构建

  使用 `GitHub账户登录` [Travis-CI官网](https://travis-ci.org) ，进去后能看到已经自动关联了 GitHub
  上的仓库。这里我们选择需要启用的项目，即 `blog-source`。然后点击后面的`Settings`进入设置界面。

  ![](http://file.mspring.org/bb9afa5fd9a4c846fe8a53767931126d!detail)


  #### 第三步：配置Travis-CI自动构建

  进入设置界面后可以参考我的配置：

  ![](http://file.mspring.org/33e9d652fa14373f0cf8cc1cef38270e!detail)


  配置主要注意一下两点即可：

  - Build pushed branches


  当分支收到新的push之后构建


  - Environment Variables -> GH_TOKEN


  GH_TOKEN，是我们第一步在github中生成的access
  token，因为要从github上将代码拉到travis-ci机器上进行构建，所以需要该token授权。


  #### 第四步：配置hexo的_config.yml

  因为我们的博客托管在github
  pages，所以我们是以git的方式进行deploy的，hexo如何配置使用git方式进行deploy，请自行Google。下面截取了我的`_config.yml`文件中关于git
  deploy配置的片段。

  ```shell

  # Deployment

  ## Docs: https://hexo.io/docs/deployment.html

  deploy:

  - type: git
    # 下方的GH_TOKEN会被.travis.yml中sed命令替换
    repo: https://GH_TOKEN@github.com/gaoyoubo/blog.mspring.org.git
    branch: master
  ```


  #### 第五步：配置构建脚本`.travis.yml`

  在hexo项目的根目录创建`.travis.yml`文件，该文件就是travis的构建脚本，下面是我的脚本配置，我会在脚本中详细注释每一步的作用。

  ```shell

  # 指定语言为node_js，nodejs版本stable

  language: node_js

  node_js: stable


  # 指定构建的分支

  branches:
    only:
      - master

  # 指定node_modules缓存

  cache:
    directories:
      - node_modules

  # 构建之前安装hexo-cli，因为接下来会用到

  before_install:
    - npm install -g hexo-cli

  # 安装依赖

  install:
    - npm install

  # 执行脚本，先hexo clean 再 hexo generate，会使用hexo的同学应该不陌生。

  script:
    - hexo clean
    - hexo generate

  # 上面的脚本执行成功之后执行以下脚本进行deploy

  after_success:
    - git init
    - git config --global user.name "GaoYoubo"
    - git config --global user.email "gaoyoubo@foxmail.com"
    # 替换同目录下的_config.yml文件中GH_TOKEN字符串为travis后台配置的变量
    - sed -i "s/GH_TOKEN/${GH_TOKEN}/g" ./_config.yml
    - hexo deploy
  ```


  ### 使用HexoClient管理你的文章


  - HexoClient在启动之后选择好hexo安装的目录，会自动读取Hexo目录中的文章。

  -
  HexoClient中支持新建、修改文章，新建修改文章之后点击发布按钮能够将文章更改提交到git，并自动通过travis自动发布。（前提是按照上面步骤配置好）

  -
  HexoClient支持七牛图片上传，七牛10G存储空间，每月10G流量免费，可以自行注册配置七牛，配置好后将七牛的ak、sk、bucket、域名配置到HexoClient中



  ## 常见问题

  - 出现莫名其妙的未知错误怎么办


  在菜单栏中找到：查看 ->
  切换开发者工具，将开发者工具打开，然后看控制台是否有错误，如果有错误将错误信息copy出来，点击这里提交问题：[https://github.com/gaoyoubo/hexo-client/issues/new](https://github.com/gaoyoubo/hexo-client/issues/new)


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


  ### v1.1.3

  - 升级markdown编辑器，使用mavonEditor编辑器（https://github.com/hinesboy/mavonEditor）。

  - 修复图片文章列表过长是，切换页面滚动位置丢失的问题。

  - 重构代码，优化调用逻辑和布局层级关系。

  - 升级electron版本到2.0.6。


  ### v1.1.0

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
我在Github上创建以下两个项目：
- blog.mspring.org 该项目开启GitHub Pages用来存放`hexo deploy`之后的静态网页
- blog-source 该项目用来存放我的hexo原始项目（也就是你通过hexo init创建的工程）
然后我们利用Trvais-ci，进行自动构建和发布。当Travis-ci监控到`blog-source`有新的提交记录，那么会自动执行脚本将更新发布到`blog.mspring.org`。

### 使用Travis-CI自动发布

#### 第一步：生成access token
进入Github个人主页，找到：Settings -> Developer settings -> Personal access tokens，然后取`Generate new token`，参照下图配置即可。
![](http://file.mspring.org/a43317347f11ba251d312d68697475ef!detail)
这里生成的Token，接下来会用到，请先妥善保存好。

#### 第二步：注册并开启Travis-CI项目构建
使用 `GitHub账户登录` [Travis-CI官网](https://travis-ci.org) ，进去后能看到已经自动关联了 GitHub 上的仓库。这里我们选择需要启用的项目，即 `blog-source`。然后点击后面的`Settings`进入设置界面。
![](http://file.mspring.org/bb9afa5fd9a4c846fe8a53767931126d!detail)

#### 第三步：配置Travis-CI自动构建
进入设置界面后可以参考我的配置：
![](http://file.mspring.org/33e9d652fa14373f0cf8cc1cef38270e!detail)

配置主要注意一下两点即可：
- Build pushed branches

当分支收到新的push之后构建

- Environment Variables -> GH_TOKEN

GH_TOKEN，是我们第一步在github中生成的access token，因为要从github上将代码拉到travis-ci机器上进行构建，所以需要该token授权。

#### 第四步：配置hexo的_config.yml
因为我们的博客托管在github pages，所以我们是以git的方式进行deploy的，hexo如何配置使用git方式进行deploy，请自行Google。下面截取了我的`_config.yml`文件中关于git deploy配置的片段。
```shell
# Deployment
## Docs: https://hexo.io/docs/deployment.html
deploy:
- type: git
  # 下方的GH_TOKEN会被.travis.yml中sed命令替换
  repo: https://GH_TOKEN@github.com/gaoyoubo/blog.mspring.org.git
  branch: master
```

#### 第五步：配置构建脚本`.travis.yml`
在hexo项目的根目录创建`.travis.yml`文件，该文件就是travis的构建脚本，下面是我的脚本配置，我会在脚本中详细注释每一步的作用。
```shell
# 指定语言为node_js，nodejs版本stable
language: node_js
node_js: stable

# 指定构建的分支
branches:
  only:
    - master

# 指定node_modules缓存
cache:
  directories:
    - node_modules

# 构建之前安装hexo-cli，因为接下来会用到
before_install:
  - npm install -g hexo-cli

# 安装依赖
install:
  - npm install

# 执行脚本，先hexo clean 再 hexo generate，会使用hexo的同学应该不陌生。
script:
  - hexo clean
  - hexo generate

# 上面的脚本执行成功之后执行以下脚本进行deploy
after_success:
  - git init
  - git config --global user.name "GaoYoubo"
  - git config --global user.email "gaoyoubo@foxmail.com"
  # 替换同目录下的_config.yml文件中GH_TOKEN字符串为travis后台配置的变量
  - sed -i "s/GH_TOKEN/${GH_TOKEN}/g" ./_config.yml
  - hexo deploy
```

### 使用HexoClient管理你的文章

- HexoClient在启动之后选择好hexo安装的目录，会自动读取Hexo目录中的文章。
- HexoClient中支持新建、修改文章，新建修改文章之后点击发布按钮能够将文章更改提交到git，并自动通过travis自动发布。（前提是按照上面步骤配置好）
- HexoClient支持七牛图片上传，七牛10G存储空间，每月10G流量免费，可以自行注册配置七牛，配置好后将七牛的ak、sk、bucket、域名配置到HexoClient中


## 常见问题
- 出现莫名其妙的未知错误怎么办

在菜单栏中找到：查看 -> 切换开发者工具，将开发者工具打开，然后看控制台是否有错误，如果有错误将错误信息copy出来，点击这里提交问题：[https://github.com/gaoyoubo/hexo-client/issues/new](https://github.com/gaoyoubo/hexo-client/issues/new)

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

### v1.1.3
- 升级markdown编辑器，使用mavonEditor编辑器（https://github.com/hinesboy/mavonEditor）。
- 修复图片文章列表过长是，切换页面滚动位置丢失的问题。
- 重构代码，优化调用逻辑和布局层级关系。
- 升级electron版本到2.0.6。

### v1.1.0
- 优化页面配色。
- 优化文章预览、详情页面展示样式。
- 文章内容修改后离开页面进行友好提示。
- 支持hexo generate 和 hexo deploy。