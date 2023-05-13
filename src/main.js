/*
 * @Description:
 * @Author: chad-Chen
 * @LastEditTime: 2022-09-21 17:55:26
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueVideoPlayer from 'vue-video-player'
import 'babel-polyfill'
// require videojs style
import 'video.js/dist/video-js.css'
import 'vue-video-player/src/custom-theme.css'

Vue.use(
	VueVideoPlayer /* {
  options: global default options,
  events: global videojs events
} */
)

import './assets/less/reset.less'
import './assets/less/common.less'
import './components/icon/index'

// import Dialog from './components/dialog'
// import Loading from './components/loading'
// import toast from './components/toast'

// Vue.prototype.$dialog = Dialog
// Vue.prototype.$loading = Loading
// Vue.prototype.$toast = toast

import './JS/plugin'
import './JS/FastClick'
import filters from './JS/filter'
import utils from './JS/utils'
import VueScroller from 'vue-scroller'
import { get, post } from './JS/ajax'
import vantComponents from './JS/components'
Vue.use(vantComponents)

Vue.use(VueScroller)
Vue.use(utils)

Vue.prototype.$http = { get, post }

// 注入全局过滤器
Object.keys(filters).forEach(item => {
	Vue.filter(item, filters[item])
})

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
	document.title = to.meta.title
	const userInfo = sessionStorage.getItem('userInfo') || null
	if (!userInfo && to.meta.auth) {
		next('/login')
	} else {
		next()
	}
})

export default new Vue({
	el: '#app',
	router,
	store,
	render: h => h(App)
})
