<template>
    <div style="width:95%;margin:0 auto;">

        <el-table   v-loading="loading2" ref="multipleTable" border :data="msg.slice((currentPage-1)*pagesize,currentPage*pagesize)" id="out-table"
			tooltip-effect="msg" style="width: 100%;margin-top: 10px;"  >
				<!-- <el-table-column type="selection" width="55"></el-table-column> -->
				<el-table-column prop="" label="#" width="55">
                    <template slot-scope="scope">
                        <el-button size="mini" style="padding: 2.5px;" type="success">{{scope.$index}}  </el-button>
                     </template>
                </el-table-column>
				<el-table-column prop="nickname" label="姓名" width="105"></el-table-column>
				
				<el-table-column prop="touziyear" label="投资年限" width="105"> </el-table-column>
				<el-table-column prop="email" label="绑定邮箱" width="200"> </el-table-column>
				<el-table-column prop="modifyTime" label="修改时间" width="300"> </el-table-column>
				<el-table-column prop="baseType" label="基本短信服务" width="auto"> </el-table-column>
                <el-table-column prop="changeType" label="可选短信服务" width="auto"> </el-table-column>

		</el-table>

        <el-pagination style="margin:20px 0"
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="currentPage"
                            :page-sizes="[5, 10,15, 20, 40]" 
                            :page-size="pagesize"         
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="msg.length">   
        </el-pagination>
		
			

    </div>
</template>

<script>
export default {
    data (){
        return{
            msg:[],
             currentPage:1, //初始页
                pagesize:15,    //    每页的数据
                userList: [],
                loading2: false
        }
        
    },
    mounted(){
       
        this.$axios.get('https://wd5203671990lmrgyr.wilddogio.com/xxlb.json')
        .then((e)=>{
            // console.log(e.data)
           setTimeout(()=>{ 
            //    this.loading2 =false
               for(var k in e.data){
                    //  console.log(e.data[k])
                     this.msg = e.data[k] 
                }
           },500)
           
            
        })
    },
     methods: {
        // 初始页currentPage、初始每页数据数pagesize和数据data
        handleSizeChange: function (size) {
                this.pagesize = size;
                console.log(this.pagesize)  //每页下拉显示数据
        },
        handleCurrentChange: function(currentPage){
                this.currentPage = currentPage;
                console.log(this.currentPage)  //点击第几页
        }
    }
}
</script>
<style>
.el-table--enable-row-transition .el-table__body td{
    text-align: center;
    font-size: 12px;
}
.el-table th{
    text-align: center;
}
</style>
