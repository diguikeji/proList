package org.qldc.xianghq;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.ActivityNotFoundException;
import android.content.ComponentName;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.content.pm.ResolveInfo;
import android.hardware.Camera;
import android.net.Uri;
import android.os.Build;
import android.provider.Settings;
import android.support.v7.app.AlertDialog;
import android.telecom.Call;
import android.text.TextUtils;
import android.widget.Toast;

import com.blankj.utilcode.util.ObjectUtils;
import com.blankj.utilcode.util.PermissionUtils;
import com.blankj.utilcode.util.Utils;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.List;


/**
 * Description:
 * Created by guzhenfu on 2018/10/13.
 */
public class Tools {

    /**
     * 请求权限的回调
     */
    interface CallBack{
        void success();
        void failure();
    }

    /**
     * 请求权限的回调
     */
    interface UpdateCallBack{
        void success();
    }

    /**
     * 初始化工具类
     * @param context
     */
    public static void initUtils(Context context){
        Utils.init(context.getApplicationContext());
    }

    /**
     * 想要申请的权限
     * @param permissions
     */
    @SuppressLint("WrongConstant")
    public static void permission(String[] permissions, final CallBack callBack){


        PermissionUtils.permission(permissions).callback(new PermissionUtils.SimpleCallback() {
            /**
             * 权限请求成功
             */
            @Override
            public void onGranted() {
                if (ObjectUtils.isNotEmpty(callBack))
                    callBack.success();

            }

            /**
             * 权限请求失败
             */
            @Override
            public void onDenied() {
                if (ObjectUtils.isNotEmpty(callBack))
                    callBack.failure();

            }
        }).request();
    }


    /**
     * 返回true 表示可以使用  返回false表示不可以使用
     * @return
     */
    public static void cameraIsCanUse(CallBack callBack) {
        boolean isCanUse = true;
        Camera mCamera = null;
        try {
            mCamera = Camera.open();
            Camera.Parameters mParameters = mCamera.getParameters(); //针对魅族手机
            mCamera.setParameters(mParameters);
        } catch (Exception e) {
            isCanUse = false;
            callBack.failure();
            return;
        }

        if (mCamera != null) {
            try {
                mCamera.release();
            } catch (Exception e) {
                e.printStackTrace();
                //return isCanUse;
                callBack.failure();
                return;
            }
        }
        //return isCanUse;
        callBack.success();
    }

    public static void storageIsCanUse(Context context, CallBack callBack){

        boolean has_permission = (PackageManager.PERMISSION_GRANTED == context.getPackageManager()
                .checkPermission("android.permission.WRITE_EXTERNAL_STORAGE", "org.qldc.xianghq"));

        boolean has_permission1 = (PackageManager.PERMISSION_GRANTED == context.getPackageManager()
                .checkPermission("android.permission.READ_EXTERNAL_STORAGE", "org.qldc.xianghq"));

        if(has_permission && has_permission1){
            callBack.success();
        }else{
            callBack.failure();
        }

//        if(writeInfo(context, callBack)){
//            readInfo(context, callBack);
//        }

    }

    public static boolean writeInfo(Context context, CallBack callBack) {
        File file = new File(context.getExternalCacheDir()+"/public.txt");
        FileOutputStream fos;
        try {
            fos = new FileOutputStream(file);
            fos.write("hahaha".getBytes());
            fos.close();
            return true;
        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
            callBack.failure();
        }
        return false;

    }

    public static void readInfo(Context context, CallBack callBack){
        File file = new File(context.getExternalCacheDir()+"/public.txt");
        FileInputStream fis;
        try {
            fis = new FileInputStream(file);
            BufferedReader br = new BufferedReader(new InputStreamReader(fis));
            String result = br.readLine();
            if(!TextUtils.isEmpty(result)){
                callBack.success();
            }else{
                callBack.failure();
            }
        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
            callBack.failure();
        }
    }



