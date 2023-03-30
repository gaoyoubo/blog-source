---
title: Java手撸HttpClient
tags:
  - Java
originContent: ''
categories:
  - 程序员
toc: false
date: 2023-03-30 14:19:41
---

先将代码贴上，后面再整理下

```java
import javax.net.ssl.SSLSocketFactory;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.Socket;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.util.UUID;

public class HttpTest {

    private static final String SPLIT = "\r\n";

    private static final String RAW_BODY = """
            豫章故郡，洪都新府。星分翼轸，地接衡庐。襟三江而带五湖，控蛮荆而引瓯越。物华天宝，龙光射牛斗之墟；人杰地灵，徐孺下陈蕃之榻。雄州雾列，俊采星驰。台隍枕夷夏之交，宾主尽东南之美。都督阎公之雅望，棨戟遥临；宇文新州之懿范，襜帷暂驻。十旬休假，胜友如云；千里逢迎，高朋满座。腾蛟起凤，孟学士之词宗；紫电青霜，王将军之武库。家君作宰，路出名区；童子何知，躬逢胜饯。
            时维九月，序属三秋。潦水尽而寒潭清，烟光凝而暮山紫。俨骖騑于上路，访风景于崇阿；临帝子之长洲，得天人之旧馆。层峦耸翠，上出重霄；飞阁流丹，下临无地。鹤汀凫渚，穷岛屿之萦回；桂殿兰宫，即冈峦之体势。
            披绣闼，俯雕甍，山原旷其盈视，川泽纡其骇瞩。闾阎扑地，钟鸣鼎食之家；舸舰弥津，青雀黄龙之舳。云销雨霁，彩彻区明。落霞与孤鹜齐飞，秋水共长天一色。渔舟唱晚，响穷彭蠡之滨；雁阵惊寒，声断衡阳之浦。
            遥襟甫畅，逸兴遄飞。爽籁发而清风生，纤歌凝而白云遏。睢园绿竹，气凌彭泽之樽；邺水朱华，光照临川之笔。四美具，二难并。穷睇眄于中天，极娱游于暇日。天高地迥，觉宇宙之无穷；兴尽悲来，识盈虚之有数。望长安于日下，目吴会于云间。地势极而南溟深，天柱高而北辰远。关山难越，谁悲失路之人？萍水相逢，尽是他乡之客。怀帝阍而不见，奉宣室以何年？
            嗟乎！时运不齐，命途多舛。冯唐易老，李广难封。屈贾谊于长沙，非无圣主；窜梁鸿于海曲，岂乏明时？所赖君子见机，达人知命。老当益壮，宁移白首之心？穷且益坚，不坠青云之志。酌贪泉而觉爽，处涸辙以犹欢。北海虽赊，扶摇可接；东隅已逝，桑榆非晚。孟尝高洁，空余报国之情；阮籍猖狂，岂效穷途之哭！
            勃，三尺微命，一介书生。无路请缨，等终军之弱冠；有怀投笔，慕宗悫之长风。舍簪笏于百龄，奉晨昏于万里。非谢家之宝树，接孟氏之芳邻。他日趋庭，叨陪鲤对；今兹捧袂，喜托龙门。杨意不逢，抚凌云而自惜；钟期既遇，奏流水以何惭？
            呜乎！胜地不常，盛筵难再；兰亭已矣，梓泽丘墟。临别赠言，幸承恩于伟饯；登高作赋，是所望于群公。敢竭鄙怀，恭疏短引；一言均赋，四韵俱成。请洒潘江，各倾陆海云尔：
            滕王高阁临江渚，佩玉鸣鸾罢歌舞。
            画栋朝飞南浦云，珠帘暮卷西山雨。
            闲云潭影日悠悠，物换星移几度秋。
            阁中帝子今何在？槛外长江空自流。\r
            \r
            """;

    public static void main(String[] args) throws Exception {
        for (int i = 0; i < 600; i++) {
            new Thread(() -> {
                try {
                    httpPostMultipartFormData(new File("/data/abc.png"));
                } catch (Exception e) {
                    throw new RuntimeException(e);
                }
            }).start();
        }
        System.out.println("线程启动成功");
    }

    private static void httpPostMultipartFormData(File file) throws Exception {
        String host = "172.20.103.88";
        String path = "/fuck/file2";
        int port = 8080;
        try (Socket client = newSocket(host, port);
             OutputStream os = client.getOutputStream();
             InputStream is = client.getInputStream()) {

            // 分隔符，分隔符前面必须加上--，否则不会被识别
            String boundary = UUID.randomUUID().toString().replace("-", "");

            byte[] data = writeFile(file, boundary);

            writeLine(os, "POST " + path + " HTTP/1.1");
            writeLine(os, "host:" + host + ":8080");
            writeLine(os, "Connection:keep-alive");
            writeLine(os, "Content-Type:multipart/form-data;boundary=" + boundary);
            writeLine(os, "Content-Length:" + data.length);
            writeLine(os, null);

            System.out.println("开始上传");
            // int c = 0;
            for (int i = 0; i < data.length; i++) {
                if (i != 0 && i % 100 == 0) {
                    Thread.sleep(8000L);
                    // c++;
                    // if (c == 3) {
                    //     client.close();
                    // }
                    System.out.println("睡一会儿..." + i);
                    os.flush();
                }
                os.write(data[i]);
            }
            os.flush();

            printResponse(is);
        }
    }

    private static byte[] writeFile(File file, String boundary) throws IOException {
        String mimeType = Files.probeContentType(file.toPath());

        ByteArrayOutputStream os = new ByteArrayOutputStream();
        writeLine(os, "--" + boundary);
        writeLine(os, "Content-Disposition: form-data; name=\"file\"; filename=\"abc.png\"");
        writeLine(os, "Content-Type: " + mimeType);
        writeLine(os, null);

        try (InputStream is = new FileInputStream(file)) {
            byte[] bytes = new byte[1024];
            int len;
            while ((len = is.read(bytes)) != -1) {
                os.write(bytes, 0, len);
            }
        }
        writeLine(os, null);
        writeLine(os, "--" + boundary + "--");
        return os.toByteArray();
    }

    // private static class MultipartFile {
    //     private String header;
    //     private String contentType;
    //     private File file;
    //     private String boundary;
    //
    //     public MultipartFile(File file) {
    //         this.file = file;
    //         this.header = buildHeader();
    //     }
    //
    //     private String buildHeader() {
    //         this.header = new StringBuilder()
    //                 .append("--" + boundary).append(SPLIT)
    //                 .append("Content-Disposition: form-data; name=\"file\"; filename=\"" + file.getName() + "\"").append(SPLIT)
    //                 .toString();
    //     }
    // }

    // private static void httpPostChunked(byte[] data, int segment) throws IOException {
    //     try (Socket client = newSocket("misc.test.com", 443);
    //          OutputStream os = client.getOutputStream();
    //          InputStream is = client.getInputStream()) {
    //
    //         writeLine(os, "POST /dump.htm HTTP/1.1");
    //         writeLine(os, "host:misc.test.com");
    //         writeLine(os, "Connection:close");
    //         writeLine(os, "Transfer-Encoding: chunked");
    //         writeLine(os, null);
    //
    //         int len = data.length / segment;
    //         for (int i = 0; i < segment; i++) {
    //             int size = len;
    //             if (i == segment - 1) {
    //                 size = data.length - (i * len);
    //             }
    //             writeLine(os, Integer.toString(size, 16));
    //             os.write(data, len * i, size);
    //             writeLine(os, null);
    //         }
    //         writeLine(os, "0");
    //         writeLine(os, null);
    //         printResponse(is);
    //     }
    // }

    private static void writeLine(OutputStream os, String str) throws IOException {
        byte[] data;
        if (str != null) {
            data = (str + SPLIT).getBytes(StandardCharsets.UTF_8);
        } else {
            data = SPLIT.getBytes(StandardCharsets.UTF_8);
        }
        os.write(data);
    }

    private static void httpPost(byte[] body) throws Exception {
        String host = "nginx-test.test.cn";
        // String path = "/test/file.htm";
        // String path = "/fuck/file2";
        String path = "/api/test/sleep.htm?ms=100";
        int port = 8080;

        try (Socket client = newSocket(host, port);
             OutputStream os = client.getOutputStream();
             InputStream is = client.getInputStream()) {
            writeLine(os, "POST " + path + " HTTP/1.1");
            writeLine(os, "host:" + host);
            writeLine(os, "Connection:close");
            writeLine(os, "Content-Type:text/plain;charset=utf-8");
            writeLine(os, "Content-Length:" + body.length);
            writeLine(os, null);
            os.flush();

            System.out.println("开始上传");
            for (int i = 0; i < body.length; i++) {
                if (i != 0 && i % 100 == 0) {
                    Thread.sleep(300L);
                    System.out.println("睡一会儿..." + i);
                    os.flush();
                }
                os.write(body[i]);
            }
            os.flush();
            // os.write(body);

            printResponse(is);
        }
    }


    private static Socket newSocket(String host, int port) {
        try {
            if (port == 443) {
                return SSLSocketFactory.getDefault().createSocket(host, port);
            } else {
                return new Socket(host, port);
            }
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    private static void printResponse(InputStream is) throws IOException {
        System.out.println("\n-----输出内容-----\n");
        int length;
        byte[] buffer = new byte[1024];
        while ((length = is.read(buffer)) != -1) {
            System.out.print(new String(buffer, 0, length));
        }
    }
}
```

