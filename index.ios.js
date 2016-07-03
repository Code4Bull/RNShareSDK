/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 * http://www.mob.com kengsir
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View, TouchableHighlight
} from 'react-native';

// 定义分享平台key值
var SSDKPlatformType = {
    Unknown           : 0,    // 未知
    SinaWeibo         : 1,    // 新浪微博
    TencentWeibo      : 2,    // 腾讯微博
    DouBan            : 5,    // 豆瓣
    QZone             : 6,    // QQ空间
    Renren            : 7,    // 人人网
    Kaixin            : 8,    // 开心网
    Facebook          : 10,   // Facebook
    Twitter           : 11,   // Twitter
    YinXiang          : 12,   // 印象笔记
    GooglePlus        : 14,   // Google+
    Instagram         : 15,   // Instagram
    LinkedIn          : 16,   // LinkedIn
    Tumblr            : 17,   // Tumblr
    Mail              : 18,   // 邮件
    SMS               : 19,   // 短信
    Print             : 20,   // 打印
    Copy              : 21,   // 拷贝
    WechatSession     : 22,   // 微信好友
    WechatTimeline    : 23,   // 微信朋友圈
    QQFriend          : 24,   // QQ好友
    Instapaper        : 25,   // Instapaper
    Pocket            : 26,   // Pocket
    YouDaoNote        : 27,   // 有道云笔记
    Pinterest         : 30,   // Pinterest
    Flickr            : 34,   // Flickr
    Dropbox           : 35,   // Dropbox
    VKontakte         : 36,   // VKontakte
    WechatFav         : 37,   // 微信收藏
    YiXinSession      : 38,   // 易信好友
    YiXinTimeline     : 39,   // 易信好友圈
    YiXinFav          : 40,   // 易信收藏
    MingDao           : 41,   // 明道
    Line              : 42,   // 连我
    WhatsApp          : 43,   // WhatsApp
    KakaoTalk         : 44,   // KakaoTalk
    KakaoStory        : 45,   // KakaoStory
    FacebookMessenger : 46,   // FacebookMessenger
    AliPaySocial      : 50,   // 支付宝好友
    YiXin             : 994,  // 易信系列
    Kakao             : 995,  // KaKao
    Evernote          : 996,  // 印象笔记
    Wechat            : 997,  // 微信
    QQ                : 998,  // QQ
    Any               : 999   // 任意平台
    // TODO 类型可以参考 ->  ../RNShareSDK/ios/ShareSDK/ShareSDK.framework/Headers/SSDKTypeDefine.h
}

// 定义授权类型
var SSDKAuthType = {
    Both : 0,   // 结合SSO和Web授权方式
    SSO  : 1,   // SSO授权方式
    Web  : 2    // 网页授权方式
}

// 定义分享内容类型
var SSDKContentType = {
    Auto     : 0, // 自动适配类型，视传入的参数来决定
    Text     : 1, // 文本
    Image    : 2, // 图片
    WebPage  : 3  // 网页
    // TODO 类型可以参考 -> ../RNShareSDK/ios/ShareSDK/ShareSDK.framework/Headers/SSDKTypeDefine.h
}

// ------------------------------------------------------------------------------
// 以下是用户需要关心的初始化平台操作
// 将需要分享的平台标记放入一个数组中
var activePlatforms = [
    SSDKPlatformType.SinaWeibo

];

// 定义分享平台枚举及其初始化参数
var SSDKPlatform = {
    // 新浪微博
    SinaWeibo : {
        app_key       : '568898243',
        app_secret    : '38a4f8204cc784f81f9f0daaf31e02e3',
        redirect_uri  : 'http://www.sharesdk.cn',
        authType      : SSDKAuthType.Both
    }
    // 腾讯微博
    // 微信系列 微信好友 微信朋友圈 微信收藏
    // QQ系列 QQ好友 QQ空间
    // Facebook
    // Twitter
    // Google plus
    // TODO 平台授权信息表请戳:-》
}
// 构造分享参数
var shareParams = {
    Text : '分享内容',
    images : '',
    url : 'http://www.mob.com',
    title : '分享标题',
    type : SSDKContentType.Auto
}
// TODO 每个平台分享不同的内容

// 设置平台设置
// platforms
var TotalPlatforms = {
    // TODO 这个体验不是很好
    // key值参照SSDKPlatformType, 可自行删除不需要的平台
    1 : SSDKPlatform.SinaWeibo,
    2 : SSDKPlatform.TencentWeibo,
    5 : SSDKPlatform.DouBan
}

var ShareSDKManager = require('react-native').NativeModules.ShareSDKManager;

// 传入初始化的KEY
// iosv1001 为测试key,随时有可能删除,请到 http://www.mob.com 获取
ShareSDKManager.registerApp("iosv1001",activePlatforms,TotalPlatforms);

// -----------------------------------------------------------------------------------------------------


// 分享
// DEMO中的分享按钮
class CustomButton extends React.Component{

  render(){

  return(
    <TouchableHighlight style={styles.button} underlayColor="#a5a5a5" onPress={this.props.onPress}>
      <Text style={styles.buttonText}>{this.props.text}</Text>
    </TouchableHighlight>);
  }
}

class RNShareSDK extends Component {

  render() {
    return (
        <View>
          <CustomButton onPress={()=>{
            // 分享,传入需要分享的平台,已经构建好的分享参数
            ShareSDKManager.share(SSDKPlatformType.TencentWeibo,
                                  shareParams,
                                  (error,events)=>{
                                       if (error){
                                        console.error(error);
                                       }else{
                                         // 处理分享成功之后的操作
                                         alert('分享成功');
                                         console.log(events);
                                       }
                                  });}

          } text="无UI分享"/>

          <CustomButton onPress={()=>{
              // 弹出actionSheet进行分享
              ShareSDKManager.showShareActionSheet(activePlatforms,
                                  shareParams,
                                  (error,events)=>{
                                       if (error){
                                        console.error(error);
                                       }else{
                                         // 处理分享成功之后的操作
                                         alert('分享成功');
                                         console.log(events);
                                       }
                                  });}

          } text="弹出ActionSheet分享"/>

            <CustomButton onPress={()=>{
              // 弹出编辑框进行分享
              ShareSDKManager.showShareEditor(SSDKPlatformType.SinaWeibo,
                                  shareParams,
                                   (error,events)=>{
                                       if (error){
                                        console.error(error);
                                       }else{
                                         // 处理分享成功之后的操作
                                         alert('分享成功');
                                          console.log(events);
                                       }
                                  });}
          } text="弹出编辑框分享"/>

          <CustomButton onPress={()=>{
              // 平台授权
              ShareSDKManager.authorize(SSDKPlatformType.SinaWeibo,
                                  (error,events)=>{
                                       if (error){
                                        console.error(error);
                                       }else{
                                         // 处理分享成功之后的操作
                                         alert('授权成功');
                                         console.log(events);
                                       }
                                  });}

          } text="授权"/>

          <CustomButton onPress={()=>{
              ShareSDKManager.cancelAuthorize(SSDKPlatformType.SinaWeibo);
              alert("平台取消授权成功")}

          } text="取消授权"/>

        </View>
    );
  }
}

const styles = StyleSheet.create({
  button : {
    margin:5,
    backgroundColor:'green',
    padding:15,
    borderBottomWidth:StyleSheet.hairlineWidth,
    borderBottomColor:'#cdcdcd'
  },

  buttonText: {
    margin:5,
    flex:1
  },

});

AppRegistry.registerComponent('RNShareSDK', () => RNShareSDK);
