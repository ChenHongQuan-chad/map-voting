/*
 * @Description:
 * @Author: chad-Chen
 * @LastEditTime: 2022-09-20 19:36:14
 */
/**
 * 获取js里的所有modules
 * @returns
 */
const getModules = function(modulesFiles) {
	const modules = modulesFiles.keys().reduce((modules, modulePath) => {
		const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
		const module = modulesFiles(modulePath)
		modules[moduleName] = Object.prototype.hasOwnProperty.call(
			module,
			'default'
		)
			? module.default
			: module
		return modules
	}, {})
	return modules
}
export { getModules }
