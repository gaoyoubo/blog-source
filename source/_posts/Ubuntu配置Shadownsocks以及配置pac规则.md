---
title: Ubuntu配置Shadownsocks以及配置pac规则
tags:
  - Linux
originContent: >+
  周末没事将自己闲置的Thinkpad安装了最新的Ubuntu18.10版本，安装成功之后就想着将之前在自己的vps上配置的shadowsock服务使用上。

  ### 第一步安装shadowsocks

  ```shell

  sudo apt-get install shadowsocks

  ```


  ### 第二步配置shadowsocks

  安装完成之后默认的配置文件在`/etc/shadowsocks/local.json`，去将里面的配置修改成自己的即可。

  ```json

  {
      "server":"xxx.xxx.xxx.xxx",
      "server_port":xxx,
      "local_address": "127.0.0.1",
      "local_port":1080,
      "password":"xxx",
      "timeout":300,
      "method":"aes-256-cfb",
      "fast_open": true,
      "workers": 1,
      "prefer_ipv6": false
  }

  ```


  ### 第三步启动shadowsocks

  ```shell

  sudo sslocal -c /etc/shadowsocks/local.json -d start

  ```


  ### 第四步配置pac规则

  #### 1. 安装GenPac

  ```shell

  sudo pip install genpac

  pip install --upgrade genpac

  ```

  #### 2.
  新建pac配置存放目录（用来存放用户自定义规则列表文件user-rules.txt和生成后的autoproxy.pac文件），例如我的放在home目录下

  ```

  mkdir ~/pac

  cd ~/pac

  touch user-rules.txt

  ```


categories:
  - 程序员
toc: true
date: 2018-11-17 13:41:11
---

周末没事将自己闲置的Thinkpad安装了最新的Ubuntu18.10版本，安装成功之后就想着将之前在自己的vps上配置的shadowsock服务使用上。
### 第一步安装shadowsocks
```shell
sudo apt-get install shadowsocks
```

### 第二步配置shadowsocks
安装完成之后默认的配置文件在`/etc/shadowsocks/local.json`，去将里面的配置修改成自己的即可。
```json
{
    "server":"xxx.xxx.xxx.xxx",
    "server_port":xxx,
    "local_address": "127.0.0.1",
    "local_port":1080,
    "password":"xxx",
    "timeout":300,
    "method":"aes-256-cfb",
    "fast_open": true,
    "workers": 1,
    "prefer_ipv6": false
}
```

### 第三步启动shadowsocks
```shell
sudo sslocal -c /etc/shadowsocks/local.json -d start
```

### 第四步配置pac规则
#### 1. 安装GenPac
```shell
sudo pip install genpac
pip install --upgrade genpac
```
#### 2. 新建pac配置存放目录
用来存放用户自定义规则列表文件user-rules.txt和生成后的autoproxy.pac文件，例如我的放在home目录下
```
mkdir ~/soft/pac
cd ~./soft/pac
touch user-rules.txt
```

#### 3. 生成autoproxy.pac文件
我使用的是github上托管的这份文件：https://raw.githubusercontent.com/gfwlist/gfwlist/master/gfwlist.txt
执行一下命令来创建autoprox.pac
```shell
genpac --pac-proxy "SOCKS5 127.0.0.1:1080" --output="autoproxy.pac" --gfwlist-url="https://raw.githubusercontent.com/gfwlist/gfwlist/master/gfwlist.txt" --user-rule-from="user-rules.txt"
```

#### 4. 配置系统代理

去Ubuntu`设置 -> 网络 -> 代理设置`设置代理，选择`自动`，配置url填写你本地的文件路径，例如：`file:///home/xxx/soft/pac/autoproxy.pac`



