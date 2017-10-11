var app=getApp();
var {u,baseURL:URL}=app;
Page({
  data: {
  	userInfo:null,
  	menus:[{
  		title:'联系客服'
  	}]
  },
  onLoad: function (options) {
  	var t=this;
  	if(!app.globalData.userInfo) {
      app.getUserInfo(function(userInfo){
      	t.setData({
	    		userInfo:userInfo
	    	});
      });
    } else {
    	t.setData({
    		userInfo:app.globalData.userInfo
    	});
    }
  },
})
