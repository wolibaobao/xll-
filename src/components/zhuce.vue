<template>
	<div class="bj_zhuce" style="overflow:hidden">
   
	<div class="container bao_zhuce animated flipInY">
      <h1 class="ld"></h1>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm form_zhuce">
                <el-form-item label="姓名：" prop="name">
                  <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
              
                <el-form-item label="密码：" prop="pass">
                  <el-input type="password" v-model="ruleForm.pass"></el-input>
                </el-form-item>
                
                <el-form-item label="密码：" prop="checkPass">
                  <el-input type="password" v-model="ruleForm.checkPass"></el-input>
                </el-form-item>

                <el-form-item label="邮箱：" prop="youxiang">
                  <el-input v-model="ruleForm.youxiang"></el-input>
                </el-form-item>
                
                 <el-form-item label="手机号：" prop="tel">
                  <el-input v-model="ruleForm.tel"></el-input>
                </el-form-item>
                
                <el-form-item label="性别：" prop="xb">
                  <el-radio-group v-model="ruleForm.xb">
                    <el-radio label="男"></el-radio>
                    <el-radio label="女"></el-radio>
                  </el-radio-group>
                </el-form-item>
                
                <el-form-item>
                  <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                  <el-button @click="resetForm('ruleForm')">返回登录</el-button>
                </el-form-item>
        </el-form>
	</div>
	</div>
</template>
<script>


//这里要俺需要引入，我不是一个对象
import { isvalidPhone } from "../../config/validate";

import axios from 'axios'

export default {
  data() {
    //定义一个全局的变量，谁用谁知道
    var validPhone = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入电话号码"));
      } else if (!isvalidPhone(value)) {
        callback(new Error("请输入正确的11位手机号码"));
      } else {
        callback();
      }
    };

    var validateEmail = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请正确填写邮箱"));
      } else {
        if (value !== "") {
          var reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
          if (!reg.test(value)) {
            callback(new Error("请输入有效的邮箱"));
          }
        }
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };

    
    return {
      ruleForm: {
        name: "",
        pass: "",
        checkPass: "",
        youxiang: "",
        tel: "",
        xb: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        pass: [{ validator: validatePass, trigger: "blur",required: true, }],
        checkPass: [{ validator: validatePass2, trigger: "blur",required: true, }],
        youxiang: [
          { required: true, trigger: "blur", validator: validateEmail } //这里需要用到全局变量
        ],
        tel: [
          { required: true, trigger: "blur", validator: validPhone } //这里需要用到全局变量
        ],
        xb: [{ required: true, message: "请选择性别", trigger: "change" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
         
          const data = {
            name: this.ruleForm.name,
            mima: this.ruleForm.pass,
            checkPass: this.ruleForm.checkPass,
             youxiang: this.ruleForm.youxiang,
            tel: this.ruleForm.tel,
            xb: this.ruleForm.xb
          };
          console.log(data);
          axios.post("/yhxx.json	", data).then(res => {
            sessionStorage.setItem("name", this.ruleForm.name);
            sessionStorage.setItem("mima", this.ruleForm.pass);
            this.$message({
              message: "注册成功^_^",
              type: "success"
            });
            console.log(res);
            this.$router.push({ name: "login" });
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      // this.$refs[formName].resetFields();
      this.$router.push({ name: "login" });
    }
  }
};
</script>

<style>
.bj_zhuce {
  width: 100%;
  height: 100vh;
  background: url("http://demo.cssmoban.com/cssthemes4/cpts_928_bub/images/banner.jpg");
  background-size: cover;
}
.bao_zhuce {
  width: 432px;
  border-radius: 10px;
  height: auto;
  border: #28a745 solid 0px;
  margin: 10px 0;
  
  margin: 0 auto;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 445px;
  bottom: 0;
  margin: auto;
  font-size: 12px;
  color: white;
  background: white;
}
.el-form-item {
  margin-bottom: 20px;
}

.form_zhuce {
  margin-top: 20px;
  width: 397px;
}
.ld {
  text-align: center;
  line-height: 80px;
  color: #333;
}
</style>