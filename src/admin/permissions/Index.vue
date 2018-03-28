<template>
	<div id="list">
		    <el-breadcrumb separator="/" class="breadcrumb">
			  <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
			  <el-breadcrumb-item>权限设置</el-breadcrumb-item>
			</el-breadcrumb>
			<el-tree
			  :data="data2"
			  show-checkbox
			  node-key="id"
			  default-expand-all='true'
			  :default-expanded-keys="[2, 3]"
			  :default-checked-keys="[4,5]"
			  :props="defaultProps">
			</el-tree>
				<el-row>
				<el-col :span="24">
					<el-button class="mt10" v-on:click="check" type="primary">确定</el-button>
					<el-button class="mt10" v-on:click="check">重置</el-button>
				</el-col>
			</el-row>
</div>
</template>
<script>
  export default {
    data() {
      return {
        data2: [{
          id: 1,
          label: '管理员',
          children: [{
            id: 4,
            label: '订单系统',
            children: [{
              id: 9,
              label: '订单查询'
            }, {
              id: 10,
              label: '订单删除'
            }]
          }]
        }, {
          id: 2,
          label: '运营专员',
          children: [{
            id: 5,
            label: '新闻发布'
          }, {
            id: 6,
            label: '新闻删除'
          }]
        }, {
          id: 3,
          label: '网站编辑',
          children: [{
            id: 7,
            label: '帮助信息编辑'
          }, {
            id: 8,
            label: '网站新闻编辑'
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      };
    }
  };
</script>