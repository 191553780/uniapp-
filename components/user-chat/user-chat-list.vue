<template>
	<view class="user-chat">
		<view v-if="item.gstime" class="user-chat-time flex flex-item flex-JustCenter">{{item.gstime}}</view>
		<view 
			class="user-chat-list flex"
			:class="{'user-chat-me':item.isMe}"
		>
			<image v-if="!item.isMe" :src="item.userpic" mode="" lazy-load></image>
			<view class="user-chat-list-body">
				<!-- 文字 -->
				<text v-if="item.type == 'text'">{{item.data}}</text>
				<!-- 图片 -->
				<image v-if="item.type == 'img'" :src="item.data" mode="widthFix" lazy-load></image>
			</view>
			<image v-if="item.isMe" :src="item.userpic" mode="" lazy-load></image>
		</view>
	</view>
</template>

<script>
export default {
	name: 'user-chat-list',
	props: {
		item: Object,
		index: Number
	},
	data () {
		return {
		}
	},
	mounted() {
	},
	methods: {

	}
}
</script>

<style scoped lang="scss">
.user-chat-time {
	padding: 50rpx 0;
	color: #a2a2a2;
	font-size: 24rpx;
}
.user-chat-list {
	padding: 20rpx 0;
	&>image {
		width: 100rpx;
		height: 100rpx;
		border-radius: 100%;
		flex-shrink: 0;
	}
	.user-chat-list-body {
		position: relative;
		background: #f4f4f4;
		padding: 25rpx;
		margin-left: 20rpx;
		margin-right: 100rpx;
		border-radius: 20rpx;
		
		&:after {
			content: '';
			position: absolute;
			left: -30rpx;
			right: 0;
			top: 25rpx;
			width: 0;
			height: 0;
			border: 16rpx solid #f4f4f4;
			border-color: transparent #f4f4f4 transparent transparent;
		}
	}
}
.user-chat-me {
	justify-content: flex-end;
	.user-chat-list-body {
			margin-left: 100rpx;
			margin-right: 20rpx;
			
			image {
				max-width: 200rpx;
			}
			
			&:after {
				left: auto;
				right: -30rpx;
				border-color: transparent transparent transparent #f4f4f4;
			}
	}
}
</style>
