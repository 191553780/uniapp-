<template>
	<view class="index-list animated fadeIn fast">
		<view class="index-list-one flex flex-item flex-JustBetween">
			<view class="flex flex-item">
				<image :src="item.userPic" mode="widthFix" lazy-load></image>
				{{item.userName}}
			</view>
			<view class="flex flex-item" v-show="!item.isFollow" @tap="follow(item.isFollow)">
				<view class="icon iconfont icon-zengjia1"></view>
				关注
			</view>
		</view>
		<view class="index-list-two" @tap="openDetail">{{item.title}}</view>
		<view class="index-list-three flex flex-item flex-JustCenter" @tap="openDetail">
			<!-- 图片 -->
			<image :src="item.titlePic" mode="widthFix" lazy-load></image>
			<!-- 视频 -->
			<template v-if="item.type === 'video'">
				<view class="index-list-play icon iconfont icon-bofang"></view>
				<view class="index-list-info">
					{{item.playNum}} 次播放 {{item.longTime}}
				</view>	
			</template>				
		</view>
		<view class="index-list-four flex flex-item flex-JustBetween">
			<view class="flex flex-item">
				<view class="flex flex-item" @tap="operate('smile')">
					<view :class="['icon', 'iconfont', 'icon-xiaolian1', {'active': item.infoNum.isOption === 1}]"></view>
					{{item.infoNum.smileNum}}
				</view>
				<view class="flex flex-item" @tap="operate('cry')">
					<view :class="['icon', 'iconfont', 'icon-kulian', {'active': item.infoNum.isOption === 2}]"></view>
					{{item.infoNum.cryNum}}
				</view>
			</view>
			<view class="flex flex-item">
				<view class="flex flex-item">
					<view class="icon iconfont icon-pinglun1"></view>
					{{item.commentNum}}
				</view>
				<view class="flex flex-item">
					<view class="icon iconfont icon-zhuanfa"></view>
					{{item.shareNum}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			item: Object,
			index: {
				type: Number,
				default: 0
			},
			index1: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				
			};
		},
		methods: {
			// 关注
			follow (follow) {
				this.$emit('follow',{
					follow,
					index: this.index,
					index1: this.index1
				})
				uni.showToast({
					title: '关注成功'
				})
			},
			// 赞 踩
			operate (type) {
				this.$emit('operate',{
					type,
					index: this.index,
					index1: this.index1
				})
			},
			// 进入详情页
			openDetail () {
				uni.navigateTo({
					url:'../../pages/detail/detail?detailData='+JSON.stringify(this.item)
				})
			}
		}
	}
</script>

<style scoped lang="scss">
.index-list{
	padding: 20rpx;
	border-bottom: 1rpx solid #efefef;
	
	.index-list-one {
		&>view:first-of-type {
			color: #999;
			image {
				width: 85rpx;
				height: 85rpx;
				border-radius: 100%;
				margin-right: 10rpx;
			}
		}
		&>view:last-of-type {
			background: #f4f4f4;
			border-radius: 5rpx;
			padding:0 10rpx;
			padding-right: 15rpx;
		}
	}
	.index-list-padding,.index-list-two,.index-list-three,.index-list-four {
		padding-top: 15rpx;
	}
	.index-list-two {
		font-size: 32rpx;
	}
	.index-list-three {
		position: relative;
		image {
			width: 100%;
			border-radius: 20rpx;
		}
		.index-list-play {
			position: absolute;
			font-size: 100rpx;
			color: #fff;
		}
		.index-list-info {
			position: absolute;
			background: rgba(0,0,0,.5);
			border-radius: 40rpx;
			color:#fff;
			font-size: 22rpx;
			padding: 0 15rpx;
			bottom: 8rpx;
			right: 8rpx;
		}
	}
	.index-list-four {
		&>view {
			&>view {
				color: #ccc;
				&>view {
					margin-right: 15rpx;
				}
			}
			&>view:last-of-type {
				margin-left: 15rpx;
			}
		}
		.active {
			color: lightblue;
		}
	}
}
</style>
