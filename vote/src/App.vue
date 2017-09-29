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
        url:window.location.href.split("#")[0],
        jsApiList:['onMenuShareTimeline','onMenuShareAppMessage','onMenuShareQQ',
        'onMenuShareWeibo','onMenuShareQZone','chooseWXPay']
      },t=this;
      this.$http.get(`${this.$URL}/pay/returnPayParameter.htm?url=${data.url}`)
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
    //this.getAcId();
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
#app .more1 {
  margin-bottom:120px;
}
.v_m {
  vertical-align:middle;
}
</style>
