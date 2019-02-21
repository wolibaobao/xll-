<template>
	
		<div class="cont animated zoomIn">

			<!-- <h1 :style="{'color':color1,'border-bottom':'solid 2px'+color1 +'!important'}"  class="shouye">我是首页</h1> -->


			<div style="margin-top: 15px;width:20%;float:left;">
				<el-input placeholder="请输入搜索内容" v-model="input5" class="input-with-select">
					<!-- <el-button slot="append" icon="el-icon-search"></el-button> -->
				</el-input>
			</div>
			<el-button type="danger" plain round style="margin-top: 15px;margin-left:10px;" @click="daochu">导出excel</el-button>
			<el-button type="danger" round style="margin-top: 15px;margin-left:10px;" @click="Delete_bg">批量删除</el-button>			
			


			<el-table ref="multipleTable" :data="qbxx" id="out-table" 
			tooltip-effect="msg" style="width: 100%;margin-top: 10px;" @selection-change="handleSelectionChange" @filter-change="handleFilterChange2">
				<el-table-column type="selection" width="55"></el-table-column>
				
				<el-table-column prop="name" label="姓名" width="auto">
				</el-table-column>
				<el-table-column prop="tel" label="电话" width="auto"> </el-table-column>
				<el-table-column prop="xuanxiang" label="活动区域" width="auto"> </el-table-column>
				<!-- <el-table-column prop="date1" label="日期" width="auto"> </el-table-column>
				<el-table-column prop="date2" label="时间" width="auto"> </el-table-column> -->
				<el-table-column  label="性别" width="auto"> 					
						<template slot-scope="scope">
                        <el-button size="mini" :type="qh_xb" plain  v-if="scope.row.radio=='女性'?qh_xb='danger':(scope.row.radio=='不男不女'?qh_xb='d':qh_xb='primary')"  >{{scope.row.radio}}  </el-button>
                      </template>
				</el-table-column>
				<!-- <el-table-column prop="sjfw" label="开始时间-结束时间" width="auto"> </el-table-column> -->
				<el-table-column prop="" label="开始时间-结束时间" width="auto"> 

						<template slot-scope="scope">
                        <span>{{scope.row.sjfw[0]+'─'+scope.row.sjfw[1]}}</span>
                      </template>

				</el-table-column>

				<!-- <el-table-column prop="checked" label="技能" width="auto"></el-table-column> -->
				<el-table-column prop="" label="技能" width="auto"> 
					
						<template slot-scope="scope">
                        <el-button size="mini" style="padding: 2.5px;" type="success"  plain  v-for="(i,index) in scope.row.checked" :key="index">{{i}}  </el-button>
                      </template>

				</el-table-column>
				
				<el-table-column prop="textarea" label="详细信息" width="auto"> </el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">

						<el-button size="mini"  v-loading.fullscreen.lock="fullscreenLoading" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
						<el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
					</template>
				</el-table-column>

			</el-table>
			<br>
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[5, 10, 20, 40]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="qbsj.length">
			</el-pagination>

			<!-- <p style="margin:20px 0">你所选的如下：</p>
			<ul class="aa" v-for="(i,index) in userList" :key="index">

				<li>ID:{{index+1}}</li>
				<li>姓名{{i.name}}</li>
				<li>电话{{i.tel}}</li>
				<li>性别{{i.radio}}</li>
			</ul> -->

			<!-- {{userList}} -->



			<div class="cont_bj animated slideInDown" v-show="zhezao">
				<div class="ch" @click="zhezao=false">X</div>
				<!-- <h1>现在你正在编辑的是<strong style="color:red">{{name}}</strong></h1> -->
				<p>姓名：</p>
				<el-input placeholder="Please input" v-model="name"></el-input>
				<p>电话：</p>
				<el-input placeholder="Please input" v-model="tel"></el-input>

				<p>添加选项：</p>

				<el-checkbox-group v-model="checked" @change="test">  
					<el-checkbox v-for="item in checkList" :key="item.label" :label="item.label">{{item.label}}</el-checkbox>
				</el-checkbox-group>

				
				<p>活动区域:</p>
					<el-select v-model="region" placeholder="请选择活动区域">
						{{region}}
						<el-option label="A区" value="A区"></el-option>
						<el-option label="B区" value="B区"></el-option>
					</el-select>
				

				<p>开始日期-结束日期:</p>
					<el-date-picker
						v-model="sjfw" value-format="yyyy-MM-dd"
						type="daterange"
						range-separator="至"
						start-placeholder="开始日期"
						end-placeholder="结束日期">
					</el-date-picker>
				

				<p>性别：</p>
				<el-radio v-model="radio" label="男性">男性</el-radio>
				<el-radio v-model="radio" label="女性">女性</el-radio>
				<el-radio v-model="radio" label="不男不女">不男不女</el-radio>
				<p>详细内容：</p>
				<el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea">
				</el-input>

				<el-row>
					<br>
					<el-button type="primary" @click="add">提交</el-button>

				</el-row>
			</div>

			<div class="zhezao" v-show="zhezao"></div>

		</div>


