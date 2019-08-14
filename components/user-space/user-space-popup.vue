<template>
	<view>
		<view class="notes-left-popup-mask" v-show="isShow" @tap="hidePopup"></view>
		<view class="notes-left-popup" v-show="isShow">
			<view class="notes-popup-top flex flex-item" @tap="pullBlack" hover-class="notes-popup-hover">
				<view class="icon iconfont icon-sousuo"></view>
				拉黑
			</view>
			<view class="notes-popup-bot flex flex-item" @tap="remarks" hover-class="notes-popup-hover">
				<view class="icon iconfont icon-qingchu"></view>
				备注
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		isShow: Boolean
	},
	data () {
		return {}
	},
	methods: {
		hidePopup () {
			this.$emit('hidePopup')
		},
		pullBlack () {
			this.$emit('pullBlack')
		},
		remarks () {
			this.$emit('remarks')
		}
	}
}
</script>

<style lang="scss" scoped>
.notes-left-popup-mask {
	position: absolute;
	right: 0;
	left: 0;
	top: 0;
	bottom: 0;
	z-index: 889;
}
.notes-left-popup {
	position: absolute;
	right: 0;
	top: 130rpx;
	background: #fff;
	z-index: 900;
	width: 55%;
	box-shadow: 1rpx 1rpx 20rpx 2rpx #ccc;
	
	.notes-popup-hover {
		background: #eee;
	}
	.notes-popup-top,.notes-popup-bot {
		padding: 20rpx;
		font-size: 35rpx;
		view {
			margin-right: 10rpx;
			font-weight: bold;
		}
	}
}
</style>
