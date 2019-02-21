<template>
   <div class="contadd animated fadeInDownBig">
	<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px ">
    
   
		<el-form-item label="姓名" prop="name">
			<el-input v-model="ruleForm.name"></el-input>
		</el-form-item>

    <el-form-item label="电话" prop="tel">
			<el-input v-model="ruleForm.tel"></el-input>
		</el-form-item>

		<el-form-item label="活动区域" prop="region">
			<el-select v-model="ruleForm.region" placeholder="请选择活动区域">
				<el-option label="A区" value="A区"></el-option>
				<el-option label="B区" value="B区"></el-option>
        <el-option label="C区" value="C区"></el-option>
				<el-option label="D区" value="D区"></el-option>
        <el-option label="E区" value="E区"></el-option>
				<el-option label="F区" value="F区"></el-option>
			</el-select>
		</el-form-item>
    
		<el-form-item label="活动时间" required>
			<el-col :span="5">
				<el-form-item prop="date1">
					<el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
				</el-form-item>
			</el-col>
			<el-col class="line" :span="1" style="text-align: center;">_</el-col>
			<el-col :span="5">
				<el-form-item prop="date2">
					<el-time-picker type="fixed-time" placeholder="选择时间" value-format="HH:mm:ss"   format="HH:mm:ss" v-model="ruleForm.date2" style="width: 100%;"></el-time-picker>
				</el-form-item>
			</el-col>
		</el-form-item>

    	<el-form-item label="时间范围" required prop="sjfw">
          <el-date-picker
            v-model="ruleForm.sjfw" value-format="yyyy-MM-dd"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
    </el-form-item>

  
  

		<!-- <el-form-item label="即时配送" prop="delivery">
			<el-switch v-model="ruleForm.delivery"></el-switch>
		</el-form-item> -->

		<el-form-item label="技能" prop="type">
		  	<el-checkbox-group v-model="ruleForm.type" @change="test" >
          <el-checkbox v-for="item in ruleForm.checkList" :key="item.label" :label="item.label">{{item.label}}</el-checkbox>
        </el-checkbox-group>
		</el-form-item>

		<el-form-item label="性别" prop="resource">
			<el-radio-group v-model="ruleForm.resource">
				<el-radio label="男"></el-radio>
				<el-radio label="女"></el-radio>
			</el-radio-group>
		</el-form-item>

		<el-form-item label="详细内容" prop="desc">
			<el-input type="textarea" v-model="ruleForm.desc"></el-input>
		</el-form-item>

		<el-form-item>
			<el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
			<el-button @click="resetForm('ruleForm')">重置</el-button>
		</el-form-item>
	</el-form>

  </div>
</template>

<script>
import axios from "axios";
//这里要俺需要引入，我不是一个对象
import { isvalidPhone } from "../../config/validate";
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

export default {
  props: {
			title: {
				type: String
			}
		},
  data() {
    return {
      ruleForm: {
        
        name: "",
        region: "",
        tel: "",
        date1: "",
        date2: "",
        sjfw:[],
        delivery: false,
        type: [],
        checkList: [
          {
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
        resource: "",
        desc: ""
      },
      rules: {
        name: [
          {
            required: true,
            message: "请输入姓名",
            trigger: "blur"
          },
          {
            min: 2,
            max: 5,
            message: "长度在 3 到 5 个字符",
            trigger: "blur"
          }
        ],
        tel: [
          { required: true, trigger: "blur", validator: validPhone } //这里需要用到全局变量
        ],
        region: [
          {
            required: true,
            message: "请选择活动区域",
            trigger: "change"
          }
        ],
        date1: [
          {
            type: "string",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        date2: [
          {
            type: "string",
            required: true,
            message: "请选择时间",
            trigger: "change"
          }
        ],
        sjfw:[
          {
            type: "array",
            required: true,
            message: "请选择开始日期-结束日期",
            trigger: "change"
          }
        ],
        type: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个活动技能",
            trigger: "change"
          }
        ],
        resource: [
          {
            required: true,
            message: "请选择活动性别",
            trigger: "change"
          }
        ],
        desc: [
          {
            required: true,
            message: "请填写活动内容",
            trigger: "blur"
          },
          {
            min: 3,
            max: 20,
            message: "长度在 3 到 20 个字符",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    test(test) {
      console.log(test);
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const data = {
            name: this.ruleForm.name,
            tel: this.ruleForm.tel,
            checked: this.ruleForm.type,
             xuanxiang: this.ruleForm.region,
             date1:this.ruleForm.date1,
              date2:this.ruleForm.date2,
              sjfw:this.ruleForm.sjfw,
            radio: this.ruleForm.resource,
            textarea: this.ruleForm.desc
          };
          
          console.log(data);
          axios.post("/users.json	", data).then(res => {
            this.$message({
              showClose: true,
              message: "添加成功^_^",
              type: "success"
            });
            setTimeout(() => {
                this.$router.push({name:'/home'})
            }, 3000);
            console.log(res);
          });
        } else {
          console.log("error submit!!");
          this.$message({
            showClose: true,
            message: "请填写完整",
            type: "warning"
          });
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>


<style scoped>
.contadd{
  padding: 2% ;
}
.el-form-item__label{
  text-align: center;
  font-weight: bold;
}
.shouye {
		padding-bottom: 10px;
		border-bottom: 2px solid rgb(205, 50, 26) !important;
	}


</style>
