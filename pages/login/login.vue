<template>
	<view class="login">
		<!-- 状态条 -->
		<uni-status-bar bjColor="#ffe933"></uni-status-bar>
		<!-- 关闭按钮 -->
		<view class="icon iconfont icon-guanbi1" @tap="back"></view>
		<!-- 引入背景图 -->
		<view class="login-head">
			<image src="../../static/common/loginhead.png" mode="widthFix" lazy-load></image>
		</view>
		<!-- 输入框 -->
		<view class="login-input">
			<!-- 账号密码登录 -->
			<template v-if="!status">
				<input
					type="text" 
					class="uni-input common-input" 
					placeholder="昵称/手机号/邮箱" 
					value="" 
					v-model="username"
				/>
				<view class="login-item-box">
					<input 
						type="text" 
						class="uni-input common-input forget-input" 
						placeholder="请输入密码"
						value="" 
						password
						v-model="pass"
					/>
					<view class="forget flex flex-item flex-JustCenter">忘记密码?</view>
				</view>
			</template>
			<!-- 手机验证码登录 -->
			<template v-else>
				<view class="login-item-box">
					<view class="phone flex flex-item flex-JustCenter">+86</view>
					<input
						type="text" 
						class="uni-input common-input phone-input" 
						placeholder="手机号" 
						value=""
						v-model="phone"
					/>
				</view>
				<view class="login-item-box">
					<input 
						type="text" 
						class="uni-input common-input forget-input" 
						placeholder="请输入验证码"
						value="" 
						password
						v-model="code"
					/>
					<view class="forget code flex flex-item flex-JustCenter" @tap="getCode">
						<view class="flex flex-item flex-JustCenter">{{!codeTime ? '获取验证码' : codeTime + 's'}}</view>
					</view>
				</view>
			</template>
			
			<button
				class="user-set-btn"
				:class="{'user-set-btn-disabled':disabled}"
				type="primary"
				:disabled="disabled"
				:loading="loading"
				@tap="submit"
			>
				登录
			</button>
		</view>
		<!-- 登录状态切换 -->
		<view class="login-status flex flex-item flex-JustCenter login-padding" @tap="changeSatus">
			{{status ? '账号密码登录' : '验证码登录'}} <view class="icon iconfont icon-jinru login-font-color"></view>
		</view>
		<!-- 第三方登录 -->
		<view class="other-login login-padding">			
			<view class="other-login-title flex flex-JustCenter flex-item login-font-color">第三方登录</view>
			<other-login></other-login>
		</view>
		
		<!-- 协议 -->
		<view class="login-rule flex flex-item flex-JustCenter login-padding login-font-color">
			注册即代表您同意
			<view>《xxx协议》</view>
		</view>
	</view>
</template>

<script>
import uniStatusBar from '@/components/uni-status-bar/uni-status-bar.vue'
import otherLogin from '@/components/home/other-login.vue'

export default {
	data() {
		return { 
			status: false, // false 账号密码登录 true 手机登录
			disabled: true,
			loading: false,
			username: '',
			pass: '',
			phone: '',
			code: '',
			codeTime: 0
		}
	},
	components: {
		uniStatusBar,
		otherLogin
	},
	methods: {
		// 初始化表单
		initInput () {
			this.username = '',
			this.pass = '',
			this.phone = '',
			this.code = ''
		},
		// 返回上一步
		back () {
			uni.navigateBack({
				delta:1
			})
			console.log('返回');
		},
		// 登录
		submit () {
			// 账号密码登录
			if (!this.status) {
				return
			} 
			// 验证码登录
			if (!this.isPhone()) {
				uni.showToast({
					title: '请输入正确的手机号码',
					icon: 'none'
				})
				return;
			}
			
			console.log('登录');
		},
		// 切换登录状态
		changeSatus () {
			this.status = !this.status
			this.initInput()
		},
		// 改变按钮状态
		changeBtn () {
			if ((this.username && this.pass) || (this.phone && this.code)) {
				this.disabled = false;
				return;
			}
			this.disabled = true
		},
		// 验证手机号码
		isPhone () {
			let pattern = /^1[34578]\d{9}$/;
			return pattern.test(this.phone)
		},
		getCode () {
			if (this.codeTime > 0) { return; }
			// 验证手机号合法性
			
			if (!this.isPhone()) {
				uni.showToast({
					title: '请输入正确的手机号码',
					icon: 'none'
				})
				return;
			}
			
			// 请求服务器
			this.codeTime = 10
			let timer = setInterval(() => {
				this.codeTime --;
				if (this.codeTime < 1) {
					clearInterval(timer)
					this.codeTime = 0
				}
			},1000)
		}
	},
	watch: {
		username (val) { this.changeBtn() },
		pass (val) { this.changeBtn() },
		phone (val) { this.changeBtn() },
		code (val) { this.changeBtn() }
	}
}
</script>

<style scoped lang="scss">
.login {
	.login-padding {
		padding: 20rpx 0;
	}
	.login-font-color {
		color: #bbb;
	}
	.icon-guanbi1 {
		position: fixed;
		top: 60rpx;
		left: 30rpx;
		font-size: 40rpx;
		font-weight: bold;
		color: #332f0a;
		z-index: 100;
	}
	.login-head {
		image {
			width: 100%;
		}
	}
	.login-input {
		padding: 0 20rpx;
		.common-input {
			font-size: 30rpx;
			border-bottom: 1rpx solid #f4f4f4;
		}
		.login-item-box {
			position: relative;
			.phone,.forget {
				position: absolute;
				top: 0;
				bottom: 0;
			}
			.phone {
				left: 0;
				width: 100rpx;
				font-weight: bold;
			}
			.phone-input {
				padding-left: 100rpx;
			}
			.code {
				&>view{
					background: #eee;
					border-radius: 10rpx;
					font-size: 25rpx;
					width: 150rpx;
					padding: 10rpx 0;
				}
			}
			
			.forget {
				right: 0;
				width: 150rpx;
			}
			.forget-input {
				padding-right: 150rpx;;
			}
		}
		.user-set-btn-disabled {
			background: #f4f4f4 !important;
			color: #909090 !important;
		}
	}
	.other-login {
		.other-login-title { 
			position: relative; 
			&:before,&:after {
				content: '';
				position: absolute;
				background: #bbb;
				height: 1rpx;
				width: 100rpx;
				top: 50%;
			}
			&:before {
				left: 25%;
			}
			&:after {
				right: 25%;
			}
		}
	}
}
</style>
