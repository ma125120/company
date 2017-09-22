var app=getApp();
var {req,toast,md5,baseURL:URL,Goto,checkForm,_DEV_}=app;
Page({
  data: {
  	pos:null,
    markers: [{
      iconPath: "/resources/others.png",
      id: 0,
      latitude: 23.099994,
      longitude: 113.324520,
      width: 50,
      height: 50
    }],
    polyline: [{
      points: [{
        longitude: 112.548879,
        latitude: 37.87059
      }, {
        longitude: 112.648879,
        latitude: 38.87059
      }],
      color:"#FF0000",
      width: 10,
      dottedLine: true
    }],
    controls: [{
      id: 1,
      iconPath: '/resources/location.png',
      position: {
        left: 0,
        top: 500 - 50,
        width: 50,
        height: 50
      },
      clickable: true
    }]
  },
  regionchange(e) {
    console.log(e.type)
  },
  markertap(e) {
    console.log(e.markerId)
  },
  controltap(e) {
    console.log(e.controlId)
  },
  onLoad: function (options) {
  	var t=this;
  	app.check();
  	wx.getLocation({
		  type: 'wgs84',
		  success: function(res) {
		    t.setData({
		    	pos:res
		    })

		  }
		})
  }
})
