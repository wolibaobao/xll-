<template>

	<div style="height:100vh;" :style="{background:color1}">

		<div class="left_sy">

		

			<el-menu :default-active='$route.path' router @select="handleSelect"  
				:collapse="isCollapse" :style="{background:color1}" class="el-menu-vertical-demo" 
				@open="handleOpen" @close="handleClose" background-color="{color1}"  text-color="#fff" active-text-color="yellow">

				<div data-v-6630d527="" class="imgWrap">
					<img src="../assets/dt.gif" alt="" class="animated dt">
				</div>

				<el-submenu index="/cont" >
					<div slot="title" style="background-color:none !important;">
						<i class="el-icon-location"></i>
						<span>
									主页
						</span>
					</div>

					<el-menu-item-group>
						<template slot="title">分组一</template>
						<el-menu-item index="/cont">
							首页
						</el-menu-item>
						
					</el-menu-item-group>

					 <el-submenu index="2">
						<template slot="title">表格管理</template>
						<el-menu-item index="/home/xuanxiang1">列表</el-menu-item>
					</el-submenu>
					

				</el-submenu>

				<!-- <router-link :to='{name:"home"}' class="wzbd" > -->
				<el-menu-item index="/home">
					<i class="el-icon-menu"></i>
					<span slot="title">
                                    {{$t('message.home')}}
                            </span>
				</el-menu-item>
				<!-- </router-link> -->

				<!-- <router-link :to='{name:"add_xx"}' class="wzbd"> -->
				<el-menu-item index="/add_xx">
					<i class="el-icon-edit"></i>
					<span slot="title">
                                     {{$t('message.add_xx')}}
                            </span>
				</el-menu-item>
				<!-- </router-link> -->

				<!-- <router-link :to='{name:"jiemeng"}' class="wzbd"> -->
				<el-menu-item index="/jiemeng">
					<i class="el-icon-document"></i>
					<span slot="title"> {{$t('message.jm')}}</span>
				</el-menu-item>
				<!-- </router-link> -->

				

				<!-- <router-link :to='{name:"wbk"}' class="wzbd"> -->
				<el-menu-item index="/wbk">
					<i class="el-icon-edit-outline"></i>
					<span slot="title">{{$t('message.wbk')}}</span>
				</el-menu-item>
				<!-- </router-link> -->

				<el-menu-item index="/xxlb">
					<i class="el-icon-edit-outline"></i>
					<span slot="title">信息列表</span>
				</el-menu-item>

				<!-- <router-link :to='{name:"grxx"}' class="wzbd"> -->
				<el-menu-item index="/grxx">
					<i class="el-icon-service"></i>
					<span slot="title">{{$t('message.gyzz')}}</span>
				</el-menu-item>
				<!-- </router-link> -->

			</el-menu>

		</div>

		<div class="youbian" :style="{padding:Left}">
			
			<div class="title" :style="{background:color1}" style="overflow: hidden;">

				<el-button :style="{background:color1}" @click="dk_gb" style="display: block;border:none;float:left;color:white;font-size: 25px;width:61px;border-radius:0px;" :icon="icon"></el-button>
				<img src="../assets/xll.png" alt="" class="logo">

				<div class="block_hf">
					<el-color-picker v-model="color1" @active-change="huanfu">换肤</el-color-picker>
				</div>

				<div class="yhxx">
					<!-- el-tooltip   文字提示 -->
					<div class="btn-fullscreen" @click="handleFullScreen" style="float: left;line-height:50px; width: 50px;text-align: center;cursor: pointer;color:white;">
						<el-tooltip effect="dark" :content="fullscreen ? `取消全屏`:`全屏`" placement="bottom">
							<i class="el-icon-rank"></i>
						</el-tooltip>
					</div>
					<span>{{$t('message.yonghu')}}：<b>{{name}}</b></span>
					<span @click="tc">{{$t('message.tuichu')}}</span>
					<!-- <span style="color:white;">{{$t('message.text')}}</span> -->
					<el-select v-model="selectValue" @change="langChange" placeholder="请选择语言" style="width:120px;">
						<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</div>

			</div>

			<div class="bao">
					
				<div class="you">
					<el-breadcrumb class="app-breadcrumb"  separator-class="el-icon-arrow-right" style="width:95%;margin:0 auto;line-height:50px;">
						<el-breadcrumb-item v-for="(item)  in levelList" :key="item.path" v-if="item.meta.title" style="color:#333;">
							<router-link :to="item.redirect||item.path" style="color:#333;">{{item.meta.title}}</router-link>
						</el-breadcrumb-item>
					</el-breadcrumb>

					<router-view>

					</router-view>

				</div>

			</div>

		</div>

	</div>

