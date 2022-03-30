---
title: Ipv4地址段匹配
tags:
  - Java
originContent: ''
categories:
  - 程序员
toc: false
date: 2022-03-30 16:21:25
---

```java
public class IpMatcher {
    public static boolean matchIPV4(String ip, String cidr) {
        String[] ips = ip.split("\\.");
        if (ips.length != 4) {
            return false;
        }
        int ipAddr = (Integer.parseInt(ips[0]) << 24)
                | (Integer.parseInt(ips[1]) << 16)
                | (Integer.parseInt(ips[2]) << 8) | Integer.parseInt(ips[3]);
        int type = Integer.parseInt(cidr.replaceAll(".*/", ""));
        int mask = 0xFFFFFFFF << (32 - type);
        String cidrIp = cidr.replaceAll("/.*", "");
        String[] cidrIps = cidrIp.split("\\.");
        int cidrIpAddr = (Integer.parseInt(cidrIps[0]) << 24)
                | (Integer.parseInt(cidrIps[1]) << 16)
                | (Integer.parseInt(cidrIps[2]) << 8)
                | Integer.parseInt(cidrIps[3]);
        return (ipAddr & mask) == (cidrIpAddr & mask);
    }

    public static void main(String[] args) {
        System.out.println(matchIPV4("172.16.0.1", "172.16.0.0/20"));
    }
}
```

