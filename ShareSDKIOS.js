'use strict';

var ShareSDKTypeDefine = require('./ShareSDKTypeDefine')

var ShareSDKIOS = {
    // 将需要分享的平台标记放入一个数组中
    activePlatforms: [
        ShareSDKTypeDefine.PlatformType.SinaWeibo,
        ShareSDKTypeDefine.PlatformType.TencentWeibo
    ],

    // 构造分享参数
    shareParams: {
        Text: '分享内容',
        images: '',
        url: 'http://www.mob.com',
        title: '分享标题',
        type: ShareSDKTypeDefine.ContentType.Auto
    },
    // TODO 每个平台分享不同的内容


    // 设置平台
    // platforms
    TotalPlatforms: {
        // key 值取自ShareSDKTypeDefine.PlatformType,详情可参阅
        // 新浪微博
        1: {
            app_key: '568898243',
            app_secret: '38a4f8204cc784f81f9f0daaf31e02e3',
            redirect_uri: 'http://www.sharesdk.cn',
            authType: ShareSDKTypeDefine.AuthType.Both
        },
        // 腾讯微博
        2: {
            app_key: '801307650',
            app_secret: 'ae36f4ee3946e1cbb98d6965b0b2ff5c',
            redirect_uri: 'http://www.sharesdk.cn',
            authType: ShareSDKTypeDefine.AuthType.Both
        },
        // 微信系列 微信好友 微信朋友圈 微信收藏
        997: {
            app_id: 'wx4868b35061f87885',
            app_secret: '64020361b8ec4c99936c0e3999a9f249',
            authType: ShareSDKTypeDefine.AuthType.Both
        },
        // QQ系列 QQ好友 QQ空间
        998: {
            app_id: '100371282',
            app_secret: 'aed9b0303e3ed1e27bae87c33761161d',
            authType: ShareSDKTypeDefine.AuthType.Both
        }
        // Facebook
        // Twitter
        // Google plus
        // TODO 平台授权参数信息表请戳:-》
    }

}

module.exports = ShareSDKIOS;


