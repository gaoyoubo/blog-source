---
title: ffmpeg常用命令总结
tags:
  - 程序员
  - ffmpeg
categories:
  - 程序员
toc: false
date: 2018-05-11 18:20:37
---

## 音频格式转换
```
ffmpeg -y  -i aidemo.mp3  -acodec pcm_s16le -f s16le -ac 1 -ar 16000 16k.pcm 

// -acodec pcm_s16le pcm_s16le 16bits 编码器 
// -f s16le 保存为16bits pcm格式
// -ac 1 单声道
//  -ar 16000  16000采样率
```

## 查看音频格式
```
ffprobe -v quiet -print_format json -show_streams  aidemo.mp3

输出如下：
 {
    "streams": [
        {
            "index": 0,
            "codec_name": "mp3", // mp3 格式
            "codec_long_name": "MP3 (MPEG audio layer 3)",
            "codec_type": "audio",
            "codec_time_base": "1/16000", 
            "codec_tag_string": "[0][0][0][0]",
            "codec_tag": "0x0000",
            "sample_fmt": "s16p", 
            "sample_rate": "16000", // 16000采样率
            "channels": 1, // 单声道
            "channel_layout": "mono",
            "bits_per_sample": 0,
            "r_frame_rate": "0/0",
            "avg_frame_rate": "0/0",
            "time_base": "1/14112000",
            "start_pts": 0,
            "start_time": "0.000000",
            "duration_ts": 259096320,
            "duration": "18.360000",
            "bit_rate": "16000",
            "disposition": {
                "default": 0,
                "dub": 0,
                "original": 0,
                "comment": 0,
                "lyrics": 0,
                "karaoke": 0,
                "forced": 0,
                "hearing_impaired": 0,
                "visual_impaired": 0,
                "clean_effects": 0,
                "attached_pic": 0,
                "timed_thumbnails": 0
            }
        }
    ]
}

```