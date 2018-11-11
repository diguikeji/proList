<template>
  <div>
    <div class="code_text">选择门店</div>
    
    <div class="item_wrap" @click="goToDetail(0)" >
      <div class="item_head_first"></div>
      <div class="item_content">
        <span class="item_name">杭州旗舰店</span>
        <span class="item_address">杭州西湖区留和路139号东信和创园68栋</span>
      </div>
    </div>

    <div class="item_wrap"   @click="goToDetail(1)" >
      <div class="item_head_second"></div>
      <div class="item_content">
        <span class="item_name">上海店</span>
        <span class="item_address">上海市宝山区松兴西路258号半岛1919创意园5218</span>
      </div>
    </div>


    <div class="item_wrap"   @click="goToDetail(2)" >
      <div class="item_head_third"></div>
      <div class="item_content">
        <span class="item_name">成都店</span>
        <span class="item_address">成都市锦江区水辗河南三街U37创意仓库9栋3楼3-3</span>
      </div>
    </div>

  </div>
</template>

<script>

export default {
  data: {
    title: ['杭州旗舰店', '上海店', '成都店']
  },

  methods: {
    goToDetail: function(index){
      let that = this;
      wx.navigateTo({ url: "../selectAge/main?title="+that.title[index] });
    }
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
}
.item_name{
  color: #333333;
  font-size: 35rpx;
}

.item_address{
  color: #999999;
  font-size: 25rpx;
}

</style>
