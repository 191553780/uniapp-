<template>
	<view>
		<talk-info :item="talkInfo"></talk-info>
		<!-- tab切换 -->
		<swiper-tab-head 
			:tabBars="tabBars" 
			:tabIndex="tabIndex"
			scrollStyle="border-bottom:0;"
			scrollItemStyle="width:50%;"
			@fixIndex="fixIndex"
		></swiper-tab-head>
		<!-- 列表 -->
		<view class="detail-list">
			<block v-for="(item,index) in tabList" :key="index">
				<template v-if="tabIndex == index">
					<block v-for="(list,listIndex) in item.list" :key="listIndex">
						<common-list :item="list" :index="index" :index1="listIndex"></common-list>
					</block>
					<!-- 上拉加载 -->
					<load-more :loadText="item.loadText"></load-more>
				</template>
			</block>
		</view>
	</view>
</template>

<script>
import talkInfo from '@/components/talk-info/talk-info.vue'
import swiperTabHead from '@/components/index/swiper-tab-head.vue'
import commonList from '@/components/common/common-list.vue'
import loadMore from '@/components/common/load-more.vue'

export default {
	data() {
		return {
			talkInfo: {
				titlePic: '../../static/demo/topicpic/13.jpeg',
				title: '忆往事，敬余生',
				desc: '我是描述',
				totalNum: '1000',
				todayNum: '1000'
			},
			tabIndex: 0,
			tabBars: [
				{name: '默认',id: 'default'},
				{name: '最新',id: 'new'}
			],
			tabList: [
				{
					loadText: "上拉加载更多...",
					list: [
							// 文字
							{
								userPic: '../../static/demo/userpic/12.jpg',
								userName: '啦啦啦',
								sex: 0, // 0 男 1 女
								age: 25,
								isFollow: false,
								title: '如果声音有形状，你的会是什么样',
								titlePic: '',
								video: false,
								share: false,
								path: '重庆 渝中',
								shareNum: 50,
								commenNum: 20,
								goodNum: 101
							},
							// 图文
							{
								userPic: '../../static/demo/userpic/12.jpg',
								userName: '啦啦啦',
								sex: 1, // 0 男 1 女
								age: 25,
								isFollow: false,
								title: '如果声音有形状，你的会是什么样',
								titlePic: '../../static/demo/datapic/1.jpg',
								video: false,
								share: false,
								path: '重庆 渝中',
								shareNum: 50,
								commenNum: 20,
								goodNum: 101
							},
							// 视频
							{
								userPic: '../../static/demo/userpic/12.jpg',
								userName: '啦啦啦',
								sex: 1, // 0 男 1 女
								age: 25,
								isFollow: false,
								title: '如果声音有形状，你的会是什么样',
								titlePic: '../../static/demo/datapic/1.jpg',
								video: {
									lookNum: '2w',
									loog: '1:28'
								},
								share: false,
								path: '重庆 渝中',
								shareNum: 50,
								commenNum: 20,
								goodNum: 101
							},
							// 分享
							{
								userPic: '../../static/demo/userpic/12.jpg',
								userName: '啦啦啦',
								sex: 0, // 0 男 1 女
								age: 25,
								isFollow: false,
								title: '如果声音有形状，你的会是什么样',
								titlePic: '',
								video: false,
								share: {
									title: '我是分享的标题',
									titlePic: '../../static/demo/datapic/16.jpg'
								},
								path: '重庆 渝中',
								shareNum: 50,
								commenNum: 20,
								goodNum: 101
							}
						
					]
				},
				{
					loadText: "上拉加载更多...",
					list: [
							// 文字
							{
								userPic: '../../static/demo/userpic/12.jpg',
								userName: '哈哈哈',
								sex: 0, // 0 男 1 女
								age: 25,
								isFollow: false,
								title: '如果声音有形状，你的会是什么样',
								titlePic: '',
								video: false,
								share: false,
								path: '重庆 渝中',
								shareNum: 50,
								commenNum: 20,
								goodNum: 101
							},
							// 图文
							{
								userPic: '../../static/demo/userpic/12.jpg',
								userName: '啦啦啦',
								sex: 1, // 0 男 1 女
								age: 25,
								isFollow: false,
								title: '如果声音有形状，你的会是什么样',
								titlePic: '../../static/demo/datapic/1.jpg',
								video: false,
								share: false,
								path: '重庆 渝中',
								shareNum: 50,
								commenNum: 20,
								goodNum: 101
							},
							// 视频
							{
								userPic: '../../static/demo/userpic/12.jpg',
								userName: '啦啦啦',
								sex: 1, // 0 男 1 女
								age: 25,
								isFollow: false,
								title: '如果声音有形状，你的会是什么样',
								titlePic: '../../static/demo/datapic/1.jpg',
								video: {
									lookNum: '2w',
									loog: '1:28'
								},
								share: false,
								path: '重庆 渝中',
								shareNum: 50,
								commenNum: 20,
								goodNum: 101
							},
							// 分享
							{
								userPic: '../../static/demo/userpic/12.jpg',
								userName: '啦啦啦',
								sex: 0, // 0 男 1 女
								age: 25,
								isFollow: false,
								title: '如果声音有形状，你的会是什么样',
								titlePic: '',
								video: false,
								share: {
									title: '我是分享的标题',
									titlePic: '../../static/demo/datapic/16.jpg'
								},
								path: '重庆 渝中',
								shareNum: 50,
								commenNum: 20,
								goodNum: 101
							}
						
					]
				}
			]
		}
	},
	components: {
		talkInfo,
		swiperTabHead,
		commonList,
		loadMore
	},
	onReachBottom () { // 上拉触底
		this.loadMore()
	},
	onPullDownRefresh () { // 下拉刷新
		this.getData()
	},
	methods: {
		fixIndex (index) {
			this.tabIndex = index
		},
		tabChange (e) {
			let sIndex = e.detail.current
			this.tabIndex = sIndex
		},
		// 上拉加载
		loadMore () {
			if (this.tabList[this.tabIndex].loadText != '上拉加载更多...') return;
			// 修改状态
			this.tabList[this.tabIndex].loadText = '加载中...'
			// 获取数据
			setTimeout(() => {
				// 获取完成
				let obj = {
					userPic: '../../static/demo/userpic/12.jpg',
					userName: '啦啦啦',
					sex: 1, // 0 男 1 女
					age: 25,
					isFollow: false,
					title: '如果声音有形状，你的会是什么样',
					titlePic: '../../static/demo/datapic/1.jpg',
					video: false,
					share: false,
					path: '重庆 渝中',
					shareNum: 50,
					commenNum: 20,
					goodNum: 101
				}
				this.tabList[this.tabIndex].list.push(obj)
				this.tabList[this.tabIndex].loadText = '上拉加载更多...'
			}, 1000)
			// this.tabList[this.tabIndex].loadText = '我是有底线的'
		},
		// 下拉刷新
		getData () {
			// 关闭下拉刷新
			setTimeout(() => {
				// 获取数据
				let arr = [
							// 文字
							{
								userPic: '../../static/demo/userpic/11.jpg',
								userName: '啦啦啦',
								sex: 0, // 0 男 1 女
								age: 25,
								isFollow: false,
								title: '如果声音有形状，你的会是什么样',
								titlePic: '',
								video: false,
								share: false,
								path: '重庆 渝中',
								shareNum: 50,
								commenNum: 20,
								goodNum: 101
							},
							// 图文
							{
								userPic: '../../static/demo/userpic/12.jpg',
								userName: 'hahaa',
								sex: 1, // 0 男 1 女
								age: 25,
								isFollow: false,
								title: '如果声音有形状，你的会是什么样',
								titlePic: '../../static/demo/datapic/1.jpg',
								video: false,
								share: false,
								path: '重庆 渝中',
								shareNum: 50,
								commenNum: 20,
								goodNum: 101
							},
							// 视频
							{
								userPic: '../../static/demo/userpic/15.jpg',
								userName: '啦啦啦',
								sex: 1, // 0 男 1 女
								age: 25,
								isFollow: false,
								title: '如果声音有形状，你的会是什么样',
								titlePic: '../../static/demo/datapic/1.jpg',
								video: {
									lookNum: '2w',
									loog: '1:28'
								},
								share: false,
								path: '重庆 渝中',
								shareNum: 50,
								commenNum: 20,
								goodNum: 101
							},
							// 分享
							{
								userPic: '../../static/demo/userpic/10.jpg',
								userName: '啦啦啦',
								sex: 1, // 0 男 1 女
								age: 25,
								isFollow: false,
								title: '如果声音有形状，你的会是什么样',
								titlePic: '',
								video: false,
								share: {
									title: '我是分享的标题',
									titlePic: '../../static/demo/datapic/16.jpg'
								},
								path: '重庆 渝中',
								shareNum: 50,
								commenNum: 20,
								goodNum: 101
							}
					]
				// 赋值
				this.tabList[this.tabIndex].list = arr
				uni.stopPullDownRefresh()
			},2000)
		}
	}
}
</script>

<style lang="scss" scoped>

</style>
