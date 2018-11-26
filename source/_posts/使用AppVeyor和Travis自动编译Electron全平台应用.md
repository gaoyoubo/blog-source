---
title: 使用AppVeyor和Travis自动编译Electron全平台应用
tags:
  - Electron
  - 程序员
originContent: |
  参考：
  - https://github.com/gaoyoubo/hexo-client/issues/15
  - https://juejin.im/entry/5995599a6fb9a0249f6a131b
categories:
  - 程序员
toc: false
date: 2018-11-26 17:53:48
---

参考：
- https://github.com/gaoyoubo/hexo-client/issues/15
- https://juejin.im/entry/5995599a6fb9a0249f6a131b

先将我的主要配置贴出来。
```json
{
  "name": "HexoClient",
  "version": "1.2.2",
  "author": "...",
  "description": "Hexo 桌面客户端",
  "license": "Apache License, Version 2.0",
  "homepage": "https://github.com/gaoyoubo/hexo-client",
  "repository": {
    "type": "git",
    "url": "https://github.com/gaoyoubo/hexo-client.git"
  },
  "main": "./dist/electron/main.js",
  "scripts": {
    "build": "node .electron-vue/build.js && electron-builder --publish onTagOrDraft"
    ......
  },
  "build": {
    "appId": "org.mspring.hexo.client",
    "productName": "HexoClient",
    "directories": {
      "output": "build"
    },
    "files": [
      "dist/electron/**/*",
      "build/icons/*"
    ],
    "publish": {
      "provider": "github",
      "owner": "gaoyoubo",
      "repo": "hexo-client"
    },
    "dmg": {
      "contents": [
        {
          "x": 410,
          "y": 150,
          "type": "link",
          "path": "/Applications"
        },
        {
          "x": 130,
          "y": 150,
          "type": "file"
        }
      ]
    },
    "mac": {
      "icon": "build/icons/icon.icns"
    },
    "win": {
      "target": "nsis",
      "icon": "build/icons/icon.ico"
    },
    "linux": {
      "category": "Utility",
      "target": [
        {
          "target": "AppImage",
          "arch": [
            "x64",
            "ia32"
          ]
        },
        {
          "target": "deb",
          "arch": [
            "x64",
            "ia32"
          ]
        },
        {
          "target": "rpm",
          "arch": [
            "x64",
            "ia32"
          ]
        }
      ],
      "icon": "build/icons"
    }
  },
  ......
}
```