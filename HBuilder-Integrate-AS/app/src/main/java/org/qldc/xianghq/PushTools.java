package org.qldc.xianghq;

import android.app.ActivityManager;
import android.content.Context;
import android.content.Intent;

import java.util.ArrayList;
import java.util.List;

import io.dcloud.common.DHInterface.IWebview;
import io.dcloud.feature.internal.sdk.SDK;

/**
 * Description:
 * Created by guzhenfu on 2018/10/14.
 */
public class PushTools {

    /**
     * 返回app运行状态
     *
     * @param context
     *            一个context
     * @param packageName
     *            要判断应用的包名
     * @return int 1:前台 2:后台 0:不存在
     */
    public static int isAppAlive(Context context, String packageName) {
        ActivityManager activityManager = (ActivityManager) context
                .getSystemService(Context.ACTIVITY_SERVICE);
        List<ActivityManager.RunningTaskInfo> listInfos = activityManager
                .getRunningTasks(20);
        // 判断程序是否在栈顶
        if (listInfos.get(0).topActivity.getPackageName().equals(packageName)) {
            return 1;
        } else {
            // 判断程序是否在栈里
            for (ActivityManager.RunningTaskInfo info : listInfos) {
                if (info.topActivity.getPackageName().equals(packageName)) {
                    return 2;
                }
            }
            return 0;// 栈里找不到，返回3
        }
    }



    /**
     * 自动判断appUI进程是否已在运行，设置跳转信息
     *
     * @param context
     */
    public static void startActivityWithAppIsRuning(Context context, String string) {
        ArrayList<IWebview> weblist = SDK.obtainAllIWebview();
        for(int i=0;i<weblist.size();i++){
            if(weblist.get(i).getOriginalUrl().contains("home.html") ){

                weblist.get(i).evalJS("javascript:notification("+string+")");
            }
        }

        int isAppRuning = isAppAlive(context, context.getPackageName());
        if (isAppRuning != 0) {


            Intent newIntent = new Intent(context, io.dcloud.PandoraEntry.class);

            newIntent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            context.startActivity(newIntent);
            return;
        }
        // 如果app进程已经被杀死，先重新启动app，将DetailActivity的启动参数传入Intent中，参数经过
        // SplashActivity传入MainActivity，此时app的初始化已经完成，在MainActivity中就可以根据传入
        // 参数跳转到DetailActivity中去了
        Intent launchIntent = context.getPackageManager()
                .getLaunchIntentForPackage(context.getPackageName());
        launchIntent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK
                | Intent.FLAG_ACTIVITY_RESET_TASK_IF_NEEDED);
        context.startActivity(launchIntent);
    }



}
