import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/front/Index'
import Aamin from '@/admin/common/Main'
import Login from '@/admin/Login'


Vue.use(Router)
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: '网站首页',
      component: Index,
      redirect: "/adminplat"
    },
     {
      path: '/Active',
      name: '最新活动',
      component:resolve => require(["@/front/active/List"],resolve)
    },
     {
      path: '/Community',
      name: '社区',
      component:resolve => require(['@/front/community/Index'],resolve)
    },
     {
      path: '/Member',
      name: '会员中心',
      component:resolve => require(['@/front/member/List'],resolve)
    },
     {
      path: '/Profession',
      name: '行业应用',
      component:resolve => require(['@/front/profession/List'],resolve)
    },
     {
      path: '/Project',
      name: '工程项目',
      component:resolve => require(['@/front/project/List'],resolve)
    },
     {
      path: '/news',
      name: '新闻祥情',
      component:resolve => require(['@/front/news/Details'],resolve)
    },
     {
      path: '/newsList',
      name: '新闻例表',
      component:resolve => require(['@/front/news/List'],resolve)
    },
     {
      path: '/Login',
      name: '用户登录',
      component:resolve => require(['@/front/user/Login'],resolve)
    },
     {
      path: '/Regist',
      name: '用户注册',
      component:resolve => require(['@/front/user/Regist'],resolve)
    },
    {
      path: '/adminplat/Login',
      name: '登录页',
      component: resolve => require(['@/admin/Login'],resolve)
    },
    {
      path: '/adminplat',
      component:Aamin,
      children:[
                {
                    path: '/',
                    name: '后台网站首页',
                    component: resolve => require(['@/admin/Index'], resolve)
                },{
                    path: '/adminplat/column',
                    name: '栏目管理',
                    component: resolve => require(['@/admin/column/List'], resolve)
                },{
                    path: '/adminplat/user',
                    name: '用户管理',
                    component: resolve => require(['@/admin/user/List'], resolve)
                },{
                    path: '/adminplat/userAdd',
                    name: '编辑用户',
                    component: resolve => require(['@/admin/user/Add'], resolve)
                },
                {
                    path: '/adminplat/addUser',
                    name: '添加用户',
                    component: resolve => require(['@/admin/column/Add'], resolve)
                },
                {
                    path: '/adminplat/permission',
                    name: '权限设置',
                    component: resolve => require(['@/admin/permissions/Index'], resolve)
                },{
                    path: '/adminplat/config',
                    name: '网站设置',
                    component: resolve => require(['@/admin/config/Index'], resolve)
                },{
                    path: '/adminplat/database',
                    name: '数据库管理',
                    component: resolve => require(['@/admin/database/Lndex'], resolve)
                },{
                    path: '/adminplat/advertising',
                    name: '运营管理',
                    component: resolve => require(['@/admin/advertising/List'], resolve)
                },{
                    path: '/adminplat/news',
                    name: '新闻管理',
                    component: resolve => require(['@/admin/news/List'], resolve)
                },{
                    path: '/adminplat/Addnew',
                    name: '新闻编辑',
                    component: resolve => require(['@/admin/news/Add'], resolve)
                },{
                    path: '/adminplat/hospital',
                    name: '医院管理',
                    component: resolve => require(['@/admin/hospital/List'], resolve)
                },{
                    path: '/adminplat/hospitalAdd',
                    name: '添加医院',
                    component: resolve => require(['@/admin/hospital/Add'], resolve)
                },{
                    path: '/adminplat/workers',
                    name: '护工管理',
                    component: resolve => require(['@/admin/workers/List'], resolve)
                },{
                    path: '/adminplat/workersCheck',
                    name: '护工认证',
                    component: resolve => require(['@/admin/workers/Check'], resolve)
                },{
                    path: '/adminplat/userOrders',
                    name: '用户订单',
                    component: resolve => require(['@/admin/user/Orders'], resolve)
                },{
                    path: '/adminplat/workerInfo',
                    name: '护工详情',
                    component: resolve => require(['@/admin/workers/Info'], resolve)
                },{
                    path: '/adminplat/OrderInfo',
                    name: '订单详情',
                    component: resolve => require(['@/admin/orders/Info'], resolve)
                },{
                    path: '/adminplat/ordersList',
                    name: '订单管理',
                    component: resolve => require(['@/admin/orders/List'], resolve)
                }          
             ]
    }
  ]
})
