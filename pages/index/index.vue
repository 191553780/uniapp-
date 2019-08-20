<template>
	<view>
		<swiper-tab-head :tabBars="tabBars" :tabIndex="tabIndex" @fixIndex="fixIndex"></swiper-tab-head>
		
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
									<index-list :item="item" :index="index" :index1="index1" @follow="follow" @operate="operate"></index-list>
								</block>
								<!-- 上拉加载 -->
								<load-more :loadText="items.loadtext"></load-more>
							</template>
							<template v-else-if="!items.firstload">
								<view style="font-size: 50rpx;font-weight: bold;color:#ccc;padding-top: 100rpx;" class="flex flex-item flex-JustCenter">Loading...</view>
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
</template>

<script>
import indexList from '@/components/index/index-list.vue'
import swiperTabHead from '@/components/index/swiper-tab-head.vue'
import loadMore from '@/components/common/load-more.vue'
import noThing from '@/components/common/no-thing.vue'

export default {
	data() {
		return {
			swiperHeight: 0,
			tabIndex: 0,
			tabBars: [],
			newsList: [
				{
					loadText: "上拉加载更多...",
					list: [
						{
							userPic: '../../static/demo/userpic/12.jpg',
							userName: '啦啦',
							isFollow: false,
							title: '我是标题',
							type: 'img', // 图片img 视频video
							titlePic: '../../static/demo/datapic/11.jpg',
							infoNum: {
								isOption: 2, // 0 没有操作 1 赞 2 踩
								smileNum: 11,
								cryNum: 2,
							},
							commentNum: 20,
							shareNum: 8
						},
						{
							userPic: '../../static/demo/userpic/12.jpg',
							userName: '啦啦',
							isFollow: true,
							title: '我是标题',
							type: 'video', // 图片img 视频video
							titlePic: '../../static/demo/datapic/11.jpg',
							playNum: "2w",
							longTime: '1:56',
							infoNum: {
								isOption: 1, // 0 没有操作 1 赞 2 踩
								smileNum: 11,
								cryNum: 2,
							},
							commentNum: 20,
							shareNum: 8
						}
					]
				},
				{
					loadText: "上拉加载更多...",
					list: [
						{
							userPic: '../../static/demo/userpic/12.jpg',
							userName: '啦啦',
							isFollow: false,
							title: '我是标题',
							type: 'img', // 图片img 视频video
							titlePic: '../../static/demo/datapic/11.jpg',
							infoNum: {
								isOption: 2, // 0 没有操作 1 赞 2 踩
								smileNum: 11,
								cryNum: 2,
							},
							commentNum: 20,
							shareNum: 8
						},
						{
							userPic: '../../static/demo/userpic/12.jpg',
							userName: '啦啦',
							isFollow: true,
							title: '我是标题',
							type: 'video', // 图片img 视频video
							titlePic: '../../static/demo/datapic/11.jpg',
							playNum: "2w",
							longTime: '1:56',
							infoNum: {
								isOption: 1, // 0 没有操作 1 赞 2 踩
								smileNum: 11,
								cryNum: 2,
							},
							commentNum: 20,
							shareNum: 8
						},
						{
							userPic: '../../static/demo/userpic/12.jpg',
							userName: '啦啦',
							isFollow: false,
							title: '我是标题',
							type: 'img', // 图片img 视频video
							titlePic: '../../static/demo/datapic/11.jpg',
							infoNum: {
								isOption: 2, // 0 没有操作 1 赞 2 踩
								smileNum: 11,
								cryNum: 2,
							},
							commentNum: 20,
							shareNum: 8
						},
						{
							userPic: '../../static/demo/userpic/12.jpg',
							userName: '啦啦',
							isFollow: true,
							title: '我是标题',
							type: 'video', // 图片img 视频video
							titlePic: '../../static/demo/datapic/11.jpg',
							playNum: "2w",
							longTime: '1:56',
							infoNum: {
								isOption: 1, // 0 没有操作 1 赞 2 踩
								smileNum: 11,
								cryNum: 2,
							},
							commentNum: 20,
							shareNum: 8
						}
					]
				},
				{
					loadText: "上拉加载更多...",
					list: [
						
					]
				},
				{
					loadText: "上拉加载更多...",
					list: [
						{
							userPic: '../../static/demo/userpic/12.jpg',
							userName: '啦啦1',
							isFollow: true,
							title: '我是标题',
							type: 'video', // 图片img 视频video
							titlePic: '../../static/demo/datapic/11.jpg',
							playNum: "2w",
							longTime: '1:56',
							infoNum: {
								isOption: 1, // 0 没有操作 1 赞 2 踩
								smileNum: 11,
								cryNum: 2,
							},
							commentNum: 20,
							shareNum: 8
						},
						{
							userPic: '../../static/demo/userpic/12.jpg',
							userName: '啦啦',
							isFollow: false,
							title: '我是标题',
							type: 'img', // 图片img 视频video
							titlePic: '../../static/demo/datapic/11.jpg',
							infoNum: {
								isOption: 2, // 0 没有操作 1 赞 2 踩
								smileNum: 11,
								cryNum: 2,
							},
							commentNum: 20,
							shareNum: 8
						}
					]
				},
				{
					loadText: "上拉加载更多...",
					list: [
						
					]
				},
				{
					loadText: "上拉加载更多...",
					list: [
						{
							userPic: '../../static/demo/userpic/12.jpg',
							userName: '啦啦',
							isFollow: false,
							title: '我是标题',
							type: 'img', // 图片img 视频video
							titlePic: '../../static/demo/datapic/11.jpg',
							infoNum: {
								isOption: 2, // 0 没有操作 1 赞 2 踩
								smileNum: 11,
								cryNum: 2,
							},
							commentNum: 20,
							shareNum: 8
						},
						{
							userPic: '../../static/demo/userpic/12.jpg',
							userName: '啦啦',
							isFollow: false,
							title: '我是标题',
							type: 'img', // 图片img 视频video
							titlePic: '../../static/demo/datapic/11.jpg',
							infoNum: {
								isOption: 2, // 0 没有操作 1 赞 2 踩
								smileNum: 11,
								cryNum: 2,
							},
							commentNum: 20,
							shareNum: 8
						}
					]
				}
			]
		}
	},
	components:{
		indexList,
		swiperTabHead,
		loadMore,
		noThing
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
		this.getNav();
	},
	// 监听搜索框点击事件
	onNavigationBarSearchInputClicked () {
		uni.navigateTo({
			url: '../search/search'
		})
	},
	onNavigationBarButtonTap (e) {
		// console.log(JSON.stringify(e.index));
		switch (e.index){
			case 1:
				// 打开发布页面
				uni.navigateTo({
					url: '../add-input/add-input'
				})
				break;
			default:
				break;
		}
	},
	methods: {
		fixIndex (index) {
			this.tabIndex = index
		},
		tabChange (e) {
			let sIndex = e.detail.current
			this.tabIndex = sIndex
			this.getList();
		},
		// 关注
		follow (obj) {
			// console.log(obj);
			this.newsList[obj.index].list[obj.index1].isguanzhu = !obj.guanzhu
		},
		// 上拉加载
		loadMore (index) {
			console.log(this.newsList[index].loadtext);
			if (this.newsList[index].loadtext != '上拉加载更多...') return;
			// 修改状态
			this.newsList[index].loadtext = '加载中...'
			// 获取数据
			this.newsList[this.tabIndex].page++;
			this.getList(); 
		},
		// 获取文章分类 
		async getNav () {
			let [err,res] = await this.$http.get('/postclass')
			if (err) return uni.showToast({ title: '加载失败', icon: 'none' })
			if (res.data.errorCode) return uni.showToast({ title: res.data.msg, icon: 'none' })
			
			let list = res.data.data.list;
			let arr = [];
			let arr2 = [];
			for (let i = 0; i < list.length; i++) {
				arr.push({
					id: list[i].id,
					name: list[i].classname
				})
				arr2.push({
					loadtext: '上拉加载更多....',
					list: [],
					page: 1,
					firstload: false
				})
			}
			this.tabBars = arr;
			this.newsList = arr2;
			this.tabBars.length > 0 && this.getList();
		},
		// 获取指定列表
		async getList(){
			let currentIndex = this.tabIndex;
			let url = `/postclass/${this.tabBars[this.tabIndex].id}/post/${this.newsList[this.tabIndex].page}`;
			let [err,res] = await this.$http.get(url,{},{token:true});
			let error = this.$http.errorCheck(err,res,()=>{
				this.newsList[currentIndex].loadtext="上拉加载更多...";
			},()=>{
				this.newsList[currentIndex].loadtext="上拉加载更多...";
			});
			// console.log(JSON.stringify(res))
			if (!error) return;
			let arr = [];
			let list = res.data.data.list;
			for (let i = 0; i < list.length; i++) {
				arr.push(this.__format(list[i]));
			}
			this.newsList[currentIndex].list = this.newsList[currentIndex].page > 1 ? this.newsList[currentIndex].list.concat(arr) : arr;
			this.newsList[currentIndex].firstload = true;
			if (list.length < 10) {
				this.newsList[currentIndex].loadtext="我是有底线的...";
			}else{
				this.newsList[currentIndex].loadtext="上拉加载更多...";
			}
			// console.log(JSON.stringify(this.newsList[currentIndex]));
			return;
		},
		// 格式转化
		__format(item){
			return {
				userid:item.user.id,
				userpic:item.user.userpic,
				username:item.user.username,
				isguanzhu: !!item.user.fens.length,
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
				commentnum:item.comment_count,
				sharenum:item.sharenum,
			}
		},
		// 赞和踩
		operate (obj) {
			// console.log(obj);
			// console.log(this.newsList[obj.index].list[obj.index1].infoNum);
			switch (obj.type) {
				case 'smile':
					if (this.newsList[obj.index].list[obj.index1].infoNum.isOption == 1) return;
					this.newsList[obj.index].list[obj.index1].infoNum.smileNum ++
					if (this.newsList[obj.index].list[obj.index1].infoNum.isOption == 2) {
						this.newsList[obj.index].list[obj.index1].infoNum.cryNum --
					}
					this.newsList[obj.index].list[obj.index1].infoNum.isOption = 1
				break;
				case 'cry':
					if (this.newsList[obj.index].list[obj.index1].infoNum.isOption == 2) return;
					this.newsList[obj.index].list[obj.index1].infoNum.cryNum ++
					if (this.newsList[obj.index].list[obj.index1].infoNum.isOption == 1) {
						this.newsList[obj.index].list[obj.index1].infoNum.smileNum --
					}
					this.newsList[obj.index].list[obj.index1].infoNum.isOption = 2
				break;
			}
		},
	}
}
</script>

<style scoped lang="scss">

</style>
