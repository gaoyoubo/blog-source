---
title: Guava Range使用方法
tags:
  - 程序员
  - Java
categories:
  - 程序员
toc: false
date: 2018-05-09 09:49:37
---

| **概念** | **表示范围**       | **guava对应功能方法** |
| -------- | ------------------ | --------------------- |
| (a..b)   | {x &#124; a < x < b}   | open(C, C)            |
| [a..b]   | {x &#124; a <= x <= b} | closed(C, C)          |
| [a..b)   | {x &#124; a <= x < b}  | closedOpen(C, C)      |
| (a..b]   | {x &#124; a < x <= b}  | openClosed(C, C)      |
| (a..+∞)  | {x &#124; x > a}       | greaterThan(C)        |
| [a..+∞)  | {x &#124; x >= a}      | atLeast(C)            |
| (-∞..b)  | {x &#124; x < b}       | lessThan(C)           |
| (-∞..b]  | {x &#124; x <= b}      | atMost(C)             |
| (-∞..+∞) | all values         | all()                 |