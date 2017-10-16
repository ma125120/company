<template>
  <div class="list">
	<p class="timeTip">活动结束倒计时</p>
   	<div class="time flex">
   		<div class="timeBor">{{times.day}}天</div>
   		<div class="timeBor">{{times.hour}}时</div>
   		<div class="timeBor">{{times.minute}}分</div>
   		<div class="timeBor">{{times.second}}秒</div>
   	</div>
   	<div class="body">
   		<div class="item flex" v-for="(v,i) in userList">
   			<div class='l'>
   				<img :src="'./static/imgs/svg/crown.svg'" alt="" v-if="i<3" class='crown' />
   				<img :src="v.us_pic1" alt="" class='l_img'>
   			</div>
   			<div class='m'>
   				<p class='t'>{{v.us_name+"  "+v.number+"号"}}</p>
   				<p class='b'>{{"票数："+v.us_tiket}}</p>
   			</div>
   			<div :class="i<3?'special r':'r'">{{i+1}}</div>
   		</div>
   	</div>
  </div>
</template>

<script>
import infos from '../../../static/json/info.js'
import {sort} from '../../util/util.js'
export default {
  name: 'hello',
  data () {
    return {
    	times:{
    		day:1,
    		hour:10,
    		min:30,
    		sec:'06'
    	},
    	userList:[],
    	infos:[]
    }
  },
  methods:{
    isWeiXin(){ 
      var ua = window.navigator.userAgent.toLowerCase(); 
      if(ua.match(/MicroMessenger/i) == 'micromessenger'){ 
      return true; 
      }else{ 
      return false; 
      } 
    },
  	loadMore() {
  		this.infos=this.infos.concat(arr.slice(0,3));
  	},
    toLocal(num) {
      var n = num.toString()
      return n[1] ? n : '0' + n
    },
    comTime(nowTime,oldTime) {
      var now=new Date(nowTime).getTime(),
          old=new Date(oldTime).getTime(),
          minus=Math.abs(old-now);
      var time=minus/1000,
          day=Math.floor(time/(60*60*24)),
          hour=Math.floor(time % (24 * 60 * 60) / (60 * 60)),
          minute=Math.floor(time % (24 * 60 * 60) % (60 * 60) / 60),
          second=Math.floor(time % (24 * 60 * 60) % (60 * 60) % 60);
      return {
        day:day,
        hour:this.toLocal(hour),
        minute:this.toLocal(minute),
        second:this.toLocal(second)
      }
    },
  },
  created() {
  	var t=this;
    if(!t.isWeiXin()) {
      t.$router.replace('/noWeixin');
    }
    var loading = t.$weui.loading('loading', {
        className: 'custom-classname'
    });
  	/*获取选手信息*/
  	this.$http.get(`${this.$URL}/main/getUserListByOrder.htm?activity_id=${this.$AC_ID}`)
    .then(res=>{
      let {state}=res.data;
      if(state==0) {
        let userList=res.data.data.userList;
        t.userList=userList;
        loading.hide();
      }
    });
  	/*获取时间*/
  	    /*获取活动信息*/
    this.$http.get(`${this.$URL}/main/getmain.htm?activity_id=${this.$AC_ID}`)
    .then(res=>{
      let {state}=res.data;
      if(state==0) {
        let activity=res.data.data.activity[0];
        /*计算时间*/
        setInterval(function() {
          let time=t.comTime(new Date(),activity.end_at);
          t.times=time;
        },1000);
      }
    }).catch(err=>{
      console.log(err)
    });
  }
}
</script>

<style scoped lang='scss'>
$gray:#9c9c9c;
.list {
	width:90%;
	margin-left:5%;
}
.timeTip {
	margin:10px 0;
	color:#A9A9A9;
}
.time {
	margin:20px 0 10px 0;
	.timeBor {
		margin-right:22px;
		padding:6px;
		font-size:16rem;
		border:thin solid $gray;
		border-radius: 5px;
	}
}
.body {
	.item {
		padding:10px 0 20px 0;
		border-bottom:thin solid #eee;
	}
	.item:last-of-type {
		border-bottom:none;
	}
}
.l {
	width:30%;
	text-align: center;
	position: relative;
	.l_img {
		display: inline-block;
		width:60px;
		height:60px;
		margin-top:20px;
		border-radius:50%;
	}
	.crown {
		width:36px;
		position: absolute;
		z-index:-1;
		top:0;
		left:50%;
		margin-left: -18px;
	}
}
.m {
	flex:1;
	text-align: left;
	.t {
		font-size:20rem;
		padding:20px 0 12px 0;
		color:#000;
	}
	.b {
		font-size:14rem;
		color:#888;
	}
}
.r {
	text-align: left;
	font-size:24rem;
	width:10%;
	line-height:90px;
}
.special {
	color:#F28371;
}
</style>
