title: Java解析搜狗输入法词库
author: 雾非雾的情思
abbrlink: 3566971333
tags:
  - ElasticSearch
categories:
  - 程序员
date: 2017-03-07 00:00:00
---
> 解析算法摘自：http://qindongliang.iteye.com/blog/2088416

最近在优化社区搜索结果，之前使用的词库比较老旧很多次都收录不全，所以想到了搜狗输入法词库。但是搜索输入法词库文件是加密之后的，去网上找了一个Java版的解析程序，经测试可用，这里搜藏一下。

```
package cn.mucang.saturn.common;

import java.io.File;
import java.io.IOException;
import java.io.RandomAccessFile;
import java.nio.file.Files;
import java.nio.file.LinkOption;
import java.nio.file.Paths;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;

/**
 * 解析sogou词库工具类
 **/
public class SogouDictParser {

    public static void main(String[] args) throws Exception {
        sogou("/Users/gaoyoubo/Downloads/sougou.scel", "/Users/gaoyoubo/Downloads/sougou.txt", false);
    }

    /**
     * 读取scel的词库文件
     * 生成txt格式的文件
     *
     * @param inputPath  输入路径
     * @param outputPath 输出路径
     * @param isAppend   是否拼接追加词库内容
     *                   true 代表追加,false代表重建
     **/
    private static void sogou(String inputPath, String outputPath, boolean isAppend) throws IOException {
        File file = new File(inputPath);
        if (!isAppend) {
            if (Files.exists(Paths.get(outputPath), LinkOption.values())) {
                System.out.println("存储此文件已经删除");
                Files.deleteIfExists(Paths.get(outputPath));

            }
        }
        try (RandomAccessFile raf = new RandomAccessFile(outputPath, "rw")) {
            int count = 0;
            SogouScelMdel model = new SogouScelReader().read(file);
            Map<String, List<String>> words = model.getWordMap(); //词<拼音,词>
            Set<Entry<String, List<String>>> set = words.entrySet();
            Iterator<Entry<String, List<String>>> it = set.iterator();
            while (it.hasNext()) {
                Entry<String, List<String>> entry = it.next();
                List<String> list = entry.getValue();
                int size = list.size();
                for (int i = 0; i < size; i++) {
                    String word = list.get(i);

                    System.out.println(word);

                    raf.seek(raf.getFilePointer());
                    raf.write((word + "\n").getBytes());//写入txt文件
                    count++;
                }
            }
            System.out.println("生成txt成功！,总计写入: " + count + " 条数据！");
        }
    }

}


package cn.mucang.saturn.common;

import java.io.ByteArrayOutputStream;
import java.io.DataInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

/**
 * @author Gao Youbo
 * @since 2017-03-07 19:26
 */
public class SogouScelReader {
    protected static String encoding = "UTF-16LE";

    public SogouScelMdel read(File file) throws IOException {
        return read(new FileInputStream(file));
    }

    protected ByteArrayOutputStream output = new ByteArrayOutputStream();

    protected String readString(DataInputStream input, int pos, int[] reads) throws IOException {
        int read = reads[0];
        input.skip(pos - read);
        read = pos;
        output.reset();
        while (true) {
            int c1 = input.read();
            int c2 = input.read();
            read += 2;
            if (c1 == 0 && c2 == 0) {
                break;
            } else {
                output.write(c1);
                output.write(c2);
            }
        }
        reads[0] = read;
        return new String(output.toByteArray(), encoding);
    }

    public SogouScelMdel read(InputStream in) throws IOException {
        SogouScelMdel model = new SogouScelMdel();
        DataInputStream input = new DataInputStream(in);
        int read;
        try {
            byte[] bytes = new byte[4];
            input.readFully(bytes);
            assert (bytes[0] == 0x40 && bytes[1] == 0x15 && bytes[2] == 0 && bytes[3] == 0);
            input.readFully(bytes);
            int flag1 = bytes[0];
            assert (bytes[1] == 0x43 && bytes[2] == 0x53 && bytes[3] == 0x01);
            int[] reads = new int[]{8};
            model.setName(readString(input, 0x130, reads));
            model.setType(readString(input, 0x338, reads));
            model.setDescription(readString(input, 0x540, reads));
            model.setSample(readString(input, 0xd40, reads));
            read = reads[0];
            input.skip(0x1540 - read);
            read = 0x1540;
            input.readFully(bytes);
            read += 4;
            assert (bytes[0] == (byte) 0x9D && bytes[1] == 0x01 && bytes[2] == 0 && bytes[3] == 0);
            bytes = new byte[128];
            Map<Integer, String> pyMap = new LinkedHashMap<Integer, String>();
            while (true) {
                int mark = readUnsignedShort(input);
                int size = input.readUnsignedByte();
                input.skip(1);
                read += 4;
                assert (size > 0 && (size % 2) == 0);
                input.readFully(bytes, 0, size);
                read += size;
                String py = new String(bytes, 0, size, encoding);
                //System.out.println(py);
                pyMap.put(mark, py);
                if ("zuo".equals(py)) {
                    break;
                }
            }
            if (flag1 == 0x44) {
                input.skip(0x2628 - read);
            } else if (flag1 == 0x45) {
                input.skip(0x26C4 - read);
            } else {
                throw new RuntimeException("出现意外，联系作者");
            }
            StringBuffer buffer = new StringBuffer();
            Map<String, List<String>> wordMap = new LinkedHashMap<String, List<String>>();
            while (true) {
                int size = readUnsignedShort(input);
                if (size < 0) {
                    break;
                }
                int count = readUnsignedShort(input);
                int len = count / 2;
                assert (len * 2 == count);
                buffer.setLength(0);
                for (int i = 0; i < len; i++) {
                    int key = readUnsignedShort(input);
                    buffer.append(pyMap.get(key)).append("'");
                }
                buffer.setLength(buffer.length() - 1);
                String py = buffer.toString();
                List<String> list = wordMap.get(py);
                if (list == null) {
                    list = new ArrayList<String>();
                    wordMap.put(py, list);
                }
                for (int i = 0; i < size; i++) {
                    count = readUnsignedShort(input);
                    if (count > bytes.length) {
                        bytes = new byte[count];
                    }
                    input.readFully(bytes, 0, count);
                    String word = new String(bytes, 0, count, encoding);
                    //接下来12个字节可能是词频或者类似信息
                    input.skip(12);
                    list.add(word);
                }
            }
            //System.out.println(wordMap.size());
            model.setWordMap(wordMap);
            return model;
        } finally {
            in.close();
        }
    }

    protected final int readUnsignedShort(InputStream in) throws IOException {
        int ch1 = in.read();
        int ch2 = in.read();
        if ((ch1 | ch2) < 0) {
            return Integer.MIN_VALUE;
        }
        return (ch2 << 8) + (ch1 << 0);
    }

}

package cn.mucang.saturn.common;

import java.util.List;
import java.util.Map;

/**
 * @author Gao Youbo
 * @since 2017-03-07 19:26
 */
public class SogouScelMdel {
    private Map<String, List<String>> wordMap;

    private String name;
    private String type;
    private String description;
    private String sample;

    public Map<String, List<String>> getWordMap() {
        return wordMap;
    }

    void setWordMap(Map<String, List<String>> wordMap) {
        this.wordMap = wordMap;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getSample() {
        return sample;
    }

    public void setSample(String sample) {
        this.sample = sample;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}

```
