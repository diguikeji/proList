//
//  ViewController.m
//  Pandora
//
//  Created by Mac Pro_C on 12-12-26.
//  Copyright (c) 2012年 __MyCompanyName__. All rights reserved.
//
#import "ViewController.h"
#import "WebViewController.h"
#import "WebAppController.h"



@interface ViewController ()
{
    WebViewController* pWebViewController;
    WebAppController* pWebAppController;
}

@end


@implementation ViewController

- (void)loadView
{
    
   
    
    pWebAppController = [[WebAppController alloc] init];
    if (pWebAppController) {
        self.navigationController.navigationBarHidden = YES;
        [self.navigationController pushViewController:pWebAppController animated:NO];
        [pWebAppController release];
    }
}


-(void)didReceiveRemoteNotification:(NSDictionary *)userInfo{
    
    NSLog(@"ViewController: %@",userInfo);
    
}


#pragma mark 应用集成


-(IBAction)ShowWebViewPageOne:(id)sender
{
    pWebViewController = [[WebViewController alloc] init];
    if (pWebViewController)
    {
        [self.navigationController pushViewController:pWebViewController animated:YES];
        [pWebViewController release];
    }
    
    // 添加一个原生层的消息监听，可以监听页面中通过NJS发送的消息，并获取附带的数据
    // NJS 发送消息请参考Pandora/apps/HelloH5/plugin.html 文件的PostNotification方法
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(NotiFunction:) name:@"SendDataToNative" object:nil];
}





-(IBAction)ShowWebViewPageTwo:(id)sender
{
    // Webivew集成不能同时WebApp集成，需要修改AppDelegate文件的PDRCore的启动参数
    pWebAppController = [[WebAppController alloc] init];
    if (pWebAppController) {
        self.navigationController.navigationBarHidden = YES;
        [self.navigationController pushViewController:pWebAppController animated:YES];
        [pWebAppController release];
    }
}






- (void)dealloc {
    [super dealloc];
}


@end
