<template>
	<view>
		<template v-if="list.length > 0">
			<block v-for="(item,index) in list">
				<index-list :item="item" :index1="index"></index-list>
			</block>
			<load-more :loadText="loadText"></load-more>
		</template>
		<template v-else-if="isSearch && list.length < 1">
			<no-thing></no-thing>
		</template>
	</view>
</template>

<script>
import indexList from '@/components/index/index-list.vue'
import noThing from '@/components/common/no-thing.vue'
import loadMore from '@/components/common/load-more.vue'

export default {
	data() {
		return {
			isSearch: false,
			searchText: '',
			loadText: "上拉加载更多...",
			list: []
		};
	},
	// 监听原生标题导航按钮点击事件
	onNavigationBarButtonTap (e) {
		console.log(JSON.stringify(e.index));
		if (e.index === 0) {
			uni.navigateBack({
				delta: 1
			})
		}
	},
	// 监听搜索框文本变化
	onNavigationBarSearchInputChanged (e) {
		// console.log('文本',JSON.stringify(e));
		this.searchText = e.text
	},
	// 监听键盘点击搜索按钮事件
	onNavigationBarSearchInputConfirmed (e) {
		// console.log('键盘',JSON.stringify(e));
		this.searchText = e.text
		if (e.text) {
			this.getData()
		}
	},
	// 监听页面触底事件
	onReachBottom() {
		this.loadMore()
	},
	// 监听下拉刷新
	onPullDownRefresh() {
		this.getData()
		uni.stopPullDownRefresh()
	},
	components: {
		indexList,
		noThing,
		loadMore
	},
	methods: {
		//  上拉加载
		loadMore () {
			if (this.loadText != '上拉加载更多...') return;
			// 修改状态
			this.loadText = '加载中...'
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
				this.list.push(obj)
				this.loadText = '上拉加载更多...'
			}, 1000)
			// this.loadText = '我是有底线的'
		},
		// 搜索事件
		getData () {
			// 请求服务器 post keyword: val this.searchText
			uni.showLoading()
			setTimeout(() => {
				let arr = [
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
				this.list = arr;
				uni.hideLoading()
				this.isSearch = true
			},2000)
		}
	}
}
</script>

<style lang="scss" scoped>

</style>
