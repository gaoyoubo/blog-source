---
title: Centos7初始化安装mariadb
tags:
  - mariadb
originContent: ''
categories:
  - 程序员
toc: false
date: 2019-06-05 13:57:52
---

## 安装MariaDB
安装命令

```shell
yum -y install mariadb mariadb-server
```

安装完成MariaDB，首先启动MariaDB

```shell
systemctl start mariadb
```

设置开机启动

```shell
systemctl enable mariadb
```

接下来进行MariaDB的相关简单配置

```shell
mysql_secure_installation
```

首先是设置密码，会提示先输入密码

```shell
Enter current password for root (enter for none):<–初次运行直接回车
```

设置密码

```shell
Set root password? [Y/n] <– 是否设置root用户密码，输入y并回车或直接回车
New password: <– 设置root用户的密码
Re-enter new password: <– 再输入一次你设置的密码
```

其他配置

```shell
Remove anonymous users? [Y/n] <– 是否删除匿名用户，回车

Disallow root login remotely? [Y/n] <–是否禁止root远程登录,回车,

Remove test database and access to it? [Y/n] <– 是否删除test数据库，回车

Reload privilege tables now? [Y/n] <– 是否重新加载权限表，回车
```

初始化MariaDB完成，接下来测试登录

```
mysql -uroot -ppassword
```

完成。