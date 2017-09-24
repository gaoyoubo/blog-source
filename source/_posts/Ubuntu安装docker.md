title: Ubuntu安装Docker
author: 雾非雾的情思
abbrlink: 3150191345
tags:
  - docker
categories:
  - 程序员
date: 2017-09-24 15:52:00
---
安装命令
```
sudo apt-get install -y docker.io

```
等待安装完毕，现在我们使用下面的命令启动 Docker：
```
systemctl start docker
```
运行系统引导时启用 docker，命令：
```
systemctl enable docker
```