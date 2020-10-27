---
title: 多个Github账号时，怎么配置sshkey
tags:
  - git
categories:
  - 程序员
toc: false
date: 2019-06-24 11:00:49
---

我有两个Github账号，在配置sshkey的时候是会提示`Key is already in use`。因为github无法将相同的sshkey配置到不同的账号下，那么就要考虑同一台机器如何配置两个sshkey了。

## 生成第二个sshkey
因为之前已经存在`~/.ssh/id_rsa`文件，所以这次生成的时候我们指定输出的文件名为`id_rsa2`
```shell
ssh-keygen -t rsa -C "example@example.com" -f ~/.ssh/id_rsa2
```

## 创建config配置文件

在`~/.ssh/`目录下创建config配置文件，内容如下，里面有详细的解释。

```
# 原有的配置
Host github.com
HostName github.com
PreferredAuthentications publickey
IdentityFile ~/.ssh/id_rsa

# 第二个配置
Host github_2.com
HostName github.com
PreferredAuthentications publickey
IdentityFile ~/.ssh/id_rsa2  # 这里指定下所使用的公钥文件名，就是我们上一步新生成的那个。
```

## 使用第二个sshkey配置

假如我们的仓库地址为：` git@github.com:name/project.git ` ，那么按照上面`config`文件中`Host`的配置，需要将仓库地址修改为：`git@github_2.com:name/project.git`，修改git沧湖远程url的命令如下：
```shell
git remote set-url origin git@github_2.com:name/project.git
```