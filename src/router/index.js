/*
 * @Description:
 * @Author: chad-Chen
 * @LastEditTime: 2022-09-21 12:18:13
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'home',
		component: () => import('../views/Home.vue'),
		meta: { title: '首页', keepAlive: false, index: 0 }
	},
	{
		path: '/userInfo',
		name: 'UserInfo',
		component: () => import('../views/UserInfo.vue'),
		meta: { title: '用户信息', keepAlive: false, index: 1 }
	},
	{
		path: '/about',
		name: 'About',
		component: () => import('../views/About.vue'),
		meta: { title: '投票站详情', keepAlive: false, index: 2 }
	},
	{
		path: '/voteInfo',
		name: 'VoteInfo',
		component: () => import('../views/VoteInfo.vue'),
		meta: { title: '投票结果', keepAlive: false, index: 3 }
	}
]

const router = new VueRouter({
	routes,
	scrollBehavior: () => ({ y: 0 })
})

export default router
