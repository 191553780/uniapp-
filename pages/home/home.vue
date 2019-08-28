<template>
	<view>
		<template v-if="!loginStatus">
			<!-- 未登录 -->
			<view class="flex flex-item flex-JustCenter">登录，体验更多功能</view>
			<!-- 第三方 -->
			<other-login :noback="true" @logining="isLogin()"></other-login>
			<!-- 账号密码登录 -->
			<view class="flex flex-item flex-JustCenter" @tap="openLogin">
				账号密码登录
				<view class="icon iconfont icon-jinru"></view>
			</view>
		</template>
		<!-- 登录 -->
		<template v-else>
			<home-info :homeInfo="homeInfo"></home-info>
		</template>
		<!-- 数据 -->
		<home-data :homeData="homeData"></home-data>
		<!-- 广告位 -->
		<view class="home-adv flex flex-item flex-JustCenter">
			<image src="../../static/demo/demo20.jpg" mode="widthFix" lazy-load></image>
		</view>
		<!-- 功能列表 -->
		<view class="home-list">
			<block v-for="(item,index) in list" :key="index">
				<home-list-item :item="item" :index="index"></home-list-item>
			</block>
		</view>
	</view>
</template>

<script>
import homeListItem from '@/components/home/home-list-item.vue'
import homeInfo from '@/components/home/home-info.vue'
import otherLogin from '@/components/home/other-login.vue'
import homeData from '@/components/home/home-data.vue'

export default {
	data() {
		return {
			loginStatus: false,
			homeInfo: {
				userpic:"",
				username:"",
				totalnum:0,
				todaynum:0,
			},
			homeData: [
				{name: '糗事', num: 0},
				{name: '动态', num: 0},
				{name: '评论', num: 0},
				{name: '收藏', num: 0}
			],
			list: [
				{
					name: '浏览历史',
					icon: 'liulan',
					clickType: '',
					url: ''
				},
				{
					name: '糗百认证',
					icon: 'huiyuan',
					clickType: '',
					url: ''
				},
				{
					name: '审核糗事',
					icon: 'icon_im_keyboard',
					clickType: '',
					url: ''
				}
			]
		}
	},
	components: {
		homeListItem,
		homeInfo,
		otherLogin,
		homeData
	},
	onShow() {
		this.isLogin();
	},
	onNavigationBarButtonTap(e) {
		if (e.index == 0) {
			this.User.navigate({
				url:'../user-set/user-set'
			})
		}
	},
	methods: {
		// 判断用户是否登录
		isLogin(){
			if (!this.User.token){
				this.loginStatus = false;
				this.homeInfo={
					userpic:"",
					username:"",
					totalnum:0,
					todaynum:0,
				};
				this.homeData[0].num = 0;
				this.homeData[1].num = 0;
				this.homeData[2].num = 0;
				this.homeData[3].num = 0;
				return;
			}
			// 用户已登录
			this.homeInfo.id = this.User.userinfo.id;
			this.homeInfo.userpic = this.User.userinfo.userpic;
			this.homeInfo.username = this.User.userinfo.username;
			this.homeInfo.totalnum = this.User.counts.post_count || 0;
			this.homeInfo.todaynum = this.User.counts.today_posts_count || 0;
			this.homeData[0].num = this.User.counts.post_count || 0;
			this.homeData[1].num = this.User.counts.post_count || 0;
			this.homeData[2].num = this.User.counts.comments_count || 0;
			this.homeData[3].num = this.User.counts.withfen_count || 0;
			this.loginStatus = true;
		},
		openLogin () {
			uni.navigateTo({
				url: '../login/login'
			})
		}
	}
}
</script>

<style scoped lang="scss">
.home-adv {
	padding: 20rpx;
	image {
		width: 100%;
		border-radius: 20rpx;
		height: 150rpx;
	}
}
.home-list {
	padding: 20rpx;
}
</style>
