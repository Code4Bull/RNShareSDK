package com.rnsharesdk;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    protected boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {

      //这个package需要在MainApplication.java文件的getPackages方法中提供。
      // 这个文件位于你的react-native应用文件夹的android目录中。
      // 具体路径是: android/app/src/main/java/com/your-app-name/MainApplication.java.
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
          new ShareSDKReactPackager()
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
      return mReactNativeHost;
  }
}
