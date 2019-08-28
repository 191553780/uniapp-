<template>
	<view class="info">
		<view class="user-set-info-list flex flex-item flex-JustBetween">
			<view class="user-title">头像</view>
			<view class="user-edit flex flex-item flex-JustBetween" @tap="changeUserPic">
				<image :src="userpic" mode="aspectFill" lazy-load></image>
				<view class="icon iconfont icon-bianji"></view>
			</view>
		</view>
		<view class="user-set-info-list flex flex-item flex-JustBetween">
			<view class="user-title">昵称</view>
			<view class="user-edit flex flex-item flex-JustBetween">
				<input type="text" v-model="username" value="" />
				<view class="icon iconfont icon-bianji"></view>
			</view>
		</view>
		<view class="user-set-info-list flex flex-item flex-JustBetween">
			<view class="user-title">性别</view>
			<view class="user-edit flex flex-item flex-JustBetween" @tap="change('sex')">
				<view>{{sexArr[sex]}}</view>
				<view class="icon iconfont icon-bianji"></view>
			</view>
		</view>
		<view class="user-set-info-list flex flex-item flex-JustBetween">
			<view class="user-title">生日</view>
			<view class="user-edit flex flex-item flex-JustBetween">
				<picker mode="date" :value="birthday" :start="startDate" :end="endDate" @change="bindDateChange">
					<view>{{birthday}}</view>
				</picker>
				<view class="icon iconfont icon-bianji"></view>
			</view>
		</view>
		<view class="user-set-info-list flex flex-item flex-JustBetween">
			<view class="user-title">情感</view>
			<view class="user-edit flex flex-item flex-JustBetween" @tap="change('feel')">
				<view>{{qgArr[feel]}}</view>
				<view class="icon iconfont icon-bianji"></view>
			</view>
		</view>
		<view class="user-set-info-list flex flex-item flex-JustBetween" @tap="change('job')">
			<view class="user-title">职业</view>
			<view class="user-edit flex flex-item flex-JustBetween">
				<view>{{job}}</view>
				<view class="icon iconfont icon-bianji"></view>
			</view>
		</view>
		<view class="user-set-info-list flex flex-item flex-JustBetween" @tap="showMulLinkageThreePicker">
			<view class="user-title">家乡</view>
			<view class="user-edit flex flex-item flex-JustBetween">
				<view>{{pickerText}}</view>
				<view class="icon iconfont icon-bianji"></view>
			</view>
		</view>
		
		<button class="user-set-btn" type="primary" @tap="submit">完成</button>
		
		<mpvue-city-picker 
			themeColor="#007AFF" 
			ref="mpvueCityPicker" 
			:pickerValueDefault="cityPickerValueDefault"
			@onConfirm="onConfirm">
		</mpvue-city-picker>
	</view>
</template>

<script>
import mpvueCityPicker from '@/components/mpvue-citypicker/mpvueCityPicker.vue'
import cityData from '@/common/city.data.js'
import Time from '../../common/time.js';
let info = {
				sex: ['不限','男','女'],
				feel: ['秘密','未婚','已婚'],
				job: ['秘密','IT','老师']
			}
