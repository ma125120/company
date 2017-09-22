var app=getApp();
var {req,toast,md5,baseURL:URL,Goto,checkForm,_DEV_, toImg }=app;

//import cars from '../../utils/json/cars.js';
Page({
  data: {
  	cars:[],
    score:0,
    total:0,
    ids:[]
  },
  onLoad: function (options) {
  	var t=this;
  	app.check();
  	if(!_DEV_) {
      app.checkLogin('../stick/stick');
  		req({
        url:`${URL}/getMyRentalCars.do`,
        header:{
          Cookie:app.globalData.head
        }
      }).then(res=>{
        var cars=res.data.data;
        t.setData({ cars:toImg(cars) });
        return req({
                  url:`${URL}/getIntegral.do`,
                  header:{
                    Cookie:app.globalData.head
                  }
                })
      }).then(res=>{
        if(res.data.code==4282) {
          t.setData({score:0});
        } else {
          t.setData({score:res.data.data});
        }
      }).catch(err=>{
        toast('获取失败，请重试');
      });
  	} else {
  		t.setData({
  			cars:cars
  		});
  	}
  },
  changeTotal(e) {
    /*获取id*/
    var ids=e.detail.value,
        t=this,
        total=ids.length*20;
    t.setData({
      total,
      ids
    });
  },
  goStick(){
    var t=this;
    if(t.data.score<t.data.total) {
      toast('积分不足！');
    }
    if(t.data.total==0) {
      toast('请先进行选择！');
    }
  }
})
