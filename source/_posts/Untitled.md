title: Java分隔、合并大文件
author: 雾非雾的情思
tags:
  - Java
categories:
  - 程序员
date: 2017-08-20 16:37:00
---
今天网百度网盘上上传文件提示单个文件大小超限，让我升级VIP。作为一个有逼格的程序猿怎么可能被这点小事难倒呢。

```
import com.google.common.collect.Lists;
import org.apache.commons.io.FilenameUtils;

import java.io.File;
import java.io.IOException;
import java.io.RandomAccessFile;
import java.util.List;

/**
 * @author Gao Youbo
 * @since 2017-07-07 18:18
 */
public class Files {
    public static void main(String[] args) {
        int num = 10;

        // 分割
        cut(new File("/Users/gaoyoubo/360sync/数据迁移/document/a.zip"), num);

        // 合并
        List<File> files = Lists.newArrayList();
        for (int i = 0; i < num; i++) {
            files.add(new File("/Users/gaoyoubo/360sync/数据迁移/document/a-" + i + ".zip"));
        }
        File outFile = new File("/Users/gaoyoubo/360sync/数据迁移/document/b.zip");
        merge(files, outFile);
    }


    /**
     * 分文件
     *
     * @param sourceFile
     * @param num        分隔文件数量
     */
    public static void cut(File sourceFile, int num) {
        long signMaxSize = sourceFile.length() / num + 1; // 单个文件最大长度
        try (RandomAccessFile source = new RandomAccessFile(sourceFile, "r")) {
            byte[] bytes = new byte[1024];
            int len;
            for (int i = 0; i < num; i++) {
                File targetFile = new File(sourceFile.getParent(),
                        FilenameUtils.getBaseName(sourceFile.getName()) + "-" + i + "." + FilenameUtils.getExtension(sourceFile.getName()));
                try (RandomAccessFile target = new RandomAccessFile(targetFile, "rw")) {
                    while ((len = source.read(bytes)) != -1) {//读到文件末尾时，len返回-1，结束循环
                        target.write(bytes, 0, len);
                        if (target.length() > signMaxSize) {
                            break;
                        }
                    }
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    /**
     * 合并文件
     */
    public static void merge(List<File> files, File outFile) {
        try (RandomAccessFile out = new RandomAccessFile(outFile, "rw")) {
            for (File file : files) {
                try (RandomAccessFile src = new RandomAccessFile(file, "r")) {
                    byte[] bytes = new byte[1024];//每次读取字节数
                    int len;
                    while ((len = src.read(bytes)) != -1) {
                        out.write(bytes, 0, len);//循环赋值
                    }
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```