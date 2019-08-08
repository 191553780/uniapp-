<template>
	<view>
		<detail-info :item="detail"></detail-info>
	</view>
</template>

<script>
import detailInfo from '@/components/detail/detail-info.vue'
export default {
	data() {
		return {
			detail: {
				userPic: '../../static/demo/userpic/12.jpg',
				userName: '啦啦啦',
				sex: 1, // 0 男 1 女
				age: 25,
				isFollow: false,
				title: '如果声音有形状，你的会是什么样',
				titlePic: '../../static/demo/datapic/1.jpg',
				morePic: [
					'../../static/demo/datapic/1.jpg',
					'../../static/demo/datapic/2.jpg',
					'../../static/demo/datapic/20.jpg'
				],
				video: false,
				share: false,
				path: '重庆 渝中',
				shareNum: 50,
				commenNum: 20,
				goodNum: 101
			}
		}
	},
	onLoad(e) {
		this.initData(JSON.parse(e.detailData))
	},
	// 监听导航右边按钮
	onNavigationBarButtonTap(e) {
		if (e.index == 0) {
			console.log('分享');
		}
	},
	components: {
		detailInfo
	},
	methods: {
		// 初始化数据
		initData (obj) {
			console.log(obj);
			// 修改窗口标题
			uni.setNavigationBarTitle({ title: obj.title })
		}
	}
}
</script>

<style lang="scss" scoped>

</style>
