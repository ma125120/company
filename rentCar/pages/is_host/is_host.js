var app=getApp();
var {req,toast,md5,baseURL:URL,Goto,checkForm,_DEV_}=app;
Page({
  data: {
  	slides:'',
  	modules:[{
  		title:'上传车辆信息',
      url:'../uploadCar/uploadCar'
  	},{
  		title:'修改车辆信息',
      url:'../editList/editList'
  	},{
		  title:'车辆出租信息',
      url:'../editRent/editRent'
  	},{
  		title:'我要置顶车辆',
      url:'../score/score'
  	}],
  	notices:['1、上传车辆信息需要正确填写您公司的名称、地址、电话。',
    '2、请及时管理您发布的信息，如已出租请在车辆出租信息上标注说明。',
    '3、注册的公司或个人，请添加我们的官方微信号【SZLHZC01】咨询和沟通相关事宜，我们将通过官微给您推送通知和活动信息。（加V时请备注：地区+公司名称+联系人电话。例如:浙江杭州西湖区+神州公司+王经理13905718888）。',
    '4、如有问题可与各地市服务经理联系。']
  },
  onLoad: function (options) {
  	app.check();
    var t=this;
    t.setData({
      //notices:app.globalData.help.note_host.split('\n'),
      slides:app.globalData.help.back
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
