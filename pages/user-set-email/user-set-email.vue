<template>
	<view class="email">
		<input type="text"
			class="uni-input common-input" 
			placeholder="输入邮箱" 
			value=""
			v-model="email"
		/>
		<button
			class="user-set-btn"
			:class="{'user-set-btn-disabled':disabled}"
			type="primary"
			:disabled="disabled || isbind"
			:loading="loading"
			@tap="submit"
		>{{isbind ? "已绑定":"立即绑定"}}</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isbind:false,
				email: '',
				disabled: true,
				loading: false
			}
		},
		onLoad(e) {
			if (e.email && e.email !== 'false' && e.email !== 'null') {
				this.email = e.email;
				this.disabled = true;
				this.isbind = true;
			}
		},
		methods: {
			// 监听输入框
			change () {
				if (this.email) {
					return this.disabled = false;
				}
				this.disabled = true;
			},
			// 验证
			check () {
				if (!this.email && this.email == '') {
					uni.showToast({
						title: '邮箱不能为空',
						icon: 'none'
					})
					return false
				}
				// 验证邮箱格式
				let pattern = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
				if (!pattern.test(this.email)) {
					uni.showToast({
						title: '请输入正确的邮箱',
						icon: 'none'
					})
					return false
				}
				
				return true
			},
			// 提交
			async submit () {
				if(!this.check()) return; 
				this.loading = this.disabled = true;
				let [err,res] =await this.$http.post('/user/bindemail',{
					email:this.email
				},{
					token:true,
					checkToken:true
				});
				
				if (!this.$http.errorCheck(err,res)){
					return this.loading = this.disabled = false;
				}
				
				// 绑定成功
				this.isbind = true;
				this.loading = this.disabled = false;
				// 修改状态，缓存
				this.User.userinfo.email = this.email; 
				uni.setStorageSync("userinfo",this.User.userinfo);
				return uni.showToast({
					title: '绑定成功！',
					success: () => {
						uni.navigateBack({ delta: 1 });
					}
				});
			}
		},
		watch: {
			email () { this.change() }
 		}
	}
</script>

<style scoped lang="scss">
.email {
	padding: 0 20rpx;
	.common-input {
		font-size: 30rpx;
		border-bottom: 1rpx solid #f4f4f4;
	}
	.user-set-btn-disabled {
		background: #f4f4f4 !important;
		color: #909090 !important;
	}
}
</style>
