---
title: 记一次小米电视精简系统
description: 小米电视唰唰的
image: https://img0.baidu.com/it/u=3906783222,1384396002&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500
published: 2025-04-07
tags: [电视]
category: 玩机指北
draft: false
 
---

## 简单介绍一下背景

清明回家，给小米电视减负：机顶盒下岗，臃肿桌面开除，换上轻量桌面，终于不卡了！

## 准备

* 一个U盘，用来安装软件的;
* 电脑/手机，用来连接abd；
* ADB工具
* [Emotn UI](https://app.emotn.com/ui/)
* [TvBox](https://github.com/j4Uq/TVBoxOSC)

## 开搞

### 第一步：小米电视先双清

先把电视电源插头拔掉。接着，一手按住遥控器上的菜单键和主页键，将遥控器对准电视中间偏下位置，另一只手插上电源插头。不出意外电视会自动开机! 选择清除所有数据后,恢复出厂设置。

:::tip
电视开机后，先把路由器连接宽带的网线拔掉，这样电视就处于有 WiFi 但没网的环境（非常重要）
:::

### 第二步：安装电视桌面

[Emotn UI](https://app.emotn.com/ui/) 我是用u盘安装的，安装后才可以卸载小米桌面！

### 第三步：开启adb

* 找到电视上的 “设置” 并进入，在里面找到 “关于” 选项。
* 进入 “关于” 后，找到 “产品型号”，用遥控器对着它快速按确认键（或 OK 键），按 5 次以上，直到电视弹出提示 “你已经处于开发者模式” 。
* 按遥控器返回键，回到设置页面，找到 “账号与安全” 并进入 。
* 在 “账号与安全” 里找到 “ADB 调试”，按遥控器向右方向键，选择 “允许”，此时会弹出一个确认弹窗，选择 “确定” 打开 ADB 调试 。

### 第四步：连接 ADB

 > 不知道ip去电视的 设置-网络  查看

``` bash

adb connect 192.168.124.13 

adb devices //查看设备连接情况

adb shell //进入终端

```

### 开始卸载

`pm uninstall --user 0 [应用包名]`

> 卸载桌面之前 一定要安装第三方桌面

|应用名称|包名|
| ---- | ---- |
|应用商店|com.xiaomi.mitv.appstore|
|小米支付|com.xiaomi.mitv.payment|
|电视推送|com.xiaomi.mitv.tvpush.tvpushservice|
|游戏中心|com.xiaomi.mibox.gamecenter|
|天气|com.xiaomi.tweather|
|日历|com.xiaomi.mitv.calendar|
|小米钱包|com.mipay.wallet.tv|
|桌面|com.mitv.tvhome|
|系统升级|com.xiaomi.mitv.upgrade|
|今日头条|com.duokan.videodaily|
|小米商城|com.xiaomi.mitv.shop|
|时尚画报|com.xiaomi.tv.gallery|
|定时提醒|com.mitv.alarmcenter|
|电视支付|com.xiaomi.mitv.pay|
|用户手册|com.xiaomi.mitv.handbook|

## 最后

我只安装了 tvbox
::github{repo="o0HalfLife0o/TVBoxOSC/"}
