package com.rnsharesdk;

import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.view.View;
import android.text.TextUtils;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.mob.tools.utils.Hashon;
import android.os.Bundle;
import android.os.Handler.Callback;
import com.mob.tools.utils.UIHandler;
import android.os.Message;

import java.util.HashMap;
import java.util.Map.Entry;

import cn.sharesdk.framework.Platform;
import cn.sharesdk.framework.Platform.ShareParams;
import cn.sharesdk.framework.ShareSDK;
import cn.sharesdk.onekeyshare.OnekeyShare;
import cn.sharesdk.onekeyshare.OnekeyShareTheme;
import cn.sharesdk.onekeyshare.ShareContentCustomizeCallback;

/**
 * Created by jychen on 2016/6/14.
 */
public class ShareSDKManagerAndroid extends ReactContextBaseJavaModule implements Callback {

    private ReactApplicationContext context;
    private static boolean DEBUG = true;
    private static boolean disableSSO = false;


    private static final int MSG_INITSDK = 1;
    private static final int MSG_AUTHORIZE = 2;
    private static final int MSG_SHOW_USER = 3;
    private static final int MSG_SHARE = 4;
    private static final int MSG_ONEKEY_SAHRE = 5;
    private static final int MSG_GET_FRIENDLIST = 6;
    private static final int MSG_FOLLOW_FRIEND = 7;


    public ShareSDKManagerAndroid(ReactApplicationContext reactApplicationContext) {
        super(reactApplicationContext);
        context = reactApplicationContext;
        ShareSDK.initSDK(context);
    }

    @Override
    public String getName() {
        return "ShareSDKManagerAndroid";
    }


    @ReactMethod
    public void showShareUI() {
        OnekeyShare oks = new OnekeyShare();
        //ShareSDK快捷分享提供两个界面第一个是九宫格 CLASSIC  第二个是SKYBLUE
        oks.setTheme(OnekeyShareTheme.CLASSIC);
        // 令编辑页面显示为Dialog模式
        oks.setDialogMode();
        // 在自动授权时可以禁用SSO方式
//		oks.disableSSOWhenAuthorize();
        //oks.setAddress("12345678901"); //分享短信的号码和邮件的地址
        oks.setTitle("ShareSDK--Title");
        oks.setTitleUrl("http://wxweb.3xmt.com/news/wx/detail?newsid=9186&time=1464676205159");
        oks.setText("ShareSDK--文本 "+"http://m.lights.ofweek.com/2016-05/ART-220001-8130-29099662.html");
//        oks.setImagePath("sdcard/aas/1.png");  //分享sdcard目录下的图片
        oks.setImageUrl("http://mbiadmin.lianzhong.com/Images/jjerdy/captureScreen.png");
        oks.setUrl("http://www.baidu.com"); //微信不绕过审核分享链接
//		oks.setViewToShare(lin);
        //oks.setFilePath("/sdcard/test-pic.jpg");  //filePath是待分享应用程序的本地路劲，仅在微信（易信）好友和Dropbox中使用，否则可以不提供
        oks.setComment("分享"); //我对这条分享的评论，仅在人人网和QQ空间使用，否则可以不提供
        oks.setSite("ShareSDK");  //QZone分享完之后返回应用时提示框上显示的名称
        oks.setSiteUrl("http://mob.com");//QZone分享参数
        oks.setVenueName("ShareSDK");
        oks.setVenueDescription("This is a beautiful place!");
        oks.setAddress("1121655658@qq.com");
        // 将快捷分享的操作结果将通过OneKeyShareCallback回调
        //oks.setCallback(new OneKeyShareCallback());
        // 去自定义不同平台的字段内容
        //oks.setShareContentCustomizeCallback(new ShareContentCustomizeDemo());
        // 在九宫格设置自定义的图标
        Bitmap logo = BitmapFactory.decodeResource(context.getResources(), R.drawable.ic_launcher);
        String label = "ShareSDK";
        View.OnClickListener listener = new View.OnClickListener() {
            public void onClick(View v) {

            }
        };
        oks.setCallback(new ShareSDKPlatformListener(context));
        oks.setCustomerLogo(logo, label, listener);
        oks.show(context);
    }

//    @ReactMethod
//    public void initSDK(String appKey) {
//        if (DEBUG) {
//            System.out.println("initSDK appkey ==>>" + appKey);
//        }
//        if (!TextUtils.isEmpty(appKey)) {
//            ShareSDK.initSDK(context, appKey);
//        } else {
//            ShareSDK.initSDK(context);
//        }
//    }

//    @ReactMethod
//    public void setPlatformConfig(String configs) {
//        if (DEBUG) {
//            System.out.println("initSDK configs ==>>" + configs);
//        }
//
//        if (!TextUtils.isEmpty(configs)) {
//            Message msg = new Message();
//            msg.what = MSG_INITSDK;
//            msg.obj = configs;
//            UIHandler.sendMessageDelayed(msg, 1000, this);
//        }
//    }

