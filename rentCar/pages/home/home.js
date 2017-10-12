var app=getApp();
var {req,toast,md5,baseURL:URL,Goto,checkForm,_DEV_,uploadFile,
    downloadUrl}=app;

var splitLeft=function(data) {
  if(data.length>0) {
    data.map((v,i)=>{
      if(v.name.indexOf('\(')>-1) {
        let arr=v.name.split('\(');
        arr[1]="("+arr[1];
        v.names=arr;
      }
      return v;
    })
  }
  return data;
}
  
Page({
  data: {
  	slides:[],
  	address:'浙江绍兴市',
    type1:[],
    type2:[],
    _img:''
  },
  onLoad: function (options) {
    var t=this;
  	app.check();
    wx.showLoading({title:'正在加载中！'});
    /*获取车辆信息*/
    req({
      url:`${URL}/getCarTypeIndex.do`
    }).then(res=>{
      var type1=res.data.data,
          type2=[];
      type1.map((v,i)=>{
        setTimeout(()=>{
          req({
            url:`${URL}/getCarIndex.do?parentId=${v.id}`
          }).then(res=>{
            type2[i]=splitLeft(res.data.data);
            if(i==type1.length-1) {
              t.setData({
                type1:type1, type2:type2,
                address:app.globalData.address
              });
              setTimeout(()=>{
                t.setData({address:app.globalData.address}); 
                wx.hideLoading();             
              },500);
            }
          });
        },i*200);
      });
    });
    /*获取轮播图*/
    req({
      url:`${URL}/Resources/RollsImgs.json`
    }).then(res=>{
      var slides=res.data;
      /*
      slides.map((v,i)=>{
        req({
          url:`${downloadUrl}${v.src}`
        },wx.downloadFile).then(res=>{
          let temp=res.tempFilePath;
          return req({
            tempFilePath:temp
          },wx.saveFile);
        }).then(res=>{
          let store=res.savedFilePath;
          wx.setStorage({
            key:'slide'+i,
            data:store
          });
        })
        return v;
      });*/
      slides=slides.map((v)=>{
        return `${v.src}`;
      }); 
      t.setData({slides});
    });
  },
  chooseAddr() {
    var t=this;
    req({},wx.chooseLocation)
    .then(res=>{
      app.globalData.latitude = res.latitude;
      app.globalData.longitude = res.longitude;
      t.setData({address:res.name});
    })
  },
})
