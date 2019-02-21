<template>
	<div class="bj_login" style="overflow:hidden"  :style="{backgroundImage: 'url(' + bj + ')'}">
    
	<div class="container bao_login animated flipInX "  >
      <h1 class="ld">欢迎来到我的系统</h1>
        <el-form  :label-position="labelPosition" :model="ruleForm"  :rules="rules" ref="ruleForm"  label-width="100px" class="demo-ruleForm form_login">
            <el-form-item label="姓名：" prop="name" style="color:white" >
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>

            <el-form-item label="密码：" prop="Mima" style="color:white">
              <el-input type='password' v-model="ruleForm.Mima"></el-input>
            </el-form-item>

             <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                <el-button @click="resetForm('ruleForm')">免费注册</el-button>
              </el-form-item>
        </el-form>
	</div>
	</div>
</template>

<script>



import axios from 'axios'

	export default{
		data(){
			return{
        labelPosition: 'right',
        bj:'http://demo.cssmoban.com/cssthemes4/cpts_928_bub/images/banner.jpg',
        ruleForm: {
          name:"齐龙龙",
          Mima:'...'
        },
        rules: {
          name: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
           Mima: [
            { required: true, message: '请输入密码', trigger: 'blur' }
            
          ]
        }
      }
    },
    // created(){
		// 	this.ruleForm.name = sessionStorage.getItem('name')
			
    // },
    mounted(){
        console.log(this.bj)
    },
      methods: {
        submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
             
              this.$axios.get('/yhxx.json')
                  .then((res) => {
                    console.log(res.data)
                    const shuju = res.data
                    const users = []
                    for(let key in shuju){
                      const user = shuju[key]
                      console.log(user)
                      users.push(user)
                    }
                    
                    
                    
                    let result = users.filter((user)=>{
                      console.log(user)
                      return user.name === this.ruleForm.name && user.mima === this.ruleForm.Mima
                    })
                    
                    console.log(result)
                    
                    if(result!=null && result.length>0){
                      this.$store.dispatch('setUser',result[0].name)

                      
                      sessionStorage.setItem('name',result[0].name);
                      sessionStorage.setItem('login',1);

                      this.$message({
                              message: '登录成功^_^',
                              type: 'success'
                        });
                        //  localStorage.clear()
                      this.$router.push({name:'cont'})


                    }else{
                      this.$store.dispatch('setUser',null)
                      this.$message.error('用户名或密码错误');
                    }
                    
                    
              })

            } else {
              console.log('error submit!!');
              return false;
            }
          });
        },
        resetForm(formName) {
          // this.$refs[formName].resetFields();
          this.$router.push({name:'zhuce'})
        }
      }
	
	}
</script>

<style>
.bj_login{
	width: 100%;
	height: 100vh;

	background-size: cover;
}
.bao_login{
	width:432px;
  border-radius: 10px;
	height: auto;
	border: #28a745  solid 0px;margin: 10px 0;margin: 0 auto;
	    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 320px;
    bottom: 0;
    margin: auto;
	color: white;
  background: white;
}
.el-form-item {
    margin-bottom: 30px;
}


.form_login{
      margin-top: 35px;
    width: 397px;
}
.ld{
  text-align: center;
  line-height: 80px;
      box-shadow: 0 0 24px #a3c8da;
  color: #2572c1;
      font-weight: 400;
    font-size: 25px;
  /* background-image: -webkit-linear-gradient(left, #3eaeec, #328ed4 10%, #333 20%, #333 30%,
            #333 40%, #333 50%, #333 60%, #333 70%, #333 80%, #333 90%, #2c7ed4); */
          
  /* color: transparent; 
            -webkit-text-fill-color: transparent;
            -webkit-background-clip: text;   
            background-size: 200% 100%;   */
}

        @keyframes masked-animation {
            0% {
                background-position: 0 0;   /*background-position 属性设置背景图像的起始位置。*/
            }
            100% {
                background-position: -100% 0;
            }
        }


</style>