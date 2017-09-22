<template>
  <div class="hello">
    <div class="swiper" @touchstart="t_start" @touchend='t_end'>
      <div class="slide">
        <img :class="i==slide_i?'active':'dis'" :src="slide" alt="" v-for="(slide,i) in swiperSlides" />
        <ul>
          <li v-for="v in [0,1,2]" :class="v==slide_i?'ac_li cir':'cir'"></li>
        </ul>
      </div>
    </div>
   	<div class="page-header flex">
  		<div class="col-3" v-for="(item,index) in top_info">
        <div v-if="index==0">
          <router-link :to="'/ac?activity_id=10'" tag='div'>
            <p><img :src="item.img" alt="" class='svg' />{{item.text}}</p>
            <p class='num'>{{hot[item.num]}}</p>
          </router-link>
        </div>
        <div v-else>
          <p><img :src="item.img" alt="" class='svg' />{{item.text}}</p>
          <p class='num'>{{hot[item.num]}}</p>
        </div>
  		</div>
   	</div>
   	<p class="timeTip">活动结束倒计时</p>
   	<div class="time flex">
   		<div class="timeBor">{{times.day}}天</div>
   		<div class="timeBor">{{times.hour}}时</div>
   		<div class="timeBor">{{times.minute}}分</div>
   		<div class="timeBor">{{times.second}}秒</div>
   	</div>

   	<div class="page-body">
   		<div class="search">
   			<input type="search" placeholder="请输入编号或者姓名" id='searchInput' class='s' v-model='user'><span id='searchBtn' class='s' @click='searchUser'>搜索</span>
   		</div>
   		<div class="items" v-if="isShow">
   			<router-link :to="'/profile?id='+item._id+'&num_id='+item.number" tag='div' :class="index%2==0?'item':'item m'" v-for="(item,index) in userList" :key="item.id">
   				<img :src="item.us_pic1" alt="">
   				<p class='text-left'>{{item.us_name}}</p>
   				<div class="ab">
   					<div class="top-left">{{item.number}}号，{{item.us_tiket}}票</div>
   					<div class="bot-right" @click.stop="singleTicket(index)">投票</div>
   				</div>
   			</router-link>
   		</div>
      <div class="items" v-else>
        <router-link :to="'/profile?id='+userInfo._id+'&num_id='+userInfo.number" tag='div' class='item'>
          <img :src="userInfo.us_pic1" alt="">
          <p class='text-left'>{{userInfo.us_name}}</p>
          <div class="ab">
            <div class="top-left">{{userInfo.number}}号，{{userInfo.us_tiket}}票</div>
            <div class="bot-right" @click.stop="singleTicket('s')">投票</div>
          </div>
        </router-link>
      </div>
      <div class='more' @click='loadMore'>查看更多</div>
   		<div class="footer">
   			<div class="title"><img :src="'./static/imgs/svg/act.svg'"  alt="">活动介绍</div>
   			<div class="body">
   				<div class="promises">{{activity.ac_introduce}}</div>
   				<div class="address">地址：{{contact.address}}</div>
   				<div class="tel">招生热线：{{contact.tel}}</div>
   			</div>
   			<div class="imgs" >
   				<img :src="contact.con_pic1" alt="" class='i'>
          <img :src="contact.con_pic2" alt="" class='i'>
          <img :src="contact.con_pic3" alt="" class='i'>
   			</div>
   		</div>
   	</div>
  </div>
</template>

<script>
import infos from '../../../static/json/info.js';

