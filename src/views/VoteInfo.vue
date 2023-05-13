<!--
 * @Description:
 * @Author: chad-Chen
 * @LastEditTime: 2022-09-21 12:07:13
-->
<template>
	<div>
		<van-nav-bar
			left-arrow
			@click-left="$router.push('/')"
			title="投票结果"
		/>
		<div ref="barDiv" class="bar-div"></div>
	</div>
</template>

<script>
import { barOption } from '@/data/VoteInfo'
export default {
	mounted() {
		//获取投票结果
		this.queryALLVotePoints()
	},
	methods: {
		async queryALLVotePoints() {
			let res = await this.$http.get(`/api/vote/queryALLVotePoints`)
			if (res.error_code === 0) {
				// this.points = res.result
				barOption.yAxis[0].data = res.result.map(
					item => item.vote_point_name
				)
				barOption.yAxis[1].data = barOption.series[0].data = res.result.map(
					item => item.vote_point_counts
				)
				this.$nextTick(() => {
					this.util.echartsInit(this.$refs.barDiv, barOption)
				})
			}
		}
	}
}
</script>

<style lang="less" scoped>
.bar-div {
	height: 100vh;
}
</style>
