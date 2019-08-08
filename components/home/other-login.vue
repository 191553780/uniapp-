<template>
	<view class="other-login flex flex-item">
		<view class="flex flex-item flex-JustCenter flex-1">
			<view class="icon iconfont icon-weixin flex flex-item flex-JustCenter"></view>
		</view>
		<view class="flex flex-item flex-JustCenter flex-1">
			<view class="icon iconfont icon-xinlangweibo flex flex-item flex-JustCenter"></view>
		</view>
		<view class="flex flex-item flex-JustCenter flex-1">
			<view class="icon iconfont icon-qq flex flex-item flex-JustCenter"></view>
		</view>
	</view>
</template>

<script>
export default {
	
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
