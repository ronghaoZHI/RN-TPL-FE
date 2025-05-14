package com.myapp.nativecounter;

import androidx.annotation.Nullable;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.module.model.ReactModuleInfo;
import com.facebook.react.module.model.ReactModuleInfoProvider;
import com.facebook.react.TurboReactPackage;

import java.util.HashMap;
import java.util.Map;

/**
 * 计数器 TurboModule 的包装类，用于注册到 React Native
 */
public class NativeCounterPackage extends TurboReactPackage {

    @Nullable
    @Override
    public NativeModule getModule(String name, ReactApplicationContext reactContext) {
        if (name.equals(NativeCounterModule.NAME)) {
            return new NativeCounterModule(reactContext);
        } else {
            return null;
        }
    }

    @Override
    public ReactModuleInfoProvider getReactModuleInfoProvider() {
        return () -> {
            Map<String, ReactModuleInfo> modules = new HashMap<>();
            modules.put(NativeCounterModule.NAME, new ReactModuleInfo(
                    NativeCounterModule.NAME,
                    NativeCounterModule.NAME,
                    false, // canOverrideExistingModule
                    false, // needsEagerInit
                    false, // hasConstants
                    false, // isCxxModule
                    true // isTurboModule
            ));
            return modules;
        };
    }
} 