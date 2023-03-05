---
title: Js 计算文件MD5的两种方式
tags:
  - js
originContent: ''
categories:
  - 程序员
toc: false
date: 2023-03-05 14:48:12
---

```
// 方式1：使用crypto-js
  import CryptoJSMD5 from 'crypto-js/md5'
  import CryptoJSEncLatin1 from 'crypto-js/enc-latin1'
  import CryptoJSEncHex from 'crypto-js/enc-hex'
  getFileMD5(file) {
    const start = new Date().getTime()
    return new Promise((resolve) => {
      const fileReader = new FileReader()
      fileReader.onloadend = (ev) => {
        const md5 = CryptoJSMD5(
          CryptoJSEncLatin1.parse(ev.target.result)
        ).toString(CryptoJSEncHex)
        console.log(
          `计算MD5, file=${file.name}, size=${file.size}, md5=${md5}, elapsed=${
            new Date().getTime() - start
          }ms`
        )
        resolve(md5)
      }
      fileReader.readAsBinaryString(file)
    })
  },

  // 方式2：使用spark-md5
  import SparkMD5 from 'spark-md5'
  getFileMD5(file) {
    const start = new Date().getTime()
    return new Promise((resolve) => {
      const fileReader = new FileReader()
      fileReader.onloadend = (ev) => {
        const md5 = SparkMD5.hashBinary(ev.target.result)
        console.log(
          `计算MD5, file=${file.name}, size=${file.size}, md5=${md5}, elapsed=${
            new Date().getTime() - start
          }ms`
        )
        resolve(md5)
      }
      fileReader.readAsBinaryString(file)
    })
  },
```

实测使用spark-md5计算要快一些

