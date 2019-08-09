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
			<input 
				type="text" 
				class="uni-input common-input" 
				placeholder="昵称/手机号/邮箱" 
				value="" 
			/>
			<view class="login-pass-box">
				<input 
					type="text" 
					class="uni-input common-input" 
					placeholder="请输入密码"
					value="" 
					password
				/>
				<view class="forget flex flex-item flex-JustCenter">忘记密码</view>
			</view>
			
			<button
				class="user-set-btn"
				:class="{'user-set-btn-disabled':disabled}"
				type="primary"
				plain
				:disabled="disabled"
				:loading="loading"
				@tap="submit"
			>
				完成
			</button>
		</view>
		<!-- 登录状态切换 -->
		<view class="login-status flex flex-item flex-JustCenter login-padding">
			验证码登录 <view class="icon iconfont icon-jinru login-font-color"></view>
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
			disabled: true,
			loading: false
		}
	},
	components: {
		uniStatusBar,
		otherLogin
	},
	methods: {
		// 返回上一步
		back () {
			console.log('返回');
		},
		// 登录
		submit () {
			console.log('登录');
		}
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
		.login-pass-box {
			position: relative;
			.forget {
				position: absolute;
				right: 0;
				top: 0;
				bottom: 0;
				width: 150rpx;
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
