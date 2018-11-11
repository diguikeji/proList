<template>
  <div >
    <div class="code_text">订单信息</div>


    <div class="text_center_info">联系方式</div>

    <div class="item_wrap">
      <span class="item_name">家长称呼</span>
      <span>{{item.jiazhang_name}}</span>
    </div>

    <div class="item_wrap">
      <span class="item_name">手机</span>
      <span>{{item.jz_phone}}</span>
    </div>

    <div class="item_wrap">
      <span class="item_name">Email</span>
      <span>{{item.email}}</span>
    </div>

    <div class="text_center_info">宝宝信息</div>

    <div class="item_wrap">
      <span class="item_name">姓名</span>
      <span>{{item.bb_name}}</span>
    </div>

    <div class="item_wrap">
      <span class="item_name">小名</span>
      <span>{{item.bb_xiaoming}}</span>
    </div>

    <div class="item_wrap">
      <span class="item_name">性别</span>
      <span>{{item.bb_sex}}</span>

    </div>

    <div class="item_wrap">
      <span class="item_name">生日</span>
      <span>{{item.bb_birthday}}</span>
    </div>

    <div class="text_center_info">相册收件信息</div>

    <div class="item_wrap">
      <span class="item_name">收件地址</span>
      <span>{{item.address}}</span>
    </div>

    <div class="item_wrap">
      <span class="item_name">收件人</span>
      <span>{{item.sj_name}}</span>
    </div>

    <div class="item_wrap">
      <span class="item_name">联系电话</span>
      <span>{{item.lx_phone}}</span>
    </div>

    <div class="item_wrap">
      <span class="item_name">套餐名称</span>
      <span>{{item.o_taocan}}</span>
    </div>

    <div class="item_wrap">
      <span class="item_name">套餐金额</span>
      <span>{{item.o_money}}元</span>
    </div>

    <div class="text_center_info">*是否同意时光壹号将拍摄作品用于客片展示</div>

    <div class="item_wrap" style="padding-bottom: 200rpx;">
      
      <span>{{item.is_agree}}</span>

    </div>

    <div class="bottom_wrap">
      <span class="money_text">支付金额：{{item.o_money}}元</span>
      <span class="pay_btn" @click="goToNext">支付</span>
    </div>

  </div>
</template>

<script>
import { BASE_IMAGE_URL, weixinPay} from '@/utils/api'

export default {
  data : {
    item: '',
    o_id: {}
  },

  methods: {
    async goToNext(){
      let params = {
        body: this.o_id,
        fee: this.item.o_money,
        detail: '套餐费',
        openid: wx.getStorageSync('openid'),
      }
      let result = await weixinPay(params);
      if(result.code == 1000){
        console.log(result);
        wx.requestPayment({
            'timeStamp': result.timeStamp,
            'nonceStr': result.nonceStr,
            'package': result.package,
            'signType': 'MD5',
            'paySign': result.paySign,
            'success':function(res){
                console.log(res);
                wx.showToast({
                    title: '支付成功',
                    icon: 'none',
                    duration: 1000
                });
                wx.navigateBack({
                    delta: 10
                })
            },
            'fail':function(res){
                console.log(res);
                wx.showToast({
                    title: '支付失败',
                    icon: 'none',
                    duration: 1000
                });
            }
        })

      }
    }
  },

  onLoad(){
    this.item = wx.getStorageSync('params');
    this.o_id = this.$root.$mp.query.o_id;
  }
  
}
</script>

<style scoped>

  .code_text{
    color: #000000;
    font-size: 50rpx;
    font-weight: bold;
    margin: 20rpx 30rpx;
  }

  .text_center_info{
    color: #585858;
    font-size: 30rpx;
    margin: 20rpx 30rpx;
  }

  .item_wrap{
    display: flex;
    flex-direction: row;
    height: 100rpx;
    align-items: center;
    margin: 0rpx 30rpx;
    border-bottom: 1rpx solid #DDDDDD;
  }

  .item_name{
    display: inline-block;
    width: 200rpx;
  }

  .item_content{
    display: flex;
    flex: 1;
  }

  .radio-group{
    display: flex;
    flex-direction: row;
    flex: 1;
  }
  
  .radio{
    display: flex;
    flex: 1;
    margin-left: 20rpx;
  }

  .bottom_wrap{
    width: 100%;
    background: #2CB730;
    color: #ffffff;
    height: 100rpx;
    line-height: 100rpx;
    text-align: center;
    position: fixed;
    bottom: 0rpx;
    border-radius: 0rpx;
    display: flex;
    flex-direction: row;
  }

  .money_text{
    display: flex;
    flex: 2;
    justify-content: end;
  }
  .pay_btn{
    display: flex;
    flex: 1;
    justify-content: center;
    background: #ff0000;
  }

</style>
