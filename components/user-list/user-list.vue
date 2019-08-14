<template>
	<view class="user-list-item flex flex-item animated fadeIn fast">
			<image :src="item.userPic" mode="" lazy-load></image>
			<view>
				<view class="username">{{item.userName}}</view>
				<view style="display: inline-block;">
					<tag-sex-age :sex="item.sex" :age="item.age"></tag-sex-age>
				</view>
			</view>
			<view 
				class="icon iconfont  flex flex-JustCenter"
				:class="[item.isFollow ? 'icon-xuanze' : 'icon-zengjia']"
			></view>
	</view>
</template>

<script>
import tagSexAge from '@/components/common/tag-sex-age.vue'

export default {
	props: {
		item: Object,
		index: Number
	},
	components: {
		tagSexAge
	},
	data () {
		return {}
	},
	methods: {}
}
</script>

<style scoped lang="scss">
.user-list-item {
	padding: 20rpx 20rpx;;
	border-bottom: 1rpx solid #eee;
	
	image {
		width: 100rpx;
		height: 100rpx;
		border-radius: 100%;
		margin-right: 20rpx;
		flex-shrink: 0;
	}
	&>view:first-of-type {
		flex: 1;
		.username {
			font-size: 35rpx;
		}
	}
	&>view:last-of-type {
		width: 80rpx;
		color: #ccc;
	}
	&>.icon-zengjia {
		color: #f87918 !important;
	}
}
</style>
