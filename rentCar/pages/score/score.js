var app=getApp();
var {req,toast,md5,baseURL:URL,Goto,checkForm,_DEV_}=app;
Page({
  data: {
  	score:99,
  	picPath1:'',
  	picPath2:'',
  	picPath3:'',
  	notice:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus sapien nunc eget.'
  },
  onLoad: function (options) {
  	var t=this;
  	app.check();
  	if(!_DEV_) {
      app.checkLogin('../score/score');
  		req({
  			url:`${URL}/getIntegral.do`,
        header:{
          Cookie:app.globalData.head
        }
  		}).then(res=>{
  			if(res.data.code!=4280) {
          t.setData({score:0});
        } else {
          t.setData({score:res.data.data});
        }
  		}).catch(err=>{
  			
  		});
  	} else {
  		t.setData({
  			
  		});
  	}
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
  send_form() {
    var t=this,sp=[],index=0;//wxregist
    if(t.data.picPath1==""&&t.data.picPath2==""&&t.data.picPath3=="") {
      toast('必填参数有空，请重新填写');
      return false;
    }
    t.setData({ disable:true });
    var num=0;
    if(t.data.picPath1!="") {
      num=num+1;
    }
    if(t.data.picPath2!="") {
      num=num+1;
    }
    if(t.data.picPath3!="") {
      num=num+1;
    }

    if(t.data.picPath1!="") {
      req({
        url: 'https://cmcc.bchltech.cn/cmcc/upImg.htm',
        filePath: t.data.picPath1,
        name: 'file1',
        formData:{},
      },wx.uploadFile).then(res=>{
        let sp1=res.data.split('\"');
        if(sp1[5].indexOf("http")!=-1) {
          sp[0]=sp1[5].replace("http","https");
          index=index+1;
        } else {
          toast("图片上传失败，请重试！");
          t.setData({ disable:false });
        }
        if(index==num) {
          return req({
            url:`${URL}/submit.do`,
            data:{
              img1:sp[0],
              img2:sp[1],
              img3:sp[2]
            },
            header:{
              Cookie:app.globalData.head
            }
          })
        }
      }).then(res=>{
        if(res.data.code==4280) {
          toast('上传成功!');
          setTimeout(()=>{
            wx.switchTab({url:'../is_host/is_host'});
          },2000)
        } else {
          toast('上传失败！');
          t.setData({ disable:false });
        }
      }).catch(err=>{
        console.log(err);
        t.setData({ disable:false });
      });
    }
    
    if(t.data.picPath2!="") {
      req({
        url: 'https://cmcc.bchltech.cn/cmcc/upImg.htm',
        filePath: t.data.picPath2,
        name: 'file2',
        formData:{},
      },wx.uploadFile).then(res=>{
        let sp2=res.data.split('\"');
        if(sp2[5].indexOf("http")!=-1) {
          sp[1]=sp2[5].replace("http","https");
          index=index+1;
        } else {
          toast("图片上传失败，请重试！");
          t.setData({ disable:false });
        }
        if(index==num) {
          return req({
            url:`${URL}/submit.do`,
            data:{
              img1:sp[0],
              img2:sp[1],
              img3:sp[2]
            },
            header:{
              Cookie:app.globalData.head
            }
          })
        }
      }).then(res=>{
        if(res.data.code==4280) {
          toast('上传成功!');
          setTimeout(()=>{
            wx.switchTab({url:'../is_host/is_host'},2000);
          })
        } else {
          toast('上传失败！');
          t.setData({ disable:false });
        }
      }).catch(err=>{
        console.log(err);
        t.setData({ disable:false });
      });
    }
    
    if(t.data.picPath3!="") {
      req({
        url: 'https://cmcc.bchltech.cn/cmcc/upImg.htm',
        filePath: t.data.picPath3,
        name: 'file3',
        formData:{},
      },wx.uploadFile).then(res=>{
        let sp3=res.data.split('\"');
        if(sp3[5].indexOf("http")!=-1) {
          sp[2]=sp3[5].replace("http","https");
          index=index+1;
        } else {
          toast("图片上传失败，请重试！");
          t.setData({ disable:false });
        }
        if(index==num) {
          return req({
            url:`${URL}/submit.do`,
            data:{
              img1:sp[0],
              img2:sp[1],
              img3:sp[2]
            },
            header:{
              Cookie:app.globalData.head
            }
          })
        }
      }).then(res=>{
        if(res.data.code==4280) {
          toast('上传成功!');
          setTimeout(()=>{
            wx.switchTab({url:'../is_host/is_host'},2000);
          })
        } else {
          toast('上传失败！');
          t.setData({ disable:false });
        }
      }).catch(err=>{
        console.log(err);
        t.setData({ disable:false });
      });
    }
    
  }
})