</template>
<script>
	import axios from "axios";
	import { Loading } from "element-ui";

	//导出Excel  
	import FileSaver from 'file-saver'
	import XLSX from 'xlsx'

	export default {
		props: {
			title: {
				type: String
			}
		},
		data() {
			return {
				
				msg: [],
				fullscreenLoading: false,
				xuandenr: [],
				zhezao: false,
				name: "",
				tel: "18811692640",
				checkList: "",
				radio: "女性",
				region:'',
				sjfw:['2017','2018'],

				input5: "",
				textarea: "",
				checked: [],
				checkList: [{
						id: "001",
						label: "Vue.js"
					},
					{
						id: "002",
						label: "Angular.js"
					},
					{
						id: "002",
						label: "React.js"
					},
					{
						id: "002",
						label: "Node.js"
					},
					{
						id: "002",
						label: "PHP.js"
					}
				],
				ID: "",
				index: "",
				currentPage: 1, //初始页
				pagesize: 10, //    每页的数据
				userList: [],
				Loading:true,
				color1:'rgb(76, 76, 76)',
				
					
					 editorContent: '',    //轻量级富文本框,
				

			};
		},
		
		methods: {

			//导出Excel 
			daochu(){
				
				/* generate workbook object from table */
				var wb = XLSX.utils.table_to_book(document.querySelector('#out-table'))
				/* get binary string as output */
				var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
				try {
					FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'sheetjs.xlsx')
				} catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }
				return wbout
				
			},

			handleSelectionChange(val) {
			
				console.log(val);
				let arr = []
				
				 val.forEach(element => {
					
					arr.push(element)
				});
				
				this.userList=arr
				console.log(this.userList)
			},

			handleFilterChange2(val) {
				console.log(val);
			},

			handleDelete(a, b) {
			
				console.log(b);
				this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
						confirmButtonText: "确定",
						cancelButtonText: "取消",
						type: "warning"
					})
					.then(() => {
						fetch(
								"https://wd5203671990lmrgyr.wilddogio.com/users/" +
								b.index +
								"/.json", {
									method: "DELETE",
									headers: {
										"Content-type": "application/json"
									}
								}
							)
							.then(res => {
								return res.json();
							})
							.then(data => {
								console.log(data);
								this.$store.commit("remove_menushuju", b);
								// this.$notify({
								// 	title: "成功",
								// 	message: '删除成功',
								// 	type: "success"
								// });

								//						this.$router.push({name:'menuLink'})
							});
					})
					.catch(() => {
						this.$message({
							type: "info",
							message: "已取消删除"
						});
					});
			},

			//编辑按钮
			handleEdit(a, b) {
				console.log(a, b);
				this.ID = b.index;
				this.put_sj = b;
				this.name = b.name;
				this.tel = b.tel;
				this.radio = b.radio;
				this.textarea = b.textarea;
				this.checked = b.checked;
				this.index = b.index;
				this.region = b.xuanxiang;
				this.sjfw = b.sjfw;
				this.fullscreenLoading = false;   //加载转圈的那个
				this.zhezao = true;

				console.log(this.checked.length)
				if(!this.checked.length){
					var arr = []
					arr.push(this.checked[0])
					console.log(arr)
					this.checked = arr;
				}
				// setTimeout(() => {
				// 	this.fullscreenLoading = false;
				// 	// this.zhezao = true;
				// }, 2000);
			},

			//获取技能函数
			test() {
				console.log(this.checked);
			},

			//点击提交函数
			add() {
				
				console.log(this.ID);
				const data = {
					name: this.name,
					tel: this.tel,
					radio: this.radio,
					checked: this.checked,
					textarea: this.textarea,
					index: this.index,
					xuanxiang:this.region,
					sjfw:this.sjfw
				};

				fetch(
						"https://wd5203671990lmrgyr.wilddogio.com/users/" + this.ID + "/.json", {
							method: "PUT",
							headers: {
								"Content-type": "application/json"
							},
							body: JSON.stringify(data)
						}
					)
					.then(res => {
						return res.json();
					})
					.then(data => {
						console.log(data);
						this.$store.commit("gengxin", data);
					});

				this.$message({
					showClose: true,
					message: "编辑成功",
					type: "success"
				});

				this.zhezao = false;
			},

			// 初始页currentPage、初始每页数据数pagesize和数据data
			handleSizeChange: function(size) {
				this.pagesize = size;
				console.log(this.pagesize); //每页下拉显示数据
			},
			handleCurrentChange: function(currentPage) {
				this.currentPage = currentPage;
				console.log(this.currentPage); //点击第几页
			},

			getContent: function () {
				alert(this.editorContent)
			},

			//批量删除
			Delete_bg(){
				console.log(this.userList)
				let sy_sj = [];
				this.userList.forEach((item)=>{
					sy_sj.push(item.name)
				})

				this.$notify({
					title: "您要批量删除有",
					message: sy_sj,
					type: "success"
				});

			}


		},

		computed: {
			
			qbxx() {
				// return this.$store.getters.qbxx;
				const input5 = this.input5;
                
                	if(input5) {
                		// console.log('this.tableData', this.msg)
                		return this.$store.getters.qbxx.filter(dataNews => {
							
                			return Object.keys(dataNews).some(key => {
								
                				return(
                					String(dataNews[key]).toLowerCase().indexOf(input5) > -1
                				);
                			});
                		});
                	}
                	// console.log('this.tableData', this.msg)
                	return this.$store.getters.qbxx.slice((this.currentPage-1)*this.pagesize,this.currentPage*this.pagesize);
			},

			qbsj(){
				
				return this.$store.getters.qbxx
			}


		},

		mounted() {
			this.$axios.get("/users.json").then(e => {
				// console.log(e.data);
				var arr = [];
				for(let key in e.data) {
					e.data[key].index = key;
					console.log(e.data[key].index)

					this.msg.push(e.data[key]);
					
					arr.push(e.data[key]);
					console.log(arr);
					this.$store.commit("msg", arr);
				}
			});

			if(localStorage.getItem('a')){
                this.color1 = localStorage.getItem('a');
            }else{
                this.color1='rgb(76, 76, 76)'
			}
		
		}

	};
