<template>
	<view>
		<!-- 信息 -->
		<detail-info :item="detail"></detail-info>
		<!-- 评论 -->
		<view class="u-comment-title">
			最新评论 {{comment.count}}
		</view>
		<view class="uni-comment u-comment">
			<block v-for="(item,index) in comment.list" :key="index">
				<comment-list :item="item" :index="index"></comment-list>
			</block>
		</view>
		<!-- 占位盒子 -->
		<view style="height: 120rpx;"></view>
		<!-- 输入框 -->
		<user-chat-bottom @submit="submit"></user-chat-bottom>
		<!-- 分享 -->
		<more-share :shareShow="shareShow" @toggolShow="toggolShow"></more-share>
	</view>
</template>
 
<script>
import detailInfo from '@/components/detail/detail-info.vue'
import commentList from '@/components/detail/comment-list.vue'
import userChatBottom from '@/components/user-chat/user-chat-bottom.vue'
import moreShare from '@/components/common/more-share.vue'
import time from '@/common/time.js'

export default {
	data() {
		return {
			shareShow: false,
			detail: {
				userPic: '../../static/demo/userpic/12.jpg',
				userName: '啦啦啦',
				sex: 1, // 0 男 1 女
				age: 25,
				isFollow: false,
				title: '如果声音有形状，你的会是什么样',
				titlePic: '../../static/demo/datapic/1.jpg',
				morePic: [
					'../../static/demo/datapic/1.jpg',
					'../../static/demo/datapic/2.jpg',
					'../../static/demo/datapic/20.jpg'
				],
				video: false,
				share: false,
				path: '重庆 渝中',
				shareNum: 50,
				commenNum: 20,
				goodNum: 101
			},
			comment: {
				count: 20,
				list: []
			}
		}
	},
	onLoad(e) {
		this.initData(JSON.parse(e.detailData))
		this.getComment()
	},
	// 监听导航右边按钮
	onNavigationBarButtonTap(e) {
		if (e.index == 0) {
			this.toggolShow();
		}
	},
	components: {
		detailInfo,
		commentList,
		userChatBottom,
		moreShare
	},
	methods: {
		// 获取评论
		getComment () {
			let arr = [
				//  一级评论
				{
					id: 1,
					level: 0,
					userPic: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png',
					userName: '小麦',
					time: 1565232538,
					data: '支持国产，支持DCloud!'
				},
				// 子评论
				{
					id:2,
					level: 1,
					userPic: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png',
					userName: '小麦',
					time: 1565232538,
					data: '支持国产，支持DCloud!'
				},
				{
					id:3,
					level: 1,
					userPic: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png',
					userName: '小麦',
					time: 1565232538,
					data: '支持国产，支持DCloud!'
				},
				{
					id: 4,
					level: 0,
					userPic: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png',
					userName: '小麦',
					time: 1565233538,
					data: '支持国产，支持DCloud!'
				}
			]
			
			for (let i = 0; i < arr.length; i++) {
				arr[i].time = time.gettime.gettime(arr[i].time)
			}
			this.comment.list = arr
		},
		// 初始化数据
		initData (obj) {
			console.log(obj);
			// 修改窗口标题
			uni.setNavigationBarTitle({ title: obj.title })
		},
		submit (data) {
			console.log(data);
			let obj = {
				id: 1,
				level: 0,
				userPic: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png',
				userName: '小麦',
				time: time.gettime.gettime(new Date().getTime()),
				data: data
			}
			
			this.comment.list.push(obj)
		},
		toggolShow () {
			this.shareShow = !this.shareShow
		}
	}
}
</script>

<style lang="scss" scoped>
.u-comment-title {
	padding: 20rpx;
	font-size: 30rpx;
	font-weight: bold;
}
.u-comment {
	padding: 0 20rpx;
}

</style>
