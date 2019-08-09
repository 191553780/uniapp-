<template>
	<view class="about">
		<view class="user-set-about-v flex flex-item flex-JustCenter flex-column">
			<image src="../../static/common/logo.png" mode="widthFix" lazy-load></image>
			<view>version 1.0.0</view>
		</view>
		<block v-for="(item,index) in list" :key="index">
			<home-list-item :item="item" :index="index"></home-list-item>
		</block>
	</view>
</template>

<script>
import homeListItem from '@/components/home/home-list-item.vue'
export default {
	data() {
		return {
			list: [
				{
					name: '新版本检测',
					clickType: '',
					url: ''
				},
				{
					name: '用户协议',
					clickType: 'navigateTo',
					url: ''
				}
			]
		}
	},
	components: {
		homeListItem
	},
	methods: {
		
	}
}
</script>

<style scoped lang="scss">
.about{
	padding: 20rpx;
	.user-set-about-v {
		padding: 40rpx 0;
		&>image {
			width: 65%;
			margin-top: 50rpx;
			margin-bottom: 30rpx;
		}
		&>view {
			color: #ccc;
		}
	}
}

</style>
