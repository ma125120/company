<template>
  <div id="app">
    <router-view class='route'></router-view>
  </div>
</template>

<script>
import Vue from 'vue';
import wx from 'weixin-js-sdk';
export default {
  name: 'app',
  methods:{
    getAcId() {
      var str=window.location.search.split("?")[1];
      var obj=this.getSearch(str),
          AC_ID=obj.state;
          Vue.prototype.$AC_ID=AC_ID;
    },
    getSearch(str) {
      var arr=str.split("&"),obj={};
      arr.map(function(v,i) {
        var a=v.split("="),name=a[0],value=a[1];
        obj[name]=value;
        return 1;
      });
      return obj;
    },
    getLogin() {
      let data={
        noncestr:'Wm3WZYTPz0wzccnWsss',
        timestamp:Date.now(),
        url:window.location.href.split("#")[0],
        jsApiList:['onMenuShareTimeline','onMenuShareAppMessage','onMenuShareQQ',
        'onMenuShareWeibo','onMenuShareQZone','chooseWXPay']
      };
      this.$http.get(`${this.$URL}/iden/getOptions.htm`)
      .then(res=>{
        wx.config({
          debug:false,
          appId:res.data.appid,
          timestamp:data.timestamp,
          noncestr:data.noncestr,
          signature:res.data.signature,
          jsApiList:data.jsApiList
        });
      }).catch(err=>{
        console.log(err);
      });
    }
  },
  created() {
    var t=this,{$u:{getCookie,setCookie}}=t;
    this.getAcId();
    this.getLogin();
    if(!getCookie("access")) {
      this.$http.get(`${this.$URL}/iden/setIden.htm`)
      .then(res=>{
        let {state}=res.data;
        if(state==0) {
          let access=res.data.data['identity.access'];
          window.localStorage.access=access;
          setCookie("access",access,1);
        }
      }).catch(err=>{
          console.log(err);
      });
    } else {
      window.localStorage.access=getCookie("access");
    }
  }
}
</script>

<style>
html,body {
	font-size-adjust: none;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size:14rem;
  text-align: center;
  color: #2c3e50;
}
footer {
  position: fixed;
  bottom:0;
  z-index:9999;
}
#app .gift-list {
  margin-bottom:120px;
}
.v_m {
  vertical-align:middle;
}
</style>