</script>
<style >
	/* .cont{
		padding: 1.5%;
	} */
	.aa {
		width: 100%;
	}
	
	.aa li {
		float: left;
		width: 25%;
		text-align: left;
		font-weight: bold;
		list-style: none;
		line-height: 40px;
	}
	
	.shouye {
		padding-bottom: 10px;
		border-bottom: 2px solid rgb(205, 50, 26);
	}
	
	.cont_bj {
		width: 815px;
		height:735px;
		position: fixed;
		top: 0px;
		left: 0px;
		right: 0px;
		bottom: 0px;
		background: rgb(255, 255, 255);
		z-index: 99;
		margin: auto;
		border: #f1f1f1 solid 1px;
		box-shadow: 0 0 26px #333;
		padding: 20px;
		/* animation: mymove 0.5s ease-in; */
	}
	
	/* @keyframes mymove {
		from {
			transform: scale(0.5);
		}
		to {
			transform: scale(1);
		}
	} */
	
	p {
		line-height: 50px;
	}
	
	.zhezao {
		width: 100%;
		height: 100vh;
		background: #333333ad;
		z-index: 1;
		position: fixed;
		top: 0px;
		left: 0;
	}
	
	.ch {
		float: right;
		/* font-size: 30px; */
		top: 0px;
		margin-top: -9px;
		font-weight: bold;
		width: 35px;
		height: 35px;
		background: #e4e4e4;
		text-align: center;
		line-height: 35px;
		border-radius: 50px;
	}
	.cont{
		width: 94%;
		margin: 0 auto;
	}

	.el-checkbox__inner{
		    border: 1px solid #7e868e !important;
	}

	.el-table th{
		text-align: center;
	}
	.el-table td, .el-table th.is-leaf{
		text-align: center;
	}
</style>