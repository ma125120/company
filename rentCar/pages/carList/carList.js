var app=getApp();
var {req,toast,md5,baseURL:URL,Goto,checkForm,_DEV_, toImg }=app;

import cars from '../../utils/json/cars.js';
Page({
  data: {
  	cars:[],
    distance:33
  },
  onLoad: function (options) {
  	var t=this;
    var carIndex=options.carIndex||1;
  	app.check();
    t.setData({
      my_img:app.globalData.help.front
    });
  	if(!_DEV_) {
  		req({
  			url:`${URL}/getAllRentalByType.do?carType=${carIndex}&latitude=${app.globalData.latitude}&longitude=${app.globalData.longitude}`,
        header:{
          Cookie:app.globalData.head
        },
  		}).then(res=>{
  			var cars=res.data.data;
        cars=toImg(cars);
        t.setData({ cars });
  		}).catch(err=>{
  			toast();
  		});
  	} else {
  		t.setData({
  			cars:cars
  		});
  	}
  },
  nav(e) {
    var url=e.currentTarget.dataset.url;
    url&&Goto(url);
  },
  toLocation(e) {
    wx.openLocation({
      latitude: app.globalData.latitude,
      longitude: app.globalData.longitude,
      scale: 28
    });
    return false;
  }
})
