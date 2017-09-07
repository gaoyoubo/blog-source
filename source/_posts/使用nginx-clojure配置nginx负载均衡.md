title: 使用nginx-clojure配置nginx负载均衡
author: 雾非雾的情思
abbrlink: 3466465886
tags:
  - Nginx
  - 程序员
categories: []
date: 2016-04-19 00:00:00
---
## 使用背景
> 最近遇到一个很困扰的问题，系统请求量变大了一台服务器已经扛不住了。于是我基于mq升级了我的服务，让我的服务能够支持横向扩展，通过mq服务完成各节点之间的通信。于是我们将服务部署到两个节点上，然后通过nginx随机将请求平均分发到两个节点。那么问题来了，在随机分发到两个节点之后服务器的CPU占用有所下降，但是内存占用却没有降下来。于是我们分析了一下原因，因为是随机分发，那么同一条数据请求两台服务器都会随机到，那么在这两台服务器上就会有相同的数据缓存，那么这样就会造成内存的浪费。于是我们就想办法根据请求的参数进行分发，保证同一条数据请求只会到同一台服务器。
>开始时我们用到了consistent_hash，但是我们客户端请求不规范有有些参数是放在POST请求中的，consistent_hash是无法根据POST请求中的参数进行hash，然后分发。于是在网上搜索了很多资料，直到我找到了nginx-clojure。选nginx-clojure是因为他可以用我熟悉的语言写插件：Java。
安装配置

### 安装nginx-clojure插件

下载nginx和nginx-clojure源码，分别去他们的官网下载就可以，然后将他们解压、编译、安装。脚本如下：
```shell
./configure --prefix=/usr/local/nginx --add-module=nginx-clojure安装模块
make
sudo make install
```
### 配置nginx-clojure
在nginx.conf中
```
### 建议这里查看官方文档，比较详细
### 官方文档地址：http://nginx-clojure.github.io/configuration.html#21-jvm-path--class-path--other-jvm-options
jvm_path auto;
# 这个是classpath需要用到的jar包都需要加入到classpath中。
jvm_classpath "/usr/local/nginx/libs/nginx-clojure-0.4.4/jars/*:/Users/gaoyoubo/work/dianping-service/dianping-nginx/target/dianping-nginx-2.0.1-SNAPSHOT.jar";
```

### 配置自己的location
```
set $node "";
location / {
    # 加上他会读取POST请求数据，不需要的时候建议关掉
    always_read_body on;
    # handler类型，nginx-clojure支持三种：clojure、groovy、java，这里主要讲解java
    rewrite_handler_type 'java';
    # 这里是处理类
    rewrite_handler_name 'cn.mucang.dianping.nginx.DianpingRewriteHandler';
    proxy_pass $node;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP   $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
}
```

### 编写处理类
```java
package cn.mucang.dianping.nginx;

import nginx.clojure.NativeInputStream;
import nginx.clojure.NginxClojureRT;
import nginx.clojure.java.Constants;
import nginx.clojure.java.NginxJavaRequest;
import nginx.clojure.java.NginxJavaRingHandler;
import org.apache.commons.collections.MapUtils;
import org.apache.commons.io.IOUtils;
import org.apache.commons.lang3.StringUtils;

import java.io.IOException;
import java.net.URLDecoder;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

/**
 * @author Gao Youbo
 * @since 2016-03-17 15:02
 */
public class DianpingRewriteHandler implements NginxJavaRingHandler {
    public static final String KEY_URI = "uri";
    public static final String KEY_BODY = "body";
    public static final String KEY_REQUEST_METHOD = "request-method";
    public static final String KEY_QUERY_STRING = "query-string";
    public static final String ENCODING = "UTF-8";

    public static final Map NODES = new HashMap();
    public static final int NODE_SIZE = 2;
    public static final String MASTER_NODE = "node1";
    public static final String SALVE_NODE = "node2";

    private static final Random R = new Random();

    static {
        NODES.put(0, MASTER_NODE);
        NODES.put(1, SALVE_NODE);
    }

    public Object[] invoke(Map requestMap) throws IOException {
        long start = System.currentTimeMillis();
        Map params = getParams(requestMap);   // 所有的请求参数包括GET和POST
        String node = getNode(requestMap);

        NginxJavaRequest request = (NginxJavaRequest) requestMap;
        request.setVariable("node", normalizeNode(node));

        long elasped = System.currentTimeMillis() - start;
        NginxClojureRT.log.info(String.format("[gaoyoubo] elasped:%s ms, node=%s, uri:%s, elasped, node, uri));

        return Constants.PHASE_DONE;
    }

    /**
     * 计算当前请求应该走哪个节点
     *
     * @param requestMap
     * @return
     */
    private String getNode(Map requestMap) {
        // 业务逻辑
    }

    private String normalizeNode(String node) {
        return "http://" + node;
    }

    /**
     * 获取请求参数, 包括GET和POST
     *
     * @param requestMap
     * @return
     */
    private Map getParams(Map requestMap) {
        Map params = new HashMap<>();
        try {
            params.putAll(getGetParams(requestMap));
            params.putAll(getPostParams(requestMap));
        } catch (Exception e) {
            NginxClojureRT.log.error("获取请求参数失败", e);
        }
        return params;
    }

    /**
     * 获取GET请求参数
     *
     * @param requestMap
     * @return
     */
    private Map getGetParams(Map requestMap) {
        String queryString = MapUtils.getString(requestMap, KEY_QUERY_STRING);
        return buildQuerys(queryString);
    }

    /**
     * 获取POST请求参数
     *
     * @param requestMap
     * @return
     */
    private Map getPostParams(Map requestMap) throws IOException {
        String requestMethod = MapUtils.getString(requestMap, KEY_REQUEST_METHOD);
        if (StringUtils.equalsIgnoreCase(requestMethod, "POST")) { // 如果是POST请求,那么处理下POST参数
            Object bodyObj = requestMap.get(KEY_BODY);
            if (bodyObj != null) {
                NativeInputStream nis = (NativeInputStream) bodyObj;
                String body = IOUtils.toString(nis, ENCODING);
                return buildQuerys(body);
            }
        }
        return new HashMap<>();
    }

    /**
     * 将字符串格式的参数转换成Map
     *
     * @param queryString
     * @return
     */
    private Map buildQuerys(String queryString) {
        Map params = new HashMap<>();
        if (StringUtils.isBlank(queryString)) {
            return params;
        }
        String[] kvs = queryString.split("&");
        if (kvs != null) {
            for (String kv : kvs) {
                String[] pair = kv.split("\\=", 2);
                if (pair.length == 2) {
                    params.put(pair[0], urlDecode(pair[1], ENCODING));
                }
            }
        }
        return params;
    }

    private String urlDecode(String s, String encoding) {
        try {
            return URLDecoder.decode(s, encoding);
        } catch (Exception ex) {
            NginxClojureRT.log.error(null, ex);
        }
        return s;
    }
}
```