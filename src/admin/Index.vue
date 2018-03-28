<template>
	     <div class="index">
	     	<h1>快捷入口</h1>
	     	<ul class="Quick-entry">
	     		<li>
	     			<i class="iconfont">&#xe610;</i>
	     			<p>护工审核</p>
	     		</li>
	     		<li style="background: #649dfc;">
	     			<i class="iconfont">&#xe63a;</i>
	     			<p>退款审核</p>
	     		</li>
	     		<li style="background: #F44336;">
	     			<i class="iconfont">&#xe62a;</i>
	     			<p>投诉处理</p>
	     		</li>
	     	</ul>
	     	<h1>订单信息</h1>
	     	 <ul class="order-list">
	     	 	<li>
	     	 		<i class="iconfont">&#xe610;</i>
	     	 		<div class="right"><p>最新订单</p><p>{{newOrderCount}}</p></div>
	     	 	</li>
	     	 	<li>
	     	 		<i class="iconfont" style="background:#00CC66;">&#xe610;</i>
	     	 		<div class="right"><p>未开始订单</p><p>{{noBeginOrderCount}}</p></div>
	     	 	</li>
	     	 		<li>
	     	 		<i class="iconfont">&#xe610;</i>
	     	 		<div class="right"><p>进行中订单</p><p>{{orderingCount}}</p></div>
	     	 	</li>
	     	 		<li>
	     	 		<i class="iconfont" style="background: #649dfc;">&#xe610;</i>
	     	 		<div class="right"><p>待处理订单</p><p>{{waitingOrderCount}}</p></div>
	     	 	</li>
	     	 </ul>
	     	     <h3>浏量数据统计:</h3>
         <table class="table-list">
         	<tr>
         		<th class="caption">当前在线：</th> 
         		<td><a href="" class="red">{{onlineCount}}人</a></td>
         		<th class="caption">总在线：</th> 
         		<td><a href="" class="red">{{talOnlineCount}}人</a></td></tr>
        <tr><th class="caption">错误数据：</th> <td>
        	<a href="/index.php?con=goods&amp;act=goods_list" class="red">{{errorCount}}条</a>
        </td><th class="caption">登录最长请求时长：</th> <td>
        	<a href="" class="red">{{maxOnlineTime}}</a>
        </td></tr>
        <tr><th class="caption">暴力攻击数：</th> 
        	<td><a href="/" class="red">{{farceAttackCount}}条</a></td>
        	<th class="caption">
黑名单数（账户/ IP）：</th> <td>
        		<a href="" class="red">{{blockCount}}/50</a></td></tr>
        
    </table>
	     	<h3>系统信息:</h3>
	     	<table class="table-list">
	     		<tr>
	     			<th class="caption">版本号：</th> 
	     			<td>3.0</td>
                </tr>
		        <tr>
		        	<th class="caption">服务器系统及PHP版本：</th> 
		        	<td>Linux / PHP V5.2.17</td>
		        </tr>
		        <tr>
		        	<th class="caption">服务器软件：</th>
		        	<td>Apache</td>
		        </tr>
		        <tr>
		        	<th class="caption">MySQL版本：</th>
		        	<td>5.1.73</td>
		        </tr>
		        <tr>
		        	<th class="caption">最大上传许可：</th> 
		        	<td>2M</td>
		        </tr>
         </table>
     
     <h3>开发团队:</h3>	
     <p>aowind@qq.com</p>
	     </div>
</template>
<style scoped="scoped">
.Quick-entry {
  width: 100%;
  display: flex;
}
.Quick-entry li i {
  display: block;
  font-size: 40px;
  padding: 10px;
}
.Quick-entry li p {
  background: #f0f0f0;
  color: #333;
  padding: 10px;
}
.Quick-entry li {
  width: 90px;
  text-align: center;
  background: #384862;
  margin-right: 20px;
  color: #fff;
  margin-bottom: 10px;
}
.order-list {
  width: 100%;
  display: flex;
}
.order-list li {
  display: flex;
  margin-right: 20px;
}
.order-list li i {
  padding: 25px 20px 10px 20px;
  background: #f44336;
  font-size: 40px;
  display: block;
  text-align: center;
  color: #fff;
}
.order-list li .right {
  padding: 10px;
  border: 1px solid #eee;
  padding: 20px;
  font-size: 18px;
  text-align: center;
  background: #fff;
  line-height: 27px;
}
</style>
<script>
import util from "./../js/util/util.js";
export default {
  data() {
    return {
      newOrderCount: 0,
      noBeginOrderCount: 0,
      orderingCount: 0,
      waitingOrderCount: 0,
      onlineCount: 0,
      talOnlineCount: 0,
      errorCount: 0,
      maxOnlineTime: 0,
      farceAttackCount: 0,
      blockCount: 0
    };
  },
  created() {
    this.begin();
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    begin() {
      

        util.Ajax(
          // "/api/admin/index/" + this.$store.state.userId + "?_method=GET",
          "/api/hospital",
          {},
          function(data) {
            console.log(data);
            // this.newOrderCount = data.newOrderCount;
            // this.noBeginOrderCount = data.noBeginOrderCount;
            // this.orderingCount = data.orderingCount;
            // this.waitingOrderCount = data.waitingOrderCount;
            // this.onlineCount = data.onlineCount;
            // this.talOnlineCount = data.talOnlineCount;
            // this.errorCount = data.errorCount;
            // this.maxOnlineTime = data.maxOnlineTime;
            // this.farceAttackCount = data.farceAttackCount;
            // this.blockCount = data.blockCount;
          },
          function(data) {
            console.log(data);
          }
        );
    }
  }
};
</script>
