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
var ShareSDK = require('./ShareSDKIOS')
// -----------------------------------------------------------------------------

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

// 设置各个平台初始化
// platforms
var TotalPlatforms =  {
    // key 值取自ShareSDK.PlatformType,详情可参阅
    // 新浪微博
    1 : {
        app_key: '568898243',
        app_secret: '38a4f8204cc784f81f9f0daaf31e02e3',
        redirect_uri: 'http://www.sharesdk.cn',
        authType: ShareSDK.AuthType.Both
    },
    // 腾讯微博
    2: {
        app_key: '801307650',
        app_secret: 'ae36f4ee3946e1cbb98d6965b0b2ff5c',
        redirect_uri: 'http://www.sharesdk.cn',
        authType: ShareSDK.AuthType.Both
    },
    // 微信系列 微信好友 微信朋友圈 微信收藏
    997: {
        app_id: 'wx4868b35061f87885',
        app_secret: '64020361b8ec4c99936c0e3999a9f249',
        authType: ShareSDK.AuthType.Both
    },
    // QQ系列 QQ好友 QQ空间
    998: {
        app_id: '100371282',
        app_secret: 'aed9b0303e3ed1e27bae87c33761161d',
        authType: ShareSDK.AuthType.Both
    }
    // Facebook
    // Twitter
    // Google plus
    // TODO 平台 app_key,app_id 参数信息表请戳:-》
}

// 将需要分享的平台标记放入一个数组中
var activePlatforms = [
    ShareSDK.PlatformType.SinaWeibo,
    ShareSDK.PlatformType.TencentWeibo,
    ShareSDK.PlatformType.Wechat,
    ShareSDK.PlatformType.QQ,
    ShareSDK.PlatformType.Twitter,
    ShareSDK.PlatformType.Facebook
]
// 初始化方法
ShareSDK.registerApp('iosv1001',activePlatforms,TotalPlatforms);

// 构造分享参数
var shareParams = {
    Text: '分享内容',
    images: '',
    url: 'http://www.mob.com',
    title: '分享标题',
    type: ShareSDK.ContentType.Auto
}
// TODO 每个平台分享不同的内容

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
