var app=getApp();
var {req,toast,md5,baseURL:URL,Goto,checkForm,_DEV_ ,toImg }=app;

function monthToDate(month) {
  var months=[1,2,3,4,5,6,7,8,9,10,11,12],
      dates=[31,28,31,30,31,30,31,31,30,31,30,31],
      i=months.filter(v=>v==parseInt(month))[0]-1;
  return dates[i];
}
Page({
  data: {
  	car:null,
  	slides:[],
    all:[],
    ai:0,
    weekdays:['周日','周一','周二','周三','周四','周五','周六'],
    dates:[],
    RUID:'',
    tel:true
  },
  onLoad: function (options) {
  	var t=this,
  		id=options.id||1;
      wx.showLoading({title:'正在加载中！'});
  	app.check();
  	if(!_DEV_) {
      app.getAllCar(t);
  		req({
  			url:`${URL}/getRentalCompletedInfo.do?RUID=${id}`,
        header:{
            Cookie:app.globalData.head
        }
  		}).then(res=>{
  			var car=res.data.data,ai;//res.data.code=4285
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
        t.getDays(id);
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
      //console.log(res);
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
  },
  getDays(id) {
    var now=new Date(),
      year=now.getFullYear(),
      month=now.getMonth()+1,
      date=now.getDate(),
      day=now.getDay(),
      __date=date,
      __month=month;
    var t=this,
        {weekdays}=t.data,
        dates=[];
    dates=[0,1,2,3,4,5,6].map((v)=>{
      let _date=parseInt(__date)<10?('0'+parseInt(__date)):parseInt(__date),
          _month=parseInt(__month)<10?('0'+parseInt(__month)):parseInt(__month),
          _dates=monthToDate(_month),
          obj={
            num:_date,
            dates:`${year}${_month}${_date}`
          };
      __date=__date+1;
      if(__date>_dates) {
        __date=1;
        __month=(__month+1);
        if(__month>12) {
          __month=__month%12;
          year=year+1;
        }
      }
      return obj;
    });
    weekdays=weekdays.slice(day).concat(weekdays).slice(0,7);
    t.setData({weekdays,dates});
    setTimeout(()=>{
      t.getAvailableCalendar(dates,id)
    },1000);
  },
  getAvailableCalendar(dates,id) {
    var t=this,dates=dates;
    req({
      url:`${URL}/getAvailableCalendar.do?RUID=${id}`,
      data:{
        start:dates[0].dates,
        end:dates[dates.length-1].dates
      },
      header:{
        Cookie:app.globalData.head
      }
    }).then(res=>{
      let datas=res.data.data;
      dates=dates.map(v=>{
        datas.map(d=>{
          if(d.rentalcalendar==v.dates) {
            v.status=d.status;
          }
          return d;
        });
        return v;
      })
      wx.hideLoading();
      t.setData({dates});
    });
  },
})
