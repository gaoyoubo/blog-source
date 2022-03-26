---
title: 使用certbot申请https证书
tags: []
originContent: ''
categories: []
toc: false
date: 2022-03-26 10:26:55
---

我的博客图片放在阿里云的oss，oss绑定域名的https证书过期很久了，之前一直懒得弄，周末抽时间弄一下，证书是使用certbot申请的，步骤如下：

```
➜  ~ sudo certbot certonly --manual --preferred-challenges=dns-01 --server=https://acme-v02.api.letsencrypt.org/directory

Saving debug log to /var/log/letsencrypt/letsencrypt.log
Please enter the domain name(s) you would like on your certificate (comma and/or
space separated) (Enter 'c' to cancel): file.mspring.org
Requesting a certificate for file.mspring.org

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Please deploy a DNS TXT record under the name:

_acme-challenge.file.mspring.org.

with the following value:

eyCcqOYGl7KWxr-mGpp7Y77j6iEV-rC0dXyq8-LnL3k

Before continuing, verify the TXT record has been deployed. Depending on the DNS
provider, this may take some time, from a few seconds to multiple minutes. You can
check if it has finished deploying with aid of online tools, such as the Google
Admin Toolbox: https://toolbox.googleapps.com/apps/dig/#TXT/_acme-challenge.file.mspring.org.
Look for one or more bolded line(s) below the line ';ANSWER'. It should show the
value(s) you've just added.

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Press Enter to Continue

Successfully received certificate.
Certificate is saved at: /etc/letsencrypt/live/file.mspring.org-0001/fullchain.pem
Key is saved at:         /etc/letsencrypt/live/file.mspring.org-0001/privkey.pem
This certificate expires on 2022-06-24.
These files will be updated when the certificate renews.

NEXT STEPS:
- This certificate will not be renewed automatically. Autorenewal of --manual certificates requires the use of an authentication hook script (--manual-auth-hook) but one was not provided. To renew this certificate, repeat this same certbot command before the certificate's expiry date.

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
If you like Certbot, please consider supporting our work by:
 * Donating to ISRG / Let's Encrypt:   https://letsencrypt.org/donate
 * Donating to EFF:                    https://eff.org/donate-le
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
```

