<template>
  <div >
    <div class="code_text">预定信息</div>


    <div class="text_center_info">联系方式</div>

    <div class="item_wrap">
      <span class="item_name">家长称呼</span>
      <input type="text" placeholder="请填写" class="item_content" v-model="jiazhang_name">
    </div>

    <div class="item_wrap">
      <span class="item_name">手机</span>
      <input type="number" placeholder="请填写" class="item_content" v-model="jz_phone">
    </div>

    <div class="item_wrap">
      <span class="item_name">Email</span>
      <input type="text" placeholder="用于接收选片通知" class="item_content" v-model="email">
    </div>

    <div class="text_center_info">宝宝信息</div>

    <div class="item_wrap">
      <span class="item_name">姓名</span>
      <input type="text" placeholder="宝宝姓名" class="item_content" v-model="bb_name">
    </div>

    <div class="item_wrap">
      <span class="item_name">小名</span>
      <input type="text" placeholder="宝宝小名" class="item_content" v-model="bb_xiaoming">
    </div>

    <div class="item_wrap">
      <span class="item_name">性别</span>
      
      <radio-group class="radio-group" @change="radioChange">
          <label class="radio" v-for="(item, index) in radios" :key="index">
              <radio :value="item.value" :checked="item.checked"/>{{item.value}}
          </label>
      </radio-group>

    </div>

    <div class="item_wrap">
      <span class="item_name">生日</span>
      <picker mode="date" :value="bb_birthday" start="2000-09-01" end="2100-09-01" @change="bindDateChange">
        <view class="picker">
          {{bb_birthday}} 
        </view>
      </picker>
    </div>

    <div class="text_center_info">相册收件信息</div>

    <div class="item_wrap">
      <span class="item_name">收件地址</span>
      <input type="text" placeholder="收件地址" class="item_content" v-model="address">
    </div>

    <div class="item_wrap">
      <span class="item_name">收件人</span>
      <input type="text" placeholder="收件人" class="item_content" v-model="sj_name">
    </div>

    <div class="item_wrap">
      <span class="item_name">联系电话</span>
      <input type="number" placeholder="联系电话" class="item_content" v-model="lx_phone">
    </div>

    <div class="text_center_info">*是否同意时光壹号将拍摄作品用于客片展示</div>

    <div class="item_wrap" style="padding-bottom: 200rpx;">
      
      <radio-group class="radio-group" @change="agreeRadioChange">
          <label class="radio" v-for="(item, index) in agreeRadios" :key="index">
              <radio :value="item.value" :checked="item.checked"/>{{item.value}}
          </label>
      </radio-group>

    </div>

  <button @click="goToNext">下一步</button>

  </div>
</template>

<script>
import { BASE_IMAGE_URL, addOrder} from '@/utils/api'

export default {
  data : {
    movies: [],
    selectIndex: 0,
    radios: [{value: '男', checked: true}, {value: '女', checked: false}],
    agreeRadios: [{value: '同意', checked: true}, {value: '不同意', checked: false}],
    selectItem: 0,
    bb_birthday: "请选择生日",
    jiazhang_name: '',
    jz_phone: '',
    email: '',
    bb_name: '',
    bb_xiaoming: '',
    bb_sex: '男',
    address: '',
    sj_name: '',
    lx_phone: '',
    is_agree: '同意',
    o_money: '',
    o_openid: '',
    o_type_zw: '',
    o_type_yw: '',
    o_taocan: '',
    o_time: ''
  },

  methods: {
    radioChange: function(e){
      console.log(e.mp.detail.value);
      this.bb_sex = e.mp.detail.value;
      this.radios.map(function(item){
        item.checked = false;
        if(item.value == e.mp.detail.value){
          item.checked = true;
        }
      })
    },
    agreeRadioChange: function(e){
      console.log(e.mp.detail.value);
      this.is_agree = e.mp.detail.value;
      this.agreeRadios.map(function(item){
        item.checked = false;
        if(item.value == e.mp.detail.value){
          item.checked = true;
        }
      })
    },
    bindDateChange: function(e){
      console.log("picker发送选择改变，携带值为", e.mp.detail.value);
      this.bb_birthday = e.mp.detail.value;
    },
     async goToNext(){
       let typeItem = wx.getStorageSync('typeItem');
       let openid =  wx.getStorageSync('openid');
       let params = {
         jiazhang_name: this.jiazhang_name,
         jz_phone: this.jz_phone,
         email: this.email,
         bb_name: this.bb_name,
         bb_xiaoming: this.bb_xiaoming,
         bb_sex: this.bb_sex,
         bb_birthday: this.bb_birthday,
         address: this.address,
         sj_name: this.sj_name,
         lx_phone: this.lx_phone,
         is_agree: this.is_agree,
         o_money: typeItem.t_taocan[this.selectIndex].price,
         o_openid: openid,
         o_type_zw: typeItem.t_zw_name,
         o_type_yw: typeItem.t_yw_name,
         o_taocan: typeItem.t_taocan[this.selectIndex].name,
         o_time: this.o_time
       }
       console.log(params);
        
        let result = await addOrder(params);
        if(result.code == 1000){
          wx.setStorageSync('params', params);
          const url = '../newPhotoDetail/main?o_id='+result.data.o_id;
          wx.navigateTo({ url });
        }else{
          wx.showToast({title: result.msg});
        }

      
    }
    
  },

  onLoad(){
    this.selectIndex = this.$root.$mp.query.selectIndex;
    this.o_time = this.$root.$mp.query.o_time;
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

  button{
    width: 100%;
    background: #2CB730;
    color: #ffffff;
    height: 100rpx;
    line-height: 100rpx;
    text-align: center;
    position: fixed;
    bottom: 0rpx;
    border-radius: 0rpx;
  }

</style>
