<template>
	<view class="list-item flex flex-item animated fast fadeInLeft" @tap="openDetail">
		<image :src="item.titlePic" mode="" lazy-load></image>
		<view class="list-info">
			<view class="info-title">#{{item.title}}#</view>
			<view>{{item.desc}}</view>
			<view>动态 {{item.total}} 今日 {{item.todayNum}}</view>
		</view>
	</view>
</template>

<script>
export default {
	props:{
		item: Object,
		index: Number
	},
	data () {
		return {}
	},
	methods: {
		openDetail () {
			uni.navigateTo({
				url:'../../pages/talk-detail/talk-detail'
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.list-item {
	padding: 20rpx 0;
	padding-bottom: 25rpx;
	border-bottom: 1rpx solid #eee;
	
	image {
		width: 150rpx;
		height: 150rpx;
		border-radius: 10rpx;
		margin-right: 20rpx;
	}
	.list-info {
		view {
			color: #a4a4a4;
		}
		.info-title {
			font-size: 32rpx;
			color: #000;
		}
	}
}
</style>
