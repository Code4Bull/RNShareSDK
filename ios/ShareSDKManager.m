//
//  ShareSDKManager.m
//  RNShareSDK
//
//  Created by Kengsir on 16/6/28.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import "ShareSDKManager.h"
#import "RCTLog.h"

#import <ShareSDK/ShareSDK.h>
#import <ShareSDKUI/ShareSDKUI.h>
#import <ShareSDKConnector/ShareSDKConnector.h>

#define IMPORT_SINA_WEIBO_LIB               //导入新浪微博库，如果不需要新浪微博客户端分享可以注释此行
//#define IMPORT_QZONE_QQ_LIB                 //导入腾讯开发平台库，如果不需要QQ空间分享、SSO或者QQ好友分享可以注释此行
#define IMPORT_RENREN_LIB                   //导入人人库，如果不需要人人SSO，可以注释此行
#define IMPORT_WECHAT_LIB                   //导入微信库，如果不需要微信分享可以注释此行
#define IMPORT_ALIPAY_LIB                   //导入支付宝分享库，如果不需要支付宝分享可以注释此行
#define IMPORT_KAKAO_LIB                    //导入Kakao库，如果不需要Kakao分享可以注释此行

#ifdef IMPORT_SINA_WEIBO_LIB
#import "WeiboSDK.h"
#endif

#ifdef IMPORT_QZONE_QQ_LIB
#import <TencentOpenAPI/TencentOAuth.h>
#import <TencentOpenAPI/QQApiInterface.h>
#endif

#ifdef IMPORT_RENREN_LIB
#import <RennSDK/RennSDK.h>
#endif

#ifdef IMPORT_WECHAT_LIB
#import "WXApi.h"
#endif

#ifdef IMPORT_ALIPAY_LIB
#import "APOpenAPI.h"
#endif

#ifdef IMPORT_KAKAO_LIB
#import <KakaoOpenSDK/KakaoOpenSDK.h>
#endif


@implementation ShareSDKManager

// 这个宏定义使得ShareSDKManager这个类可以导出给JS端使用
RCT_EXPORT_MODULE();

#pragma mark 初始化
RCT_EXPORT_METHOD(registerApp:(NSString *)AppKey activePlatforms:(NSArray *)activePlatforms TotalPlatforms : (NSDictionary *)TotalPlatforms)
{
  [ShareSDK registerApp:AppKey activePlatforms:activePlatforms onImport:^(SSDKPlatformType platformType) {
    switch (platformType)
    {
#ifdef IMPORT_SINA_WEIBO_LIB
      case SSDKPlatformTypeSinaWeibo:
        [ShareSDKConnector connectWeibo:[WeiboSDK class]];
        break;
#endif
        
#ifdef IMPORT_QZONE_QQ_LIB
      case SSDKPlatformTypeQQ:
        [ShareSDKConnector connectQQ:[QQApiInterface class]
                   tencentOAuthClass:[TencentOAuth class]];
        break;
#endif
        
#ifdef IMPORT_RENREN_LIB
      case SSDKPlatformTypeRenren:
        [ShareSDKConnector connectRenren:[RennClient class]];
        break;
#endif
        
#ifdef IMPORT_WECHAT_LIB
      case SSDKPlatformTypeWechat:
        [ShareSDKConnector connectWeChat:[WXApi class]];
        break;
#endif
        
#ifdef IMPORT_ALIPAY_LIB
      case SSDKPlatformTypeAliPaySocial:
        [ShareSDKConnector connectAliPaySocial:[APOpenAPI class]];
        break;
#endif
        
#ifdef IMPORT_KAKAO_LIB
      case SSDKPlatformTypeKakao:
        [ShareSDKConnector connectKaKao:[KOSession class]];
        break;
#endif
    }
    
  } onConfiguration:^(SSDKPlatformType platformType, NSMutableDictionary *appInfo) {
    // 枚举取下标
    NSDictionary * dict = [TotalPlatforms objectForKey:[NSString stringWithFormat:@"%zi",platformType]];
 
    [appInfo addEntriesFromDictionary:dict];
    
  }];
}

#pragma mark 构造分享参数


