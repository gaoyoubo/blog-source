---
title: 使用div画table
tags:
  - html
  - 代码笔记
originContent: ''
categories:
  - 程序员
toc: false
date: 2023-02-18 10:16:33
---

网上找到的两种方法，先记录下备用。

```html
<!DOCTYPE html>
<html>
<head>
    <style>
        .table-tr {
            width: 1200px;
        }
        .table-td,.table-tdRowEnd,.table-tdLastRow,.table-tdLastRowEnd{
            float: left;
            width: 198px;
            height: 30px;
            line-height: 30px;
            border-style: solid;
        }
        .table-td {
            border-width: 1px 0px 0px 1px;
        }
        .table-tdRowEnd {
            border-width: 1px 1px 0px 1px;
        }
        .table-tdLastRow {
            border-width: 1px 0px 1px 1px;
        }
        .table-tdLastRowEnd {
            border-width: 1px 1px 1px 1px;
        }
    </style>
</head>
<body>
    <div class="table-tr" >
        <div class="table-td">姓名</div>
        <div class="table-td">年龄</div>
        <div class="table-td">电话</div>
        <div class="table-td">QQ号</div>
        <div class="table-td">邮箱地址</div>
        <div class="table-tdRowEnd">主页</div>
    </div>
 
    <div class="table-tr">
        <div class="table-td">小明</div>
        <div class="table-td">18</div>
        <div class="table-td">123456789</div>
        <div class="table-td">123456</div>
        <div class="table-td">admin@admin.com</div>
        <div class="table-tdRowEnd">feiniaomy.com</div>
    </div>
    <div class="table-tr" >
        <div class="table-td">小红</div>
        <div class="table-td">20</div>
        <div class="table-td">123456789</div>
        <div class="table-td">654321</div>
        <div class="table-td">xxxx@xx.com</div>
        <div class="table-tdRowEnd">baidu.com</div>
    </div>
    <div class="table-tr" >
        <div class="table-tdLastRow">小蓝</div>
        <div class="table-tdLastRow">20</div>
        <div class="table-tdLastRow">null</div>
        <div class="table-tdLastRow">null</div>
        <div class="table-tdLastRow"></div>
        <div class="table-tdLastRowEnd"></div>
    </div>
</body>
</html>
```

```html
<!DOCTYPE html>
<html>
<head>
    <style>
        ul{margin:0;padding:0;list-style:none;}  
        .table{display:table;border-collapse:collapse;border:1px solid #ccc;}  
        .table-caption{display:table-caption;margin:0;padding:0;font-size:16px;}  
        .table-column-group{display:table-column-group;}  
        .table-column{display:table-column;width:200px;}  
        .table-row-group{display:table-row-group;}  
        .table-row{display:table-row;}  
        .table-row-group .table-row:hover,.table-footer-group .table-row:hover{background:#f6f6f6;}  
        .table-cell{display:table-cell;padding:5px;border:1px solid #ccc;}  
        .table-header-group{display:table-header-group;background:#eee;font-weight:bold;}  
        .table-footer-group{display:table-footer-group;}
    </style>
</head>
<body>
    <div class="table">
        <div class="table-column-group">
            <div class="table-column"></div>
            <div class="table-column"></div>
            <div class="table-column"></div>
        </div>
        <div class="table-header-group">
            <ul class="table-row">
                <li class="table-cell">序号</li>
                <li class="table-cell">姓名</li>
                <li class="table-cell">年龄</li>
            </ul>
        </div>
        <div class="table-row-group">
            <ul class="table-row">
                <li class="table-cell">1</li>
                <li class="table-cell">小明</li>
                <li class="table-cell">19</li>
            </ul>
            <ul class="table-row">
                <li class="table-cell">2</li>
                <li class="table-cell">小红</li>
                <li class="table-cell">21</li>
            </ul>
            <ul class="table-row">
                <li class="table-cell">3</li>
                <li class="table-cell">小蓝</li>
                <li class="table-cell">26</li>
            </ul>
        </div>
        <div class="table-footer-group">
            <ul class="table-row">
                <li class="table-cell">底部</li>
                <li class="table-cell">底部</li>
                <li class="table-cell">底部</li>
            </ul>
        </div>
    </div>
</body>
</html>
```

