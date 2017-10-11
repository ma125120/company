var app=getApp();
var {u,baseURL:URL}=app;
Page({
  data: {
  	slides:['slide0.png'],
  	top:[{
  		title:'公司介绍',
  		src:'../../images/home/intro.png'
  	},{
  		title:'团队介绍',
  		src:'../../images/home/team.png'
  	},{
  		title:'合作机构',
  		src:'../../images/home/company.png'
  	},{
  		title:'案例分享',
  		src:'../../images/home/share.png'
  	}],
  	funcs:[{
  		title:'电商系统',
  		text:'商品展示、下单购买、会员卡、优惠券订单管理、账单明细',
  		src:'../../images/home/f1.png'
  	},{
  		title:'美食外卖',
  		text:'菜单浏览、优惠活动、套餐菜品饭店介绍、微信支付',
  		src:'../../images/home/f2.png'
  	},{
  		title:'预约服务',
  		text:'弹性营业时间、精准预约、使用广泛自由定价、随时管理',
  		src:'../../images/home/f3.png'
  	},{
  		title:'资讯热点',
  		text:'信息多样、即时查看、海量内容个性设计、评论互动',
  		src:'../../images/home/f4.png'
  	},{
  		title:'后台管理',
  		text:'传统统计、访客分析、用户管理数据管理、商品信息',
  		src:'../../images/home/f5.png'
  	},]
  },
  onLoad: function (options) {
  	var t=this;
  }
})
