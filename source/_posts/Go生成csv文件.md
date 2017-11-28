title: Go生成csv文件
author: 雾非雾的情思
abbrlink: 1576876979
tags:
  - Go
categories: []
date: 2017-11-28 11:44:00
---
```Go
package main
import (
	"encoding/csv"
	"os"
)

func main() {
	f, err := os.Create("test.csv")
	if err != nil {
		panic(err)
	}
	defer f.Close()

	w := csv.NewWriter(f)
	data := [][]string{
		{"1", "11", "11"},
		{"2", "22", "22"}
	}
	w.WriteAll(data)
	w.Flush()
}
```