<template>
  <div>
    <div class="code_text">选择宝宝年龄</div>
    <div class="code_text" style="font-size: 30rpx;">我们将推荐您最适合宝宝的套餐</div>
    
    <div class="item_wrap" @click="goToDetail" >
      <div class="item_head_first"></div>
      <div class="item_content">
        <span class="item_name">0-12个月</span>
        <span >满月/百天/周岁照</span>
      </div>

      <div class="item_address">
        日系小清新风格 <span class="newStyle">新上市</span>
      </div>
    </div>

    <div class="item_wrap"   @click="goToDetail" >
      <div class="item_head_second"></div>
      <div class="item_content">
        <span class="item_name">10个月-12岁</span>
        
      </div>
      <div class="item_address">棚拍、小主题、大头照</div>
    </div>


  </div>
</template>

<script>

export default {
  data: {
    title: "title",
  },

  methods: {
    goToDetail: function(){
      wx.navigateTo({ url:"../photoDetail/main?title="+this.title });
    }

  },

  onLoad() {
    this.title = this.$root.$mp.query.title;
    if(!this.title){
      this.title = "title";
    }

    let that = this;
    wx.setNavigationBarTitle({
      title: that.title 
    })
  }

  
}
</script>

<style>

page{
  background: #EEEEEE;
  height: 100%;
}

.code_text{
  color: #000000;
  font-size: 60rpx;
  font-weight: bold;
  width: 90%;
  margin: 20rpx 5%;
}

.item_wrap{
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 5%;
  width: 90%;
  margin-bottom: 20rpx;
  height: 120rpx;
  background: #ffffff;
  transition: all 0.2s;
}

.item_wrap:active{
  transform: scale(1.1);
}

.item_head_first{
  width: 20rpx;
  height: 100%;
  border-bottom-left-radius: 10rpx;
  border-top-left-radius: 10rpx;
  background: #FFA500;
}

.item_head_second{
  width: 20rpx;
  height: 100%;
  border-bottom-left-radius: 10rpx;
  border-top-left-radius: 10rpx;
  background: #FF3E96;
}

.item_head_third{
  width: 20rpx;
  height: 100%;
  border-bottom-left-radius: 10rpx;
  border-top-left-radius: 10rpx;
  background: #EECBAD;
}

.item_content{
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-left: 40rpx;
  height: 100%;
  flex: 1;
}
.item_name{
  color: #333333;
  font-size: 35rpx;
}

.item_address{
  color: #999999;
  font-size: 25rpx;
  margin-right: 20rpx;
}

.newStyle{
  font-size: 30rpx;
  color: #ff0000;
  font-weight: 1000;
}

</style>
