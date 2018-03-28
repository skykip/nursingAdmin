<template>

	<div id="list">
		<el-breadcrumb separator="/" class="breadcrumb">
			  <el-breadcrumb-item :to="{ path: '/adminplat' }">首页</el-breadcrumb-item>
			  <el-breadcrumb-item>护工审核</el-breadcrumb-item>
		</el-breadcrumb>
		
      <el-menu :default-active="curTabIndex" class="el-menu-demo" mode="horizontal" @select="changeTab">
        <el-menu-item index="0">等待审核</el-menu-item>
        <el-menu-item index="1">未提交审核</el-menu-item>
        <el-menu-item index="2">未通过</el-menu-item>
      </el-menu>
			<el-table :data="list" border style="width: 100%" height="700" tooltip-effect="dark" v-loading="loading">
			 
        <el-table-column prop="work_id" label="编号" width="55"></el-table-column>
			  <el-table-column prop="name" label="护工姓名" width="100"></el-table-column>
        <el-table-column prop="avatar" label="护工头像" width="100"><template slot-scope="scope">
      <img  :src="scope.row.avatar" alt="" style="width: 50px;height: 50px">
    </template></el-table-column>
        <el-table-column prop="gender_desc" label="性别" width="55"></el-table-column>
        <el-table-column prop="age" label="年龄" width="55"></el-table-column>
			  <el-table-column prop="phoneNum" label="电话号码" width="120"></el-table-column>
			  <el-table-column prop="prov" label="所在省份" width="100"></el-table-column>
        <el-table-column 	prop="level_desc" label="护理等级" width="100"></el-table-column>
        <el-table-column prop="idCardNum" label="身份证号" width="200"></el-table-column>
        <el-table-column prop="description" label="个人介绍" ></el-table-column>
        <el-table-column label="证件" width="50" v-if="curTabIndex==0 ||curTabIndex==2"> <template slot-scope="scope">
					        <el-button class="red" 
					          @click.native.prevent="showCard(scope.$index, list)"
					          type="text"
					          size="small">
					                 查看
					        </el-button>
					      
					      </template>
        </el-table-column>
			  <el-table-column label="操作" width="200" v-if="curTabIndex==0">
					      <template slot-scope="scope">
					        <el-button class="red"
					          @click.native.prevent="remove(scope.$index, list)"
					          type="text"
					          size="small">
					                 拒绝
					        </el-button>
					        <el-button
					          @click.native.prevent='sureEdit(scope.$index, list,"formal")'
					          type="text"
					          size="small" >
					                平台护工
					        </el-button>
                  <el-button
					          @click.native.prevent='sureEdit(scope.$index, list,"informal")'
					          type="text"
					          size="small" >
					                自聘护工
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
           <div id="cardDiv" class="fullScreen">
                 <div class="fullback" v-on:click="closeCard()"></div>
                 <div id="container" class="cardmain"></div>
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
      curTabIndex: "0",
      seachText: "",
      all: 100, //总页数
      cur: 1, //当前页码
      row: 10, //显示多条数据
      num: 5, //显示多少页码
      loading:false,
      list: []
    };
  },

  created() {
    this.begin();
  },
  methods: {
    begin() {
      this.getData();
    },

    getData: function(_page) {
      var $this = this;
      $this.loading=true;
      if (_page == null) {
        _page = 1;
      }
      let requestUrl = "/api/admin/works/getCheckingWorksList"; //待审核列表
      if (this.curTabIndex =="1") {
        requestUrl = "/api/admin/works/getBasicInfoWorksList"; //未提交审核
      } else if (this.curTabIndex =="2") {
        requestUrl = "/api/admin/works/getDisapproveWorksList"; //已拒绝
      }
      util.Ajax(
        requestUrl,
        {
          page: _page,
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
        this.getData(this.cur);
      }
    },
    pageClick: function() {
      //点击上一页下一页
      console.log("现在在" + this.cur + "页");
      this.getData(this.cur);
    },
    changeTab: function(key, keyPath) {
      //console.log(key, keyPath);
      this.curTabIndex = key;
      this.cur = 1;
      this.getData();
    },
    showCard: function(index, rows) {
      var mapContent = document.getElementById("container");
      mapContent.innerHTML = "";
      mapContent.innerHTML =
        '<img src="' +
        rows[index].healthCardPic +
        '" width="800"><br/>' +
        '<img src="' +
        rows[index].idCardFrontPic +
        '" width="800"><br/>' +
        '<img src="' +
        rows[index].idCardBackPic +
        '" width="800"><br/>';

      var mapDiv = document.getElementById("cardDiv");
      mapDiv.style.display = "block";
    },
    closeCard: function() {
      var mapDiv = document.getElementById("cardDiv");
      mapDiv.style.display = "none";
    },
    remove: function(index, rows) {
      //拒绝
      let id = rows[index].work_id;
      var $this = this;
      const confirm = this.$confirm({
        title: "拒绝审核",
        text:
          '<div class="title">确定要拒绝 ' +
          rows[index].name +
          " 的护工申请吗？拒绝后，只能由此护工再次发起申请。</div>",
        dangerouslyUseHTMLString: true,
        button: [
          {
            text: "确定",
            ontap: function() {
              confirm.close().then(function(res) {
                util.Ajax(
                  "/api/admin/works/" + id + "/disapprove?_method=put",
                  {},
                  function(data) {
                    rows.splice(index, 1);
                    $this.$message({
                      message: "恭喜你，操作成功",
                      type: "success"
                    });
                  },
                  function(data) {
                    $this.$message.error('操作失败');
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
    sureEdit: function(index, rows, type) {
      //通过审核
      let id = rows[index].work_id;
      var $this = this;
      let typetext = "平台护工";
      if (type == "informal") {
        typetext = "自聘护工";
      }
      const confirm = this.$confirm({
        title: "通过审核",
        text:
          '<div class="title">确定要通过 ' +
          rows[index].name +
          " 的护工申请，并将其设定为吗 " +
          typetext +
          " ？</div>",
        dangerouslyUseHTMLString: true,
        button: [
          {
            text: "确定",
            ontap: function() {
              confirm.close().then(function(res) {
                util.Ajax(
                  "/api/admin/works/" + id + "/approve?_method=put",
                  { workType: type },
                  function(data) {
                    $this.$message({
                      message: "恭喜你，操作成功",
                      type: "success"
                    });
                    rows.splice(index, 1);
                  },
                  function(data) {
                    $this.$message.error('操作失败');
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
    }
  },
  watch: {},
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
