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
			list: [],
			page:1,
			loadtext:"点击加载更多..."
		};
	},
	components: {
		userChatBottom,
		userChatList
	},
	mounted() {
		this.getData()
		this.initData()
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
		// 获取用户反馈记录
		async getData () {
			let url = `/feedbacklist/${this.page}`;
			let [err,res] = await this.$http.get(url,{},{
				token:true,
				checkToken:true
			});
			// 错误处理
			if (!this.$http.errorCheck(err,res)) return;
			// 成功
			let list = res.data.data.list;
			let arr = [];
			for (let i = 0; i < list.length; i++) {
				if (list[i].from_id == this.User.userinfo.id || list[i].to_id == this.User.userinfo.id) {
					let isme = list[i].from_id == this.User.userinfo.id;
					arr.push({
						isMe: isme,
						userpic: isme ? this.User.userinfo.userpic :"../../static/demo/userpic/11.jpg",
						type:"text",
						data:list[i].data,
						time:list[i].create_time,
						gstime:time.gettime.getChatTime(list[i].create_time,i>0 ? list[i-1].create_time:0)
					});
				}
			}
			this.loadtext = list.length < 10 ? "我是有底线的" :"点击加载更多";
			arr.reverse()
			this.list = [...arr,...this.list];
			// console.log(JSON.stringify(this.list))
			if (this.page === 1 && this.list.length>0) {
				this.pageToBottom(true);
			} 
		},
		async submit (data) {
			let [err,res] = await this.$http.post('/feedback',{
				data:data
			},{ 
				token:true,
				checkToken:true
			});
			// 错误处理
			if (!this.$http.errorCheck(err,res)) return;
			// 成功处理
			// 构建数据
			let now=new Date().getTime();
			let gstime = time.gettime.getChatTime(now,this.list.length>0 ? this.list[this.list.length-1].time : 0);
			this.list.push({
				isMe:true,
				userpic:this.User.userinfo.userpic,
				type:"text",
				data:data,
				time:now,
				gstime:gstime
			});
			this.pageToBottom();
			uni.showToast({ title: '反馈成功' });
		}
	}
}
</script>

<style lang="scss" scoped>

</style>
