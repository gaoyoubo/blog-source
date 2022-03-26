---
title: TOP 10开源的推荐系统简介
tags:
  - 程序员
  - 推荐系统
originContent: "> 转载自：http://ibillxia.github.io/blog/2014/03/10/top-10-open-source-recommendation-systems/\n\n最近这两年推荐系统特别火，本文搜集整理了一些比较好的开源推荐系统，即有轻量级的适用于做研究的SVDFeature、LibMF、LibFM等，也有重量级的适用于工业系统的 Mahout、Oryx、EasyRecd等\n\n# SVDFeature\n\n![](https://file.mspring.org/images/blog/b03f7c80c02987e7530f4d3b4e3aaa06)\n\n主页：[http://svdfeature.apexlab.org/wiki/Main_Page](http://svdfeature.apexlab.org/wiki/Main_Page)\_语言：C++  \n一个feature-based协同过滤和排序工具，由上海交大Apex实验室开发，代码质量较高。在KDD Cup 2012中获得第一名，KDD Cup 2011中获得第三名，相关论文 发表在2012的JMLR中，这足以说明它的高大上。  \nSVDFeature包含一个很灵活的Matrix Factorization推荐框架，能方便的实现SVD、SVD++等方法, 是单模型推荐算法中精度最高的一种。SVDFeature代码精炼，可以用 相对较少的内存实现较大规模的单机版矩阵分解运算。另外含有Logistic regression的model，可以很方便的用来进行ensemble。\n\n# LibMF\n\n![](https://file.mspring.org/images/blog/8fa6443aa809ba8fbc5e3c64915c521c)\n\n主页：[http://www.csie.ntu.edu.tw/~cjlin/libmf/](http://www.csie.ntu.edu.tw/~cjlin/libmf/)\_语言：C++  \n作者[Chih-Jen Lin](http://www.csie.ntu.edu.tw/~cjlin/)来自大名鼎鼎的台湾国立大学，他们在机器学习领域享有盛名，近年连续多届KDD Cup竞赛上均 获得优异成绩，并曾连续多年获得冠军。台湾大学的风格非常务实，业界常用的LibSVM， Liblinear等都是他们开发的，开源代码的效率和质量都非常高。  \nLibMF在矩阵分解的并行化方面作出了很好的贡献，针对SGD（随即梯度下降）优化方法在并行计算中存在的locking problem和memory discontinuity问题，提出了一种 矩阵分解的高效算法FPSGD（Fast Parallel SGD），根据计算节点的个数来划分评分矩阵block，并分配计算节点。系统介绍可以见这篇\_[论文](http://www.csie.ntu.edu.tw/~cjlin/papers/libmf.pdf)（ACM Recsys 2013的 Best paper Award）。\n\n# LibFM\n\n![](https://file.mspring.org/images/blog/ea0bacfb8f5cbb8582c6da0d46b982ad)\n\n主页：[http://www.libfm.org/](http://www.libfm.org/)\_语言：C++  \n作者是德国Konstanz大学的Steffen Rendle，他用LibFM同时玩转KDD Cup 2012 Track1和Track2两个子竞赛单元，都取得了很好的成绩，说明LibFM是非常管用的利器。  \nLibFM是专门用于矩阵分解的利器，尤其是其中实现了MCMC（Markov Chain Monte Carlo）优化算法，比常见的SGD优化方法精度要高，但运算速度要慢一些。当然LibFM中还 实现了SGD、SGDA（Adaptive SGD）、ALS（Alternating Least Squares）等算法。\n\n# Lenskit\n\n![](https://file.mspring.org/images/blog/0e22bf119d7f4c18f84186b45b5f349c)\n\n主页：[http://lenskit.grouplens.org/](http://lenskit.grouplens.org/)\_语言Java  \n\n这个Java开发的开源推荐系统，来自美国的明尼苏达大学的GroupLens团队，也是推荐领域知名的测试数据集Movielens的作者。  \n该源码托管在GitHub上，[https://github.com/grouplens/lenskit](https://github.com/grouplens/lenskit)。主要包含lenskit-api,lenskit-core, lenskit-knn,lenskit-svd,lenskit-slopone,lenskit-parent,lenskit-data-structures,lenskit-eval,lenskit-test等模块，主要实现了k-NN，SVD，Slope-One等 典型的推荐系统算法。\n\n# GraphLab\n==========\n![](https://file.mspring.org/images/blog/059a0e4f2135ef650c32dae1b2c0328e)\n\n主页：[GraphLab - Collaborative Filtering](http://docs.graphlab.org/collaborative_filtering.html)\_语言：C++  \nGraphlab是基于C++开发的一个高性能分布式graph处理挖掘系统，特点是对迭代的并行计算处理能力强（这方面是hadoop的弱项），由于功能独到，GraphLab在业界名声很响。 用GraphLab来进行大数据量的random walk或graph-based的推荐算法非常有效。Graphlab虽然名气比较响亮（CMU开发），但是对一般数据量的应用来说可能还用不上。  \nGraphLab主要实现了ALS，CCD++，SGD，Bias-SGD，SVD++，Weighted-ALS，Sparse-ALS，Non-negative Matrix Factorization，Restarted Lanczos Algorithm等算法。\n\n# Mahout\n\n![](https://file.mspring.org/images/blog/abc413f7e8465030364bf52af73e744c)\n\n主页：[http://mahout.apache.org/](http://mahout.apache.org/)\_语言：Java  \nMahout 是 Apache Software Foundation (ASF) 开发的一个全新的开源项目，其主要目标是创建一些可伸缩的机器学习算法，供开发人员在 Apache 在许可下免费 使用。Mahout项目是由 Apache Lucene社区中对机器学习感兴趣的一些成员发起的，他们希望建立一个可靠、文档翔实、可伸缩的项目，在其中实现一些常见的用于 聚类和分类的机器学习算法。该社区最初基于 Ngetal. 的文章 “Map-Reduce for Machine Learning on Multicore”，但此后在发展中又并入了更多广泛的机器学习 方法，包括Collaborative Filtering（CF），Dimensionality Reduction，Topic Models等。此外，通过使用 Apache Hadoop 库，Mahout 可以有效地扩展到云中。  \n在Mahout的Recommendation类算法中，主要有User-Based CF，Item-Based CF，ALS，ALS on Implicit Feedback，Weighted MF，SVD++，Parallel SGD等。\n\n# Myrrix\n\n![](https://file.mspring.org/images/blog/24015554dcd2411f4c2d9c2279e23c48)\n\n主页：[http://myrrix.com/](http://myrrix.com/)\_语言：Java  \nMyrrix最初是Mahout的作者之一Sean Owen基于Mahout开发的一个试验性质的推荐系统。目前Myrrix已经是一个完整的、实时的、可扩展的集群和推荐系统，主要 架构分为两部分：服务层：在线服务，响应请求、数据读入、提供实时推荐；计算层：用于分布式离线计算，在后台使用分布式机器学习算法为服务层更新机器学习 模型。Myrrix使用这两个层构建了一个完整的推荐系统，服务层是一个HTTP服务器，能够接收更新，并在毫秒级别内计算出更新结果。服务层可以单独使用，无需 计算层，它会在本地运行机器学习算法。计算层也可以单独使用，其本质是一系列的Hadoop jobs。目前Myrrix以被 Cloudera 并入Oryx项目。\n\n# EasyRec\n\n![](https://file.mspring.org/images/blog/b2a52612d4c6244354a50e02b975f08c)\n\n主页：[http://easyrec.org/](http://easyrec.org/)\_语言：Java  \nEasyRec是一个易集成、易扩展、功能强大且具有可视化管理的推荐系统，更像一个完整的推荐产品，包括了数据录入模块、管理模块、推荐挖掘、离线分析等。 EasyRec可以同时给多个不同的网站提供推荐服务，通过tenant来区分不同的网站。架设EasyRec服务器，为网站申请tenant，通过tenant就可以很方便的集成到 网站中。通过各种不同的数据收集（view,buy.rating）API收集到网站的用户行为，EasyRec通过离线分析，就可以产生推荐信息，您的网站就可以通过 Recommendations和Community Rankings来进行推荐业务的实现。\n\n# Waffles\n\n![](https://file.mspring.org/images/blog/a2db4b985be8ea4bea49e0f178134233)\n\n主页：[http://waffles.sourceforge.net/](http://waffles.sourceforge.net/)\_语言：C++  \nWaffles英文原意是蜂蜜甜饼，在这里却指代一个非常强大的机器学习的开源工具包。Waffles里包含的算法特别多，涉及机器学习的方方面面，推荐系统位于 其中的Waffles_recommend tool，大概只占整个Waffles的1/10的内容，其它还有分类、聚类、采样、降维、数据可视化、音频处理等许许多多工具包，估计 能与之媲美的也就数Weka了。\n\n# RapidMiner\n\n![](https://file.mspring.org/images/blog/833465ed8f573c31de771cd5b504cec4)\n\n主页：[http://rapidminer.com/](http://rapidminer.com/)\_语言：Java  \nRapidMiner（前身是Yale）是一个比较成熟的数据挖掘解决方案，包括常见的机器学习、NLP、推荐、预测等方法（推荐只占其中很小一部分），而且带有GUI的 数据分析环境，数据ETL、预处理、可视化、评估、部署等整套系统都有。另外RapidMiner提供commercial license，提供R语言接口，感觉在向着一个商用的 数据挖掘公司的方向在前进。  \n\n---\n\n开源的推荐系统大大小小的还有很多，以上只是介绍了一些在学术界和工业界比较流行的TOP 10，而且基本上都是用C++/Java实现的，在参考资料\\[1\\]、\\[2\\]中还提 到的有Crab（Python）、CofiRank（C++）、MyMediaLite（.NET/C#）、PREA（Java）、Python-recsys（Python）、Recommendable（Ruby）、Recommenderlab（R）、 Oryx（Java）、recommendify（Ruby）、RecDB（SQL）等等，当然GitHub上还有更多。。。即有适合单机运行的，也有适合集群的。虽然使用的编程语言不同，但实现 的算法都大同小异，主要是SVD、SGD、ALS、MF、CF及其改进算法等。\n\n参考资料\n----\n\n- [推荐系统开源软件列表汇总和点评](http://blog.csdn.net/cserchen/article/details/14231153)  \n- [开源中国社区-搜索：推荐系统](http://www.oschina.net/search?scope=project&tag1=0&tag2=0&lang=0&os=0&q=%E6%8E%A8%E8%8D%90%E7%B3%BB%E7%BB%9F)"
categories:
  - 程序员
