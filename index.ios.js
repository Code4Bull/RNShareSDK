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
    ShareSDK.platformType.SinaWeibo,
    ShareSDK.platformType.TencentWeibo,
    ShareSDK.platformType.Wechat,
    ShareSDK.platformType.QQ,
]

// 设置各个平台初始化
// platforms
totalPlatforms = {
    [ShareSDK.platformType.SinaWeibo] : {
        app_key:'568898243',
        app_secret:'38a4f8204cc784f81f9f0daaf31e02e3',
        redirect_uri:'http://www.sharesdk.cn',
        authType: ShareSDK.authType.Both
    },

    [ShareSDK.platformType.TencentWeibo] : {
        app_key: '801307650',
        app_secret: 'ae36f4ee3946e1cbb98d6965b0b2ff5c',
        redirect_uri: 'http://www.sharesdk.cn',
        authType: ShareSDK.authType.Both
    },

    [ShareSDK.platformType.Wechat] : {
        app_id: 'wx4868b35061f87885',
        app_secret: '64020361b8ec4c99936c0e3999a9f249',
        authType: ShareSDK.authType.Both
    },

    [ShareSDK.platformType.QQ] : {
        app_id: '100371282',
        app_secret: 'aed9b0303e3ed1e27bae87c33761161d',
        authType: ShareSDK.authType.Both
    }
    // Facebook
// Twitter
// Google plus
// TODO 平台 app_key,app_id 参数信息表请戳:-》
}

// 初始化方法
ShareSDK.registerApp('iosv1001',activePlatforms,totalPlatforms);

// 构造分享参数
shareParams = {
    text: '分享内容',
    images: '',
    url: 'http://www.mob.com',
    title: '分享标题',
    type: ShareSDK.contentType.Auto
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
           ShareSDK.share(ShareSDK.platformType.SinaWeibo,shareParams)
           ShareSDK.callBack();
           }

          } text="无UI分享"/>

          <CustomButton onPress={()=>{
              // 弹出actionSheet进行分享
              ShareSDK.showShareActionSheet(activePlatforms,shareParams)
              ShareSDK.callBack();
              }

          } text="弹出ActionSheet分享"/>

            <CustomButton onPress={()=>{
              // 弹出编辑框进行分享
              ShareSDK.showShareEditor(ShareSDK.platformType.SinaWeibo,shareParam),ShareSDK.callBack()}
          } text="弹出编辑框分享"/>

          <CustomButton onPress={()=>{
              // 平台授权
              ShareSDK.authorize(ShareSDK.platformType.SinaWeibo),ShareSDK.callBack();
              }

          } text="授权"/>

            <CustomButton onPress={()=>{
              // 平台授权
              if(ShareSDK.hasAuthorized(ShareSDK.platformType.SinaWeibo)){
                   console.log("已经授权");}
              else{

                    console.log("还未授权");
                  }
           }
          } text="检查平台是否已经授权"/>


            <CustomButton onPress={()=>{
              ShareSDK.cancelAuthorize(ShareSDK.platformType.SinaWeibo);
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






