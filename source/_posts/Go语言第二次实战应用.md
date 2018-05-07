---
title: Go语言第二次实战应用
tags:
  - Go
categories:
  - 程序员
toc: false
date: 2017-06-14 00:00:00
---

使用场景，由于历史原因造成redis计数不准确，需要将数据从数据库中count一次，然后同步到redis。

### 使用到的包
- github.com/go-sql-driver/mysql
- github.com/go-redis/redis

### 具体实现
```go
package main

import (
    "database/sql"
    "fmt"
    "strconv"
    "github.com/go-redis/redis"
    _ "github.com/go-sql-driver/mysql"
)

// redis 客户端
var client *redis.Client
var db *sql.DB

const (
    dbUrl = "username:password@tcp(localhost:3306)/dianping_new_db?charset=utf8"
)

func init() {
    // 初始化redis客户端
    client = redis.NewClient(&redis.Options{
        Addr:     "localhost:6379",
        Password: "", // no password set
        DB:       0,  // use default DB
    })
    db, _ = sql.Open("mysql", dbUrl)
}

func main() {
    var dianpingMap map[string]string
    dianpingMap = make(map[string]string)

    listById(func(id string, dianpingId string) {
        _, ok := dianpingMap[dianpingId]
        if ok {
            return
        }

        count := getCount(dianpingId)

        redisKey := "dianping-count-" + dianpingId
        client.HSet(redisKey, "replyCount", count)

        dianpingMap[dianpingId] = dianpingId

        fmt.Println("id", id, "dianpingId", dianpingId, "count", count)
    })

    client.Close()
    db.Close()
}

type Handler func(id string, dianpingId string)

func listById(handler Handler) {
    var cursor = 0
    for {
        sql := "select id, dianping_id from t_dianping_reply "
        if cursor > 0 {
            sql += " where id > " + strconv.Itoa(cursor)
        }
        sql += " order by id asc limit 10 "

        rows, err := db.Query(sql)
        if err != nil {
            panic(err)
        } else {
            for rows.Next() {
                var id, dianpingId string

                rows.Scan(&id, &dianpingId)

                handler(id, dianpingId)

                cursor, _ = strconv.Atoi(id)
            }
        }
        rows.Close()
    }
}

func getCount(dianpingId string) int {
    rows, err := db.Query("select count(*) from t_dianping_reply where dianping_id = ? and status = 0", dianpingId)
    count := 0
    if err != nil {
        panic(err)
        return count
    }
    if rows.Next() {
        rows.Scan(&count)
    }
    rows.Close()
    return count
}

```