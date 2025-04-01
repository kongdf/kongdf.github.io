---
title:  记一次破解够快云库文档
description: 获取够快云库解压密码
published: 2026-02-26
tags: [破解, 逆向, 够快云库]
category: 破解
draft: false 
---

## 简单介绍

够快云库里的部分文档支持直接下载，但下载后的文件是加密的，打开需要密码。
经过简单分析，发现前端使用 `pdf.js` 预览，密码校验逻辑暴露在前端，可直接逆向得到明文密码。

## 开搞

### 1. 抓包 & 查看前端代码

先打开文档页面：
https://yk3.gokuai.com/file/xg3fd32zjywouaovrnz3a44l4uiti4j7

打开控制台，看到页面是用 **pdf.js** 做的在线预览。
直接审查元素，在相关脚本里找到了前端加密逻辑和配置信息。

### 2. 关键加密代码

核心加密函数如下：

```js
function encrypt(password, filehash) {
    var key = CryptoJS.enc.Utf8.parse(CryptoJS.MD5(filehash));
    var iv = CryptoJS.enc.Utf8.parse(filehash.substring(0, 16));
    var encrypt = CryptoJS.AES.encrypt(password, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    return encrypt.toString();
}
```

页面里给出的配置：
```js
var server = {"url":"https://xdf-storage.gokuai.com","path":"/m-doc","query":{"filehash":"815bb9f512f4df0b162fca4ec77bc152f8956f60","ext":"pdf","url":"http://xdf-storage-in.gokuai.com/m-upload/file/download/%E6%85%88%E6%BA%AA%2B%E5%8D%97%E4%B8%89%E5%8E%BF%2B%E6%8B%B1%E5%A2%85%E7%AD%94%E6%A1%88.pdf?net=in&storage_point=XDFLeZwYcIyynN4ny&bucket=gkstorage&object=81%2F815bb9f512f4df0b162fca4ec77bc152f8956f60.dat&mime=application%2Fpdf&expires=1772089577&signature=uhzzkH3M6BedxWT%2FJYUiCuyZzys%3D","sign":"PMAP4IziMd0/asghxaC7fTCYMmY=","storage_point":"XDFLeZwYcIyynN4ny","ac":"mm","enc":1}};
var uri = '/app/gk_pdf';
var filehash = "815bb9f512f4df0b162fca4ec77bc152f8956f60";
var password = '';
```

重点：
- 加密方式：**AES-CBC + PKCS7Padding**
- Key：`MD5(filehash)`
- IV：`filehash 前16位`
- 页面里默认 `password = ''`（空字符串）

### 3. 本地复现 & 算出密码

把这套加密逻辑拿到本地 demo 跑一遍：
用给定的 `filehash`，按照它的加密方式，直接算出**真实密码**。

最终得到该文档密码：
 b7a76e9b6755e5e564fcd9668757f575a89e0b922a1aeb240c1dea4d7ed7db9fc20da0b9b75ab865d7cc9eeda27a3ff3

拿到这个密码，就可以正常打开下载后的加密文档了。

---

## 小结

这类云文档加密，如果**密码校验和加解密逻辑完全放在前端**，基本等于“防君子不防小人”。
只要把前端加密逻辑扒出来，用对应参数本地复现，就能轻松拿到真实密码。

---
 