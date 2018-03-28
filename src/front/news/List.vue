<template>
    <div class="Main">
        <v-head></v-head>
        <div class="front-conter news-con">
              <div class="fl front-con">
             	<ul class="news-slid">
             		<li>
             			<a href="/news">
             			<div class="news-box-pic">
             				<img src="../../../static/img/css/common/col_0_icon_0.gif" />
             			</div>
             			<div class="fl news-box-con">
             			<p>蔡奇：北京治霾要一微克一微克抠
						原标题：蔡奇：治霾要一微克一微克抠北京召开大气污染防治秋冬季攻坚行动部署会，
						PM2.5不降反升等将被严肃问责新京报讯（记者 邓琦）前日，北京市委市政府召开大
						气污染防治秋冬季攻坚</p>
						<p class="mt10 gray">2017-09-09 02:58 <span class="fr red">评论418</span>	</p>
             			</div>
             			</a>
             		</li>
             		<li>
             			<a href="/news">
             			<div class="news-box-pic">
             				<img src="../../../static/img/css/common/col_0_icon_0.gif" />
             			</div>
             			<div class="fl news-box-con">
             			<p>蔡奇：北京治霾要一微克一微克抠
						原标题：蔡奇：治霾要一微克一微克抠北京召开大气污染防治秋冬季攻坚行动部署会，
						PM2.5不降反升等将被严肃问责新京报讯（记者 邓琦）前日，北京市委市政府召开大
						气污染防治秋冬季攻坚</p>
						<p class="mt10 gray">2017-09-09 02:58 <span class="fr red">评论418</span>	</p>
             			</div>
             			</a>
             		</li>
             		<li>
             			<a href="/news">
             			<div class="news-box-pic">
             				<img src="../../../static/img/css/common/col_0_icon_0.gif" />
             			</div>
             			<div class="fl news-box-con">
             			<p>蔡奇：北京治霾要一微克一微克抠
						原标题：蔡奇：治霾要一微克一微克抠北京召开大气污染防治秋冬季攻坚行动部署会，
						PM2.5不降反升等将被严肃问责新京报讯（记者 邓琦）前日，北京市委市政府召开大
						气污染防治秋冬季攻坚</p>
						<p class="mt10 gray">2017-09-09 02:58 <span class="fr red">评论418</span>	</p>
             			</div>
             			</a>
             		</li>
             		<li>
             			<a href="/news">
             			<div class="news-box-pic">
             				<img src="../../../static/img/css/common/col_0_icon_0.gif" />
             			</div>
             			<div class="fl news-box-con">
             			<p>蔡奇：北京治霾要一微克一微克抠
						原标题：蔡奇：治霾要一微克一微克抠北京召开大气污染防治秋冬季攻坚行动部署会，
						PM2.5不降反升等将被严肃问责新京报讯（记者 邓琦）前日，北京市委市政府召开大
						气污染防治秋冬季攻坚</p>
						<p class="mt10 gray">2017-09-09 02:58 <span class="fr red">评论418</span>	</p>
             			</div>
             			</a>
             		</li>
             	</ul>
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
             <div class="fl front-side">
             	  <el-menu  default-active="2" class="el-menu-vertical-demo front-side-menu">
					      <el-submenu index="1">
					        <template slot="title">国内新闻</template>
					        <el-menu-item-group title="体育新闻">
					          <el-menu-item index="1-1">足球</el-menu-item>
					          <el-menu-item index="1-2">蓝球</el-menu-item>
					        </el-menu-item-group>
					        <el-menu-item-group title="财经新闻">
					          <el-menu-item index="1-3">股票</el-menu-item>
					        </el-menu-item-group>
					        <el-submenu index="1-4">
					          <template slot="title">政冶</template>
					          <el-menu-item index="1-4-1">财经</el-menu-item>
					        </el-submenu>
					      </el-submenu>
					      <el-menu-item index="2">国际新闻</el-menu-item>
					      <el-menu-item index="3">公司新闻</el-menu-item>
					    </el-menu>
             </div>
        </div>
        <v-footer></v-footer>
    </div>
</template>
<script>
    import vHead from './../common/Header.vue';
    import vFooter from './../common/Footer.vue';
    export default {
        components:{
            vHead,vFooter
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
        	data (){
			return {
			   	    all:100, //总页数
			        cur: 1,//当前页码
			        row:10,//显示多条数据
			        num:5 //显示多少页码
			       }
		 }
    }
</script>