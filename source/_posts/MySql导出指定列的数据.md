---
title: MySql导出指定列的数据
tags:
  - mysql
categories:
  - 程序员
toc: false
date: 2019-12-16 15:20:57
---

MySql导出整库或者指定表的数据使用`mysqldump`命令即可，但是导出表中指定列的数据就需要用到下面命令了，如下：

```shell
mysql -uroot -p123456 database_name -e "SELECT name from t_xxx where type = 3 INTO OUTFILE'/data/xxx.sql'"
```