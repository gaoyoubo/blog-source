title: 一篇文章看懂when.js
author: 雾非雾的情思
abbrlink: 4166033353
tags: []
categories: []
date: 2017-03-19 00:00:00
---
> 最近在拾起很久都没做过的前端，总结下When.js的最常用的场景。

### 场景1
执行异步function a，当成功时执行function b，失败时执行function c，执行过程中需要回调function d来监控执行状态。

这个是最通用的用法，也是when.js中最长用到的，示例代码如下：

```
function a () {
  var deferred = when.defer()
    
    for (var i = 0; i < 100; i++) {
      try {
        deferred.notify(i++);
      } catch (err) {
        deferred.reject(e)
      }
    }

    deferred.resolve('成功消息')

    return deferred.promise;
}

a().then(function b(msg){
  console.log('执行成功')
}, function c(err){
  console.log('执行失败')
}, function d(i){
  console.log('执行中...' + i)
})
```

总结：then有三个参数，分别是onFulfilled、onRejected、onProgress，通过这三个参数，就可以指定上一个任务在resolve、reject和notify时该如何处理。例如上一个任务被resolve(data)，onFulfilled函数就会被触发，data作为它的参数；被reject(reason)，那么onRejected就会被触发，收到reason。任何时候，onFulfilled和onRejected都只有其一可以被触发，并且只触发一次；onProgress顾名思义，每次notify时都会被调用。

### 场景2
执行完function a，再执行function b；执行完function b，在执行function c。

```
function a () {
  var deferred = when.defer()
    
    for (var i = 0; i < 100; i++) {
      try {
        deferred.notify(i++);
      } catch (err) {
        deferred.reject(e)
      }
    }

    deferred.resolve('成功消息')

    return deferred.promise;
}

a().then(function b(){}).then(function c(){})
```