---
title: FULL GC分析过程分享
tags:
  - 程序员
  - Java
categories:
  - 程序员
toc: false
date: 2015-03-02 11:49:20
---

转载-原文地址：http://www.taobaotest.com/blogs/2294

在性能测试过程中,FULL GC频繁是比较常见的问题，FULL GC 产生的原因有很多，这里主要针对meta压测过程中分析FULL GC问题的一些思路进行分享，供大家参考

1.如何发现是否发生FULL GC和FULL GC是否频繁

使用JDK自带的轻量级小工具jstat

     语法结构：

Usage: jstat -help|-options

             jstat -<option> \[-t\] \[-h<lines>\] <vmid> \[<interval> \[<count>\]\]

  


 参数解释：

Options — 选项，我们一般使用 -gcutil 查看gc情况

vmid    — VM的进程号，即当前运行的java进程号

interval– 间隔时间，单位为秒或者毫秒

count   — 打印次数，如果缺省则打印无数次

比如 /opt/taobao/java/bin/jstat –gcutil pid 5000

 

输出结果：

        S0        S1         E          O          P        YGC      YGCT        FGC     FGCT        GCT

           0.00  90.63 100.00  58.82   3.51    183    2.059     0    0.000    2.059

    0.00  15.48   7.80  60.99   3.51    185    2.092     1    0.305    2.397

    0.00  15.48  18.10  47.90   3.51    185    2.092     2    0.348    2.440

 S0  — Heap上的 Survivor space 0 区已使用空间的百分比  
 S1  — Heap上的 Survivor space 1 区已使用空间的百分比  
 E   — Heap上的 Eden space 区已使用空间的百分比  
 O   — Heap上的 Old space 区已使用空间的百分比  
 P   — Perm space 区已使用空间的百分比  
 YGC — 从应用程序启动到采样时发生 Young GC 的次数  
 YGCT– 从应用程序启动到采样时 Young GC 所用的时间(单位秒)  
 FGC — 从应用程序启动到采样时发生 Full GC 的次数  
 FGCT– 从应用程序启动到采样时 Full GC 所用的时间(单位秒)  
 GCT — 从应用程序启动到采样时用于垃圾回收的总时间(单位秒)

    通过FGC我们可以发现系统是否发生FULL GC和FULL GC的频率

  


2.  FULL GC分析和问题定位

    a.     GC log收集和分析

(1)在JVM启动参数增加："-verbose:gc -Xloggc:<file\_name>  -XX:+PrintGCDetails -XX:+PrintGCDateStamps"

    PrintGCTimeStamp只能获得相对时间，建议使用PrintGCDateStamps获得full gc 发生的绝对时间

      (2)如果采用CMS GC,仔细分析jstat FGC输出和GC 日志会发现， CMS的每个并发GC周期则有两个stop-the-world阶段——initial mark与final re-mark**，**使得CMS的每个并发GC周期总共会更新full GC计数器两次，initial mark与final re-mark各一次

    

    b.     Dump JVM 内存快照

/opt/taobao/java/bin/jmap -dump:format=b,file=dump.bin pid

这里有一个问题是什么时候进行dump?

一种方法是前面提到的用jstat工具观察，当OLD区到达比较高的比例如60%，一般会很快触发一次FULL GC,可以进行一次DUMP,在FULL GC发生以后再DUMP一次，这样比较就可以发现到底是哪些对象导致不停的FULL GC

另外一种方法是通过配置JVM参数

 -XX:+HeapDumpBeforeFullGC -XX:+HeapDumpAfterFullGC分别用于指定在full GC之前与之后生成heap dump 

  


    c.     利用MAT((Memory Analyzer Tool)工具分析dump文件

关于MAT具体使用方法网上有很多介绍，这里不做详细展开，这里需要注意的是：

(1)   MAT缺省只分析reachable的对象，unreachable的对象（将被收集掉的对象）被忽略，而分析FULL GC频繁原因时unreachable object也应该同时被重点关注。如果要显示unreachable的对象细节必须用mat 1.1以上版本并且打开选项“keep unreachable object”

(2)   通常dump文件会好几个G，无法在windows上直接进行分析，我们可以先把dump文件在linux上进行分析，再把分析好的文件拷贝到windows上，在windows上用MAT打开分析文件。

下面是Meta2.0压测曾遇到的FULL GC频繁问题的分析结果，比较明显，DispatchRequest对象有4千多万个，一共超过2G，并最终导致OOM

![83f48d2a9de38682ed93018f08211d9e_detail](http://file.mspring.org/images/blog/83f48d2a9de38682ed93018f08211d9e!detail)