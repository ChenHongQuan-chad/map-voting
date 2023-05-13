/*
 * @Description:
 * @Author: chad-Chen
 * @LastEditTime: 2022-09-20 19:36:43
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import { getModules } from '@/JS/utils-node.js'
import getters from './getters'
//拿到modules下的所有modules
let modules = getModules(require.context('./modules', true, /\.js$/)) //读取./下面的所有的js文件
export default new Vuex.Store({
	modules,
	getters
})