    @ReactMethod
    public void authorize(int platform) {
        if (DEBUG) {
            System.out.println("ShareSDKUtils.authorize");
        }
        Message msg = new Message();
        msg.what = MSG_AUTHORIZE;
        msg.arg1 = platform;
        UIHandler.sendMessage(msg, this);
    }

    @ReactMethod
    public void removeAccount(int platform) {
        if (DEBUG) {
            System.out.println("ShareSDKUtils.removeAccount");
        }
        String name = ShareSDK.platformIdToName(platform);
        Platform plat = ShareSDK.getPlatform(name);
        plat.removeAccount(true);
    }

    @ReactMethod
    public boolean isAuthValid(int platform) {
        if (DEBUG) {
            System.out.println("ShareSDKUtils.isAuthValid");
        }
        String name = ShareSDK.platformIdToName(platform);
        Platform plat = ShareSDK.getPlatform(name);
        return plat.isAuthValid();
    }

    @ReactMethod
    public boolean isClientValid(int platform) {
        if (DEBUG) {
            System.out.println("ShareSDKUtils.isClientValid");
        }
        String name = ShareSDK.platformIdToName(platform);
        Platform plat = ShareSDK.getPlatform(name);
        return plat.isClientValid();
    }

    @ReactMethod
    public void showUser(int platform) {
        if (DEBUG) {
            System.out.println("ShareSDKUtils.showUser");
        }
        Message msg = new Message();
        msg.what = MSG_SHOW_USER;
        msg.arg1 = platform;
        UIHandler.sendMessage(msg, this);
    }

    @ReactMethod
    public void share(int platform, String content) {
        if (DEBUG) {
            System.out.println("ShareSDKUtils.share");
        }
        Message msg = new Message();
        msg.what = MSG_SHARE;
        msg.arg1 = platform;
        msg.obj = content;
        UIHandler.sendMessage(msg, this);
    }

    @ReactMethod
    public void onekeyShare(int platform, String content) {
        if (DEBUG) {
            System.out.println("ShareSDKUtils.OnekeyShare");
        }
        Message msg = new Message();
        msg.what = MSG_ONEKEY_SAHRE;
        msg.arg1 = platform;
        msg.obj = content;
        UIHandler.sendMessage(msg, this);
    }

    @ReactMethod
    public void getFriendList(int platform, int count, int page) {
        if (DEBUG) {
            System.out.println("ShareSDKUtils.getFriendList");
        }
        Message msg = new Message();
        msg.what = MSG_GET_FRIENDLIST;
        msg.arg1 = platform;
        Bundle data = new Bundle();
        data.putInt("page", page);
        data.putInt("count", count);
        msg.setData(data);
        UIHandler.sendMessage(msg, this);
    }

    @ReactMethod
    public void followFriend(int platform, String account) {
        if (DEBUG) {
            System.out.println("ShareSDKUtils.followFriend");
        }

        Message msg = new Message();
        msg.what = MSG_FOLLOW_FRIEND;
        msg.arg1 = platform;
        msg.obj = account;
        UIHandler.sendMessage(msg, this);
    }

