---
title: 命令行推送Jar包到nexus
tags:
  - 程序员
  - Java
categories:
  - 程序员
toc: false
date: 2018-04-10 20:23:49
---

```
mvn deploy:deploy-file -DgroupId=com.tencent -DartifactId=xinge -Dversion=1.1.8 -Dpackaging=jar -DrepositoryId=nexus -Dfile=/Users/gaoyoubo/xinge-push.jar -Durl=http://xxx.xxx.com:8081/nexus/content/repositories/thirdparty/ -DgeneratePom=false
```