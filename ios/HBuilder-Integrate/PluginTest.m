//
//  PluginTest.m
//  HBuilder-Hello
//
//  Created by Mac Pro on 14-9-3.
//  Copyright (c) 2014年 DCloud. All rights reserved.
//

#import "PluginTest.h"
#import "PDRCoreAppFrame.h"
#import "H5WEEngineExport.h"
#import "PDRToolSystemEx.h"
#import "MSCTakePictureViewController.h"
// 扩展插件中需要引入需要的系统库
#import <LocalAuthentication/LocalAuthentication.h>

#import <AVFoundation/AVFoundation.h>
#import <Photos/Photos.h>
#import <UIKit/UIImagePickerController.h>


@implementation PGPluginTest



#pragma mark 这个方法在使用WebApp方式集成时触发，WebView集成方式不触发

/*
 * WebApp启动时触发
 * 需要在PandoraApi.bundle/feature.plist/注册插件里添加autostart值为true，global项的值设置为true
 */
- (void) onAppStarted:(NSDictionary*)options{
   
    NSLog(@"5+ WebApp启动时触发");
    // 可以在这个方法里向Core注册扩展插件的JS
    
}

// 监听基座事件事件
// 应用退出时触发
- (void) onAppTerminate{
    //
    NSLog(@"APPDelegate applicationWillTerminate 事件触发时触发");
}

// 应用进入后台时触发
- (void) onAppEnterBackground{
    //
    NSLog(@"APPDelegate applicationDidEnterBackground 事件触发时触发");
}

// 应用进入前天时触发
- (void) onAppEnterForeground{
    //
    NSLog(@"APPDelegate applicationWillEnterForeground 事件触发时触发");
}

#pragma mark 以下为插件方法，由JS触发， WebView集成和WebApp集成都可以触发

//推送
- (void)PluginTestFunction:(PGMethod*)commands
{
   
        
        if ( commands ) {
            
           
            
            // CallBackid 异步方法的回调id，H5+ 会根据回调ID通知JS层运行结果成功或者失败
            NSString* cbId = [commands.arguments objectAtIndex:0];
            
            // 用户的参数会在第二个参数传回
            NSString* pArgument1 = [commands.arguments objectAtIndex:1];
            
            
            NSString* pArgument2 = [commands.arguments objectAtIndex:2];
            NSString* pArgument3 = [commands.arguments objectAtIndex:3];
            NSString* pArgument4 = [commands.arguments objectAtIndex:4];
            
             NSLog(@"插件123");
            
            /*
            [CoreJPush setTags:[NSSet setWithArray:@[@"movie"]] alias:pArgument1 resBlock:^(BOOL res, NSSet *tags, NSString *alias) {
                
                
                if(res){
                    NSLog(@"设置成功：%@,%@",@(res),tags,alias);
                }else{
                    NSLog(@"设置失败");
                }
            }];
             */

            
            
            
           
            
            
            
            // 如果使用Array方式传递参数
            NSArray* pResultString = [NSArray arrayWithObjects:pArgument1, pArgument2, pArgument3, pArgument4, nil];
            
            // 运行Native代码结果和预期相同，调用回调通知JS层运行成功并返回结果
            // PDRCommandStatusOK 表示触发JS层成功回调方法
            // PDRCommandStatusError 表示触发JS层错误回调方法
            
            // 如果方法需要持续触发页面回调，可以通过修改 PDRPluginResult 对象的keepCallback 属性值来表示当前是否可重复回调， true 表示可以重复回调   false 表示不可重复回调  默认值为false
            
            PDRPluginResult *result = [PDRPluginResult resultWithStatus:PDRCommandStatusOK messageAsArray: pResultString];
            
            // 如果Native代码运行结果和预期不同，需要通过回调通知JS层出现错误，并返回错误提示
            //PDRPluginResult *result = [PDRPluginResult resultWithStatus:PDRCommandStatusError messageAsString:@"惨了! 出错了！ 咋(wu)整(liao)"];
            
            // 通知JS层Native层运行结果
            [self toCallback:cbId withReslut:[result toJSONString]];
        
    }
}


