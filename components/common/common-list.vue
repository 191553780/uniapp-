<template>
	<view class="common-list flex flex-JustBetween animated fast" :class="itemClass">
		<view class="common-list-left">
			<image :src="item.userpic" @tap.stop="openSpace" mode="widthFix" lazy-load></image>
		</view>
		<view class="common-list-right">
			<view class="common-info flex flex-item flex-JustBetween">
				<view class="flex flex-item flex-JustCenter">
					{{item.username}}
					<tag-sex-age :sex="getSex" :age="getAge"></tag-sex-age>
				</view>
				<view class="flex flex-item flex-JustCenter">
					<view class="common-follow flex flex-item flex-JustCenter"
						v-show="!item.isguanzhu"
						@tap="follow"
					>
						<view class="icon iconfont icon-zengjia1"></view>
						关注
					</view>
					<view class="icon iconfont icon-guanbi1"></view>
				</view>
			</view>
			<view class="common-title" @tap.stop="opendetail">{{item.title}}</view>
			<view
			 class="common-content flex flex-item flex-JustCenter"
			 @tap.stop="opendetail"
			>
				<!-- 图片 -->
				<template v-if="item.titlepic">
					<image v-if="item.titlepic" :src="item.titlepic" mode="widthFix" lazy-load></image>
				</template>
				<!-- 视频 -->
				<template v-if="item.video">
					<view class="commit-list-play icon iconfont icon-bofang"></view>
					<view class="commit-list-playInfo">
						{{item.video.looknum}} 次播放 {{item.video.loog}}
					</view>
				</template>
				<!-- 分享 -->
				<template v-if="item.share">
					<view class="common-list-share flex flex-item">
						<image :src="item.share.titlepic" mode="" lazy-load></image>
						<view>{{item.share.title}}</view>
					</view>
				</template>
			</view>
			<view class="common-detail flex flex-item flex-JustBetween">
				<view>{{item.path}}</view>
				<view class="flex flex-item">
					<view class="icon iconfont icon-zhuanfa">{{item.sharenum}}</view>
					<view class="icon iconfont icon-pinglun1">{{item.commentnum}}</view>
					<view class="icon iconfont icon-dianzan" @tap="caozuo('smile')">{{item.goodnum}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import tagSexAge from '@/components/common/tag-sex-age.vue'
export default {
	props:{
		item: Object,
		index: Number,
		index1: {
			type: Number,
			default: undefined
		},
		itemClass: {
			type: String,
			default: 'fadeIn'
		}
	},
	data () {
		return {}
	},
	components: {
		tagSexAge
	},
	computed: {
		getSex() {
			return this.item.sex;
		},
		getAge(){
			return this.item.age;
		}
	},
	methods: {
		async follow () {
			try{
				let [err,res] = await this.$http.post('/follow',{
					follow_id:this.item.userid
				},{
					token:true,
					checkToken:true,
					checkAuth:true
				});
				// 错误处理
				if (!this.$http.errorCheck(err,res)) return;
				// 通知首页修改数据
				uni.showToast({ title: '关注成功' });
				let resdata = {
					type:"guanzhu",
					userid:this.item.userid,
					data:true
				};
				// 通知父组件
				this.$emit('changeEvent',resdata);
				// 全局通知
				uni.$emit('updateData',resdata);
			}catch(e){ return; }
		},
		// 进入详情页
		opendetail(){
			uni.navigateTo({
				url: '../../pages/detail/detail?detailData='+JSON.stringify(this.item),
			});
			this.User.addHistoryList(this.item);
		},
		async caozuo(type){
			let index = (type === 'smile') ? 1 : 2; // 当前操作
			let [err,res] = await this.$http.post('/support',{
				post_id:this.item.id,
				type:index-1
			},{
				token:true,
				checkToken:true,
				checkAuth:true
			});
			if (!this.$http.errorCheck(err,res)) return;
			uni.showToast({ title: "顶成功" });
			// 通知父组件
			let resdata = {
				type:"support",
				post_id:this.item.id,
				do:type
			};
			this.$emit('changeEvent',resdata);
			// 通知全局
			return uni.$emit("updateData",resdata);
		},
		openSpace(){
			if (this.nonavigate) return;
			uni.navigateTo({
				url:"../../pages/user-space/user-space?userid="+this.item.userid
			})
		}
	}
}
</script>

<style lang="scss" scoped>
@import '../../common/list.scss'
</style>
