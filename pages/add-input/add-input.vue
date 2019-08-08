<template>
	<view>
		<!-- 自定义导航栏 -->
		<uni-nav-bar :statusBar="true" rightText="发布" left-icon="back" @click-left="back" @click-right="submit">
			<view class="privacy flex flex-item flex-JustCenter" @tap="changeLook">
				{{privacy}}
				<view class="icon iconfont icon-xialazhankai"></view>
			</view>
		</uni-nav-bar>
		<!-- 多行文本框 -->
		<view class="uni-textarea">
			<textarea value="" v-model="text" placeholder="赶快吐槽吧~" />
		</view>
		<!-- 上传多图 -->
		<up-load @upload="upload"></up-load>
		<!-- 弹出公告 -->
		<uni-popup :show="showPopup" position="middle" mode="fixed" @hidePopup="togglePopup">
			<view class="notice">
				<view class="flex flex-item flex-JustCenter">
					<image src="../../static/common/addinput.png" mode="widthFix"></image>
				</view>
				<view>1、涉及黄色，政治，广告及骚扰信息</view>
				<view>2、涉及人身攻击</view>
				<view>3、留联系方式，透露他人隐身</view>
				<view>一经核实将被封禁，情节严重者将永久封禁</view>
				<button type="default" @tap="togglePopup">朕已阅</button>
			</view>
		</uni-popup>
	</view>
</template>

<script>
import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue'
import upLoad from '@/components/common/upload.vue'
import uniPopup from '@/components/uni-popup/uni-popup.vue'

export default {
	data() {
		return {
			isBack: false,
			privacy: '所有人可见',
			pri_items: ['所有人可见', '仅好友可见', '仅自己可见'],
			text: '',
			imgList: [],
			showPopup: true
		};
	},
	components: {
		uniNavBar,
		upLoad,
		uniPopup
	},
	onBackPress() {
		if (!this.text && this.imgList.length < 1) return;
		if (!this.isBack) {
			this.save()
			return true;
		}
	},
	methods: {
		save () {
			uni.showModal({
				content: '是否保存为草稿',
				cancelText: '不保存',
				confirmText: '保存',
				success: res => {
					if (res.confirm) {
						console.log(1);
					} else {
						console.log(2);
					}
					
					this.isBack = true
					uni.navigateBack({
						delta: 1
					})
				}
			});
		},
		back () {
			// console.log(1);
			uni.navigateBack({
				delta: 1
			})
		},
		submit () {
			console.log(this.imgList);
		},
		changeLook () {
			uni.showActionSheet({
				itemList: this.pri_items,
				success: (res) => {
					this.privacy = this.pri_items[res.tapIndex]
				}
			});
		},
		upload (arr) {
			this.imgList = arr
		},
		togglePopup () {
			this.showPopup = false
		}
	}
}
</script>

<style lang="scss">
.privacy {
	height: 100%;
	margin-left: -25rpx;
}
.uni-textarea {
	border: 1rpx solid #eee;
}
.notice {
	width: 520rpx;
	image {
		width: 75%;
		margin-bottom: 20rpx;
	}
	button {
		background: #ffe934;
		margin-bottom: 20rpx;
	}
}
</style>
