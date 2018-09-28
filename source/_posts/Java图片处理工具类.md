---
title: Java图片处理工具类
tags:
  - Java
originContent: |
  > 这段代码是我四年前写的，当时的使用场景为使用tesseract做图片的预处理。功能包含图片二值化、移除杂色、横向切分、水平切分等。

  ```java
  import java.awt.Color;
  import java.awt.Image;
  import java.awt.Toolkit;
  import java.awt.image.BufferedImage;
  import java.awt.image.ColorModel;
  import java.awt.image.MemoryImageSource;
  import java.awt.image.PixelGrabber;
  import java.util.ArrayList;
  import java.util.List;

  /**
   * @author Gao Youbo
   * @since 2014-05-29 14:34:13
   */
  public class ImageUtils {

      public static class SplitItem {

          private int x;
          private int w;
          private int y;
          private int h;

          public int getX() {
              return x;
          }

          public void setX(int x) {
              this.x = x;
          }

          public int getW() {
              return w;
          }

          public void setW(int w) {
              this.w = w;
          }

          public int getY() {
              return y;
          }

          public void setY(int y) {
              this.y = y;
          }

          public int getH() {
              return h;
          }

          public void setH(int h) {
              this.h = h;
          }

      }


      /**
       * 图片纵向切分（切分为列）
       *
       * @param image
       * @param minWidth 每个汉字的最小宽度，如果汉字的最小宽度小于该参数，那么认为系统将一个汉字截断了
       * @return
       */
      public static List<BufferedImage> splitLengthwaysWithMinWidth(BufferedImage image, int minWidth) {
          if (minWidth < 0) {
              minWidth = 0;
          }
          List<BufferedImage> subImgs = new ArrayList<>();
          int width = image.getWidth();
          int height = image.getHeight();
          int startX = 0;
          int endX = 0;
          boolean start = false;
          boolean end = false;
          for (int x = 0; x < width; ++x) {
              boolean blank = isXBlank(image, x);
              if (!start) { //如果是白色
                  int space = spaceX(image, x);
                  x = x + space;
                  startX = x;
                  endX = x;
                  start = true;
              }
              if (start && !blank) {
                  endX = x;
              }
              int wordLength = endX - startX;
              if (start && blank && wordLength > 0) {
                  // 汉字长度小于设定长度，那么认为这不是一个完成的汉字，而是将左右结构的汉字切分成了两份
                  if (wordLength < minWidth) {
                      int space = spaceX(image, x);
                      x = x + space;
                  } else {
                      end = true;
                      endX = x;
                  }
              }
              if (start && end && wordLength > 0) {
                  BufferedImage subImage = image.getSubimage(startX, 0, (endX - startX), height);
                  subImgs.add(subImage);
                  start = false;
                  end = false;
              }
          }
          return subImgs;
      }

      /**
       * x轴上的所有点是空白的（白色的）
       *
       * @param image
       * @param x
       * @return
       */
      private static boolean isXBlank(BufferedImage image, int x) {
          int height = image.getHeight();
          for (int y = 0; y < height; y++) {
              int rgb = image.getRGB(x, y);
              if (isBlack(rgb)) {
                  return false;
              }
          }
          return true;
      }

      /**
       * 图片纵向切分（切分为列）
       *
       * @param image
       * @param minGap 文字之间的最小间隙，如果间隙文字之间的间隙小于或等于该参数，那么认为该间隙为一个汉字上的正常间隙。主要处理左右结构的一些汉字，例如：”北、川、外...“
       * @return
       */
      public static List<BufferedImage> splitLengthways(BufferedImage image, int minGap) {
          if (minGap < 0) {
              minGap = 0;
          }
          List<BufferedImage> subImgs = new ArrayList<>();
          int width = image.getWidth();
          int height = image.getHeight();
          List<Integer> weightlist = new ArrayList<>();
          for (int x = 0; x < width; ++x) {
              int count = 0;
              for (int y = 0; y < height; ++y) {
                  if (isBlack(image.getRGB(x, y))) {
                      count++;
                  }
              }
              if (minGap > 0) {
                  int space = spaceX(image, x);
                  if (space <= minGap) {
                      count = count + space;
                  }
              }
              weightlist.add(count);
          }
          List<SplitItem> splitItems = new ArrayList<>();
          for (int i = 0; i < weightlist.size(); i++) {
              int length = 0;
              while (i < weightlist.size() && weightlist.get(i) > 0) {
                  i++;
                  length++;
              }
              if (length > 0) {
                  int x = i - length;
                  int w = length;
                  int y = 0;
                  int h = height;
                  SplitItem item = new SplitItem();
                  item.setX(x);
                  item.setW(w);
                  item.setY(y);
                  item.setH(h);
                  splitItems.add(item);
              }
          }
          for (SplitItem splitItem : splitItems) {
              subImgs.add(image.getSubimage(splitItem.getX(), splitItem.getY(), splitItem.getW(), splitItem.getH()));
          }
          return subImgs;
      }

      /**
       * X轴上两个字之间的间距
       *
       * @param image
       * @param currentX 当前索引所在的x坐标
       * @return
       */
      private static int spaceX(BufferedImage image, int currentX) {
          int w = image.getWidth();
          int h = image.getHeight();
          int spaceLength = 0;
          for (int x = currentX; x < w; x++) {
              boolean space = true;
              for (int y = 0; y < h; y++) {
                  if (isBlack(image.getRGB(x, y))) { //有黑色的，表明非空白
                      space = false;
                      break;
                  }
              }
              if (space) {
                  spaceLength++;
              } else {
                  return spaceLength;
              }
          }
          return spaceLength;
      }


      /**
       * y轴上两个字之间的间距
       *
       * @param image
       * @param currentY 当前索引所在的y坐标
       * @return
       */
      private static int spaceY(BufferedImage image, int currentY) {
          int w = image.getWidth();
          int h = image.getHeight();
          int spaceLength = 0;
          for (int y = currentY; y < h; y++) {
              boolean space = true;
              for (int x = 0; x < w; x++) {
                  if (isBlack(image.getRGB(x, y))) { //有黑色的，表明非空白
                      space = false;
                      break;
                  }
              }
              if (space) {
                  spaceLength++;
              } else {
                  return spaceLength;
              }
          }
          return spaceLength;
      }


      /**
       * 图片横向切分（切分为行）
       *
       * @param image
       * @param minGap 两行之间的最小间隙,如果间隙小于或等于该参数,那么认为没有折行
       * @return
       */
      public static List<BufferedImage> splitCrosswise(BufferedImage image, int minGap) {
          if (minGap < 0) {
              minGap = 0;
          }
          List<BufferedImage> subImgs = new ArrayList<>();
          int w = image.getWidth();
          int h = image.getHeight();
          List<Integer> heightlist = new ArrayList<>();
          for (int y = 0; y < h; y++) {
              int count = 0;
              for (int x = 0; x < w; x++) {
                  if (ImageUtils.isBlack(image.getRGB(x, y))) {
                      count++;
                  }
              }
              if (minGap > 0) {
                  int space = spaceY(image, y);
                  if (space <= minGap) {
                      count = count + space;
                  }
              }
              heightlist.add(count);
          }
          for (int i = 0; i < heightlist.size(); i++) {
              int length = 0;
              while (i < heightlist.size() && heightlist.get(i) > 0) {
                  i++;
                  length++;
              }
              if (length > 0) {
                  int y = i - length;
                  int x = 0;
                  int height = length;
                  int width = w;
                  BufferedImage bufferedImage = image.getSubimage(x, y, width, height);
                  subImgs.add(bufferedImage);
              }
          }
          return subImgs;
      }

      /**
       * 图片横向切分（切分为行）
       *
       * @param image
       * @return
       */
      public static List<BufferedImage> splitCrosswise(BufferedImage image) {
          List<BufferedImage> subImgs = new ArrayList<>();
          int w = image.getWidth();
          int h = image.getHeight();
          List<Integer> heightlist = new ArrayList<>();
          for (int y = 0; y < h; y++) {
              int count = 0;
              for (int x = 0; x < w; x++) {
                  if (ImageUtils.isBlack(image.getRGB(x, y))) {
                      count++;
                  }
              }
              heightlist.add(count);
          }
          for (int i = 0; i < heightlist.size(); i++) {
              int length = 0;
              while (i < heightlist.size() && heightlist.get(i) > 0) {
                  i++;
                  length++;
              }
              if (length > 0) {
                  int y = i - length;
                  int x = 0;
                  int height = length;
                  int width = w;
                  BufferedImage bufferedImage = image.getSubimage(x, y, width, height);
                  subImgs.add(bufferedImage);
              }
          }
          return subImgs;
      }

      /**
       * 删除杂色(图片二值化)
       * <p>
       * 默认图片中字体颜色为黑色，如果非黑色像素全部替换为白色
       *
       * @param image
       * @return
       * @throws java.lang.InterruptedException
       */
      public static final BufferedImage removeMotley(BufferedImage image) throws InterruptedException {
          int width = image.getWidth();
          int height = image.getHeight();
          int[] pixels = new int[width * height];
          int grey = 100;
          PixelGrabber pixelGrabber = new PixelGrabber(image.getSource(), 0, 0, width, height, pixels, 0, width);
          pixelGrabber.grabPixels();
          ColorModel cm = ColorModel.getRGBdefault();
          for (int i = 0; i < width * height; i++) {
              int red, green, blue;
              int alpha = cm.getAlpha(pixels[i]);
              if (cm.getRed(pixels[i]) > grey) {
                  red = 255;
              } else {
                  red = 0;
              }
              if (cm.getGreen(pixels[i]) > grey) {
                  green = 255;
              } else {
                  green = 0;
              }
              if (cm.getBlue(pixels[i]) > grey) {
                  blue = 255;
              } else {
                  blue = 0;
              }
              pixels[i] = alpha << 24 | red << 16 | green << 8 | blue; //通过移位重新构成某一点像素的RGB值
          }
          //将数组中的象素产生一个图像
          Image tempImg = Toolkit.getDefaultToolkit().createImage(new MemoryImageSource(width, height, pixels, 0, width));
          image = new BufferedImage(tempImg.getWidth(null), tempImg.getHeight(null), BufferedImage.TYPE_INT_BGR);
          image.createGraphics().drawImage(tempImg, 0, 0, null);
          return image;
      }

      /**
       * 清除空白部分
       *
       * @param image
       * @return
       */
      public static BufferedImage removeSpace(BufferedImage image) {
          BufferedImage result = removeTBWhite(image);
          return removeLRWhite(result);
      }

      /**
       * 移除上下白色部分（top bottom）
       *
       * @param image
       * @return
       */
      public static BufferedImage removeTBWhite(BufferedImage image) {
          int width = image.getWidth();
          int height = image.getHeight();
          int start = 0;
          int end = 0;
          Label1:
          for (int y = 0; y < height; ++y) {
              int count = 0;
              for (int x = 0; x < width; ++x) {
                  if (isBlack(image.getRGB(x, y))) {
                      count++;
                  }
                  if (count >= 1) {
                      start = y;
                      break Label1;
                  }
              }
          }
          Label2:
          for (int y = height - 1; y >= 0; --y) {
              int count = 0;
              for (int x = 0; x < width; ++x) {
                  if (isBlack(image.getRGB(x, y))) {
                      count++;
                  }
                  if (count >= 1) {
                      end = y;
                      break Label2;
                  }
              }
          }
          return image.getSubimage(0, start, width, end - start + 1);
      }

      /**
       * 移除左右白色部分（left right）
       *
       * @param image
       * @return
       */
      public static BufferedImage removeLRWhite(BufferedImage image) {
          int width = image.getWidth();
          int height = image.getHeight();
          int start = 0;
          int end = 0;
          Label1:
          for (int x = 0; x < width; ++x) {
              int count = 0;
              for (int y = 0; y < height; ++y) {
                  if (isBlack(image.getRGB(x, y))) {
                      count++;
                  }
                  if (count >= 1) {
                      start = x;
                      break Label1;
                  }
              }
          }
          Label2:
          for (int x = width - 1; x >= 0; --x) {
              int count = 0;
              for (int y = height - 1; y >= 0; --y) {
                  if (isBlack(image.getRGB(x, y))) {
                      count++;
                  }
                  if (count >= 1) {
                      end = x;
                      break Label2;
                  }
              }
          }
          return image.getSubimage(start, 0, end - start + 1, height);
      }

      /**
       * 移除黑色部分
       *
       * @param img
       * @return
       */
      public static BufferedImage removeBlack(BufferedImage img) {
          int width = img.getWidth();
          int height = img.getHeight();
          int start = 0;
          int end = 0;
          Label1:
          for (int y = 0; y < height; ++y) {
              for (int x = 0; x < width; ++x) {
                  if (isBlack(img.getRGB(x, y))) {
                      start = y;
                      break Label1;
                  }
              }
          }
          Label2:
          for (int y = height - 1; y >= 0; --y) {
              for (int x = 0; x < width; ++x) {
                  if (isBlack(img.getRGB(x, y))) {
                      end = y;
                      break Label2;
                  }
              }
          }
          return img.getSubimage(0, start, width, end - start + 1);
      }

      /**
       * 是否是黑色
       *
       * @param colorInt
       * @return
       */
      public static boolean isBlack(int colorInt) {
          Color color = new Color(colorInt);
          return color.getRed() + color.getGreen() + color.getBlue() <= 100;
      }

      /**
       * 是否是白色
       *
       * @param colorInt
       * @return
       */
      public static boolean isWhite(int colorInt) {
          Color color = new Color(colorInt);
          return color.getRed() + color.getGreen() + color.getBlue() > 100;
      }
  }
  ```
