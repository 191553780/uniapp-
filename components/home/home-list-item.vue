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
		<view class="icon iconfont icon-jinru"></view>
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
							}
						}
					})
				break;
			}
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
