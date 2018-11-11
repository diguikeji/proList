<template>
  <div style="padding-bottom: 160rpx; height: 100%; box-sizing: border-box;" >

     <div class="content_wrap">
      <div style="position: relative;" v-for="(item, index) in typeList" :key="index" 
      :style="{background: (item.t_color)}" @click="orderClick(index)">
        <span>{{item.t_yw_name}}</span>
        <span>{{item.t_zw_name}}</span>
        <span class="san" v-if="tabIndex == index"></span>
      </div>
    </div>

    <div class="vipClass">
      <div class="vipWrap">
        <span class="vip_text">VIP</span>
        <span class="vip_info">消费累计优惠</span>
      </div>

      <div class="vipContentWrap">
        <div class="vip1Wrap">
          <span class="vip_content_vip">VIP1</span>
          <span>进店拍摄第二次享受9.5折</span>
        </div>

        <div class="vip1Wrap" >
          <span class="vip_content_vip">VIP2</span>
          <span>进店拍摄第三次享受9折</span>
        </div>

        <div class="vip1Wrap" style="margin-bottom: 20rpx;">
          <span class="vip_content_vip">VIP3</span>
          <span>进店拍摄第三次享受8.5折</span>
        </div>

        <div class="vip_bottom_text">*限宝宝本人或同一单个家庭累计消费次数</div>
        <div class="vip_bottom_text">*到店尾款结算折扣金额，不和其他优惠同时使用</div>
        <div class="vip_bottom_text">*全部套餐使用-经典主题&小主题</div>

      </div>
    </div>

    <div class="code_text">{{typeItem.t_title}}</div>
    <div class="text_center_info">适合年龄：{{typeItem.t_for_age}}</div>
    <div class="text_center_select">{{typeItem.t_title_info}}</div>


    <div class="select_title">请选择套餐</div>

    <div class="select_wrap">

      <div style="width: 100%;" v-for="(item, index) in typeItem.t_taocan" :key="index">

          <div class="current_select_item" :style="{background: (typeItem.t_color)}" @click="selectItemClick(index)" v-if="item.checked"  >
            <span class="select_item_name">{{item.name}}</span>
            <span>{{item.price}}元</span>
            <input type="radio" class="select_flag" :checked="true">
          </div>

          <div class="select_item"  @click="selectItemClick(index)" v-if="!item.checked"  >
            <span class="select_item_name">{{item.name}}</span>
            <span>{{item.price}}元</span>
            <input type="radio" class="select_flag">
          </div>

          <div class="select_wrap" style="margin: 0rpx 40rpx;" v-if="selectIndex == index">
            <div class="select_content">
              <span class="select_content_name" :style="{background: (typeItem.t_color)}">主题数</span>
              <span class="select_contetn_num">{{item.t_info1}}</span>
            </div>

            <div class="select_content">
              <span class="select_content_name" :style="{background: (typeItem.t_color)}">拍摄数量</span>
              <span class="select_contetn_num">{{item.t_info2}}</span>
            </div>

            <div class="select_content">
              <span class="select_content_name" :style="{background: (typeItem.t_color)}">精修</span>
              <span class="select_contetn_num">{{item.t_info3}}</span>
            </div>

            <div class="select_content">
              <span class="select_content_name" :style="{background: (typeItem.t_color)}">赠送相框</span>
              <span class="select_contetn_num">{{item.t_info4}}</span>
            </div>

            <div class="select_content">
              <span class="select_content_name" :style="{background: (typeItem.t_color)}">底片</span>
              <span class="select_contetn_num">{{item.t_info5}}</span>
            </div>
          </div>


      </div>
    
      
    </div>

    

    <div class="info_wrap" >
      <div class="info_wrap_title" :style="{background: (typeItem.t_color)}">特别说明</div>
      <div class="info_content">

        <wx-parse :content="typeItem.t_shuoming"/>

      </div>
    </div>

    <div class="vipClass">
      <div class="vipWrap">
        <span class="vip_text">VIP</span>
        <span class="vip_info">消费累计优惠</span>
      </div>

      <div class="vipContentWrap">
        <div class="vip1Wrap">
          <span class="vip_content_vip">VIP1</span>
          <span>进店拍摄第二次享受9.5折</span>
        </div>

        <div class="vip1Wrap" >
          <span class="vip_content_vip">VIP2</span>
          <span>进店拍摄第三次享受9折</span>
        </div>

        <div class="vip1Wrap" style="margin-bottom: 20rpx;">
          <span class="vip_content_vip">VIP3</span>
          <span>进店拍摄第三次享受8.5折</span>
        </div>

        <div class="vip_bottom_text">*限宝宝本人或同一单个家庭累计消费次数</div>
        <div class="vip_bottom_text">*到店尾款结算折扣金额，不和其他优惠同时使用</div>
        <div class="vip_bottom_text">*全部套餐使用-经典主题&小主题</div>

      </div>
    </div>

    <div class="code_text" style="margin: 40rpx 0rpx">100%真实客片</div>
    

    <swiper class="swiper center_swiper" indicator-dots="true" >
      <block v-for="(item, index) in typeItem.t_img_detail" :key="index">
          <swiper-item>
              <image :src="item.img" class="center_swiper"  mode="widthFix"/>
          </swiper-item>
      </block>
    </swiper>

    <!-- <div class="code_text" style="margin: 60rpx 0rpx 0rpx;">NICOKIDS</div>
    <div class="bottom_cor">尼克儿童摄影</div>
    <div class="bottom_text">由尼可科技强力驱动</div> -->
    <!-- <div class="code_text" style="margin-bottom: 160rpx;">POWERED BY NICOKIDS</div>   -->

    <div @click="goToSelectDate" class="next_btn">下一步</div>
  </div>
