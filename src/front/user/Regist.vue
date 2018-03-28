<template>
    <div class="Main">
        <v-head></v-head>
        <div class="front-conter">
          <div class="f-regist">
   
		<el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
			  <el-form-item label="会员名" prop="UserName">
			    <el-input v-model="ruleForm2.UserName" placeholder="设置会员名" auto-complete="off"></el-input>
			  </el-form-item>
			  <el-form-item label="密码" prop="pass">
			    <el-input type="password" v-model="ruleForm2.pass" placeholder="设置你的登录密码" auto-complete="off"></el-input>
			  </el-form-item>
			  <el-form-item label="确认密码" prop="checkPass">
			    <el-input type="password" v-model="ruleForm2.checkPass" placeholder="请再次输入你的密码"  auto-complete="off"></el-input>
			  </el-form-item>
			  <el-form-item label="手机号" prop="age">
			    <el-input v-model.number="ruleForm2.age" placeholder="请输入手机号码"></el-input>
			  </el-form-item>
</el-form>
			
			
			<div class="btn-con">
				<el-button type="primary" @click="submitForm('ruleForm2')">同意条款并注册</el-button>
				<el-checkbox checked class="remember">《阿里云网站服务条款》|《法律声明和隐私权政策》</el-checkbox>
			</div>
			</div>
        </div>
        <v-footer></v-footer>
    </div>
</template>
<script>
    import vHead from './../common/Header.vue';
    import vFooter from './../common/Footer.vue';
    export default {
        components:{
            vHead,vFooter
        },
      data() {
      var checkAge = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('手机号不能为空'));
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'));
          } else {
            if (value < 11) {
              callback(new Error('手机号不能为空'));
            } else {
              callback();
            }
          }
        }, 1000);
      };
      var validateUserName=(rule, value, callback) => {
      	  if (value === '') {
          callback(new Error('请输入会员名'));
	        } else {
              callback();
            }
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm2.checkPass !== '') {
            this.$refs.ruleForm2.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm2.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm2: {
          UserName:'',
          pass: '',
          checkPass: '',
          age: ''
        },
        rules2: {
          UserName:[
            {validator: validateUserName, trigger: 'blur' }
          ],
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          age: [
            { validator: checkAge, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) { //重置
        this.$refs[formName].resetFields();
      }
    }
    }
</script>