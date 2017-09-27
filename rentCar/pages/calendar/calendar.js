var app=getApp();
var {req,toast,md5,baseURL:URL,Goto,checkForm,getCalendar}=app;
Page({
  data: {
  	calendar:{},
    RUID:'',
  	weekdays:['周日','周一','周二','周三','周四','周五','周六']
  },
  onLoad: function (options) {
  	var t=this,
  			{id}=options;
  	app.check();
    wx.showLoading({title:'正在加载中！'});
  	var calendar=getCalendar();
  	t.setData({calendar,RUID:id});
    /*获取可用日历*/
  	setTimeout(()=>{
      t.getAvailableCalendar(calendar,id);
    },1000);
  },
  getAvailableCalendar(calendar,id) {
    var t=this;
    req({
      url:`${URL}/getAvailableCalendar.do?RUID=${id}`,
      data:{
        start:calendar.startDate,
        end:calendar.endDate
      },
      header:{
        Cookie:app.globalData.head
      }
    }).then(res=>{
      let datas=res.data.data;
      calendar.others.map((month)=>{
        month.dates.map((days)=>{
          datas.map((_data)=>{
            if(days.dates==_data.rentalcalendar) {
              days.status=_data.status;
            }
          });
          return days;
        });
      });
      wx.hideLoading();
      t.setData({calendar});
    });
  },
})
