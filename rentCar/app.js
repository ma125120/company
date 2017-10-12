//app.js
import {req,toast,sort,checkForm,toDate,filter,checkSpace} from './utils/util.js'
import md5 from './utils/md5.js';
import uploadFile from './utils/upload.js'
import {getCalendar} from './utils/date.js'
import weCropper from './utils/pic.js'
var getConf=function(data) {
  var arr=data.split("\n");
}
const _URL='https://szlhzc.bchltech.cn/SZZC/';
App({
  getCalendar,
  uploadFile,
  weCropper,
  uploadUrl:'https://szzclh.oss-cn-beijing.aliyuncs.com/',
  downloadUrl:'http://szlhzc.bchltech.cn/SZZC/',
  baseURL:'https://szlhzc.bchltech.cn/SZZC/',
  onLaunch: function() {
    var t=this;
    wx.getLocation({
      type: 'wgs84', //返回可以用于wx.openLocation的经纬度
      success: function(res) {
        t.globalData.latitude = res.latitude;
        t.globalData.longitude = res.longitude;
        req({
          url:`${t.baseURL}/getAddrInfo.do?location=${res.latitude},${res.longitude}`
        }).then(res=>{
          t.globalData.address=res.data.result.addressComponent.province+res.data.result.addressComponent.city;
          t.globalData.addr=res.data.result.formatted_address;
          t.globalData.addr_code=res.data.result.addressComponent.adcode;
        });
      }
    });
    /*获取备注*/
    req({
      url:`${t.baseURL}/Resources/webConf.json`,
      dataType:'json'
    }).then(res=>{
      t.globalData.help=res.data;
    });
  },
  onShow() {
    this.getLogin();
  },
  getLogin(fnFail,fn) {
    var t=this;
    if(!t.globalData.hasUser) {
      req({},wx.login)
      .then(res=>{
        return req({
          url: `${t.baseURL}/wxlogin.do?code=${res.code}`
        });
      }).then(res=>{
        //res.data.code=4280
        var head=res.header['Set-Cookie'];
        wx.setStorageSync('head',head);
        t.globalData.head=head;
        //获取用户注册信息;
        if(res.data.code==4280) {
          t.globalData.hasUser=true;
          t.globalData.user=res.data.data;
          req({
            url:`${_URL}/getIntegral.do`,
            header:{
              Cookie:t.globalData.head
            }
          }).then(res=>{
            //res.data.code=4280;res.data.data=0
            if(res.data.code==4280&&res.data.data==0) {
              toast('积分为0');
            }
          }).catch(err=>{
            console.log(err);
          });
          fn&&fn();
        } else {
          t.globalData.hasUser=false;
          fnFail&&fnFail();
        }
        

      }).catch(err=>{
        console.log(err);
      });
    }
    
  },
  _DEV_:false,
  
  getUserInfo: function(cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.getUserInfo({
        withCredentials: false,
        success: function(res) {
          that.globalData.userInfo = res.userInfo;
          typeof cb == "function" && cb(that.globalData.userInfo)
        }
      })
    }
  },
  req,
  sort,
  toast,
  md5,
  toDate,
  checkForm,
  filter,
  checkSpace,
  Goto(url){
    wx.navigateTo({
      url:url
    })
  },
  check() {
    var t=this;
    if(!t.globalData.userInfo) {
      t.getUserInfo(function(userInfo){
        
      });
    }
  },
  checkLogin(url) {
    var t=this;
    if(!t.globalData.hasUser) {
      t.getLogin(()=>{ t.Goto('../tip/tip?to='+url); }); 
    }
  },
  toImg(data) {
    var obj=data;
    for(let i=0,len=obj.length;i<len;i++) {
      if(obj[i].imgs) {
        var imgs=obj[i].imgs.split(",");
        obj[i].img1=imgs[0];
        obj[i].img2=imgs[1]||imgs[0];
      }
      if(!obj[i].name) {
        obj[i].name='没有名字';
      }
    }
    return obj;
  },
  getAllCar(p) {
    var all=wx.getStorageSync('all'),t=this;
    if(!all) {
      req({
        url:`${t.baseURL}/getAllCarIndex.do`,
        head:{
          Cookie:t.globalData.head
        }
      }).then(res=>{
        var a=res.data.data;
        //a=a.filter(v=>v.name!='更多');
        wx.setStorage({
          key:'all',
          data:a
        });
        p.setData({ all:a });
      }).catch(err=>{
        console.log(err);
      })
    } else {
      p.setData({ all:wx.getStorageSync('all')});
    }
  },
  globalData: {
    userInfo: null,
    user:null,
    hasUser:false,
    head:''
  }
})
