var app=getApp();
var {req,toast,md5,baseURL:URL,Goto,checkForm,_DEV_, toImg }=app;

import cars from '../../utils/json/cars.js';

Page({
  data: {
  	cars:[],
  	myCars:[],
    dels:[],
    all:[]
  },
  onLoad: function (options) {
  	var t=this;
  	app.check();
  	if(!_DEV_) {
      app.checkLogin('../editList/editList');
      app.getAllCar(t);
  		req({
  			url:`${URL}/getMyRentalCars.do`,
        header:{
            Cookie:app.globalData.head
        }
  		}).then(res=>{
        var cars=res.data.data;
        cars=cars.map((info,index)=>{
          for(let i=0,len=t.data.all.length;i<len;i++) {
            if(t.data.all[i].id==info.carType) {
              info.i=i;break;
            }
          }
          if(!info.i) {
            info.i=0;
          }
          return info;
        });
        
        t.setData({ myCars:toImg(cars) });
  		}).catch(err=>{
  			toast('获取失败，请重试');
  		});
  	} else {
  		t.setData({
  			cars:cars,
  			myCars:cars
  		});
  	}
  }
})
