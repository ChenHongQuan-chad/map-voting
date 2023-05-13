/*
 * @Description:
 * @Author: chad-Chen
 * @LastEditTime: 2022-09-19 20:56:52
 */
module.exports = {
	env: {
		browser: true,
		es6: true,
		node: true,
		commonjs: true
	},
	extends: ['eslint:recommended', 'plugin:vue/essential'],
	globals: {
		Atomics: 'readonly',
		SharedArrayBuffer: 'readonly'
	},
	parser: 'vue-eslint-parser',
	parserOptions: {
		ecmaVersion: 6,
		sourceType: 'module',
		parser: 'babel-eslint'
	},
	plugins: ['vue'],
	rules: {
		// "indent": [
		// 	"error",
		// 	"tab"
		// ],
		'space-in-parens': 0,
		'func-call-spacing': 0,
		// 不需要
		'space-before-function-paren': 0, // 函数定义时括号前面要不要有空格
		'eol-last': 0, // 文件以单一的换行符结束
		'no-extra-semi': 0, // 可以多余的冒号
		semi: 0, // 语句可以不需要分号结尾
		eqeqeq: 0, // 必须使用全等
		'one-var': 0, // 连续声明
		'no-undef': 0, // 可以 有未定义的变量
		'no-unused-vars': 0, //定义的方法未使用

		// 警告
		'no-empty': 1, // 块语句中的内容不能为空
		'no-use-before-define': [1, 'nofunc'], // 未定义前不能使用
		'no-prototype-builtins': 1, //禁止直接使用 Object.prototypes 的内置属性
		'no-case-declarations': 1,

		// 错误
		'no-constant-condition': 2, // 禁止在条件中使用常量表达式 if(true) if(1)
		'no-dupe-args': 2, // 函数参数不能重复
		'no-dupe-keys': 2, // 在创建对象字面量时不允许键重复 {a:1,a:1}
		'no-duplicate-case': 2, // switch中的case标签不能重复
		'no-empty-character-class': 2, // 正则表达式中的[]内容不能为空
		'no-invalid-regexp': 2, // 禁止无效的正则表达式
		'no-func-assign': 2, // 禁止重复的函数声明
		'valid-typeof': 2, // 必须使用合法的typeof的值
		'no-unreachable': 2, // 不能有无法执行的代码
		'no-sparse-arrays': 2, // 禁止稀疏数组， [1,,2]
		'no-shadow-restricted-names': 2, // 严格模式中规定的限制标识符不能作为声明时的变量名使用
		'no-native-reassign': 2, // 不能重写native对象

		// 代码风格
		//"key-spacing": [1, {  // 对象字面量中冒号的前后空格
		//	"beforeColon": false,
		//	"afterColon": true
		//}],

		// common js
		'no-duplicate-imports': 1
	}
}