- (void)PluginTakePhotoFunction:(PGMethod*)commands
{
	if ( commands ) {
        
        MSCTakePictureViewController *faceVC = [[MSCTakePictureViewController alloc]init];
        faceVC.takePictureType = MSCTakePictureTypeFace;
        
        faceVC.block = ^(BOOL isFinished, NSData *imageData, UIImage *image){
            
            if (isFinished)
            {
                
                // CallBackid 异步方法的回调id，H5+ 会根据回调ID通知JS层运行结果成功或者失败
                NSString* cbId = [commands.arguments objectAtIndex:0];
                
                // 用户的参数会在第二个参数传回
                NSLog(@"拍照结束");
               NSString* imgName = @"90.jpg";
                NSString *path_sandox =NSHomeDirectory();
                NSString *imagePath = [NSString stringWithFormat:@"%@/Documents/%@",path_sandox,imgName];
                 [UIImagePNGRepresentation(image)
                writeToFile:imagePath atomically:YES];
                
                NSString* pArgument1 = imagePath;
                NSString* pArgument2 = [commands.arguments objectAtIndex:2];
                NSString* pArgument3 = [commands.arguments objectAtIndex:3];
                NSString* pArgument4 = [commands.arguments objectAtIndex:4];
                
                
                
                // 如果使用Array方式传递参数
                NSArray* pResultString = [NSArray arrayWithObjects:pArgument1, pArgument2, pArgument3, pArgument4, nil];
                
                // 运行Native代码结果和预期相同，调用回调通知JS层运行成功并返回结果
                // PDRCommandStatusOK 表示触发JS层成功回调方法
                // PDRCommandStatusError 表示触发JS层错误回调方法
                
                // 如果方法需要持续触发页面回调，可以通过修改 PDRPluginResult 对象的keepCallback 属性值来表示当前是否可重复回调， true 表示可以重复回调   false 表示不可重复回调  默认值为false
                
                PDRPluginResult *result = [PDRPluginResult resultWithStatus:PDRCommandStatusOK messageAsArray: pResultString];
                
                // 如果Native代码运行结果和预期不同，需要通过回调通知JS层出现错误，并返回错误提示
                //PDRPluginResult *result = [PDRPluginResult resultWithStatus:PDRCommandStatusError messageAsString:@"惨了! 出错了！ 咋(wu)整(liao)"];
                
                // 通知JS层Native层运行结果
                [self toCallback:cbId withReslut:[result toJSONString]];
                
                
            }
        };
        
        
        UINavigationController *nav = [[UINavigationController alloc]initWithRootViewController:faceVC];
        [self presentViewController:nav animated:YES completion:nil];
        
        
    }
}


- (void)PluginXcqxFunction:(PGMethod*)commands
{
    
    NSLog(@"初始化&&&&&&&&&&&&&");
    
    // CallBackid 异步方法的回调id，H5+ 会根据回调ID通知JS层运行结果成功或者失败
    NSString* cbId = [commands.arguments objectAtIndex:0];
    
   
    NSString* pArgument2 = [commands.arguments objectAtIndex:2];
    NSString* pArgument3 = [commands.arguments objectAtIndex:3];
    NSString* pArgument4 = [commands.arguments objectAtIndex:4];
    
    
 
    
    //相册的权限
    PHAuthorizationStatus photoAuthorStatus = [PHPhotoLibrary authorizationStatus];
    if (photoAuthorStatus == PHAuthorizationStatusAuthorized) {
        
        NSLog(@"相册的权限&&&&&&&&&&&&&&&&&&&&&&&&&&&");
        
        NSString* pArgument1=@"0";
        
        // 如果使用Array方式传递参数
        NSArray* pResultString = [NSArray arrayWithObjects:pArgument1, pArgument2, pArgument3, pArgument4, nil];
        
        
        
        PDRPluginResult *result = [PDRPluginResult resultWithStatus:PDRCommandStatusOK messageAsArray: pResultString];
        
        
        
        // 通知JS层Native层运行结果
        [self toCallback:cbId withReslut:[result toJSONString]];
        
        //[self presentViewController:picker animated:YES completion:nil];
        
    }else if (photoAuthorStatus == PHAuthorizationStatusDenied){
        
        NSLog(@"#####################");
        UIAlertView *altView= [[UIAlertView alloc] initWithTitle:@"提示" message:@"请在设备的\"设置-隐私-相册\"中允许访问相册。" delegate:self cancelButtonTitle:nil otherButtonTitles:@"确定", nil];
        altView.tag = 10;
        [altView show];
        
        NSString* pArgument1=@"0";
        
        // 如果使用Array方式传递参数
        NSArray* pResultString = [NSArray arrayWithObjects:pArgument1, pArgument2, pArgument3, pArgument4, nil];
        
        
        
        PDRPluginResult *result = [PDRPluginResult resultWithStatus:PDRCommandStatusOK messageAsArray: pResultString];
        
        
        
        // 通知JS层Native层运行结果
        [self toCallback:cbId withReslut:[result toJSONString]];
        
        
    }else if (photoAuthorStatus == PHAuthorizationStatusNotDetermined){
        
        [PHPhotoLibrary requestAuthorization:^(PHAuthorizationStatus status) {
            if (status == PHAuthorizationStatusAuthorized) {
                //[self presentViewController:picker animated:YES completion:nil];
                NSLog(@"#####################fggfggfgf");
                
                
            }else{
                
              
                
                NSString* pArgument1=@"1";
                
                // 如果使用Array方式传递参数
                NSArray* pResultString = [NSArray arrayWithObjects:pArgument1, pArgument2, pArgument3, pArgument4, nil];
                
                
                
                PDRPluginResult *result = [PDRPluginResult resultWithStatus:PDRCommandStatusOK messageAsArray: pResultString];
                
                
                
                // 通知JS层Native层运行结果
                [self toCallback:cbId withReslut:[result toJSONString]];
                
                
                
            }
        }];
        NSLog(@"not Determined");
        
    }else if (photoAuthorStatus == PHAuthorizationStatusRestricted){
        
        NSLog(@"相册的权限222222222222");
        
        
        UIAlertView *altView = [[UIAlertView alloc] initWithTitle:@"提示" message:@"您的相册权限受限" delegate:self cancelButtonTitle:nil otherButtonTitles:@"确定", nil];
        
        altView.tag = 10;
        [altView show];
    }
    
   
    
}

