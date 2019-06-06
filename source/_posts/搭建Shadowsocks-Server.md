---
title: 搭建Shadowsocks-Server
tags:
  - shadowsocks
categories:
  - 程序员
toc: false
date: 2019-06-06 10:10:22
---

之前一直使用的搬瓦工的vps搭建的shadowsocks，但是最近被封掉了。正好手里还有一台阿里云香港服务器，所以就自己搭建了一个，下面是搭建流程。

我是使用`shadowsocks-go`进行搭建的，是基于golang编写的，所以先需要安装golang环境，请自行安装。

shadowsocks-go项目地址：https://github.com/shadowsocks/shadowsocks-go

安装方式：

```golang
go get github.com/shadowsocks/shadowsocks-go/cmd/shadowsocks-server
```

安装完成之后请在：`$GOPATH/bin` 目录下找到：`shadowsocks-server` 文件。

然后在该文件同文件夹下创建配置文件：`config.json`，密码端口请自行修改，我们这里使用的服务端端口为：`8388`

```json
{
    "server":"127.0.0.1",
    "server_port":8388,
    "local_port":1080,
    "local_address":"127.0.0.1",
    "password":"helloworld",
    "method": "aes-128-cfb",
    "timeout":600
}
```

另外阿里云默认情况下8388端口是不对外开放的，请去阿里云控制到，找到对应的ecs实例，找到该实例的安全组，将`8388`端口添加到白名单。