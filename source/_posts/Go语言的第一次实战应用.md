---
title: Go语言的第一次实战应用
tags:
  - Go
categories:
  - 程序员
toc: false
date: 2017-06-03 00:00:00
---

最近开始在熟悉Go语言，正巧产品同学需要分析一些数据，数据是放在ElasticSearch中的，打算使用Go语言来进行分析。
Go语言的优势就是对linux兼容很好，可以直接成linux上的可执行文件，无需其他任何环境的支持。
```go
package main

import (
    "encoding/json"
    "log"
    "os"
    elastic "gopkg.in/olivere/elastic.v3"
    "strings"
    "fmt"
    "strconv"
)

const (
    url = "http://xxx.xxx.xxx.xxx:9200"
)

type Message struct {
    Id         int
    MucangId   string
    Message    string
    CreateTime string
}

func main() {
    errorLog := log.New(os.Stdout, "es ", log.LstdFlags)

    client, err := elastic.NewClient(elastic.SetURL(url), elastic.SetErrorLog(errorLog))
    if err != nil {
        panic(err)
    }

    var cursor int
    for {
        fmt.Println(strconv.Itoa(cursor))

        boolQuery := elastic.NewBoolQuery().Filter(
            elastic.NewTermQuery("appinfoId", 1),
            elastic.NewRangeQuery("createTime").Gt("2017-05-22 00:00:00 +0800"),
            elastic.NewMatchPhraseQuery("message", "向你求助"))

        if cursor > 0 {
            boolQuery.Filter(elastic.NewRangeQuery("id").Gt(cursor))
        }

        searchResult, err := client.Search().
            Index("push-record").
            Type("message").
            Query(boolQuery).
            Sort("id", true).
            From(0).Size(100).
            Pretty(true).
            Do()

        if err != nil {
            panic(err)
        }

        if searchResult.Hits.TotalHits > 0 {
            for _, hit := range searchResult.Hits.Hits {
                var msg Message
                json.Unmarshal(*hit.Source, &msg)

                cursor = msg.Id

                b, _ := json.Marshal(hit.Source)
                append("/home/gaoyoubo/push.log", string(b))
            }
        } else {
            break
        }
    }
}

// 追加文件
func append(path string, content string) {
    file, _ := os.OpenFile(path, os.O_RDWR|os.O_CREATE|os.O_APPEND, 0644)
    content = strings.Join([]string{content, "\n"}, "")
    buf := []byte(content)
    defer file.Close()
    file.Write(buf)
}

```