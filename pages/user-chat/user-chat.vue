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
					<user-chat-list :item="item" :index="index"></user-chat-list>
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
	mounted() {
		this.getData()
		this.initData()
		this.pageToBottom(true)
	},
	methods: {
		// 初始化参数
		initData () {
			try {
				const res = uni.getSystemInfoSync();
				this.style.contentHeight = res.windowHeight - uni.upx2px(120)
			} catch (e) {}
		},
		pageToBottom (isFirst = false) {
			let q = uni.createSelectorQuery().in(this);
			let itemH = q.selectAll('.user-chat-item');
			this.$nextTick(() => {
				itemH.fields({
					size: true
				}, data => {
					// console.log(JSON.stringify(data));
					if (data) {
						if (isFirst) {
							for (let i = 0;i < data.length; i++) {
								this.style.itemHeight += data[i].height
							}
						} else {
							this.style.itemHeight += data[data.length - 1].height
						}
						this.scrollTop = (this.style.itemHeight > this.style.contentHeight) ? this.style.itemHeight : 0;
					}
				}).exec();
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
				},
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
				},
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
				},
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
				},
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
