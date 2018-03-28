<template>
	<div class="add">	
		  <el-breadcrumb separator="/" class="breadcrumb">
			  <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
			  <el-breadcrumb-item :to="{ path: '/admin/user' }">用户管理</el-breadcrumb-item>
			  <el-breadcrumb-item>编辑用户</el-breadcrumb-item>
			</el-breadcrumb>
<el-form ref="form" :model="form" label-width="80px">
  <el-form-item label="用户名">
    <el-input v-model="form.name" ></el-input>
  </el-form-item>
    <el-form-item label="密码">
    <el-input v-model="form.Psa" type="password"></el-input>
  </el-form-item>
     <el-form-item label="EMail">
    <el-input v-model="form.Emali"></el-input>
  </el-form-item>
    <el-form-item label="最后一次登录">
    <el-date-picker type="date" placeholder="选择日期" v-model="form.date1"></el-date-picker>
  </el-form-item>
    <el-form-item label="注册">
   <el-date-picker type="date" placeholder="选择日期" v-model="form.date2"></el-date-picker>
  </el-form-item>
   <el-form-item label="地区">
    <el-select v-model="form.region" placeholder="==省份/直辖市==">
      <el-option label="==省份/直辖市==" value="shanghai"></el-option>
      <el-option label="贵州省" value="beijing"></el-option>
      <el-option label="四川省" value="beijing"></el-option>
      <el-option label="云南省" value="beijing"></el-option>
    </el-select>
     <el-select v-model="form.region" placeholder="==市==">
      <el-option label="==市==" value="shanghai"></el-option>
      <el-option label="贵阳市" value="beijing"></el-option>
       <el-option label="凯里市" value="beijing"></el-option>
    </el-select>
     <el-select v-model="form.region" placeholder="==县/区==">
      <el-option label="==县/区==" value="shanghai"></el-option>
      <el-option label="南明区" value="beijing"></el-option>
      <el-option label="小河区" value="beijing"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="详细地址">
    <el-input v-model="form.name"></el-input>
  </el-form-item>
   <el-form-item label="固话">
    <el-input v-model="form.name"></el-input>
  </el-form-item>
   <el-form-item label="手机">
    <el-input v-model="form.name"></el-input>
  </el-form-item>
  <el-form-item label="积分">
    <el-input v-model="form.name"></el-input>
  </el-form-item>
  <el-form-item label="会员级别">
    <el-select v-model="form.region" placeholder="请选择会员级别">
      <el-option label="普通会" value="shanghai"></el-option>
      <el-option label="VIP会员" value="beijing"></el-option>
       <el-option label="白金会员" value="beijing"></el-option>
    </el-select>
  </el-form-item>
  
  
    <el-form-item label="管理权限">
    <el-checkbox-group v-model="form.type">
      <el-checkbox label="管理员" name="type"></el-checkbox>
      <el-checkbox label="运营专员" name="type"></el-checkbox>
      <el-checkbox label="客服" name="type"></el-checkbox>
      <el-checkbox label="网站编辑" name="type"></el-checkbox>
    </el-checkbox-group>
  </el-form-item>
  
  
  <el-form-item label="禁用">
    <el-switch on-text="" off-text="" v-model="form.delivery"></el-switch>
  </el-form-item>
  <el-form-item label="姓别">
    <el-radio-group v-model="form.resource">
      <el-radio label="男"></el-radio>
      <el-radio label="女"></el-radio>
    </el-radio-group>
  </el-form-item>
  <el-form-item label="备注">
    <el-input type="textarea" v-model="form.desc"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">立即创建</el-button>
    <el-button>取消</el-button>
  </el-form-item>
</el-form>	
	</div>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          name: '',
          region: '',
          Psa:'123456',
          date1: '2017-10-20',
          date2: '2017-06-20',
          Emali:'703442311@qq.com',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      }
    }
  }
</script>