- (void)alertView:(UIAlertView *)alertView clickedButtonAtIndex:(NSInteger)buttonIndex
{
    NSLog(@"你点击了退出");
    //exit(0);
}



- (void)PluginXjqxFunction:(PGMethod*)commands
{
    NSLog(@"以打开相机&");
    
    
    // CallBackid 异步方法的回调id，H5+ 会根据回调ID通知JS层运行结果成功或者失败
    NSString* cbId = [commands.arguments objectAtIndex:0];
    
    // 用户的参数会在第二个参数传回
    
    NSString* pArgument2 = [commands.arguments objectAtIndex:2];
    NSString* pArgument3 = [commands.arguments objectAtIndex:3];
    NSString* pArgument4 = [commands.arguments objectAtIndex:4];
    
    
    
   
    
    
    //判断相机是否能够使用
    AVAuthorizationStatus status = [AVCaptureDevice authorizationStatusForMediaType:AVMediaTypeVideo];
    UIImagePickerControllerSourceType sourceType = UIImagePickerControllerSourceTypeCamera;
    
    UIImagePickerController *picker = [[UIImagePickerController alloc] init];
    //picker.delegate = self;
    picker.allowsEditing = YES;
    picker.sourceType = sourceType;
    if (status == AVAuthorizationStatusAuthorized) {
        /**********   已经授权 可以打开相机   ***********/
        NSLog(@"以打开已经授权&&&&&&&777");
        
        NSString* pArgument1=@"1";
        
        // 如果使用Array方式传递参数
        NSArray* pResultString = [NSArray arrayWithObjects:pArgument1, pArgument2, pArgument3, pArgument4, nil];
        
        
        
        PDRPluginResult *result = [PDRPluginResult resultWithStatus:PDRCommandStatusOK messageAsArray: pResultString];
        
        
        
        // 通知JS层Native层运行结果
        [self toCallback:cbId withReslut:[result toJSONString]];
        
        
        if ([UIImagePickerController isSourceTypeAvailable:UIImagePickerControllerSourceTypeCamera])
        {
            
            //[self presentViewController:picker animated:YES completion:^{
            
            // }];
        }
        /**********   已经授权 可以打开相机   ***********/
    }else if (status == AVAuthorizationStatusNotDetermined){
        
        [AVCaptureDevice requestAccessForMediaType:AVMediaTypeVideo completionHandler:^(BOOL granted) {
            if (granted) {
                //第一次用户接受
                NSLog(@"以打开相机&&&&&&&&&&&&&&&&&&&&&&&&&&&777");
                //[self presentViewController:picker animated:YES completion:nil];
                // 如果使用Array方式传递参数
                 NSString* pArgument1=@"1";
                NSArray* pResultString = [NSArray arrayWithObjects:pArgument1, pArgument2, pArgument3, pArgument4, nil];
                
                
                
                PDRPluginResult *result = [PDRPluginResult resultWithStatus:PDRCommandStatusOK messageAsArray: pResultString];
                
                
                
                // 通知JS层Native层运行结果
                [self toCallback:cbId withReslut:[result toJSONString]];
                
                
            }else{
                //用户拒绝
                NSLog(@"以打开相机&&&&&&&&&&&&&&&&&&&&&&&&&&&444");
                
                NSString* pArgument1=@"0";
                NSArray* pResultString = [NSArray arrayWithObjects:pArgument1, pArgument2, pArgument3, pArgument4, nil];
                
                
                
                PDRPluginResult *result = [PDRPluginResult resultWithStatus:PDRCommandStatusOK messageAsArray: pResultString];
                
                
                
                // 通知JS层Native层运行结果
                [self toCallback:cbId withReslut:[result toJSONString]];
                
               
            }
        }];
    }else if (status == AVAuthorizationStatusRestricted){
        UIAlertView *aview = [[UIAlertView alloc] initWithTitle:@"提示" message:@"您的相机权限受限" delegate:self cancelButtonTitle:nil otherButtonTitles:@"确定", nil];
        aview.tag = 10;
        [aview show];
    }else if (status == AVAuthorizationStatusDenied){
        //UIAlertView *aview= [[UIAlertView alloc] initWithTitle:@"提示" message:@"请在设备的\"设置-隐私-相机\"中允许访问相机。" delegate:self cancelButtonTitle:nil otherButtonTitles:@"确定", nil];
        //aview.tag = 10;
        //[aview show];
        
       
        
        
        //UIAlertView *altView = [[UIAlertView alloc]initWithTitle:@"提示" message:@"请在设备的\"设置-隐私-相机\"中允许访问相册。" delegate:self cancelButtonTitle:nil otherButtonTitles:@"确定", nil];
        
        //[altView show];
        
        NSString* pArgument1=@"0";
        NSArray* pResultString = [NSArray arrayWithObjects:pArgument1, pArgument2, pArgument3, pArgument4, nil];
        
        
        
        PDRPluginResult *result = [PDRPluginResult resultWithStatus:PDRCommandStatusOK messageAsArray: pResultString];
        
        
    
        
        
        // 通知JS层Native层运行结果
        [self toCallback:cbId withReslut:[result toJSONString]];
        
        
        
        
    }
    
    
    
   
    
    
}


