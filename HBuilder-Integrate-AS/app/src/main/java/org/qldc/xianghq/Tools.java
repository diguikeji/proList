package org.qldc.xianghq;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.support.v7.app.AlertDialog;
import android.widget.Toast;

import com.blankj.utilcode.util.ObjectUtils;
import com.blankj.utilcode.util.PermissionUtils;
import com.blankj.utilcode.util.Utils;

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

    //跳转应用市场
    public static void goToMarket(Activity activity){
        PackageManager pm = activity.getPackageManager();

        List<PackageInfo> infos=pm.getInstalledPackages(PackageManager.GET_UNINSTALLED_PACKAGES);


        Intent intent = new Intent(Intent.ACTION_VIEW);
        Uri uri = Uri.parse("market://details?id=" + "org.qldc.xianghq");//app包名
        intent.setData(uri);
        if(infos != null && (infos.size() > 0)){
            intent.setPackage(infos.get(0).packageName);//应用市场包名
            activity.startActivity(intent);
        }

    }

    //显示强制更新Dialog
    public static void showDialog(Activity activity, final UpdateCallBack callBack){
        Toast.makeText(activity, "dialog", Toast.LENGTH_SHORT).show();

        new AlertDialog.Builder(activity)
                .setTitle("提示")
                .setMessage("请升级到最新版本")
                .setPositiveButton("确定", new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int which) {
                        dialog.dismiss();
                        if(callBack != null){
                            callBack.success();
                        }
                    }
                })
                .setCancelable(false)
                .show();
    }
}
