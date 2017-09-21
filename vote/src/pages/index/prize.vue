<template>
  <div class="prize">
	<div class="top">
		<img :src="'./static/imgs/prize/top.png'" alt="">
	</div>
	<div class="numbertice">
		<div class="item" v-for="(v,index) in contents" >
			<p class="title">{{v.title}}</p>
			<ol v-if="v.arr">
				<li v-for="(val,i) in v.text">{{(i+1)+'.'+val}}</li>
			</ol>
			<p :class="index==0?'text red':'text'" v-else>{{v.text}}</p>
		</div>
	</div>
	<div class="prizes">
		<div class="item" v-for="(v,i) in prizes">
			<p class="title">{{v.aw_name}}</p>
			<img :src="v.pic" alt="" v-if="v.pic" />
		</div>
	</div>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
    	contents:[
    		{
    			title:'（一）【礼物功能郑重声明】',
    			text:'赠送一点礼物为一元钱可自动兑换票数5票（每个礼物对应的点数不同）。赠送礼物除增加票数外无任何其它功能，所有礼物均为用户自行购买，不要恶意攀比，恶意竞争，本平台不承担任何法律责任。',
    			arr:false
    		},
    		{
    			title:'（二）【温馨提示】',
    			text:['活动期间每个微信号每天可投一票','比赛成绩按照票数评选，票数最多，排名第一','活动以友好、和谐、丰富文化生活为宗旨！礼品价值有限，请不要恶意攀比，恶意竞争！'],
    			arr:true
    		},{
    			title:'（三）【禁止刷票】',
    			text:'我们采用了高科技手段监控投票数据，严厉杜绝任何利用网络作弊投票行为，活动过程中如果发现票数异常，本平台将通知活动主办方告知对应的刷票者予以警告并减掉所刷的票数，如再次进行刷票严重者甚至取消参赛资格的处理。我们将保留作弊行为之截图、监控数据库作为证据保留。希望大家积极举报有关恶意刷票行为。',
    			arr:false
    		},{
    			title:'（四）【其他注意事项】',
    			text:['禁止盗用他人照片或冒用他人名义参赛，一经发现，取消参赛资格','一旦参赛，本活动将认定参赛者提供了自己照片的合法使用授权，不再另行协议。','本平台将会严肃处理。对蓄意诽谤、破坏、干扰活动的恶意言论及行为，本公司将诉诸法律手段维护本次活动的合法权益。'],
    			arr:true
    		},
    	],
    	prizes:[
    		{
    			title:'一等奖平板电脑+荣誉证书（一名）',
    			src:'./static/imgs/prize/p1.png'
    		},
    		{
    			title:'二等奖电话手表+荣誉证书（一名）',
    			src:'./static/imgs/prize/p1.png'
    		},
    		{
    			title:'三等奖故事机+荣誉证书（一名）',
    			src:'./static/imgs/prize/p1.png'
    		},
    		{
    			title:'四等奖望远镜）',
    			src:'./static/imgs/prize/p1.png'
    		}
    	]
    }
  },
  created(){
    var t=this;
    this.$http.get(`${t.$URL}/present/getpre.htm`)
    .then(res=>{
        let state=res.data.state;
        if(state==0) {
            let prizes=res.data.data.presentList;
            t.prizes=prizes;
        }
    })
    
  }
}
</script>

<style scoped lang='scss'>
.prize {
	width:90%;
	margin:0 auto;
	text-align: left;
	font-size:20rem;
}
ol {
	list-style: none;
}
.item {
	.title,
	.text {
		padding:6px 0;
	}
    .title {
    font-size:16rem
    }
}
.red {
	color:#DD3C3F;
}
.prizes {
	margin-top:30px;
	.title {
		background: yellow;
		color:#DD3C3F;
		font-weight: bold;
        padding-left:10px;
	}
    img {
        margin:20px 0 ;
        min-height:250px;
    }
}
</style>