- (void)PluginTakePhoto1Function:(PGMethod*)commands
{
    if ( commands ) {
        
        MSCTakePictureViewController *faceVC = [[MSCTakePictureViewController alloc]init];
        faceVC.takePictureType = MSCTakePictureTypeBack;
        
        faceVC.block = ^(BOOL isFinished, NSData *imageData, UIImage *image){
            
            if (isFinished)
            {
                
                // CallBackid 异步方法的回调id，H5+ 会根据回调ID通知JS层运行结果成功或者失败
                NSString* cbId = [commands.arguments objectAtIndex:0];
                
                // 用户的参数会在第二个参数传回
                NSLog(@"拍照结束");
                NSString* imgName = @"90.jpg";
                NSString *path_sandox =NSHomeDirectory();
                NSString *imagePath = [NSString stringWithFormat:@"%@/Documents/%@",path_sandox,imgName];
                 [UIImagePNGRepresentation(image)
                  writeToFile:imagePath atomically:YES];
                
                NSString* pArgument1 = imagePath;
                NSString* pArgument2 = [commands.arguments objectAtIndex:2];
                NSString* pArgument3 = [commands.arguments objectAtIndex:3];
                NSString* pArgument4 = [commands.arguments objectAtIndex:4];
                
                
                
                // 如果使用Array方式传递参数
                NSArray* pResultString = [NSArray arrayWithObjects:pArgument1, pArgument2, pArgument3, pArgument4, nil];
                
                // 运行Native代码结果和预期相同，调用回调通知JS层运行成功并返回结果
                // PDRCommandStatusOK 表示触发JS层成功回调方法
                // PDRCommandStatusError 表示触发JS层错误回调方法
                
                // 如果方法需要持续触发页面回调，可以通过修改 PDRPluginResult 对象的keepCallback 属性值来表示当前是否可重复回调， true 表示可以重复回调   false 表示不可重复回调  默认值为false
                
                PDRPluginResult *result = [PDRPluginResult resultWithStatus:PDRCommandStatusOK messageAsArray: pResultString];
                
                // 如果Native代码运行结果和预期不同，需要通过回调通知JS层出现错误，并返回错误提示
                //PDRPluginResult *result = [PDRPluginResult resultWithStatus:PDRCommandStatusError messageAsString:@"惨了! 出错了！ 咋(wu)整(liao)"];
                
                // 通知JS层Native层运行结果
                [self toCallback:cbId withReslut:[result toJSONString]];
                
                
            }
        };
        
        
        UINavigationController *nav = [[UINavigationController alloc]initWithRootViewController:faceVC];
        [self presentViewController:nav animated:YES completion:nil];
        
        
    }
}

