<template>
  <div class="profile">
    <header>
      <div class="title">
        <img :src="info.us_pic1" alt="" class='img t_m' />
        <span class='t_m'>{{info.us_name}}</span>
      </div>
      <div class="header-body flex">
        <div class="col-4">
          <img :src="'./static/imgs/svg/num.svg'" alt="" class='svg' />
          <span>编号</span>
          <p class='num'>{{info.number}}</p>
        </div>
        <div class="col-4">
          <img :src="'./static/imgs/svg/top2.svg'" alt="" class='svg' />
          <span>票数</span>
          <p class='num'>{{info.us_tiket}}</p>
        </div>
        <div class="col-4">
          <img :src="'./static/imgs/svg/hot.svg'" alt="" class='svg' />
          <span>热度</span>
          <p class='num'>{{info.hot}}</p>
        </div>
        <div class="col-4">
          <img :src="'./static/imgs/svg/gift1.svg'" alt="" class='svg' />
          <span>礼物</span>
          <p class='num'>{{gift_num}}</p>
        </div>
      </div>
    </header>
    <div class="page-body">
      <div class="title1">宣传:</div>
      <p class='intro'>{{info.introduce}}</p>
      <img :src="info.us_pic1" alt="" style="min-height:300px" />
    </div>
    <div class="gift-list">
      <div class="title1">礼物列表:</div>
        <div class="item" v-for="(v,i) in given" :key='v.name'>
          <div class="left">
            <img :src="v.pr_pic" alt="" />
          </div>
          <div class="right">
            <p class="top">{{v.openid}},给TA送了1{{v.unit}}{{v.pr_name}}</p>
            <p class="bot">{{v.time}}</p>
          </div>
      </div>
    </div>
    <div class='more1' @click='loadMore'>查看更多</div>

    <footer class='flex'>
      <router-link to='/' tag='div' class="l" replace><img :src="'./static/imgs/svg/back.svg'" alt='回首页' /><span>回首页</span></router-link>
      <div class="m" @click.stop="singleTicket"><img :src="'./static/imgs/svg/heart.svg'" class='my_svg'><span>投票</span></div>
      <router-link :to="'/gift?id='+this.$route.query.id+'&num_id='+this.$route.query.num_id" tag='div' class="r"><img :src="'./static/imgs/svg/zuanshi.svg'" alt='礼物' /><span>礼物</span></router-link>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      given:[],
      start:0,
      pageSize:20,
      gift_num:0,
      info:{},
      items:[
        {
          icon:'./static/imgs/svg/top2.svg',
          text:'编号',
          attr:'number'
        },
        {
          icon:'./static/imgs/svg/top2.svg',
          text:'票数',
          attr:'us_ticket'
        },
        {
          icon:'./static/imgs/svg/top2.svg',
          text:'热度',
          attr:'hot'
        },
        {
          icon:'./static/imgs/svg/top2.svg',
          text:'礼物',
          attr:'gift'
        }
      ]
    }
  },
  methods:{
    singleTicket() {
      var t=this,
          access=window.localStorage.access,
          user_number=t.info.number,
          token=t.$md5(access+"_"+t.$AC_ID+"_"+user_number);
      this.$http.get(`${t.$URL}/iden/checkIden.htm?access=${access}&activity_id=${t.$AC_ID}&user_number=${user_number}&token=${token}`)
      .then(res=>{
        let state=res.data.state;
        if(state==0) {
          t.$weui.alert(res.data.data.result);
          setTimeout(()=>{
            window.location.reload(true);
          },1500);
        } else {
          t.$weui.alert('投票失败');
        }
      });
      return false;
    },
    loadMore() {
      var t=this,
          {start,pageSize,given}=t;
      start=start+pageSize;
      this.$http.get(`${t.$URL}/pre/getpreListById.htm?user_number=${t.info.num_id}&start=${t.start}&pageSize=${t.pageSize}`)
      .then(res=>{
        let state=res.data.state;
        if(state==0) {
          let givens=res.data.data.presentList;
          t.given=given.concat(givens);
        }
      });
    }
  },
  created() {
    var t=this,
        _id=t.$route.query.id,
        num_id=t.$route.query.num_id;
    /*获取选手信息*/
    t.$http.get(`${t.$URL}/main/getuser.htm?activity_id=${t.$AC_ID}&user_id=${_id}`)
    .then(res=>{
      let state=res.data.state;
      if(state==0) {
        let info=res.data.data.userInfo[0],
        gift_num=res.data.data.userInfo[1].userPreTotal;
        t.info=info;
        t.gift_num=gift_num;
      }
    });
    /*获取礼物列表*/
    this.$http.get(`${t.$URL}/pre/getpreListById.htm?user_number=${num_id}&start=${t.start}&pageSize=${t.pageSize}`)
    .then(res=>{
      let state=res.data.state;
      if(state==0) {
        let given=res.data.data.presentList;
        t.given=given;
      }
    });
    /*获取礼物数量*/
  }
}
</script>

<style scoped lang='scss'>
@import '../../style/profile.scss';

footer {
  left:0;
  width:100%;
  background: #e9e9e9;
  font-size:16rem;
  min-height:60px;
  line-height:60px;
  img {
    width:22px;
    height:22px;
    vertical-align: middle;
    padding-right:4px;
  }
  span {
    display: inline-block;
    vertical-align: middle;
  }
  .l {
    width:40%;
    text-align: left;
    padding-left:22px;
  }
  .m {
    position: absolute;
    top:50%;
    left:50%;
    background: #F3D9FE;
    color:#000;
    border:3px solid #8505B8;
    border-radius:50%;
    width:72px;
    height:72px;
    line-height:24px;
    margin-left:-36px;
    margin-top:-60px;
  }
  .r {
    width:40%;
    text-align: right;
    padding-right:24px;
  }
}
.t_m {
  vertical-align: middle;
}
.intro {
  text-align:left;
}
.my_svg {
  display: block;
  width:36px;
  height:36px;
  text-align:center;
  margin-left:16px;
  margin-top:4px;
}
</style>
