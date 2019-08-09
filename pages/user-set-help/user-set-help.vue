<template>
	<view class="help">
		<uni-collapse>
			<block v-for="(item,index) in list" :key="index">
				<uni-collapse-item :show-animation="true" :title="item.title">
					<view style="padding: 30upx;">
						{{item.content}}
					</view>
				</uni-collapse-item>
			</block>
		</uni-collapse>
		<button class="user-set-btn" type="primary" @tap="submit">意见反馈</button>
	</view>
</template>

<script>
import uniCollapse from '@/components/uni-collapse/uni-collapse.vue'
import uniCollapseItem from '@/components/uni-collapse-item/uni-collapse-item.vue'
export default {
	data() {
		return {
			list: [
				{
					title: '客服什么时候上线？',
					content: '1'
				},
				{
					title: '忘记账号/昵称/密码怎么办？',
					content: '2'
				},
				{
					title: '怎么搜索/查找/关注/取关用户？',
					content: '3'
				}
			]
		}
	},
	components: {
		uniCollapse,
		uniCollapseItem
	},
	methods: {
		submit () {}
	}
}
</script>

<style scoped lang="scss">
.help {
	padding: 0 20rpx;
}
</style>
