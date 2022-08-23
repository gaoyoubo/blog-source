---
title: Alfred 使用iTerm
tags:
  - 程序员
categories:
  - 程序员
toc: false
date: 2022-08-11 12:00:51
---

> ADD：我在网上找到了一篇更完整的文章，文章中详细介绍了，这么配合使用alfred + iTerm2 + ssh config快速连接远程服务器：https://juejin.cn/post/6844903909916426248

Alfred执行命令时默认使用的是MaxOS系统自带的Terminal，而我平时使用的都是iTerm。在Github上找到了解决方案：https://github.com/vitorgalvao/custom-alfred-iterm-scripts

设置方式直接截图说明：

![WechatIMG62.png](https://file.mspring.org/hexo-client/2022/08/11/2d3e0dec-99d8-4a6b-bb61-7b486f8fed93.png)

配置内容如下（这个内容是我从上面那个Github项目中Copy出来的，可以自行去项目中Copy最新的）：

```shell
-- For the latest version:
-- https://github.com/vitorgalvao/custom-alfred-iterm-scripts

-- Set this property to true to always open in a new window
property open_in_new_window : false

-- Set this property to false to reuse current tab
property open_in_new_tab : true

-- Handlers
on new_window()
  tell application "iTerm" to create window with default profile
end new_window

on new_tab()
  tell application "iTerm" to tell the first window to create tab with default profile
end new_tab

on call_forward()
  tell application "iTerm" to activate
end call_forward

on is_running()
  application "iTerm" is running
end is_running

on has_windows()
  if not is_running() then return false

  tell application "iTerm"
    if windows is {} then return false
    if tabs of current window is {} then return false
    if sessions of current tab of current window is {} then return false

    set session_text to contents of current session of current tab of current window
    if words of session_text is {} then return false
  end tell

  true
end has_windows

on send_text(custom_text)
  tell application "iTerm" to tell the first window to tell current session to write text custom_text
end send_text

-- Main
on alfred_script(query)
  if has_windows() then
    if open_in_new_window then
      new_window()
    else if open_in_new_tab then
      new_tab()
    else
      -- Reuse current tab
    end if
  else
    -- If iTerm is not running and we tell it to create a new window, we get two
    -- One from opening the application, and the other from the command
    if is_running() then
      new_window()
    else
      call_forward()
    end if
  end if

  -- Make sure a window exists before we continue, or the write may fail
  repeat until has_windows()
    delay 0.01
  end repeat

  send_text(query)
  call_forward()
end alfred_script
```

这也备份一下修改之前的配置，防止丢失：

```shell
on alfred_script(q)
	tell application "Terminal"
		activate
		do script q
	end tell
end alfred_script
```

