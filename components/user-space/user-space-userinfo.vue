<template>
	<view class="user-space-userinfo">
		<view class="user-space-userinfo-item">
			<view>账号信息</view>
			<view>糗龄：{{getRegTime}}</view>
			<view>糗百ID：{{userInfo.id}}</view>
		</view>
		<view class="user-space-userinfo-item">
			<view>个人信息</view>
			<view>星座：{{getStars}}</view>
			<view>职业：{{userInfo.job}}</view>
			<view>故乡：{{userInfo.path}}</view>
			<view>情感：{{userInfo.feel}}</view>
		</view>
	</view>
</template>

<script>
import t from '@/common/time.js'
export default {
	props: {
		userInfo: Object
	},
	computed: {
		getRegTime () {
			return t.gettime.sumAge(this.userInfo.regtime)
		},
		getStars () {
			return t.gettime.getHoroscope(this.userInfo.birthday)
		}
	}
}
</script>

<style scoped lang="scss">
.user-space-userinfo {
	padding:0 30rpx;
	.user-space-userinfo-item {
		padding: 20rpx 0;
		border-bottom: 1rpx solid #eee;
		&>view{
			color: #aaa;
		}
		&>view:first-child {
			color:#333;
			font-size: 35rpx;
			padding: 15rpx 0;
		}
	}
}
</style>
