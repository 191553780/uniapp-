<template>
	<view class="notes-body">
		<!-- 操作菜单 -->
		<notesPopup 
			:isShow="isShow" 
			@hide="hidePopup" 
			@addFriend="addFriend" 
			@clear="clear"
		></notesPopup>
		<!-- 小纸条列表 -->
		<block v-for="(item,index) in list" :key="index">
			<notes-list :item="item" :index="index"></notes-list>
		</block>
		<!-- 上拉加载 -->
		<load-more :loadText="loadText"></load-more>
	</view>
</template>

<script>
import notesList from '@/components/notes/notes-list.vue'
import loadMore from '@/components/common/load-more.vue'
import notesPopup from '@/components/notes/notes-popup.vue'

export default {
	data() {
		return {
			isShow: false,
			loadText: "上拉加载更多...",
			list: [
				{
					userPic: '../../static/demo/userpic/20.jpg',
					userName: '昵称',
					time: '10:21',
					data: '我是信息',
					noreadNum: 1
				},
				{
					userPic: '../../static/demo/userpic/20.jpg',
					userName: '昵称',
					time: '10:21',
					data: '我是信息',
					noreadNum: 3
				},
				{
					userPic: '../../static/demo/userpic/20.jpg',
					userName: '昵称',
					time: '10:21',
					data: '我是信息',
					noreadNum: 0
				},
				{
					userPic: '../../static/demo/userpic/20.jpg',
					userName: '昵称',
					time: '10:21',
					data: '我是信息',
					noreadNum: 1
				},
				{
					userPic: '../../static/demo/userpic/20.jpg',
					userName: '昵称',
					time: '10:21',
					data: '我是信息',
					noreadNum: 3
				},
				{
					userPic: '../../static/demo/userpic/20.jpg',
					userName: '昵称',
					time: '10:21',
					data: '我是信息',
					noreadNum: 0
				},
				{
					userPic: '../../static/demo/userpic/20.jpg',
					userName: '昵称',
					time: '10:21',
					data: '我是信息',
					noreadNum: 1
				},
				{
					userPic: '../../static/demo/userpic/20.jpg',
					userName: '昵称',
					time: '10:21',
					data: '我是信息',
					noreadNum: 3
				},
				{
					userPic: '../../static/demo/userpic/20.jpg',
					userName: '昵称',
					time: '10:21',
					data: '我是信息',
					noreadNum: 0
				}
			]
		}
	},
	components: {
		notesList,
		loadMore,
		notesPopup
	},
	//  监听下拉刷新
	onPullDownRefresh () {
		this.getData()
	},
	onReachBottom () {
		this.loadMore()
	},
	// 监听导航事件
	onNavigationBarButtonTap (e) {
		// console.log(e.index);
		if (e.index == 0) {
			this.isShow = false
			uni.navigateTo({
				url: '../user-list/user-list'
			})
		}
		if (e.index == 1) {
			this.hidePopup()
		}
	},
	methods: {
		// 获取数据
		getData () {
			// 获取数据
			setTimeout(() => {
				let arr = [
						{
							userPic: '../../static/demo/userpic/20.jpg',
							userName: '哈哈哈',
							time: '10:21',
							data: '我是信息',
							noreadNum: 3
						},
						{
							userPic: '../../static/demo/userpic/20.jpg',
							userName: '啦啦啦',
							time: '10:21',
							data: '我是信息',
							noreadNum: 0
						},
						{
							userPic: '../../static/demo/userpic/20.jpg',
							userName: '萌萌萌',
							time: '10:21',
							data: '我是信息',
							noreadNum: 11
						}
				]
				// 赋值
				this.list = arr
				// 关闭下拉刷新
				uni.stopPullDownRefresh()
			},2000)
		},
		// 上拉加载
		loadMore () {
			if (this.loadText != '上拉加载更多...') return;
			// 修改状态
			this.loadText = '加载中...'
			// 获取数据
			setTimeout(() => {
				// 获取完成
				let obj = {
					userPic: '../../static/demo/userpic/20.jpg',
					userName: '昵称',
					time: '10:21',
					data: '我是信息',
					noreadNum: 1
				}
				this.list.push(obj)
				this.loadText = '上拉加载更多...'
			}, 1000)
			// this.loadText = '我是有底线的'
		},
		addFriend () {
			console.log('添加');
			this.hidePopup ()
		},
		clear () {
			console.log('清除');
			this.hidePopup ()
		},
		hidePopup () {
			this.isShow = !this.isShow
		}
	}
}
</script>

<style lang="scss" scoped>
.notes-body {
	padding: 0 20rpx;
	position: relative;
}
</style>
