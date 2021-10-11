---
title: 解决nvm导致terminal打开慢的问题
tags:
  - node
originContent: ''
categories:
  - 程序员
toc: false
date: 2021-10-11 09:59:04
---

电脑上是使用nvm安装的node，安装之后每次打开一个新的terminal都比较慢，运营是因为termainl在打开的时候会加载nvm相关内容，如下：

```bash
# nvm
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
```

可以按照下面方式来修改，只有在需要用到nvm的时候才去加载：

```bash
# nvm
export NVM_DIR="$HOME/.nvm"
#[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
#[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
function _install_nvm() {
  unset -f nvm
  [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This sets up nvm
  [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # load nvm bash_completion
  nvm "$@"
}

function nvm() {
    _install_nvm "$@"
}
```

