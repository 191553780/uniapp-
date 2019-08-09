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
				<view>{{sex}}</view>
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
				<view>{{feel}}</view>
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
let info = {
				sex: ['不限','男','女'],
				feel: ['秘密','未婚','已婚'],
				job: ['秘密','IT','老师']
			}
export default {
	data() {
		return {
			username: '啦啦啦',
			userpic: '../../static/demo/userpic/20.jpg',
			sex: '不限',
			feel: '未婚',
			job: 'IT',
			birthday: '1999-09-09',
			cityPickerValueDefault: [0, 0, 1],
			pickerText: '中国 重庆'
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
	methods: {
		// 修改头像
		changeUserPic () {
			uni.chooseImage({
				count: 1,
				sizeType: ['compressed'],
				success: (res) => {
					this.userpic = res.tempFilePaths
				}
			})
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
							this.sex = arr[res.tapIndex]
						break;
						case 'feel':
							this.feel = arr[res.tapIndex]
						break;
						case 'job':
							this.job = arr[res.tapIndex]
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
		submit () {
			
		}
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
