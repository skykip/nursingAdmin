<template>
    <div class="Main">
        <v-head></v-head>
        <div class="front-conter">
		        <div class="f-login">
		        	    <div class="login-info">
		        	    	 <h1>轻量应用服务器首发</h1>
						<p>快速搭建和易于管理的轻量级云服务器</p>
						<p>简单易上手，1分钟搭建应用</p>
						<p>更低价格更高服务增值</p>
		        	    </div>
				        <div class="login-con">
				        	  <h3>密码登录</h3>
				        	  <p>淘宝及1688帐号可直接使用会员名登录</p>
				        	  <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2"  :label-position="labelPosition" label-width="100px" class="demo-ruleForm">
									  <el-form-item  prop="name">
									    <el-input v-model="ruleForm2.name" placeholder="邮箱/会员名/8位ID" auto-complete="off"></el-input>
									  </el-form-item>
									  <el-form-item  prop="pass">
									    <el-input type="password" v-model="ruleForm2.pass" placeholder="登录密码" auto-complete="off"></el-input>
									  </el-form-item>
									    <el-button type="primary" @click="submitForm('ruleForm2')">登录</el-button>
						</el-form>
				        	
				        	  <div class="login-other"><a>免费注册</a> <a>忘记密</a></div>
				        	  <div>其他方式登录：<i class="iconfont icon-taobao"></i> <i class="iconfont icon-qq"></i><i class="iconfont icon-weibo"></i></div>
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
      var validateName=(rule, value, callback) => {
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
      return {
      	labelPosition: 'top',
        ruleForm2: {
          name:'',
          pass: '',
          checkPass: '',
        },
        rules2: {
          name:[
            {validator:validateName,trigger: 'blur' }
          ],
          pass: [
            {validator:validatePass,trigger: 'blur' }
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