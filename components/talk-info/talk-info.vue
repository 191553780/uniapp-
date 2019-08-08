<template>
	<view>
		<!-- 模糊背景 -->
		<view class="talk-bg">
			<image :src="item.titlePic" mode="aspectFill" lazy-load></image>
		</view>
		<!-- 话题信息 -->
		<view class="talk-info">
			<view class="talk-info-top flex flex-item">
				<image :src="item.titlePic" mode="" lazy-load></image>
				<view>#{{item.title}}#</view>
			</view>
			<view class="talk-info-mid flex flex-item">
				<view>动态 {{item.totalNum}}</view>
				<view>今日 {{item.todayNum}}</view>
			</view>
			<view class="talk-info-bot">{{item.desc}}</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		item: Object
	},
	data () {
		return {}
	},
	methods: {}
}
</script>

<style lang="scss" scoped>
.talk-bg {
	width: 100%;
	height: 300rpx;
	position: relative;
	overflow: hidden;
	
	image {
		width: 100%;
		position: absolute;
		filter: blur(10px);
	}
}
.talk-info {
	padding: 0 25rpx;
	.talk-info-top {
		position: relative;
		image {
			width: 150rpx;
			height: 150rpx;
			border-radius: 20rpx;
			position: absolute;
			top: -75rpx;
		}
		view {
			font-size: 35rpx;
			margin-left: 170rpx;
			flex: 1;
		}
	}
	.talk-info-mid {
		padding: 35rpx 0 15rpx;
		view {
			color: #cdcdcd;
		}
	}
	.talk-info-bot {
		font-size: 32rpx;
		color: #a3a3a3;
		padding-bottom: 10rpx;
	}
}
</style>
