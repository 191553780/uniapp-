import $http from "./request.js";
import $chat from './chat.js';
export default {
	// 用户token 测试token：b56b701c9e99e8acc66b70a3f2d4e7bf53dc4e38
	token:'b56b701c9e99e8acc66b70a3f2d4e7bf53dc4e38',
	// 用户信息
	userinfo:false,
	// 权限验证跳转
	navigate(options,NoCheck = false,type = "navigateTo"){
		// 是否登录验证
		if (!this.token) {
			return uni.navigateTo({ url: '/pages/login/login' })
		}
		// 跳转
		switch (type){
			case "navigateTo":
			uni.navigateTo(options);
				break;
			case "redirectTo":
			uni.redirectTo(options);
				break;
			case "reLaunch":
			uni.reLaunch(options);
				break;
			case "switchTab":
			uni.switchTab(options);
				break;
		}
	}
}