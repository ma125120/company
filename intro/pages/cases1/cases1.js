var app=getApp();
var {u,baseURL:URL,cases}=app;
Page({
  data: {
  	cases:[]
  },
  onLoad: function (options) {
  	var t=this;
  	t.setData({cases});
  }
})
