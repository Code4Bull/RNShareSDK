## ShareSDK-Android (v2.7.4) for React-Native
* JavaScript 开发者方便的集成ShareSDK分享和授权功能。


## 目录
* Getting started
    * [1、新建项目并下载 ShareSDK](#Download)
    * [2、初始化ShareSDK并设置社交平台](#init)
    * [3、ShareSDK接口的调用](#interface)
* Notice
    * [各个分享平台参数配置描述](#SocialConfiguration)
    * [构造分享内容字段参数值](#ContentConfiguration)
    


## <a id="Download"></a>1、新建项目并下载 ShareSDK
* 1、ReactNative 项目环境搭建，不会的童鞋自行面壁哈: [网页链接](http://reactnative.cn/docs/0.27/getting-started.html#content).
* 2、ShareSDK Android版本的 RN 插件是在ShareSDK Android版本基础上对原生模块的接口做导出供给JS端使用，是依赖ShareSDK for Android的。所以下载本示例DEMO就包含了以下2部分，下载下来的文件目录截图如下：：

  （1）ShareSDK android版本的下载地址：[网页链接](http://www.mob.com/#/downloadDetail/ShareSDK/android)
  
  （2）RNShareSDK插件的下载地址 ：[网页链接](https://github.com/kengsir/RNShareSDK)
（包含demo，需要的是Sources里面的android文件夹中的文件）

![初始化](http://ww2.sinaimg.cn/mw690/6f5f9fe7gw1f6hnjvo9sgj21220fqwgp.jpg)

* 将以上文件ShareSDKManagerAndroid.java / ShareSDKPlatformListener.java / ShareSDKReactPackager.java 拖到新建的 RN 项目中的 android 目录的项目路径下，将 ShareSDK.js 拖入 RN 项目中。。


## <a id="init"></a> 2、初始化ShareSDK并设置社交平台
## android 部分

* 初始化（包含ShareSDK平台，各个社交平台的初始化）都在XML中配置完成

* ShareSDK for Android 原生部分的集成步骤可以参考这个帖子：[Android原生集成步骤](
http://bbs.mob.com/thread-22130-1-1.html)



* 关于 ShareSDKReactPackager.java 原生模块的配置还需要注意：
ShareSDKPackage需要在MainApplication.java文件的getPackages方法中提供。这个文件位于你的react-native应用文件夹的android目录中。具体路径是: android/app/src/main/java/com/your-app-name/MainApplication.java.


![初始化](http://ww1.sinaimg.cn/mw690/6f5f9fe7gw1f6hny4kii5j20ze0jidka.jpg)

## React－Native 部分

* 初始化（包含ShareSDK平台，各个社交平台的初始化）都在XML中配置完成

   [平台的app_key、app_secret等字段不同分享平台可能不同，详情可参考](#SocialConfiguration)


## <a id="interface"></a>3、ShareSDK接口的调用

## 分享

* 1、在需要分享的文件中导入ShareSDK.js
  
  ```
  var ShareSDK = require('./ShareSDK')
  ```
  
* 2、在需要分享操作的代码块中进行构造分享参数，示例如下：
   
  ```
  // 构造分享参数
  var shareParams = {
    Text: '分享内容',
    images: '',
    url: 'http://www.mob.com',
    title: '分享标题',
    type: ShareSDK.ContentType.Auto} 
  ```

* 3、调用分享方法,并设置回调：
  
  ```
  // 分享,传入需要分享的平台,已经构建好的分享参数
  var params = JSON.stringify(shareParams);
                // 调用直接方法的方法
                ShareSDK.share(ShareSDK.platformType.SinaWeibo, params);
  
// 在 react native 提供的方法componentWillMount中设置回调
componentWillMount() {
ShareSDK.callBack();
}
  ```



## 授权

* 1、调用授权方法,并设置获取用户信息的回调

  ```
  ShareSDK.authorize(ShareSDK.platformType.SinaWeibo);
  

// 在 react native 提供的方法componentWillMount中设置回调
componentWillMount() {
ShareSDK.callBack();
}
  ```
 


## <a id="SocialConfiguration"></a>各个分享平台参数配置描述
各个社交平台在初始化时 app_key、app_secret等字段不同分享平台可能不同，可参考下表进行调整。

平台                 | 通用字段           | 通用字段               |通用字段             | iOS 特需           | Android 特需  |
--------------------|------------------|-----------------------|--------------------|------------------|-----------------------|
新浪微博              | app_key          | app_secret           |redirect_uri         | auth_type        |                      |
腾讯微博              | app_key          | app_secret           |redirect_uri         | ––               |                      |
豆瓣                 | api_key          | secret               | redirect_uri        | ––               |    | 
QQ系列               | app_id           | app_key              | ––                  | auth_type        |    |
人人网               |app_id            | app_key              |secret_key           | auth_type        |    |
开心网               | api_key          | secret_key           |redirect_uri         | ––               |    |
Facebook            | api_key          | app_secret           |  ––                 | auth_type        |    |
Twitter             | consumer_key     | consumer_secret      |redirect_uri         |  ––              |    |
GooglePlus          |client_id         | client_secret        |redirect_uri         | auth_type        |    |
微信系列              | app_id          | app_secret           | ––                   |  ––             |    |
Pocket              | consumer_key     | ––                   |redirect_uri         | auth_type        |    |
Instragram          | client_id        | client_secret        |redirect_uri         |  ––              |    |
LinkedIn            | api_key          | secret_key           |redirect_uri         |  ––              |    |
Tumblr              | consumer_key     | consumer_secret      |callback_url         |  ––              |    |
Flicker             | api_key          | api_secret           | ––                  |  ––              |    |
有道                 | consumer_key     | consumer_secret      |oauth_callback       |  ––              |    |
印象笔记Evernote      | consumer_key     |consumer_secret       |––                   | ––               |    |
支付宝好友            | app_id           | ––                   | ––                  | ––               |    |
Pinterest           | client_id         | ––                   |––                   | ––               |    |
Kakao系列            | app_key          | rest_api_key         |redirect_uri         | auth_type        |     |
Dropbox             | app_key           | app_secret           |oauth_callback      |  ––              |     |
Vkontakte           | application_id    | secret_key           |––                   | ––              |     |
明道                 | app_key           | app_secret           |redirect_uri        | ––              |     |
易信                 | app_id            | app_secret           |redirect_uri        | auth_type        |     |
Instapaper           |consumer_key      | consumer_secret      |––                 |––               |    |

  
