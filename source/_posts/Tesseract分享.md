---
title: Tesseract分享
tags:
  - tesseract
  - ocr
originContent: >-
  > 本分享基于tesseract4.x


  # 识别

  ## 识别前处理


  ### 调整尺寸

  Tesseract对于`dpi >= 300`的图片有更好的识别效果。所以在识别之前将图片调整到合适的尺寸有助于提高识别效果。


  ### 二值化

  >
  二值化就是将图像中灰度值大于某个`临界灰度值`的像素点设置为灰度最大值，灰度值小于某个`临界灰度值`的像素点设置为灰度最小值。这样`图像中就只会出现黑和白两种颜色`。


  ![](http://file.mspring.org/14c5b97ff15828102a7f4f382fceafe6)



  ### 图片降噪

  TODO


  ### 图片切割


  #### 简单切割

  ![](http://file.mspring.org/b226ac77f29b72e16281c0005f346369)


  #### 多行、多列切割

  ![](http://file.mspring.org/ff2f73c27e91188e8c3c3f0596530a6c)


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


  ### 识别展示

  ![](http://file.mspring.org/845aed98f69955ad7fa14881c6e82f9a)


  ## 识别后处理


  > 识别之后有些词能看出明显无语义的错误，可以再做一下替换，例如下面的词。 


  ```

  匕京=北京

  交又=交叉

  东潮=东湖

  ...

  ```


  # 训练

  TODO


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

# 识别
## 识别前处理

### 调整尺寸
Tesseract对于`dpi >= 300`的图片有更好的识别效果。所以在识别之前将图片调整到合适的尺寸有助于提高识别效果。

### 二值化
> 二值化就是将图像中灰度值大于某个`临界灰度值`的像素点设置为灰度最大值，灰度值小于某个`临界灰度值`的像素点设置为灰度最小值。这样`图像中就只会出现黑和白两种颜色`。

![](http://file.mspring.org/14c5b97ff15828102a7f4f382fceafe6)


### 图片降噪
TODO

### 图片切割

#### 简单切割
![](http://file.mspring.org/b226ac77f29b72e16281c0005f346369)

#### 多行、多列切割
![](http://file.mspring.org/ff2f73c27e91188e8c3c3f0596530a6c)

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

### 识别展示
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
TODO

# 参考文档
- 编译安装文档：[https://github.com/tesseract-ocr/tesseract/wiki/Compiling](https://github.com/tesseract-ocr/tesseract/wiki/Compiling)
- 训练文档：[https://github.com/tesseract-ocr/tesseract/wiki/TrainingTesseract-4.00](https://github.com/tesseract-ocr/tesseract/wiki/TrainingTesseract-4.00)
- 如何提高识别质量：[https://github.com/tesseract-ocr/tesseract/wiki/ImproveQuality](https://github.com/tesseract-ocr/tesseract/wiki/ImproveQuality)
- 什么是二值化：[https://baike.baidu.com/item/%E4%BA%8C%E5%80%BC%E5%8C%96](https://baike.baidu.com/item/%E4%BA%8C%E5%80%BC%E5%8C%96)
- 图片降噪：[https://blog.csdn.net/weixin_42225141/article/details/80714518](https://blog.csdn.net/weixin_42225141/article/details/80714518)
- LSTM原理及实现：[https://blog.csdn.net/gzj_1101/article/details/79376798](https://blog.csdn.net/gzj_1101/article/details/79376798)