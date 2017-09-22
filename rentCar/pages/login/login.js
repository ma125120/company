var app=getApp();
var {req,toast,md5,baseURL:URL,Goto,checkForm}=app;
const app_key='WhAT_FUCK_YOU_OH_MY_GOD';
Page({
  data: {
  	info:null,
  	login_flag:false,
  	checks:false,
  	login:null,
  	username:'',
  	to:""
  },
  onLoad: function (options) {
  	app.check();
  	var {to='../is_host/is_host'}=options,
  		username= wx.getStorageSync('username')||'';
  	this.setData({to,username});
  },
  change1() {
  	var t=this;
  	this.setData({
  		checks:!t.data.checks
  	});
  },
  setStore(data) {
  	var t=this;
  	if(t.data.checks) {
  		wx.setStorage({
		  key:"username",
		  data:data.username
		});
  	}
  },
  send_form(e) {
  	var data=e.detail.value,
  		sign,
  		t=this;
  	/*禁用按钮，存储用户名*/
  	t.setData({
  		login_flag:true
  	});
  	t.setStore(data);
  	/*检查用户输入*/
  	let result=checkForm(data,[{
  		name:'username',
  		reg:/\w+/,
  		msg:'用户名格式不符合'
  	},{
  		name:'password',
  		type:'password',
  		msg:'密码格式不符合'
  	}]);
  	if(result.msg) {
  		toast(result.msg);
  		t.setData({
	  		login_flag:false
	  	});
  		return false;
  	}
  	data.password=md5(data.password);
  	data.sign=md5(data.username+"_"+data.password+"_"+app_key);
  	//console.log(data);//return false;
  	req({
  		url:`${URL}/cmcc/inneruser/innerLogin.htm`,
  		data:data
  	}).then(res=>{
  		let state=res.data.state;
  		if(state==0) {
  			var login=res.data.data;
  			app.globalData.user=login;
  			toast('登陆成功');
  			setTimeout(()=>{
  				wx.redirectTo({
  					url:t.data.to
  				})
  			},1500);
  		} else {
  			toast(res.data.msg);
  		}
  		t.setData({
	  		login_flag:false
	  	});
  	}).catch(err=>{
  		t.setData({
	  		login_flag:false
	  	});
  	})
  }
})
