<!--
 * @Description:
 * @Author: chad-Chen
 * @LastEditTime: 2022-09-21 16:04:27
-->
<template>
	<div>
		<van-nav-bar
			left-arrow
			@click-left="$router.push('/')"
			title="请投票"
		/>
		<div class="about">
			<video-player
				v-if="currentPoint.vote_point_video_url"
				class="video-player vjs-custom-skin"
				ref="videoPlayer"
				:playsinline="true"
				:options="playerOptions"
			></video-player>
			<van-loading v-else type="spinner" />
			<div class="title">{{ currentPoint.vote_point_name }}</div>
			<p>{{ currentPoint.vote_point_text }}</p>
			<van-row class="fixed-button">
				<p>
					已投票数：<span
						class="vote-count"
						:style="{
							color:
								userVoteCount < 8
									? '#07c160'
									: 'rgb(255, 96, 52)'
						}"
						>{{ userVoteCount }}</span
					>/10
				</p>
				<van-button
					@click="submit()"
					type="primary"
					round
					block
					color="linear-gradient(to right, #ff6034, #ee0a24)"
					>投票</van-button
				>
			</van-row>
		</div>
	</div>
</template>

<script>
import { Toast } from 'vant'
import { Loading } from 'vant'
let homeUrl = 'http://vote.js.feiyutiyu.cn'
let appid = 'wx8ed20ecdfb101b6c'
let appSecret = '' //秘钥
export default {
	data() {
		return {
			userVoteCount: 0, //用户已经投票数
			currentPoint: {}
		}
	},
	computed: {
		player() {
			return this.$refs.videoPlayer.player
		},
		playerOptions() {
			return {
				playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
				autoplay: true, //如果true,浏览器准备好时开始回放。
				muted: false, // 默认情况下将会消除任何音频。
				loop: false, // 导致视频一结束就重新开始。
				preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
				language: 'zh-CN',
				aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
				fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
				sources: [
					{
						type: 'video/mp4', //这里的种类支持很多种：基本视频格式、直播、流媒体等，具体可以参看git网址项目
						src: this.currentPoint?.vote_point_video_url //url地址
					}
				],
				// poster: '../../static/images/test.jpg', //你的封面地址
				width: document.documentElement.clientWidth, //播放器宽度
				notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
				flash: { hls: { withCredentials: false } },
				html5: { hls: { withCredentials: false } },
				controlBar: {
					timeDivider: true,
					durationDisplay: true,
					remainingTimeDisplay: false,
					fullscreenToggle: true //全屏按钮
				}
			}
		}
	},
	watch: {
		//更改视频源 videoUrl从弹出框组件传值
		'currentPoint.vote_point_video_url'(val) {
			if (val !== '') {
				this.$nextTick(() => {
					this.$refs.videoPlayer.player.src(val)
				})
			}
		},
		// 投票满10票就跳转
		userVoteCount(v) {
			if (this.v === 10) {
				console.log('已经10票')
				this.$dialog
					.confirm({
						title: '提示',
						message: '您已经投满十票，查看投票结果？'
					})
					.then(() => {
						// on confirm
						this.$router.push('/voteInfo')
					})
					.catch(() => {
						// on cancel
					})
			}
		},
		//使用watch 监听$router的变化
		$route(to, from) {
			if (to.name === 'about') {
				this.queryVotePoints() //获取当前用户已投票数
			}
		}
	},
	mounted() {
		this.currentPoint = this.$store.state.publicData.currentPoint
		this.queryVotePoints() //获取当前用户已投票数
		this.initVideoPlay()
	},
	methods: {
		//初始化視頻
		initVideoPlay() {
			let self = this
			//调用 <audio> 元素提供的方法 play()
			self.$nextTick(() => {
				self.$refs.videoPlayer.player.play()
			})
			//判斷 WeixinJSBridge 是否存在
			if (
				typeof WeixinJSBridge == 'object' &&
				typeof WeixinJSBridge.invoke == 'function'
			) {
				self.$nextTick(() => {
					self.$refs.videoPlayer.player.play()
				})
			} else {
				//監聽客户端抛出事件"WeixinJSBridgeReady"
				if (document.addEventListener) {
					document.addEventListener(
						'WeixinJSBridgeReady',
						function() {
							self.$nextTick(() => {
								self.$refs.videoPlayer.player.play()
							})
						},
						false
					)
				} else if (document.attachEvent) {
					document.attachEvent('WeixinJSBridgeReady', function() {
						self.$nextTick(() => {
							self.$refs.videoPlayer.player.play()
						})
					})
					document.attachEvent('onWeixinJSBridgeReady', function() {
						self.$nextTick(() => {
							self.$refs.videoPlayer.player.play()
						})
					})
				}
			}

			//voiceStatu用來記録狀態,使 touchstart 事件只能觸發一次有效,避免與 click 事件衝突
			var voiceStatu = true
			//监听 touchstart 事件进而调用 <audio> 元素提供的 play() 方法播放音频
			document.addEventListener(
				'touchstart',
				function(e) {
					if (voiceStatu) {
						self.$refs.videoPlayer.player.play()
						voiceStatu = false
					}
				},
				false
			)
		},
		/**
		 * 获取点位以及用户已投票数
		 */
		async queryVotePoints() {
			//获取用户信息 以及当前投的票
			await this.$store.dispatch('getUserInfo')
			this.userVoteCount = parseInt(
				this.$store.state.user.userInfo.user_vote_count
			)
		},
		async submit() {
			//授權
			if (!this.$store.state.user.userInfo.user_open_id) {
				this.$dialog
					.confirm({
						title: '提示',
						message: '授权失效,返回重新授权？'
					})
					.then(() => {
						// on confirm
						this.util.getWxCode(homeUrl, appid)
					})
					.catch(() => {
						// on cancel
					})
				return
			}
			let data = {
				openId: this.$store.state.user.userInfo.user_open_id,
				pointId: this.currentPoint.vote_point_id
			}
			let res = await this.$http.post(`/api/vote/voteByUser`, data)
			// 状态码,1001：投票成功; -1003：用户不存在; -1004：站点不存在; -1005:您已被禁止投票; -1006:投票关闭; 1002:已经投满十票;
			if (res.error_code === 1001) {
				Toast.success('投票成功！')
				//更新投票数
				this.queryVotePoints()
			} else if (res.error_code === -1003) {
				//弹出信息
				Toast.fail(res.error_msg)
				//用户不存在重新授权
				this.util.getWxCode(homeUrl, appid)
			} else {
				//弹出信息
				Toast.fail(res.error_msg)
			}
		}
	}
}
</script>

<style lang="less" scoped>
.about {
	height: 100vh;
}
.title {
	margin-top: 10px;
}
.van-loading {
	height: 30vh;
	line-height: 30vh;
}
.fixed-button {
	position: fixed;
	bottom: 0;
	width: 100%;
	.vote-count {
		font-size: 0.24rem;
	}
	p {
		margin-bottom: 15px;
	}
}
</style>
