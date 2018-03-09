---
title: Java四舍五入
tags:
  - Java
categories:
  - 程序员
toc: false
date: 2018-03-09 15:49:01
---

之前写的，总结成代码片段，留备后用。

```Java
import java.math.BigDecimal;

/**
 * @author Gao Youbo
 * @since 2014-08-28 13:55:12
 */
public class NumberUtils {

    /**
     * 四舍五入取整数
     *
     * @param n
     * @return
     */
    public static int roundHalfUp(float n) {
        return new BigDecimal(n).setScale(0, BigDecimal.ROUND_HALF_UP).intValue();
    }


    /**
     * 四舍五入
     *
     * @param n         数字
     * @param precision 精度(保留几位小数)
     * @return
     */
    public static float roundHalfUp(float n, int precision) {
        return new BigDecimal(n).setScale(precision, BigDecimal.ROUND_HALF_UP).floatValue();
    }

    /**
     * 4.11 -> 4.2
     * <p/>
     * 4.19 -> 4.2
     *
     * @param n         数字
     * @param precision 精度(保留几位小数)
     * @return
     */
    public static float roundUp(float n, int precision) {
        return new BigDecimal(n).setScale(precision, BigDecimal.ROUND_UP).floatValue();
    }

}
```