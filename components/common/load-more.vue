<template>
	<view class="load-more">{{loadText}}</view>
</template>

<script>
export default {
	props: {
		loadText: String
	},
	data () {
		return {}
	},
	methods: {}
}
</script>

<style scoped lang="scss">
.load-more{
	text-align: center;
	color: #aaa;
	padding: 15rpx;
}
</style>
