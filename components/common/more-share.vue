<template>
	<view class="animated fadeIn faster" v-if="shareShow">
		<view class="more-share-mask" @tap="toggolShow"></view>
		<view class="more-share animated fadeInUp faster">
			<view class="more-share-title flex flex-item flex-JustCenter">分享到</view>
			<scroll-view scroll-x class="more-share-body">
				<block v-for="(val,index) in providerList" :key="index">
						<view class="more-share-item" hover-class="more-share-hover" @tap="share(val)">
							<view 
								class="icon iconfont flex flex-item flex-JustCenter"
								:class="['icon-'+val.icon.type,'more-share-'+val.icon.class]"
							></view>
							<view>{{val.name}}</view>
						</view>
				</block>
			</scroll-view>
			<view class="more-share-bot flex flex-item flex-JustCenter" @tap="toggolShow">取消</view>
		</view>
	</view>
</template>

<script>
export default {
	props:{
		shareShow: Boolean,
		sharedata: Object
	},
	data () {
		return {
				title: '',
				shareText: '',
				href:"",
				image: '',
				shareType:1, // 1文字 2图片 0图文 5小程序
				providerList: []
		}
	},
	watch: {
		sharedata(newValue, oldValue) {
			console.log(this.sharedata);
			this.title = newValue.title;
			this.shareText = newValue.content;
			this.href = newValue.url;
			this.image = newValue.titlepic;
			this.shareType = newValue.shareType;
		}
	},
	created () {
		this.getProvider();
	},
	mounted () {
		console.log(this.sharedata);
	},
	methods: {
		getProvider () {
			uni.getProvider({
				service: 'share',
				success: (e) => {
					// console.log('success', e);
					let data = []
					for (let i = 0; i < e.provider.length; i++) {
						switch (e.provider[i]) {
							case 'weixin':
								data.push({
									name: '微信好友',
									id: 'weixin',
									icon: {
										type: 'weixin',
										class: 'wx'
									},
									sort:0
								})
								data.push({
									name: '微信朋友圈',
									id: 'weixin',
									icon: {
										type: 'weixin',
										class: 'friend'
									},
									type:'WXSenceTimeline',
									sort:1
								})
								break;
							case 'sinaweibo':
								data.push({
									name: '新浪微博',
									id: 'sinaweibo',
									icon: {
										type: 'xinlangweibo',
										class: 'xl'
									},
									sort:2
								})
								break;
							case 'qq':
								data.push({
									name: 'QQ',
									id: 'qq',
									icon: {
										type: 'qq',
										class: 'qq'
									},
									sort:3
								})
								break;
							default:
								break;
						}
					}
					this.providerList = data.sort((x,y) => {
						return x.sort - y.sort
					});
				},
				fail: (e) => {
					console.log('获取分享通道失败', e);
					uni.showModal({
						content:'获取分享通道失败',
						showCancel:false
					})
				}
			});
		},
		toggolShow () {
			this.$emit('toggolShow')
			// console.log(this.providerList);
		},
		async share(e) {
			console.log('分享通道:'+ e.id +'； 分享类型:' + this.shareType);
			console.log(this.shareText,this.shareType);
			if(!this.shareText && (this.shareType === 1 || this.shareType === 0)){
				uni.showModal({
					content:'分享内容不能为空',
					showCancel:false
				})
				return;
			}
			
			if(!this.image && (this.shareType === 2 || this.shareType === 0)){
				uni.showModal({
					content:'分享图片不能为空',
					showCancel:false
				})
				return;
			}
			
			let shareOPtions = {
				provider: e.id,
				scene: e.type && e.type === 'WXSenceTimeline' ? 'WXSenceTimeline' : 'WXSceneSession', //WXSceneSession”分享到聊天界面，“WXSenceTimeline”分享到朋友圈，“WXSceneFavorite”分享到微信收藏     
				type: this.shareType,
				success: (e) => {
					console.log('success', e);
					uni.showModal({
						content: '分享成功',
						showCancel:false
					})
				},
				fail: (e) => {
					console.log('fail', e)
					uni.showModal({
						content: e.errMsg,
						showCancel:false
					})
				},
				complete:function(){
					console.log('分享操作结束!')
				}
			}
			
			switch (this.shareType){
				case 0:
					shareOPtions.summary = this.shareText;
					shareOPtions.imageUrl = this.image;
					shareOPtions.title = this.title;
					shareOPtions.href = this.href;
					break;
				case 1:
					shareOPtions.summary = this.shareText;
					break;
				case 2:
					shareOPtions.imageUrl = this.image;
					break;
				case 5:
					shareOPtions.imageUrl = this.image ? this.image : 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/app/share-logo@3.png'
					shareOPtions.title = this.title;
					shareOPtions.miniProgram = {
						id:'gh_33446d7f7a26',
						path:'/pages/tabBar/component/component',
						webUrl:'https://uniapp.dcloud.io',
						type:0
					};
					break;
				default:
					break;
			}
			
			if(shareOPtions.type === 0 && plus.os.name === 'iOS'){//如果是图文分享，且是ios平台，则压缩图片 
				shareOPtions.imageUrl = await this.compress();
			}
			if (shareOPtions.provider === 'sinaweibo') {
				shareOPtions.type = 1;
				shareOPtions.imageUrl = '';
			}
			if (shareOPtions.provider === 'qq') {
				shareOPtions.type = 1;
				shareOPtions.href = this.href;
				shareOPtions.title = this.title;
			}
			uni.share(shareOPtions);
		},
		compress(){//压缩图片 图文分享要求分享图片大小不能超过20Kb
			console.log('开始压缩');
			let img = this.image;
			return new Promise((res) => {
				var localPath = plus.io.convertAbsoluteFileSystem(img.replace('file://', ''));
				console.log('after' + localPath);
				// 压缩size
				plus.io.resolveLocalFileSystemURL(localPath, (entry) => {
					entry.file((file) => {// 可通过entry对象操作图片 
						console.log('getFile:' + JSON.stringify(file));
						if(file.size > 20480) {// 压缩后size 大于20Kb
							plus.zip.compressImage({
								src: img,
								dst: img.replace('.jpg', '2222.jpg').replace('.JPG', '2222.JPG'),
								width: '10%',
								height: '10%',
								quality: 1,
								overwrite: true
							}, (event) => {
								console.log('success zip****' + event.size);
								let newImg = img.replace('.jpg', '2222.jpg').replace('.JPG', '2222.JPG');
								res(newImg);
							}, function(error) {
								uni.showModal({
									content:'分享图片太大,需要请重新选择图片!',
									showCancel:false
								})
							});
						}
					});
				}, (e) => {
					console.log('Resolve file URL failed: ' + e.message);
					uni.showModal({
						content:'分享图片太大,需要请重新选择图片!',
						showCancel:false
					})
				});
			})
		}
	}
}
</script>

