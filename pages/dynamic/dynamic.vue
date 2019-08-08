<template>
	<view>
		<!-- 自定义导航栏 -->
		<dynamic-nav-bar 
			:tabBars="tabBars" 
			:tabIndex="tabIndex" 
			@chang-tab="changeIndex"
		>
		</dynamic-nav-bar>
		
		<view class="uni-tab-bar">
			<swiper 
				class="swiper-box" 
				:style="{height: swiperHeight +'px'}" 
				:current="tabIndex"
				@change="tabChange"
			>
				<!-- 关注 -->
				<swiper-item>
					<scroll-view scroll-y class="list" @scrolltolower="loadMore">
						<!-- 列表 -->
						<block v-for="(item,index) in guanzhu.list" :key="index">
							<common-list :item="item" :index="index" @fixFollow="fixFollow"></common-list>
						</block>
						<!-- 上拉加载 -->
						<load-more :loadText="guanzhu.loadText"></load-more>
					</scroll-view>
				</swiper-item>
				<!-- 话题 -->
				<swiper-item>
					<scroll-view scroll-y class="list">
						<!-- 搜索框 -->
						<view class="talk-search">
							<input class="uni-input" value="" 
								placeholder-class="icon iconfont icon-sousuo pic-search" 
								placeholder="搜索内容" 
							/>
						</view>
						<!-- 轮播图 -->
						<view class="carousel">
							<swiper class="car-swiper" :indicator-dots="true" :autoplay="false" :interval="3000" :duration="1000">
								<block v-for="(item,index) in talk.swiper" :key="index">
									<swiper-item>
										<image :src="item.src" mode=""></image>
									</swiper-item>
								</block>
							</swiper>
						</view>
						<!-- 热门分类 -->
						<hot-type :hotItems="talk.hotType"></hot-type>
						<!-- 最近更新 -->
						<view class="last-update">
							<view class="update-title">最近更新</view>
							<view class="update-list">
								<block v-for="(item,index) in talk.list" :key="index">
									<last-new :item="item" :index="index"></last-new>
								</block>
							</view>
						</view>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
import commonList from '@/components/common/common-list.vue'
import dynamicNavBar from '@/components/dynamic/dynamic-nav-bar.vue'
import loadMore from '@/components/common/load-more.vue'
import hotType from '@/components/dynamic/hot-type.vue'
import lastNew from '@/components/dynamic/last-new.vue'

export default {
	data() {
		return {
			swiperHeight: 0,
			tabIndex: 0,
			tabBars: [
				{name:'关注',id:'guanzhu'},
				{name:'话题',id:'huati'}
			],
			guanzhu: {
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
				],
			},
			talk: {
				swiper:[
					{
						src: '../../static/demo/banner1.jpg',
					},
					{
						src: '../../static/demo/banner2.jpg',
					},
					{
						src: '../../static/demo/banner3.jpg',
					}
				],
				hotType: [
					{name: '最新'},
					{name: '游戏'},
					{name: '打卡'},
					{name: '情感'},
					{name: '故事'},
					{name: '喜爱'}
				],
				list: [
					{
						titlePic: '../../static/demo/topicpic/12.jpeg',
						title: '话题名称',
						desc: '我是话题描述',
						total: 545,
						todayNum: 720
					},
					{
						titlePic: '../../static/demo/topicpic/12.jpeg',
						title: '话题名称',
						desc: '我是话题描述',
						total: 577,
						todayNum: 821
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
			}
		}
	},
	components: {
		commonList,
		dynamicNavBar,
		loadMore,
		hotType,
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
		fixFollow (obj) {
			// console.log(obj)
			this.list[obj.index].isFollow = !obj.follow 
			uni.showToast({
				title: '关注成功'
			})
		},
		// 点击切换
		changeIndex (index) {
			this.tabIndex = index
		},
		// 滑动切换
		tabChange (e) {
			let sIndex = e.detail.current
			this.tabIndex = sIndex
		},
		// 上拉加载
		loadMore () {
			if (this.guanzhu.loadText != '上拉加载更多...') return;
			// 修改状态
			this.guanzhu.loadText = '加载中...'
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
				this.guanzhu.list.push(obj)
				this.guanzhu.loadText = '上拉加载更多...'
			}, 1000)
			// this.guanzhu.loadText = '我是有底线的'
		}
	}
}
</script>

<style scoped lang="scss">
.talk-search {
	padding: 20rpx;
	.pic-search {
		display: flex;
		justify-content: center;
		font-size: 27rpx;
	}
	input {
		background: #f4f4f4;
		border-radius: 10rpx;
	}
}
.carousel {
	.car-swiper {
		padding: 0 20rpx 20upx;
		
		image {
			border-radius: 10rpx;
			width: 100%;
			height: 100%;
		}
	}
}
.last-update {
	padding: 20rpx;
	
	.update-title {
		font-size: 32rpx;
		padding-bottom: 5rpx;
	}
	.update-list {
		
	}
}
</style>
