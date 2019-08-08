<template>
	<view class="user-set">
		<block v-for="(item,index) in list" :key="index">
			<home-list-item :item="item" :index="index"></home-list-item>
		</block>
		<button class="user-set-btn" type="primary">退出登录</button>
	</view>
</template>

<script>
import homeListItem from '@/components/home/home-list-item.vue'
export default {
	data() {
		return {
			list: [
				{name: '账号与安全'},
				{name: '绑定邮箱'},
				{name: '资料编辑'},
				{name: '小纸条'},
				{name: '清除缓存'},
				{name: '意见反馈'},
				{name: '关于'}
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
.user-set {
	padding: 0 20rpx;
	.user-set-btn {
		width: 100%;
		margin: 20rpx 0;
		background: #ffe933;
		color: #333;
		border: 0;
	}
}
</style>
