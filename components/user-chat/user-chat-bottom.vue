<template>
	<view class="user-chat-bottom flex flex-item flex-JustBetween animated fast fadeInUp">
		<input type="text" placeholder="文明发言" v-model="text"/>
		<view class="icon iconfont icon-fabu flex flex-JustCenter" @tap="submit"></view>
	</view>
</template>

<script>
export default {
	data () {
		return {
			text: ''
		}
	},
	methods: {
		submit () {
			this.$emit('submit',this.text)
			this.text = ''
		}
	}
}
</script>

<style lang="scss" scoped>
.user-chat-bottom {
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	height: 120rpx;
	padding: 0 20rpx;
	background: #fff;
	border-top: 1rpx solid #eee;;
	
	input {
		background: #f7f7f7;
		flex: 1;
		margin-right: 20rpx;
		padding: 10rpx 20rpx;;
		border-radius: 10rpx;
	}
	view {
		width: 80rpx;
		font-size: 45rpx;
	}
}
</style>
