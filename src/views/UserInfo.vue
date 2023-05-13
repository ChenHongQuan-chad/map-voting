<!--
 * @Description:
 * @Author: chad-Chen
 * @LastEditTime: 2022-09-21 23:07:21
-->
<template>
	<div>
		<van-nav-bar title="填写用户信息" />
		<van-form @submit="onSave">
			<van-field
				v-model="tel"
				name="手机号"
				label="手机号"
				placeholder="请输入手机号"
				maxlength="11"
				type="tel"
				:rules="[
					{
						required: true,
						message: '请输入手机号'
					},
					{
						message: '请输入正确的手机号',
						pattern: /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/
					}
				]"
			/>
			<van-field
				readonly
				clickable
				v-model="address"
				name="所属街镇"
				label="所属街镇"
				type="text"
				placeholder="请输入所属街镇"
				:rules="[{ required: true, message: '请选择所属街镇' }]"
				@click="showPicker = true"
			/>
			<van-popup v-model="showPicker" position="bottom">
				<van-picker
					show-toolbar
					:columns="columns"
					@confirm="onConfirm"
					@cancel="showPicker = false"
				/>
			</van-popup>
			<div class="fixed-btn">
				<van-button
					round
					block
					type="info"
					native-type="submit"
					color="linear-gradient(to right, #ff6034, #ee0a24)"
					>提交</van-button
				>
			</div>
		</van-form>
		<van-notice-bar color="#ee0a24" left-icon="info-o">
			提示：本信息填写，仅用于活动结束后发放奖品使用！
		</van-notice-bar>
	</div>
</template>

<script>
let homeUrl = 'http://vote.js.feiyutiyu.cn'
let appid = 'wx8ed20ecdfb101b6c'
let appSecret = '' //秘钥
import { Toast } from 'vant'
export default {
	data() {
		return {
			tel: '',
			address: '',
			showPicker: false,
			columns: [
				'吴淞街道',
				'友谊路街道',
				'张庙街道',
				'罗店镇',
				'大场镇',
				'杨行镇',
				'月浦镇',
				'罗泾镇',
				'顾村镇',
				'高境镇',
				'庙行镇',
				'淞南镇'
			]
		}
	},
	methods: {
		onConfirm(value) {
			this.address = value
			this.showPicker = false
		},
		async onSave() {
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
				name: '',
				mobilePhone: this.tel,
				streetAddress: this.address
			}
			let res = await this.$http.post(`/api/user/commitinfo`, data)
			if (res.error_code === 0) {
				Toast.success('信息提交成功！')
				this.$router.push('/')
			} else if (res.error_code === -1001) {
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
			} else {
				Toast.fail('系统繁忙!')
			}
		}
	}
}
</script>

<style lang="less" scoped>
.van-notice-bar {
	margin-top: 0.18rem;
}
.fixed-btn {
	position: fixed;
	bottom: 0;
	width: calc(100%);
}
</style>
