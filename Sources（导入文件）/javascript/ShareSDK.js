'use strict';
import React, { Component } from 'react';
import {
    Platform
} from 'react-native';

// 导入iOS原生模块
var ShareSDKManager = require('react-native').NativeModules.ShareSDKManager;
// 导入android原生模块
var ShareSDKManagerAndroid = require('react-native').NativeModules.ShareSDKManagerAndroid;
// 导入iOS android的回调
var { NativeEventEmitter , DeviceEventEmitter , NativeModules} = require('react-native');


var ShareSDK = {
    
    isRuning : false,

    // 定义授权类型
    authType : {
        Both            : 0,   // 结合SSO和Web授权方式
        SSO             : 1,   // SSO授权方式
        Web             : 2    // 网页授权方式
    },

    // 定义分享内容类型
    contentType: {
        Auto            : 0, // 自动适配类型，视传入的参数来决定
        Text            : 1, // 文本
        Image           : 2, // 图片
        WebPage         : 3  // 网页
        // TODO 类型可以参考 -> ../RNShareSDK/ios/ShareSDK/ShareSDK.framework/Headers/TypeDefine.h
    },
    // 定义分享平台类型
    platformType: {
        Unknown         : 0,    // 未知
        SinaWeibo       : 1,    // 新浪微博
        TencentWeibo    : 2,    // 腾讯微博
        DouBan          : 5,    // 豆瓣
        QZone           : 6,    // QQ空间
        Renren          : 7,    // 人人网
        Kaixin          : 8,    // 开心网
        Facebook        : 10,   // Facebook
        Twitter         : 11,   // Twitter
        YinXiang        : 12,   // 印象笔记
        GooglePlus      : 14,   // Google+
        Instagram       : 15,   // Instagram
        LinkedIn        : 16,   // LinkedIn
        Tumblr          : 17,   // Tumblr
        Mail            : 18,   // 邮件
        SMS             : 19,   // 短信
        Print           : 20,   // 打印
        Copy            : 21,   // 拷贝
        WechatSession   : 22,   // 微信好友
        WechatTimeline  : 23,   // 微信朋友圈
        QQFriend        : 24,   // QQ好友
        Instapaper      : 25,   // Instapaper
        Pocket          : 26,   // Pocket
        YouDaoNote      : 27,   // 有道云笔记
        Pinterest       : 30,   // Pinterest
        Flickr          : 34,   // Flickr
        Dropbox         : 35,   // Dropbox
        VKontakte       : 36,   // VKontakte
        WechatFav       : 37,   // 微信收藏
        YiXinSession    : 38,   // 易信好友
        YiXinTimeline   : 39,   // 易信好友圈
        YiXinFav        : 40,   // 易信收藏
        MingDao         : 41,   // 明道
        Line            : 42,   // 连我
        WhatsApp        : 43,   // WhatsApp
        KakaoTalk       : 44,   // KakaoTalk
        KakaoStory      : 45,   // KakaoStory
        FacebookMessenger: 46,   // FacebookMessenger
        AliPaySocial    : 50,   // 支付宝好友
        YiXin           : 994,  // 易信系列
        Kakao           : 995,  // KaKao
        Evernote        : 996,  // 印象笔记
        Wechat          : 997,  // 微信
        QQ              : 998,  // QQ
        Any             : 999   // 任意平台
        // TODO 类型可以参考 ->  ../RNShareSDK/ios/ShareSDK/ShareSDK.framework/Headers/SSDKTypeDefine.h
    },


    // 初始化方法
    registerApp(appkey, activePlatforms, totalPlatforms) {
        if(Platform.OS === 'ios'){
            // 传入初始化的key,在index.ios.js中配置好的要分享的平台,和各个平台的初始化信息传入registerApp方法中
            // iosv1001 为测试key,随时有可能删除,请到 http://www.mob.com 获取
            ShareSDKManager.registerApp(appkey,activePlatforms,totalPlatforms);
        }else{
            // 执行android的操作,android端初始化可以在XML中配置
        }
    },

    // 无UI分享
    share(platformType,shareParams){
        if(Platform.OS === 'ios'){
            // 执行iOS的操作
            // TODO iOS 修改分享平台的设置地方
            ShareSDKManager.share(platformType,shareParams);
        }else {
            // 执行android的操作
            ShareSDKManagerAndroid.share(platformType,shareParams);
        }
    },

    // 弹出ActionSheet分享
    showShareActionSheet(activePlatforms, shareParams){
        if(Platform.OS === 'ios'){
            // 执行iOS的操作
            ShareSDKManager.showShareActionSheet(activePlatforms,shareParams);
        }else {
            // 执行android的操作,弹出分享九宫格
            ShareSDKManagerAndroid.onekeyShare(activePlatforms, shareParams);
        }
    },

    // 弹出编辑框分享
    showShareEditor(platformType,shareParams){
        if(Platform.OS === 'ios'){
            // 执行iOS的操作
            ShareSDKManager.showShareEditor(platformType,shareParams);
        }else {
            // 执行android的操作
            
        }
    },

    // 授权方法
    authorize(platformType){
        if(Platform.OS === 'ios'){
            // 执行iOS的操作
            ShareSDKManager.authorize(platformType);
        }else {
            // 执行android的操作
            ShareSDKManagerAndroid.authorize(platformType);
        }
    },

    // 检查平台是否已经授权
    hasAuthorized(platformType){
        if(Platform.OS === 'ios'){
            // 执行iOS的操作
            ShareSDKManager.hasAuthorized(platformType);
        }else {
            // 执行android的操作
            ShareSDKManagerAndroid.isAuthValid(platformType);
        }
    },


    // 检查是否案安装客户端
    


    // 取消授权
    cancelAuthorize(platformType){
        if(Platform.OS === 'ios'){
            // 执行iOS的操作
            ShareSDKManager.cancelAuthorize(platformType);
        }else {
            // 执行android的操作
            ShareSDKManagerAndroid.removeAccount(platformType);
        }
    },

    // 获取用户信息
    getUserInfo(platformType){
        if(Platform.OS === 'ios'){
            // 执行iOS的操作
            ShareSDKManager.getUserInfo(platformType);
        }else {
            // 执行android的操作
            ShareSDKManagerAndroid.getAuthInfo(platformType);
        }
    },

    // 回调器
    callBack(){
        if(Platform.OS === 'ios'){
            // 执行iOS的操作
            var successListener = new NativeEventEmitter(NativeModules.ShareSDKManager)
            successListener.addListener('success', (data) => console.log(data))

            var failListener = new NativeEventEmitter(NativeModules.ShareSDKManager)
            failListener.addListener('fail', (data) => console.log(data))

            var cancelListener = new NativeEventEmitter(NativeModules.ShareSDKManager)
            cancelListener.addListener('cancel', (data) => console.log(data))

        }else {
            // 执行android的操作
            var completeListener = DeviceEventEmitter.addListener('OnComplete',(e)=>{
                console.log(e)
            });

            var errorListener = DeviceEventEmitter.addListener('OnError',(e)=>{
                console.log(e)
            });

            var cancelListener = DeviceEventEmitter.addListener('OnCancel',(e)=>{
                console.log(e)
            });
        }

    }
}

module.exports = ShareSDK;