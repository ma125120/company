<template>
  <div id="app">
    <router-view class='route'></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  created() {
    this.$http.get(`${this.$URL}/iden/setIden.htm`)
    .then(res=>{
      let {state}=res.data;
      if(state==0) {
        let access=res.data.data['identity.access'];
        window.localStorage.access=access;
      }
    })
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