<style scoped lang="scss">
.more-share-mask {
	background: rgba(50,50,50,.5);
	position: fixed;
	left: 0;
	top: 0;
	right: 0;
	bottom: 0;
	z-index: 100;
}
.more-share {
	position: fixed;
	bottom:0;
	left: 0;
	right: 0;
	background: #fff;
	z-index: 101;
	
	.more-share-title,.more-share-bot {
		font-size: 32rpx;
		padding: 25rpx;
	}
	.more-share-title {}
	.more-share-body {
		display: flex;
		white-space: nowrap;
		width: 100%;
		height: 200rpx;
		border-top: 1rpx solid #eee;
		border-bottom: 1rpx solid #eee;
		.more-share-item {
			width: 25%;
			display: inline-flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			height: 100%;
			&>view:first-child {
				width: 100rpx;
				height: 100rpx;
				border-radius: 100%;
				font-size: 55rpx;
				color:#fff;
			}
			&>view:last-child {
				color: #7a7a7a;
			}
		}
		.more-share-hover {
			background: #eee;
		}
		.more-share-wx {
			background: #2ad198;
		}
		.more-share-friend {
			background: #514d4c;
		}
		.more-share-xl {
			background: #ee5e5e;
		}
		.more-share-qq {
			background: #4a73ba;
		}
	}
	.more-share-bot {}
}
</style>
