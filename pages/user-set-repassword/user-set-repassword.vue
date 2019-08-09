<template>
	<view class="repassword">
		<input type="text"
			class="uni-input common-input" 
			placeholder="输入旧密码" 
			value="" 
			v-model="oldPass"
			password
		/>
		<input 
			type="text" 
			class="uni-input common-input" 
			placeholder="输入新密码" 
			value="" 
			v-model="newPass"
			password
		/>
		<input 
			type="text" 
			class="uni-input common-input" 
			placeholder="输入确认密码"
			value="" 
			v-model="reNewPass"
			password
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
				oldPass: '',
				newPass: '',
				reNewPass: '',
				disabled: true,
				loading: false
			}
		},
		methods: {
			// 监听输入框
			change () {
				if (this.oldPass && this.newPass && this.reNewPass) {
					this.disabled = false;
				}
			},
			// 验证
			check () {
				if (!this.oldPass && this.oldPass == '') {
					uni.showToast({
						title: '请填写旧密码',
						icon: 'none'
					})
					return false
				}
				if (!this.newPass && this.newPass == '') {
					uni.showToast({
						title: '请填写新密码',
						icon: 'none'
					})
					return false
				}
				if (!this.reNewPass && this.reNewPass == '') {
					uni.showToast({
						title: '请填写确认密码',
						icon: 'none'
					})
					return false
				}
				if (this.newPass !== this.reNewPass) {
					uni.showToast({
						title: '密码不一致',
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
			oldPass () { this.change() },
			newPass () { this.change() },
			reNewPass () { this.change() },
		}
	}
</script>

<style scoped lang="scss">
.repassword {
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
