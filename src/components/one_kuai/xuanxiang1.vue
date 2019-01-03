<template>
  <div class="deit" style="width:95%;margin:0 auto;" >
    <div class="crumbs" style="width:100%;margin:0 auto;">
      <!-- <el-breadcrumb separator="/">
            <el-breadcrumb-item><i class="el-icon-date"></i> 数据管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb> -->
        <div class="cantainer">
                    <el-table style="width: 100%;"
                    :data="userList.slice((currentPage-1)*pagesize,currentPage*pagesize)"  
                    >
                        <el-table-column type="index" width="50">    
                        </el-table-column>
                        <el-table-column label="日期" prop="date" width="180">    
                        </el-table-column>
                        <el-table-column label="用户姓名" prop="name" width="180">    
                        </el-table-column>
                        <el-table-column label="电话" prop="tel" width="180">    
                        </el-table-column>
                        <el-table-column label="详细" prop="address" width="200">    
                        </el-table-column>    
                    </el-table>
                        <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="currentPage"
                            :page-sizes="[5, 10, 20, 40]" 
                            :page-size="pagesize"         
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="userList.length">   
                    </el-pagination>
        </div>



    </div>


  <div class="block">
    <span class="demonstration">hover 触发子菜单</span>
    <el-cascader
      expand-trigger="hover"
      :options="options"
      v-model="selectedOptions2"
    >
    </el-cascader>
  </div>
  <br><br>

  <!-- <el-select v-model="i.label" v-for="(i,index) in options" :key="index" placeholder="请选择"> 
   
    
    <el-option v-for="(k,index) in i.children" :key="index">
          <el-option :value="k.label">  </el-option>

    </el-option>
   

   

  </el-select> -->


  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      currentPage: 1, //初始页
      pagesize: 10, //    每页的数据
      userList: [],
    value:'',
    arr:[],
   options : [
  {
    "flink": "https://www.baidu.com/",
    "children": [
      {
        "flink": "https://lanhuapp.com/",
        "label": "正大",
         'value': 'zd',
        "ptypename": "高校网站",
        "remark": "的方法",
        "id": "112",
        "orlast": 1,
        "ptypeid": "111",
        "pids": "111"
      },
      {
        "flink": "aagtgf",
        "label": "aa",
       
        'value': 'gx',
        "remark": "aa",
        "id": "8429f88d0c2542b0b8d9a939ff572aa8",
        "orlast": 1,
        "ptypeid": "111",
        "pids": null
      }
    ],
    "label": "高校网站",
      'value': 'zhinan1',
    "ptypename": "高校网站",
    "remark": "gx",
    "id": "111",
    "orlast": 0,
    "ptypeid": "0",
    "pids": "0"
  },
  {
    "flink": "",
    "children": [
      {
        "flink": "https://www.baidu.com/",
        "label": "经贸",
        "ptypename": "中等职业技术学校",
        "remark": "fffgggg",
        "id": "dca11dfd6f224471bb13e19a5a7400f0",
        "orlast": 1,
        "ptypeid": "54fe1d985fd546eea7e2bc9c6ff43e91",
        "pids": null
      }
    ],
    "label": "中等职业技术学校",
      'value': 'zhinan2',
    "ptypename": "中等职业技术学校",
    "remark": "tttyy",
    "id": "54fe1d985fd546eea7e2bc9c6ff43e91",
    "orlast": 0,
    "ptypeid": "0",
    "pids": null
  },
  {
    "flink": "",
    "children": [
      {
        "flink": "https://www.baidu.com/",
        "label": "周大福",
        "ptypename": "兄弟协会网站",
        "remark": "mmm",
        "id": "635b5f07579548c2bc700fe672ad00bd",
        "orlast": 1,
        "ptypeid": "a9b62704f862432e81a1a75573bc5339",
        "pids": null
      }
    ],
    "label": "兄弟协会网站",
      'value': 'zhinan',
    "ptypename": "兄弟协会网站",
    "remark": "aaa",
    "id": "a9b62704f862432e81a1a75573bc5339",
    "orlast": 0,
    "ptypeid": "0",
    "pids": null
  }
],

        selectedOptions: [],
        selectedOptions2: []


    };
  },
  created() {
    this.handleUserList();
  },
  methods: {
    // 初始页currentPage、初始每页数据数pagesize和数据data
    handleSizeChange: function(size) {
      this.pagesize = size;
      console.log(this.pagesize); //每页下拉显示数据
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
      console.log(this.currentPage); //点击第几页
    },
    handleUserList() {
     axios.get("/users.json").then(e => {
				// console.log(e.data);
					var arr = []
				for(let key in e.data) {
				
					e.data[key].index = key;
					// console.log(e.data[key].index)
					
					// this.msg.push(e.data[key]);
				 arr.push(e.data[key])
					
				}
      
        this.userList = arr;

			});
    }
  },
  mounted(){
     let arr = []
     this.options.forEach(element => {
        console.log(element.children)
       element.children.forEach(item=>{
         console.log(item)
         arr.push(item)
       })
        
       
    });
    console.log(arr)
    this.arr = arr;
  }
};
</script>

