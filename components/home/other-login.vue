<template>
	<view class="other-login flex flex-item">
		<block v-for="(item,index) in providerList" :key="item.name">
			<view class="flex flex-item flex-JustCenter flex-1" @tap="tologin">
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
	data () {
		return {
			providerList: []
		}
	},
	mounted() {
		this.getLoginAuth()
	},
	methods: {
		// 获取当前登录渠道
		getLoginAuth () {
			uni.getProvider({
				service: 'oauth',
				success: (result) => {
					console.log(JSON.stringify(result));
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
					console.log('login success:', res);
					// 更新保存在 store 中的登录状态
					// this.login(provider.id);
					console.log('登录成功,保存到本地存储,修改当前用户登录状态');
				},
				fail: (err) => {
					console.log('login fail:', err);
				}
			});
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
