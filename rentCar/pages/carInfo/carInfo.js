var app=getApp();
var {req,toast,md5,baseURL:URL,Goto,checkForm,_DEV_ ,toImg }=app;

import cars from '../../utils/json/cars.js';

Page({
  data: {
  	car:null,
  	slides:[],
    all:[],
    ai:0
  },
  onLoad: function (options) {
  	var t=this,
  		id=options.id||1;
  	app.check();
  	if(!_DEV_) {
      app.getAllCar(t);
  		req({
  			url:`${URL}/getRentalCompletedInfo.do?RUID=${id}`,
        header:{
            Cookie:app.globalData.head
        }
  		}).then(res=>{
  			var car=res.data.data,ai;
        var imgs=car.imgs&&car.imgs.split(",");
        car.img1=imgs&&imgs[0];
        car.img2=imgs&&imgs[1];

        ai=t.data.all.filter((v,i)=>{
          if(v.id==car.carType) {
            v.i=i;
            return true;
          }
        })[0].i;
        t.setData({car,slides:[car.img1,car.img2],ai});
  		}).catch(err=>{
  			toast();
  		});
  	} else {
  		t.setData({
  			car:cars.filter(v=>v.id==id)[0],
  			slides:[cars.filter(v=>v.id==id)[0].picurl]
  		});
  	}
  },
  call() {
    var t=this;
    req({
      url:`${URL}/callSomeBody.do?to=${t.data.car.RUID}`
    }).then(res=>{
      console.log(res);
      wx.makePhoneCall({
        phoneNumber: t.data.car.Person_phone //仅为示例，并非真实的电话号码
      });
    }).catch(err=>{
      toast('获取联系方式失败，请重试');
    });
    
  },
  goLocation() {
    var t=this;
    wx.openLocation({
      latitude: t.data.car.Business_lbs_lat,//37.87059,//
      longitude: t.data.car.Business_lbs_lon,//112.548879,//
      scale: 28
    })
  }
})
