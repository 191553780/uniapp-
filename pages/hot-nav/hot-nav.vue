<template>
	<view>
		<swiper-tab-head 
			:tabBars="tabBars" 
			:tabIndex="tabIndex" 
			@fixIndex="fixIndex"
		></swiper-tab-head>
		
		<view class="uni-tab-bar">
			<swiper 
				class="swiper-box" 
				:style="{height: swiperHeight +'px'}" 
				:current="tabIndex"
				@change="tabChange"
			>
				<block v-for="(items,index) in newsList" :key="index">
					<swiper-item>
						<scroll-view scroll-y class="list" @scrolltolower="loadMore(index)">
							<template v-if="items.list.length > 0">
								<!-- 话题列表 -->
								<view class="talk-list">
									<block v-for="(item, index1) in items.list" :key="index1">
										<last-new :item="item" :index="index1"></last-new>
									</block>
								</view>
								<!-- 上拉加载 -->
								<load-more :loadText="items.loadText"></load-more>
							</template>
							<!-- 无内容默认 -->
							<template v-else>								
								<no-thing></no-thing>
							</template>
						</scroll-view>
					</swiper-item>	
				</block>
			</swiper>
		</view>
	</view>
</template>

<script>
import swiperTabHead from '@/components/index/swiper-tab-head.vue'
import noThing from '@/components/common/no-thing.vue'
import loadMore from '@/components/common/load-more.vue'
import lastNew from '@/components/dynamic/last-new.vue'

export default {
	data() {
		return {
			swiperHeight: 0,
			tabIndex: 0,
			tabBars: [
				{
					id: 'new',
					name: '最新'
				},
				{
					id: 'tuijian',
					name: '推荐'
				},
				{
					id: 'daka',
					name: '打卡'
				},
				{
					id: 'feeling',
					name: '情感'
				},
				{
					id: 'story',
					name: '故事'
				},
				{
					id: 'like',
					name: '喜爱'
				}
			],
			newsList: [
				{
					loadText: "上拉加载更多...",
					list: [
						{
							titlePic: '../../static/demo/topicpic/12.jpeg',
							title: '话题名称',
							desc: '我是话题描述',
							total: 507,
							todayNum: 707
						},
						{
							titlePic: '../../static/demo/topicpic/12.jpeg',
							title: '话题名称',
							desc: '我是话题描述',
							total: 507,
							todayNum: 707
						},
						{
							titlePic: '../../static/demo/topicpic/12.jpeg',
							title: '话题名称',
							desc: '我是话题描述',
							total: 507,
							todayNum: 707
						},
						{
							titlePic: '../../static/demo/topicpic/12.jpeg',
							title: '话题名称',
							desc: '我是话题描述',
							total: 507,
							todayNum: 707
						},
						{
							titlePic: '../../static/demo/topicpic/12.jpeg',
							title: '话题名称',
							desc: '我是话题描述',
							total: 507,
							todayNum: 707
						},
						{
							titlePic: '../../static/demo/topicpic/12.jpeg',
							title: '话题名称',
							desc: '我是话题描述',
							total: 507,
							todayNum: 707
						},
						{
							titlePic: '../../static/demo/topicpic/12.jpeg',
							title: '话题名称',
							desc: '我是话题描述',
							total: 507,
							todayNum: 707
						}
					]
				},
				{
					loadText: "上拉加载更多...",
					list: [
						{
							titlePic: '../../static/demo/topicpic/12.jpeg',
							title: '话题名称',
							desc: '我是话题描述',
							total: 507,
							todayNum: 707
						}
					]
				},
				{
					loadText: "上拉加载更多...",
					list: []
				},
				{
					loadText: "上拉加载更多...",
					list: [
						{
							titlePic: '../../static/demo/topicpic/12.jpeg',
							title: '话题名称',
							desc: '我是话题描述',
							total: 507,
							todayNum: 707
						}
					]
				},
				{
					loadText: "上拉加载更多...",
					list: [
						{
							titlePic: '../../static/demo/topicpic/12.jpeg',
							title: '话题名称',
							desc: '我是话题描述',
							total: 507,
							todayNum: 707
						}
					]
				},
				{
					loadText: "上拉加载更多...",
					list: []
				}
			]
		}
	},
	components: {
		swiperTabHead,
		noThing,
		loadMore,
		lastNew
	},
	onLoad() {
		const _self = this
		uni.getSystemInfo({
			success(res) {
				let sHeight = res.windowHeight - uni.upx2px(100)
				_self.swiperHeight = sHeight
			},
			fail(e) {
				uni.showToast({
					title: '获取手机设备信息失败'
				})
			}
		})
	},
	methods: {
		fixIndex (index) {
			this.tabIndex = index
		},
		tabChange (e) {
			let sIndex = e.detail.current
			this.tabIndex = sIndex
		},
		loadMore (index) {
			if (this.newsList[index].loadText != '上拉加载更多...') return;
			// 修改状态
			this.newsList[index].loadText = '加载中...'
			// 获取数据
			setTimeout(() => {
				// 获取完成
				let obj = {
					titlePic: '../../static/demo/topicpic/11.jpeg',
					title: '话题名称',
					desc: '我是话题描述',
					total: 507,
					todayNum: 707
				}
				this.newsList[index].list.push(obj)
				this.newsList[index].loadText = '上拉加载更多...'
			}, 1000)
			// this.newsList[index].loadText = '我是有底线的'
		}
	}
}
</script>

<style lang="scss" scoped>
.talk-list {
	padding: 0 20rpx;
}
</style>
