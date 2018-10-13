package org.qldc.xianghq;

import android.annotation.SuppressLint;
import android.content.Context;

import org.qldc.xianghq.permissions.ObjectUtils;
import org.qldc.xianghq.permissions.PermissionUtils;
import org.qldc.xianghq.permissions.Utils;

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
                if (ObjectUtils.isNotEmpty(callBack)) callBack.success();

            }

            /**
             * 权限请求失败
             */
            @Override
            public void onDenied() {
                if (ObjectUtils.isNotEmpty(callBack)) callBack.failure();

            }
        }).request();
    }



}
