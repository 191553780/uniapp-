<template>
	<view class="email">
		<input type="text"
			class="uni-input common-input" 
			placeholder="输入邮箱" 
			value=""
			v-model="email"
		/>
		<input 
			type="text" 
			class="uni-input common-input" 
			placeholder="输入密码"
			password
			value="" 
			v-model="password"
		/>
		<button
			class="user-set-btn"
			:class="{'user-set-btn-disabled':disabled}"
			type="primary"
			:disabled="disabled"
			:loading="loading"
			@tap="submit"
		>
			完成
		</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				email: '',
				password: '',
				disabled: true,
				loading: false
			}
		},
		methods: {
			// 监听输入框
			change () {
				if (this.email && this.password) {
					this.disabled = false;
				}
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
				
				if (!this.password && this.password == '') {
					uni.showToast({
						title: '密码不能为空',
						icon: 'none'
					})
					return false
				}
				return true
			},
			// 提交
			submit () {
				this.loading = true
				this.disabled = true
				if (!this.check()) {
					this.loading = false
					return;
				}
				uni.showToast({
					title:'验证通过'
				})
				this.loading = false
				this.disabled = false
			}
		},
		watch: {
			email () { this.change() },
			password () { this.change() }
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
