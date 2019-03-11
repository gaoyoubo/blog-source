---
title: mysql5.x重置密码
tags:
  - 程序员
  - mysql
originContent: ''
categories:
  - 程序员
toc: false
date: 2019-03-11 14:28:19
---

This one is for all MySQL-DBA's, which are working on macOS. Since the Apple OS has a rather peculiar way of starting and stopping MySQL, compared to Linux, you can run into some issues. These problems occur especially, if you have no access to the GUI.

## PREPARATION
Put skip-grant-tables into the mysqld section of the my.cnf. A my.cnf can be found in /usr/local/mysql/support-files. You MUST work as root for all the following steps.

```shell
shell> sudo -s
shell> vi /usr/local/mysql/support-files/my-default.cnf

...
[mysqld]
skip-grant-tables
skip-networking
...
```
Save the configuration file! (In vi this is "[ESC] + :x")

Continue with stopping MySQL:

```shell
launchctl unload /Library/LaunchDaemons/com.oracle.oss.mysql.mysqld.plist
```
Restart MySQL, so skip-grant-tables becomes active:

```shell
launchctl load /Library/LaunchDaemons/com.oracle.oss.mysql.mysqld.plist
```

## RESET THE PASSWORD

After MySQL is started again, you can log into the CLI and reset the password:

```shell
shell> mysql -u root
mysql> FLUSH PRIVILEGES;
mysql> ALTER USER 'root'@'localhost' IDENTIFIED BY 'super-secret-password';
```

## PLAN B
If you are not capable of stopping MySQL in a civilised manner, you can use the more rough way. You can send a SIGTERM to the MySQL-Server:

```shell
shell> ps -aef | grep mysql | grep -v grep
   74 28017     1   0 Fri10AM ??         5:59.50 /usr/local/mysql/bin/mysqld --user=_mysql --basedir=/usr/local/mysql --datadir=/usr/local/mysql/data --plugin-dir=/usr/local/mysql/lib/plugin --log-error=/usr/local/mysql/data/mysqld.local.err --pid-file=/usr/local/mysql/data/mysqld.local.pid
```
You should receive one line. The second column from the left is the process id. Use this process id to stop the MySQL-Server.

```shell
shell> kill -15 [process id]
```
In this example, the command would look like this:

```shell
shell> kill -15 28017
```
macOS will restart MySQL, since the process has not stopped correctly. The configuration will be read and the changes to the parameters will become effective. Continue with logging in to the CLI.

## CONCLUSION
No matter how secure your MySQL-Password is, it is a lot more important to secure access to the server it self. If your server is not secured by something that prevents access from the internet, it will only take a few minutes for someone with bad intentions to take over your database or worse, the entire server.