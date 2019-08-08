<template>
	<view class="notes-list flex flex-item animated fast fadeInLeft" @tap="openChat">
		<image :src="item.userPic" mode="" lazy-load></image>
		<view class="notes-list-r">
			<view class="notes-title flex flex-item flex-JustBetween">
				{{item.userName}}
				<view>{{item.time}}</view>
			</view>
			<view class="notes-user flex flex-item flex-JustBetween">
				{{item.data}}
				<template v-if="item.noreadNum > 0">
					<uni-badge :text="item.noreadNum" type="error" />
				</template>
			</view>
		</view>
	</view>
</template>

<script>
import uniBadge from '@/components/uni-badge/uni-badge.vue'

export default {
	props:{
		item: Object,
		index: Number
	},
	data () {
		return {}
	},
	components: {
		uniBadge
	},
	methods: {
		openChat () {
			uni.navigateTo({
				url:'../../pages/user-chat/user-chat'
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.notes-list {
	border-bottom: 1rpx solid #eee;
	padding:  20rpx 0;
	
	image {
		width: 100rpx;
		height: 100rpx;
		border-radius: 100%;
		margin-right: 20rpx;
		flex-shrink: 0;
	}
	
	.notes-list-r {
		flex: 1;
		
		.notes-title {
			font-size: 35rpx;
			view {
				color: #cbcbcb;
			}
		}
		.notes-user {
			color: #999;
		}
	}
}
</style>
