import request from './request'
var qs = require('qs');

export const BASE_IMAGE_URL = 'https://wxsgyh.cnderui.com/images/';

/**
 * 获取openid
 */
export function getOpenid(params) {
    return request.post('index.php?g=Api&m=Weixin&a=getOpenid', qs.stringify(params));
}

export function judgeBindInfo(params) {
    return request.post('index.php?g=Api&m=CommonApi&a=judgeBindInfo', qs.stringify(params));
}

/**
 * 首页轮播
 */
export function getImgList() {
    return request.get('index.php?g=Api&m=Project&a=getImgList');
}

/**
 * 类型数据
 */
export function getTypeList() {
    return request.get('index.php?g=Api&m=Project&a=getTypeList');
}

/**
 * 下单
 */
export function addOrder(params) {
    return request.post('index.php?g=Api&m=Weixin&a=addOrder', qs.stringify(params));
}

/**
 * 支付
 */
export function weixinPay(params) {
    return request.post('index.php?g=Api&m=Weixin&a=weixinPay', qs.stringify(params));
}

/**
 * 获取订单
 */
export function getOrder(openid) {
    return request.get('index.php?g=Api&m=Weixin&a=getOrder&openid=' + openid);
}

/**
 * 短信接口 
 */
export function sendcode(params) {
    return request.post('Api/CommonApi/sendcode', qs.stringify(params));
}

/**
 * 绑定手机号
 */
export function bindpost(params) {
    return request.post('Api/CommonApi/bindpost', qs.stringify(params));
}
