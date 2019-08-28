<template>
	<view>
		<talk-info :item="talkInfo"></talk-info>
		<!-- tab切换 -->
		<swiper-tab-head 
			:tabBars="tabBars" 
			:tabIndex="tabIndex"
			scrollStyle="border-bottom:0;"
			scrollItemStyle="width:50%;"
			@fixIndex="fixIndex"
		></swiper-tab-head>
		<!-- 列表 -->
		<view class="detail-list">
			<block v-for="(item,index) in tabList" :key="index">
				<template v-if="tabIndex == index">
					<block v-for="(list,listIndex) in item.list" :key="listIndex">
						<common-list
							:item="list" 
							:index="index" 
							:index1="listIndex"
							@changeEvent="updateData"
						></common-list>
					</block>
					<!-- 上拉加载 -->
					<load-more :loadText="item.loadText"></load-more>
				</template>
			</block>
		</view>
	</view>
</template>

<script>
import talkInfo from '@/components/talk-info/talk-info.vue'
import swiperTabHead from '@/components/index/swiper-tab-head.vue'
import commonList from '@/components/common/common-list.vue'
import loadMore from '@/components/common/load-more.vue'

export default {
	data() {
		return {
			talkInfo: {
				titlepic: '',
				title: '',
				desc: '',
				totalnum: 0,
				todaynum: 0
			},
			tabIndex: 0,
			tabBars: [
				{name: '默认',id: 'default'},
				{name: '最新',id: 'new'}
			],
			tabList: [
				{ loadtext:"上拉加载更多",list:[],firstload:false,page:1},
				{ loadtext:"上拉加载更多",list:[],firstload:false,page:1},
			]
		}
	},
	components: {
		talkInfo,
		swiperTabHead,
		commonList,
		loadMore
	},
	onReachBottom () { // 上拉触底
		this.loadMore()
	},
	onPullDownRefresh () { // 下拉刷新
		this.getList();
	},
	onLoad (e) {
		this.__init(JSON.parse(e.detail));
		// 开启监听
		uni.$on('updateData',this.updateData);
	},
	methods: {
		updateData(data){
			switch (data.type){
				case "guanzhu":
				this.updateGuanZhu(data)
					break;
				case "support":
				this.updateSupport(data);
					break;
				case 'updateComment':
				this.updateComment(data);
					break;
			}
		},
		// 更新评论数
		updateComment(data){
			// 拿到当前对象
			let obj = this.tabList[this.tabIndex].list.find(value =>{
				return value.id === data.post_id;
			});
			if (!obj) return;
			obj.commentnum++; // 评论数+1
		},
		// 更新关注信息
		updateGuanZhu(data){
			this.tabList[this.tabIndex].list.forEach((item,index)=>{
				if (item.userid === data.userid) {
					item.isguanzhu = data.data;
				}
			})
		},
		updateSupport(data){
			let obj = this.tabList[this.tabIndex].list.find((item)=>{
				return item.id === data.post_id;
			})
			console.log(obj)
			if(!obj || obj.infonum.index === 1) return;
			if (data.do == 'smile') {
				obj.infonum.index = 1;
				obj.goodnum++;
				obj.infonum.dingnum ++;
			}
		},
		// 初始化
		__init(obj){
			// 修改标题
			uni.setNavigationBarTitle({ title: obj.title });
			this.talkInfo = obj;
			// 获取列表数据
			this.getList();
		},
		// 获取数据
		async getList(){
			let url = `/topic/${this.talkInfo.id}/post/${this.tabList[this.tabIndex].page}`;
			let [err,res] = await this.$http.get(url,{},{token:true});
			
			// 错误处理
			if (!this.$http.errorCheck(err,res)) {
				return this.tabList[this.tabIndex].loadText="上拉加载更多";
			}
			
			let arr = [];
			let list = res.data.data.list;
			for (let i = 0; i < list.length; i++) {
				arr.push(this.__format(list[i]));
			}
			this.tabList[this.tabIndex].list = this.tabList[this.tabIndex].page > 1 ? this.tabList[this.tabIndex].list.concat(arr) : arr;
			this.tabList[this.tabIndex].firstload = true;
			uni.stopPullDownRefresh();
			return	this.tabList[this.tabIndex].loadText=(list.length < 10) ?"我是有底线的..." : "上拉加载更多";
		},
		// 转换格式
		__format(item){
			return {
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
					index:(item.support.length>0) ? (item.support[0].type+1) : 0,
					dingnum:item.ding_count,
					cainum:item.cai_count,
				},
				goodnum:item.ding_count,
				commentnum:item.comment_count,
				sharenum:item.sharenum,
				sex:item.user.userinfo.sex,
				age:item.user.userinfo.age,
			}
		},
		fixIndex (index) {
			this.tabIndex = index
			this.tabList[this.tabIndex].page = 1;
			this.getList();
		},
		// 上拉加载
		loadMore () {
			if (this.tabList[this.tabIndex].loadText != '上拉加载更多...') return;
			// 修改状态
			this.tabList[this.tabIndex].loadText = '加载中...'
			// 获取数据
			// 页数+1
			this.tabList[this.tabIndex].page++;
			// 获取数据
			this.getList();
		}
	}
}
</script>

<style lang="scss" scoped>

</style>