export default {
	data() {
		return {
			sexArr:info.sex,
			qgArr:info.feel,
			username: '',
			userpic: '',
			sex: 0,
			feel: 0,
			job: '',
			birthday: '',
			cityPickerValueDefault: [0, 0, 1],
			pickerText: ''
		}
	},
	computed: {
		startDate() {
				return this.getDate('start');
		},
		endDate() {
				return this.getDate('end');
		}
	},
	components: {
		mpvueCityPicker
	},
	onLoad() {
		this.userpic = this.User.userinfo.userpic;
		this.username = this.User.userinfo.username;
		this.sex = this.User.userinfo.userinfo.sex || 0;
		this.qg = this.User.userinfo.userinfo.qg || 0;
		this.job = this.User.userinfo.userinfo.job || "请填写";
		this.birthday = this.User.userinfo.userinfo.birthday || "请填写";
		this.pickerText = this.User.userinfo.userinfo.path || "请填写";
	},
	onBackPress() {
	  if (this.$refs.mpvueCityPicker.showPicker) {
	  	this.$refs.mpvueCityPicker.pickerCancel();
	    return true;
	  }
	},
	onUnload() {
		if (this.$refs.mpvueCityPicker.showPicker) {
			this.$refs.mpvueCityPicker.pickerCancel()
		}
	},
	methods: {
		// 修改头像
		async changeUserPic () {
			let [err,res] =await uni.chooseImage({
					count:1,
					sizeType:['compressed']
				});
				
			if (!res) return;
			// 上传
			uni.showLoading({ title: '上传中...', mask: false });
			let [err2,res2] = await this.$http.upload('/edituserpic',{
				name: 'userpic',
				filePath: res.tempFilePaths[0],
				token:true,
				checkToken:true
			});
			// 请求失败
			let data = JSON.parse(res2.data);
			// 上传失败
			if (err2 || data.errorCode) {
				uni.showToast({ title: data.msg ? data.msg : '上传失败', icon:"none" });
				uni.hideLoading();
				return false;
			}
			// 成功
			uni.hideLoading();
			uni.showToast({ title: '修改头像成功!' });
			this.userpic = data.data;
			console.log(res2);
			// 修改状态，存储
			this.User.userinfo.userpic = this.userpic;
			uni.setStorageSync("userinfo",this.User.userinfo);
		},
		change(val) {
			let arr = []
			switch (val){
				case 'sex':
					arr = info.sex
				break;
				case 'feel':
					arr = info.feel
				break;
				case 'job':
					arr = info.job
				break
			}
			uni.showActionSheet({
				itemList:arr,
				success: (res) => {
					switch (val){
						case 'sex':
							this.sex = res.tapIndex
						break;
						case 'feel':
							this.feel = res.tapIndex
						break;
						case 'job':
							this.job = res.tapIndex
						break;
					}
				}
			})
		},
		// 日期选择器
		bindDateChange (e) {
			this.birthday = e.target.value
		},
		/*----- 三级联动 开始 ------*/
		showMulLinkageThreePicker() {
			this.$refs.mpvueCityPicker.show()
		},
		onConfirm(e) {
			this.pickerText = e.label
		},
		/* ---结束--- */
		getDate(type) {
			const date = new Date();
			let year = date.getFullYear();
			let month = date.getMonth() + 1;
			let day = date.getDate();
		
			if (type === 'start') {
					year = year - 60;
			} else if (type === 'end') {
					year = year + 2;
			}
			month = month > 9 ? month : '0' + month;;
			day = day > 9 ? day : '0' + day;
			return `${year}-${month}-${day}`;
		},
		// 提交
		async submit(){
			let data = {
				name:this.username,
				sex:this.sex,
				qg:this.feel,
				job:this.job,
				birthday:this.birthday,
				path:this.pickerText,
				age:Time.gettime.getAgeByBirthday(this.birthday),
			};
			let [err,res] = await this.$http.post('/edituserinfo',data,{
				token:true,
				checkToken:true
			});
			// 请求失败处理
			if (!this.$http.errorCheck(err,res)) return;
			// 成功
			uni.showToast({ title: '修改成功！' });
			// 修改状态，缓存
			this.User.userinfo.username = this.username;
			this.User.userinfo.userinfo = data;
			uni.setStorageSync('userinfo',this.User.userinfo);
		} 
	}
}
</script>

<style scoped lang="scss">
.info {
	padding: 0 20rpx;
	.user-set-info-list {
		padding: 20rpx;
		border-bottom: 1rpx solid #f4f4f4;
		.user-title {
			font-size: 32rpx;
			font-weight: bold;
			color: #989898;
		}
		.user-edit {
			&>image {
				width: 80rpx;
				height: 80rpx;
				border-radius: 100%;
			}
			&>input {
				text-align: right;
			}
			&>view:last-of-type {
				margin-left: 20rpx;
				color: #989898;
			}
		}
	}
}
</style>
