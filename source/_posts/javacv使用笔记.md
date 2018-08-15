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

import com.google.common.collect.Lists;
import org.apache.commons.io.FileUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.math.NumberUtils;
import org.bytedeco.javacpp.avcodec;
import org.bytedeco.javacpp.opencv_core;
import org.bytedeco.javacpp.opencv_imgcodecs;
import org.bytedeco.javacv.*;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;
import java.util.Collections;
import java.util.List;

/**
 * @author Gao Youbo
 * @since 2018-08-15 16:43
 */
public class OpenCVUtils {
    public static void main(String[] args) throws Exception {
        List<BufferedImage> images = grab(new File("/data/opencv/test.mp4"));
        int i = 1;
        for (BufferedImage image : images) {
            ImageIO.write(image, "jpg", new File("/data/opencv/frame/" + i + ".jpg"));
            i++;
        }

        // grabAudioFromVideo(new File("/data/opencv/test.mp4"), new File("/data/opencv/test.aac"));

        List<File> files = Lists.newArrayList(FileUtils.listFiles(new File("/data/opencv/frame/"), new String[]{"jpg"}, false));
        Collections.sort(files, (o1, o2) -> {
            int i1 = NumberUtils.toInt(StringUtils.substringBefore(o1.getName(), "."));
            int i2 = NumberUtils.toInt(StringUtils.substringBefore(o2.getName(), "."));
            return Integer.compare(i1, i2);
        });
        record("/data/opencv/out.mp4", files, new File("/data/opencv/test.aac"), 544, 960);
    }

    /**
     * 将多个图片文件合成视频
     *
     * @param output    输出文件
     * @param images    序列帧图片
     * @param audioFile 音频
     * @param width     宽
     * @param height    高
     * @throws Exception
     */
    public static void record(String output, List<File> images, File audioFile, int width, int height) throws Exception {
        try (FFmpegFrameRecorder recorder = new FFmpegFrameRecorder(output, width, height);
             FFmpegFrameGrabber grabber = FFmpegFrameGrabber.createDefault(audioFile)) {
            recorder.setVideoCodec(avcodec.AV_CODEC_ID_H264);
            recorder.setFormat("mp4");
            recorder.setFrameRate(30);
            recorder.setAudioBitrate(192000);
            recorder.setAudioQuality(0);
            recorder.setSampleRate(44100);
            recorder.setAudioChannels(2);
            recorder.start();

            OpenCVFrameConverter.ToIplImage converter = new OpenCVFrameConverter.ToIplImage();
            for (File file : images) {
                opencv_core.IplImage image = opencv_imgcodecs.cvLoadImage(file.getPath());
                recorder.record(converter.convert(image));
                opencv_core.cvReleaseImage(image);
            }

            grabber.start();
            Frame frame;
            while ((frame = grabber.grabSamples()) != null) {
                recorder.setTimestamp(frame.timestamp);
                recorder.recordSamples(frame.sampleRate, frame.audioChannels, frame.samples);
            }
        }
    }

    /**
     * 从视频中将每一帧的图片提取出来
     *
     * @param video
     * @return
     * @throws FrameGrabber.Exception
     */
    public static List<BufferedImage> grab(File video) throws Exception {
        try (FFmpegFrameGrabber grabber = FFmpegFrameGrabber.createDefault(video.getPath())) {
            grabber.start();

            List<BufferedImage> images = Lists.newArrayList();
            Frame frame;
            while ((frame = grabber.grabImage()) != null) {
                images.add(Java2DFrameUtils.toBufferedImage(frame));
            }
            return images;
        }
    }

    /**
     * 从视频中提取出音频
     *
     * @param video
     * @param outputAudio
     */
    public static void grabAudioFromVideo(File video, File outputAudio) throws Exception {
        try (FFmpegFrameGrabber grabber = FFmpegFrameGrabber.createDefault(video);
             FFmpegFrameRecorder recorder = new FFmpegFrameRecorder(outputAudio, 1)) {
            grabber.start();
            recorder.setAudioCodec(avcodec.AV_CODEC_ID_AAC);
            recorder.start();

            Frame frame;
            while ((frame = grabber.grab()) != null) {
                if (frame.audioChannels == 1) {
                    recorder.recordSamples(frame.sampleRate, frame.audioChannels, frame.samples);
                }
            }
        }
    }

}

```