<template>
	<view
		class="home-list-item flex flex-item flex-JustBetween"
		hover-class="home-list-hover"
		@tap="openEvent"
	>
		<view class="flex flex-item">
			<view 
				v-if="item.icon"
				class="icon iconfont"
				:class="['icon-'+item.icon]"
			></view>
			{{item.name}}
		</view>
		<view class="icon iconfont" :class="{'icon-jinru':!item.data}">{{item.data || ''}}</view>
	</view>
</template>

<script>
export default {
	props: {
		item: Object,
		index: Number
	},
	methods: {
		openEvent () {
			// console.log(this.item.clickType);
			switch (this.item.clickType) {
				case 'navigateTo':
					if (this.item.url) uni.navigateTo({ url:this.item.url })
				break;
				case 'redirectTo':
					if (this.item.url) uni.redirectTo({ url:this.item.url })
				break;
				case 'switchTab':
					if (this.item.url) uni.switchTab({ url:this.item.url })
				break;
				case 'reLaunch':
					if (this.item.url) uni.reLaunch({ url:this.item.url })
				break;
				case 'navigateBack':
					if (this.item.url) uni.navigateBack({ url:this.item.url })
				break;
				case 'clear':
					uni.showModal({
						title:'提示',
						content:'是否要清除缓存?',
						confirmText:'立即清除',
						success: (res) => {
							if (res.confirm) {
								uni.clearStorage()
								uni.showToast({
									title:'清楚缓存成功'
								}) 
								this.User.logout(false);
							}
						}
					})
				break;
				case "bind":
					if (this.User.userbind[this.item.provider]) return;
					this.bindother();
					break;
				case "nothing":
					uni.showToast({ title: '更新中...', icon: 'none' });
					break;
				case "update":
					this.lib.Update(true);
					break;
			}
		},
		// 绑定第三方登录
		bindother(){
			uni.login({
				provider: this.item.provider,
				// #ifdef MP-ALIPAY
				scopes: 'auth_user',  //支付宝小程序需设置授权类型
				// #endif
				success: (res) => {
					uni.getUserInfo({
						provider:this.item.provider,
						success: (infoRes)=> {
						let options = Object.assign(infoRes,res);
						this.bindEvent(this.User.__formatOtherLogin(this.item.provider,options));
						}
					});
				},
				fail: (err) => {
					uni.showToast({ title: '绑定失败',icon:"none" });
					console.log('login fail:', err);
				}
			});
		},
		async bindEvent(data){
			uni.showLoading({ title: '绑定中...', mask: false });
			let [err,res] = await this.$http.post("/user/bindother",data,{
				token:true,
				checkToken:true
			})
			if (!this.$http.errorCheck(err,res)) return uni.hideLoading();
			// 绑定成功
			uni.hideLoading();
			uni.showToast({ title: '绑定成功！' });
			// 修改状态，缓存
			this.User.userbind[this.item.provider] = {
				nickname:data.nickName
			}
			uni.setStorageSync("userbind", this.User.userbind);
			this.$emit('updateuserbind');
		}
	}
}
</script>

<style scoped lang="scss">
.home-list-item:first-of-type {
	border-top: 1px solid #f4f4f4;
}
.home-list-item {
	padding: 20rpx;
	border-bottom: 1px solid #f4f4f4;
	&>view:first-child {
		color:#333;
		&>view {
			margin-right: 10rpx;
		}
	}
	&>view:last-child {
		color:#ccc;
	}
}
.home-list-hover {
	background: #f4f4f4;
}
</style>
