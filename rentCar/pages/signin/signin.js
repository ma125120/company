var app=getApp();
var { req , toast , md5 , baseURL : URL ,
		Goto , checkForm , _DEV_ , checkSpace , uploadFile }=app;
Page({
  data: {
  	notices:['1.公司注册需上传营业执照照片，个体车辆上传行驶证照片；',
    '2.请务必在公司所在地或车辆停放地进行注册，否则您的位置显示将不准确；',
    '3.请及时管理您发布的信息，如已出租请在系统上标注说明。',
    '4.注册的公司或个人，请添加我们的官方微信号【SZLHZC01】咨询和沟通相关事宜，我们将通过官微给您推送通知和活动信息。',
    '5.如有问题可与各地市服务经理联系，平台咨询电话：18905751238。'],
    picPath1:'',
    picPath2:'',
    picPath3:'',
    to:'',
    disable:false,
    tel:0,
    num:'发送验证码',
    send:false,
    _num:60,
    _tId:''
  },
  onLoad: function (options) {
  	app.check();
    var t=this,
        {to='../is_host/is_host'}=options;
    t.setData({ to });
  },
  chooseImg:function(e) {
    var t=this,
        i=e.target.dataset.i||e.currentTarget.dataset.i;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        var tempFilePath = res.tempFilePaths[0];
        t.setData({
          ['picPath'+i]:tempFilePath
        });
      }
    })
  },
  setTel(e) {
    var tel=e.detail.value;
    this.setData({tel});
  },
  getCode() {
    var t=this,tel=t.data.tel,
        _num=t.data._num,_tId=t.data._tId;
    if(!/^\d{11}$/.test(tel)) {
      toast('手机号格式不符合！');
      return false;
    }
    if(_num==60) {
      _tId=setInterval(()=>{
        if(_num<=0) {
          t.setData({num:`重新发送`,send:false,_tId,_num:60});
          clearInterval(_tId);
        } else {
          t.setData({num:`${_num}秒后可重试`,send:true,_tId,_num});
          _num=_num-1;
        }
      },1000);
    }
    if(_num==60) {
      req({
            url:`${URL}/sendMsgCode.do?Person_phone=${tel}`
          }).then(res=>{
            if(res.code==4280) {

            }
      });
    }
  },
  send_form(e) {
    var t=this,
        data=e.detail.value,sp=[];//wxregist
    var f=checkSpace(data);

    if(f||t.data.picPath1==""||t.data.picPath2==""||t.data.picPath3=="") {
      toast('必填参数有空，请重新填写');
      return false;
    }
    var r=checkForm(data,{
      name:'Person_phone',
      type:'tel',
      msg:'手机号格式不符合'
    },{
      name:'mscCode',
      reg:/^\d{6}$/,
      msg:'验证码应为6位数字'
    });
    if(r.msg) {
      toast(r.msg);
      return false;
    }
    t.setData({ disable:true });
    //console.log(r);return false;
    var up1=req({
      filePath: t.data.picPath1,
    },uploadFile).then(res=>{
      if(res) {
        sp[0]=app.uploadUrl+res;
        return req({
                filePath: t.data.picPath2,
              },uploadFile);
      } else {
        toast("图片上传失败，请重试！");
        t.setData({ disable:false });
      }
    }).then(res=>{
      if(res) {
        sp[1]=app.uploadUrl+res;
        return req({
                filePath: t.data.picPath3,
              },uploadFile);
      } else {
        toast("图片上传失败，请重试！");
        t.setData({ disable:false });
      }
    }).then(res=>{
      if(res) {
        sp[2]=app.uploadUrl+res;
        var data1=Object.assign({},data,{
          Business_lbs_lat:app.globalData.latitude,
          Business_lbs_lon:app.globalData.longitude,
          facade:sp[0],
          Business_license:sp[1],
          Person_ID_front:sp[2]
        });
        /*提交表单*/
        return req({
          url:`${URL}/wxregist.do`,
          data:data1,
          header:{
            Cookie:app.globalData.head
          }
        })
      } else {
        toast("图片上传失败，请重试！");
        t.setData({ disable:false });
      }
    }).then(res=>{
        if(res.data.code==4280) {
          app.globalData.hasUser=true;
          toast('注册成功！');
          setTimeout(()=>{
            wx.redirectTo({ url: t.data.to });
          },1500);
        } else {
          toast(res.data.message);
          t.setData({ disable:false });
        }
    }).catch(err=>{
      t.setData({ disable:false });
      console.log(err);
    });
  }
})

