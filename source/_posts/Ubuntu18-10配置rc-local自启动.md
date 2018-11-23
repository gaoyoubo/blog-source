---
title: Ubuntu18.10配置rc.local自启动
tags:
  - Linux
originContent: ''
categories:
  - 程序员
toc: false
date: 2018-11-17 13:35:03
---

Ubuntu新版本中已经不使用rc.local这种自启动方式了，熟悉旧版本的同学肯定是很不习惯的。那么新版本中如何配置rc.local呢。
1. 自行创建 /etc/rc.local 添加以下默认内容
```shell
#!/bin/sh -e
#
# rc.local
#
# This script is executed at the end of each multiuser runlevel.
# Make sure that the script will "exit 0" on success or any other
# value on error.
#
# In order to enable or disable this script just change the execution
# bits.
#
# By default this script does nothing.

exit 0
```

2. 在 exit 0 之前加入自定义内容
3. 执行以下命令确保 rc.local 开机自启
```shell
sudo chown root:root /etc/rc.local
sudo chmod 755 /etc/rc.local
sudo systemctl enable rc-local.service
```

