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
  	notices:['1.公司注册需上传营业执照照片，个体车辆上传行驶证照片；',
    '2.请务必在公司所在地或车辆停放地进行注册，否则您的位置显示将不准确；',
    '3.请及时管理您发布的信息，如已出租请在系统上标注说明。',
    '4.注册的公司或个人，请添加我们的官方微信号【SZLHZC01】咨询和沟通相关事宜，我们将通过官微给您推送通知和活动信息。',
    '5.如有问题可与各地市服务经理联系，平台咨询电话：18905751238。']
  },
  onLoad: function (options) {
  	app.check();
    var t=this;
    t.setData({
      //notices:app.globalData.help.note_host.split('\n'),
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
