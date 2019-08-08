<template>
	<view class="uni-tab-bar">
		<scroll-view class="uni-swiper-tab" scroll-x :style="scrollStyle">
			<block v-for="(tab, index) in tabBars" :key="tab.id">
				<view 
					class="swiper-tab-list" :class="{'active': tabIndex == index}"
					@tap="tabTap(index)"
					:style="scrollItemStyle"
				>
					{{tab.name}} {{tab.num ? tab.num : ''}}
					<view class="swiper-tab-line"></view>
				</view>
			</block>
		</scroll-view>
	</view>
</template>

<script>
export default {
	props: {
		tabBars: Array,
		tabIndex: Number,
		scrollStyle: {
			type: String,
			default: ''
		},
		scrollItemStyle: {
			type: String,
			default: ''
		}
	},
	data () {
		return {}
	},
	methods: {
		tabTap (index) {
			this.$emit('fixIndex',index)
		}
	}
}
</script>

<style scoped lang="scss">
.uni-tab-bar {
	.uni-swiper-tab {
		border-bottom: 1rpx solid #eee;
	}
	.swiper-tab-list {
		color: #969696;
		font-weight: bold;
	}	
	.active {
		color: #343434;
		.swiper-tab-line {
			border-bottom: 6rpx solid #fede33;
			width: 70rpx;
			margin: auto;
			border-top: 6rpx solid #fede33;
			border-radius: 20rpx;
		}
	}
}
</style>
