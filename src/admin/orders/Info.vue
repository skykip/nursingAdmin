<template>
<div class="add">	
  <el-breadcrumb separator="/" class="breadcrumb">
		<el-breadcrumb-item :to="{ path: '/adminplat' }">首页</el-breadcrumb-item>
		<el-breadcrumb-item :to="{ path: '/adminplat/ordersList' }">订单管理</el-breadcrumb-item>
		<el-breadcrumb-item>订单信息</el-breadcrumb-item>
	</el-breadcrumb>
<el-row>
  <el-col :span="12">
  <table class="gridtable" >
     <tr><th>订单信息</th><th></th></tr>
     <tr><td>订单编号</td><td>{{info.order_id}}</td></tr>
     <tr><td>交易流水号</td><td>{{info.tradeNum}}</td></tr>
     <tr><td>服务类别</td><td>{{info.dependentLevel}}|{{config.orderDay[info.nursingTime]}}</td></tr>
     <tr><td>订单状态</td><td>{{config.orderStatus[info.status]}}</td></tr>
		 <tr><td>服务区域</td><td><span v-if="info.hospital">{{info.hospital.state}}-{{info.hospital.city}}-{{info.hospital.region}}</span></td></tr>
     <tr><td>服务医院</td><td><span v-if="info.hospital">{{info.hospital.name}}</span></td></tr>
     <tr><td>服务时间</td><td>{{info.startDate}}至{{info.endDate}}</td></tr>
     <tr><td>下单时间</td><td>{{info.createdAt}}</td></tr>
     <tr><td>订单单价</td><td>{{info.dayprice}}元</td></tr>
     <tr><td>订单金额</td><td>{{info.price}}元</td></tr>
     <tr><td>实付金额</td><td>{{info.amount}}元</td></tr>
     <tr><td>优惠/折扣金额</td><td></td></tr>
     <tr><td>优惠方式</td><td></td></tr>				
  </table>
  <br/>
  <el-form ref="form"  label-width="100px" style="width:400px" >
    <el-form-item label="续单结束时间">
      <el-date-picker  v-model="toEndDate"  align="right"  type="date"  placeholder="选择备份时间"> </el-date-picker>
      <el-button type="primary" @click="">续单</el-button>
    </el-form-item>
    <el-form-item label="指派新护工">
      
      <el-button type="primary" @click="">指派</el-button>
    </el-form-item>
    <el-form-item label="订单退款">
      <el-input v-model="refund" placeholder="请输入退款金额" style="width:200px"></el-input>
      <el-button type="primary" @click="">退款</el-button>
    </el-form-item>
    <el-form-item label="调整金额">
      <el-input v-model="doJustPrice" placeholder="请输入调整后的金额" style="width:200px"></el-input>
      <el-button type="primary" @click="changeOrderPrice()">调整</el-button>
    </el-form-item>
    <el-form-item label="调整订单状态">
      <el-select v-model="toStatus"  placeholder="选择操作" style="width:200px">
      <el-option label="取消" value="cancelled" key="cancelled"></el-option>
      <el-option label="已完成" value="completed" key="completed"></el-option>
      </el-select>
      <el-button type="primary" @click="ajustOrderStatus()">调整</el-button>
    </el-form-item>
  </el-form>
  </el-col>
  <el-col :span="12">
  <table class="gridtable" >
     <tr><th>客户信息</th><th></th></tr>
     <tr><td>客户姓名</td><td><span v-if="info.customer">{{info.customer.name}}</span></td></tr>
     <tr><td>客户性别</td><td><span v-if="info.customer">{{config.gender[info.customer.gender]}}</span></td></tr>
     <tr><td>客户电话</td><td><span v-if="info.customer">{{info.customer.phoneNum}}</span></td></tr>
     <tr><td>出生日期</td><td><span v-if="info.customer">{{info.customer.birthday}}</span></td></tr>
  </table>
  <br/>
  <table class="gridtable" >
     <tr><th>护工信息</th><th></th></tr>
     <tr><td>护工姓名</td><td><span v-if="info.work">{{info.work.name}}</span></td></tr>
     <tr><td>护工性别</td><td><span v-if="info.work">{{config.gender[info.work.gender]}}</span></td></tr>
     <tr><td>护工电话</td><td><span v-if="info.work">{{info.work.phoneNum}}</span></td></tr>
     <tr><td>护工星级</td><td><span v-if="info.work">{{info.work.star}}星</span></td></tr>
     <tr><td>护工等级</td><td><span v-if="info.work">{{info.work.level_desc}}</span></td></tr>
     <tr><td>技能综合评价</td><td><span v-if="info.orderRating">{{info.orderRating.ratingSkill}}星</span></td></tr>
     <tr><td>态度综合评价</td><td><span v-if="info.orderRating">{{info.orderRating.ratingAttitude}}星</span></td></tr>
  </table>
  <br/>
  <table class="gridtable" >
     <tr><th>操作记录</th><th>处理人</th><th>动作/状态</th></tr>
     <tr v-for="item in info.orderStatuses"><td>{{item.changedAt}}</td><td>{{item.user.name}}</td><td>{{item.status}}</td></tr>
  </table>
  </el-col>
</el-row>
</div>
</template>

<script>
import util from "../../js/util/util.js";
export default {
  data() {
    return {
      info: {},
      toEndDate: null,
      config: null,
      refund: null,
      doJustPrice: null,
      toStatus: null
    };
  },
  created() {
    this.config = require("../../assets/config.json");
    if (this.$route.query.orderid != null) {
      this.getInfo(this.$route.query.orderid);
    }
  },
  methods: {
    getInfo: function(_id) {
      var $this = this;
      util.Ajax(
        "/api/admin/orders/getOrderByOrderId",
        { orderId: _id },
        function(data) {
          $this.info = data.data[0];
          $this.toEndDate = $this.info.endDate;
        },
        function(data) {
          console.log(data);
        }
      );
    },

    ajustOrderStatus: function() {
      var $this = this;
      if (this.toStatus == null) {
        return;
      }
      if (this.toStatus == "cancelled") {
        util.Ajax(
          "/api/admin/orders/cancel/" + this.info.order_id + "?_method=put",
          {},
          function(data) {
            $this.$message({
              message: "恭喜你，修改成功",
              type: "success"
            });
            $this.info.status = "cancelled";
          },
          function(data) {
            $this.$message.error('修改失败');
            console.log(data);
          }
        );
        return;
      }
      if (this.toStatus == "completed") {
        util.Ajax(
          "/api/admin/orders/endOrder/" + this.info.order_id + "?_method=put",
          {},
          function(data) {
            $this.$message({
              message: "恭喜你，修改成功",
              type: "success"
            });
            $this.info.status = "completed";
          },
          function(data) {
            $this.$message.error('修改失败');
            console.log(data);
          }
        );
        return;
      }
    },
    changeOrderPrice: function() {
      var $this = this;
      if (this.doJustPrice == null || this.doJustPrice * 1 == null) {
        return;
      } else {
        util.Ajax(
          "/api/admin/orders/price/" + this.info.order_id + "?_method=patch",
          {
            price: this.doJustPrice
          },
          function(data) {
            $this.$message({
              message: "恭喜你，修改成功",
              type: "success"
            });
            $this.info.price = $this.doJustPrice;
          },
          function(data) {
            $this.$message.error('修改失败');
            console.log(data);
          }
        );
        return;
      }
    }
  }
};
</script>
