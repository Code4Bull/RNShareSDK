/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
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
    Unknown      : 0, // 未知
    SinaWeibo    : 1, // 新浪微博
    TencentWeibo : 2, // 腾讯微博
    DouBan       : 5  // 豆瓣
    // TODO 更多类型可以参考 ->
}

// 定义授权类型


// 定义分享内容类型
var SSDKContentType = {
    Auto     : 0, // 自动适配类型，视传入的参数来决定
    Text     : 1, // 文本
    Image    : 2, // 图片
    WebPage  : 3  // 网页
    // TODO 更多类型可以参考 ->
}

// 定义分享平台枚举及其初始化参数
var SSDKPlatform = {
    // 新浪微博
    SinaWeibo : {
        app_key       : '568898243',
        app_secret    : '38a4f8204cc784f81f9f0daaf31e02e3',
        redirect_uri  : 'http://www.sharesdk.cn',
        authType      : 0
    }
    // 腾讯微博
}

// 将需要分享的平台标记放入一个数组中
var activePlatforms = [
    SSDKPlatformType.SinaWeibo

];

// 设置平台设置
// platforms
var TotalPlatforms = {
    // TODO 这个体验不是很好
    // key 值参照 SSDKPlatformType
    1 : SSDKPlatform.SinaWeibo
}

var ShareSDKManager = require('react-native').NativeModules.ShareSDKManager;
ShareSDKManager.registerApp("iosv1001",activePlatforms,TotalPlatforms);

// 构造分享参数
var shareParams = {
    Text : '分享内容',
    images : '',
    url : 'http://www.mob.com',
    title : '分享标题',
    type : SSDKContentType.Auto
}

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
            ShareSDKManager.share(SSDKPlatformType.SinaWeibo,
                                  shareParams,
                                  (error,events)=>{console.log(error)});}

          } text="无UI分享"/>

          <CustomButton onPress={()=>{alert("1")}} text="弹出ActionSheet分享"/>
          <CustomButton onPress={()=>{alert("2")}} text="弹出编辑框分享"/>
          <CustomButton onPress={()=>{alert("3")}} text="授权"/>
          <CustomButton onPress={()=>{alert("4")}} text="取消授权"/>
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
