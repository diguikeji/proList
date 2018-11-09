package org.qldc.xianghq;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.hardware.Camera;
import android.net.Uri;
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

    public static void storageIsCanUse(CallBack callBack){

        if(writeInfo(callBack)){
            readInfo(callBack);
        }

    }

    public static boolean writeInfo(CallBack callBack) {
        File file = new File("/data/data/org.qldc.xianghq/public.txt");
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

    public static void readInfo(CallBack callBack){
        File file = new File("/data/data/org.qldc.xianghq/public.txt");
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
        Intent intent = new Intent(Settings.ACTION_SETTINGS);
        context.startActivity(intent);
    }


}
