<template>
	<view class="uni-list list-pd">
		<view class="uni-list-cell cell-pd">
			<view class="uni-uploader">
				<view class="uni-uploader-head">
					<view class="uni-uploader-title">点击可预览选好的图片</view>
					<view class="uni-uploader-info">{{imageList.length}}/9</view>
				</view>
				<view class="uni-uploader-body">
					<view class="uni-uploader__files">
						<block v-for="(image,index) in imageList" :key="index">
							<view class="uni-uploader__file">
								<view class="icon iconfont icon-shanchu" @tap="delect(index)"></view>
								<image class="uni-uploader__img" :src="image" :data-src="image" @tap="previewImage"></image>
							</view>
						</block>
						<view class="uni-uploader__input-box">
							<view class="uni-uploader__input" @tap="chooseImage"></view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
var sourceType = [
		['camera'],
		['album'],
		['camera', 'album']
	]
var sizeType = [
	['compressed'],
	['original'],
	['compressed', 'original']
]
export default {
	data () {
		return {
			imageList: [],
			sourceTypeIndex: 2,
			sourceType: ['拍照', '相册', '拍照或相册'],
			sizeTypeIndex: 2,
			sizeType: ['压缩', '原图', '压缩或原图'],
			countIndex: 8,
			count: [1, 2, 3, 4, 5, 6, 7, 8, 9]
		}
	},
	methods: {
		chooseImage: async function() {
			if (this.imageList.length === 9) return;
			
			uni.chooseImage({
				sourceType: sourceType[this.sourceTypeIndex],
				sizeType: sizeType[this.sizeTypeIndex],
				count: this.imageList.length + this.count[this.countIndex] > 9 ? 9 - this.imageList.length : this.count[this.countIndex],
				success: (res) => {
					this.imageList = this.imageList.concat(res.tempFilePaths);
					this.$emit('upload', this.imageList)
				}
			})
		},
		previewImage: function(e) {
			var current = e.target.dataset.src
			uni.previewImage({
				current: current,
				urls: this.imageList
			})
		},
		delect (index) {
			uni.showModal({
				title: '提示',
				content: '是否删除该图片',
				success: (res) => {
					if (res.confirm) {
						this.imageList.splice(index,1)
						this.$emit('upload', this.imageList)
					}
				}
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.cell-pd {
	padding: 22upx 30upx;
}

.list-pd {
	margin-top: 50upx;
}
.uni-uploader__file {
	position: relative;
	overflow: hidden;
	
	.icon-shanchu {
		position: absolute;
		right: 0;
		top: 0;
		background: rgba(0,0,0,.5);
		color: #fff;
		padding: 2rpx 10rpx;
		border-radius: 10rpx;
		z-index: 100; 
	}
}
</style>
