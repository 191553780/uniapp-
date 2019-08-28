<template>
	<view>
		<swiper-tab-head 
			:tabBars="tabBars" 
			:tabIndex="tabIndex" 
			@fixIndex="fixIndex"
		></swiper-tab-head>
		
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
								<!-- 话题列表 -->
								<view class="talk-list">
									<block v-for="(item, index1) in items.list" :key="index1">
										<last-new :item="item" :index="index1"></last-new>
									</block>
								</view>
								<!-- 上拉加载 -->
								<load-more :loadText="items.loadText"></load-more>
							</template>
							<template v-else-if="!items.firstload">
								<view style="font-size: 50upx;font-weight: bold;color: #CCCCCC;
								padding-top: 100upx;" class="flex flex-item flex-JustCenter">Loading ...</view>
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
import swiperTabHead from '@/components/index/swiper-tab-head.vue'
import noThing from '@/components/common/no-thing.vue'
import loadMore from '@/components/common/load-more.vue'
import lastNew from '@/components/dynamic/last-new.vue'

export default {
	data() {
		return {
			swiperHeight: 0,
			tabIndex: 0,
			tabBars: [],
			newsList: []
		}
	},
	components: {
		swiperTabHead,
		noThing,
		loadMore,
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
		this.getNav();
	},
	methods: {
		// 获取文章分类
		async getNav(){
			let [err,res] =await this.$http.get('/topicclass');
			if (!this.$http.errorCheck(err,res)) return;
			let list = res.data.data.list;
			let arr = [];
			let arr2 = [];
			for (let i = 0; i < list.length; i++) {
				arr.push({
					id:list[i].id,
					name:list[i].classname
				})
				arr2.push({
					loadText:"上拉加载更多",
					list:[],
					page:1,
					firstload:false
				});
			}
			this.tabBars = arr;
			this.newsList = arr2;
			this.tabBars.length > 0 && this.getList();
		},
		// 获取指定列表
		async getList(){
			let url = `/topicclass/${this.tabBars[this.tabIndex].id}/topic/${this.newsList[this.tabIndex].page}`;
			let [err,res] = await this.$http.get(url);
			// console.log(url);
			let error = this.$http.errorCheck(err,res,()=>{
				this.newsList[this.tabIndex].loadText="上拉加载更多";
			},()=>{
				this.newsList[this.tabIndex].loadText="上拉加载更多";
			});
			if (!error) return;
			
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
				});
			}
			this.newsList[this.tabIndex].list = this.newsList[this.tabIndex].page > 1 ? this.newsList[this.tabIndex].list.concat(arr) : arr;
			this.newsList[this.tabIndex].firstload = true;
			if (list.length < 10) {
				this.newsList[this.tabIndex].loadText="我是有底线的...";
			}else{
				this.newsList[this.tabIndex].loadText="上拉加载更多";
			}
			return;
		},
		fixIndex (index) {
			this.tabIndex = index
		},
		tabChange (e) {
			let sIndex = e.detail.current
			this.tabIndex = sIndex
			this.getList();
		},
		loadMore (index) {
			if (this.newsList[index].loadText != '上拉加载更多...') return;
			// 修改状态
			this.newsList[index].loadText = '加载中...'
			// 获取数据
			this.newsList[this.tabIndex].page++;
			this.getList();
		}
	}
}
</script>

<style lang="scss" scoped>
.talk-list {
	padding: 0 20rpx;
}
</style>
