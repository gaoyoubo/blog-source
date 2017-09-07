title: nginx-clojure安装使用
author: 雾非雾的情思
abbrlink: 3377491805
tags:
  - Nginx
  - 程序员
categories: []
date: 2016-04-20 00:00:00
---
## 安装配置

### 环境要求
	jdk1.6+
	nginx1.4+

### 安装
下载nginx和nginx-clojure源码，分别去他们的官网下载就可以，然后将他们解压、编译、安装。编译安装nginx时，加上nginx-clojure模块，具体安装脚本如下：
```shell
./configure --prefix=/usr/local/nginx --add-module=nginx-clojure模块解压路径
make
sudo make install
```

### 配置

    ### 建议这里查看官方文档，比较详细
    ### 官方文档地址：http://nginx-clojure.github.io/configuration.html#21-jvm-path--class-path--other-jvm-options
    jvm_path auto;
    # classpath：需要加载nginx-clojure自己的jar包，并加载自己开发的jar包
    jvm_classpath "/usr/local/nginx/libs/nginx-clojure-0.4.4/jars/*:/Users/gaoyoubo/work/dianping-service/dianping-nginx/target/dianping-nginx-2.0.1-SNAPSHOT.jar";

## 使用

### rewrite handler
> rewrite handler可用于请求的转发。

#### Java handler类

```java
package my.test;

import static nginx.clojure.java.Constants.*;

public static class MyRewriteProxyPassHandler implements NginxJavaRingHandler {
	@Override
		public Object[] invoke(Map<String, Object> req) {
		String myhost = computeMyHost(req);
		((NginxJavaRequest)req).setNGXVariable("myhost", myhost);
		return PHASE_DONE;
	}

	private String computeMyHost(Map<String, Object> req) {
		//compute a upstream name or host name;
	}
}
```

#### nginx.conf配置
    set $myhost "";
	location /myproxy {
	    ### 这里指定handle_type
		rewrite_handler_type 'java';
		### 这里指定处理类
		rewrite_handler_name 'my.test.MyRewriteProxyPassHandler';
		proxy_pass $myhost;
	} 

### access handler
> 可做请求的权限校验

#### Java handler类
```java
/**
     * This is an  example of HTTP basic Authentication.
     * It will require visitor to input a user name (xfeep) and password (hello!) 
     * otherwise it will return 401 Unauthorized or BAD USER & PASSWORD 
     */
    public  class BasicAuthHandler implements NginxJavaRingHandler {

        @Override
        public Object[] invoke(Map<String, Object> request) {
            String auth = (String) ((Map)request.get(HEADERS)).get("authorization");
            if (auth == null) {
                return new Object[] { 401, ArrayMap.create("www-authenticate", "Basic realm=\"Secure Area\""),
                        "<HTML><BODY><H1>401 Unauthorized.</H1></BODY></HTML>" };
            }
            String[] up = new String(DatatypeConverter.parseBase64Binary(auth.substring("Basic ".length())), DEFAULT_ENCODING).split(":");
            if (up[0].equals("xfeep") && up[1].equals("hello!")) {
                return PHASE_DONE;
            }
            return new Object[] { 401, ArrayMap.create("www-authenticate", "Basic realm=\"Secure Area\""),
            "<HTML><BODY><H1>401 Unauthorized BAD USER & PASSWORD.</H1></BODY></HTML>" };
        } 
    }
```
#### nginx.conf配置
	location /basicAuth {
		access_handler_type 'java';
		access_handler_name 'my.BasicAuthHandler';
		....
	}

### header filter
> 可拦截头信息，并作出相应的处理

#### Java handler类
```java
package my;

import nginx.clojure.java.NginxJavaRingHandler;
import nginx.clojure.java.Constants;

public  class RemoveAndAddMoreHeaders implements NginxJavaHeaderFilter {
	@Override
		public Object[] doFilter(int status, Map<String, Object> request, Map<String, Object> responseHeaders) {
		responseHeaders.remove("Content-Type");
		responseHeaders.put("Content-Type", "text/html");
		responseHeaders.put("Xfeep-Header", "Hello2!");
		responseHeaders.put("Server", "My-Test-Server");
		return Constants.PHASE_DONE;
	}
}
```

#### nginx.conf配置
    location /javafilter {
    	header_filter_type 'java';
    	header_filter_name 'my.RemoveAndAddMoreHeaders ';
    	..................
    }

### body filter
> 可修改返回数据

#### Java handler类
```java
public static class StringFacedUppercaseBodyFilter extends StringFacedJavaBodyFilter {
	@Override
		protected Object[] doFilter(Map<String, Object> request, String body, boolean isLast) throws IOException {
		if (isLast) {
			return new Object[] {200, null, body.toUpperCase()};
		}else {
			return new Object[] {null, null, body.toUpperCase()};
		}
	}
}
```

#### nginx.conf配置
    location /hello {
      body_filter_type java;
      body_filter_name mytest.StringFacedUppercaseBodyFilter;
    }


## 更多使用场景
> nginx-clojure能够获取和修改请求数据、响应数据、header信息等（基本上java servlet中能够获取和修改的数据，他也都能获取和修改），所以基于他，我们能够完成很多servlet能够完成的数据，甚至他能够连接mysql，redis等。

### 可操作的请求数据
	Server port
	Server-name
	Remote addr
	Uri
	Query String
	Scheme
	Request-method
	Protocol
	Content type
	Content length
	Character encoding
	Headers
	Body 

### 可操作的相应数据
	Status
	Headers
	Body 
