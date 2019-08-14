<template>
	<view class="common-list flex flex-JustBetween animated fast" :class="itemClass">
		<view class="common-list-left">
			<image :src="item.userPic" mode="widthFix" lazy-load></image>
		</view>
		<view class="common-list-right">
			<view class="common-info flex flex-item flex-JustBetween">
				<view class="flex flex-item flex-JustCenter">
					{{item.userName}}
					<tag-sex-age :sex="item.sex" :age="item.age"></tag-sex-age>
				</view>
				<view class="flex flex-item flex-JustCenter">
					<view class="common-follow flex flex-item flex-JustCenter"
						v-show="!isFollow"
						@tap="follow(isFollow)"
					>
							<view class="icon iconfont icon-zengjia1"></view>
							关注
					</view>
					<view class="icon iconfont icon-guanbi1"></view>
				</view>
			</view>
			<view class="common-title">{{item.title}}</view>
			<view class="common-content flex flex-item flex-JustCenter">
				<!-- 图片 -->
				<image v-if="item.titlePic" :src="item.titlePic" mode="widthFix" lazy-load></image>
				<!-- 视频 -->
				<template v-if="item.video">
					<view class="commit-list-play icon iconfont icon-bofang"></view>
					<view class="commit-list-playInfo">
						{{item.video.lookNum}} 次播放 {{item.video.loog}}
					</view>
				</template>
				<!-- 分享 -->
				<template v-if="item.share">
					<view class="common-list-share flex flex-item">
						<image :src="item.share.titlePic" mode="" lazy-load></image>
						<view>{{item.share.title}}</view>
					</view>
				</template>
			</view>
			<view class="common-detail flex flex-item flex-JustBetween">
				<view>{{item.path}}</view>
				<view class="flex flex-item">
					<view class="icon iconfont icon-zhuanfa">{{item.shareNum}}</view>
					<view class="icon iconfont icon-pinglun1">{{item.commenNum}}</view>
					<view class="icon iconfont icon-dianzan">{{item.goodNum}}</view>
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
		return {
			isFollow: this.item.isFollow
		}
	},
	components: {
		tagSexAge
	},
	methods: {
		follow (follow) {
			this.isFollow = !this.isFollow
			uni.showToast({
				title: '关注成功'
			})
			// this.$emit('fixFollow',{
			// 	index: this.index,
			// 	index1: this.index1,
			// 	follow
			// })
		}
	}
}
</script>

<style lang="scss" scoped>
@import '../../common/list.scss'
</style>
