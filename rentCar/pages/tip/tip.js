var app=getApp();
var {req,toast,md5,baseURL:URL,Goto,checkForm,_DEV_}=app;
Page({
  data: {
  	to:''
  },
  onLoad: function (options) {
  	app.check();
  	var t=this,
  			{to='../is_host/is_host'}=options;
  	t.setData({ to });
  },
  back() {
  	wx.navigateBack();
  }
})
