<template>
    <div class="wbk_cont">

             <div id="WangEditor" style="text-align:left;margin:20px 0;"></div>

  			<el-button  plain v-on:click="getContent">获取上面内容</el-button> 
            
            <div class="info"></div>

    </div>
</template>
<script>
	import wangEditor from 'wangeditor' //轻量级富文本框
	// import 'wangeditor/release/wangEditor.min.css' //轻量级富文本框
    export default {
        data (){
            return{
                editorContent:''
            }
        },
      methods: {
        getContent: function () {
            console.log( this.editorContent)
            document.querySelector('.info').innerHTML=this.editorContent
            
        }
      },
        mounted(){
                 var editor = new wangEditor('#WangEditor')

                editor.customConfig.onchange = (html) => {
                    this.editorContent = html    
                }

                 editor.create()

                 var a = `<table border="0" width="100%" cellpadding="0" cellspacing="0" style="text-align: center;">
   <tbody>
    <tr>
     <th>姓名</th>
     <th>性别</th>
     <th>电话</th>
     <th>技能</th>
     <th>爱好</th>
    </tr>
    <tr>
     <td>钻石王老五</td>
     <td>男</td>
     <td>18811692640</td>
     <td>Vue.js</td>
     <td>写代码</td>
    </tr>
    <tr>
     <td>小红</td>
     <td>女</td>
     <td>18811692640</td>
     <td>Vue.js</td>
     <td>听音乐</td>
    </tr>
    <tr>
     <td>赵花花</td>
     <td>女</td>
     <td style="text-align: center;">18811692640</td>
     <td>Vue.js</td>
     <td>看电影</td>
    </tr>
    <tr>
     <td>五花<img src="http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/40/pcmoren_tian_org.png" alt="[舔屏]" data-w-e="1"></td>
     <td>女</td>
     <td>18811692640</td>
     <td>Vue.js</td>
     <td>睡觉</td>
    </tr>
   </tbody></table>`
                
                 console.log(editor)
                  editor.cmd.do('insertHTML', a)

        }
    }
</script>

<style>

    .wbk_cont{
        width: 95%;
        margin: 0 auto;
    }

    .w-e-text-container .w-e-panel-container .w-e-panel-tab-content input[type=text].block{
        border-radius: 0px !important; 
    }

    .w-e-text-container{
        z-index: 1500 !important;
    }
    
    .info p{
        width: 100%;
        line-height: 50px;
        /* background: darkcyan; */
        /* color: white; */
        margin: 10px 0;
        text-indent: 10px;
    }
    
   .info table{ width:100%;margin-top: 25px;} 
    .info table td{ border: #ccc dashed 1px; color:#000; line-height:40px;text-align: center} 
    .info table th{line-height: 40px;text-align: center;font-weight: bold; border: #ccc dashed 1px;}
</style>