</template>

<script>
import { BASE_IMAGE_URL, getTypeList} from '@/utils/api'
import WxParse from 'mpvue-wxparse'

export default {
  components: {
    WxParse
  },
  data : {
    typeList: [],
    tabIndex: 0,
    list: [1,2,3,4,5,6,7,8,9,0],
    typeItem: {},
    selectIndex: 0
  },

  methods: {
    selectItemClick: function(index){
      let that = this;
      this.typeItem.t_taocan.map(function(it, ind){
        it.checked = false;
        if(ind == index){
          it.checked = true;
        }
        
      });
      this.$forceUpdate();
      
    },
   
    orderClick: function(index){
      this.typeItem = this.typeList[index];
      this.tabIndex = index;
    },

    goToSelectDate: function(){
      wx.setStorageSync('typeItem', this.typeItem);
      let that = this;
      this.typeItem.t_taocan.map(function(it, ind){
        if(it.checked){
          that.selectIndex = ind;
        }
        
      });

      const url = '../selectDate/main?selectIndex='+this.selectIndex;
      wx.navigateTo({ url })
    },

    async getTypeList(){
      let res = await getTypeList();
      if(res.code == 1000){
        
        this.typeList = res.data;
        this.typeItem = this.typeList[this.tabIndex];
        console.log(this.typeItem);

        this.typeList.map(function(item, index){
          item.t_taocan.map(function(it, ind){
            it.checked = false;
            if(ind == 0){
              it.checked = true;
            }
          })
          
        });

        console.log(this.typeList);
      }
    },
    
  },

  onLoad(){
    let that = this;
    wx.setNavigationBarTitle({
      title: "旗舰店"
    });
    this.tabIndex = this.$root.$mp.query.tabIndex;
    this.getTypeList();
  }

  
}
</script>

