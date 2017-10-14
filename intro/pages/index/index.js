var app=getApp();
var {u,baseURL:URL}=app;
Page({
  data: {
  	slides:['slide0.png'],
  	top:[{
  		title:'公司介绍',
  		src:'../../images/home/intro.png',
  		url:'../com/com'
  	},{
  		title:'团队介绍',
  		src:'../../images/home/team.png'
  	},{
  		title:'合作机构',
  		src:'../../images/home/company.png',
  		url:'../hezuo/hezuo'
  	},{
  		title:'案例分享',
  		src:'../../images/home/share.png',
  		url:'../cases1/cases1'
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
  	},],
  	scenes:[{
  		title:'电商买卖',
  		text:'适用于各行各业，例如：服装、电器、家居等衣食住行',
  		src:'../../images/home/scene1.png'
  	},{
  		title:'预约服务',
  		text:'适用于酒店预订、家政服务、场地预订等提前预约的服务',
  		src:'../../images/home/scene2.png'
  	},{
  		title:'新闻资讯',
  		text:'适用于各个行业的资讯内容展示、企业介绍，可评论互动',
  		src:'../../images/home/scene3.png'
  	},{
  		title:'社区讨论',
  		text:'适用于各个行业用户群体交流，兴趣或讨论组等服务',
  		src:'../../images/home/scene4.png'
  	},{
  		title:'商家联盟',
  		text:'适用于本地资源整合，打造自己的商圈联盟',
  		src:'../../images/home/scene5.png'
  	},{
  		title:'到店系统',
  		text:'餐饮行业提前约，免排队，提高执行效率',
  		src:'../../images/home/scene6.png'
  	},],
  	devs:[{
  		title:'申请小程序',
  		text:'微信公众平台申请小程序',
  		src:'../../images/home/dev1.png'
  	},{
  		title:'微信支付',
  		text:'申请小程序微信支付',
  		src:'../../images/home/dev2.png'
  	},{
  		title:'原型图制作',
  		text:'制作客户要求的效果图',
  		src:'../../images/home/dev3.png'
  	},{
  		title:'客户沟通',
  		text:'取得客户的满意',
  		src:'../../images/home/dev4.png'
  	},{
  		title:'微信开发者工具',
  		text:'序员马不停蹄编写代码。预览检查',
  		src:'../../images/home/dev5.png'
  	},{
  		title:'微信审核',
  		text:'上传成功之后，微信公众平台审核',
  		src:'../../images/home/dev6.png'
  	},]
  },
  onLoad: function (options) {
  	var t=this;
  }
})
