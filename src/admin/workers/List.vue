<template>
	<div id="list">
		    <el-breadcrumb separator="/" class="breadcrumb">
			  <el-breadcrumb-item :to="{ path: '/adminplat' }">首页</el-breadcrumb-item>
			  <el-breadcrumb-item>护工管理</el-breadcrumb-item>
			</el-breadcrumb>
		   
      <div class="haed-btn">
		   
			
        <span>用户名称：</span>
				<el-input placeholder="请输入用户名称" class="seach-text" v-model="Name" style="width:100px"></el-input>
        <span>用户手机：</span>
				<el-input placeholder="请输入用户手机" class="seach-text" v-model="phoneNum" style="width:150px"></el-input>
        <span>微信名：</span>
				<el-input placeholder="请输入微信名" class="seach-text" v-model="wechatName" style="width:100px"></el-input>
        <span>身份证号码：</span>
				<el-input placeholder="请输入身份证号码" class="seach-text" v-model="idCardNum" style="width:300px"></el-input>
       
        <span>星级：</span>
        <el-select v-model="star" style="width:100px">
          <el-option v-for="o in [{k:0,name:'不限'},{k:1,name:1},{k:2,name:2},{k:3,name:3},{k:4,name:4},{k:5,name:5}]" :key="o.name" :label="o.name" :value="o.k"></el-option>  
        </el-select>
        <span>性别：</span>
        <el-select v-model="gender" style="width:100px">
          <el-option v-for="o in [{k:0,name:'不限'},{k:1,name:'男'},{k:2,name:'女'}]" :key="o.name" :label="o.name" :value="o.k"></el-option>  
        </el-select>
        <span>类别：</span>
        <el-select v-model="workType" style="width:100px">
          <el-option v-for="o in [{k:0,name:'不限'},{k:1,name:'平台'},{k:2,name:'自聘'}]" :key="o.name" :label="o.name" :value="o.k"></el-option>  
        </el-select>
        <span>状态：</span>
        <el-select v-model="workStatus" style="width:100px">
          <el-option v-for="o in [{k:0,name:'不限'},{k:1,name:'工作中'},{k:2,name:'休息中'}]" :key="o.name" :label="o.name" :value="o.k"></el-option>  
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
          <el-button type="primary" icon="search" v-on:click="getSeach()">搜索</el-button>
      </div>
     
      <el-menu :default-active="curTabIndex" class="el-menu-demo" mode="horizontal" @select="changeTab">
        <el-menu-item index="0">在职护工</el-menu-item>
        <el-menu-item index="1">已回收护工</el-menu-item>
      </el-menu>
			 <el-table :data="list" border style="width: 100%"  tooltip-effect="dark" v-loading="loading">
		
				<el-table-column 
			    	prop="work_id" 
			    	label="ID" 
			    	width="60">
			    </el-table-column>
				
			    <el-table-column 
			    	prop="name" 
			    	label="用户名" width="80">
			    </el-table-column>
         
    <el-table-column 
			    	prop="gender_desc" 
			    	label="性别" width="50">
            </el-table-column>
				<el-table-column 
			    	prop="user.wechatname" 
			    	label="微信账户">
			    </el-table-column>
          <el-table-column 
			    	prop="idCardNum" 
			    	label="身份证">
			    </el-table-column>
				<el-table-column 
			    	label="当前状态">
             <template slot-scope="scope">{{config.workStatus[scope.row.workStatus]}} </template>
			    </el-table-column>
			    <el-table-column 
			    	prop="phoneNum" 
			    	label="手机号" width="120">
			    </el-table-column>
          <el-table-column 
			    	prop="workType_desc" 
			    	label="类型">
			    </el-table-column>
          <el-table-column 
			    	prop="star" 
			    	label="星级" 
			    	width="50">
			    </el-table-column>
          	<el-table-column 
			    	prop="prov" 
			    	label="省份">
			    </el-table-column>
          	<el-table-column 
			    	prop="city" 
			    	label="城市">
			    </el-table-column>
				<el-table-column
			    	label="服务医院" width="250">
             <template slot-scope="scope">
                <ul><li v-for="(item,index) in scope.row.services" >
					                 {{item.hospital.name}}
                  </li></ul>
             </template>
			    </el-table-column>
			
				

			    <el-table-column label="操作" width="120" v-if="curTabIndex==0">
					      <template slot-scope="scope">
					        <el-button 
					          @click.native.prevent="showWork('/adminplat/workerInfo',scope.row)"
					          type="text"
					          size="small">
					                 查看详情
					        </el-button>
					      <el-button class="red" 
					          @click.native.prevent="toTrun(scope.$index)"
					          type="text"
					          size="small">
					                 回收
					        </el-button>
                 
					      </template>
                 </el-table-column>
              <el-table-column label="操作" width="120" v-if="curTabIndex==1">
					      <template slot-scope="scope" >
                  <el-button 
					          @click.native.prevent="NoTrun(scope.$index)"
					          type="text"
					          size="small">
					                 撤消回收
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
      curTabIndex:"0",
      config: null,
      loading: false,
      all: 100, //总页数
      cur: 1, //当前页码
      row: 10, //显示多条数据
      num: 5, //显示多少页码

      list: [],
      Name: null,
      phoneNum: null,
      wechatName: null,
      idCardNum: null,
      star: 0, //0：不限，其他星级直接传“1、2、3、4、5”）
      gender: 0, //0：不限，1：男，2：女
      workType: 0, //0：不限，1：平台，2：自聘
      hospitalId: 0, //0：不限，其他直接传医院id
      state: 0,
      city: 0,
      region: 0,
      workStatus: 0, //0：不限，1：工作中，2：休息中,

      genderTxt: "不限",

      allStateData: null,
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
    this.allStateData = require("../../assets/area.json");
    this.config = require("../../assets/config.json");
    this.getAllState();
    this.getAllHospital();
    this.getData();
  },
  watch: {
    cur: function(oldValue, newValue) {
      //console.log(oldValue+"====="+newValue);
      // console.log(arguments);
      this.getData(this.cur);
    },
    curState: "getAllCity",
    curCity: "getAllRegion"
  },
  methods: {
    getSeach() {
      if (this.Name == "") {
        this.Name = null;
      }
      if (this.phoneNum == "") {
        this.phoneNum = null;
      }
      if (this.wechatName == "") {
        this.wechatName = null;
      }
      if (this.idCardNum == "") {
        this.idCardNum = null;
      }
      this.getData();
    },
    changeTab: function(key, keyPath) {
      //console.log(key, keyPath);
      this.curTabIndex = key;
      this.cur = 1;
      this.getData();
    },
    getData(page) {
      var $this = this;
      $this.loading=true;
      if (page == null) {
        page = 1;
      }
      let url = "/api/admin/works/allWorks?_method=POST";
      if (this.curTabIndex == "1") {
        url = "/api/admin/works/deletedWorks?_method=POST";
      }
      if (this.curState != "所有") {
        this.state = this.curState;
      } else {
        this.state = 0;
      }
      if (this.curCity != "所有") {
        this.city = this.curCity;
      } else {
        this.city = 0;
      }
      if (this.curRegion != "所有") {
        this.region = this.curRegion;
      } else {
        this.region = 0;
      }
      util.Ajax(
        url,
        {
          status: 1,
          Name: this.Name,
          phoneNum: this.phoneNum,
          wechatName: this.wechatName,
          idCardNum: this.idCardNum,
          star: this.star,
          gender: this.gender,
          workType: this.workType,
          hospitalId: this.hospitalId,
          state: this.state,
          city: this.city,
          region: this.region,
          workStatus: this.workStatus,
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
    },
    getAllState: function() {
      this.curCityList = [];
      this.curRegionList = [];
      for (var key in this.allStateData) {
        let n = this.allStateData[key].name;
        this.stateList.push(n);
        this.curCityList[n] = this.allStateData[key].city;
      }
    },
    getAllCity: function() {
      this.cityList = ["所有"];
      this.regionList = ["所有"];
      this.curRegionList = [];
      this.curCity = "所有";
      this.curRegion = "所有";
      let inlist = this.curCityList[this.curState];
      for (var key in inlist) {
        let n = inlist[key].name;
        this.cityList.push(n);
        this.curRegionList[n] = inlist[key].area;
      }
    },
    getAllRegion: function(city) {
      this.regionList = ["所有"];
      this.curRegion = "所有";
      let inlist = this.curRegionList[this.curCity];
      for (var key in inlist) {
        this.regionList.push(inlist[key]);
      }
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
    toTrun: function(index) {
      //删除
      let id = this.list[index].work_id;
      var $this = this;
      const confirm = this.$confirm({
        title: "回收护工",
        text:
          '<div class="title">确定要将 ' +
          this.list[index].name +
          " 回收吗？</div>",
        dangerouslyUseHTMLString: true,
        button: [
          {
            text: "确定",
            ontap: function() {
              confirm.close().then(function(res) {
                util.Ajax(
                  "/api/admin/works/" + id + "?_method=delete",
                  {},
                  function(data) {
                    $this.list.splice(index, 1);
                  },
                  function(data) {
                    console.log(data);
                  }
                );
              });
            }
          },
          {
            text: "取消",
            ontap: function() {
              confirm.close().then(function(res) {
                console.log("close");
              });
            }
          }
        ]
      });
    },
    NoTrun: function(index) {
      let id = this.list[index].work_id;
      var $this = this;
      const confirm = this.$confirm({
        title: "撤消回收",
        text:
          '<div class="title">确定要将 ' +
          this.list[index].name +
          " 恢复吗？</div>",
        dangerouslyUseHTMLString: true,
        button: [
          {
            text: "确定",
            ontap: function() {
              confirm.close().then(function(res) {
                util.Ajax(
                  "/api/admin/works/" + id + "/restore?_method=put",
                  {},
                  function(data) {
                    $this.list.splice(index, 1);
                  },
                  function(data) {
                    console.log(data);
                  }
                );
              });
            }
          },
          {
            text: "取消",
            ontap: function() {
              confirm.close().then(function(res) {
                console.log("close");
              });
            }
          }
        ]
      });
    },
    showWork: function(url, queryParams) {
      queryParams = queryParams || {};
      console.log(queryParams.work_id);
      this.$router.push({ path: url, query: { work_id: queryParams.work_id } });
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
