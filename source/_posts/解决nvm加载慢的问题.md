---
title: 解决nvm加载慢的问题
tags: []
originContent: ''
categories: []
toc: false
date: 2020-11-02 16:17:29
---

为了图方便，我使用`nvm`安装的nodejs。后来发现每当打开terminal的时候都会很慢，开始不知道什么原因，后来分析了下才知道是`nvm`的锅。

其实我不是每次打开terminal都需要用到nvm，所以我将nvm修改为按需加载，需要的时候手动执行命令去加载，
我使用的是zsh，于是我修改了一下`~/.zshrc`文件：

修改前：
```shell
# nvm
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
```

修改后：
```shell
# nvm
export NVM_DIR="$HOME/.nvm"
# 本来每次启动terminal的时候都需要执行下面两行代码的
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

修改之后，不是每次启动都会去加载`nvm.sh`仅当需要的时候在terminal中执行一下`nvm`命令即可，修改之后terminal启动速度明显快了。

参看资料：https://github.com/nvm-sh/nvm/issues/539