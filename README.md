## ShareSDK-iOS (v3.x) for React-Native 
* JS 开发者方便的集成ShareSDK分享和授权功能。
* ShareSDK for android 正在路上～

## 目录
* Getting started
    * [1、新建项目并下载 ShareSDK](#Download)
    * [2、初始化ShareSDK并设置社交平台](#init)
    * [3、ShareSDK接口的调用](#interface)
* Notice
    * [各个分享平台参数配置描述](#SocialConfiguration)
    * [构造分享内容字段参数值](#ContentConfiguration)
    


## <a id="Download"></a>1、新建项目并下载 ShareSDK
* 1、React-Native 项目环境搭建，不会的童鞋自行面壁哈: [网页链接](http://reactnative.cn/docs/0.27/getting-started.html#content).
* 2、ShareSDK iOS版本的 RN 插件是在ShareSDK iOS版本基础上对原生模块的接口做导出供给JS端使用，是依赖ShareSDK for iOS的。是依赖ShareSDK for iOS的。所以下载本示例DEMO就包含了以下2部分，下载下来的文件目录截图如下：

  （1）ShareSDK iOS 版本的下载：[网页链接](http://www.mob.com/#/downloadDetail/ShareSDK/ios)
  
  （2）React-Native 插件的下载: ：[网页链接](https://github.com/kengsir/RNShareSDK)
（包含demo，需要的是ShareSDKManager.h / ShareSDKManager.m / ShareSDKIOS.js[暂名]）

    ![初始化](http://ww2.sinaimg.cn/mw690/6f5f9fe7gw1f5ji9gh9f1j20w20l4acp.jpg)

* 将以上文件ShareSDKManager.h / ShareSDKManager.m / ShareSDK 拖到新建的 RN 项目中的 ios 目录下，将 ShareSDKIOS.js 拖入 RN 项目中。


## <a id="init"></a> 2、初始化ShareSDK并设置社交平台
## iOS 部分

 * 1、下载的 ShareSDK 文件夹拖拽进项目
   
  
  ![img](http://ww4.sinaimg.cn/mw690/6f5f9fe7gw1f5jioidriej21em0mi0x5.jpg)
  注意：请务必在上述步骤中选择“Create groups for any added folders”单选按钮组。如果你选择“Create folder references for any added folders”，一个蓝色的文件夹引用将被添加到项目并且将无法找到它的资源。


* 2、添加必须的依赖库

 必须添加的依赖库如下 ( Xcode 7 下 *.dylib库后缀名更改为*.tbd )：
 
  ```objc
  libicucore.dylib
  libz.dylib
  libstdc++.dylib
  JavaScriptCore.framework
  ```

 以下依赖库根据社交平台添加：
  
  ```objc
  新浪微博SDK依赖库
  
  ImageIO.framework
  libsqlite3.dylib
  ```
  
  ```objc
  微信SDK依赖库 
  
  libsqlite3.dylib
  ```
  
  ```objc
  QQ好友和QQ空间SDK依赖库 
  
  libsqlite3.dylib
  ```
  
  ```objc
  短信和邮件需要依赖库 
  
  MessageUI.framework
  ```
  
  ```objc
  Google＋SDK依赖库 
  
  CoreMotion.framework
  CoreLocation.framework
  MediaPlayer.framework
  AssetsLibrary.framework
  ```

 添加依赖库的方法如下:

 ![img](http://wiki.mob.com/wp-content/uploads/2015/09/233D16A0-E241-4D4B-ACF2-4C03259F995A.png)

* 3、各个社交平台需要的配置（url schemes 等）可以参考文档中的可选配置项：[网页链接](http://wiki.mob.com/ios%E7%AE%80%E6%B4%81%E7%89%88%E5%BF%AB%E9%80%9F%E9%9B%86%E6%88%90/)

* 附录：iOS 9 配置文档请戳 －》 [网页链接](http://wiki.mob.com/ios9-%E5%AF%B9sharesdk%E7%9A%84%E5%BD%B1%E5%93%8D%EF%BC%88%E9%80%82%E9%85%8Dios-9%E5%BF%85%E8%AF%BB%EF%BC%89/)

* 4、选择需要的平台SDK


    打开 ShareSDKManager.m ，按需注释掉已导入的原生SDK库 (不需要的平台SDK也可以做删除处理)

  ```
#define IMPORT_SINA_WEIBO_LIB               //导入新浪微博库，如果不需要新浪微博客户端分享可以注释此行
#define IMPORT_QZONE_QQ_LIB                 //导入腾讯开发平台库，如果不需要QQ空间分享、SSO或者QQ好友分享可以注释此行
#define IMPORT_RENREN_LIB                   //导入人人库，如果不需要人人SSO，可以注释此行
#define IMPORT_GOOGLE_PLUS_LIB              //导入Google+库，如果不需要Google+分享可以注释此行
#define IMPORT_WECHAT_LIB                   //导入微信库，如果不需要微信分享可以注释此行
//#define IMPORT_ALIPAY_LIB                   //导入支付宝分享库，如果不需要支付宝分享可以注释此行
//#define IMPORT_KAKAO_LIB                    //导入Kakao库，如果不需要Kakao分享可以注释此行
```

## JS 部分

* 在 index.ios.js 文件中进行初始化操作 （确定要分享出去的平台，初始化分享平台的参数信息）
  
  a、首先导入 ShareSDKIOS.js

  ```
   var ShareSDK = require('./ShareSDK')
  ```

  b、在 activePlatforms 数组中配置需要分享的平台

  ```
  var activePlatforms = [
     ShareSDK.PlatformType.SinaWeibo,
     ShareSDK.PlatformType.TencentWeibo,
     ShareSDK.PlatformType.Wechat,
     ShareSDK.PlatformType.QQ,
     ShareSDK.PlatformType.Twitter,
     ShareSDK.PlatformType.Facebook
  ]
  ```
c、在 TotalPlatforms 对象中添加 ShareSDK 各个平台的初始化参数，例如（新浪微博、QQ、微信、Facebook、Twitter)

	```
	// 设置各个平台初始化
	// platforms
	var TotalPlatforms =  {
    	// key 值取自ShareSDK.PlatformType,详情可参阅
    	// 新浪微博
    	[ShareSDK.PlatformType.SinaWeibo] : {
        	app_key: '568898243',
        	app_secret: '38a4f8204cc784f81f9f0daaf31e02e3',
        	redirect_uri: 'http://www.sharesdk.cn',
        	authType: ShareSDK.AuthType.Both
    	},
    	// 腾讯微博
    	[ShareSDK.PlatformType.TencentWeibo] : {
        	app_key: '801307650',
        	app_secret: 'ae36f4ee3946e1cbb98d6965b0b2ff5c',
        	redirect_uri: 'http://www.sharesdk.cn',
        	authType: ShareSDK.AuthType.Both
    	},
    	// 微信系列 微信好友 微信朋友圈 微信收藏
    	[ShareSDK.PlatformType.Wechat] : {
        	app_id: 'wx4868b35061f87885',
        	app_secret: '64020361b8ec4c99936c0e3999a9f249',
        	authType: ShareSDK.AuthType.Both
    	},
    	// QQ系列 QQ好友 QQ空间
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
	```
[以上平台的app_key、app_secret等字段不同分享平台可能不同，详情可参考](#SocialConfiguration)




	d、调用初始化方法进行初始化
	
	```
	// 初始化方法
	ShareSDK.registerApp('iosv1001',activePlatforms,TotalPlatforms);
	
	```


## <a id="interface"></a>3、ShareSDK接口的调用
 
## 分享

* 1、在需要分享操作的代码块中进行构造分享参数，示例如下：

  ```
  // 构造分享参数
var shareParams = {
    Text: '分享内容',
    images: '',
    url: 'http://www.mob.com',
    title: '分享标题',
    type: ShareSDK.ContentType.Auto
}
```

* 2、调用分享方法,并设置回调：

  ```
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
 ```


## 授权

* 1、调用授权方法,并设置获取用户信息的回调

 ```
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
