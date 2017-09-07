title: Ubuntu安装NodeJs
author: 雾非雾的情思
abbrlink: 4020314601
tags:
  - Linux
categories: []
date: 2017-09-07 09:17:00
---
之前使用apt命令安装node，但是安装之后每次执行都要sudo，比较麻烦。通过一下脚本可以将node安装到个人home下，以后执行就不用sudo了。
```
echo 'export PATH=$HOME/local/bin:$PATH' >> ~/.bashrc
. ~/.bashrc
mkdir ~/local
mkdir ~/node-latest-install
cd ~/node-latest-install
curl http://nodejs.org/dist/node-latest.tar.gz | tar xz --strip-components=1
./configure --prefix=$HOME/local
make install
curl -L https://www.npmjs.com/install.sh | sh
```