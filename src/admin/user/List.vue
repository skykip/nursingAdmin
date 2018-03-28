<template>
	<div id="list">
		    <el-breadcrumb separator="/" class="breadcrumb">
			  <el-breadcrumb-item :to="{ path: '/adminplat' }">首页</el-breadcrumb-item>
			  <el-breadcrumb-item>用户管理</el-breadcrumb-item>
			</el-breadcrumb>
		   
      <div class="haed-btn">
		   
			
        <span>用户名称：</span>
				<el-input placeholder="请输入用户名称" class="seach-text" v-model="userName"></el-input>
        <span>用户手机：</span>
				<el-input placeholder="请输入用户手机" class="seach-text" v-model="phoneNum"></el-input>
        <span>微信名：</span>
				<el-input placeholder="请输入微信名" class="seach-text" v-model="wechatName"></el-input>
          <el-button type="primary" icon="search" v-on:click="getSeach()">搜索</el-button>
      </div>
			 <el-table :data="list" border style="width: 100%"  tooltip-effect="dark" v-loading="loading">
		
				<el-table-column 
			    	prop="user_id" 
			    	label="用户ID" 
			    	width="100">
			    </el-table-column>
				<el-table-column 
					prop="name"
			    	label="账户名">
				
			    </el-table-column>
			    <el-table-column 
			    	prop="username" 
			    	label="用户名">
			    </el-table-column>
           <el-table-column prop="avatar" label="头像" width="100"><template slot-scope="scope">
      <img  :src="scope.row.avatar" alt="" style="width: 35px;height: 35px">
    </template></el-table-column>
				<el-table-column 
			    	prop="wechatname" 
			    	label="微信账户">
			    </el-table-column>
          <el-table-column 
			    	prop="birthday" 
			    	label="出生年月">
			    </el-table-column>
				<el-table-column 
			    	prop="usertype" 
			    	label="用户类型">
			    </el-table-column>
			    <el-table-column 
			    	prop="phoneNum" 
			    	label="手机号">
			    </el-table-column>

				
			    <el-table-column 
			    	prop="gender" 
			    	label="分组">
			    </el-table-column>
				<el-table-column 
			    	prop="orderAmount" 
			    	label="成交金额">
			    </el-table-column>
				<el-table-column 
			    	prop="orderQuantity" 
			    	label="成交订单">
			    </el-table-column>
			    <el-table-column prop="usercreattime" label="注册时间"></el-table-column>
				

			    <el-table-column label="操作" width="120">
					      <template slot-scope="scope">
					        <el-button 
					          @click.native.prevent="showOrder('/adminplat/userOrders',scope.row.user_id)"
					          type="text"
					          size="small">
					                 查看用户订单
					        </el-button>
					      
					      </template>
                 </el-table-column>
			  </el-table>
			
			
			 <div class="page-bar">
				  <ul>
				    <li v-if="cur>1"><a v-on:click="cur--,pageClick()">上一页</a></li>
				    <li v-if="cur==1"><a class="banclick">上一页</a></li>
				    <li v-if="cur>=num-1"><a v-on:click="btnClick(1)">1</a></li>
				    <li v-if="cur>=num"><a>...</a></li>
				    <li v-for="index in pagelist" v-bind:class="{'active': cur == index}">
				    	<a v-on:click="btnClick(index)">{{ index }}</a>
				    </li>
				    <li v-if="cur>=num && cur<=all-num"><a>....</a></li>
				    <li v-if="cur>=num && cur<=all-num+2"><a v-on:click="btnClick(all)">{{all}}</a></li>
				    <li v-if="cur!=all"><a v-on:click="cur++,pageClick()">下一页</a></li>
				    <li v-if="cur == all"><a class="banclick">下一页</a></li>
				    <li><a>共<i>{{all}}</i>页</a></li>
				  </ul>
			 </div>
	 </div>
</template>
<script>
import util from "../../js/util/util.js";
export default {
  data() {
    return {
      seachText: "",
      all: 100, //总页数
      cur: 1, //当前页码
      row: 10, //显示多条数据
      num: 5, //显示多少页码
      list: [],
      userName: null,
      phoneNum: null,
      wechatName: null,
      loading: false
    };
  },
  created() {
    this.getData();
  },
  watch: {
    cur: function(oldValue, newValue) {
      //console.log(oldValue+"====="+newValue);
      // console.log(arguments);
      this.getData(this.cur);
    }
  },
  methods: {
    getSeach() {
      if (this.userName == "") {
        this.userName = null;
      }
      if (this.phoneNum == "") {
        this.phoneNum = null;
      }
      if (this.wechatName == "") {
        this.wechatName = null;
      }
      this.getData();
    },
    getData(page) {
      var $this = this;
      $this.loading=true;
      if (page == null) {
        page = 1;
      }
      util.Ajax(
        "/api/admin/users/?_method=POST",
        {
          userName: this.userName,
          phoneNum: this.phoneNum,
          wechatName: this.wechatName,
          page: page,
          limit: this.row
        },
        function(data) {
          $this.all = data.data.totalPages;
          $this.list = data.data.data;
          $this.loading=false;
        },
        function(data) {
          console.log(data);
          $this.loading=false;
        }
      );
    },
    btnClick: function(data) {
      //页码点击事件
      console.log(data);
      if (data != this.cur) {
        this.cur = data;
      }
    },
    pageClick: function() {
      //点击上一页下一页
      console.log("现在在" + this.cur + "页");
    },

    showOrder: function(url, id) {
      this.$router.push({ path: url, query: { userId: id } });
    }
  },
  computed: {
    pagelist: function() {
      //分页
      var left = 1;
      var right = this.all;
      var Arr = [];
      if (this.all >= this.num) {
        if (this.cur > 3 && this.cur < this.all - 2) {
          left = this.cur - 2;
          right = this.cur + 2;
        } else {
          if (this.cur <= 3) {
            left = 1;
            right = this.num;
          } else {
            right = this.all;
            left = this.all - 4;
          }
        }
      }
      while (left <= right) {
        Arr.push(left);
        left++;
      }
      return Arr;
    }
  },
  mounted: function() {}
};
</script>
