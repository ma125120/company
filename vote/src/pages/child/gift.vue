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
      <div :class="i==active_i?'active item col-3':'item col-3'" v-for="(v,i) in gifts" :key="i"  @click='changeIndex(i,v)'>
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
          <div class="r">数量：<span @click='del' class='sys'>-</span><input type="text" v-model='count' class='input' /><span @click='add' class='sys'>+</span><!-- <span id='i_a'>></span> --></div>
        </div>
        <div class="pay">
          <p id='pay_btn' @click='send' :disabled="dis">微信支付</p>
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
      info:{},
      gifts:[],
      gifting:null,
      final:null,
      dis:false
    }
  },
  methods:{
    changeIndex(i,v) {
      var id=i;
      this.active_i=id;
      this.count=1;
      this.gifting=v;
    },
    add() {
      this.count=this.count+1;
    },
    del() {
      if(this.count>1) {
        this.count=this.count-1;
      }
    },
    send() {
      var body={
        orderlist:[]
      },t=this,
      gifting=t.$data.gifting,
      obj={
        "present_id":gifting._id,
        "pr_rank":gifting.pr_rank,
        "present_num":t.count,
        "activity_id":t.$AC_ID,
        "user_number":t.$data.info.number,
        "openid":t.$userinfo.openid,
        "name":t.$userinfo.nickname
      },
      total_fee=t.count*(parseInt(gifting.price));
      body.orderlist[0]=obj;
      var token=t.$md5(JSON.stringify(body)+"_"+total_fee);
      var final={
        body:body,
        total_fee:total_fee,
        token:token
      };
      t.final=final;
      t.dis=true;
      t.$http.get(`${t.$URL}/pay/getorder.htm`,{ params:final })
      .then(res=>{
        console.log(res.data);
        t.dis=false;
      }).catch(err=>{
        console.log(err);
        t.dis=false;
      });
    }
  },
  created() {
    var t=this,
        _id=t.$route.query.id,
        num_id=t.$route.query.num_id;
    var loading = t.$weui.loading('loading', {
        className: 'custom-classname'
    });
    /*获取礼物列表*/
    t.$http.get(`${t.$URL}/pre/getpreList.htm`)
    .then(res=>{
      let state=res.data.state;
      if(state==0) {
        let gifts=res.data.data.presentList;
        t.gifts=gifts;
        t.gifting=gifts[0];
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
        loading.hide();
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