// 调用指纹解锁
- (void)AuthenticateUser:(PGMethod*)command
{
    if (nil == command) {
        return;
    }
    BOOL isSupport = false;
    NSString* pcbid = [command.arguments objectAtIndex:0];
    NSError* error = nil;
    NSString* LocalReason = @"HBuilder指纹验证";
    
    // Touch ID 是IOS 8 以后支持的功能
    if ([PTDeviceOSInfo systemVersion] >= PTSystemVersion8Series) {
        LAContext* context = [[LAContext alloc] init];
        if ([context canEvaluatePolicy:LAPolicyDeviceOwnerAuthenticationWithBiometrics error:&error]) {
            isSupport = true;
            [context evaluatePolicy:LAPolicyDeviceOwnerAuthenticationWithBiometrics localizedReason:LocalReason reply:^(BOOL success, NSError * _Nullable error) {
                PDRPluginResult * pResult = nil;
                
                if (success) {
                    
                    pResult = [PDRPluginResult resultWithStatus: PDRCommandStatusOK messageAsDictionary:@{@"state":@(0), @"message":@"成功"}];
                }
                else{
                    NSDictionary* pStringError = nil;
                    switch (error.code) {
                        case LAErrorSystemCancel:
                        {
                            pStringError = @{@"state":@(-1), @"message":@"系统取消授权(例如其他APP切入)"};
                            break;
                        }
                        case LAErrorUserCancel:
                        {
                            pStringError = @{@"state":@(-2), @"message":@"用户取消Touch ID授权"};
                            break;
                        }
                        case LAErrorUserFallback:
                        {
                            pStringError  = @{@"state":@(-3), @"message":@"用户选择输入密码"};
                            break;
                        }
                        case LAErrorTouchIDNotAvailable:{
                            pStringError  = @{@"state":@(-4), @"message":@"设备Touch ID不可用"};
                            break;
                        }
                        case LAErrorTouchIDLockout:{
                            pStringError  = @{@"state":@(-5), @"message":@"Touch ID被锁"};
                            break;
                        }
                        case LAErrorAppCancel:{
                            pStringError  = @{@"state":@(-6), @"message":@"软件被挂起取消授权"};
                            break;
                        }
                        default:
                        {
                            pStringError  = @{@"state":@(-7), @"message":@"其他错误"};
                            break;
                        }
                    }
                    pResult = [PDRPluginResult resultWithStatus:PDRCommandStatusError messageAsDictionary:pStringError];
                    
                }
                
                [self toCallback:pcbid withReslut:[pResult toJSONString]];
            }];
        }
        else{
            NSDictionary* pStringError = nil;
            switch (error.code) {
                case LAErrorTouchIDNotEnrolled:
                {
                    pStringError  = @{@"state":@(-11), @"message":@"设备Touch ID不可用"};
                    break;
                }
                case LAErrorPasscodeNotSet:
                {
                    pStringError  = @{@"state":@(-12), @"message":@"用户未录入Touch ID"};
                    break;
                }
                    
                default:
                    break;
            }
        }
    }
   
    if (!isSupport) {
        PDRPluginResult* pResult = [PDRPluginResult resultWithStatus:PDRCommandStatusError messageAsString:@"Device Not Support"];
        [self toCallback:pcbid withReslut:[pResult toJSONString]];
    }
}


- (NSData*)PluginTestFunctionSync:(PGMethod*)command
{
    // 根据传入获取参数
    NSString* pArgument1 = [command.arguments objectAtIndex:0];
    NSString* pArgument2 = [command.arguments objectAtIndex:1];
    NSString* pArgument3 = [command.arguments objectAtIndex:2];
    NSString* pArgument4 = [command.arguments objectAtIndex:3];
    
    // 拼接成字符串
    NSString* pResultString = [NSString stringWithFormat:@"%@ %@ %@ %@", pArgument1, pArgument2, pArgument3, pArgument4];

    // 按照字符串方式返回结果
    return [self resultWithString: pResultString];
}


- (NSData*)PluginTestFunctionSyncArrayArgu:(PGMethod*)command
{
    // 根据传入参数获取一个Array，可以从中获取参数
    NSArray* pArray = [command.arguments objectAtIndex:0];
    
    // 创建一个作为返回值的NSDictionary
    NSDictionary* pResultDic = [NSDictionary dictionaryWithObjects:pArray forKeys:[NSArray arrayWithObjects:@"RetArgu1",@"RetArgu2",@"RetArgu3", @"RetArgu4", nil]];

    // 返回类型为JSON，JS层在取值是需要按照JSON进行获取
    return [self resultWithJSON: pResultDic];
}

@end
