<template>
	<div class="add">	
		 <el-breadcrumb separator="/" class="breadcrumb">
			  <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
			  <el-breadcrumb-item>站点基本信息</el-breadcrumb-item>
			</el-breadcrumb>
<el-form ref="form" :model="form" label-width="80px">
  <el-form-item label="网站名称">
    <el-input v-model="form.name"></el-input>
  </el-form-item>
  <el-form-item label="网站SEO">
    <el-input v-model="form.name"></el-input>
  </el-form-item>
    <el-form-item label="网站描述">
    <el-input type="textarea" v-model="form.desc"></el-input>
  </el-form-item>
  <el-form-item label="网站域名">
    <el-input v-model="form.name"></el-input>
  </el-form-item>
  <el-form-item label="网站关闭">
    <el-switch on-text="" off-text="" v-model="form.delivery"></el-switch>
  </el-form-item>
  <el-form-item label="ICP备案信息">
    <el-input v-model="form.name"></el-input>
  </el-form-item>

  <el-form-item label="统计代码">
    <el-input type="textarea" v-model="form.desc"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">确定</el-button>
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
          date1: '',
          date2: '',
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