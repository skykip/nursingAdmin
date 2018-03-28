<template>
	<div id="list">
		    <el-breadcrumb separator="/" class="breadcrumb">
			  <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
			  <el-breadcrumb-item>用户管理</el-breadcrumb-item>
			</el-breadcrumb>
		     <div class="haed-btn">
		     	<el-button type="primary"><i class="el-icon-delete"></i> 批量删除</el-button>
		     	   <el-date-picker
		      v-model="value2"
		      align="right"
		      type="date"
		      placeholder="选择备份时间"
		      :picker-options="pickerOptions1">
		    </el-date-picker>
		    <el-button type="primary" v-on:click="addMessage">备份</el-button>
			</div>
			 <el-table :data="list" border style="width: 100%" height="450" tooltip-effect="dark">
			 	<el-table-column
			      type="selection"
			      width="55">
			    </el-table-column>
			    <el-table-column 
			    	prop="id" 
			    	label="序号" 
			    	width="100">
			    </el-table-column>
			    <el-table-column 
			    	prop="userName" 
			    	label="占用空间">
			    </el-table-column>
			    <el-table-column 
			    	prop="mobile" 
			    	label="编码">
			    </el-table-column>
			     <el-table-column 
			    	prop="state"
			    	label="状态">
			    </el-table-column>
			    <el-table-column prop="lastactivitydate" label="数据备份"></el-table-column>
			    <el-table-column label="操作" width="150">
			    	
					      <template slot-scope="scope">
					      	    <el-button type="text">还原</el-button>
					        <el-button class="red"
					          @click.native.prevent="remove(scope.$index, list)"
					          type="text"
					          size="small">
					                 删除
					        </el-button>
					        <el-button
					          @click.native.prevent='sureEdit("",scope.$index)'
					          type="text"
					          size="small" >
					                下载
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
export default{
		data (){
			return {
				    seachText:'',
			   	    all:100, //总页数
			        cur: 1,//当前页码
			        row:10,//显示多条数据
			        num:5, //显示多少页码
				    list:[{
					        "id": "1",
					        "userName": "340B",
					        "mobile": "utf8_general_ci",
					        "state":"成功",
					        "lastactivitydate": "2017-06-09"
					    },
					    {
					        "id": "2",
					        "userName": "340B",
					        "mobile": "utf8_general_ci ",
					        "state":"失败",
					        "lastactivitydate": "2017-06-09"
					    },
					    {
					        "id": "3",
					        "userName": "33B",
					        "mobile": "utf8_general_ci",
					        "state":"成功",
					        "lastactivitydate": "2017-06-09"
					    },
					    {
					        "id": "4",
					        "userName": "333GB",
					        "mobile": "utf8_general_ci",
					        "state":"成功",
					        "lastactivitydate": "2017-06-09"
					    },
					    {
					        "id": "5",
					        "userName": "333GB",
					        "mobile": "utf8_general_ci",
					        "state":"成功",
					        "lastactivitydate": "2017-06-09"
					    },
					    {
					        "id": "6",
					        "userName": "333GB",
					        "mobile": "utf8_general_ci",
					        "state":"成功",
					        "lastactivitydate": "2017-06-09"
					    },
					    {
					        "id": "7",
					        "userName": "333GB",
					        "mobile": "utf8_general_ci",
					        "state":"成功",
					        "lastactivitydate": "2017-06-09"
					    },
					    {
					        "id": "8",
					        "userName": "333GB",
					        "mobile": "utf8_general_ci",
					        "state":"成功",
					        "lastactivitydate": "2017-06-09"
					    },
					    {
					        "id": "9",
					        "userName": "333GB",
					        "mobile": "utf8_general_ci",
					        "state":"成功",
					        "lastactivitydate": "2017-06-09"
					    },
					    {
					        "id": "10",
					        "userName": "333GB",
					        "mobile": "utf8_general_ci",
					        "state":"成功",
					        "lastactivitydate": "2017-06-09"
					    },
					    {
					        "id": "11",
					        "userName": "333GB",
					        "mobile": "utf8_general_ci",
					        "state":"成功",
					        "lastactivitydate": "2017-06-09"
					    },
					    {
					        "id": "12",
					        "userName": "333GB",
					        "mobile": "utf8_general_ci",
					        "state":"成功",
					        "lastactivitydate": "2017-06-09"
					    }]
			}
		},
		watch:{
			 cur: function(oldValue , newValue){
				       //console.log(oldValue+"====="+newValue);
				       // console.log(arguments);
				    }
		},
		methods:{
			btnClick: function(data){//页码点击事件
				console.log(data)
			    if(data != this.cur){
			        this.cur = data 
			      }
			    
			    },
		    pageClick: function(){ //点击上一页下一页
		      console.log('现在在'+this.cur+'页');
		    },
		    remove:function(index, rows) { //删除
			        rows.splice(index, 1);
			      },
		    add:function(url,queryParams){ //添加
		    	 queryParams = queryParams || {};
				this.$router.push({path:url, params:queryParams})
		    },
		    sureEdit:function(url,id){ //确定编辑修改
		      this.$router.push({path:url,query:{userId:id}})
		    }
		},
	   computed:{
			    pagelist: function(){ //分页
				     var left = 1;
				     var right = this.all;
				     var Arr = [];
				     if(this.all>= this.num){
				      if(this.cur > 3 && this.cur < this.all-2){
				          left = this.cur - 2
				          right = this.cur + 2
				      }else{
				        if(this.cur<=3){
				          left = 1
				          right = this.num
				        }else{
				          right = this.all
				          left = this.all -4
				        }
				      }
				     }
				    while (left <= right){
				      Arr.push(left)
				      left ++
				     }
				    return Arr
				    }	
			 },
	    mounted:function(){
	    	
	    }
				
	}
</script>