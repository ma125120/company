var app=getApp();
var {req,toast,md5,baseURL:URL,Goto,checkForm,_DEV_, checkSpace}=app;
Page({
  data: {
  	pic1:false,
  	pic2:false,
  	picPath1:'',
  	picPath2:'',
    disable:false,
    all:[],
    ai:0,
    types:['自驾','可代驾','配驾'],
    ti:0,
    notices:[]
  },
  onLoad: function (options) {
  	var t=this;
  	app.check();
    t.setData({
      notices: app.globalData.help.note_upload.split('\n')
    });
  	if(!_DEV_) {
  		app.checkLogin('../uploadCar/uploadCar');
  		app.getAllCar(t);
  	} else {
  		t.setData({
  			
  		});
  	}
  },
  changeType(e) {
    var type=e.detail.value;
    this.setData({ti:type});
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
  changeAll(e) {
    var i=e.detail.value;
    this.setData( { ai:i } );
  },
  send_form(e) {
    var data=e.detail.value,t=this,sp=[];
    var f=checkSpace(data);
    if(f||t.data.picPath1==""||t.data.picPath2=="") {
      toast('必填参数有空，请重新填写');
      return false;
    }
    t.setData({ disable:true });
    var up1=req({
      url: 'https://cmcc.bchltech.cn/cmcc/upImg.htm',
      filePath: t.data.picPath1,
      name: 'file1',
      formData:{},
    },wx.uploadFile).then(res=>{
      let sp1=res.data.split('\"');
      if(sp1[5].indexOf("http")!=-1) {
        sp[0]=sp1[5].replace('http','https');
        return req({
                url: 'https://cmcc.bchltech.cn/cmcc/upImg.htm',
                filePath: t.data.picPath2,
                name: 'file2',
                formData:{},
              },wx.uploadFile);
      } else {
        toast("图片上传失败，请重试！");
        t.setData({ disable:false });
      }
    }).then(res=>{
      let sp2=res.data.split('\"');
      if(sp2[5].indexOf("http")!=-1) {
        sp[1]=sp2[5].replace('http','https');
        var imgs=sp.join(",");
        var data1=Object.assign({},data,{imgs:imgs,carType:t.data.all[t.data.ai].id,type:t.data.types[t.data.ti]});
        return req({
                url:`${URL}/publishRental.do`,
                header:{
                    Cookie:app.globalData.head
                },
                data:data1
              });
      } else {
        toast("图片上传失败，请重试！");
        t.setData({ disable:false });
      }
    }).then(res=>{
      if(res.data.code==4280) {
        toast('上传成功！');
        setTimeout(function() {
          wx.switchTab({url:'../is_host/is_host'});
        },2000);
      } else {
        toast('上传失败，请重试');
      }
      t.setData({ disable:false });
    }).catch(err=>{
      console.log(err);
    });
  }
})
