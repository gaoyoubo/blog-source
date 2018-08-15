---
title: javacv使用笔记
tags:
  - 程序员
  - Java
categories:
  - 程序员
toc: false
date: 2018-08-14 12:56:36
---

## 异常：Could not initialize class org.bytedeco.javacpp.avutil
```
Exception in thread "main" java.lang.NoClassDefFoundError: Could not initialize class org.bytedeco.javacpp.avutil
at java.lang.Class.forName0(Native Method)
at java.lang.Class.forName(Class.java:274)
at org.bytedeco.javacpp.Loader.load(Loader.java:385)
at org.bytedeco.javacpp.Loader.load(Loader.java:353)
at org.bytedeco.javacpp.avformat$AVFormatContext.<clinit>(avformat.java:2249)
at org.bytedeco.javacv.FFmpegFrameGrabber.startUnsafe(FFmpegFrameGrabber.java:346)
at org.bytedeco.javacv.FFmpegFrameGrabber.start(FFmpegFrameGrabber.java:340)
```
解决办法：
```shell
mvn package exec:java -Dplatform.dependencies -Dexec.mainClass=Demo
```

## 使用
```java
public static void main(String[] args) throws Exception {
        ChallengeEntryPlayer player = new ChallengeEntryPlayer();
        player.init();

        List<BufferedImage> images = grab(new File("/data/opencv/test.mp4"));
        int i = 1;
        for (BufferedImage image : images) {
            // ImageIO.write(image, "jpg", new File("/data/opencv/frame/" + i + ".jpg"));

            player.updateImage(image, 33L);

            i++;
        }

        String output = "/data/opencv/out.mp4";
        List<File> files = Lists.newArrayList(FileUtils.listFiles(new File("/data/opencv/frame/"), new String[]{"jpg"}, false));
        Collections.sort(files, (o1, o2) -> {
            int i1 = NumberUtils.toInt(StringUtils.substringBefore(o1.getName(), "."));
            int i2 = NumberUtils.toInt(StringUtils.substringBefore(o2.getName(), "."));
            return Integer.compare(i1, i2);
        });
        record(output, files, 544, 960);
    }

    /**
     * 将多个图片文件合成视频
     *
     * @param output
     * @param files
     * @param width
     * @param height
     * @throws Exception
     */
    public static void record(String output, List<File> files, int width, int height) throws Exception {
        FFmpegFrameRecorder recorder = new FFmpegFrameRecorder(output, width, height);
        recorder.setVideoCodec(avcodec.AV_CODEC_ID_H264);
        recorder.setFormat("mp4");
        recorder.setFrameRate(30);
        recorder.start();

        OpenCVFrameConverter.ToIplImage converter = new OpenCVFrameConverter.ToIplImage();
        for (File file : files) {
            try {
                IplImage image = opencv_imgcodecs.cvLoadImage(file.getPath());
                recorder.record(converter.convert(image));
                opencv_core.cvReleaseImage(image);
            } catch (Exception e) {
                System.out.println(file.getPath());
            }
        }
        recorder.stop();
        recorder.release();
    }

    /**
     * 从视频中将每一帧的图片提取出来
     *
     * @param video
     * @return
     * @throws FrameGrabber.Exception
     */
    public static List<BufferedImage> grab(File video) throws FrameGrabber.Exception {
        FFmpegFrameGrabber grabber = FFmpegFrameGrabber.createDefault(video.getPath());
        grabber.start();

        try {
            List<BufferedImage> images = Lists.newArrayList();
            Frame frame;
            while ((frame = grabber.grabImage()) != null) {
                images.add(Java2DFrameUtils.toBufferedImage(frame));
            }
            return images;
        } finally {
            grabber.stop();
        }
    }
```