var x1,x2;
var arr=infos;
export default {
  name: 'home',
  data () {
    return {
      swiperSlides: [],
      start:0,
      pageSize:10,
      slide_i:0,
    	infos:[],
      activity:{},
      hot:{},
      contact:{},
      userList:[],
      user:'',
      userInfo:{},
      isShow:true,
    	top_info:[
			{
				text:'已报名',
				img:'./static/imgs/svg/top1.svg',
				num:'count'
			},
			{
				text:'累积投票',
				img:'./static/imgs/svg/top2.svg',
				num:'totalticket'
			},
			{
				text:'访问量',
				img:'./static/imgs/svg/top3.svg',
				num:'totalhot'
			}
    	],
    	times:{
    		day:1,
    		hour:10,
    		min:30,
    		sec:'06'
    	},
    	items:[],
    	promises:'我园将传统幼儿园与现代礼仪相结合，分0-3岁早期教育和3-6岁幼儿教育，坚持将各种习惯渗透到幼儿一日各个环节中。使幼儿从小养成学历、懂礼、用礼的良好习惯。',
    	address:'太谷金宝贝幼儿园位于田丰新苑小区',
    	tel:'15935458896',
    	imgs:['./static/imgs/home/bot.png','./static/imgs/home/bot.png','./static/imgs/home/bot.png']
    }
  },
  watch: {
    user:function(nows) {
      if(nows=='') {
        this.isShow=true;
      }
    }
  },
  computed: {
    swiper() {
     return this.$refs.mySwiper.swiper
    }
  },
  methods:{
  	loadMore() {
  		var t=this,{start,pageSize,userList}=t;
      start=start+pageSize;
      t.$http.get(`${t.$URL}/main/getUserList.htm?activity_id=${t.$AC_ID}&start=${start}&pageSize=${pageSize}`)
      .then(res=>{
        let {state}=res.data;
        if(state==0) {
          let userLists=res.data.data.userList;
          t.userList=userList.concat(userLists);
          t.start=start;
        }
      }).catch(err=>{
        console.log(err);
      });
  	},
    t_start(e) {
      var t=this;
      e.stopPropagation();
      e.preventDefault();
      x1=e.touches[0].pageX;
    },
    t_end(e){
      var t=this;
      e.stopPropagation();
      e.preventDefault();
      x2=e.changedTouches[0].pageX;
      if(x2-x1>30) {
        //油滑
        let i=t.slide_i+1;
        if(i>=3) {
          i=0;
        }
        t.slide_i=i;
      }
      if(x1-x2>30) {
        //左滑
        let i=t.slide_i-1;
        if(i<0) {
          i=2;
        }
        t.slide_i=i;
      }
    },
    singleTicket(i) {
      var access=window.localStorage.access,
          user_number,
          t=this;
          if(i=='s') {
            user_number=t.userInfo.number;
          } else {
            user_number=this.userList[i].number
          }
      var token=t.$md5(access+"_"+t.$AC_ID+"_"+user_number);
      this.$http.get(`${t.$URL}/iden/checkIden.htm?access=${access}&activity_id=${t.$AC_ID}&user_number=${user_number}&token=${token}`)
      .then(res=>{
        let state=res.data.state;
        if(state==0) {
          t.$weui.alert('投票成功');
          window.location.reload(true);
        } else {
          t.$weui.alert('投票失败')
        }
      }).catch(err=>{
        console.log(err);
      });
      return false;
    },
    searchUser() {
      var t=this;
      this.$http.get(`${t.$URL}/main/getuser.htm?activity_id=${this.$AC_ID}&number=${encodeURIComponent(t.user)}`)
      .then(res=>{
        let state=res.data.state;
        if(state==0) {
          let userInfo=res.data.data.userInfo[0];
          t.userInfo=userInfo;
          t.isShow=false;
          return false;
        } else {
          return t.$http.get(`${t.$URL}/main/getuser.htm?activity_id=${this.$AC_ID}&name=${encodeURIComponent(t.user)}`)
        }
      }).then(res=>{
        let state=res.data.state;
        if(state==0) {
          let userInfo=res.data.data.userInfo[0];
          t.userInfo=userInfo;
          t.isShow=false;
        }
      }).catch(err=>{
        console.log(err);
      });
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
  created(){
    var t=this;
    document.querySelectorAll("title")[0].innerText=`投票活动`;
    /*获取活动信息*/
    this.$http.get(`${this.$URL}/main/getmain.htm?activity_id=${this.$AC_ID}`)
    .then(res=>{
      let {state}=res.data;
      if(state==0) {
        document.querySelectorAll("title")[0].innerText=`${res.data.data.activity[0]['ac_title']}`;
        let activity=res.data.data.activity[0],
            hot=res.data.data.hot[0];
        t.swiperSlides=[activity.ac_pic1,activity.ac_pic2,activity.ac_pic3];
        t.activity=activity;
        t.hot=hot;
        /*计算时间*/
        setInterval(function() {
          let time=t.comTime(new Date(),activity.end_at);
          t.times=time;
        },1000);
        /*获取选手信息*/
        return t.$http.get(`${t.$URL}/main/getUserList.htm?activity_id=${t.$AC_ID}&start=${t.start}&pageSize=${t.pageSize}`);
      }
    }).then(res=>{  
      let {state}=res.data;
      if(state==0) {
        let userList=res.data.data.userList;
        t.userList=userList;
      }
    }).catch(err=>{
      console.log(err);
    });
    /*获取关于我们的信息*/
    this.$http.get(`${this.$URL}/main/getContact.htm`)
    .then(res=>{
      let {state}=res.data;
      if(state==0) {
        let contact=res.data.data.contact[0];
        t.contact=contact;
      }
    }).catch(err=>{
        console.log(err);
    });

    /*图片轮播*/
    setInterval(()=>{
      let i=t.slide_i+1;
      if(i>=3) {
        i=0;
      }
      t.slide_i=i;
    },3000);

    /*左右滑动*/
    
  }
}
</script>

<style scoped lang='scss'>
@import '../../style/home.scss';
.more {
	font-size:20rem;
}
.more:hover {
  cursor:pointer;
}
.swiper {
  position: relative;
  top:0;
  left:0;
  width:100%;
  height:300px;
  overflow: hidden;
}
.slide {
  width:100%;
  position: absolute;
}
.slide img {
  width:100%;
  height:300px;
  position: absolute;
  left:0;
}
.slide .active {
  z-index:99;
  left:0;
  -webkit-animation: l 0.3s ease-in-out;
  -o-animation: l 0.3s ease-in-out;
  animation: l 0.3s ease-in-out;
}
.slide .dis {
  z-index:90;
  left:-100%;
  -webkit-animation: r 0.3s ease-in-out;
  -o-animation: r 0.3s ease-in-out;
  animation: r 0.3s ease-in-out;
}
.slide ul {
  position: absolute;
  bottom:-290px;
  left:40%;
  z-index:1000;
}
li {
  display: inline-block;

}
.cir {
  border-radius: 50%;
  width:16px;
  height:16px;
  background: #eee; 
  margin-right: 10px;
}
.ac_li {
  background: #888;
}
@keyframes l {
  0%{
    left:100%;
  }
  100%{
    left:0%;
  }
}
@keyframes r {
  0%{
    left:0;
  }
  100%{
    left:-100%;
  }
}
</style>
