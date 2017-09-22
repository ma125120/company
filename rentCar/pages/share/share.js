var app=getApp();
var {req,toast,md5,baseURL:URL,Goto,checkForm}=app;
Page({
  data: {
  	img:'https://www.bchltech.cn/rentCar/small.jpg'
  },
  onLoad: function (options) {
  	app.check();
  },
  preview() {
  	var t=this;
  	wx.previewImage({
		  current: t.data.img, 
		  urls:[t.data.img]
		})
  },
  onShareAppMessage: function (res) {
    return {
      title: '神州连合租车',
      path: '/pages/home/home',
      success: function(res) {
        // 转发成功
      },
      fail: function(res) {
        // 转发失败
      }
    }
  }
})