</template>
<script>
	export default {
		data() {
			return {
				color1: 'rgb(50, 65, 87)',
				isCollapse: false,
				icon: 'el-icon-view',
				Left: '0 0 0 180px',

				selectValue: '请选择语言',
				options: [{
					value: 'cn',
					label: '中文'
				}, {
					value: 'en',
					label: 'English'
				}],
				fullscreen: false,

				 levelList: null

			}
		},

		watch: {
			$route(to, from) {
			this.getBreadcrumb();
			}
		},

		methods: {
			handleOpen(key, keyPath) {
				console.log(key, '你当前点击的导航');
			},
			handleClose(key, keyPath) {
				console.log(key, '你当前缩回的导航');
			},
			handleSelect(key, keyPath) {
				// console.log(key,'你当前点击的导航');
				// if(key==2){
				// 	this.handleClose()
				// }
			},

			tc() {
				sessionStorage.removeItem('login')
				this.$router.push({
					path: 'login'
				})
			},
			huanfu(e) {
				console.log(e)
				localStorage.setItem('a', e)

			},
			dk_gb() {
				if(this.isCollapse) {
					this.isCollapse = false
					this.icon = 'el-icon-d-arrow-left'
					this.Left = '0 0 0 180px'
				} else {
					this.isCollapse = true
					this.icon = 'el-icon-view'
					this.Left = '0 0 0 60px'
				}
			},

			//语言切换
			langChange(e) {
				// console.log(e)
				localStorage.setItem('lang', e);
				this.$i18n.locale = e;
			},

			handleFullScreen() {
				let element = document.documentElement;
				if(this.fullscreen) {
					if(document.exitFullscreen) {
						document.exitFullscreen();
					} else if(document.webkitCancelFullScreen) {
						document.webkitCancelFullScreen();
					} else if(document.mozCancelFullScreen) {
						document.mozCancelFullScreen();
					} else if(document.msExitFullscreen) {
						document.msExitFullscreen();
					}
				} else {
					if(element.requestFullscreen) {
						element.requestFullscreen();
					} else if(element.webkitRequestFullScreen) {
						element.webkitRequestFullScreen();
					} else if(element.mozRequestFullScreen) {
						element.mozRequestFullScreen();
					} else if(element.msRequestFullscreen) {
						// IE11
						element.msRequestFullscreen();
					}
				}
				this.fullscreen = !this.fullscreen;
			},

			
				// * 生成面包屑的方法
				
			getBreadcrumb() {
				console.log(this.$route.matched)
				let matched = this.$route.matched.filter(item => item.name)
				const first = matched[0]
				if (first && first.name !== '首页') {
					matched = [{path: '/cont', meta: { title: '首页' }}].concat(matched)
				}
				this.levelList = matched;
			},

		},
		computed: {
			name() {
				console.log(this.$store.getters.name)
				return this.$store.getters.name

			}
		},

		mounted: function() {
			if(localStorage.getItem('a')) {
				this.color1 = localStorage.getItem('a');
			} else {
				this.color1 = 'rgb(50, 65, 87)'
			}
			if(this.isCollapse) {

				this.icon = 'el-icon-view'
			} else {

				this.icon = 'el-icon-d-arrow-left'
			}

			 this.getBreadcrumb();

		},

		created() {
			let that = this;
			console.log(localStorage.lang)
			that.selectValue = localStorage.lang == undefined ? 'cn' : localStorage.lang
		}
	}
</script>

