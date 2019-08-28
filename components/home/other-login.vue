<template>
	<view class="other-login flex flex-item">
		<block v-for="(item,index) in providerList" :key="item.name">
			<view class="flex flex-item flex-JustCenter flex-1" @tap="tologin(item)">
				<view 
					class="icon iconfont flex flex-item flex-JustCenter"
					:class="['icon-'+item.icon]"
				></view>
			</view>
		</block>
	</view>
</template>

<script>
export default {
	props:{
		noback:{
			type:Boolean,
			default:true
		}
	},
	data () {
		return {
			providerList: []
		}
	},
	mounted() {
		// #ifdef APP-PLUS || MP-ALIPAY
		this.getLoginAuth()
		// #endif
	},
	methods: {
		// #ifdef MP-WEIXIN
		mpGetUserInfo(result) {
			uni.showLoading({ title: '登录中...', mask: true });
			// 获取失败
			if (result.detail.errMsg !== 'getUserInfo:ok') {
				uni.hideLoading();
				uni.showModal({
					title: '获取用户信息失败',
					content: '错误原因' + result.detail.errMsg,
					showCancel: false
				});
				return;
			}
			let userinfo = result.detail.userInfo;
			uni.login({
				provider:"weixin",
				success: (res) => {
					this.MpLogin({
						url:"/wxlogin",
						code:res.code,
						nickName:userinfo.nickName,
						avatarUrl:userinfo.avatarUrl
					})
				},
				complete: () => {
					uni.hideLoading();
				}
			})
		},
		// #endif
		MpLogin(options){
			this.$http.post(options.url,{
				code:options.code,
				nickName:options.nickName,
				avatarUrl:options.avatarUrl
			}).then(data=>{
				let [err2,res2] = data;
				// 登录失败
				if (!this.$http.errorCheck(err2,res2)){
					return false;
				}
				console.log(res2.data.data)
				// 登录成功 保存状态
				this.User.token = res2.data.data.token;
				this.User.userinfo = this.User.__formatUserinfo(res2.data.data);
				// 本地存储
				uni.setStorageSync("userinfo",this.User.userinfo);
				uni.setStorageSync("token", this.User.token);
				// 获取用户相关统计
				if (this.User.userinfo.id) {
					this.User.getCounts();
				}
				// 连接socket
				if (this.User.userinfo.id) {
					this.$chat.Open();
				}
				// 成功提示
				uni.showToast({ title: '登录成功' });
				// 登录成功，重新加载数据
				this.$emit('logining')
				if (!this.noback) {
					uni.navigateBack();
				}
			});
		},
		// 获取当前登录渠道
		getLoginAuth () {
			uni.getProvider({
				service: 'oauth',
				success: (result) => {
					// console.log(JSON.stringify(result));
					this.providerList = result.provider.map((value) => {
						let providerName = '';
						let icon = ''
						switch (value) {
							case 'weixin':
								providerName = '微信登录';
								icon = 'weixin'
								break;
							case 'qq':
								providerName = 'QQ登录'
								icon = 'qq'
								break;
							case 'sinaweibo':
								providerName = '新浪微博登录'
								icon = 'xinlangweibo'
								break;
							case 'alipay':
								providerName = '支付宝登录'
								icon = ''
								break;
						}
						return {
							name: providerName,
							icon: icon,
							id: value
						}
					});
				},
				fail: (error) => {
					console.log('获取登录通道失败', error);
				}
			});
		},
		// 登录
		tologin(provider) {
			uni.login({
				provider: provider.id,
		              // #ifdef MP-ALIPAY
		              scopes: 'auth_user',  //支付宝小程序需设置授权类型
		              // #endif
				success: (res) => {
					// console.log('login success:', JSON.stringify(res));
					uni.showLoading({
						title: '登陆中...',
						mask: false
					});
					// 更新保存在 store 中的登录状态
					uni.getUserInfo({
						provider:provider.id,
						// #ifdef MP-ALIPAY
						scopes: 'auth_user',  //支付宝小程序需设置授权类型
						// #endif
						success: (infoRes) => {
							// console.log(JSON.stringify(infoRes));
							//支付宝登录
							// #ifdef MP-ALIPAY
							this.MpLogin({
								url:"/alilogin",
								code:res.code,
								avatarUrl:infoRes.userInfo.avatarUrl,
								nickName:infoRes.userInfo.nickName
							})
							// #endif
							// app登录
							// #ifndef MP-ALIPAY
							let data = this.User.__formatOtherLogin(provider.id,Object.assign(infoRes,res));
							// console.log(data);
							this.loginEvent(data);
							// #endif 
						}
					})
					// 更新保存在 store 中的登录状态
					console.log('登录成功,保存到本地存储,修改当前用户登录状态');
				},
				fail: (err) => {
					console.log('login fail:', err);
				},
				complete:()=>{
					uni.hideLoading();
				}
			});
		},
		async loginEvent(data){
			let res = await this.User.login({
				url:'/user/otherlogin',
				data:data,
				Noback:this.noback
			});
			if (res) {
				// 登录成功，重新加载数据
				this.$emit('logining')
			}
		}
	}
}
</script>

<style scoped lang="scss">
.other-login {
	padding: 20rpx 80rpx;
	&>view {
		view {
			width: 100rpx;
			height: 100rpx;
			border-radius: 100%;
			font-size: 55rpx;
			color: #fff;
		}
		.icon-weixin {
			background: #2bd198
		}
		.icon-xinlangweibo {
			background: #fc7729;
		}
		.icon-qq {
			background: #2caefc;
		}
	}
}
</style>
