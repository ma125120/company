var sort=function(array,type,asc) {
    var asc=asc||false;
    array.sort(function(a,b) {
      if(!asc) {
        return parseFloat(b[type])-parseFloat(a[type]);
      } else {
        return parseFloat(a[type])-parseFloat(b[type]);
      }
    });
};
var u={};
u.setStore=function(name,value) {
	switch(typeof name) {
		case 'string':
			window.localStorage[name]=value;
			break;
		case 'object':
			for(let i in name) {
				if(name.hasOwnProperty(i)) {
					window.localStorage[i]=name[i];
				}
			}
			break;
	}
}
u.getStore=function(name) {
	return window.localStorage[name];
}

u.setCookie=function(c_name,value,expiredays)
{
var exdate=new Date()
exdate.setDate(exdate.getDate()+expiredays)
document.cookie=c_name+ "=" +escape(value)+
((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
}

//取回cookie
u.getCookie=function(c_name)
{
		var c_start,c_end;
if (document.cookie.length>0)
  {
  c_start=document.cookie.indexOf(c_name + "=")
  if (c_start!=-1)
    { 
    c_start=c_start + c_name.length+1 
    c_end=document.cookie.indexOf(";",c_start)
    if (c_end==-1) c_end=document.cookie.length
    return unescape(document.cookie.substring(c_start,c_end))
    } 
  }
return "";
}
function share(data,wx) {
	var data=data||{};
	data.title="微信投票";
	data.imgUrl="http://www.bchltech.cn/rentCar/small.jpg";
	data.desc="微信投票";
  /*分享到朋友圈*/
  wx.onMenuShareTimeline({
    title: data.title, // 分享标题
    link: data.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
    imgUrl: data.imgUrl, // 分享图标
    success: function () { 
        // 用户确认分享后执行的回调函数
    },
    cancel: function () { 
        // 用户取消分享后执行的回调函数
    }
  });
  /*分享给朋友*/
  wx.onMenuShareAppMessage({
    title: data.title, // 分享标题
    desc: data.desc, // 分享描述
    link: data.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
    imgUrl: data.imgUrl, // 分享图标
    success: function () { 
        // 用户确认分享后执行的回调函数
    },
    cancel: function () { 
        // 用户取消分享后执行的回调函数
    }
  });
  /*分别到qq*/
  wx.onMenuShareQQ({
    title: data.title, // 分享标题
    desc: data.desc, // 分享描述
    link: data.link, // 分享链接
    imgUrl: data.imgUrl, // 分享图标
    success: function () { 
       // 用户确认分享后执行的回调函数
    },
    cancel: function () { 
       // 用户取消分享后执行的回调函数
    }
  });
  /*分享到微博*/
  wx.onMenuShareWeibo({
    title: data.title, // 分享标题
    desc: data.desc, // 分享描述
    link: data.link, // 分享链接
    imgUrl: data.imgUrl, // 分享图标
    success: function () { 
       // 用户确认分享后执行的回调函数
    },
    cancel: function () { 
        // 用户取消分享后执行的回调函数
    }
  });
  /*分享到QQ空间*/
  wx.onMenuShareQZone({
    title: data.title, // 分享标题
    desc: data.desc, // 分享描述
    link: data.link, // 分享链接
    imgUrl: data.imgUrl, // 分享图标
    success: function () { 
       // 用户确认分享后执行的回调函数
    },
    cancel: function () { 
        // 用户取消分享后执行的回调函数
    }
  });
}
u.share=share;
u.getUrl=function(url) {
	return `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx320830cb5c7cef67&redirect_uri=${encodeURIComponent(url)}&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect`
}
export {
  sort,
  u
}