<style>
	.left_sy {
		height: 100vh;
		position: fixed;
		z-index: 200;
	}
	
	.youbian {
		transition: 0.3s ease-out;
		/* padding-left: 160px; */
	}
	
	.el-menu-vertical-demo:not(.el-menu--collapse) {
		width: 180px;
		min-height: 400px;
		overflow: hidden;
		overflow:scroll; 
		overflow: -moz-scrollbars-none;
    	overflow: -moz-scrollbars-none;

	}
	.el-menu-vertical-demo::-webkit-scrollbar{
		display: none;
	}
	
	.el-menu-vertical-demo {
		border-right: 0px;
		height: 100%;
		z-index: 99;
		position: fixed;
	}
	
	.title {
		width: 100%;
		position: fixed;
		z-index: 2000;
	}
	
	.you {
		width: 100%;
		background: #fff;
		height: 100vh;
		padding-top: 50px;
	}
	
	.wzbd {
		color: white;
		text-decoration: none;
	}
	
	.block_hf {
		animation: mymove2 1s linear infinite;
		border-radius: 50%;
	}
	
	.el-color-picker__panel {
		z-index: 99999999999 !important;
	}
	
	.el-color-picker__trigger {
		border-radius: 50% !important;
		border: #fff 2px solid !important;
	}
	
	.el-color-picker__color-inner {
		border-radius: 50% !important;
	}
	
	.el-color-picker__color {
		border: none !important;
	}
	
	.el-color-picker__color {
		border-radius: 50% !important;
	}
	
	.el-color-picker__empty,
	.el-color-picker__icon {
		font-size: 0px !important;
	}
	
	.yhxx {
		position: fixed;
		right: 6%;
	}
	
	.block_hf {
		position: fixed;
		right: 2%;
		z-index: 9999999999;
		margin-top: 5px;
		box-shadow: 0 0 20px #fff
	}
	
	.yhxx span {
		height: 50px;
		line-height: 50px;
		margin: 0 10px;
		color: rgb(255, 255, 255);
		font-weight: bold;
		font-size: 14px;
	}
	
	.yhxx span b {
		color: red;
		/*渐变背景*/
		background-image: -webkit-linear-gradient(left, #fff, #f47920 10%, #ffd400 20%, #ffd400 30%, #ffd400 40%, #fff 50%, #f47920 60%, #d71345 70%, #fff 80%, #ffd400 90%, #fff);
		color: transparent;
		/*文字填充色为透明*/
		-webkit-text-fill-color: transparent;
		-webkit-background-clip:text;
		/*背景剪裁为文字，只将文字显示为背景*/
		background-size: 200% 100%;
		/*背景图片向水平方向扩大一倍，这样background-position才有移动与变化的空间*/
		/* 动画 */
		animation: masked-animation 1s infinite linear;
		font-size: 16px;
	}
	
	@keyframes masked-animation {
		0% {
			background-position: 0 0;
			/*background-position 属性设置背景图像的起始位置。*/
		}
		100% {
			background-position: -100% 0;
		}
	}
	
	
		
	
	.dt {
		width: 45%;
		height: 45%;
		border-radius: 50%;
		display: block;
		margin: 0 auto;
	}
	
	.imgWrap {
		width: 100%;
		padding: 20px 0;
	}
	

	.el-submenu__title {
		background: none !important;
	}
	
	.el-menu-item {
		background: none !important;
		
	}
	.el-menu-item:hover{
		background:#ffffff4a  !important;
	}
	.el-submenu__title:hover{
		background:#ffffff4a  !important;

	}
	
	.el-menu-item-group {
		background:#343a3ec2 !important;
	} 

	.el-submenu .el-menu {
		border: none;
		background: #343a3ec2;
	}
	
	
	
	.logo {
		display: block;
		float: left;
		width: 165px;
		margin-top: 7px;
		height: 35px;
	}
	
	.el-checkbox__label {
		display: initial !important;
	}
	
	.el-menu-item i {
		color: white;
	}
	.el-icon-location{
		color: white !important;
	}
	.el-submenu__icon-arrow{
		color: white !important;
	}
	
	.qh {
		position: fixed;
		right: 19%;
		top: 4px;
	}

	.el-menu--popup-right-start{
		background: none;
	}
	.el-menu--vertical{
		background:#32383b !important;
	}
	
</style>