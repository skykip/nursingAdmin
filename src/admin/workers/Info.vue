<template>
	<div class="add">	
		  <el-breadcrumb separator="/" class="breadcrumb">
			  <el-breadcrumb-item :to="{ path: '/adminplat' }">首页</el-breadcrumb-item>
			  <el-breadcrumb-item :to="{ path: '/adminplat/workers' }">护工管理</el-breadcrumb-item>
			  <el-breadcrumb-item>护工信息</el-breadcrumb-item>
			</el-breadcrumb>
  <el-row>
    <el-col :span="8">
  <el-form ref="form"  label-width="80px" style="width:300px" >
  <el-form-item label="护工姓名">
    <el-input v-model="info.name" ></el-input>
  </el-form-item>
    <el-form-item label="电话号码">
    <el-input v-model="info.phoneNum"></el-input>
  </el-form-item>
  <el-form-item label="护工性别">
    <el-select v-model="info.gender" placeholder="请选择">
      <el-option label="男" value="male"></el-option>
      <el-option label="女" value="female"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="星级">
    <el-select v-model="info.star" placeholder="0">
      <el-option label="0" value="0"></el-option>
      <el-option label="1" value="1"></el-option>
       <el-option label="2" value="2"></el-option>
        <el-option label="3" value="3"></el-option>
         <el-option label="4" value="4"></el-option>
          <el-option label="5" value="6"></el-option>
    </el-select>
  </el-form-item>
   <el-form-item label="护工类型">
    <el-select v-model="info.workType" placeholder="请选择">
      <el-option label="平台护工" value="formal"></el-option>
      <el-option label="自聘护工" value="informal"></el-option>
    </el-select>
  </el-form-item>
   <el-form-item label="身份证号">
    <el-input v-model="info.idCardNum"></el-input>
  </el-form-item>
  <el-form-item label="银行名称" >
    <el-input v-model="info.paymentMethod.bank"></el-input>
  </el-form-item>
  <el-form-item label="银行卡号" >
    <el-input v-model="info.paymentMethod.cardNum"></el-input>
  </el-form-item>
  <el-form-item label="银行地址" >
    <el-input v-model="info.paymentMethod.address"></el-input>
  </el-form-item>
 
  <el-form-item>
    <el-button type="primary" @click="onSubmit">修改</el-button>
  </el-form-item>
</el-form>	  
 
    </el-col>
    <el-col :span="8">
 <table class="gridtable" >
   <tr><th>项目</th><th></th></tr>
   <tr><td >护工ID</td><td >{{info.work_id}}</td></tr>
   <tr><td >头像</td><td > <img :src="info.user.avatar" alt="" style="width: 50px;height: 50px"></td></tr>
		<tr><td >微信号</td><td >{{info.user.wechatname}}</td></tr>
    <tr><td >个人描述</td><td >{{info.description}}</td></tr>
    <tr><td >出生日期</td><td >{{info.birthday}}</td></tr>
    <tr><td >个人描述</td><td >{{info.description}}</td></tr>
    <tr><td>状态</td><td>{{config.workStatus[info.workStatus]}}</td></tr>
    <tr><td>历史收益</td><td>{{info.orderAmount}}元</td></tr>
    <tr><td>历史订单</td><td>{{info.orderQuantity}}单</td></tr>
    <tr><td>投诉订单</td><td>{{info.orderComplain}}单</td></tr>
     <tr><td>注册时间</td><td>{{info.workCreatTime}}</td></tr>
      <tr><td>账户余额</td><td>元</td></tr>
      <tr><td>服务地区</td><td>{{info.prov}}-{{info.city}}</td></tr>
       <tr><td>服务医院</td><td><p v-for="(item,index) in info.services" >
					                 {{item.hospital.name}}
                  </p></td></tr>

				
 </table>
    </el-col>
    <el-col :span="8">
  <table class="gridtable" >
   <tr><th>认证信息</th></tr>
   <tr><td><img :src="info.healthCardPic" alt="健康证" style="width: 300px;height: 200px"></td></tr>
   <tr><td><img :src="info.idCardFrontPic" alt="身份证正面" style="width: 300px;height: 200px"></td></tr>
   <tr><td><img :src="info.idCardBackPic" alt="身份证背面" style="width: 300px;height: 200px"></td></tr>
  </table>
    </el-col>
  </el-row>
	</div>
</template>

<script>
import util from "../../js/util/util.js";
export default {
  data() {
    return {
      info: {paymentMethod:{},user:{}},
      config: null
    };
  },
  created() {
    this.config = require("../../assets/config.json");
    if (this.$route.query.work_id != null) {
      this.getInfo(this.$route.query.work_id);
    }
  },
  methods: {
    getInfo: function(_id) {
      var $this = this;
      util.Ajax(
        "/api/admin/works/" + _id,
        {},
        function(data) {
          $this.info = data.data;
          if ($this.info.paymentMethod == null) {
            $this.info.paymentMethod={};
          }
          if ($this.info.user == null) {
            $this.info.user={};
          }
        },
        function(data) {
          console.log(data);
        }
      );
    },
    onSubmit: function() {
      var $this = this;
      util.Ajax(
        "/api/admin/works/" + this.info.work_id + "?_method=patch",
        {
          name: this.info.name,
          phoneNum: this.info.phoneNum,
          star: this.info.star,
          workType: this.info.workType,
          gender: this.info.gender,
          idCardNum: this.info.idCardNum,
          bankName: this.info.paymentMethod.bank,
          cardNum: this.info.paymentMethod.cardNum,
          address: this.info.paymentMethod.address
        },
        function(data) {
          $this.$message({
              message: "恭喜你，修改成功",
              type: "success"
            });
        },
        function(data) {
          $this.$message.error('修改失败');
          console.log(data);
        }
      );
    }
  }
};
</script>
