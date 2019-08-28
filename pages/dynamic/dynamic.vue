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
							<common-list :item="item" :index="index" @changeEvent="updateData"></common-list>
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
								placeholder="搜索话题" 
								disabled
								@tap="openSearch"
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
				firstload:false,
				loadText:"上拉加载更多",
				page:1,
				list:[]
			},
			talk: {
				swiper:[],
				hotType: [],
				list: []
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
			}
		})
		this.__init();
	},
	onShow() {
		this.getFollowPostList();
	},
	methods: {
		// 初始化方法
		__init () {
			this.getSwiper();
			this.getNav();
			this.getHot();
			// 开启监听
			uni.$on('updateData',this.updateData);
		},
		// 打开搜索页
		openSearch(){
			uni.navigateTo({
				url: '../search/search?searchType=topic'
			});
		},
		// 获取动态列表
		async getFollowPostList(){
			let url = `/followpost/${this.guanzhu.page}`;
			let [err,res] = await this.$http.get(url,{},{
				token:true
			}); 
			if (!this.$http.errorCheck(err,res)) {
				this.guanzhu.firstload = true;
				return this.guanzhu.loadText="上拉加载更多";
			}
			let arr = [];
			// console.log(res)
			let list = res.data.data.list;
			for (let i = 0; i < list.length; i++) {
				arr.push(this.__format(list[i]));
			}
			this.guanzhu.list = this.guanzhu.page > 1 
								? this.guanzhu.list.concat(arr) : arr;
			this.guanzhu.firstload = true;
			this.guanzhu.loadText=list.length < 10 ? "我是有底线的..." : "上拉加载更多";
			return;
		},
		__format(item){
			let obj = {
				userid:item.user.id,
				userpic:item.user.userpic,
				username:item.user.username,
				isguanzhu:!!item.user.fens.length,
				id:item.id,
				title:item.title,
				type:"img", // img:图文,video:视频
				titlepic:item.titlepic,
				video:false,
				path:item.path,
				share:!!item.share,
				infonum:{
					index:(item.support.length>0) ? (item.support[0].type+1) : 0,//0:没有操作，1:顶,2:踩；
					dingnum:item.ding_count,
					cainum:item.cai_count,
				},
				sex:item.user.userinfo.sex,
				age:item.user.userinfo.age,
				goodnum:item.ding_count,
				commentnum:item.comment_count,
				sharenum:item.sharenum,
			};
			if (item.user_id === this.User.userinfo.id) {
				obj.isguanzhu = true;
			}
			return obj;
		},
		// 获取广告
		async getSwiper(){
			let [err,res] = await this.$http.get('/adsense/0');
			if (!this.$http.errorCheck(err,res)) return;
			// console.log(res);
			
			let arr = [];
			let list = res.data.data.list;
			for (let i = 0; i < list.length; i++) {
				arr.push({
					src:list[i].src,
					url:list[i].url
				})
			}
			this.talk.swiper = arr;
		},
		// 获取热门分类
		async getNav(){
			let [err,res] = await this.$http.get('/topicclass');
			if (!this.$http.errorCheck(err,res)) return;
			// console.log(res);
			
			let arr = [];
			let list = res.data.data.list;
			for (let i = 0; i < list.length; i++) {
				arr.push({
					id:list[i].id,
					name:list[i].classname
				})
			}
			this.talk.hotType = arr;
		},
		// 获取热门话题
		async getHot(){
			let [err,res] = await this.$http.get('/hottopic');
			if (!this.$http.errorCheck(err,res)) return;
			// console.log(res);
			
			let arr = [];
			let list = res.data.data.list;
			for (let i = 0; i < list.length; i++) {
				arr.push({
					id:list[i].id,
					titlepic:list[i].titlepic,
					title:list[i].title,
					desc:list[i].desc,
					totalnum:list[i].post_count,
					todaynum:list[i].todaypost_count,
				})
			}
			this.talk.list = arr;
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
			// 修改状态
			this.guanzhu.loadText="加载中...";
			this.guanzhu.page++;
			this.getFollowPostList();
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
