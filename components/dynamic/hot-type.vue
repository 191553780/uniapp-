<template>
	<view class="hot-type">
		<view class="hot-title flex flex-item flex-JustBetween">
			<view>热门分类</view>
			<view class="flex flex-item flex-JustBetween" @tap="openTalk">
				更多
				<view class="icon iconfont icon-jinru"></view>
			</view>
		</view>
		<view class="hot-items flex flex-item">
			<block v-for="(item,index) in hotItems" :key="index">
				<view>{{item.name}}</view>
			</block>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		hotItems: Array
	},
	data () {
		return {}
	},
	methods: {
		openTalk () {
			uni.navigateTo({
				url: '../../pages/hot-nav/hot-nav'
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.hot-type {
	border-top: 1rpx solid #eee;
	border-bottom: 1rpx solid #eee;
	padding: 20rpx;
	.hot-title {
		margin-bottom: 10rpx;
		&>view:first-child {
			font-size: 32rpx;
		}
		&>view:last-child {
			color: #9e9e9e;
		}
	}
	.hot-items {
		view {
			flex: 1;
			background: rgba(243, 243, 243, 0.5);
			color: #9e9e9e;
			border-radius: 10rpx;
			margin: 0 10rpx;
			text-align: center;
		}
	}
}
</style>
