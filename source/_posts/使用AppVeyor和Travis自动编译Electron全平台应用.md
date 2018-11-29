---
title: 使用AppVeyor和Travis自动编译Electron全平台应用
tags:
  - 程序员
  - Electron
originContent: >-
  ## package.json配置

  ```json

  {
    "name": "HexoClient",
    "version": "1.2.2",
    "author": "....",
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


  ### build配置

  electron-builder支持构建多个平台安装包，上面的配置中我配置了Windows、macos、linux，可以直接拷贝使用，如果想了解更多可以看这篇官方出品的文档：https://www.electron.build/configuration/configuration


  ### 构建命令配置

  ```shell

  node .electron-vue/build.js && electron-builder --publish onTagOrDraft

  ```

  可以看到后面的参数`--publish
  onTagOrDraft`他的意思是，当在标签中提交，或github中存在draft发布版本的时候触发publish操作，这个时候会自动将构建好的包上传到github
  releases中。publish配置的取值如下：

  |Value| Description |

  |-|-|

  | onTag |on tag push only|

  | onTagOrDraft |on tag push or if draft release exists|

  | always |always publish|

  | never |never publish|


  ## 参考：

  - [AppVeyor](https://www.appveyor.com/)

  - [Travis](https://travis-ci.org/)

  -
  [electron-builder官方文档](https://www.electron.build/configuration/configuration)

  - https://github.com/gaoyoubo/hexo-client/issues/15

  - https://juejin.im/entry/5995599a6fb9a0249f6a131b
categories:
  - 程序员
toc: true
date: 2018-11-26 17:53:48
---

## package.json配置
```json
{
  "name": "HexoClient",
  "version": "1.2.2",
  "author": "......",
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

### build配置
electron-builder支持构建多个平台安装包，上面的配置中我配置了Windows、macos、linux，可以直接拷贝使用，如果想了解更多可以看这篇官方出品的文档：https://www.electron.build/configuration/configuration

### 构建命令配置
```shell
node .electron-vue/build.js && electron-builder --publish onTagOrDraft
```
可以看到后面的参数`--publish onTagOrDraft`他的意思是，当在标签中提交，或github中存在draft发布版本的时候触发publish操作，这个时候会自动将构建好的包上传到github releases中。publish配置的取值如下：
|Value| Description |
|-|-|
| onTag |on tag push only|
| onTagOrDraft |on tag push or if draft release exists|
| always |always publish|
| never |never publish|

## 参考：
- [AppVeyor](https://www.appveyor.com/)
- [Travis](https://travis-ci.org/)
- [electron-builder官方文档](https://www.electron.build/configuration/configuration)
- https://github.com/gaoyoubo/hexo-client/issues/15
- https://juejin.im/entry/5995599a6fb9a0249f6a131b