<template>
	<div id="list">
		    <el-breadcrumb separator="/" class="breadcrumb">
			  <el-breadcrumb-item :to="{ path: '/adminplat' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/adminplat/user' }">用户列表</el-breadcrumb-item>
			  <el-breadcrumb-item>用户订单</el-breadcrumb-item>
			</el-breadcrumb>
		     
			 <el-table :data="list" border style="width: 100%"  tooltip-effect="dark" v-loading="loading">
		
				<el-table-column 
			    	prop="order_id" 
			    	label="序号" 
			    	width="100">
			    </el-table-column>
          <el-table-column 
			    	prop="tradeNum" 
			    	label="订单号">
			    </el-table-column>
				<el-table-column 
			    	label="订单状态">
            <template slot-scope="scope">{{config.orderStatus[scope.row.status]}} </template>
			    </el-table-column>
			    <el-table-column 
			    	prop="dependentLevel" 
			    	label="陪护等级">
			    </el-table-column>
          
				<el-table-column 
			    	prop="price" 
			    	label="订单金额（元）">
			    </el-table-column>
          <el-table-column 
			    	prop="createdAt" 
			    	label="订单时间">
			    </el-table-column>
				
			    <el-table-column 
			    	label="陪护时段">
            <template slot-scope="scope">{{config.orderDay[scope.row.nursingTime]}} </template>
			    </el-table-column>

				
			  
				

			    <el-table-column label="操作" width="120">
					      <template slot-scope="scope">
					        <el-button 
					          @click.native.prevent="showOrderInfo('/adminplat/OrderInfo',scope.row.order_id)"
					          type="text"
					          size="small">
					                 查看详情
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
      list:[],
      user_id:0,
      all: 100, //总页数
      cur: 1, //当前页码
      row: 10, //显示多条数据
      num: 5, //显示多少页码
      config:null,
      loading:false,
    };
  },
  created() {
    this.config = require("../../assets/config.json");
    if (this.$route.query.userId != null) {
      this.user_id=this.$route.query.userId;
      this.getUserOrderList();
    }
  },
  watch: {
    cur: function(oldValue, newValue) {
      //console.log(oldValue+"====="+newValue);
      // console.log(arguments);
      this.getUserOrderList(this.cur);
    }
  },
  methods: {
    getUserOrderList(page) {
      var $this = this;
      $this.loading=true;
       if (page == null) {
        page = 1;
      }
      util.Ajax(
        "/api/admin/orders/getOrderByUserId/" + this.user_id,
        {page:page,
        limit:10},
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
    showOrderInfo:function(url,id){
      this.$router.push({ path: url, query: { orderid: id } });
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
  }
};
</script>
