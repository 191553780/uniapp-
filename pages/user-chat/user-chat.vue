<template>
	<view>
		<!-- 聊天列表 -->
		<scroll-view 
			id="scroll-view"
			scroll-y 
			:scroll-top="scrollTop" 
			:scroll-with-animation="true"
			:style="{height: style.contentHeight + 'px'}"
		>
			<block v-for="(item,index) in list" :key="index">
				<view class="user-chat-item">
					<user-chat-list ref="userChatList" :item="item" :index="index"></user-chat-list>
				</view>
			</block>
		</scroll-view>
		<!-- 输入框 -->
		<user-chat-bottom @submit="submit"></user-chat-bottom>
	</view>
</template>

<script>
import userChatBottom from '@/components/user-chat/user-chat-bottom.vue'
import userChatList from '@/components/user-chat/user-chat-list.vue'
import time from '@/common/time.js'

export default {
	data() {
		return {
			scrollTop: 0,
			style: {
				contentHeight: 0,
				itemHeight: 0
			},
			childElements: [],
			list: [],
		};
	},
	components: {
		userChatBottom,
		userChatList
	},
	onLoad () {
		this.getData()
		this.initData()
	},
	mounted() {
		this.pageToBottom()
	},
	methods: {
		// 初始化参数
		initData () {
			try {
				const res = uni.getSystemInfoSync();
				this.style.contentHeight = res.windowHeight - uni.upx2px(120)
			} catch (e) {}
		},
		pageToBottom () {
			// console.log(this.$refs);
			let q = uni.createSelectorQuery()
			q.select('#scroll-view').boundingClientRect()
			q.selectAll('.user-chat-item').boundingClientRect()
			q.exec((res) => {
				res[1].forEach((item) => {
					this.style.itemHeight += item.height
				})
				
				if (this.style.itemHeight > this.style.contentHeight) {
					this.scrollTop = this.style.itemHeight
				}
			})
		},
		// 获取聊天数据
		getData () {
			let arr = [
				{
					isMe: false,
					userpic: '../../static/demo/userpic/19.jpg',
					type: 'text',
					data: '啦啦啦',
					time: 1565161994
				},
				{
					isMe: true,
					userpic: '../../static/demo/userpic/20.jpg',
					type: 'img',
					data: '../../static/demo/datapic/29.jpg',
					time: 1565162000
				}
			]
			
			for(let i=0,len = arr.length;i<len;i++){
				arr[i].gstime = time.gettime.getChatTime(arr[i].time,i>0 ? arr[i-1].time : 0)
			}
			this.list = arr
		},
		submit (text) {
			// 构建数据
			let now = new Date().getTime()
			let obj = {
				isMe: true,
				userpic: '../../static/demo/userpic/19.jpg',
				type: 'text',
				data: text,
				time: now,
				gstime: time.gettime.getChatTime(now,this.list[this.list.length-1].time),
			}
			this.list.push(obj)
			this.$nextTick(function(){
				this.pageToBottom()
			})
		}
	}
}
</script>

<style lang="scss" scoped>

</style>