    //跳转应用市场
    public static void goToMarket(Context context){


        PackageManager pm = context.getApplicationContext().getPackageManager();
//
        List<PackageInfo> infos=pm.getInstalledPackages(PackageManager.GET_UNINSTALLED_PACKAGES);

        String pck = "com.tencent.android.qqdownloader";

        int size = infos.size();
        for (int i = 0; i < size; i++) {
            String packageName = infos.get(i).packageName;
            //获取应用市场的包名
            if(TextUtils.equals(packageName, "com.tencent.android.qqdownloader")){
                pck = packageName;
                break;
            }else if(TextUtils.equals(packageName, "com.dragon.android.pandaspace")){
                pck = packageName;
                break;
            }else if(TextUtils.equals(packageName, "com.hiapk.marketpho")){
                pck = packageName;
                break;
            }else if(TextUtils.equals(packageName, "com.yingyonghui.market")){
                pck = packageName;
                break;
            }else if(TextUtils.equals(packageName, "com.tencent.qqpimsecure")){
                pck = packageName;
                break;
            }else if(TextUtils.equals(packageName, "com.mappn.gfan")){
                pck = packageName;
                break;
            }else if(TextUtils.equals(packageName, "com.pp.assistant")){
                pck = packageName;
                break;
            }else if(TextUtils.equals(packageName, "com.oppo.market")){
                pck = packageName;
                break;
            }else if(TextUtils.equals(packageName, "cn.goapk.market")){
                pck = packageName;
                break;
            }else if(TextUtils.equals(packageName, "zte.com.market")){
                pck = packageName;
                break;
            }else if(TextUtils.equals(packageName, "com.yulong.android.coolmart")){
                pck = packageName;
                break;
            }else if(TextUtils.equals(packageName, "com.lenovo.leos.appstore")){
                pck = packageName;
                break;
            }else if(TextUtils.equals(packageName, "com.coolapk.market")){
                pck = packageName;
                break;
            }else if(TextUtils.equals(packageName, "om.qihoo.appstore")){
                pck = packageName;
                break;
            }else if(TextUtils.equals(packageName, "com.qihoo360.mobilesafe")){
                pck = packageName;
                break;
            }else if(TextUtils.equals(packageName, "com.qihoo.cleandroid_cn")){
                pck = packageName;
                break;
            }else if(TextUtils.equals(packageName, "com.baidu.appsearch")){
                pck = packageName;
                break;
            }else if(TextUtils.equals(packageName, "com.wandoujia.phoenix2")){
                pck = packageName;
                break;
            }else if(TextUtils.equals(packageName, "com.xiaomi.market")){

                pck = packageName;
                break;
            }else if(TextUtils.equals(packageName, "com.huawei.appmarket")){
                pck = packageName;
                break;
            }else if(TextUtils.equals(packageName, "com.lenovo.leos.appstore")){
                pck = packageName;
                break;
            }

        }

        Intent intent = new Intent(Intent.ACTION_VIEW);
        Uri uri = Uri.parse("market://details?id=" + "org.qldc.xianghq");//app包名
        intent.setData(uri);
        intent.setPackage(pck);//应用市场包名
        context.startActivity(intent);


    }

    //打开设置页面
    public static void goToSetting(Context context) {
//        Intent intent = new Intent(Settings.ACTION_SETTINGS);
//        context.startActivity(intent);

//        String brand = Build.BRAND;//手机厂商
//        if (TextUtils.equals(brand.toLowerCase(), "redmi") || TextUtils.equals(brand.toLowerCase(), "xiaomi")) {
//            gotoMiuiPermission(context);//小米
//        } else if (TextUtils.equals(brand.toLowerCase(), "meizu")) {
//            gotoMeizuPermission(context);
//        } else if (TextUtils.equals(brand.toLowerCase(), "huawei") || TextUtils.equals(brand.toLowerCase(), "honor")) {
//            gotoHuaweiPermission(context);
//        } else {
//            context.startActivity(getAppDetailSettingIntent(context));
//        }

        String name = Build.MANUFACTURER;
//        name = "123";

        switch (name) {
            case "HUAWEI":
                goHuaWeiMainager(context);
                break;
            case "vivo":
                doStartApplicationWithPackageName(context, "com.bairenkeji.icaller");
                break;
            case "OPPO":
                doStartApplicationWithPackageName(context, "com.coloros.safecenter");
                break;
            case "Coolpad":
                doStartApplicationWithPackageName(context, "com.yulong.android.security:remote");
                break;
            case "Meizu":
                gotoMeizuPermission(context);
                break;
            case "Xiaomi":
                gotoMiuiPermission(context);
                break;
            case "samsung":
                goIntentSetting(context);
                break;
            case "Sony":
                goSonyMainager(context);
                break;
            case "LG":
                goLGMainager(context);
                break;
            default:
                goIntentSetting(context);
                //getAppDetailSettingIntent(context);
                break;
        }


    }

    private static String packageName="org.qldc.xianghq";
    /**
     * 跳转到miui的权限管理页面
     */
    private static void gotoMiuiPermission(Context context) {
        String rom = getMiuiVersion();
        Intent intent=new Intent();
        if ("V6".equals(rom) || "V7".equals(rom)) {
            intent.setAction("miui.intent.action.APP_PERM_EDITOR");
            intent.setClassName("com.miui.securitycenter", "com.miui.permcenter.permissions.AppPermissionsEditorActivity");
            intent.putExtra("extra_pkgname", packageName);
        } else if ("V8".equals(rom) || "V9".equals(rom)) {
            intent.setAction("miui.intent.action.APP_PERM_EDITOR");
            intent.setClassName("com.miui.securitycenter", "com.miui.permcenter.permissions.PermissionsEditorActivity");
            intent.putExtra("extra_pkgname", packageName);
        } else {
            goIntentSetting(context);
        }
        context.startActivity(intent);
    }

