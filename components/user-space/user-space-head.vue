<template>
	<view class="user-space-head flex flex-item flex-JustCenter">
		<image :src="getBgImg" mode="widthFix" lazy-load @tap.stop="changeBgImg"></image>
		<view class="user-space-head-info flex flex-item flex-JustCenter flex-column">
			<image :src="userInfo.userPic" mode="widthFix"></image>
			<view class="user-space-info-name user-space-margin flex flex-item flex-JustCenter">
				{{userInfo.userName}} <tag-sex-age :sex="userInfo.sex" :age="userInfo.age"></tag-sex-age>
			</view>
			<view 
				class="icon iconfont  user-space-head-btn user-space-margin"
				:class="[userInfo.isFollow ? 'active' : 'icon-zengjia1']"
				@tap.stop="follow"
			>{{userInfo.isFollow ? '已关注' : '关注'}}</view>
		</view>
	</view>
</template>

<script>
import tagSexAge from '@/components/common/tag-sex-age.vue'
export default {
	props: {
		userInfo:Object
	},
	data () {
		return {
			bgImg: this.userInfo.bgImg
		}
	},
	components: {
		tagSexAge
	},
	computed: {
		getBgImg() {
			return `../../static/bgimg/${this.bgImg}.jpg`
		}
	},
	methods: {
		// 切换背景
		changeBgImg () {
			let no = parseInt(this.bgImg)
			this.bgImg = no < 4 ? ++no : 1
		},
		follow() {
			this.$emit('changeFollow')
		}
	},
}
</script>

<style scoped lang="scss">
.user-space-margin {
	margin: 15rpx 0;
}
.user-space-head {
	position: relative;
	height: 500rpx;
	overflow: hidden;
	
	&>image {
		width: 100%;
	}
	
	.user-space-head-info {
		position: absolute;
		top: 150rpx;
		
		&>image {
			width: 150rpx;
			height: 150rpx;
			border-radius: 100%;
		}
		.user-space-info-name {
			color: #fff;
			font-size: 35rpx;
			font-weight: bold;
			text-shadow: 2rpx 2rpx 10rpx #333;
		}
		.user-space-head-btn {
			background: #ffe933;
			color:#333;
			border: 1rpx solid #ffe933;
			padding: 0 15rpx;
			border-radius: 10rpx;
			font-size: 28rpx;
		}
		.active {
			background: none ;
			color: #fff;
			border: 1rpx solid #fff;
		}
	}
}
</style>
