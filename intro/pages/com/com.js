var app=getApp();
var {u,baseURL:URL}=app;
Page({
  data: {
  	info:{
  		title:'太原百川汇力科技有限公司',
  		text:'微信公众号、小程序开发、网页开发、ERP系统(J2EE数据管理系统)、指定网站的信息爬取',
  		logo:'../../images/com/head.png',
  		address:'山西省太原市尖草坪区学院路3号科技园区419室',
  		time:'7:00-24:00',
  		tel:'18834143680',
  		condition:['']
  	}
  },
  onLoad: function (options) {
  	var t=this;
  	
  },
  call() {
    var t=this;
    wx.makePhoneCall({
      phoneNumber: t.data.info.tel //仅为示例，并非真实的电话号码
    });
  },
  goLocation() {
    var t=this;
    wx.openLocation({
      latitude: 37.87059,
      longitude: 112.548879,
      scale: 28
    });
  },

})
