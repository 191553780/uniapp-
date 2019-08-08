<template>
	<view>
		<!-- tabBar -->
		<swiper-tab-head 
			:tabBars="tabBars" 
			:tabIndex="tabIndex"
			scrollStyle="border-bottom:0;"
			scrollItemStyle="width:33.3%;"
			@fixIndex="fixIndex"
		></swiper-tab-head>
		
		<!-- 好友列表 -->
		<!-- 
			<block v-for="(item,index) in list" :key="index">
				<user-list :index="index" :item="item"></user-list>
			</block>
		</view> -->
		<view class="user-list">
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
										<user-list :item="item" :index="index1"></user-list>
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
	</view>
</template>

<script>
import swiperTabHead from '@/components/index/swiper-tab-head.vue'
import userList from '@/components/user-list/user-list.vue'
import loadMore from '@/components/common/load-more.vue'
import noThing from '@/components/common/no-thing.vue'

export default {
	data() {
		return {
			swiperHeight: 0,
			tabIndex: 0,
			tabBars: [
				{name: '互关',id: 'huguan',num: 10},
				{name: '关注',id: 'guanzhu',num: 11},
				{name: '粉丝',id: 'fensi',num: 20}
			],
			newsList:[
				{
					loadText: '上拉加载更多...',
					list: [
						{
							userPic: '../../static/demo/userpic/15.jpg',
							userName: '昵称',
							age: 20,
							sex: 1,
							isFollow: true
						},
						{
							userPic: '../../static/demo/userpic/15.jpg',
							userName: '昵称',
							age: 21,
							sex: 0,
							isFollow: false
						}
					]
				},
				{
					loadText: '上拉加载更多...',
					list: [
						{
							userPic: '../../static/demo/userpic/15.jpg',
							userName: '昵称',
							age: 20,
							sex: 1,
							isFollow: true
						},
						{
							userPic: '../../static/demo/userpic/15.jpg',
							userName: '昵称',
							age: 21,
							sex: 0,
							isFollow: true
						},
						{
							userPic: '../../static/demo/userpic/15.jpg',
							userName: '昵称',
							age: 20,
							sex: 1,
							isFollow: true
						},
						{
							userPic: '../../static/demo/userpic/15.jpg',
							userName: '昵称',
							age: 20,
							sex: 1,
							isFollow: true
						},
						{
							userPic: '../../static/demo/userpic/15.jpg',
							userName: '昵称',
							age: 20,
							sex: 1,
							isFollow: true
						},
						{
							userPic: '../../static/demo/userpic/15.jpg',
							userName: '昵称',
							age: 20,
							sex: 1,
							isFollow: true
						},
						{
							userPic: '../../static/demo/userpic/15.jpg',
							userName: '昵称',
							age: 20,
							sex: 1,
							isFollow: true
						},
						{
							userPic: '../../static/demo/userpic/15.jpg',
							userName: '昵称',
							age: 20,
							sex: 1,
							isFollow: true
						}
					]
				},
				{
					loadText: '上拉加载更多...',
					list: [
						{
							userPic: '../../static/demo/userpic/15.jpg',
							userName: '昵称',
							age: 20,
							sex: 1,
							isFollow: true
						},
						{
							userPic: '../../static/demo/userpic/15.jpg',
							userName: '昵称',
							age: 21,
							sex: 0,
							isFollow: false
						}
					]
				}
			]
		}
	},
	onNavigationBarButtonTap(e) {
		// console.log(e.index);
		if (e.index == 0) {
			uni.navigateBack({
				delta: 1
			})
		}
	},
	components: {
		swiperTabHead,
		userList,
		loadMore,
		noThing
	},
	onNavigationBarSearchInputChanged() {
		
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
		// 上拉加载
		loadMore (index) {
			if (this.newsList[index].loadText != '上拉加载更多...') return;
			// 修改状态
			this.newsList[index].loadText = '加载中...'
			// 获取数据
			setTimeout(() => {
				// 获取完成
				let obj = {
					userPic: '../../static/demo/userpic/15.jpg',
					userName: '昵称',
					age: 20,
					sex: 1,
					isFollow: true
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
.user-list {
	
}
</style>
