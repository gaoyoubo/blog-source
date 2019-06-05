---
title: 修改mariadb的datadir
tags:
  - mariadb
originContent: ''
categories:
  - 程序员
toc: false
date: 2019-06-05 14:04:59
---

> 目标：将mariadb默认的datadir（/var/lib/mysql）迁移到`/data/mysql`

### 停止mariadb服务

```shell
systemctl stop mariadb
```

### 创建新datadir
```shell
mkdir /data/mysql
chown -R mysql:mysql /data/mysql
```

### 将数据文件复制过来

```shell
cp -a /var/lib/mysql    /data/mysql
```

### 修改配置

```shell
vi /etc/my.cnf

[mysqld]
# datadir=/var/lib/mysql
# 注释掉之前的，将datadir设置成新目录
datadir=/data/mysql
```

### 重新启动mariadb服务

```shell
systemctl start mariadb
```