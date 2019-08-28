<template>
	<view class="home-info flex flex-item" @tap="toUserSpace">
		<image :src="homeInfo.userpic" lazy-load></image>
		<view class="info-desc flex-1">
			<view class="info-top">{{homeInfo.username}}</view>
			<view class="info-bot">总文章 {{homeInfo.totalnum}}  今日 {{homeInfo.todaynum}}</view>
		</view>
		<view class="icon iconfont icon-jinru"></view>
	</view>
</template>

<script>
export default {
	props: {
		homeInfo: Object
	},
	methods: {
		 toUserSpace () {
			uni.navigateTo({
				url: '../../pages/user-space/user-space?userid='+this.homeInfo.id
			})
		}
	},
}
</script>

<style scoped lang="scss">
.home-info {
	padding: 20rpx 40rpx;
	&>image {
		flex-shrink: 0;
		width: 100rpx;
		height: 100rpx;
		border-radius: 100%;
		margin-right: 15rpx;
	}
	.info-desc {
		.info-top {
			font-size: 32rpx;
		}
		.info-bot {
			color: #bbb;
		}
	}
	&>view:last-of-type {
		height: 100%;
	}
}
</style>