    private static String getMiuiVersion() {
        String propName = "ro.miui.ui.version.name";
        String line;
        BufferedReader input = null;
        try {
            Process p = Runtime.getRuntime().exec("getprop " + propName);
            input = new BufferedReader(
                    new InputStreamReader(p.getInputStream()), 1024);
            line = input.readLine();
            input.close();
        } catch (IOException ex) {
            ex.printStackTrace();
            return null;
        } finally {
            try {
                input.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return line;
    }


    /**
     * 跳转到魅族的权限管理系统
     */
    private static void gotoMeizuPermission(Context context) {
        try {
            Intent intent = new Intent("com.meizu.safe.security.SHOW_APPSEC");
            intent.addCategory(Intent.CATEGORY_DEFAULT);
            intent.putExtra("packageName", packageName);
            context.startActivity(intent);
        } catch (ActivityNotFoundException localActivityNotFoundException) {
            localActivityNotFoundException.printStackTrace();
            goIntentSetting(context);
        }
    }

    /**
     * 华为的权限管理页面
     */
    private static void goHuaWeiMainager(Context context) {
        try {
            Intent intent = new Intent(packageName);
            intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            intent.putExtra("packageName", BuildConfig.APPLICATION_ID);
            ComponentName comp = new ComponentName("com.huawei.systemmanager", "com.huawei.permissionmanager.ui.MainActivity");
            intent.setComponent(comp);
            context.startActivity(intent);
        } catch (Exception e) {
            e.printStackTrace();
            goIntentSetting(context);
        }

    }

    private static void goLGMainager(Context context){
        try {
            Intent intent = new Intent(packageName);
            ComponentName comp = new ComponentName("com.android.settings", "com.android.settings.Settings$AccessLockSummaryActivity");
            intent.setComponent(comp);
            context.startActivity(intent);
        } catch (Exception e) {
            e.printStackTrace();
            goIntentSetting(context);
        }
    }


    private static void goSonyMainager(Context context){
        try {
            Intent intent = new Intent(packageName);
            ComponentName comp = new ComponentName("com.sonymobile.cta", "com.sonymobile.cta.SomcCTAMainActivity");
            intent.setComponent(comp);
            context.startActivity(intent);
        } catch (Exception e) {
            e.printStackTrace();
            goIntentSetting(context);
        }
    }


    private static void goIntentSetting(Context context) {
        Intent intent = new Intent(Settings.ACTION_APPLICATION_DETAILS_SETTINGS);
        Uri uri = Uri.fromParts("package", context.getPackageName(), null);
        intent.setData(uri);
        try {
            context.startActivity(intent);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private static void doStartApplicationWithPackageName(Context context, String packagename) {
        // 通过包名获取此APP详细信息，包括Activities、services、versioncode、name等等
        PackageInfo packageinfo = null;
        try {
            packageinfo = context.getPackageManager().getPackageInfo(packagename, 0);
        } catch (PackageManager.NameNotFoundException e) {
            e.printStackTrace();
        }
        if (packageinfo == null) {
            return;
        }
        // 创建一个类别为CATEGORY_LAUNCHER的该包名的Intent
        Intent resolveIntent = new Intent(Intent.ACTION_MAIN, null);
        resolveIntent.addCategory(Intent.CATEGORY_LAUNCHER);
        resolveIntent.setPackage(packageinfo.packageName);
        // 通过getPackageManager()的queryIntentActivities方法遍历
        List<ResolveInfo> resolveinfoList = context.getPackageManager()
                .queryIntentActivities(resolveIntent, 0);
        ResolveInfo resolveinfo = resolveinfoList.iterator().next();
        if (resolveinfo != null) {
            // packageName参数2 = 参数 packname
            String packageName = resolveinfo.activityInfo.packageName;
            // 这个就是我们要找的该APP的LAUNCHER的Activity[组织形式：packageName参数2.mainActivityname]
            String className = resolveinfo.activityInfo.name;
            // LAUNCHER Intent
            Intent intent = new Intent(Intent.ACTION_MAIN);
            intent.addCategory(Intent.CATEGORY_LAUNCHER);
            // 设置ComponentName参数1:packageName参数2:MainActivity路径
            ComponentName cn = new ComponentName(packageName, className);
            intent.setComponent(cn);
            try {
                context.startActivity(intent);
            } catch (Exception e) {
                goIntentSetting(context);
                e.printStackTrace();
            }
        }
    }

    private static void getAppDetailSettingIntent(Context context) {
        Intent localIntent = new Intent();
        localIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        if (Build.VERSION.SDK_INT >= 9) {
            localIntent.setAction("android.settings.APPLICATION_DETAILS_SETTINGS");
            localIntent.setData(Uri.fromParts("package", context.getPackageName(), null));
        } else if (Build.VERSION.SDK_INT <= 8) {
            localIntent.setAction(Intent.ACTION_VIEW);
            localIntent.setClassName("com.android.settings","com.android.settings.InstalledAppDetails");
            localIntent.putExtra("com.android.settings.ApplicationPkgName", context.getPackageName());
        }
        context.startActivity(localIntent);
    }



}
