<template>
	<view class="home-data flex flex-item">
		<block v-for="(item,index) in homeData" :key="index">
			<view class="flex-1 flex flex-item flex-JustCenter flex-column">
				<view>{{item.num}}</view>
				{{item.name}}
			</view>
		</block>
	</view>
</template>

<script>
export default {
	props: {
		homeData: Array
	}
}
</script>

<style scoped lang="scss">
.home-data {
	padding: 20rpx 40rpx;
	&>view {
		color: #989898;
		view {
			font-size: 32rpx;
			color: #000;
		}
	}
}
</style>
