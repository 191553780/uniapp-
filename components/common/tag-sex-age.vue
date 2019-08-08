<template>
	<view 
		:class="['tag-sex', 'icon', 'iconfont', sex == 0 ? ['icon-nan','man'] : ['icon-nv','woman']]"
	>
		{{age}}
	</view>
</template>

<script>
export default {
	props: {
		sex: Number,
		age: Number
	},
	data () {
		return {}
	},
	methods: {
		
	}
}
</script>

<style scoped lang="scss">
.tag-sex {
	color: #fff;
	border-radius: 20rpx;
	font-size: 23rpx;
	padding: 5rpx 10rpx;
	margin-left: 10rpx;
	line-height: 22rpx;
}
.woman {
	background: lightcoral;
}
.man {
	background: lightblue;
}
</style>
