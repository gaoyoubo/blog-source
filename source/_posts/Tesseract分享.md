---
title: Tesseract分享
tags:
  - tesseract
  - ocr
originContent: >-
  > 本分享基于tesseract4.x


  # 认识Tesseract


  项目主页：https://github.com/tesseract-ocr/tesseract


  Tesseract的OCR引擎最先由HP实验室于1985年开始研发，至1995年时已经成为OCR业内最准确的三款识别引擎之一。然而，HP不久便决定放弃OCR业务，Tesseract也从此尘封。


  数年以后，HP意识到，与其将Tesseract束之高阁，不如贡献给开源软件业，让其重焕新生－－2005年，Tesseract由美国内华达州信息技术研究所获得，并求诸于Google对Tesseract进行改进、消除Bug、优化工作。


  # 识别


  ## 识别前处理


  ### 调整尺寸

  Tesseract对于`dpi >=
  300`的图片有更好的识别效果。所以在识别之前将图片调整到合适的尺寸有助于提高识别效果。下图为识别图片调整尺寸前后的识别效果对比，可以看出图片放大之后，识别效果有明显的提升。


  ![](http://file.mspring.org/5da3bccecd4a368617b723af2d6a4d66)


  ### 二值化

  二值化就是将图像中灰度值大于某个`临界灰度值`的像素点设置为灰度最大值，灰度值小于某个`临界灰度值`的像素点设置为灰度最小值。这样`图像中就只会出现黑和白两种颜色`。合理的二值化能够减少被识别图像中的干扰因素，对于提升识别效果也是有很大的帮助的。例如下图，在二值化之前图片是有水印的，二值化之后能将水印直接去掉。


  ![](http://file.mspring.org/14c5b97ff15828102a7f4f382fceafe6)


  ### 图片切割

  很多情况下我们要识别的图片中文字的排版并不是我们想要的样子，有很多无用的信息，并且排版也不利于tesseract去识别。


  #### 简单切割

  例如下图，我们要从图片中识别出违章信息，包括违章的时间、地点、原因、罚了多少钱、扣了多少分。如果直接拿原图去进行识别，假设所有的字都是别正确，那么这些字的排版也是不是我们最终想要的样子，并且图片中有很多的信息是我们不需要的。所以，可以在识别前分别将图片中时间、地点、原因、金额、分数分别切出多张图，将其他无用的信息都剔除掉。这样做的好处一是单行文字识别对tesseract很友好，二是针对时间、金额、分数这些数字内容可以针对性的使用数字语言库进行识别来提高识别率。


  ![](http://file.mspring.org/b226ac77f29b72e16281c0005f346369)


  #### 多行、多列切割


  ![](http://file.mspring.org/83045a1b6f5ee169e6a6502800f71fcd)


  #### 图片旋转

  如果图片中的文字是倾斜的，会导致Tesseract的行数据分割不准确，严重影响ocr的效果，所以在识别之前可以先旋转图片，使文字保持水平。


  ![](http://file.mspring.org/6ea6ef1ab86e35988b33c054f0c31df1)


  ## 命令号调用识别


  ### 命令行使用手册


  ```shell

  ➜  bin ./tesseract --help-extra

  Usage:
    ./tesseract --help | --help-extra | --help-psm | --help-oem | --version
    ./tesseract --list-langs [--tessdata-dir PATH]
    ./tesseract --print-parameters [options...] [configfile...]
    ./tesseract imagename|imagelist|stdin outputbase|stdout [options...] [configfile...]

  OCR options:
    --tessdata-dir PATH   Specify the location of tessdata path.
    --user-words PATH     Specify the location of user words file.
    --user-patterns PATH  Specify the location of user patterns file.
    -l LANG[+LANG]        Specify language(s) used for OCR.
    -c VAR=VALUE          Set value for config variables.
                          Multiple -c arguments are allowed.
    --psm NUM             Specify page segmentation mode.
    --oem NUM             Specify OCR Engine mode.
  NOTE: These options must occur before any configfile.


  Page segmentation modes:
    0    Orientation and script detection (OSD) only.
    1    Automatic page segmentation with OSD.
    2    Automatic page segmentation, but no OSD, or OCR.
    3    Fully automatic page segmentation, but no OSD. (Default)
    4    Assume a single column of text of variable sizes.
    5    Assume a single uniform block of vertically aligned text.
    6    Assume a single uniform block of text.
    7    Treat the image as a single text line.
    8    Treat the image as a single word.
    9    Treat the image as a single word in a circle.
   10    Treat the image as a single character.
   11    Sparse text. Find as much text as possible in no particular order.
   12    Sparse text with OSD.
   13    Raw line. Treat the image as a single text line,
         bypassing hacks that are Tesseract-specific.

  OCR Engine modes:
    0    Legacy engine only.
    1    Neural nets LSTM engine only.
    2    Legacy + LSTM engines.
    3    Default, based on what is available.
  ```


  ### 识别效果展示

  效果如下图所示，对于这种排版整齐、文字清晰、大小合适的图片，直接使用官方提供的中文语言库，识别效果是很好的，下图就做到了100%正确识别。所以一个合适的输入图片，对于提高识别的正确率是有很大的帮助的，识别前图片的预处理就显得尤为重要。

  ![](http://file.mspring.org/622b6c570f6862e90a1d483e99807375)


  ## 识别后处理


  > 识别之后有些词能看出明显无语义的错误，可以再做一下替换，例如下面的词。 


  ```

  匕京=北京

  交又=交叉

  东潮=东湖

  ...

  ```


  # 训练


  对于一些特殊的字体，使用Tesseract自带的识别库，识别效果并不是那么理想。所以我们可以训练自己的识别库。例如下图的手写字体，我们对比下使用官方提供的`chi_sim`库和我训练的`chi_my`库的识别效果。


  ![](http://file.mspring.org/c448cb53f68834cc2aaf0ee49c822973)


  很明显，我自己训练的识别库能够100%准确的识别出图片中的文字，那么我们接下来看下如何去训练自己的识别库。



  # 参考文档

  -
  编译安装文档：[https://github.com/tesseract-ocr/tesseract/wiki/Compiling](https://github.com/tesseract-ocr/tesseract/wiki/Compiling)

  -
  训练文档：[https://github.com/tesseract-ocr/tesseract/wiki/TrainingTesseract-4.00](https://github.com/tesseract-ocr/tesseract/wiki/TrainingTesseract-4.00)

  -
  如何提高识别质量：[https://github.com/tesseract-ocr/tesseract/wiki/ImproveQuality](https://github.com/tesseract-ocr/tesseract/wiki/ImproveQuality)

  -
  什么是二值化：[https://baike.baidu.com/item/%E4%BA%8C%E5%80%BC%E5%8C%96](https://baike.baidu.com/item/%E4%BA%8C%E5%80%BC%E5%8C%96)

  -
  图片降噪：[https://blog.csdn.net/weixin_42225141/article/details/80714518](https://blog.csdn.net/weixin_42225141/article/details/80714518)

  -
  LSTM原理及实现：[https://blog.csdn.net/gzj_1101/article/details/79376798](https://blog.csdn.net/gzj_1101/article/details/79376798)
categories:
  - 碎碎念
toc: true
date: 2018-09-28 16:04:56
---

> 本分享基于tesseract4.x

# 认识Tesseract

项目主页：https://github.com/tesseract-ocr/tesseract

Tesseract的OCR引擎最先由HP实验室于1985年开始研发，至1995年时已经成为OCR业内最准确的三款识别引擎之一。然而，HP不久便决定放弃OCR业务，Tesseract也从此尘封。

数年以后，HP意识到，与其将Tesseract束之高阁，不如贡献给开源软件业，让其重焕新生－－2005年，Tesseract由美国内华达州信息技术研究所获得，并求诸于Google对Tesseract进行改进、消除Bug、优化工作。

# 识别

## 识别前处理

### 调整尺寸
Tesseract对于`dpi >= 300`的图片有更好的识别效果。所以在识别之前将图片调整到合适的尺寸有助于提高识别效果。下图为识别图片调整尺寸前后的识别效果对比，可以看出图片放大之后，识别效果有明显的提升。

![](http://file.mspring.org/5da3bccecd4a368617b723af2d6a4d66)

### 二值化
二值化就是将图像中灰度值大于某个`临界灰度值`的像素点设置为灰度最大值，灰度值小于某个`临界灰度值`的像素点设置为灰度最小值。这样`图像中就只会出现黑和白两种颜色`。合理的二值化能够减少被识别图像中的干扰因素，对于提升识别效果也是有很大的帮助的。例如下图，在二值化之前图片是有水印的，二值化之后能将水印直接去掉。

![](http://file.mspring.org/14c5b97ff15828102a7f4f382fceafe6)

### 图片切割
很多情况下我们要识别的图片中文字的排版并不是我们想要的样子，有很多无用的信息，并且排版也不利于tesseract去识别。

#### 简单切割
例如下图，我们要从图片中识别出违章信息，包括违章的时间、地点、原因、罚了多少钱、扣了多少分。如果直接拿原图去进行识别，假设所有的字都是别正确，那么这些字的排版也是不是我们最终想要的样子，并且图片中有很多的信息是我们不需要的。所以，可以在识别前分别将图片中时间、地点、原因、金额、分数分别切出多张图，将其他无用的信息都剔除掉。这样做的好处一是单行文字识别对tesseract很友好，二是针对时间、金额、分数这些数字内容可以针对性的使用数字语言库进行识别来提高识别率。

![](http://file.mspring.org/b226ac77f29b72e16281c0005f346369)

#### 多行、多列切割

![](http://file.mspring.org/83045a1b6f5ee169e6a6502800f71fcd)

#### 图片旋转
如果图片中的文字是倾斜的，会导致Tesseract的行数据分割不准确，严重影响ocr的效果，所以在识别之前可以先旋转图片，使文字保持水平。

![](http://file.mspring.org/6ea6ef1ab86e35988b33c054f0c31df1)

## 命令号调用识别

### 命令行使用手册

```shell
➜  bin ./tesseract --help-extra
Usage:
  ./tesseract --help | --help-extra | --help-psm | --help-oem | --version
  ./tesseract --list-langs [--tessdata-dir PATH]
  ./tesseract --print-parameters [options...] [configfile...]
  ./tesseract imagename|imagelist|stdin outputbase|stdout [options...] [configfile...]

OCR options:
  --tessdata-dir PATH   Specify the location of tessdata path.
  --user-words PATH     Specify the location of user words file.
  --user-patterns PATH  Specify the location of user patterns file.
  -l LANG[+LANG]        Specify language(s) used for OCR.
  -c VAR=VALUE          Set value for config variables.
                        Multiple -c arguments are allowed.
  --psm NUM             Specify page segmentation mode.
  --oem NUM             Specify OCR Engine mode.
NOTE: These options must occur before any configfile.

Page segmentation modes:
  0    Orientation and script detection (OSD) only.
  1    Automatic page segmentation with OSD.
  2    Automatic page segmentation, but no OSD, or OCR.
  3    Fully automatic page segmentation, but no OSD. (Default)
  4    Assume a single column of text of variable sizes.
  5    Assume a single uniform block of vertically aligned text.
  6    Assume a single uniform block of text.
  7    Treat the image as a single text line.
  8    Treat the image as a single word.
  9    Treat the image as a single word in a circle.
 10    Treat the image as a single character.
 11    Sparse text. Find as much text as possible in no particular order.
 12    Sparse text with OSD.
 13    Raw line. Treat the image as a single text line,
       bypassing hacks that are Tesseract-specific.

OCR Engine modes:
  0    Legacy engine only.
  1    Neural nets LSTM engine only.
  2    Legacy + LSTM engines.
  3    Default, based on what is available.
```

### 识别效果展示
效果如下图所示，对于这种排版整齐、文字清晰、大小合适的图片，直接使用官方提供的中文语言库，识别效果是很好的，下图就做到了100%正确识别。所以一个合适的输入图片，对于提高识别的正确率是有很大的帮助的，识别前图片的预处理就显得尤为重要。
![](http://file.mspring.org/622b6c570f6862e90a1d483e99807375)

## 识别后处理

> 识别之后有些词能看出明显无语义的错误，可以再做一下替换，例如下面的词。 

```
匕京=北京
交又=交叉
东潮=东湖
...
```

# 训练

对于一些特殊的字体，使用Tesseract自带的识别库，识别效果并不是那么理想。所以我们可以训练自己的识别库。例如下图的手写字体，我们对比下使用官方提供的`chi_sim`库和我训练的`chi_my`库的识别效果。

![](http://file.mspring.org/c448cb53f68834cc2aaf0ee49c822973)

很明显，我自己训练的识别库能够100%准确的识别出图片中的文字，那么我们接下来看下如何去训练自己的识别库。


# 参考文档
- 编译安装文档：[https://github.com/tesseract-ocr/tesseract/wiki/Compiling](https://github.com/tesseract-ocr/tesseract/wiki/Compiling)
- 训练文档：[https://github.com/tesseract-ocr/tesseract/wiki/TrainingTesseract-4.00](https://github.com/tesseract-ocr/tesseract/wiki/TrainingTesseract-4.00)
- 如何提高识别质量：[https://github.com/tesseract-ocr/tesseract/wiki/ImproveQuality](https://github.com/tesseract-ocr/tesseract/wiki/ImproveQuality)
- 什么是二值化：[https://baike.baidu.com/item/%E4%BA%8C%E5%80%BC%E5%8C%96](https://baike.baidu.com/item/%E4%BA%8C%E5%80%BC%E5%8C%96)
- 图片降噪：[https://blog.csdn.net/weixin_42225141/article/details/80714518](https://blog.csdn.net/weixin_42225141/article/details/80714518)
- LSTM原理及实现：[https://blog.csdn.net/gzj_1101/article/details/79376798](https://blog.csdn.net/gzj_1101/article/details/79376798)