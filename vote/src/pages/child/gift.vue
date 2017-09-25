<template>
  <div class="hello">
    <header>
      <div class="top">
        <div class="l">
          <img :src="info.us_pic1" alt="" />
        </div>
        <div class="m">
          <p>{{info.us_name}}</p>
          <p class='sub-title'>给他送上一份礼物吧</p>
        </div>
        <div class="r">></div>
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

    <div class="body">
      <div :class="i==active_i?'active item col-3':'item col-3'" v-for="(v,i) in gifts" :key="i" @click='changeIndex(i)'>
        <div >
          
        </div>
          <img :src="v.pr_pic" alt="" />
          <p class='t' >{{v.pr_name}}</p>
          <p class='sub'>{{v.pr_rank}}点</p>
        </div>
      </div>
      <div class="foot">
        <div class='flex'>
          <div class="l">请选择以上礼品</div>
          <div class="r">数量：<input type="text" v-model='count' class='input' /><span id='i_a'>></span></div>
        </div>
        <div class="pay">
          <p id='pay_btn'>微信支付</p>
        </div>
      </div>
    </div> 
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      count:1,
      active_i:0,
      gift_num:0,
      info:{
        "id":1,
        "us_name":"石伟涵",
        "number":"58",
        "us_pic1":"./static/imgs/info/1.png",
        "us_tiket":"600",
        "hot":1231,
        "gift":37,
        "given":[
          {
            name:'拼过',
            src:'./static/imgs/info/1.png',
            gift:'气球',
            time:'2017-08-15 07:36:02'
          },
          {
            name:'苹果',
            src:'./static/imgs/info/1.png',
            gift:'气球',
            time:'2017-08-15 07:36:02'
          },
          {
            name:'钢明123',
            src:'./static/imgs/info/1.png',
            gift:'气球',
            time:'2017-08-15 07:36:02'
          }
        ]
      },
      gifts:[
        [
            {
              pr_pic:'./static/imgs/gift/1.png',
              pr_name:'气球',
              point:1
            },
            {
              pr_pic:'./static/imgs/gift/1.png',
              pr_name:'蛋糕',
              point:10
            },
            {
              pr_pic:'./static/imgs/gift/1.png',
              pr_name:'泰迪熊',
              point:20
            }
        ],[
            {
              pr_pic:'./static/imgs/gift/1.png',
              pr_name:'直升飞机',
              point:50
            },
            {
              pr_pic:'./static/imgs/gift/1.png',
              pr_name:'豪华游轮',
              point:100
            },
            {
              pr_pic:'./static/imgs/gift/1.png',
              pr_name:'钻石',
              point:200
            }
        ],
        [
            {
              pr_pic:'./static/imgs/gift/1.png',
              pr_name:'520玫瑰',
              point:520
            },
            {
              pr_pic:'./static/imgs/gift/1.png',
              pr_name:'999玫瑰',
              point:999
            }
        ]
      ]
    }
  },
  methods:{
    changeIndex(i) {
      var id=i;
      this.active_i=id;
    }
  },
  created() {
    var t=this,
        _id=t.$route.query.id,
        num_id=t.$route.query.num_id;
    /*获取礼物列表*/
    t.$http.get(`${t.$URL}/pre/getpreList.htm`)
    .then(res=>{
      let state=res.data.state;
      if(state==0) {
        let gifts=res.data.data.presentList;
        t.gifts=gifts;console.log(gifts)
      }
    }).catch(err=>{
      console.log(err);
    });
    /*获取选手信息及投票数量*/
    t.$http.get(`${t.$URL}/main/getuser.htm?activity_id=${t.$AC_ID}&user_id=${_id}`)
    .then(res=>{
      let state=res.data.state;
      if(state==0) {
        let info=res.data.data.userInfo[0],
        gift_num=res.data.data.userInfo[1].userPreTotal;
        t.gift_num=gift_num;
        t.info=info;
      }
    });

  }
}
</script>

<style scoped lang='scss'>
@import '../../style/gift.scss';
.t {
  font-size:16rem;
}
.sub {
  font-size:14rem;
  color:gray;
}
.input {
  font-size:14rem;
}
#pay_btn {
  height:36px;
  line-height: 36px;
  font-size:20rem;
  color:#fff;
  background: #19AD17;
  border-radius:5px;
}
.col-3.active {
  border:3px solid green;
}
</style>
