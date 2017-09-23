var app=getApp();
var {req,toast,md5,baseURL:URL,Goto,checkForm,_DEV_}=app;
Page({
  data: {
  	slides:['../../images/is_host/slide0.jpg'],
  	modules:[{
  		title:'上传车辆信息',
      url:'../uploadCar/uploadCar'
  	},{
  		title:'修改车辆信息',
      url:'../editList/editList'
  	},{
		title:'车辆出租信息'
  	},{
  		title:'我要置顶车辆',
      url:'../score/score'
  	}],
  	notices:[]
  },
  onLoad: function (options) {
  	app.check();
    var t=this;
    t.setData({
      notices:app.globalData.help.note_host.split('\n'),
      slides:[app.globalData.help.back]
    });
  },
  goTo(e) {
    var url=e.target.dataset.url||e.currentTarget.dataset.url;
    if(!_DEV_) {
      if(app.globalData.hasUser) {
        Goto(url);
      } else {
        if(app.globalData.openid) {
          Goto('../tip/tip?to='+url);
        } else {
          app.getLogin(()=>{ Goto('../tip/tip?to='+url); },()=>{ Goto(url); });
        }
      }
     // app.checkLogin(url);
    } else {
      Goto(url);
    }
    
  }
})
