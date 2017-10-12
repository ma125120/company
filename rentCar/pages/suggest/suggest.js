var app=getApp();
var {req,toast,md5,baseURL:URL,Goto,checkForm,_DEV_}=app;
Page({
  data: {
  	dis:false
  },
  send_form(e) {
  	var data=e.detail.value.text,t=this;
  	if(!data) {
  		toast("建议内容不能为空！");
  		return false;
  	} else if(data.length>255) {
  		toast("建议字数不能超过255！");
  		return false;
  	}
  	t.setData({dis:true});
  	req({
  		url:`${URL}/feedback.do?content=${data}`,
  		header:{
        Cookie:app.globalData.head
      },
  	}).then(res=>{
  		if(res.data.code==4280) {
  			toast("提交成功！");
  			t.setData({dis:false});
  			setTimeout(()=>{
  				wx.switchTab({url:'../my/my'});
  			},1500);
  		}
  	}).catch(err=>{
  		console.log(err);
  	})
  },
  onLoad: function (options) {
  	app.check();
  }
})
