---
title: JavaCV分享
tags:
  - Java
  - JavaCV
originContent: >
  ## JavaCV是什么

  > JavaCV
  是一款开源的视觉处理库，基于GPLv2协议，对各种常用计算机视觉库封装后的一组jar包，封装了OpenCV、ffmpeg、videoInput...等计算机视觉编程人员常用库的接口。


  ![](http://file.mspring.org/images/blog/88730fba3d24588aa3747c56c3fa40a9)



  ## maven引用

  ```xml

  <properties>
      <javacpp.version>1.4.2</javacpp.version>
      <!-- 这里要根据自己的平台选择不同的依赖 -->
      <!--<javacpp.platform.dependencies>linux-x86_64</javacpp.platform.dependencies>-->
      <javacpp.platform.dependencies>macosx-x86_64</javacpp.platform.dependencies>
  </properties>

  <dependencies>
          <dependency>
              <groupId>org.bytedeco</groupId>
              <artifactId>javacv</artifactId>
              <version>${javacpp.version}</version>
              <exclusions>
                  <exclusion>
                      <groupId>org.bytedeco.javacpp-presets</groupId>
                      <artifactId>*</artifactId>
                  </exclusion>
              </exclusions>
          </dependency>
          <dependency>
              <groupId>org.bytedeco.javacpp-presets</groupId>
              <artifactId>opencv</artifactId>
              <version>3.4.2-${javacpp.version}</version>
          </dependency>
          <dependency>
              <groupId>org.bytedeco.javacpp-presets</groupId>
              <artifactId>ffmpeg</artifactId>
              <version>4.0.1-${javacpp.version}</version>
          </dependency>
          <dependency>
              <groupId>org.bytedeco.javacpp-presets</groupId>
              <artifactId>ffmpeg</artifactId>
              <version>4.0.1-${javacpp.version}</version>
              <classifier>${javacpp.platform.dependencies}</classifier>
          </dependency>
      </dependencies>
  ```


  ## 提取视频中的图片

  ```java
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
  ```


  ## 图片合成视频

  ```java

  private static class VideoRecorder implements Closeable {
          private FFmpegFrameRecorder recorder;

          public VideoRecorder(String output, int width, int height) throws FrameRecorder.Exception {
              recorder = new FFmpegFrameRecorder(output, width, height);
              recorder.setVideoCodec(avcodec.AV_CODEC_ID_H264);
              recorder.setFormat("mp4");
              recorder.setFrameRate(FPS);
              recorder.setAudioBitrate(192000);
              recorder.setSampleRate(44100);
              recorder.setAudioChannels(2);
              recorder.start();
          }

          public void addFrame(BufferedImage image) throws FrameRecorder.Exception {
              Frame frame = Java2DFrameUtils.toFrame(image);
              recorder.record(frame, avutil.AV_PIX_FMT_ARGB);
          }

          public void addAudio(File audioFile) throws FrameGrabber.Exception, FrameRecorder.Exception {
              if (audioFile == null || !audioFile.exists()) {
                  return;
              }
              try (FFmpegFrameGrabber grabber = FFmpegFrameGrabber.createDefault(audioFile)) {
                  grabber.start();
                  Frame frame;
                  while ((frame = grabber.grabSamples()) != null) {
                      recorder.recordSamples(frame.sampleRate, frame.audioChannels, frame.samples);
                  }
              }
          }

          @Override
          public void close() throws IOException {
              recorder.close();
          }
      }
  ```
categories:
  - 程序员
toc: false
date: 2018-09-06 19:43:52
---

## JavaCV是什么
> JavaCV 是一款开源的视觉处理库，基于GPLv2协议，对各种常用计算机视觉库封装后的一组jar包，封装了OpenCV、ffmpeg、videoInput...等计算机视觉编程人员常用库的接口。

![](http://file.mspring.org/images/blog/88730fba3d24588aa3747c56c3fa40a9)


## maven引用
```xml
<properties>
    <javacpp.version>1.4.2</javacpp.version>
    <!-- 这里要根据自己的平台选择不同的依赖 -->
    <!--<javacpp.platform.dependencies>linux-x86_64</javacpp.platform.dependencies>-->
    <javacpp.platform.dependencies>macosx-x86_64</javacpp.platform.dependencies>
</properties>
<dependencies>
        <dependency>
            <groupId>org.bytedeco</groupId>
            <artifactId>javacv</artifactId>
            <version>${javacpp.version}</version>
            <exclusions>
                <exclusion>
                    <groupId>org.bytedeco.javacpp-presets</groupId>
                    <artifactId>*</artifactId>
                </exclusion>
            </exclusions>
        </dependency>
        <dependency>
            <groupId>org.bytedeco.javacpp-presets</groupId>
            <artifactId>opencv</artifactId>
            <version>3.4.2-${javacpp.version}</version>
        </dependency>
        <dependency>
            <groupId>org.bytedeco.javacpp-presets</groupId>
            <artifactId>ffmpeg</artifactId>
            <version>4.0.1-${javacpp.version}</version>
        </dependency>
        <dependency>
            <groupId>org.bytedeco.javacpp-presets</groupId>
            <artifactId>ffmpeg</artifactId>
            <version>4.0.1-${javacpp.version}</version>
            <classifier>${javacpp.platform.dependencies}</classifier>
        </dependency>
    </dependencies>
```

## 提取视频中的图片
```java
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
```

## 图片合成视频
```java
private static class VideoRecorder implements Closeable {
        private FFmpegFrameRecorder recorder;

        public VideoRecorder(String output, int width, int height) throws FrameRecorder.Exception {
            recorder = new FFmpegFrameRecorder(output, width, height);
            recorder.setVideoCodec(avcodec.AV_CODEC_ID_H264);
            recorder.setFormat("mp4");
            recorder.setFrameRate(FPS);
            recorder.setAudioBitrate(192000);
            recorder.setSampleRate(44100);
            recorder.setAudioChannels(2);
            recorder.start();
        }

        public void addFrame(BufferedImage image) throws FrameRecorder.Exception {
            Frame frame = Java2DFrameUtils.toFrame(image);
            recorder.record(frame, avutil.AV_PIX_FMT_ARGB);
        }

        public void addAudio(File audioFile) throws FrameGrabber.Exception, FrameRecorder.Exception {
            if (audioFile == null || !audioFile.exists()) {
                return;
            }
            try (FFmpegFrameGrabber grabber = FFmpegFrameGrabber.createDefault(audioFile)) {
                grabber.start();
                Frame frame;
                while ((frame = grabber.grabSamples()) != null) {
                    recorder.recordSamples(frame.sampleRate, frame.audioChannels, frame.samples);
                }
            }
        }

        @Override
        public void close() throws IOException {
            recorder.close();
        }
    }
```
