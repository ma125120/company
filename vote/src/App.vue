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
      var str=window.location.search.split("?")[1],t=this;
      var obj=this.getSearch(str),
          AC_ID=obj.state||10;
          Vue.prototype.$AC_ID=AC_ID;
      t.getUserinfo(obj.code);
    },
    isWeiXin(){ 
      var ua = window.navigator.userAgent.toLowerCase(); 
      if(ua.match(/MicroMessenger/i) == 'micromessenger'){ 
      return true; 
      }else{ 
      return false; 
      } 
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
    getUserinfo(code) {
      var t=this;
      t.$http.get(`${t.$URL}/wechat/getspAccess_Token.htm?code=${code}`)
      .then(res=>{
        Vue.prototype.$userinfo=res.data;
        console.log(res.data)
      }).catch(err=>{
        console.log(err);
      });
    },
    getLogin() {
      let data={
        url:window.location.href.split("#")[0],
        jsApiList:['onMenuShareTimeline','onMenuShareAppMessage','onMenuShareQQ',
        'onMenuShareWeibo','onMenuShareQZone','chooseWXPay']
      },t=this;
      this.$http.get(`${this.$URL}/wechat/returnPayParameter.htm?url=${data.url}`)
      .then(res=>{
        var rData=res.data.data;
        wx.config({
          debug:false,
          appId:rData.appId,
          timestamp:rData.timestamp,
          noncestr:rData.noncestr,
          signature:rData.signature,
          jsApiList:data.jsApiList
        });
        wx.ready(function(){
          console.log('成功引入js-sdk');
          var shareObj={
            link:window.window.location.href
          };
          t.$u.share(shareObj,wx);
        });
      }).catch(err=>{
        console.log(err);
      });
    }
  },
  created() {
    var t=this,{$u:{getCookie,setCookie}}=t;
    if(!t.isWeiXin()) {
      t.$router.replace('/noWeixin');
    }
    this.getAcId();
    this.getLogin();console.log(t.isWeiXin())
    
    // if(!getCookie("access")) {
    //   this.$http.get(`${this.$URL}/wechat/setIden.htm`)
    //   .then(res=>{
    //     let {state}=res.data;
    //     if(state==0) {
    //       let access=res.data.data['identity.access'];
    //       window.localStorage.access=access;
    //       setCookie("access",access,1);
    //     }
    //   }).catch(err=>{
    //       console.log(err);
    //   });
    // } else {
    //   window.localStorage.access=getCookie("access");
    // }
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
#app .more1 {
  margin-bottom:120px;
}
.v_m {
  vertical-align:middle;
}

</style>
