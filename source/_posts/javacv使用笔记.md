---
title: javacv使用笔记
tags:
  - 程序员
  - Java
categories:
  - 程序员
toc: false
date: 2018-08-14 12:56:36
---

## 异常：Could not initialize class org.bytedeco.javacpp.avutil
```
Exception in thread "main" java.lang.NoClassDefFoundError: Could not initialize class org.bytedeco.javacpp.avutil
at java.lang.Class.forName0(Native Method)
at java.lang.Class.forName(Class.java:274)
at org.bytedeco.javacpp.Loader.load(Loader.java:385)
at org.bytedeco.javacpp.Loader.load(Loader.java:353)
at org.bytedeco.javacpp.avformat$AVFormatContext.<clinit>(avformat.java:2249)
at org.bytedeco.javacv.FFmpegFrameGrabber.startUnsafe(FFmpegFrameGrabber.java:346)
at org.bytedeco.javacv.FFmpegFrameGrabber.start(FFmpegFrameGrabber.java:340)
```
解决办法：
```shell
mvn package exec:java -Dplatform.dependencies -Dexec.mainClass=Demo
```