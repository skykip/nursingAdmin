<template>
	<div class="add">	
		  <el-breadcrumb separator="/" class="breadcrumb">
			  <el-breadcrumb-item :to="{ path: '/adminplat' }">首页</el-breadcrumb-item>
			  <el-breadcrumb-item :to="{ path: '/adminplat/hospital' }">医院管理</el-breadcrumb-item>
			  <el-breadcrumb-item>{{titleText}}</el-breadcrumb-item>
			</el-breadcrumb>
<el-form ref="form" :model="form" label-width="80px">
  <el-form-item label="医院名称">
    <el-input v-model="form.name" ></el-input>
  </el-form-item>
    <el-form-item label="电话号码">
    <el-input v-model="form.tel"></el-input>
  </el-form-item>
     
   <el-form-item label="地区">
    <el-select v-model="state" value-key="name" placeholder="==省份/直辖市==">
      <el-option v-for="o in area" :key="o.name" :label="o.name" :value="o.name"></el-option>
    </el-select>
  
     <el-select v-model="city" value-key="name" placeholder="==市==">
      <el-option v-for="o in citys" :key="o.name" :label="o.name" :value="o.name"></el-option>
    </el-select>
     <el-select v-model="region" placeholder="==县/区==">
      <el-option v-for="o in regions" :key="o" :label="o" :value="o"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="详细地址">
    <el-input v-model="form.address"></el-input>
  </el-form-item>
  
  <el-form-item label="医院等级">
    <el-select v-model="form.level" placeholder="请选择">
      <el-option label="三级甲等" value="三级甲等"></el-option>
      <el-option label="二级甲等" value="二级甲等"></el-option>
       <el-option label="一级甲等" value="一级甲等"></el-option>
    </el-select>
  </el-form-item>
  
  <el-form-item label="医院简介">
    <el-input type="textarea" v-model="form.guide"></el-input>
  </el-form-item>
    <el-form-item label="邮政编码">
    <el-input v-model="form.areacode"></el-input>
  </el-form-item>
  <el-form-item label="经纬度">
    <el-input v-model="form.lng" width="150"></el-input>
    <el-input v-model="form.lat" width="150"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">{{buttonText}}</el-button>
    <el-button>取消</el-button>
  </el-form-item>
</el-form>	
	</div>
</template>

<script>
import util from "../../js/util/util.js";
export default {
  data() {
    return {
      form: {
        name: "",
        tel: "",
        state: "",
        city: "",
        region: "",
        address: "",
        areacode: "",
        level: "",
        guide: "",
        lng: 0,
        lat: 0
      },
      curHospitalId: 0,
      state: "",
      city: "",
      region: "",
      area: [],
      citys: [],
      regions: [],
      buttonText: "立即创建",
      titleText: "添加医院"
    };
  },
  created() {
    this.area = require("../../assets/area.json");
    if (this.$route.query.hospitalId != null) {
      this.getHospitalData(this.$route.query.hospitalId);
    }
  },
  watch: {
    state: "getCitys",
    city: "getRegion"
  },
  methods: {
    getHospitalData(id) {
      var $this = this;
      util.Ajax(
        "/api/hospital/" + id,
        {},
        function(data) {
          console.log(data);
          $this.curHospitalId = data.data.hospital_id;
          $this.form.name = data.data.name;
          $this.form.tel = data.data.tel;
          $this.form.state = data.data.state;
          $this.form.city = data.data.city;
          $this.form.region = data.data.region;
          $this.form.address = data.data.address;
          $this.form.areacode = data.data.areacode;
          $this.form.level = data.data.level;
          $this.form.guide = data.data.guide;
          $this.form.lng = data.data.lng;
          $this.form.lat = data.data.lat;
          $this.state = data.data.state;
          $this.city = data.data.city;
          $this.region = data.data.region;
          $this.buttonText = "确认修改";
          $this.titleText = "修改医院信息";
        },
        function(data) {
          console.log(data);
        }
      );
    },

    onSubmit() {
      var $this=this;
      console.log("submit!");
      if (this.form.name == "" || this.form.name == null) {
        alert("必须输入医院名称");
        return;
      }

      let params = {
        hospitalName: this.form.name,
        hospitalTel: this.form.tel,
        hospitalState: this.state,
        hospitalCity: this.city,
        hospitalRegion: this.region,
        hospitalAddress: this.form.address,
        hospitalAreacode: this.form.areacode,
        hospitalLng: this.form.lng,
        hospitalLat: this.form.lat,
        hospitalLevel: this.form.level
      };
      if (this.curHospitalId == 0) {
        util.Ajax(
          "/api/hospital/addHospital/?_method=POST",
          params,
          function(data) {
            console.log(data);
            $this.$message({
              message: data.statusText,
              type: "success"
            });
          },
          function(data) {
            $this.$message.error("操作失败");
            console.log(data);
          }
        );
      } else {
        util.Ajax(
          "/api/hospital/updateHospital/" +
            this.curHospitalId +
            "?_method=patch",
          params,
          function(data) {
            console.log(data);
            $this.$message({
              message: data.statusText,
              type: "success"
            });
          },
          function(data) {
            $this.$message.error("操作失败");
            console.log(data);
          }
        );
      }
    },
    getCitys() {
      for (var k in this.area) {
        if (this.area[k].name == this.state) {
          this.citys = this.area[k].city;
          this.city = "";
          this.region = "";
          return;
        }
      }
    },
    getRegion() {
      for (var k in this.citys) {
        if (this.citys[k].name == this.city) {
          this.regions = this.citys[k].area;
          this.region = "";
          return;
        }
      }
    }
  }
};
</script>
