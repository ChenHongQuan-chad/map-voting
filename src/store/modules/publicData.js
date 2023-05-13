/*
 * @Description:
 * @Author: chad-Chen
 * @LastEditTime: 2022-09-21 18:34:22
 */
import { get, post } from '@/JS/ajax'
import router from '@/router' //请求request封装
import store from '@/store' //请求request封装
const state = {
	currentPoint: JSON.parse(
		sessionStorage.getItem('currentPoint')
			? sessionStorage.getItem('currentPoint')
			: '{}'
	),
	openId: sessionStorage.getItem('openId')
		? sessionStorage.getItem('openId')
		: '',
	menuArr: JSON.parse(
		sessionStorage.getItem('menuArr')
			? sessionStorage.getItem('menuArr')
			: '[]'
	)
}
const mutations = {
	setCurrentPoint: (state, data) => {
		state.currentPoint = data
		sessionStorage.setItem('currentPoint', JSON.stringify(data))
	},
	setOpenId: (state, data) => {
		state.openId = data
		sessionStorage.setItem('openId', data)
	},
	setMenuArr: (state, data) => {
		state.menuArr = data
		sessionStorage.setItem('menuArr', JSON.stringify(data))
	},
	setRasKey: (state, data) => {
		state.rasKey = data
		sessionStorage.setItem('rasKey', JSON.stringify(data))
	},
	setKeyValue: (state, data) => {
		state.keyValue = data
		sessionStorage.setItem('keyValue', JSON.stringify(data))
	}
}
const actions = {
	// 获取关键key去传用户token
	getKeyValue({ commit }) {
		return new Promise((resolve, reject) => {
			services.getKeyValue({}).then(res => {
				if (res && res.success) {
					if (res.data.length > 0) {
						commit('setKeyValue', res.data[0]?.keyValue) //外接的
					} else {
						this.$message({
							showClose: true,
							message: '获取请求key失败了！',
							type: 'error',
							duration: 3000
						})
					}
				}
				// if (!res && res.hasOwnProperty('errMsg')) {
				//     this.$message({
				//         showClose: true,
				//         message: '获取波塞冬安全秘钥失败,请再次登录！',
				//         type: 'error',
				//         duration: 3000,
				//     })
				//     reject()
				//     return
				// }
				resolve()
			})
		})
	},
	// 获取公钥--波塞冬
	getEncrypt({ commit }) {
		return new Promise((resolve, reject) => {
			services.getSecurityKey().then(res => {
				if (!res && res.hasOwnProperty('errMsg')) {
					this.$message({
						showClose: true,
						message: '获取波塞冬安全秘钥失败,请再次登录！',
						type: 'error',
						duration: 3000
					})
					reject()
					return
				}
				let rasKey = RSAUtils.getKeyPair(
					res.data.encryptionExponent,
					'',
					res.data.modulus
				)
				commit('setRasKey', rasKey)
				resolve(rasKey)
			})
		})
	}
}
export default {
	state,
	mutations,
	actions
}
