//
//  ShareSDKManager.m
//  RNShareSDK
//
//  Created by Kengsir on 16/6/28.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import "ShareSDKManager.h"
#import "RCTLog.h"

@implementation ShareSDKManager

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(addEvent:(NSString *)name location:(NSString *)location)
{
  RCTLogInfo(@"Pretending to create an event %@ at %@", name, location);
}
@end
