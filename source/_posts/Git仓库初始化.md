---
title: Git仓库初始化
tags:
  - 程序员
originContent: >-
  ### Create a new repository

  ```shell

  git clone git@git.zuimeiqidai.com:lurenjia/user-center-transfer.git

  cd user-center-transfer

  touch README.md

  git add README.md

  git commit -m "add README"

  git push -u origin master

  ```


  ### Existing folder

  ```shell

  cd existing_folder

  git init

  git remote add origin
  git@git.zuimeiqidai.com:lurenjia/user-center-transfer.git

  git add .

  git commit -m "Initial commit"

  git push -u origin master

  ```


  ### Existing Git repository

  ```shell

  cd existing_repo

  git remote rename origin old-origin

  git remote add origin
  git@git.zuimeiqidai.com:lurenjia/user-center-transfer.git

  git push -u origin --all

  git push -u origin --tags

  ```
categories:
  - 程序员
toc: false
date: 2019-01-15 18:09:01
---

### Create a new repository
```shell
git clone git@github.com:gaoyoubo/hexo-client.git
cd user-center-transfer
touch README.md
git add README.md
git commit -m "add README"
git push -u origin master
```

### Existing folder
```shell
cd existing_folder
git init
git remote add origin git@github.com:gaoyoubo/hexo-client.git
git add .
git commit -m "Initial commit"
git push -u origin master
```

### Existing Git repository
```shell
cd existing_repo
git remote rename origin old-origin
git remote add origin git@github.com:gaoyoubo/hexo-client.git
git push -u origin --all
git push -u origin --tags
```