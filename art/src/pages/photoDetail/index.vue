<template>
  <div >
    <swiper class="swiper home_top" indicator-dots="true" autoplay="true" interval="5000" duration="1000">
        <block v-for="(item, index) in movies" :key="index">
            <swiper-item>
                <image :src="item.t_url" class="home_top"  mode="widthFix"/>
            </swiper-item>
        </block>
    </swiper>

    <div class="content_wrap">
      <div class="content_item_wrap" v-for="(item, index) in typeList" :key="index" 
      :style="{background: (item.t_color)}" @click="orderClick(index)">
        <span>{{item.t_yw_name}}</span>
        <span>{{item.t_zw_name}}</span>
      </div>
    </div>


    <div v-for="(it, itIndex) in typeList" :key="itIndex">
        <div class="code_text">{{it.t_title}}</div>
        <div class="text_center_info">适合年龄：{{it.t_for_age}}</div>
        <div class="text_center_select">{{it.t_title_info}}</div>

        <swiper class="swiper center_swiper" indicator-dots="true" >
          <block v-for="(item, index) in it.t_img_index" :key="index">
              <swiper-item>
                  <image :src="item.img" class="center_swiper" @click="orderClick(itIndex)" mode="widthFix"/>
              </swiper-item>
          </block>
      </swiper>

    </div>

  </div>
</template>

<script>
import { BASE_IMAGE_URL, getImgList, getOpenid, getTypeList} from '@/utils/api'

export default {
  data : {
    movies: [],
    title: "title",
    typeList: []
  },

  methods: {
    async getImgList() {
      let res = await getImgList();
      if(res.code == 1000){
        console.log(res);
        this.movies = res.data;
      }
    },

    async getTypeList(){
      let res = await getTypeList();
      if(res.code == 1000){
        console.log(res);
        this.typeList = res.data;
      }
    },

    async getOpenid(params){
      var result = await getOpenid(params);
      console.log(result);
      if(result && result.openid){
          wx.setStorageSync('openid', result.openid);
        }
      if(!result.user_info || !result.user_info.phone){
        //未绑定手机号
        wx.redirectTo({
            url: '../login/main',
          });
      }
    },

    orderClick: function(index){
      wx.navigateTo({ url:"../orderFirst/main?tabIndex="+index })
    }
    
  },

  onLoad(){
    wx.setNavigationBarTitle({
      title: "摄影" 
    });
    this.getImgList();
    this.getTypeList();
  },

  onShow: function(){
      let that = this;
      wx.login({
          success: function(res){
              var params = {
                  //小程序唯一标识
                  appid: 'wx14d40022ef21aaf8',
          　　 　　//小程序的 app secret
                  secret: '33f599632b37da0328daedc86d4c27e8',
                  code: res.code
              }
              that.getOpenid(params);
          }
      });
      
  },

  
}
</script>

<style scoped>

  .home_top{
      width: 100%;
  }
  .center_swiper{
    width: 100%;
  }



  .content_wrap{
    width: 100%;
    display: flex;
    flex-direction: row;
  }

.content_wrap div{
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  font-size: 20rpx;
  height: 120rpx;
  
}

.content_wrap span{
  font-weight: bold;
}


  .content_item_wrap:active{
    transform: scale(1.1);
  }

  span:nth-child(1){
    font-size: 45rpx;
  }

  .code_text{
    color: #000000;
    font-size: 40rpx;
    font-weight: bold;
    text-align: center;
    width: 100%;
    margin: 20rpx 0rpx;
  }

  .text_center_info{
    color: #585858;
    font-size: 25rpx;
    width: 100%;
    text-align: center;
    margin: 20rpx 0rpx;
  }

  .text_center_select{
    color: #C3C3C3;
    font-size: 40rpx;
    text-align: center;
    width: 100%;
    font-weight: 100;
    margin: 20rpx 0rpx;
  }

  .xscroll{
    height: 300rpx;
    white-space: nowrap;
    display: flex;
  }

  .faceImg{
    height: 300rpx;
  }

  ::-webkit-scrollbar {
  width: 0;
  height: 0;
  color: transparent;
}

.bottom_cor{
  font-size: 20rpx;
  text-align: center;
}

.bottom_text{
  color: #DADADA;
  font-size: 30rpx;
  text-align: center;
  font-weight: 100;
}

</style>