<style scoped>

  .san{
    width: 0px;
    height: 0px;
    border-width: 20rpx;
    border-style: solid;
    border-color: transparent transparent #ffffff transparent;
    position: absolute;
    bottom: 0rpx;
    left: 50%;
    margin-left: -20rpx;
    display: inline-block;
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
  font-weight: 100;
}

  .face_wrap{
    background: #FFA500;
    position: relative;
  }

  .look_wrap{
    background: #FF3E96;
    position: relative;
  }

  .baby_wrap{
    background: #EECBAD;
    position: relative;
  }

  .theme_wrap{
    background: #AADDcc;
    position: relative;
  }

  .content_wrap span:nth-child(1){
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
    font-size: 30rpx;
    width: 100%;
    text-align: center;
    margin: 20rpx 0rpx;
    padding: 0rpx 20rpx;
  }

  .text_center_select{
    color: #DADADA;
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

.vipClass{
  width: 90%;
  background: #ececec;
  border-radius: 30rpx;
  height: 220rpx;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 30rpx 5%;
  font-size: 20rpx;
}

.vipWrap{
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  flex: 1;
  align-items: center;
  
  color: #AC841B;
}

.vip_text{
  font-size: 60rpx!important;
  font-weight: 1000;
}

.vip_info{
  font-size: 20rpx;
  font-weight: 100;
}

.vipContentWrap{
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  flex: 2;
}

.vip1Wrap{
  display: flex;
  flex-direction: row;
}

.vip_content_vip{
  color: #ffffff;
  font-size: 15rpx;
  border-radius: 10rpx;
  padding: 3rpx 10rpx;
  background: #717171;
  display: inline-block;
  height: 20rpx;
  line-height: 20rpx;
  margin-right: 10rpx;
}

.vip_bottom_text{
  font-size: 18rpx;
  color: #A5A5A5;
}

.select_title{
  font-size: 30rpx;
  text-align: center;
  margin: 30rpx auto;
  font-weight: 300;
  color: #000000;
}

.select_wrap{
  display: flex;
  flex-direction: row;
  justify-content: center;
  color: #ffffff;
}

.info_wrap{
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 20rpx 40rpx 60rpx;
  border-radius: 20rpx;
  border: 1rpx solid #CFCFCF;
  
}

.select_item{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  position: relative;
  background: #ffffff;
  border-radius: 20rpx;
  border: 1rpx solid #CFCFCF;
  padding: 20rpx;
  margin: 20rpx 30rpx;
  flex: 1;
  color: #B3B3B3;
}

.current_select_item{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  position: relative;
  border-radius: 20rpx;
  border: 1rpx solid #CFCFCF;
  padding: 20rpx;
  margin: 20rpx 30rpx;
  flex: 1;
  color: #ffffff;
}

.select_flag{
  position: absolute;
  top: -10rpx;
  right: 10rpx;
  width: 40rpx;
  height: 40rpx;
}

.select_item_name{
  font-size: 45rpx;
}

radio {
  transform:scale(1.2);
}

.select_content{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 10rpx;
  border: solid 1rpx #cfcfcf;
  flex: 1;
  margin: 0rpx 10rpx;
  font-weight: 100;
}

.select_content_name{
  border-top-left-radius: 10rpx;
  border-top-right-radius: 10rpx;
  background: #2CB730;
  color: #ffffff;
  width: 100%;
  display: inline-block;
  text-align: center;
  font-size: 25rpx;
  padding: 10rpx 0rpx;
}

.info_wrap_title{
  border-top-left-radius: 10rpx;
  border-top-right-radius: 10rpx;
  background: #2CB730;
  color: #ffffff;
  width: 100%;
  display: inline-block;
  text-align: center;
  font-size: 25rpx;
  padding: 10rpx 0rpx;
}

.select_contetn_num{
  padding: 20rpx 0rpx;
  display: inline-block;
  font-size: 40rpx;
  color: #B5B5B5;
}

.info_content{
  padding: 30rpx 20rpx;
  font-size: 30rpx;
}

.xscroll{
    height: 400rpx;
    white-space: nowrap;
    display: flex;
  }

  .faceImg{
    height: 400rpx;
    width: 300rpx;
  }

  .next_btn{
    width: 100%;
    background: #2CB730;
    color: #ffffff;
    height: 100rpx;
    line-height: 100rpx;
    text-align: center;
    position: fixed;
    bottom: 0rpx;
    border-radius: 0rpx;
    z-index: 1;
  }

  .firstSelect{
    color: #ffffff;
    background: #FFA500;
  }

  .secondSelect{
    color: #ffffff;
    background: #FF3E96;
  }

  .thirdSelect{
    color: #ffffff;
    background: #EECBAD;
  }

  .fourSelect{
    color: #ffffff;
    background: #AADDcc;
  }

  .unSelect{
    color: #B3B3B3;
    background: #FFFFFF;
  }

</style>
