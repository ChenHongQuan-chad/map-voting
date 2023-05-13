<!--
 * @Description: 地图页面
 * @Author: chad-Chen
 * @LastEditTime: 2022-09-21 23:09:20
-->
<template>
	<div class="map">
		<!-- 投满10票展示结果 -->
		<van-button
			class="result"
			icon="medal-o"
			size="small"
			color="linear-gradient(to right, #ff6034, #ee0a24)"
			@click="$router.push('/voteInfo')"
			v-if="$store.state.user.userInfo.user_vote_count === 10"
		>
			投票结果
		</van-button>
		<ul>
			<li
				v-for="(item, index) in points"
				:key="index"
				:style="[
					{ left: `${item.vote_point_x}vw` },
					{ top: `${item.vote_point_y}vw` },
					{ width: `${item.vote_point_width || 30}vw` }
				]"
				@click="handlerClick(item)"
				:class="{ 'is-disabled': item.is_disabled === 0 }"
			>
				<img :src="item.vote_point_img_url" alt="" srcset="" />
			</li>
		</ul>
	</div>
</template>

<script>
import { Toast } from 'vant'
let homeUrl = 'http://vote.js.feiyutiyu.cn'
let appid = 'wx8ed20ecdfb101b6c'
let appSecret = '' //秘钥
export default {
	data() {
		return {
			currentPoint: {},
			points: [],
			timer: null
		}
	},
	mounted() {
		//实时展示数据
		this.queryALLVotePoints()
		this.timer = setInterval(() => {
			this.queryALLVotePoints()
		}, 5000)
		// 已经登录了就不要了
		if (this.$store.state?.user?.userInfo?.user_open_id) return
		let code = this.util.getUrlParams('code')
		if (!code) {
			this.util.getWxCode(homeUrl, appid)
		} else {
			this.authorization(code)
		}
	},
	destroyed() {
		clearInterval(this.timer)
		this.timer = null
	},
	methods: {
		async queryALLVotePoints() {
			let res = await this.$http.get(`/api/vote/queryALLVotePoints`)
			if (res.error_code === 0) {
				this.points = res.result
			}
		},
		/**
		 * 根据code获取登录token
		 * 原理：根据code获取微信openid，然后根据openid判断是否登录
		 * @param {Object} code
		 */
		async authorization(code) {
			let data = {
				code: code
			}
			let res = await this.$http.post(`/api/user/authorization`, data)
			if (res.error_code === 0) {
				this.$store.commit('setOpenId', res.openId) //外接的
				//获取用户信息
				await this.$store.dispatch('getUserInfo')
				let userInfo = this.$store.state.user.userInfo
				if (!userInfo.mobile_phone) {
					this.$router.push('/userInfo')
				}
			} else if (res.error_code === -1) {
				Toast.fail('系统出错')
			} else {
				console.log('重新授权')
				this.util.getWxCode(homeUrl, appid)
			}
		},
		async handlerClick(item) {
			//立即获取用户信息
			await this.$store.dispatch('getUserInfo')
			let userInfo = this.$store.state.user.userInfo
			if (!userInfo.mobile_phone) {
				this.$dialog
					.confirm({
						title: '提示',
						message: '信息还未完善，去完善？'
					})
					.then(() => {
						// on confirm
						this.$router.push('/userInfo')
					})
					.catch(() => {
						// on cancel
					})
				return
			}
			if (item.is_disabled === 1) return
			this.currentPoint = item
			this.$store.commit('setCurrentPoint', this.currentPoint) //外接的
			this.$router.push('/about')
		}
	}
}
</script>

<style scoped lang="less">
.map {
	height: 100%;
	width: 100%;
	background: url('~@/assets/images/index/bg-map.jpg') no-repeat center;
	background-size: cover;
	position: relative;
	.result {
		position: absolute;
		right: 0.1rem;
		top: 0.1rem;
	}
	ul {
		li {
			position: absolute;
			cursor: pointer;
			img {
				width: 100%;
			}
			&.is-disabled {
				img {
					-webkit-filter: grayscale(100%);
					/* Chrome, Safari, Opera */
					filter: grayscale(100%);
				}
			}
		}
	}
}
</style>
