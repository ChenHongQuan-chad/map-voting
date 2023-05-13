/*
 * @Description:
 * @Author: Chad
 * @LastEditTime: 2022-09-21 11:51:54
 */
/*---------cookie-----------*/
//封装cookie
function setCookie(key, value, expires, path, domain, secure) {
	var cookie = encodeURIComponent(key) + '=' + encodeURIComponent(value)
	if (expires instanceof Date) {
		cookie += ';expires=' + expires
	}
	if (path) {
		cookie += ';path=' + path
	}
	if (domain) {
		cookie += ';domain=' + domain
	}
	if (secure) {
		cookie += ';secure'
	}
	cookie += ';path=/'
	document.cookie = cookie
}

//封装一个cookie失效时间
function setCookieDate(day) {
	var date = null
	if (typeof day == 'number' && day > 0) {
		date = new Date()
		date.setDate(date.getDate() + day)
	}
	return date
}

//获取指定键的cookie值
function getCookie(key) {
	var cookieName = encodeURIComponent(key) + '='
	var cookieValue = ''
	var cookieStart = document.cookie.indexOf(cookieName)
	if (cookieStart > -1) {
		var cookieEnd = document.cookie.indexOf(';', cookieStart)
		if (cookieEnd == -1) {
			cookieEnd = document.cookie.length
		}
		cookieValue = decodeURIComponent(
			document.cookie.substring(
				cookieStart + cookieName.length,
				cookieEnd
			)
		)
	}
	return cookieValue
}

//删除cookie
function removeCookie(key) {
	document.cookie = key + '=;expires=' + new Date(0)
}

//清除所有cookie函数
function clearAllCookie() {
	// eslint-disable-next-line no-useless-escape
	var keys = document.cookie.match(/[^ =;]+(?=\=)/g)
	if (keys) {
		for (var i = keys.length; i--; )
			document.cookie =
				keys[i] + '=0;expires=' + new Date(0).toUTCString()
	}
}

export { setCookie, setCookieDate, getCookie, removeCookie, clearAllCookie }
