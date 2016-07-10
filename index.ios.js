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

// ------------------------------------------------------------------------------
ShareSDK = require('./ShareSDK')
// -----------------------------------------------------------------------------

activePlatforms = [
    ShareSDK.PlatformType.SinaWeibo,
    ShareSDK.PlatformType.TencentWeibo,
    ShareSDK.PlatformType.Wechat,
    ShareSDK.PlatformType.QQ,
]

// 设置各个平台初始化
// platforms
TotalPlatforms = {
    [ShareSDK.PlatformType.SinaWeibo] : {
        app_key:'568898243',
        app_secret:'38a4f8204cc784f81f9f0daaf31e02e3',
        redirect_uri:'http://www.sharesdk.cn',
        authType: ShareSDK.AuthType.Both
    },

    [ShareSDK.PlatformType.TencentWeibo] : {
        app_key: '801307650',
        app_secret: 'ae36f4ee3946e1cbb98d6965b0b2ff5c',
        redirect_uri: 'http://www.sharesdk.cn',
        authType: ShareSDK.AuthType.Both
    },

    [ShareSDK.PlatformType.Wechat] : {
        app_id: 'wx4868b35061f87885',
        app_secret: '64020361b8ec4c99936c0e3999a9f249',
        authType: ShareSDK.AuthType.Both
    },

    [ShareSDK.PlatformType.QQ] : {
        app_id: '100371282',
        app_secret: 'aed9b0303e3ed1e27bae87c33761161d',
        authType: ShareSDK.AuthType.Both
    }
    // Facebook
// Twitter
// Google plus
// TODO 平台 app_key,app_id 参数信息表请戳:-》
}

// 初始化方法
ShareSDK.registerApp('iosv1001',activePlatforms,TotalPlatforms);

// 构造分享参数
shareParams = {
    Text: '分享内容',
    images: '',
    url: 'http://www.mob.com',
    title: '分享标题',
    type: ShareSDK.ContentType.Auto
}
// TODO 每个平台分享不同的内容


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
           ShareSDK.share(ShareSDK.PlatformType.SinaWeibo,shareParams,(error,events)=>{
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
              ShareSDK.showShareActionSheet(activePlatforms,shareParams,(error,events)=>{
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
              ShareSDK.showShareEditor(ShareSDK.PlatformType.SinaWeibo,shareParams,(error,events)=>{
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
              ShareSDK.authorize(ShareSDK.PlatformType.SinaWeibo,(error,events)=>{
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
              ShareSDK.cancelAuthorize(ShareSDK.PlatformType.SinaWeibo);
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



<a href="http://www.feng.com/iPhone/news/2016-07-08/Forbes-iPhone-seven-young-benefit-samsung-appearance-changes_651339.shtml"
   hidefocus="true" target="_blank" title="福布斯：iPhone 7 外观变化小将让三星受益"><i></i>新闻 丨 福布斯：iPhone 7
    外观变化小将让三星受益</a>
<a href="http://www.feng.com/iPhone/news/2016-07-08/Supplier-has-for-3-d-glass-shell-for-iPhone-8_651335.shtml"
hidefocus="true" target="_blank" title="曝供应商已经在为iPhone 8准备3D玻璃外壳"><i></i>新闻 丨 曝供应商已经在为iPhone
8准备3D玻璃外壳</a>
<a href="http://www.feng.com/iPhone/news/2016-07-08/popular-Cookie-monster-shortlisted-for-the-ten-best-cooperation-with-Siri-ads_651331.shtml"
hidefocus="true" target="_blank" title="深得人心 甜饼怪与 Siri 合作的广告入围10佳"><i></i>新闻 丨 深得人心 甜饼怪与 Siri
合作的广告入围10佳</a>
<a href="http://www.feng.com/iPhone/news/2016-07-08/After-the-upgrade-with-the-Apple-ID_651327.shtml"
hidefocus="true" target="_blank" title="升级后用不了Apple ID?iOS 10 Beta 2要接锅"><i></i>新闻 丨 升级后用不了Apple
ID?iOS 10 Beta 2要接锅</a>
<a href="http://www.feng.com/iPhone/news/2016-07-08/Apple-and-Google-in-South-Korea-against-the-rules-of-the-uninstall-pre-installed-App_651325.shtml"
hidefocus="true" target="_blank" title="苹果和谷歌在韩国抵制卸载预装 App 的规定"><i></i>新闻 丨 苹果和谷歌在韩国抵制卸载预装 App
的规定</a>
<a href="http://www.feng.com/iPhone/news/2016-07-08/_651322.shtml" hidefocus="true" target="_blank"
title="在macOS Sierra中 这个快捷键也可开启 Siri"><i></i>新闻 丨 在macOS Sierra中 这个快捷键也可开启 Siri</a>