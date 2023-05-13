/*
 * @Description:
 * @LastEditTime: 2022-09-21 22:46:15
 */
import { get, post } from '@/JS/ajax'
import router from '@/router' //请求request封装
import store from '@/store' //请求request封装
import { setCookie, getCookie, clearAllCookie } from '@/JS/cookie'
import { Dialog } from 'vant'
let homeUrl = 'http://vote.js.feiyutiyu.cn'
let appid = 'wx8ed20ecdfb101b6c'
let appSecret = '' //秘钥
/**
 * 获取微信登录code
 * @param {Object} redirect_path
 */
function getWxCode(redirect_path, appid = 'wx8ed20ecdfb101b6c') {
	/**
	 * 判断是否是在微信打开
	 */
	function isWechat() {
		return (
			String(
				navigator.userAgent.toLowerCase().match(/MicroMessenger/i)
			) === 'micromessenger'
		)
	}
	console.log(redirect_path)
	if (isWechat()) {
		// console.log('getWxCode22');
		// 截取地址中的code，如果没有code就去微信授权，如果已经获取到code了就直接把code传给后台获取openId  redirect_uri 是你的站点域名，一定要encodeURIComponent
		window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${encodeURIComponent(
			redirect_path
		)}&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect`
		//redirect_uri地址里面不能多/，如果多一个/就会跳转不成功，所以redirect_path要注意是/pages/clue/cule
		// redirect_uri是授权成功后，跳转的url地址，微信会帮我们跳转到该链接，并且通过？的形式拼接code，这里需要用encodeURIComponent对链接进行处理。
		// 如果配置参数一一对应，那么此时已经通过回调地址刷新页面后，你就会再地址栏中看到code了。
		// http://127.0.0.1/pages/views/profile/login/login?code=001BWV4J1lRzz00H4J1J1vRE4J1BWV4q&state=1
	} else {
		console.log('请在微信端打开')
	}
}
// initial state
const state = {
	//用户token
	token: getCookie('GDSSESSIONID') || '',
	//用户的个人信息
	userInfo: JSON.parse(
		sessionStorage.getItem('userInfo')
			? sessionStorage.getItem('userInfo')
			: '{}'
	)
}
// mutations 相当于data
const mutations = {
	setToken(state, data) {
		setCookie('GDSSESSIONID', data)
		state.token = data
	},
	setUserInfo: (state, data) => {
		state.userInfo = data
		sessionStorage.setItem('userInfo', JSON.stringify(data))
	},
	//退出登录处理
	logout() {
		state.token = ''
		state.userInfo = {}
		clearAllCookie()
		sessionStorage.clear()
		// 1. 按需导入重置路由方法
		// 2. 使用
		// 这里重置之后，登录时路由对象就需要加载
		// resetRouter()
	}
}
// actions  操作
const actions = {
	//登录
	login({ commit, dispatch }, data) {
		return new Promise((resolve, reject) => {})
	},
	getUserInfo({ commit, dispatch }) {
		return new Promise((resolve, reject) => {
			if (!store.state.publicData.openId) {
				Dialog.confirm({
					title: '提示',
					message: '授权失效,返回重新授权？'
				})
					.then(() => {
						// on confirm
						getWxCode(homeUrl, appid)
					})
					.catch(() => {
						// on cancel
					})
				return
			}
			get(
				`/api/user/queryUserInfo?openId=${store.state.publicData.openId}`
			)
				.then(res => {
					if (res.error_code === 0) {
						commit('setUserInfo', res.userInfo)
						resolve()
					} else {
						Dialog.confirm({
							title: '提示',
							message: '授权失效,返回重新授权？'
						})
							.then(() => {
								// on confirm
								getWxCode(homeUrl, appid)
							})
							.catch(() => {
								// on cancel
							})
					}
				})
				.catch(error => {
					reject(error)
				})
		})
	},
	/**
	 * 登录失败跳转到登录页
	 */
	async logout({ commit }) {
		//退出
		let res = await services.logout()
		if (res && res.success) {
			commit('logout')
		} else {
			throw new Error('登录失败！')
		}
	}
}

export default {
	state,
	//getters,
	actions,
	mutations
}
