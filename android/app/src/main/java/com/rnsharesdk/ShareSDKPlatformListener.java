package com.rnsharesdk;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import java.util.HashMap;

import cn.sharesdk.framework.Platform;
import cn.sharesdk.framework.PlatformActionListener;
import cn.sharesdk.framework.ShareSDK;

/**
 * Created by jychen on 2016/7/1.
 */
public class ShareSDKPlatformListener extends ReactContextBaseJavaModule implements PlatformActionListener {

    ReactApplicationContext reactContext;

    public ShareSDKPlatformListener(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    public void onComplete(Platform platform, int i, HashMap<String, Object> hashMap) {
        System.out.println("成功"+hashMap.toString());
        //发送事件给javascript层
        WritableMap params = Arguments.createMap();
        params.putInt("platfromID", ShareSDK.platformNameToId(platform.getName()));
        params.putInt("action", i);
        params.putString("MSG","成功");
        if(hashMap != null){
            params.putString("DATA",hashMap.toString());
        }
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit("OnComplete", params);//对应的javascript层的事件名为logInConsole，注册该事件即可进行回调
    }

    @Override
    public void onError(Platform platform, int i, Throwable throwable) {
        System.out.println("失败"+throwable.toString());
        //发送事件给javascript层
        WritableMap params = Arguments.createMap();
        params.putInt("platfromID", ShareSDK.platformNameToId(platform.getName()));
        params.putInt("action", i);
        params.putString("MSG","失败");
        params.putString("DATA",throwable.toString());
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit("OnError", params);
    }

    @Override
    public void onCancel(Platform platform, int i) {
        System.out.println("取消");
        //发送事件给javascript层
        WritableMap params = Arguments.createMap();
        params.putInt("platfromID", ShareSDK.platformNameToId(platform.getName()));
        params.putInt("action", i);
        params.putString("MSG","取消");
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit("OnCancel", params);
    }

    @Override
    public String getName() {
        return "LISTEN";
    }
}
