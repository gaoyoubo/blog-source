---
title: Java生成GBK所有字符，以及判断字符是否是GBK编码内字符
tags:
  - 程序员
  - Java
originContent: ''
categories:
  - 程序员
toc: false
date: 2022-08-23 17:28:31
---

```java
/**
 * 参见文档: <a href="https://zh.wikipedia.org/wiki/%E6%B1%89%E5%AD%97%E5%86%85%E7%A0%81%E6%89%A9%E5%B1%95%E8%A7%84%E8%8C%83">汉字内码扩展规范</a>
 * <p>
 * GBK/1:GB2312非汉字符号: A1~A9, A1~FE
 * GBK/2:GB2312汉字: B0~F7, A1~FE
 * GBK/3:扩充汉字: 81~A0, 40~FE (7F除外)
 * GBK/4:扩充汉字: AA~FE, 40~A0 (7F除外)
 * GBK/5:扩充非汉字: A8~A9, 40~A0 (7F除外)
 *
 * @author Gao Youbo
 * @since 2022-08-23 16:34
 */
public class GBK {
    private static final Charset CHARSET = Charset.forName("GBK");

    /**
     * 获取所有GBK编码字符
     */
    public static List<String> getGBK() {
        List<String> words = new ArrayList<>();
        byte[] bytes = new byte[2];

        // GBK/1:GB2312非汉字符号
        for (int b1 = 0xA1; b1 <= 0xA9; b1++) {
            bytes[0] = (byte) b1;
            for (int b2 = 0xA1; b2 <= 0xFE; b2++) {
                bytes[1] = (byte) b2;
                words.add(new String(bytes, CHARSET));
            }
        }

        // GBK/2:GB2312汉字
        for (int b1 = 0xB0; b1 <= 0xF7; b1++) {
            bytes[0] = (byte) b1;
            for (int b2 = 0xA1; b2 <= 0xFE; b2++) {
                bytes[1] = (byte) b2;
                words.add(new String(bytes, CHARSET));
            }
        }

        // GBK/3:扩充汉字
        for (int b1 = 0x81; b1 <= 0xA0; b1++) {
            bytes[0] = (byte) b1;
            for (int b2 = 0x40; b2 <= 0xFE; b2++) {
                bytes[1] = (byte) b2;
                if (b2 != 0x7F) {
                    words.add(new String(bytes, CHARSET));
                }
            }
        }

        // GBK/4:扩充汉字
        for (int b1 = 0xAA; b1 <= 0xFE; b1++) {
            bytes[0] = (byte) b1;
            for (int b2 = 0x40; b2 <= 0xA0; b2++) {
                bytes[1] = (byte) b2;
                if (b2 != 0x7F) {
                    words.add(new String(bytes, CHARSET));
                }
            }
        }

        // GBK/5:扩充非汉字
        for (int b1 = 0xA8; b1 <= 0xA9; b1++) {
            bytes[0] = (byte) b1;
            for (int b2 = 0x40; b2 <= 0xA0; b2++) {
                bytes[1] = (byte) b2;
                if (b2 != 0x7F) {
                    words.add(new String(bytes, CHARSET));
                }
            }
        }

        return words;
    }

    public static boolean isGBK(String str) {
        boolean isGBK = false;
        char[] chars = str.toCharArray();
        for (char c : chars) {
            byte[] bytes = String.valueOf(c).getBytes(CHARSET);
            if (bytes.length == 2) { // GBK 编码为两个字节
                int b1 = bytes[0] & 0xff;
                int b2 = bytes[1] & 0xff;
                if (b1 >= 0xA1 && b1 <= 0xA9 && b2 >= 0xA1 & b2 <= 0xFE) {
                    isGBK = true;
                    break;
                }

                if (b1 >= 0xB0 && b1 <= 0xF7 && b2 >= 0xA1 & b2 <= 0xFE) {
                    isGBK = true;
                    break;
                }

                if (b1 >= 0x81 && b1 <= 0xA0 && b2 >= 0x40 & b2 <= 0xFE && b2 != 0x7F) {
                    isGBK = true;
                    break;
                }

                if (b1 >= 0xAA && b1 <= 0xFE && b2 >= 0x40 & b2 <= 0xA0 && b2 != 0x7F) {
                    isGBK = true;
                    break;
                }

                if (b1 >= 0xA8 && b1 <= 0xA9 && b2 >= 0x40 & b2 <= 0xA0 && b2 != 0x7F) {
                    isGBK = true;
                    break;
                }
            }
        }
        return isGBK;
    }
}
```

