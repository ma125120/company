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
  changeStatus(e) {
  	var t=this,
        obj=e.target.dataset.obj||e.currentTarget.dataset.obj,
        i1=e.target.dataset.parent||e.currentTarget.dataset.parent,
        i2=e.target.dataset.child||e.currentTarget.dataset.child,
        calendar=t.data.calendar;
  	if(obj.disable) {
  		console.log('不可操作');
  	} else {
      let status=parseInt(obj.status)||4280;
      if(status==4283) {
        status=4280;
      } else {
        status=status+1;
      }
      obj.status=status;
      calendar.others[i1].dates[i2]=obj;
      t.setData({calendar});
  		req({
        url:`${URL}/updateCalendar.do`,
        data:{
          RUID:t.data.RUID,
          rentalcalendar:obj.dates,
          status:status
        },
        header:{
          Cookie:app.globalData.head
        }
      }).then(res=>{
        console.log(res);
      }).catch(err=>{
        console.log(err)
      })
  	}
  },
  sure() {
    toast('修改成功');
  }
})
