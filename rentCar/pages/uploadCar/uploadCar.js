var app=getApp();
import weCropper from '../util/pic.js'
const device = wx.getSystemInfoSync();
const width = device.windowWidth;
const height = device.windowHeight;

var {req,toast,md5,
   baseURL:URL,Goto,checkForm,_DEV_, checkSpace,uploadFile}=app;
Page({
  data: {
  	pic1:false,
  	pic2:false,
  	picPath1:'',
  	picPath2:'',
    disable:false,
    all:[],
    ai:0,
    types:['自驾','可配司机','配驾'],
    ti:0,
    notices:[],
    cutting:false,
    cutImg:0,
    cropperOpt: {
      id: 'cropper',
      width,
      height,
      scale: 2.5,
      zoom: 8,
      cut: {
        x: (width - 300) / 2,
        y: (height - 300) / 2,
        width: 300,
        height: 300
      }
    }
  },
  touchStart (e) {
    this.wecropper.touchStart(e)
  },
  touchMove (e) {
    this.wecropper.touchMove(e)
  },
  touchEnd (e) {
    this.wecropper.touchEnd(e)
  },
  cutPic(e) {
    var i=e.target.dataset.i||e.currentTarget.dataset.i,
    t=this;
    t.wecropper.pushOrign(t.data['picPath'+i]);
    t.setData({
      cutImg:i,
      cutting:true
    });
  },
  exit() {
    this.setData({cutting:false})
  },
  sure(e) {
    var t=this,{cutImg}=t.data;
    this.wecropper.getCropperImage((src) => {
      if (src) {
        t.setData({
          ['picPath'+cutImg]:src,
          cutting:false
        });
      }
    })
  },
  initImg () {
    const { cropperOpt } = this.data

    new weCropper(cropperOpt)
      .on('ready', (ctx) => {
        console.log(`wecropper is ready for work!`)
      })
      .on('beforeImageLoad', (ctx) => {

        wx.showToast({
          title: '上传中',
          icon: 'loading',
          duration: 20000
        })
      })
      .on('imageLoad', (ctx) => {

        wx.hideToast()
      })
      .on('beforeDraw', (ctx, instance) => {

      })
      .updateCanvas()
  },
  onLoad: function (options) {
  	var t=this;
  	app.check();
    t.initImg();
    console.log(t)
    t.setData({
      //notices: app.globalData.help.note_upload.split('\n')
    });
  	if(!_DEV_) {
  		app.checkLogin('../uploadCar/uploadCar');
  		app.getAllCar(t);
  	} else {
  		t.setData({
  			
  		});
  	};
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
        // t.setData({
        //   ['picPath'+i]:tempFilePath
        // });
        t.wecropper.pushOrign(tempFilePath);
        t.setData({
          cutImg:i,
          cutting:true
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
    data=Object.assign({},data,{carType:t.data.all[t.data.ai].id,type:t.data.types[t.data.ti]});
    var f=checkSpace(data);
    if(f||t.data.picPath1=="") {
      toast('必填参数有空，请重新填写');
      return false;
    }
    var r=checkForm(data,{
      name:'seat',
      reg:/^\d{1,}$/,
      msg:'座位必须为数字'
    },{
      name:'price',
      reg:/^\d{1,}$/,
      msg:'出租价格必须为数字'
    },{
      name:'carType',
      reg:/^\d{1,}$/,
      msg:'车型必须为数字'
    });
    if(r.msg) {
      toast(r.msg);
      return false;
    }
    t.setData({ disable:true });
    var up1=req({
      filePath: t.data.picPath1,
    },uploadFile).then(res=>{
      if(res) {
        sp[0]=app.uploadUrl+res;
        if(!t.data.picPath2) {
          sp[1]="";
          var imgs=sp.join(",");
          var data1=Object.assign({},data,{imgs:imgs});
            req({
                url:`${URL}/publishRental.do`,
                header:{
                    Cookie:app.globalData.head
                },
                data:data1
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
        } else {
          return req({
                filePath: t.data.picPath2,
              },uploadFile);
        }
        
      } else {
        toast("图片上传失败，请重试！");
        t.setData({ disable:false });
      }
    }).then(res=>{
      if(res) {
        sp[1]=app.uploadUrl+res;
        var imgs=sp.join(",");
        var data1=Object.assign({},data,{imgs:imgs});
        return req({
                url:`${URL}/publishRental.do`,
                header:{
                    Cookie:app.globalData.head
                },
                data:data1
              });
      } else {
        t.setData({ disable:false });
      }
    }).then(res=>{
      if(res) {
        if(res.data.code==4280) {
          toast('上传成功！');
          setTimeout(function() {
            wx.switchTab({url:'../is_host/is_host'});
          },1200);
        } else {
          toast('上传失败，请重试');
        }
        t.setData({ disable:false });
      }
    }).catch(err=>{
      console.log(err);
    });
  }
})
