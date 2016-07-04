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
var ShareSDKIOS = require('./ShareSDKIOS')
var ShareSDKTypeDefine = require('./ShareSDKTypeDefine')
var ShareSDKManager = require('react-native').NativeModules.ShareSDKManager;

// 传入初始化的KEY,在ShreSDKIOS中配置好的要分享的平台,和各个平台的初始化信息传入registerApp方法中
// iosv1001 为测试key,随时有可能删除,请到 http://www.mob.com 获取
ShareSDKManager.registerApp("iosv1001",ShareSDKIOS.activePlatforms,ShareSDKIOS.TotalPlatforms);
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

class RNShareSDK extends Component {

  render() {
    return (
        <View>
          <CustomButton onPress={()=>{
            
           // 分享,传入需要分享的平台,已经构建好的分享参数
           ShareSDKManager.share(ShareSDKTypeDefine.PlatformType.SinaWeibo,
                            ShareSDKIOS.shareParams,
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
              ShareSDKManager.showShareActionSheet(ShareSDKIOS.activePlatforms,
                                  ShareSDKIOS.shareParams,
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
              ShareSDKManager.showShareEditor(ShareSDKTypeDefine.PlatformType.SinaWeibo,
                                  ShareSDKIOS.shareParams,
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
              ShareSDKManager.authorize(ShareSDKTypeDefine.PlatformType.SinaWeibo,
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
              ShareSDKManager.cancelAuthorize(ShareSDKTypeDefine.PlatformType.SinaWeibo);
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
