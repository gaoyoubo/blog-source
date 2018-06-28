---
title: 使用ffmpeg将mp3转为m4a
tags:
  - 碎碎念
categories:
  - 碎碎念
toc: false
date: 2018-05-11 18:20:37
---

```shell
ffmpeg -i input.mp3 -acodec alac -ab 128k -ar 48000 -ac 2 -y output.m4a 
```

参考地址：https://superuser.com/questions/370625/ffmpeg-command-to-convert-mp3-to-aac?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa