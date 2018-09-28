---
title: How to build tesseract 4 beta on macOS
tags:
  - tesseract
  - ocr
originContent: ''
categories:
  - 程序员
toc: true
date: 2018-09-28 15:23:38
---

```shell
brew info tesseract

tesseract: stable 3.05.01 (bottled), HEAD
OCR (Optical Character Recognition) engine
```
The result of recognition on `Chinese - Simplified` is a little bit terrifying.

I noticed that it added a new neural network system based on LSTMs after 4.0.0+

But it need to be build from source code on macOS.

Thankfully, the manul is quit specify on their README.md

## Install dependencies
```shell
brew install automake autoconf autoconf-archive libtool
brew install pkgconfig
brew install icu4c
brew install leptonica
brew install gcc
```

## Compile
```shell
git clone https://github.com/tesseract-ocr/tesseract/
cd tesseract
./autogen.sh
./configure CC=gcc CXX=g++ CPPFLAGS=-I/usr/local/opt/icu4c/include LDFLAGS=-L/usr/local/opt/icu4c/lib
make -j
make install
```
Their best trained [modes](https://github.com/tesseract-ocr/tessdata_best), download the language chi_sim.traineddata and put it under tesseract/4.0.0.1/tessdata/

## Usage
```shell
tesseract image.png image -l chi_sim
cat image.txt
```
OK, it is still terrible under the `Song typeface` font. It need to be trained a new model by myself.

