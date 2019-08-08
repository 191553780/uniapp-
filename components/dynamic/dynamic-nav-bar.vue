<template>
	<view>
		<uni-nav-bar :fixed="true" :statusBar="true" :border="false" @click-right="openAdd">
			<!-- 左边 -->
			<block slot="left">
				<view class="nav-left">
					<view class="icon iconfont icon-qiandao"></view>
				</view>
			</block>
			<!-- 中间 -->
			<view class="nav-tab-bar flex flex-item flex-JustCenter">
				<block v-for="(item, index) in tabBars" :key="item.id">
						<view :class="['flex', 'flex-item', 'flex-JustCenter', {'active': tabIndex == index}]" @tap="fixIndex(index)">
							{{item.name}}
							<view class="nav-tab-bar-line" v-if="tabIndex == index"></view>
						</view>
				</block>
			</view>
			<!-- 右边 -->
			<block slot="right">
				<view class="nav-right flex flex-item flex-JustCenter">
					<view class="icon iconfont icon-bianji"></view>
				</view>
			</block>
		</uni-nav-bar>
	</view>
</template>

<script>
import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue'

export default {
	props: {
		tabBars: Array,
		tabIndex: Number
	},
	data () {
		return {
			
		}
	},
	components: {
		uniNavBar
	},
	methods: {
		fixIndex (index) {
			this.$emit('chang-tab',index)
		},
		openAdd () {
			uni.navigateTo({
				url: '../add-input/add-input'
			})
		},
	}
}
</script>

<style lang="scss" scoped>
.nav-left,.nav-right {
	height: 100%;
	view {
		font-size: 44rpx;
	}
}
.nav-left {
	margin-left: 16rpx;
	view {
		color: #ff9639;
	}
}
.nav-right {
	width: 100%;
}
.nav-tab-bar {
	height: 100%;
	margin-left: -25rpx;
	.active {
		color:#333;
	}
	&>view {
		font-size: 32rpx;
		font-weight: bold;
		padding: 0 15rpx;
		color: #969696;
		position: relative;
		height: 100%;
		
		.nav-tab-bar-line {
			position: absolute;
			bottom: 8rpx;
			border-bottom: 5rpx solid #fede33;
			width: 45rpx;
			margin: auto;
			border-top: 5rpx solid #fede33;
			border-radius: 20rpx;
		}
	}
}
</style>
