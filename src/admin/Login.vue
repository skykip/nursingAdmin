<template>
	<div class="login-box">
			<el-row>
				<el-col :span="24">
					<div class="title">好陪护管理后台</div>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="24">
					<el-input id="name" v-model="name" placeholder="请输入帐号">
						<template slot="prepend">帐号</template>
					</el-input>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="24">
					<el-input id="password" v-model="password" type="password" placeholder="请输入密码">
						<template slot="prepend">密码</template>
					</el-input>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="24">
					<el-checkbox checked class="remember">记住密码</el-checkbox>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="24">
					<el-button id="login" v-on:click="check" style="width:100%" type="primary">登录</el-button>
				</el-col>
			</el-row>
			<!--<el-row>
				<el-col :span="24">
					 <a class="fr blue" href="#">忘记密码</a>
				</el-col>
			</el-row>-->
		</div>
</template>


<script type="text/javascript">
import router from './../router';
import util from './../js/util/util.js';
export default{
	data (){
		return{
			name: '',
			password: ''
		}
	},
	methods: {
		check: function(event) {
					//获取值  
					var name = this.name;
					var password = this.password;
					if(name == '' || password == '') {
						this.$message({
							message: '账号或密码为空！',
							type: 'error'
						})
						return;
					}
                      //util.pushRouter(router,"/admin",{"name":name,"password":password})
					  var $this=this;
				     util.Ajax('/api/user/admin/'+this.$store.state.userId+'?_method=GET',{},function(data){
				     	console.log(data)
				     })
				}
	}
}
</script>

<style>
	 html,body{background-color:#324057;}
	.login-box{ width:400px;border-radius: 5px; height: 300px; margin:0 auto; margin-top: -150px;margin-left: -200px;  position: absolute;left:50%;top:50%; background: #fff; padding: 10px;}
    .login-box .el-row{margin-bottom: 15px;}
    .title{font-size:20px; margin:10px 0;}
</style>