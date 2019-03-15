---
title: go mod 的使用
tags:
  - 程序员
  - Go
categories:
  - 程序员
toc: true
date: 2019-03-15 10:56:22
---

从Go1.11开始，golang官方支持了新的依赖管理工具`go mod`。

## 命令行说明
```shell
➜  ~ go mod
Go mod provides access to operations on modules.

Note that support for modules is built into all the go commands,
not just 'go mod'. For example, day-to-day adding, removing, upgrading,
and downgrading of dependencies should be done using 'go get'.
See 'go help modules' for an overview of module functionality.

Usage:

	go mod <command> [arguments]

The commands are:

	download    download modules to local cache
	edit        edit go.mod from tools or scripts
	graph       print module requirement graph
	init        initialize new module in current directory
	tidy        add missing and remove unused modules
	vendor      make vendored copy of dependencies
	verify      verify dependencies have expected content
	why         explain why packages or modules are needed

Use "go help mod <command>" for more information about a command.
```
- go mod download: 下载依赖的module到本地cache
- go mod edit: 编辑go.mod
- go mod graph: 打印模块依赖图
- go mod init: 在当前目录下初始化go.mod(就是会新建一个go.mod文件)
- go mod tidy: 整理依赖关系，会添加丢失的module，删除不需要的module
- go mod vender: 将依赖复制到vendor下
- go mod verify: 校验依赖
- go mod why: 解释为什么需要依赖

## 在新项目中使用

使用go mod并不要求你的项目源码放到$GOPATH下，所以你的新项目可以放到任意你喜欢的路径。在项目根目录下执行`go mod init`，会生成一个go.mod文件。然后你可以在其中增加你的依赖，如下：
```
module github.com/gaoyoubo/xxx

go 1.12

require (
	github.com/go-sql-driver/mysql v1.4.1
        .... 你的依赖类似这样，添加到这里，一行一条。
)
```
然后执行`go mod download`，将依赖下载到本地。这些依赖并不是下载到你的项目目录下，而是会下载到`$GOPATH/pkg/mod`目录下，这样所有使用go mod的项目都可以共用。

## 在旧项目中使用

在旧项目中使用非常简单，只需要一下两个步骤：

- `go mod init`: 在项目根目录下执行该命令，会在项目根目录下生成一个`go.mod`文件。
- `go mod tidy`: 在项目根目录下执行该命令，go mod会自动分析你当前项目所需要的依赖，并且将他们下载下来。

## 如何升级依赖
运行 `go get -u` 将会升级到最新的次要版本或者修订版本(x.y.z, z是修订版本号y是次要版本号)
运行 `go get -u=patch` 将会升级到最新的修订版本
运行 `go get package@version` 将会升级到指定的版本