/*
 * @Description:
 * @Author: chad-Chen
 * @LastEditTime: 2022-09-21 17:54:50
 */
module.exports = {
	presets: [
		'@vue/cli-plugin-babel/preset',
		['@babel/preset-env', { modules: false }]
	],
	plugins: [
		[
			'import',
			{
				libraryName: 'vant',
				libraryDirectory: 'es',
				style: true
			},
			'vant'
		]
	]
}
