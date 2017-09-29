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
  },
  onLoad: function (options) {
    var t=this;
  	app.check();
    /*自动获取城市*/
    wx.showLoading({title:'正在加载中！'});
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
        return `http://szlhzc.bchltech.cn/SZZC/${v.src}`;
      });
      
      t.setData({slides});
    });
    /*获取车辆信息*/
    req({
      url:`${URL}/getCarTypeIndex.do`
    }).then(res=>{
      var type1=res.data.data,
          type2=[];
      type1.map((v,i)=>{
        setTimeout(()=>{
          req({
            url:`${URL}/getCarIndex.do?parentId=${v.id}`,
            dataType:'json'
          }).then(res=>{
            type2[i]=splitLeft(res.data.data);
            if(i==type1.length-1) {
              wx.hideLoading();
              t.setData({
                type1:type1, type2:type2,
                address:app.globalData.address
              });
              setTimeout(()=>{
                t.setData({address:app.globalData.address});              
              },1000)
            }
          });
        },i*200);
      });
    })
  },
  chooseAddr() {
    var t=this;
    req({},wx.chooseLocation)
    .then(res=>{
      app.globalData.latitude = res.latitude;
      app.globalData.longitude = res.longitude;
      t.setData({address:res.name});console.log(res)
    })
  },
  test() {
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var temp = res.tempFilePaths[0];
        req({
          filePath:temp
        },uploadFile).then(res=>{
          console.log(app.uploadUrl+res);
          console.log('图片上传完毕')
        }).catch(err=>{
          console.log(err)
        });
      }
    })
  }
})
