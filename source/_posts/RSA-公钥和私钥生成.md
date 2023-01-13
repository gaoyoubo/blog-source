---
title: RSA 公钥和私钥生成
tags: []
originContent: ''
categories: []
toc: false
date: 2023-01-13 16:45:26
---

## 私钥生成

```shell
openssl genrsa -out rsa_private.pem 1024
```

**注意：这里生成的是 `PKCS1` 格式的文件，也称之为传统的私钥格式。**

## 生成公钥

```
openssl rsa -in rsa_private.pem -out rsa_public.pem -pubout
```
## 格式转换

把 RSA 私钥转 `PKCS1` 转换为 `PKCS8` 格式，执行如下：


```
openssl pkcs8 -topk8 -inform PEM -in rsa_private.pem -outform PEM -nocrypt -out rsa_private_pkcs8.pem
```

把 RSA 私钥 `PKCS8` 格式转换为 `PKCS1` 格式，执行如下：


```
openssl rsa -in rsa_private_pkcs8.pem -out pkcs1.pem
```



参考：https://veryitman.com/2019/05/11/macOS-%E7%94%9F%E6%88%90-RSA-%E5%85%AC%E9%92%A5%E5%92%8C%E7%A7%81%E9%92%A5/

