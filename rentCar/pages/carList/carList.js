var app=getApp();
var {req,toast,md5,baseURL:URL,Goto,checkForm,_DEV_, toImg }=app;

import cars from '../../utils/json/cars.js';
Page({
  data: {
  	cars:[],
    distance:33,
    my_img:''
  },
  onLoad: function (options) {
  	var t=this;
    var carIndex=options.carIndex||1;
  	app.check();wx.showLoading({title:'正在加载中！'});
    t.setData({
      my_img:app.globalData.help.front
    });
  	if(!_DEV_) {
  		req({
  			url:`${URL}/getRentals.do?carType=${carIndex}&lat=${app.globalData.latitude}&lon=${app.globalData.longitude}&dist=100`,
        header:{
          Cookie:app.globalData.head
        },
  		}).then(res=>{
  			var cars=res.data;
        
        if(cars.length==0) {
          return req({
            url:`${URL}/getRentals.do?carType=${carIndex}&lat=${app.globalData.latitude}&lon=${app.globalData.longitude}&dist=10000`,
            header:{
              Cookie:app.globalData.head
            },
          });
        } else {
          cars=toImg(cars).map((v)=>{
          v.distance=v.distance.toFixed(2);
            return v;
          })
          t.setData({ cars });
          wx.hideLoading();
        }
  		}).then(res=>{
        var cars=res.data;
        cars=toImg(cars).map((v)=>{
          v.distance=v.distance.toFixed(2);
          return v;
        })
        t.setData({ cars });wx.hideLoading();
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
