/*
 * @Description:
 * @Author: chad-Chen
 * @LastEditTime: 2022-09-21 14:10:37
 */
import * as echarts from 'echarts'
var labelData = [
	'党小组、村（居）民组会议',
	'粮油副食群众通过电话或口头等方式',
	'群众通过微信、QQ等方式退出',
	'党员议事日',
	'意见箱',
	'包组干部收集到群众的需求',
	'落实上级党委政府工作安排',
	'其它'
]
var valueData = [52, 32, 12, 53, 65, 36, 69, 29]
var barOption = {
	title: {
		text: '投票汇总',
		x: 'center',
		y: '15',
		textStyle: {
			color: '#ffffff'
		}
	},
	backgroundColor: '#013B6F',
	grid: {
		top: '8%',
		left: '6%',
		right: '6%',
		bottom: '10%'
	},
	xAxis: {
		show: false
	},
	tooltip: {
		show: true
	},
	yAxis: [
		{
			splitLine: 'none',
			axisLine: 'none',
			axisLabel: {
				verticalAlign: 'bottom',
				align: 'left',
				padding: [0, 0, 5, 8], //文字与柱状图的距离
				textStyle: {
					color: '#FFFFFF',
					fontSize: '14'
				}
			},
			data: labelData
		},
		{
			axisLine: 'none',
			data: valueData,
			axisLabel: {
				show: true,
				verticalAlign: 'bottom',
				align: 'right',
				padding: [0, 8, 5, 0], //数据与图形的距离
				textStyle: {
					color: '#fff',
					fontSize: '14'
				}
			}
		}
	],
	series: [
		{
			type: 'bar',
			showBackground: true,
			data: valueData,
			barWidth: 10,
			itemStyle: {
				normal: {
					color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
						{
							offset: 0,
							color: 'rgba(41, 204, 255, 1)'
						},
						{
							offset: 1,
							color: 'rgba(10, 114, 255, 1)'
						}
					])
				}
			}
		}
	]
}

export { barOption }
