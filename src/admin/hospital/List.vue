<template>

	<div id="list">
		    <el-breadcrumb separator="/" class="breadcrumb">
			  <el-breadcrumb-item :to="{ path: '/adminplat' }">首页</el-breadcrumb-item>
			  <el-breadcrumb-item>医院管理</el-breadcrumb-item>
			</el-breadcrumb>
		     <div class="haed-btn">
		   
				<el-button type="primary"  v-on:click="add('/adminplat/hospitalAdd')"><i class="el-icon-plus"></i> 添加</el-button>
                <span>医院名称：</span>
				<el-input placeholder="请输入医院名称" class="seach-text" v-model="seachText">
  </el-input>
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
               
                <el-button type="primary" icon="search" v-on:click="getData()">查询</el-button>
			</div>
			 <el-table :data="list" border style="width: 100%" height="700" tooltip-effect="dark" v-loading="loading">
			 
                <el-table-column 
			    	prop="hospital_id" 
			    	label="序号" 
			    	width="55">
			    </el-table-column>
			    <el-table-column 
			    	prop="name" 
			    	label="医院名称" 
			    	width="200">
			    </el-table-column>
			    <el-table-column 
			    	prop="tel" 
			    	label="电话号码">
			    </el-table-column>
			    <el-table-column 
			    	prop="state" 
			    	label="所在省份">
			    </el-table-column>
                <el-table-column 
			    	prop="city" 
			    	label="城市">
			    </el-table-column>
                <el-table-column 
			    	prop="region" 
			    	label="所在区">
			    </el-table-column>
                <el-table-column 
			    	prop="address" 
			    	label="具体地址">
			    </el-table-column>
                <el-table-column 
			    	prop="level" 
			    	label="医院等级">
			    </el-table-column>
                <el-table-column 
			    	prop="areacode" 
			    	label="邮政编码">
			    </el-table-column>
              
                <el-table-column 
			    	label="位置">
                    <template slot-scope="scope">
                        <el-button v-if="isLatLng(scope.$index, list)"
                            @click.native.prevent="openMap(scope.$index, list)"
                            type="text"
                            size="small">
                                    地图位置
                        </el-button>
                     </template>
			    </el-table-column>
                <el-table-column 
			    	prop="hospitalcreattime" 
			    	label="录入时间">
			    </el-table-column>
               
			    <el-table-column label="操作" width="120">
					      <template slot-scope="scope">
					        <el-button class="red"
					          @click.native.prevent="remove(scope.$index, list)"
					          type="text"
					          size="small">
					                 移除
					        </el-button>
					        <el-button
					          @click.native.prevent='sureEdit("/adminplat/hospitalAdd",scope.$index,list)'
					          type="text"
					          size="small" >
					                编辑
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
             <div id="mapDiv" class="fullScreen">
                 <div class="fullback" v-on:click="closeMap()"></div>
                 <div id="container" class="mapmain"></div>
             </div>
	 </div>
     
</template>
<style scoped="scoped">
.fullScreen {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 9999;
  display: none;
}
.fullback {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  opacity: 0.7;
  background-color: black;
}
.mapmain {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 800px;
  height: 500px;
  margin-left: -400px;
  margin-top: -250px;
}
</style>
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
      loading:false,
      list: [],
      stateList: ["所有"],
      cityList: ["所有"],
      regionList: ["所有"],
      curState: "所有", //当前所选省份
      curCity: "所有", //当前所选城市
      curRegion: "所有" //当前所选区
    };
  },
  watch: {
    cur: function(oldValue, newValue) {
      //console.log(oldValue+"====="+newValue);
      // console.log(arguments);
    }
  },
  created() {
    this.begin();
  },

  methods: {
    begin() {
      this.getData();
      this.getAllState();
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
    },
    getData: function(page) {
      var $this = this;
      $this.loading=true;
      let _state = null;
      let _city = null;
      let _region = null;
      if (page == null) {
        page = 1;
      }
      if (this.curState != "所有") {
        _state = this.curState;
      }
      if (this.curCity != "所有") {
        _city = this.curCity;
      }
      if (this.curRegion != "所有") {
        _region = this.curRegion;
      }
      if (this.seachText != "") {
        util.Ajax(
          "/api/hospital/likeSearchHospitalName/",
          {
            page: page,
            limit: this.row,
            state: _state,
            city: _city,
            region: _region,
            hospitalName: this.seachText
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
      } else {
        util.Ajax(
          "/api/hospital/",
          {
            page: page,
            limit: this.row,
            state: _state,
            city: _city,
            region: _region
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
      }
    },
    btnClick: function(data) {
      //页码点击事件
      console.log(data);
      if (data != this.cur) {
        this.cur = data;
        this.getData(this.cur);
      }
    },
    pageClick: function() {
      //点击上一页下一页
      console.log("现在在" + this.cur + "页");
      this.getData(this.cur);
    },
    remove: function(index, rows) {
      //删除
      let id = rows[index].hospital_id;
      var $this = this;
      const confirm = this.$confirm({
        title: "删除医院",
        text:
          '<div class="title">确定要将 ' +
          rows[index].name +
          " 的资料从库里删除吗？</div>",
        dangerouslyUseHTMLString: true,
        button: [
          {
            text: "确定",
            ontap: function() {
              confirm.close().then(function(res) {
                util.Ajax(
                  "/api/hospital/deleteHospital/" + id + "?_method=delete",
                  {},
                  function(data) {
                    $this.$message({
                      message: "恭喜你，操作成功",
                      type: "success"
                    });
                    rows.splice(index, 1);
                  },
                  function(data) {
                    $this.$message.error("操作失败");
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
    removeOpt: function(id, index, rows) {
      console.log(id, index);
      //return;
    },
    add: function(url, queryParams) {
      //添加
      queryParams = queryParams || {};
      this.$router.push({ path: url, params: queryParams });
    },
    sureEdit: function(url, index, rows) {
      //确定编辑修改
      let _id = rows[index].hospital_id;
      this.$router.push({ path: url, query: { hospitalId: _id } });
    },
    isLatLng: function(index, rows) {
      let lng = rows[index].lng;
      let lat = rows[index].lat;
      if (lng == null || lat == null || lng == 0 || lat == 0) {
        return false;
      }
      return true;
    },
    openMap: function(index, rows) {
      var lng = rows[index].lng;
      var lat = rows[index].lat;
      var myLatlng = new qq.maps.LatLng(lat, lng);
      var myOptions = {
        zoom: 15,
        center: myLatlng,
        mapTypeId: qq.maps.MapTypeId.ROADMAP
      };
      var mapContent = document.getElementById("container");
      mapContent.innerHTML = "";
      var map = new qq.maps.Map(mapContent, myOptions);
      var marker = new qq.maps.Marker({
        position: myLatlng,
        map: map
      });
      var markertest = new qq.maps.Label({
        position: myLatlng,
        map: map,
        content: rows[index].name
      });

      var mapDiv = document.getElementById("mapDiv");
      mapDiv.style.display = "block";
    },
    closeMap: function() {
      var mapDiv = document.getElementById("mapDiv");
      mapDiv.style.display = "none";
    }
  },
  watch: {
    curState: "getAllCity",
    curCity: "getAllRegion"
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
