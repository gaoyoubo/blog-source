---
title: Git删除远程tag
tags:
  - git
originContent: ''
categories:
  - 程序员
toc: false
date: 2019-07-02 13:23:45
---

删除本地tag很简单，直接：`git tag -d tagname` 但是我们这样删除之后远程标签其实并未删除，通过以下方式可以删除远程标签。
```shell
# 假设标签名称为：v1.0.0

# 删除本地标签
git tag -d v1.0.0

# 删除远程标签
git push origin :refs/tags/v1.0.0

```