categories:
  - 程序员
toc: false
date: 2018-09-06 14:44:05
---

> 这段代码是我四年前写的，当时的使用场景为使用tesseract做图片的预处理。功能包含图片二值化、移除杂色、横向切分、水平切分等。

```java
import java.awt.Color;
import java.awt.Image;
import java.awt.Toolkit;
import java.awt.image.BufferedImage;
import java.awt.image.ColorModel;
import java.awt.image.MemoryImageSource;
import java.awt.image.PixelGrabber;
import java.util.ArrayList;
import java.util.List;

/**
 * @author Gao Youbo
 * @since 2014-05-29 14:34:13
 */
public class ImageUtils {

    public static class SplitItem {

        private int x;
        private int w;
        private int y;
        private int h;

        public int getX() {
            return x;
        }

        public void setX(int x) {
            this.x = x;
        }

        public int getW() {
            return w;
        }

        public void setW(int w) {
            this.w = w;
        }

        public int getY() {
            return y;
        }

        public void setY(int y) {
            this.y = y;
        }

        public int getH() {
            return h;
        }

        public void setH(int h) {
            this.h = h;
        }

    }


    /**
     * 图片纵向切分（切分为列）
     *
     * @param image
     * @param minWidth 每个汉字的最小宽度，如果汉字的最小宽度小于该参数，那么认为系统将一个汉字截断了
     * @return
     */
    public static List<BufferedImage> splitLengthwaysWithMinWidth(BufferedImage image, int minWidth) {
        if (minWidth < 0) {
            minWidth = 0;
        }
        List<BufferedImage> subImgs = new ArrayList<>();
        int width = image.getWidth();
        int height = image.getHeight();
        int startX = 0;
        int endX = 0;
        boolean start = false;
        boolean end = false;
        for (int x = 0; x < width; ++x) {
            boolean blank = isXBlank(image, x);
            if (!start) { //如果是白色
                int space = spaceX(image, x);
                x = x + space;
                startX = x;
                endX = x;
                start = true;
            }
            if (start && !blank) {
                endX = x;
            }
            int wordLength = endX - startX;
            if (start && blank && wordLength > 0) {
                // 汉字长度小于设定长度，那么认为这不是一个完成的汉字，而是将左右结构的汉字切分成了两份
                if (wordLength < minWidth) {
                    int space = spaceX(image, x);
                    x = x + space;
                } else {
                    end = true;
                    endX = x;
                }
            }
            if (start && end && wordLength > 0) {
                BufferedImage subImage = image.getSubimage(startX, 0, (endX - startX), height);
                subImgs.add(subImage);
                start = false;
                end = false;
            }
        }
        return subImgs;
    }

    /**
     * x轴上的所有点是空白的（白色的）
     *
     * @param image
     * @param x
     * @return
     */
    private static boolean isXBlank(BufferedImage image, int x) {
        int height = image.getHeight();
        for (int y = 0; y < height; y++) {
            int rgb = image.getRGB(x, y);
            if (isBlack(rgb)) {
                return false;
            }
        }
        return true;
    }

    /**
     * 图片纵向切分（切分为列）
     *
     * @param image
     * @param minGap 文字之间的最小间隙，如果间隙文字之间的间隙小于或等于该参数，那么认为该间隙为一个汉字上的正常间隙。主要处理左右结构的一些汉字，例如：”北、川、外...“
     * @return
     */
    public static List<BufferedImage> splitLengthways(BufferedImage image, int minGap) {
        if (minGap < 0) {
            minGap = 0;
        }
        List<BufferedImage> subImgs = new ArrayList<>();
        int width = image.getWidth();
        int height = image.getHeight();
        List<Integer> weightlist = new ArrayList<>();
        for (int x = 0; x < width; ++x) {
            int count = 0;
            for (int y = 0; y < height; ++y) {
                if (isBlack(image.getRGB(x, y))) {
                    count++;
                }
            }
            if (minGap > 0) {
                int space = spaceX(image, x);
                if (space <= minGap) {
                    count = count + space;
                }
            }
            weightlist.add(count);
        }
        List<SplitItem> splitItems = new ArrayList<>();
        for (int i = 0; i < weightlist.size(); i++) {
            int length = 0;
            while (i < weightlist.size() && weightlist.get(i) > 0) {
                i++;
                length++;
            }
            if (length > 0) {
                int x = i - length;
                int w = length;
                int y = 0;
                int h = height;
                SplitItem item = new SplitItem();
                item.setX(x);
                item.setW(w);
                item.setY(y);
                item.setH(h);
                splitItems.add(item);
            }
        }
        for (SplitItem splitItem : splitItems) {
            subImgs.add(image.getSubimage(splitItem.getX(), splitItem.getY(), splitItem.getW(), splitItem.getH()));
        }
        return subImgs;
    }

    /**
     * X轴上两个字之间的间距
     *
     * @param image
     * @param currentX 当前索引所在的x坐标
     * @return
     */
    private static int spaceX(BufferedImage image, int currentX) {
        int w = image.getWidth();
        int h = image.getHeight();
        int spaceLength = 0;
        for (int x = currentX; x < w; x++) {
            boolean space = true;
            for (int y = 0; y < h; y++) {
                if (isBlack(image.getRGB(x, y))) { //有黑色的，表明非空白
                    space = false;
                    break;
                }
            }
            if (space) {
                spaceLength++;
            } else {
                return spaceLength;
            }
        }
        return spaceLength;
    }


    /**
     * y轴上两个字之间的间距
     *
     * @param image
     * @param currentY 当前索引所在的y坐标
     * @return
     */
    private static int spaceY(BufferedImage image, int currentY) {
        int w = image.getWidth();
        int h = image.getHeight();
        int spaceLength = 0;
        for (int y = currentY; y < h; y++) {
            boolean space = true;
            for (int x = 0; x < w; x++) {
                if (isBlack(image.getRGB(x, y))) { //有黑色的，表明非空白
                    space = false;
                    break;
                }
            }
            if (space) {
                spaceLength++;
            } else {
                return spaceLength;
            }
        }
        return spaceLength;
    }


    /**
     * 图片横向切分（切分为行）
     *
     * @param image
     * @param minGap 两行之间的最小间隙,如果间隙小于或等于该参数,那么认为没有折行
     * @return
     */
    public static List<BufferedImage> splitCrosswise(BufferedImage image, int minGap) {
        if (minGap < 0) {
            minGap = 0;
        }
        List<BufferedImage> subImgs = new ArrayList<>();
        int w = image.getWidth();
        int h = image.getHeight();
        List<Integer> heightlist = new ArrayList<>();
        for (int y = 0; y < h; y++) {
            int count = 0;
            for (int x = 0; x < w; x++) {
                if (ImageUtils.isBlack(image.getRGB(x, y))) {
                    count++;
                }
            }
            if (minGap > 0) {
                int space = spaceY(image, y);
                if (space <= minGap) {
                    count = count + space;
                }
            }
            heightlist.add(count);
        }
        for (int i = 0; i < heightlist.size(); i++) {
            int length = 0;
            while (i < heightlist.size() && heightlist.get(i) > 0) {
                i++;
                length++;
            }
            if (length > 0) {
                int y = i - length;
                int x = 0;
                int height = length;
                int width = w;
                BufferedImage bufferedImage = image.getSubimage(x, y, width, height);
                subImgs.add(bufferedImage);
            }
        }
        return subImgs;
    }

    /**
     * 图片横向切分（切分为行）
     *
     * @param image
     * @return
     */
    public static List<BufferedImage> splitCrosswise(BufferedImage image) {
        List<BufferedImage> subImgs = new ArrayList<>();
        int w = image.getWidth();
        int h = image.getHeight();
        List<Integer> heightlist = new ArrayList<>();
        for (int y = 0; y < h; y++) {
            int count = 0;
            for (int x = 0; x < w; x++) {
                if (ImageUtils.isBlack(image.getRGB(x, y))) {
                    count++;
                }
            }
            heightlist.add(count);
        }
        for (int i = 0; i < heightlist.size(); i++) {
            int length = 0;
            while (i < heightlist.size() && heightlist.get(i) > 0) {
                i++;
                length++;
            }
            if (length > 0) {
                int y = i - length;
                int x = 0;
                int height = length;
                int width = w;
                BufferedImage bufferedImage = image.getSubimage(x, y, width, height);
                subImgs.add(bufferedImage);
            }
        }
        return subImgs;
    }

    /**
     * 删除杂色(图片二值化)
     * <p>
     * 默认图片中字体颜色为黑色，如果非黑色像素全部替换为白色
     *
     * @param image
     * @return
     * @throws java.lang.InterruptedException
     */
    public static final BufferedImage removeMotley(BufferedImage image) throws InterruptedException {
        int width = image.getWidth();
        int height = image.getHeight();
        int[] pixels = new int[width * height];
        int grey = 100;
        PixelGrabber pixelGrabber = new PixelGrabber(image.getSource(), 0, 0, width, height, pixels, 0, width);
        pixelGrabber.grabPixels();
        ColorModel cm = ColorModel.getRGBdefault();
        for (int i = 0; i < width * height; i++) {
            int red, green, blue;
            int alpha = cm.getAlpha(pixels[i]);
            if (cm.getRed(pixels[i]) > grey) {
                red = 255;
            } else {
                red = 0;
            }
            if (cm.getGreen(pixels[i]) > grey) {
                green = 255;
            } else {
                green = 0;
            }
            if (cm.getBlue(pixels[i]) > grey) {
                blue = 255;
            } else {
                blue = 0;
            }
            pixels[i] = alpha << 24 | red << 16 | green << 8 | blue; //通过移位重新构成某一点像素的RGB值
        }
        //将数组中的象素产生一个图像
        Image tempImg = Toolkit.getDefaultToolkit().createImage(new MemoryImageSource(width, height, pixels, 0, width));
        image = new BufferedImage(tempImg.getWidth(null), tempImg.getHeight(null), BufferedImage.TYPE_INT_BGR);
        image.createGraphics().drawImage(tempImg, 0, 0, null);
        return image;
    }

    /**
     * 清除空白部分
     *
     * @param image
     * @return
     */
    public static BufferedImage removeSpace(BufferedImage image) {
        BufferedImage result = removeTBWhite(image);
        return removeLRWhite(result);
    }

    /**
     * 移除上下白色部分（top bottom）
     *
     * @param image
     * @return
     */
    public static BufferedImage removeTBWhite(BufferedImage image) {
        int width = image.getWidth();
        int height = image.getHeight();
        int start = 0;
        int end = 0;
        Label1:
        for (int y = 0; y < height; ++y) {
            int count = 0;
            for (int x = 0; x < width; ++x) {
                if (isBlack(image.getRGB(x, y))) {
                    count++;
                }
                if (count >= 1) {
                    start = y;
                    break Label1;
                }
            }
        }
        Label2:
        for (int y = height - 1; y >= 0; --y) {
            int count = 0;
            for (int x = 0; x < width; ++x) {
                if (isBlack(image.getRGB(x, y))) {
                    count++;
                }
                if (count >= 1) {
                    end = y;
                    break Label2;
                }
            }
        }
        return image.getSubimage(0, start, width, end - start + 1);
    }

    /**
     * 移除左右白色部分（left right）
     *
     * @param image
     * @return
     */
    public static BufferedImage removeLRWhite(BufferedImage image) {
        int width = image.getWidth();
        int height = image.getHeight();
        int start = 0;
        int end = 0;
        Label1:
        for (int x = 0; x < width; ++x) {
            int count = 0;
            for (int y = 0; y < height; ++y) {
                if (isBlack(image.getRGB(x, y))) {
                    count++;
                }
                if (count >= 1) {
                    start = x;
                    break Label1;
                }
            }
        }
        Label2:
        for (int x = width - 1; x >= 0; --x) {
            int count = 0;
            for (int y = height - 1; y >= 0; --y) {
                if (isBlack(image.getRGB(x, y))) {
                    count++;
                }
                if (count >= 1) {
                    end = x;
                    break Label2;
                }
            }
        }
        return image.getSubimage(start, 0, end - start + 1, height);
    }

    /**
     * 移除黑色部分
     *
     * @param img
     * @return
     */
    public static BufferedImage removeBlack(BufferedImage img) {
        int width = img.getWidth();
        int height = img.getHeight();
        int start = 0;
        int end = 0;
        Label1:
        for (int y = 0; y < height; ++y) {
            for (int x = 0; x < width; ++x) {
                if (isBlack(img.getRGB(x, y))) {
                    start = y;
                    break Label1;
                }
            }
        }
        Label2:
        for (int y = height - 1; y >= 0; --y) {
            for (int x = 0; x < width; ++x) {
                if (isBlack(img.getRGB(x, y))) {
                    end = y;
                    break Label2;
                }
            }
        }
        return img.getSubimage(0, start, width, end - start + 1);
    }

    /**
     * 是否是黑色
     *
     * @param colorInt
     * @return
     */
    public static boolean isBlack(int colorInt) {
        Color color = new Color(colorInt);
        return color.getRed() + color.getGreen() + color.getBlue() <= 100;
    }

    /**
     * 是否是白色
     *
     * @param colorInt
     * @return
     */
    public static boolean isWhite(int colorInt) {
        Color color = new Color(colorInt);
        return color.getRed() + color.getGreen() + color.getBlue() > 100;
    }
}
```
