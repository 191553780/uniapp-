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
						v-show="!item.isFollow"
						@tap="follow(item.isFollow)"
					>
							<view class="icon iconfont icon-zengjia1"></view>
							关注
					</view>
					<view class="icon iconfont icon-guanbi1"></view>
				</view>
			</view>
			<view class="common-title">{{item.title}}</view>
			<view class="flex flex-item flex-JustCenter">
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
			default: 'fadeInLeft'
		}
	},
	data () {
		return {}
	},
	components: {
		tagSexAge
	},
	methods: {
		follow (follow) {
			this.$emit('fixFollow',{
				index: this.index,
				index1: this.index1,
				follow
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.common-list {
	padding: 20rpx;
	.common-list-left {
		image {
			width: 90rpx;
			height: 90rpx;
			border-radius: 100%;
		}
	}
	.common-list-right {
		flex: 1;
		margin-left: 15rpx;
		border-bottom: 1rpx solid #eee;
		padding-bottom: 10rpx;
		
		.common-info {
			&>view:first-child {
				color: #999;
				font-size: 32rpx;
			}
			&>view:last-child {
				font-size: 26rpx;
				
				.common-follow {
						background: #eee;
						padding: 0 10rpx;
						margin-right: 10rpx;
				}
			}
		}
		.common-title {
			font-size: 32rpx;
			padding: 12rpx 0;
		}
		&>view:nth-of-type(3) {
			position: relative;
			
			&>image {
				width: 100%;
				border-radius: 10rpx;
			}
			
			.commit-list-play,.commit-list-playInfo  {
				position: absolute;
				color:#fff;
			}
			.commit-list-play {
				font-size: 100rpx;
			}
			.commit-list-playInfo {
				font-size: 10rpx;
				bottom: 10rpx;
				right: 10rpx;
				background: rgba(0,0,0,.5);
				border-radius: 20rpx;
				padding: 0 20rpx;
				font-size: 26rpx;
			}
			.common-list-share {
				background: #eee;
				width: 100%;
				padding: 10rpx;
				border-radius: 10rpx;
				
				&>image {
					width: 200rpx;
					height: 150rpx;
					margin-right: 10rpx;
					border-radius: 10rpx;
				}
			}
		}
		.common-detail {
			margin-top: 15rpx;
			&>view {
				color: #aaa;
			}
			&>view:last-child {
				view {
					font-size: 28rpx;
					margin-left: 10rpx;
					padding-left: 5rpx;
				}
			}
		}
	}
}
</style>
