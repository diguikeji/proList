<template>
  <div>
    <div class="code_text">我的订单</div>
    
    <div class="list_wrap" v-if="!isEmpty">
        <div class="item_wrap" v-for="(item,index) in list" :key="index" >
            <div class="item_top">
              <span>套餐类型: {{item.o_taocan}}</span>
              <span style="color: #ff0000;">状态：{{item.o_status == 0 ? '待支付' : '已支付'}}</span>
            </div>

            <div class="item_top">
              <span>套餐中文名称：{{item.o_type_zw}}</span>
              <span>套餐英文名称：{{item.o_type_yw}}</span>
            </div>

            <div class="item_top">
              <span>预约服务时间：{{item.o_time}}</span>
              <span>订单创建时间：{{item.o_create_time}}</span>
            </div>

            <div class="item_top">
              <span>baby大名：{{item.bb_name}} &nbsp; &nbsp; 家长电话：{{item.jz_phone}}</span>
              <span>家长名字：{{item.jiazhang_name}}</span>
            </div>

            <div class="item_top">
              <span>总计：￥{{item.o_money}} </span>
              <span v-if="item.o_status == 0" class="payBtn" @click="pay(index)">支付</span>
            </div>

        </div>
    </div>

        <div style="margin-top: 50rpx; color: #dddddd; text-align: center;" v-if="isEmpty">
              暂无订单
        </div>

  </div>
</template>

<script>
import { BASE_IMAGE_URL, getOrder, weixinPay} from '@/utils/api'

export default {
  data: {
    list: [],
    phone: BASE_IMAGE_URL+'phone.png',
    isEmpty: false
  },

  methods: {
    async getOrder(){
      let openid =  wx.getStorageSync('openid');
      let result = await getOrder(openid);
      if(result.code == 1000){
        
        result.data.map(function(item){
          item.o_create_time = item.o_create_time.split(" ")[0];
        });
        this.list = result.data;
        console.log(this.list);
      }
    },

    async pay(index){
      let that = this;
      let item = this.list[index];
      let params = {
        body: item.o_id,
        fee: item.o_money,
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
                that.getOrder();
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

      }else{
        wx.showToast({
            title: result.msg,
            icon: 'none',
            duration: 1000
        });
      }
    }
  },

  onLoad(){
    this.getOrder();
  }

  
}
</script>

<style>

page{
  background: #dddddd;
  height: 100%;
}

.code_text{
  color: #000000;
  font-size: 40rpx;
  font-weight: bold;
  padding-left: 5%;
  width: 100%;
  box-sizing: border-box;
  background: #ffffff;
}

.item_wrap{
  display: flex;
  flex-direction: column;
  margin-top: 20rpx;
  background: #ffffff;
  padding: 20rpx;
  font-size: 30rpx;
}

.item_top{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-bottom: 1rpx solid #dddddd;
  padding:  20rpx 0rpx;
}

.item_top img{
  width: 50rpx;
  height: 50rpx;
}

.payBtn{
  display: inline-block;
  padding: 10rpx 30rpx;
  border-radius: 10rpx;
  background: #ff0000;
  margin-right: 20rpx;
  color: #ffffff;
}


</style>
