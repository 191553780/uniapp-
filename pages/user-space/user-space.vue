<template>
	<view>
		<!-- 背景 + 用户基本信息 -->
		<user-space-head :userInfo="userInfo" @changeFollow="follow"></user-space-head>
		<!-- 统计 -->
		<view class="user-space-data">
			<home-data :homeData="spaceData"></home-data>
		</view>
		<view  style="height: 20rpx;background: #f4f4f4;"></view>
		<!-- tab导航 -->
		<swiper-tab-head 
			:tabBars="tabBars" 
			:tabIndex="tabIndex"
			scrollStyle="border-bottom:0;"
			scrollItemStyle="width:33.3%;"
			@fixIndex="fixIndex"
		></swiper-tab-head>
		
		<!-- 主页 -->
		<block v-for="(item,index) in tabList" :key="index">
			<template v-if="tabIndex == 0 && index == 0">
				<user-space-userinfo :userInfo="userInfo"></user-space-userinfo>
			</template>
			<template v-else-if="tabIndex == index">
				<block v-for="(list,listIndex) in item.list" :key="listIndex">
					<common-list :item="list" :index="index" :index1="listIndex"></common-list>
				</block>
				<!-- 上拉加载 -->
				<load-more :loadText="item.loadText"></load-more>
			</template>
		</block>
		<!-- 操作菜单 -->
		<user-space-popup 
			:isShow="isShow" 
			@hidePopup="hide" 
			@remarks="remarks" 
			@pullBlack="pullBlack"
		></user-space-popup>
	</view>
</template>

<script>
import userSpaceHead from '@/components/user-space/user-space-head.vue'
import homeData from '@/components/home/home-data.vue'
import swiperTabHead from '@/components/index/swiper-tab-head.vue'
import userSpaceUserinfo from '@/components/user-space/user-space-userinfo.vue'
import commonList from '@/components/common/common-list.vue'
import loadMore from '@/components/common/load-more.vue'
import userSpacePopup from '@/components/user-space/user-space-popup.vue'

export default {
	data() {
		return {
			isShow: false,
			userInfo: {
				bgImg: 1,
				userPic: '../../static/demo/userpic/20.jpg',
				userName: '昵称',
				sex: 0,
				age: 20,
				isFollow: false,
				regtime: '2018-11-11',
				id: 2333,
				birthday:'1999-09-09',
				job:'IT',
				feel: '未婚',
				path: '重庆'
			},
			spaceData: [
				{name: '获赞', num: '10k'},
				{name: '关注', num: 11},
				{name: '粉丝', num: 12}
			],
			tabIndex: 0,
			tabBars: [
				{name: '主页',id: 'home'},
				{name: '糗事',id: 'qiushi'},
				{name: '动态',id: 'dongtai'}
			],
			tabList: [
				{},
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
		userSpaceHead,
		homeData,
		swiperTabHead,
		userSpaceUserinfo,
		commonList,
		loadMore,
		userSpacePopup
	},
	onReachBottom () { // 上拉触底
		this.loadMore()
	},
	onPullDownRefresh () { // 下拉刷新
		this.getData()
	},
	// 监听导航事件
	onNavigationBarButtonTap (e) {
		// console.log(e.index);
		if (e.index == 0) {
			this.hide()
		}
	},
	computed: {},
	methods: {
		// 切换操作菜单状态
		hide () {
			this.isShow = !this.isShow
		},
		pullBlack () {
			console.log('拉黑')
			this.hide()
		},
		remarks () {
			console.log('备注')
			this.hide()
		},
		// 切换关注状态
		follow () {
			this.userInfo.isFollow = !this.userInfo.isFollow
		},
		// 切换tab选择状态
		fixIndex (index) {
			this.tabIndex = index
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

<style scoped lang="scss">
.user-space-data {
	background: #fff;
	position: relative;
	z-index: 10;
	border-top-left-radius: 20rpx;
	border-top-right-radius: 20rpx;
	margin-top: -15rpx;
}
</style>
