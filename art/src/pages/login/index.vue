<template>
  <div>
    <div class="code_text">手机号登录</div>
    <input class="phone_input" type="number" placeholder="请输入手机号" placeholder-class="place-holder" maxlength="11"
      v-model="phone">
    <div class="code_wrap">
      <input class="code_input" type="number"  placeholder="请输入验证码" placeholder-class="place-holder" maxlength="6"
        v-model="code">
      <span @click="sendcode">{{codeText}}</span>
    </div>

    <button @click="goToMain">登录</button>

  </div>
</template>

<script>
import { BASE_IMAGE_URL, sendcode, bindpost} from '@/utils/api'
export default {
  data: {
    phone: '',
    code: '',
    codeNum: 60,
    codeText: '获取验证码',
    interval: ''
  },

  methods: {
    async sendcode(){
      if (this.phone == null || this.phone.length != 11){
        wx.showToast({
          icon: 'none',
          title: '手机号输入错误',
          duration: 2000
        });
        return;
      }

       var that = this;

      if (that.codeText == '获取验证码' && that.codeNum == 60){
          that.interval = setInterval(function () {
              
              that.codeNum--;

              that.codeText = that.codeNum + 's';

              if (that.codeNum == 0) {

                that.codeNum = 60;
                that.codeText = '获取验证码';
                clearInterval(that.interval);
              }
            }, 1000);

            console.log(that.phone)

            let params = {
              phone: this.phone
            }
            let result = await sendcode(params);
            if(result.code == 1000){
              wx.showToast({
                icon: 'none',
                title: '发送成功',
                duration: 1000
              });
            }

      }


      
    },
    async goToMain(){
      if (this.phone == null || this.phone.length != 11){
        wx.showToast({
          icon: 'none',
          title: '手机号输入错误',
          duration: 2000
        });
        return;
      }

      if (!this.code){
        wx.showToast({
          icon: 'none',
          title: '验证码输入错误',
          duration: 2000
        });
        return;
      }


      let params = {
        phone: this.phone,
        code: this.code,
        openid: wx.getStorageSync('openid')
      };
      let result = await bindpost(params);
      if(result.code == 1000){
        wx.switchTab({
          url: '../photoDetail/main'
        });
      }



      
    }
  }

  
}
</script>

<style>

.code_text{
  color: #000000;
  font-size: 45rpx;
  font-weight: bold;
  margin-left: 5%;
  width: 90%;
}

.code_wrap{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-left: 5%;
  border-bottom: 1rpx solid #DDDDDD;
  width: 90%;
  margin-bottom: 20rpx;
  height: 100rpx;
  line-height: 100rpx;
}

.code_wrap span{
  font-size: 35rpx;
  color: #2CB730;
  display: inline-block;
  padding: 10rpx;
}

.phone_input{
  width: 90%;
  margin-left: 5%;
  height: 100rpx;
  line-height: 100rpx;
  font-size: 40rpx;
  margin-top: 20rpx; 
  border-bottom: 1rpx solid #DDDDDD;
}
.code_input{
  width: 70%;
  height: 80rpx;
  line-height: 80rpx;
  font-size: 40rpx;
}


.place-holder {
    font-size: 30rpx;
    color: #333333;
}

button{
  width: 90%;
  margin-left: 5%;
  box-sizing: border-box;
  background: #2CB730;
  color: #ffffff;
  font-size: 35rpx;
  border-radius: 10rpx;
  height: 100rpx;
  line-height: 100rpx;
}
</style>
