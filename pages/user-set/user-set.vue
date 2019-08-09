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
				{
					name: '账号与安全',
					clickType: 'navigateTo',
					url: '../../pages/user-set-repassword/user-set-repassword'
				},
				{
					name: '绑定邮箱',
					clickType: 'navigateTo',
					url: '../../pages/user-set-email/user-set-email'
				},
				{
					name: '资料编辑',
					clickType: 'navigateTo',
					url: '../../pages/user-set-info/user-set-info'
				},
				{
					name: '小纸条',
					clickType: 'navigateTo',
					url: ''
				},
				{
					name: '清除缓存',
					clickType: '',
					url: ''
				},
				{
					name: '意见反馈',
					clickType: 'navigateTo',
					url: '../../pages/user-set-help/user-set-help'
				},
				{
					name: '关于',
					clickType: 'navigateTo',
					url: '../../pages/user-set-about/user-set-about'
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
.user-set {
	padding: 0 20rpx;
}
</style>
