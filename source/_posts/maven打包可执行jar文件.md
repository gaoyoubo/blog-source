---
title: maven打包可执行jar文件
tags:
  - 程序员
categories:
  - 程序员
toc: false
date: 2017-03-27 00:00:00
---

需要打包有依赖第三方jar包的可执行jar会用到，他会帮你将所有的第三方的jar包都打到同一个jar中，这样就不用手动去设置classpath
```xml
    <build>
        <plugins>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-shade-plugin</artifactId>
                <version>1.2.1</version>
                <executions>
                    <execution>
                        <phase>package</phase>
                        <goals>
                            <goal>shade</goal>
                        </goals>
                        <configuration>
                            <transformers>
                                <transformer
                                        implementation="org.apache.maven.plugins.shade.resource.ManifestResourceTransformer">
                                    <mainClass>cn.mucang.saturn.transfer.Transfer</mainClass>
                                </transformer>
                            </transformers>
                        </configuration>
                    </execution>
                </executions>
            </plugin>
        </plugins>
    </build>
```