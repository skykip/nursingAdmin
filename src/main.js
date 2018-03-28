// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import iconfontcss from './fonts/iconfont.css';
import 'element-ui/lib/theme-chalk/index.css'
import commoncss from './css/common.css';    // 共用样式
import admincss from './css/admin/index.css';    //后台样式
import indexcss from './css/front/index.css';    //前台样式
import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
import ElementUI from 'element-ui';
import util from './js/util/util';
import "babel-polyfill";
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import Vuex from 'vuex';
import VueConfirm from './components/confirm';
Vue.config.productionTip = false
Vue.use(MintUI);
Vue.use(Vuex);
Vue.use(ElementUI);
Vue.use(VueConfirm);

// 如果在模块化构建系统中，请确保在开头调用了 Vue.use(Vuex)
//this.$store.state.token  子组件能通过 this.$store 访问到
const store = new Vuex.Store({
  state: {
    headings:'标题',
    isFooterShow:false,
    flag:3,
    userId:1,
    imgUrl:'http://192.168.0.56:8139/'     //图片地址
  },
   mutations: {
    token(state) {
      // 变更状态
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})


