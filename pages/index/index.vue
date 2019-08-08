<template>
	<view>
		<swiper-tab-head :tabBars="tabBars" :tabIndex="tabIndex" @fixIndex="fixIndex"></swiper-tab-head>
		
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
								<!-- 图文列表 -->
								<block v-for="(item, index1) in items.list" :key="index1">
									<index-list :item="item" :index="index" :index1="index1" @follow="follow" @operate="operate"></index-list>
								</block>
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
import indexList from '@/components/index/index-list.vue'
import swiperTabHead from '@/components/index/swiper-tab-head.vue'
import loadMore from '@/components/common/load-more.vue'
import noThing from '@/components/common/no-thing.vue'

export default {
	data() {
		return {
			swiperHeight: 0,
			tabIndex: 0,
			tabBars: [
				{
					id: 'guanzhu',
					name: '关注'
				},
				{
					id: 'tuijian',
					name: '推荐'
				},
				{
					id: 'tiyu',
					name: '体育'
				},
				{
					id: 'redian',
					name: '热点'
				},
				{
					id: 'caijing',
					name: '财经'
				},
				{
					id: 'yule',
					name: '娱乐'
				}
			],
			newsList: [
				{
					loadText: "上拉加载更多...",
					list: [
						{
							userPic: '../../static/demo/userpic/12.jpg',
							userName: '啦啦',
							isFollow: false,
							title: '我是标题',
							type: 'img', // 图片img 视频video
							titlePic: '../../static/demo/datapic/11.jpg',
							infoNum: {
								isOption: 2, // 0 没有操作 1 赞 2 踩
								smileNum: 11,
								cryNum: 2,
							},
							commentNum: 20,
							shareNum: 8
						},
						{
							userPic: '../../static/demo/userpic/12.jpg',
							userName: '啦啦',
							isFollow: true,
							title: '我是标题',
							type: 'video', // 图片img 视频video
							titlePic: '../../static/demo/datapic/11.jpg',
							playNum: "2w",
							longTime: '1:56',
							infoNum: {
								isOption: 1, // 0 没有操作 1 赞 2 踩
								smileNum: 11,
								cryNum: 2,
							},
							commentNum: 20,
							shareNum: 8
						}
					]
				},
				{
					loadText: "上拉加载更多...",
					list: [
						{
							userPic: '../../static/demo/userpic/12.jpg',
							userName: '啦啦',
							isFollow: false,
							title: '我是标题',
							type: 'img', // 图片img 视频video
							titlePic: '../../static/demo/datapic/11.jpg',
							infoNum: {
								isOption: 2, // 0 没有操作 1 赞 2 踩
								smileNum: 11,
								cryNum: 2,
							},
							commentNum: 20,
							shareNum: 8
						},
						{
							userPic: '../../static/demo/userpic/12.jpg',
							userName: '啦啦',
							isFollow: true,
							title: '我是标题',
							type: 'video', // 图片img 视频video
							titlePic: '../../static/demo/datapic/11.jpg',
							playNum: "2w",
							longTime: '1:56',
							infoNum: {
								isOption: 1, // 0 没有操作 1 赞 2 踩
								smileNum: 11,
								cryNum: 2,
							},
							commentNum: 20,
							shareNum: 8
						},
						{
							userPic: '../../static/demo/userpic/12.jpg',
							userName: '啦啦',
							isFollow: false,
							title: '我是标题',
							type: 'img', // 图片img 视频video
							titlePic: '../../static/demo/datapic/11.jpg',
							infoNum: {
								isOption: 2, // 0 没有操作 1 赞 2 踩
								smileNum: 11,
								cryNum: 2,
							},
							commentNum: 20,
							shareNum: 8
						},
						{
							userPic: '../../static/demo/userpic/12.jpg',
							userName: '啦啦',
							isFollow: true,
							title: '我是标题',
							type: 'video', // 图片img 视频video
							titlePic: '../../static/demo/datapic/11.jpg',
							playNum: "2w",
							longTime: '1:56',
							infoNum: {
								isOption: 1, // 0 没有操作 1 赞 2 踩
								smileNum: 11,
								cryNum: 2,
							},
							commentNum: 20,
							shareNum: 8
						}
					]
				},
				{
					loadText: "上拉加载更多...",
					list: [
						
					]
				},
				{
					loadText: "上拉加载更多...",
					list: [
						{
							userPic: '../../static/demo/userpic/12.jpg',
							userName: '啦啦1',
							isFollow: true,
							title: '我是标题',
							type: 'video', // 图片img 视频video
							titlePic: '../../static/demo/datapic/11.jpg',
							playNum: "2w",
							longTime: '1:56',
							infoNum: {
								isOption: 1, // 0 没有操作 1 赞 2 踩
								smileNum: 11,
								cryNum: 2,
							},
							commentNum: 20,
							shareNum: 8
						},
						{
							userPic: '../../static/demo/userpic/12.jpg',
							userName: '啦啦',
							isFollow: false,
							title: '我是标题',
							type: 'img', // 图片img 视频video
							titlePic: '../../static/demo/datapic/11.jpg',
							infoNum: {
								isOption: 2, // 0 没有操作 1 赞 2 踩
								smileNum: 11,
								cryNum: 2,
							},
							commentNum: 20,
							shareNum: 8
						}
					]
				},
				{
					loadText: "上拉加载更多...",
					list: [
						
					]
				},
				{
					loadText: "上拉加载更多...",
					list: [
						{
							userPic: '../../static/demo/userpic/12.jpg',
							userName: '啦啦',
							isFollow: false,
							title: '我是标题',
							type: 'img', // 图片img 视频video
							titlePic: '../../static/demo/datapic/11.jpg',
							infoNum: {
								isOption: 2, // 0 没有操作 1 赞 2 踩
								smileNum: 11,
								cryNum: 2,
							},
							commentNum: 20,
							shareNum: 8
						},
						{
							userPic: '../../static/demo/userpic/12.jpg',
							userName: '啦啦',
							isFollow: false,
							title: '我是标题',
							type: 'img', // 图片img 视频video
							titlePic: '../../static/demo/datapic/11.jpg',
							infoNum: {
								isOption: 2, // 0 没有操作 1 赞 2 踩
								smileNum: 11,
								cryNum: 2,
							},
							commentNum: 20,
							shareNum: 8
						}
					]
				}
			]
		}
	},
	components:{
		indexList,
		swiperTabHead,
		loadMore,
		noThing
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
	// 监听搜索框点击事件
	onNavigationBarSearchInputClicked () {
		uni.navigateTo({
			url: '../search/search'
		})
	},
	onNavigationBarButtonTap (e) {
		// console.log(JSON.stringify(e.index));
		switch (e.index){
			case 1:
				// 打开发布页面
				uni.navigateTo({
					url: '../add-input/add-input'
				})
				break;
			default:
				break;
		}
	},
	methods: {
		fixIndex (index) {
			this.tabIndex = index
		},
		tabChange (e) {
			let sIndex = e.detail.current
			this.tabIndex = sIndex
		},
		// 关注
		follow (obj) {
			// console.log(obj);
			this.newsList[obj.index].list[obj.index1].isFollow = !obj.follow
		},
		// 赞和踩
		operate (obj) {
			// console.log(obj);
			// console.log(this.newsList[obj.index].list[obj.index1].infoNum);
			switch (obj.type) {
				case 'smile':
					if (this.newsList[obj.index].list[obj.index1].infoNum.isOption == 1) return;
					this.newsList[obj.index].list[obj.index1].infoNum.smileNum ++
					if (this.newsList[obj.index].list[obj.index1].infoNum.isOption == 2) {
						this.newsList[obj.index].list[obj.index1].infoNum.cryNum --
					}
					this.newsList[obj.index].list[obj.index1].infoNum.isOption = 1
				break;
				case 'cry':
					if (this.newsList[obj.index].list[obj.index1].infoNum.isOption == 2) return;
					this.newsList[obj.index].list[obj.index1].infoNum.cryNum ++
					if (this.newsList[obj.index].list[obj.index1].infoNum.isOption == 1) {
						this.newsList[obj.index].list[obj.index1].infoNum.smileNum --
					}
					this.newsList[obj.index].list[obj.index1].infoNum.isOption = 2
				break;
			}
		},
		// 上拉加载
		loadMore (index) {
			if (this.newsList[index].loadText != '上拉加载更多...') return;
			// 修改状态
			this.newsList[index].loadText = '加载中...'
			// 获取数据
			setTimeout(() => {
				// 获取完成
				let obj = {
					userPic: '../../static/demo/userpic/12.jpg',
					userName: '啦啦',
					isFollow: false,
					title: '我是标题',
					type: 'img', // 图片img 视频video
					titlePic: '../../static/demo/datapic/11.jpg',
					infoNum: {
						isOption: 2, // 0 没有操作 1 赞 2 踩
						smileNum: 11,
						cryNum: 2,
					},
					commentNum: 20,
					shareNum: 8
				}
				this.newsList[index].list.push(obj)
				this.newsList[index].loadText = '上拉加载更多...'
			}, 1000)
			// this.newsList[index].loadText = '我是有底线的'
		}
	}
}
</script>

<style scoped lang="scss">

</style>
