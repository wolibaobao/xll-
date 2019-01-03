<template>
    <div class="kuaibao">
        <div style="margin-bottom: 15px;width:100%;">
				<el-input placeholder="请输入内容" v-model="input5" class="input-with-select">
					<el-button slot="append" icon="el-icon-search" @click="tijiao"></el-button>
				</el-input>
		</div>
        <div style="margin-top: 15px;width:100%;    overflow: hidden;">
            <div v-for="(item,index) in shuju" :key="index" class="kuai animated zoomIn">
                    <p>{{item.title}}</p>
                    <p>{{item.des}}</p>
                    <!-- <p>{{item.id}}</p> -->
            
            </div>
        </div>

        <div style="width:100%;overflow: hidden;" v-show="shuju2">
            <div v-for="(item,index) in shuju2" :key="index" class="kuai2 animated zoomIn">
                    <p>{{item.name}}</p>
                    <!-- <p>{{item.id}}</p> -->
                    
            </div>
        </div>

        <div class="kkry animated zoomIn" v-show="Istp">
            <img src="../../assets/hz.jpg" alt="">
        </div>

    </div>
</template>
<script>

export default {
     data(){
         return{
             shuju:[],
             shuju2:[],
             input5:'',
             Istp:false,
             shuju2:true
         }
     },
     methods:{
        tijiao(){
            var Id = this.input5;
            console.log("/api/query?key=769e16eb3c541b615fd605d8f0ac17a4&q="+Id)
            fetch("/api/query?key=769e16eb3c541b615fd605d8f0ac17a4&q="+Id)
             .then(res => {
						return res.json();
			})
			.then(e => {
                console.log(e)
               this.shuju = e.result
               this.shuju2 = false
               if(e.result==null){
                    this.Istp = true
               }else{
                   this.Istp = false
               }
			});
        }
     }
     ,
     mounted() {
            fetch("/api/category?key=769e16eb3c541b615fd605d8f0ac17a4")
            .then(res => {
						return res.json();
			})
			.then(e => {
                console.log(e)
                this.shuju2 = e.result;
			});
	}
}
</script>


<style>

    .kuaibao{
        width: 95%;
        height: auto;
        margin: 0 auto;
        padding-top: 20px;
      
        /* display:flex;
        flex-wrap: wrap;
        justify-content: space-around; */
    }
    .kuai{
           width: 100%;
        height:auto;
        
        
        margin: 5px;
        text-align: center;
        margin: 0 auto;
        cursor: pointer;
        font-size: 14px;
        border-radius: 5px;
        margin-bottom: 20px;
        border: #ccc solid 1px;
        
    }
    .kuai2{
           width: 19%;
    float: left;
    background: #ece7b563;   
    /* ece7b563 */
    line-height: 70px;
    margin: 7px;
    text-align: center;
    border-radius: 5px;
    color: #5a5454;
    font-weight: bold;
    transition: .5s;
    border:solid 1px #fff;
    cursor: pointer;
    }
     .kuai2:hover{
   
    background: #fff;   
    border:dashed 1px #666;
    
    
    }
    .kuai p:nth-child(1){
        font-weight: bold;
        border-bottom: dashed 1px #ccc;
        background:#ffebcd59;
        color: #d00808;    line-height: 50px;
    }
    .kuai p:nth-child(2){
        padding: 10px;
    line-height: 30px;
    text-align: left;
    }
    .input-with-select{
        width: 100%;
    }

    .kkry{
        width:100%;
        
        overflow:hidden;
    }
    .kkry img{
        width: 100%; 
    }

</style>
