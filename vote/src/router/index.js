import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Index from '../pages/index/index.vue'
import Home from '../pages/index/home.vue'
import Prize from '../pages/index/prize.vue'
import List from '../pages/index/list.vue'
import Profile from '../pages/child/profile.vue'
import Gift from '../pages/child/gift.vue'
import Ac from '../pages/child/ac.vue'

Vue.use(Router)

var router=new Router({
  routes: [
    {
      path: '/',
      component: Index,
      children:[
      	{
			path: '/',
		    name: 'home',
		    component: Home
      	},
      	{
			path: '/prize',
		    name: 'prize',
		    component: Prize
      	},
      	{
			path: '/list',
		    name: 'list',
		    component: List
      	},
      ]
    },
    {
    	path: '/profile',
      	component: Profile,
      	name:'profile'
    },
    {
    	path: '/gift',
      	component: Gift,
      	name:'gift'
    },{
      path: '/ac',
        component: Ac,
        name:'ac'
    },
  ]
});
// router.beforeEach((to, from, next) => {
//   document.body.scrollTop=0;
//   next();
// });
export default router;
