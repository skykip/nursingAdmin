<template>
	<div id="list">
		    <el-breadcrumb separator="/" class="breadcrumb">
			  <el-breadcrumb-item :to="{ path: '/adminplat' }">首页</el-breadcrumb-item>
			  <el-breadcrumb-item>订单管理</el-breadcrumb-item>
			</el-breadcrumb>
		      <div class="haed-btn">
		   
			
        <span>用户名称：</span>
				<el-input placeholder="请输入用户名称" class="seach-text" v-model="customerName" style="width:150px"></el-input>
        <span>护工名称：</span>
				<el-input placeholder="请输入护工名称" class="seach-text" v-model="workName" style="width:150px"></el-input>
        <span>订单号：</span>
				<el-input placeholder="请输入订单号" class="seach-text" v-model="tradeNum" style="width:250px"></el-input>
        
        <span>开始日期：</span>
        <el-date-picker  v-model="startDate"  align="right"  type="date"  placeholder="选择开始时间"> </el-date-picker>
        <span>结束日期：</span>
        <el-date-picker  v-model="endDate"  align="right"  type="date"  placeholder="选择结束时间"> </el-date-picker>
        <span>服务等级：</span>
        <el-select v-model="dependentLevel" style="width:100px">
          <el-option v-for="o in [{k:0,name:'不限'},{k:1,name:'Level 1'},{k:2,name:'Level 2'},{k:3,name:'Level 3'}]" :key="o.name" :label="o.name" :value="o.k"></el-option>  
        </el-select>
        <span>护理时段：</span>
        <el-select v-model="nursingTime" style="width:100px">
          <el-option v-for="o in [{k:0,name:'不限'},{k:1,name:'白天'},{k:2,name:'晚上'},{k:3,name:'全天'}]" :key="o.name" :label="o.name" :value="o.k"></el-option>  
        </el-select>
      
        <span>医院：</span>
        <el-select v-model="hospitalId" style="width:300px">
          <el-option v-for="o in hospitalIdList" :key="o.name" :label="o.name" :value="o.hospital_id"></el-option>  
        </el-select>
        <span>省份：</span>
        <el-select v-model="curState" style="width:100px">
          <el-option v-for="o in stateList" :key="o" :label="o" :value="o"></el-option>  
        </el-select>
        <span>城市：</span>
        <el-select v-model="curCity" style="width:100px">
          <el-option v-for="o in cityList" :key="o" :label="o" :value="o"></el-option>  
        </el-select>
        <span>区域：</span>
        <el-select v-model="curRegion" style="width:100px">
          <el-option v-for="o in regionList" :key="o" :label="o" :value="o"></el-option>  
        </el-select>
        <el-button type="primary" icon="search" v-on:click="getSeach()" >搜索</el-button>
      </div>
			 <el-table :data="list" border style="width: 100%"  tooltip-effect="dark" v-loading="loading">
				<el-table-column 
			    	prop="tradeNum" 
			    	label="订单号">
			    </el-table-column>
          <el-table-column 
			    	prop="customer.name" 
			    	label="用户姓名">
			    </el-table-column>
          <el-table-column 
			    	prop="work.name" 
			    	label="护工姓名">
			    </el-table-column>
         
				<el-table-column 
			    	label="订单状态">
            <template slot-scope="scope">{{config.orderStatus[scope.row.status]}} </template>
			    </el-table-column>
			   
          <el-table-column 
			    	label="陪护状况">
            <template slot-scope="scope">{{scope.row.dependentLevel}}_{{config.orderDay[scope.row.nursingTime]}} </template>
			    </el-table-column>
           <el-table-column 
			    	prop="endDate" 
			    	label="开始日期">
			    </el-table-column>
          <el-table-column 
			    	prop="startDate" 
			    	label="结束日期">
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
			    	label="所属地区">
            <template slot-scope="scope">{{scope.row.hospital.state}}_{{scope.row.hospital.city}}_{{scope.row.hospital.region}} </template>
			    </el-table-column>
          <el-table-column 
			    	prop="hospital.name" 
			    	label="所属医院">
			    </el-table-column>


			    <el-table-column label="操作" width="50">
					      <template slot-scope="scope">
					        <el-button 
					          @click.native.prevent="showOrderInfo('/adminplat/OrderInfo',scope.row.order_id)"
					          type="text"
					          size="small">
					                 详情
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
      list: [],
      all: 100, //总页数
      cur: 1, //当前页码
      row: 10, //显示多条数据
      num: 5, //显示多少页码
      config: null,

      loading:false,

      customerName: null,
      workName: null,
      tradeNum: null,
      startDate: null,
      endDate: null,
      dependentLevel: 0,
      nursingTime: 0,

      hospitalId: 0, //0：不限，其他直接传医院id
      state: 0,
      city: 0,
      region: 0,

      stateList: ["所有"],
      cityList: ["所有"],
      regionList: ["所有"],
      hospitalIdList: [],
      curCityList: [],
      curRegionList: [],
      curState: "所有", //当前所选省份
      curCity: "所有", //当前所选城市
      curRegion: "所有" //当前所选区
    };
  },
  created() {
    this.config = require("../../assets/config.json");
    this.getAllHospital();
    this.getAllState();
    this.getData();
  },
  watch: {
    cur: function(oldValue, newValue) {
      this.getData(this.cur);
    },
    curState: "getAllCity",
    curCity: "getAllRegion"
  },
  methods: {
    getSeach() {
      if (this.customerName == "") {
        this.customerName = null;
      }
      if (this.workName == "") {
        this.workName = null;
      }
      if (this.tradeNum == "") {
        this.tradeNum = null;
      }
      if (this.startDate == "") {
        this.startDate = null;
      }
      if (this.endDate == "") {
        this.endDate = null;
      }
      if (this.curState == "所有") {
        this.state = 0;
      } else {
        this.state = this.curState;
      }
      if (this.curCity == "所有") {
        this.city = 0;
      } else {
        this.city = this.curCity;
      }
      if (this.curRegion == "所有") {
        this.region = 0;
      } else {
        this.region = this.curRegion;
      }
      this.getData();
    },
    getData(page) {
      var $this = this;
      if (page == null) {
        page = 1;
      }
      this.loading=true;
      util.Ajax(
        "/api/admin/orders/?_method=POST",
        {
          page: page,
          limit: 10,

          customerName: this.customerName,
          workName: this.workName,
          tradeNum: this.tradeNum,
          startDate: this.startDate,
          endDate: this.endDate,
          dependentLevel: this.dependentLevel,
          nursingTime: this.nursingTime,
          hospitalId: this.hospitalId,
          state: this.state,
          city: this.city,
          region: this.region
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
    showOrderInfo: function(url, id) {
      this.$router.push({ path: url, query: { orderid: id } });
    },
    getAllHospital: function() {
      var $this = this;
      this.hospitalId = 0;
      this.hospitalIdList = [{ hospital_id: 0, name: "不限" }];
      util.Ajax(
        "/api/hospital/",
        {},
        function(data) {
          let indata = data.data.data;
          for (var k in indata) {
            $this.hospitalIdList.push(indata[k]);
          }
        },
        function(data) {
          console.log(data);
        }
      );
    },
    getAllState: function() {
      var $this = this;
      util.Ajax(
        "/api/hospital/state",
        {},
        function(data) {
          for (var v in data.data.state) {
            $this.stateList.push(data.data.state[v]);
          }
          $this.curState = $this.stateList[0];
        },
        function(data) {
          console.log(data);
        }
      );
    },
    getAllCity: function() {
      var $this = this;
      let _state = null;
      if (this.curState != "所有") {
        _state = this.curState;
      }
      util.Ajax(
        "/api/hospital/city",
        { state: _state },
        function(data) {
          $this.cityList = ["所有"];
          for (var v in data.data.city) {
            $this.cityList.push(data.data.city[v]);
          }
          $this.curCity = $this.cityList[0];
        },
        function(data) {
          console.log(data);
        }
      );
    },
    getAllRegion: function(city) {
      var $this = this;
      util.Ajax(
        "/api/hospital/region",
        { city: city },
        function(data) {
          $this.regionList = ["所有"];
          for (var v in data.data[0].regions) {
            $this.regionList.push(data.data[0].regions[v].region);
            console.log(data.data[0].regions[v].region);
          }
          $this.curRegion = $this.regionList[0];
        },
        function(data) {
          console.log(data);
        }
      );
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