#pragma mark 无UI分享
RCT_EXPORT_METHOD(share:(NSInteger)platformType shareParams:(NSDictionary *)shareParams callback:(RCTResponseSenderBlock)callback)
{
  NSMutableDictionary * ShareContentDict = [NSMutableDictionary new];
  
  [ShareContentDict SSDKSetupShareParamsByText:[shareParams objectForKey:@"Text"]
                                      images:nil
                                         url:[NSURL URLWithString:[shareParams objectForKey:@"url"]]
                                       title:[shareParams objectForKey:@"title"]
                                        type:(SSDKContentType)[[shareParams objectForKey:@"type"] doubleValue]];
  
  [ShareSDK share:(SSDKPlatformType)platformType parameters:ShareContentDict onStateChanged:^(SSDKResponseState state, NSDictionary *userData, SSDKContentEntity *contentEntity, NSError *error) {
      switch (state) {
        case SSDKResponseStateFail:
          callback(@[[error description]]);
        break;
        
        case SSDKResponseStateSuccess:
          callback(@[[NSNull null],userData]);
        break;
      default:
        break;
    }
  }];
}

#pragma mark ActionSheet分享
RCT_EXPORT_METHOD(showShareActionSheet:(NSArray*)items shareParams:(NSDictionary *)shareParams callback:(RCTResponseSenderBlock)callback)
{
  NSMutableDictionary * ShareContentDict = [NSMutableDictionary new];
  
  [ShareContentDict SSDKSetupShareParamsByText:[shareParams objectForKey:@"Text"]
                                        images:nil
                                           url:[NSURL URLWithString:[shareParams objectForKey:@"url"]]
                                         title:[shareParams objectForKey:@"title"]
                                          type:(SSDKContentType)[[shareParams objectForKey:@"type"] doubleValue]];
  
  // 主线程执行：
  dispatch_async(dispatch_get_main_queue(), ^{
    // TODO items 的数据处理
    [ShareSDK showShareActionSheet:nil items:nil shareParams:ShareContentDict onShareStateChanged:^(SSDKResponseState state, SSDKPlatformType platformType, NSDictionary *userData, SSDKContentEntity *contentEntity, NSError *error, BOOL end) {
        switch (state) {
        case SSDKResponseStateFail:
          callback(@[[error description]]);
        break;
          
        case SSDKResponseStateSuccess:
            // 返回内容实体对象
          callback(@[[NSNull null],[contentEntity rawData]]);
        break;
        
        default:
          break;
      }

    }];
  });

}

#pragma mark 弹出编辑框分享
RCT_EXPORT_METHOD(showShareEditor:(NSInteger)platformType shareParams:(NSDictionary *)shareParams callback:(RCTResponseSenderBlock)callback)
{
  NSMutableDictionary * ShareContentDict = [NSMutableDictionary new];
  
  [ShareContentDict SSDKSetupShareParamsByText:[shareParams objectForKey:@"Text"]
                                        images:nil
                                           url:[NSURL URLWithString:[shareParams objectForKey:@"url"]]
                                         title:[shareParams objectForKey:@"title"]
                                          type:(SSDKContentType)[[shareParams objectForKey:@"type"] doubleValue]];
  dispatch_async(dispatch_get_main_queue(), ^{
    [ShareSDK showShareEditor:(SSDKPlatformType)platformType otherPlatformTypes:nil shareParams:ShareContentDict onShareStateChanged:^(SSDKResponseState state, SSDKPlatformType platformType, NSDictionary *userData, SSDKContentEntity *contentEntity, NSError *error, BOOL end) {
      switch (state) {
        case SSDKResponseStateFail:
          callback(@[[error description]]);
          break;
          
        case SSDKResponseStateSuccess:
          callback(@[[NSNull null],[contentEntity rawData]]);
          break;
          
        default:
          break;
      }

    }];
  });
}



#pragma mark 授权
RCT_EXPORT_METHOD(authorize:(NSInteger)platformType callback:(RCTResponseSenderBlock)callback)
{
  [ShareSDK authorize:(SSDKPlatformType)platformType settings:nil onStateChanged:^(SSDKResponseState state, SSDKUser *user, NSError *error) {
    switch (state) {
      case SSDKResponseStateFail:
        // TODO callback 第二个参数为数组，将返回值全部都丢在这个数组中
        callback(@[[error description]]);
        break;
  
      case SSDKResponseStateSuccess:
        callback(@[[NSNull null],[user rawData]]);
        break;
  
      default:
        break;
    }
  }];
}

#pragma mark 取消授权
RCT_EXPORT_METHOD(cancelAuthorize:(NSInteger)platformType)
{
  [ShareSDK cancelAuthorize:(SSDKPlatformType)platformType];
}

@end
