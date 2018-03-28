<template>
	<div class="add">	
		  <el-breadcrumb separator="/" class="breadcrumb">
			  <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
			  <el-breadcrumb-item :to="{ path: '/admin/news' }">新闻管理</el-breadcrumb-item>
			  <el-breadcrumb-item>新闻编辑</el-breadcrumb-item>
			</el-breadcrumb>
<el-form ref="form" :model="form" label-width="80px">
	  <el-form-item label="新闻标题">
	    <el-input v-model="form.name" ></el-input>
	  </el-form-item>
	    <el-form-item label="新闻摘要">
	    <el-input type="textarea" v-model="form.desc"></el-input>
	  </el-form-item>
	    <el-form-item label="发布时间">
	    <el-date-picker type="date" placeholder="选择日期" v-model="form.date1"></el-date-picker>
	  </el-form-item>
	   <el-form-item label="栏目">
	    <el-select v-model="form.region" placeholder="选择新闻栏目">
	      <el-option label="国内新闻" value="shanghai"></el-option>
	      <el-option label="国际新闻" value="beijing"></el-option>
	      <el-option label="体育新闻" value="beijing"></el-option>
	      <el-option label="娱乐新闻" value="beijing"></el-option>
	    </el-select>
	  </el-form-item>
	    <el-form-item label="查看权限">
	    <el-checkbox-group v-model="form.type">
	      <el-checkbox label="全部" name="type"></el-checkbox>
	      <el-checkbox label="管理员" name="type"></el-checkbox>
	      <el-checkbox label="运营专员" name="type"></el-checkbox>
	      <el-checkbox label="客服" name="type"></el-checkbox>
	      <el-checkbox label="网站编辑" name="type"></el-checkbox>
	    </el-checkbox-group>
	  </el-form-item>
	  <el-form-item label="发布">
	    <el-switch on-text="" off-text="" v-model="form.delivery"></el-switch>
	  </el-form-item>
	  <el-form-item label="留言">
	    <el-radio-group v-model="form.resource">
	      <el-radio label="是"></el-radio>
	      <el-radio label="否"></el-radio>
	    </el-radio-group>
	  </el-form-item>
	  <el-form-item label="备注">
	    <el-input type="textarea" v-model="form.desc"></el-input>
	  </el-form-item>
</el-form>
<div style="margin-left: 80px;">
	 <vue-editor v-model="content"></vue-editor>
  <el-form class="mt10">
	    <el-button type="primary" @click="onSubmit">确定</el-button>
	    <el-button>取消</el-button>
</el-form>
</div>


	</div>
</template>

<script>
 import { VueEditor } from 'vue2-editor'
  export default {
  	 components: {
      VueEditor
   },
    data() {
      return {
      	content: '<h1>请输入新闻内容</h1>',
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