var app=getApp();
var {req,toast,md5,baseURL:URL,Goto,checkForm,_DEV_}=app;
Page({
  data: {
  	userInfo:null,
  	menus:[{
  		title:'联系客服'
  	},{
  		title:'我的积分',
      url:'../score/score'
  	},{
  		title:'意见反馈',
      url:'../suggest/suggest'
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
  active() {
    wx.showActionSheet({
      itemList: ['联系电话：神州连合租车18905751238'],
      success:function(res) {
        if(res.tapIndex==0) {
          wx.makePhoneCall({
            phoneNumber: '18905751238',
          });
        }
      }
    })
  }
})
