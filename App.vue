<script>
	export default {
		onLaunch: function() {
			// console.log(this.config.webUrl);
			this.lib.NetWork.On()
			console.log('App Launch')
			// 初始化用户
			this.User.__init();
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	} 
</script>

<style>
	/*每个页面公共css */
	@import "./common/uni.css";
	@import "./common/icon.css";
	@import "./common/animate.css";
	@import "./common/common.css";
</style>
