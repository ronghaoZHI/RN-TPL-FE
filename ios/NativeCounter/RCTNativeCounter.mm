#import "RCTNativeCounter.h"

@implementation RCTNativeCounter {
    NSInteger count;
}

RCT_EXPORT_MODULE(NativeCounter)

- (instancetype)init {
    if (self = [super init]) {
        count = 0;
    }
    return self;
}

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params {
    return std::make_shared<facebook::react::NativeCounterSpecJSI>(params);
}

- (void)increment:(double)value {
    count += (NSInteger)value;
}

- (void)decrement:(double)value {
    count -= (NSInteger)value;
}

- (void)getCount:(RCTPromiseResolveBlock)resolve
         reject:(RCTPromiseRejectBlock)reject {
    resolve(@(count));
}

- (void)reset {
    count = 0;
}

- (void)getCountWithCallback:(RCTResponseSenderBlock)callback {
    callback(@[@(count)]);
}

+ (NSString *)moduleName {
    return @"NativeCounter";
}

@end 