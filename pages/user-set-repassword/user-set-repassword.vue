<template>
	<view class="repassword">
		<input type="text"
			class="uni-input common-input" 
			placeholder="输入旧密码" 
			value="" 
			v-model="oldPass"
			password
			v-if="hasPassword"
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
				hasPassword:false,
				oldPass: '',
				newPass: '',
				reNewPass: '',
				disabled: true,
				loading: false
			}
		},
		onLoad(e) {
			this.hasPassword = !!(e.password && e.password !== "false");
		},
		watch:{
			oldpassword(val){
				this.change();
			},
			newpassword(val){
				this.change();
			},
			renewpassword(val){
				this.change();
			}
		},
		methods: {
			// 监听输入框
			change () {
				if(this.newPass && this.reNewPass){
					return this.disabled=false;
				}
				if (this.hasPassword && !this.oldPass) {
					return this.disabled = true;
				}
				this.disabled=true;
			},
			// 验证
			check () {
				if (this.hasPassword && (!this.oldPass && this.oldPass == '')) {
					uni.showToast({ title: '旧密码不能为空', icon:"none" });
					return false
				}
				if (!this.newPass && this.newPass == '') {
					uni.showToast({ title: '新密码不能为空', icon:"none" });
					return false
				}
				if (!this.reNewPass && this.reNewPass == '') {
					uni.showToast({ title: '确认密码不能为空', icon:"none" });
					return false
				}
				if (this.newPass !== this.reNewPass) {
					uni.showToast({ title: '确认密码和新密码不一致', icon:"none" });
					return false
				}
				return true
			},
			// 提交
			async submit () {
				if(!this.check()) return;
				this.loading = this.disabled = true
				
				let [err,res] = await this.$http.post('/repassword',{
					oldpassword:this.oldPass || 0,
					newpassword:this.newPass,
					renewpassword:this.reNewPass,
				},{
					token:true,
					checkToken:true
				})
				
				if(!this.$http.errorCheck(err,res)){
					this.loading = this.disabled = false;
					return;
				}
				
				// 修改状态，缓存
				this.User.userinfo.password = true;
				uni.setStorageSync('userinfo',this.User.userinfo);
				this.loading = this.disabled = false;
				return uni.showToast({
					title: '修改密码成功！',
					success: () => {
						uni.navigateBack({ delta: 1 });
					}
				});
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
