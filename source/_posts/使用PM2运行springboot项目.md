---
title: 使用PM2运行springboot项目
tags:
  - 程序员
originContent: ''
categories:
  - 程序员
toc: false
date: 2021-12-02 12:01:10
---

新建文件：pm2.json

```json
{
    "name": "test",
    "script": "java",
    "args": [
        "-jar",
        "/home/test/test.jar",
        "--spring.profiles.active=prod"
    ],
    "exec_interpreter": "",
    "exec_mode": "fork",
    "error_file" : "/data/logs/error.log",
    "out_file"   : "/data/logs/out.log"
}
```

然后执行命令：`pm2 start pm2.json`启动服务。

