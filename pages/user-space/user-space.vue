<template>
	<view>
		<!-- 背景 + 用户基本信息 -->
		<view class="user-space-head flex flex-item flex-JustCenter">
			<image src="../../static/bgimg/1.jpg" mode="widthFix" lazy-load></image>
			<view class="user-space-head-info flex flex-item flex-JustCenter flex-column">
				<image src="../../static/demo/userpic/20.jpg" mode="widthFix"></image>
				<view class="user-space-info-name user-space-margin flex flex-item flex-JustCenter">
					昵称 <tag-sex-age :sex="0" :age="20"></tag-sex-age>
				</view>
				<view class="icon iconfont icon-zengjia1 user-space-head-btn user-space-margin active">关注</view>
			</view>
		</view>
	</view>
</template>

<script>
import tagSexAge from '../../components/common/tag-sex-age.vue'
export default {
	data() {
		return {
			
		}
	},
	components: {
		tagSexAge
	},
	methods: {
		
	}
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
