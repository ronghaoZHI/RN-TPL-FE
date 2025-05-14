package com.myapp.nativecounter;

import androidx.annotation.NonNull;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.Callback;

/**
 * 计数器 TurboModule 的原生实现
 */
public class NativeCounterModule extends NativeCounterSpec {
    public static final String NAME = "NativeCounter";
    private int count = 0;  // 计数值存储

    NativeCounterModule(ReactApplicationContext context) {
        super(context);
    }

    @Override
    @NonNull
    public String getName() {
        return NAME;
    }

    @Override
    public void increment(double value) {
        count += (int) value;
    }

    @Override
    public void decrement(double value) {
        count -= (int) value;
    }

    @Override
    public void getCount(Promise promise) {
        // 返回当前计数值
        promise.resolve(count);
    }

    @Override
    public void reset() {
        count = 0;
    }

    @Override
    public void getCountWithCallback(Callback callback) {
        // 通过回调返回当前计数值
        callback.invoke(count);
    }
} 