toc: true
date: 2018-10-24 15:18:12
---

> 转载自：http://ibillxia.github.io/blog/2014/03/10/top-10-open-source-recommendation-systems/

最近这两年推荐系统特别火，本文搜集整理了一些比较好的开源推荐系统，即有轻量级的适用于做研究的SVDFeature、LibMF、LibFM等，也有重量级的适用于工业系统的 Mahout、Oryx、EasyRecd等

# SVDFeature

![](https://file.mspring.org/images/blog/b03f7c80c02987e7530f4d3b4e3aaa06)

主页：[http://svdfeature.apexlab.org/wiki/Main_Page](http://svdfeature.apexlab.org/wiki/Main_Page) 语言：C++  
一个feature-based协同过滤和排序工具，由上海交大Apex实验室开发，代码质量较高。在KDD Cup 2012中获得第一名，KDD Cup 2011中获得第三名，相关论文 发表在2012的JMLR中，这足以说明它的高大上。  
SVDFeature包含一个很灵活的Matrix Factorization推荐框架，能方便的实现SVD、SVD++等方法, 是单模型推荐算法中精度最高的一种。SVDFeature代码精炼，可以用 相对较少的内存实现较大规模的单机版矩阵分解运算。另外含有Logistic regression的model，可以很方便的用来进行ensemble。

# LibMF

![](https://file.mspring.org/images/blog/8fa6443aa809ba8fbc5e3c64915c521c)

主页：[http://www.csie.ntu.edu.tw/~cjlin/libmf/](http://www.csie.ntu.edu.tw/~cjlin/libmf/) 语言：C++  
作者[Chih-Jen Lin](http://www.csie.ntu.edu.tw/~cjlin/)来自大名鼎鼎的台湾国立大学，他们在机器学习领域享有盛名，近年连续多届KDD Cup竞赛上均 获得优异成绩，并曾连续多年获得冠军。台湾大学的风格非常务实，业界常用的LibSVM， Liblinear等都是他们开发的，开源代码的效率和质量都非常高。  
LibMF在矩阵分解的并行化方面作出了很好的贡献，针对SGD（随即梯度下降）优化方法在并行计算中存在的locking problem和memory discontinuity问题，提出了一种 矩阵分解的高效算法FPSGD（Fast Parallel SGD），根据计算节点的个数来划分评分矩阵block，并分配计算节点。系统介绍可以见这篇 [论文](http://www.csie.ntu.edu.tw/~cjlin/papers/libmf.pdf)（ACM Recsys 2013的 Best paper Award）。

# LibFM

![](https://file.mspring.org/images/blog/ea0bacfb8f5cbb8582c6da0d46b982ad)

主页：[http://www.libfm.org/](http://www.libfm.org/) 语言：C++  
作者是德国Konstanz大学的Steffen Rendle，他用LibFM同时玩转KDD Cup 2012 Track1和Track2两个子竞赛单元，都取得了很好的成绩，说明LibFM是非常管用的利器。  
LibFM是专门用于矩阵分解的利器，尤其是其中实现了MCMC（Markov Chain Monte Carlo）优化算法，比常见的SGD优化方法精度要高，但运算速度要慢一些。当然LibFM中还 实现了SGD、SGDA（Adaptive SGD）、ALS（Alternating Least Squares）等算法。

# Lenskit

![](https://file.mspring.org/images/blog/0e22bf119d7f4c18f84186b45b5f349c)

主页：[http://lenskit.grouplens.org/](http://lenskit.grouplens.org/) 语言Java  

这个Java开发的开源推荐系统，来自美国的明尼苏达大学的GroupLens团队，也是推荐领域知名的测试数据集Movielens的作者。  
该源码托管在GitHub上，[https://github.com/grouplens/lenskit](https://github.com/grouplens/lenskit)。主要包含lenskit-api,lenskit-core, lenskit-knn,lenskit-svd,lenskit-slopone,lenskit-parent,lenskit-data-structures,lenskit-eval,lenskit-test等模块，主要实现了k-NN，SVD，Slope-One等 典型的推荐系统算法。

# GraphLab
![](https://file.mspring.org/images/blog/059a0e4f2135ef650c32dae1b2c0328e)

主页：[GraphLab - Collaborative Filtering](http://docs.graphlab.org/collaborative_filtering.html) 语言：C++  
Graphlab是基于C++开发的一个高性能分布式graph处理挖掘系统，特点是对迭代的并行计算处理能力强（这方面是hadoop的弱项），由于功能独到，GraphLab在业界名声很响。 用GraphLab来进行大数据量的random walk或graph-based的推荐算法非常有效。Graphlab虽然名气比较响亮（CMU开发），但是对一般数据量的应用来说可能还用不上。  
GraphLab主要实现了ALS，CCD++，SGD，Bias-SGD，SVD++，Weighted-ALS，Sparse-ALS，Non-negative Matrix Factorization，Restarted Lanczos Algorithm等算法。

# Mahout

![](https://file.mspring.org/images/blog/abc413f7e8465030364bf52af73e744c)

主页：[http://mahout.apache.org/](http://mahout.apache.org/) 语言：Java  
Mahout 是 Apache Software Foundation (ASF) 开发的一个全新的开源项目，其主要目标是创建一些可伸缩的机器学习算法，供开发人员在 Apache 在许可下免费 使用。Mahout项目是由 Apache Lucene社区中对机器学习感兴趣的一些成员发起的，他们希望建立一个可靠、文档翔实、可伸缩的项目，在其中实现一些常见的用于 聚类和分类的机器学习算法。该社区最初基于 Ngetal. 的文章 “Map-Reduce for Machine Learning on Multicore”，但此后在发展中又并入了更多广泛的机器学习 方法，包括Collaborative Filtering（CF），Dimensionality Reduction，Topic Models等。此外，通过使用 Apache Hadoop 库，Mahout 可以有效地扩展到云中。  
在Mahout的Recommendation类算法中，主要有User-Based CF，Item-Based CF，ALS，ALS on Implicit Feedback，Weighted MF，SVD++，Parallel SGD等。

# Myrrix

![](https://file.mspring.org/images/blog/24015554dcd2411f4c2d9c2279e23c48)

主页：[http://myrrix.com/](http://myrrix.com/) 语言：Java  
Myrrix最初是Mahout的作者之一Sean Owen基于Mahout开发的一个试验性质的推荐系统。目前Myrrix已经是一个完整的、实时的、可扩展的集群和推荐系统，主要 架构分为两部分：服务层：在线服务，响应请求、数据读入、提供实时推荐；计算层：用于分布式离线计算，在后台使用分布式机器学习算法为服务层更新机器学习 模型。Myrrix使用这两个层构建了一个完整的推荐系统，服务层是一个HTTP服务器，能够接收更新，并在毫秒级别内计算出更新结果。服务层可以单独使用，无需 计算层，它会在本地运行机器学习算法。计算层也可以单独使用，其本质是一系列的Hadoop jobs。目前Myrrix以被 Cloudera 并入Oryx项目。

# EasyRec

![](https://file.mspring.org/images/blog/b2a52612d4c6244354a50e02b975f08c)

主页：[http://easyrec.org/](http://easyrec.org/) 语言：Java  
EasyRec是一个易集成、易扩展、功能强大且具有可视化管理的推荐系统，更像一个完整的推荐产品，包括了数据录入模块、管理模块、推荐挖掘、离线分析等。 EasyRec可以同时给多个不同的网站提供推荐服务，通过tenant来区分不同的网站。架设EasyRec服务器，为网站申请tenant，通过tenant就可以很方便的集成到 网站中。通过各种不同的数据收集（view,buy.rating）API收集到网站的用户行为，EasyRec通过离线分析，就可以产生推荐信息，您的网站就可以通过 Recommendations和Community Rankings来进行推荐业务的实现。

# Waffles

![](https://file.mspring.org/images/blog/a2db4b985be8ea4bea49e0f178134233)

主页：[http://waffles.sourceforge.net/](http://waffles.sourceforge.net/) 语言：C++  
Waffles英文原意是蜂蜜甜饼，在这里却指代一个非常强大的机器学习的开源工具包。Waffles里包含的算法特别多，涉及机器学习的方方面面，推荐系统位于 其中的Waffles_recommend tool，大概只占整个Waffles的1/10的内容，其它还有分类、聚类、采样、降维、数据可视化、音频处理等许许多多工具包，估计 能与之媲美的也就数Weka了。

# RapidMiner

![](https://file.mspring.org/images/blog/833465ed8f573c31de771cd5b504cec4)

主页：[http://rapidminer.com/](http://rapidminer.com/) 语言：Java  
RapidMiner（前身是Yale）是一个比较成熟的数据挖掘解决方案，包括常见的机器学习、NLP、推荐、预测等方法（推荐只占其中很小一部分），而且带有GUI的 数据分析环境，数据ETL、预处理、可视化、评估、部署等整套系统都有。另外RapidMiner提供commercial license，提供R语言接口，感觉在向着一个商用的 数据挖掘公司的方向在前进。  

---

开源的推荐系统大大小小的还有很多，以上只是介绍了一些在学术界和工业界比较流行的TOP 10，而且基本上都是用C++/Java实现的，在参考资料\[1\]、\[2\]中还提 到的有Crab（Python）、CofiRank（C++）、MyMediaLite（.NET/C#）、PREA（Java）、Python-recsys（Python）、Recommendable（Ruby）、Recommenderlab（R）、 Oryx（Java）、recommendify（Ruby）、RecDB（SQL）等等，当然GitHub上还有更多。。。即有适合单机运行的，也有适合集群的。虽然使用的编程语言不同，但实现 的算法都大同小异，主要是SVD、SGD、ALS、MF、CF及其改进算法等。

参考资料
----

- [推荐系统开源软件列表汇总和点评](http://blog.csdn.net/cserchen/article/details/14231153)  
- [开源中国社区-搜索：推荐系统](http://www.oschina.net/search?scope=project&tag1=0&tag2=0&lang=0&os=0&q=%E6%8E%A8%E8%8D%90%E7%B3%BB%E7%BB%9F)