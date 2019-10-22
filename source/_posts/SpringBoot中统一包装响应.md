---
title: SpringBoot中统一包装响应
tags:
  - springboot
originContent: ''
categories:
  - 程序员
toc: false
date: 2019-10-22 16:35:08
---

SpringBoot 中可以基于 `ControllerAdvice` 和 `HttpMessageConverter` 实现对数据返回的包装。

实现如下，先来写一个 `POJO` 来定义一下返回格式：

```java
import com.example.demo.common.exception.base.ErrorCode;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public class Response<T> {

    private int code = HttpStatus.OK.value();

    private String msg = "success";

    private T data;

    public Response(T data) {
        this.data = data;
    }

    public Response(int code, String msg) {
        this.code = code;
        this.msg = msg;
    }

    public Response(int code, T data) {
        this.code = code;
        this.data = data;
    }

    public Response(ErrorCode errorCode) {
        this.code = errorCode.getCode();
        this.msg = errorCode.getMessage();
    }

    public Response(ErrorCode errorCode, T data) {
        this.code = errorCode.getCode();
        this.msg = errorCode.getMessage();
        this.data = data;
    }
}
```

> 这里用到了`lombok`，`lombok`的使用介绍不在本文范围内。

用一个 `ResponseBodyAdvice` 类的实现包装 `Controller` 的返回值：

以下是我以前的实现方式：

```java
import com.example.demo.common.RequestContextHolder;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.MethodParameter;
import org.springframework.core.annotation.Order;
import org.springframework.http.MediaType;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseBodyAdvice;

@ControllerAdvice
public class FormatResponseBodyAdvice implements ResponseBodyAdvice {
    private static Logger logger = LoggerFactory.getLogger(FormatResponseBodyAdvice.class);

    @Autowired
    private ObjectMapper objectMapper;

    @Override
    public boolean supports(MethodParameter returnType, Class converterType) {
        return true;
    }

    @Override
    public Object beforeBodyWrite(Object body, MethodParameter returnType, MediaType selectedContentType, Class selectedConverterType, ServerHttpRequest request, ServerHttpResponse response) {

        Object wrapperBody = body;
        try {
            if (!(body instanceof Response)) {
                if (body instanceof String) {
                    wrapperBody = objectMapper.writeValueAsString(new Response<>(body));
                } else {
                    wrapperBody = new Response<>(body);
                }
            }
        } catch (Exception e) {
            logger.error("request uri path: {}, format response body error", request.getURI().getPath(), e);
        }
        return wrapperBody;
    }

}
```

为什么要对返回类型是 `String` 时进行特殊处理呢？因为如果直接返回 `new Response<>(body)` 的话，在使用时返回 `String` 类型的话，会报类型转换异常，当时也没有理解什么原因导致的，所以最后使用了 `jackson` 对 `Response` 又做了一次序列化。

今天找到了导致这个异常的原因：

> 因为在所有的 `HttpMessageConverter` 实例集合中，`StringHttpMessageConverter` 要比其它的 `Converter` 排得靠前一些。我们需要将处理 `Object` 类型的 `HttpMessageConverter` 放得靠前一些，这可以在 `Configuration` 类中完成：

```java
import org.springframework.context.annotation.Configuration;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.List;

@Configuration
public class WebConfiguration implements WebMvcConfigurer {

    @Override
    public void configureMessageConverters(List<HttpMessageConverter<?>> converters) {
        converters.add(0, new MappingJackson2HttpMessageConverter());
    }
}
```

然后 `FormatResponseBodyAdvice` 就可以修改为如下实现：

```java
import org.springframework.core.MethodParameter;
import org.springframework.http.MediaType;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.http.server.ServletServerHttpRequest;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseBodyAdvice;


@ControllerAdvice
public class FormatResponseBodyAdvice implements ResponseBodyAdvice {

    @Override
    public boolean supports(MethodParameter returnType, Class converterType) {
        return true;
    }

    @Override
    public Object beforeBodyWrite(Object body, MethodParameter returnType, MediaType selectedContentType,
                                  Class selectedConverterType, ServerHttpRequest request, ServerHttpResponse response) {

        if (!(body instanceof Response)) {
            return new Response<>(body);
        }

        return body;

    }
}
```

比之前的实现方式优雅了很多而且不用再处理 `jackson` 的异常了。

写一个 `Controller` 来尝试一下：

```java
@RestController
public class HelloController {

    @GetMapping("/hello")
    public String hello() {
        return "hello world!";
    }

}
```

请求这个端点得到结果：

```json
{
    "code": 200,
    "msg": "success",
    "data": "hello world!"
}
```

说明我们的配置是成功的，同时可以在相应头中看到：

```text
content-type: application/json;charset=UTF-8
```

如果是之前的实现方式，这里的值就是：

```text
content-type: html/text
```

也不太符合 `restful` 规范。


转载自：https://jpanj.com/2018/SpringBoot-%E4%B8%AD%E7%BB%9F%E4%B8%80%E5%8C%85%E8%A3%85%E5%93%8D%E5%BA%94/