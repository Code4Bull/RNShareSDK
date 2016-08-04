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

var ShareSDK = require('./ShareSDK')

// 构造分享内容,传入分享方法中使用
shareParams = {
        text : '分享内容',
        images : '',
        // url仅在微信（包括好友和朋友圈）中使用
        url : 'http://www.mob.com',
        title : '分享标题'
}


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
          <CustomButton onPress={ () => {
          
                var params = JSON.stringify(shareParams);
                // 调用直接方法的方法
                ShareSDK.share(ShareSDK.platformType.SinaWeibo, params);
                // 设置回调
                ShareSDK.callBack();
                
                }
          }text="无UI分享"/>

          <CustomButton onPress={ ()=>{
                
                var params = JSON.stringify(shareParams);
                // 调用弹出九宫格的方法,
                ShareSDK.showShareActionSheet( 0, params );
                // 设置回调
                ShareSDK.callBack()

                }

          } text="弹出ActionSheet分享"/>

          <CustomButton onPress={
                () => {alert(1)}
          
          } text="弹出编辑框分享"/>

          <CustomButton onPress={ ()=>{

                ShareSDK.authorize(ShareSDK.platformType.SinaWeibo);
                //设置回调,接收返回信息
                ShareSDK.callBack();
                }

          } text="授权"/>

         
          <CustomButton onPress={ ()=>{alert(1)}

          } text="取消授权"/>

            <CustomButton onPress={ ()=>{alert(1)}

          } text="获取授权用户信息"/>
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






