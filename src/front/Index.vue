<template>
    <div class="Main">
        <v-head></v-head>
        <div class="front-conter">
          <div class="slide">
          	<img src="./../../static/img/measurement/index.png" />
          </div>
          <div class="main-haila">
          	<h3>海纳百川，精选全球的高品质软件与服务</h3>
	        <p>开发者工具、建站、API、企业应用，支撑云端应用服务</p>
	      <ul>
	      	<li><img src="./../../static/img/measurement/06.jpg" /></li>
	      	<li><img src="./../../static/img/measurement/07.jpg" /></li>
	      	<li><img src="./../../static/img/measurement/08.jpg" /></li>
	      	<li><img src="./../../static/img/measurement/09.jpg" /></li>
	      	<li><img src="./../../static/img/measurement/10.jpg" /></li>
	      </ul>
          </div>
        </div>
        <v-footer></v-footer>
    </div>
</template>
<script>
    import vHead from './common/Header.vue';
    import vFooter from './common/Footer.vue';
    export default {
        components:{
            vHead,vFooter
        }
    }
</script>