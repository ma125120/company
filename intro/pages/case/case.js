var app=getApp();
var {u,baseURL:URL,cases}=app;
Page({
  data: {
  	case1:null
  },
  onLoad: function (options) {
  	var t=this,
  			{id}=options;
  	var case1=cases.filter(v=>v.id==id)[0];
  	t.setData({case1})
  	
  }
})
