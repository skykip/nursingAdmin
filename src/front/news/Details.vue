<template>
    <div class="Main">
        <v-head></v-head>
        <div class="front-conter news-con">
        	  <el-breadcrumb separator="/" class="breadcrumb">
			  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
			  <el-breadcrumb-item :to="{ path: '/newsList' }">新闻例表</el-breadcrumb-item>
			  <el-breadcrumb-item>一线城市楼市投机性需求得到有力遏制</el-breadcrumb-item>
			</el-breadcrumb>
              <h1>一线城市楼市投机性需求得到有力遏制</h1>
              <p>2017年10月19日 12:36:17</p>
              <p class="mt5">作者：panfu&nbsp;&nbsp;状态：<span class="red">未发布</span></p>
              <div class="news-conter mt10">
              	   <p>国家统计局新闻发言人、国民经济综合统计司司长邢志宏19日在国新办举行的发布会上表示，
              	去年以来国家采取了一系列因地制宜、因城施策的房地产调控政策，房地产调控效果在逐步显现。
              	一线城市房价经过调控以后，现在市场预期比较稳定，投资投机性的需求得到了有力遏制。
              	从8月份监测的数据来看，15个一线和二线的热点城市新建商品住宅价格环比都在下降和持平，
              	同时同比涨幅已经多个月在回落，北上广深四个一线城市同比涨幅连续11个月回落；
              	二线城市新建商品住宅价格同比涨幅连续9个月回落。
				另一方面，房地产调控着力加大了对三四线城市去库存的力度，取得了积极的进展。
				9月末，全国商品房待售面积同比下降了12.2%，主要是在三四线城市去库存收到积极效果。
				在房地产调控过程当中，由于采取了因城施策、因地制宜的办法，而不是一刀切的调控，在调控方式上，也不是一味地限制需求，
				特别是针对一线城市住房供求矛盾比较突出的问题，国家鼓励在供求矛盾突出的地方，通过加大住宅土地的供应来解决房地产的问题。
				所以，前三季度房地产投资增长是比较平稳的，对经济的发展依然起到了积极的作用，同时房地产的风险也得到了有效的化解。
				此外，从金融方面，按照全国金融工作会议的要求，金融系统积极防范和化解金融风险，加强风险源头的管控，整治金融领域的乱象，
				已取得了积极的成效。同时在金融调控过程当中，特别注意保持货币供给政策的稳健中性，保持合理适度的流动性，对实体经济的支持没有减少，
				而是在进一步的加强。
              </p>
              </div>
              <div>全部评论  <span class="fr">评论条数11</span></div>
              <ul>
              	<li>
              		<div class="fl"><img src="../../../static/img/css/common/col_0_icon_0.gif" /></div>
              		<div class="fl">
              			<p>苦酒恋歌  5小时前</p>
              		    <p>国内外媒体都在高度关注十九大，而“党代表通道”无疑开启了一扇世界观察中国的窗口。</p>
              		    <p>赞7  回复</p>
              	    </div>
              	 </li>
              </ul>
           
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
        }
    }
</script>