    @ReactMethod
    public String getAuthInfo(int platform) {
        if (DEBUG) {
            System.out.println("ShareSDKUtils.getAuthInfo");
        }

        String name = ShareSDK.platformIdToName(platform);
        Platform plat = ShareSDK.getPlatform(name);
        Hashon hashon = new Hashon();
        HashMap<String, Object> map = new HashMap<String, Object>();
        if(plat.isAuthValid()){
            map.put("expiresIn", plat.getDb().getExpiresIn());
            map.put("expiresTime", plat.getDb().getExpiresTime());
            map.put("token", plat.getDb().getToken());
            map.put("tokenSecret", plat.getDb().getTokenSecret());
            map.put("userGender", plat.getDb().getUserGender());
            map.put("userID", plat.getDb().getUserId());
            map.put("openID", plat.getDb().get("openid"));
            map.put("userName", plat.getDb().getUserName());
            map.put("userIcon", plat.getDb().getUserIcon());
        }
        return hashon.fromHashMap(map);
    }

    @ReactMethod
    public void disableSSOWhenAuthorize(boolean open){
        disableSSO = open;
    }

    @SuppressWarnings("unchecked")
    public boolean handleMessage(Message msg) {
        switch (msg.what) {
            case MSG_INITSDK: {
                if (DEBUG) {
                    System.out.println("ShareSDKUtils.setPlatformConfig");
                }
                String configs = (String) msg.obj;
                Hashon hashon = new Hashon();
                HashMap<String, Object> devInfo = hashon.fromJson(configs);
                for(Entry<String, Object> entry: devInfo.entrySet()){
                    String p = ShareSDK.platformIdToName(Integer.parseInt(entry.getKey()));
                    if (p != null) {
                        if (DEBUG) {
                            System.out.println(p + " ==>>" + new Hashon().fromHashMap((HashMap<String, Object>)entry.getValue()));
                        }
                        ShareSDK.setPlatformDevInfo(p, (HashMap<String, Object>)entry.getValue());
                    }
                }
            }
            break;
            case MSG_AUTHORIZE: {
                int platform = msg.arg1;
                String name = ShareSDK.platformIdToName(platform);
                Platform plat = ShareSDK.getPlatform(name);
                plat.setPlatformActionListener(new ShareSDKPlatformListener(context));
                plat.SSOSetting(disableSSO);
                plat.authorize();
            }
            break;
            case MSG_SHOW_USER: {
                int platform = msg.arg1;
                System.out.println("平台名字"+platform);
                String name = ShareSDK.platformIdToName(platform);
                System.out.println("平台名字"+name);
                Platform plat = ShareSDK.getPlatform(name);
                plat.setPlatformActionListener(new ShareSDKPlatformListener(context));
                plat.SSOSetting(disableSSO);
                plat.showUser(null);
            }
            break;
            case MSG_SHARE: {
                int platformID = msg.arg1;
                String content = (String) msg.obj;
                String pName = ShareSDK.platformIdToName(platformID);
                Platform plat = ShareSDK.getPlatform(context, pName);
                plat.setPlatformActionListener(new ShareSDKPlatformListener(context));
                plat.SSOSetting(disableSSO);

                try {
                    Hashon hashon = new Hashon();
                    if (DEBUG) {
                        System.out.println("share content ==>>" + content);
                    }
                    HashMap<String, Object> data = hashon.fromJson(content);



                    ShareParams sp = new ShareParams(data);
                    //不同平台，分享不同内容
                    if (data.containsKey("customizeShareParams")) {
                        final HashMap<String, String> customizeSP = (HashMap<String, String>) data.get("customizeShareParams");
                        if (customizeSP.size() > 0) {
                            String pID = String.valueOf(platformID);
                            if (customizeSP.containsKey(pID)) {
                                String cSP = customizeSP.get(pID);
                                if (DEBUG) {
                                    System.out.println("share content ==>>" + cSP);
                                }
                                data = hashon.fromJson(cSP);
                                for (String key : data.keySet()) {
                                    sp.set(key, data.get(key));
                                }
                            }
                        }
                    }
                    plat.share(sp);
                } catch (Throwable t) {
                    new ShareSDKPlatformListener(context).onError(plat, Platform.ACTION_SHARE, t);
                }
            }
            break;
            case MSG_ONEKEY_SAHRE: {
                int platform = msg.arg1;
                String content = (String) msg.obj;
                Hashon hashon = new Hashon();
                if (DEBUG) {
                    System.out.println("onekeyshare  ==>>" + content);
                }
                HashMap<String, Object> map = hashon.fromJson(content);
                OnekeyShare oks = new OnekeyShare();
                if (platform > 0) {
                    String name = ShareSDK.platformIdToName(platform);
                    if (DEBUG) {
                        System.out.println("ShareSDKUtils Onekeyshare shareView platform name ==>> " + name);
                    }
                    if(!TextUtils.isEmpty(name)){
                        oks.setPlatform(name);
                        oks.setSilent(false);
                    }
                }
                if (map.containsKey("text")) {
                    oks.setText((String)map.get("text"));
                }
                if (map.containsKey("imagePath")) {
                    oks.setImagePath((String)map.get("imagePath"));
                }
                if (map.containsKey("imageUrl")) {
                    oks.setImageUrl((String)map.get("imageUrl"));
                }
                if (map.containsKey("title")) {
                    oks.setTitle((String)map.get("title"));
                }
                if (map.containsKey("comment")) {
                    oks.setComment((String)map.get("comment"));
                }
                if (map.containsKey("url")) {
                    oks.setUrl((String)map.get("url"));
                    oks.setTitleUrl((String)map.get("url"));
                }
                if (map.containsKey("site")) {
                    oks.setSite((String)map.get("site"));
                }
                if (map.containsKey("siteUrl")) {
                    oks.setSiteUrl((String)map.get("siteUrl"));
                }
                if (map.containsKey("musicUrl")) {
                    oks.setSiteUrl((String)map.get("musicUrl"));
                }
                if (map.containsKey("shareType")) {
                    if ("6".equals(String.valueOf(map.get("shareType")))) {
                        if (map.containsKey("url")) {
                            oks.setVideoUrl((String)map.get("url"));
                        }
                    }
                }
                //不同平台，分享不同内容
                if (map.containsKey("customizeShareParams")) {
                    final HashMap<String, String> customizeSP = (HashMap<String, String>) map.get("customizeShareParams");
                    if (customizeSP.size() > 0) {
                        oks.setShareContentCustomizeCallback(new ShareContentCustomizeCallback() {
                            public void onShare(Platform platform, ShareParams paramsToShare) {
                                String platformID = String.valueOf(ShareSDK.platformNameToId(platform.getName()));
                                if (customizeSP.containsKey(platformID)) {
                                    Hashon hashon = new Hashon();
                                    String content = customizeSP.get(platformID);
                                    if (DEBUG) {
                                        System.out.println("share content ==>>" + content);
                                    }
                                    HashMap<String, Object> data = hashon.fromJson(content);
                                    for (String key : data.keySet()) {
                                        paramsToShare.set(key, data.get(key));
                                    }
                                }
                            }
                        });
                    }
                }

                if(disableSSO){
                    oks.disableSSOWhenAuthorize();
                }
                oks.setCallback(new ShareSDKPlatformListener(context));
                oks.show(context);
            }
            break;
            case MSG_GET_FRIENDLIST:{
                int platform = msg.arg1;
                int page = msg.getData().getInt("page");
                int count = msg.getData().getInt("count");
                String name = ShareSDK.platformIdToName(platform);
                Platform plat = ShareSDK.getPlatform(name);
                plat.setPlatformActionListener(new ShareSDKPlatformListener(context));
                plat.SSOSetting(disableSSO);
                plat.listFriend(count, page, null);
            }
            break;
            case MSG_FOLLOW_FRIEND:{
                int platform = msg.arg1;
                String account = (String) msg.obj;
                String name = ShareSDK.platformIdToName(platform);
                Platform plat = ShareSDK.getPlatform(name);
                plat.setPlatformActionListener(new ShareSDKPlatformListener(context));
                plat.SSOSetting(disableSSO);
                plat.followFriend(account);
            }
            break;
        }
        return false;
    }

}
