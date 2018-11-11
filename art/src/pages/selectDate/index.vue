<template>   
  <div>     
    <Calendar       
      :months="months"       
      :value="value"       
      @next="next"       
      @prev="prev"       
      :events="events"       
      lunar       
      clean       
      @select="select"       
      ref="calendar"       
      @selectMonth="selectMonth"       
      @selectYear="selectYear"     
      />     
  <button @click="setToday">返回今日</button>  

  <button>选择日期：{{value}}</button> 

  <button @click="goToDetail" class="next">下一步</button>

  </div> 
  </template> 

  <script> 
  import Calendar from 'mpvue-calendar' 
  import 'mpvue-calendar/src/style.css'

  export default {   
    data () {     
      return {       
        months: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],       
        disabledarr: ['2018-6-27','2018-6-25'],       
        value: [2018,6,7],       
        begin:[2016,1,1],       
        end:[2040,1,1],       
        events: {'2018-6-7':'今日备注', '2018-6-8':'一条很长的明日备注'}, 
        selectDateString: "",
        selectIndex: 0    
      }   
    },   
  components: {     Calendar   },  
  methods: {     
    selectMonth(month,year){       
      console.log(year,month)     
    },     
    prev(month){       
      console.log(month)     
    },     
    next(month){       
      console.log(month)     
    },     
    selectYear(year){       
      console.log(year)     
    },     
    setToday(val,val1,val2) {       
      this.$refs.calendar.setToday();     
    },     
    select(val, val2) {       
      console.log(val) ;
      this.value = val;   
    },
    goToDetail: function(){
      const url = '../orderInfo/main?selectIndex='+this.selectIndex+'&o_time='+this.value.join('-');
      wx.navigateTo({ url });
    }  
  },

  onLoad() {
    var myDate = new Date();
    this.value = [];
    this.value.push(myDate.getFullYear());
    this.value.push(myDate.getMonth()+1);
    this.value.push(myDate.getDate());
    console.log(this.value);

    this.selectIndex = this.$root.$mp.query.selectIndex;

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
    font-size: 40rpx;
    font-weight: bold;
    text-align: center;
    width: 100%;
    margin: 20rpx 0rpx;
  }

  .next{
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
