/*
 * @Description:
 * @Author: chad-Chen
 * @LastEditTime: 2022-09-21 13:49:54
 */
import {
	Button,
	Cell,
	CellGroup,
	Toast,
	Field,
	Form,
	Dialog,
	Loading,
	Empty,
	NavBar,
	AddressEdit,
	Area,
	Col,
	Row,
	Badge,
	NoticeBar,
	Picker,
	Popup
} from 'vant'
const components = [
	Button,
	Cell,
	CellGroup,
	Toast,
	Field,
	Form,
	Dialog,
	Loading,
	Empty,
	NavBar,
	AddressEdit,
	Area,
	Col,
	Row,
	Badge,
	NoticeBar,
	Picker,
	Popup
]
export default {
	install(Vue) {
		// 方式二. 通过 Vue.component 注册
		// 注册完成后，在模板中通过 <van-button> 标签来使用按钮组件
		components.forEach(component => {
			Vue.use(component)
		})
	}
}
