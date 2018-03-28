<template>
	<div class="admin">
	<el-row class="container">
				<el-col :span="24" class="header">
					<el-col v-if="!collapsed" v-cloak :span="9" class="logo" :class="collapsed?'logo-collapse-width':'logo-width'">
						{{sysName}}
					</el-col>
						<el-col v-else v-cloak :span="9" class="logo" :class="collapsed?'logo-collapse-width':'logo-width'">
					      <i class="iconfont icon-shouye"></i>
					</el-col>
					<el-col :span="10">
						<div class="tools" v-on:click.prevent="collapse">
							      <i class="iconfont">&#xe63f;</i>
						</div>
					</el-col>
					<el-col :span="4" class="userinfo">
						<el-dropdown>
							<span class="el-dropdown-link">
						   <span class="el-dropdown-link userinfo-inner">
								 {{sysUserName}} <i class="el-icon-setting"></i></span>
							</span>
							<el-dropdown-menu slot="dropdown">
								<el-dropdown-item>我的消息</el-dropdown-item>
								<el-dropdown-item>设置</el-dropdown-item>
								<el-dropdown-item divided v-on:click.native="logout">退出登录</el-dropdown-item>
							</el-dropdown-menu>
						</el-dropdown>
					</el-col>
				</el-col>
				<el-row :gutter="20" class="main">
					<el-col  class="min-left el-menu" v-show="!collapsed">
						<!--导航-->
						<el-menu  class="el-menu-vertical-demo">
                            <a href="/admin" class="homer">首页</a>
							<template v-for="(item,index) in menuList" v-if="!item.hidden">
								<el-submenu :index="item.path" v-if="!item.leaf">
									<template slot="title"><i :class="item.icon"></i>{{item.name}}</template>
									<el-menu-item-group>
										<el-menu-item v-for="child in item.children"  v-on:click="getMenu(child.url)" :index="item.path+'-'+child.path" :key="child.path" v-if="!child.hidden">
											{{child.name}}
										</el-menu-item>
									</el-menu-item-group>
								</el-submenu>
								<el-menu-item v-if="item.leaf&&item.children.length>0" :index="item.path" v-on:click="getMenu(item.children[0].url)">
									<i :class="item.icon"></i>{{item.children[0].name}}</el-menu-item>
							</template>
						</el-menu>
					</el-col>

					<!--导航菜单-折叠后-->
					<ul class="el-menu  el-menu-vertical-demo collapsed" v-show="collapsed" ref="menuCollapsed" theme="dark">
						<li v-for="(item,index) in menuList" class="el-submenu item">
							<div class="el-submenu__title" style="padding-left: 20px;" @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)">
								<i :class="item.icon"></i>
							</div>
							<ul class="el-menu submenu" :class="'submenu-hook-'+index" @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)">
								<li v-for="child in item.children" class="el-menu-item" v-on:click="getMenu(child.url)" style="padding-left: 40px;">{{child.name}}
								</li>
							</ul>
						</li>
					</ul>
					<el-col v-if="iscollapsed" :span="23" class="max-right">
						  <router-view></router-view>
					</el-col>
					<el-col v-else class="min-right">
						  <router-view></router-view>
					</el-col>
				</el-row>
			</el-row>
	</div>
</template>

<script>
    export default {
        data() {
            return {
                    sysName: '后台管理系统',
					sysUserName: '系统管理员',
					sysUserAvatar: './static/img/css/common/fn_2.jpg',
					iscollapsed:false,
					collapsed: false,
					menuList: [{
							"path": '1',
							"name": '会员管理',
							"icon": 'el-icon-date', //图标样式class
							"children": [
								// {
								// 	"path": '1',
								// 	"name": '会员数据',
								// 	"url": "/admin/user"
								// },
								{
									"path": '2',
									"name": '用户管理',
									"url": "/adminplat/user"
								},
								{
									"path": '3',
									"name": '护工管理',
									"url": "/adminplat/workers"
								},
								{
									"path": '4',
									"name": '督导管理',
									"url": ""
								},
								{
									"path": '5',
									"name": '护工审核',
									"url": "/adminplat/workersCheck"
								},
								// {
								// 	"path": '6',
								// 	"name": '回收护工',
								// 	"url": "/admin/config"
								// },
								// {
								// 	"path": '7',
								// 	"name": '回收督导',
								// 	"url": "/admin/config"
								// }
							]
					},
					// {
					// 		"path": '2',
					// 		"name": '客服中心',
					// 		"icon": 'el-icon-service', //图标样式class
					// 		"children": [{
					// 				"path": '1',
					// 				"name": '用户管理',
					// 				"url": "/admin/user"
					// 			},
					// 			{
					// 				"path": '2',
					// 				"name": '权限设置',
					// 				"url": "/admin/permission"
					// 			},
					// 			{
					// 				"path": '3',
					// 				"name": '网站设置',
					// 				"url": "/admin/config"
					// 			}
					// 		]
					// 	},
						{
							"path": '3',
							"name": '运营管理',
							"icon": 'el-icon-document', //图标样式class
							"children": [{
									"path": '1',
									"name": '订单管理',
									"url": "/adminplat/ordersList"
								},
								{
									"path": '2',
									"name": '订单处理',
									"url": "/adminplat/waitorder"
								},
								{
									"path": '3',
									"name": '医院管理',
									"url": "/adminplat/hospital"
								},
								{
									"path": '4',
									"name": '财务管理',
									"url": "/adminplat/hospital"
								}
							]
						},{
							"path": '4',
							"name": '系统管理',
							"icon": 'el-icon-view', //图标样式class
							"children": [{
									"path": '1',
									"name": '用户管理',
									"url": "/adminplat/user"
								},
								{
									"path": '2',
									"name": '权限设置',
									"url": "/adminplat/permission"
								},
								{
									"path": '3',
									"name": '网站设置',
									"url": "/adminplat/config"
								}

								
							]
						},
						// {
						// 	"path": '5',
						// 	"name": '系统配置',
						// 	"icon": 'el-icon-setting', //图标样式class
						// 	"children": [{
						// 			"path": '1',
						// 			"name": '用户管理',
						// 			"url": "/admin/user"
						// 		},
						// 		{
						// 			"path": '2',
						// 			"name": '权限设置',
						// 			"url": "/admin/permission"
						// 		},
						// 		{
						// 			"path": '3',
						// 			"name": '网站设置',
						// 			"url": "/admin/config"
						// 		}
						// 	]
						// }
					]
            }
        },
        methods: {
            //退出登录
					logout: function() {
						var _this = this;
						this.$confirm('确认退出吗?', '提示', {
							confirmButtonText: '确定',
							cancelButtonText: '取消',
							type: 'warning'
						}).then(function() {
							//sessionStorage.removeItem('user');
							//_this.$router.push('/login');
							window.location.href = 'login.html';
						}).catch(function() {
							_this.$message({
								type: 'success',
								message: '取消退出'
							});
						});

					},
					handleOpen: function(key, keyPath) {
						console.log(key, keyPath);
					},
					handleClose: function(key, keyPath) {
						console.log(key, keyPath);
					},
					//折叠导航栏
					collapse: function() {
						this.collapsed = !this.collapsed;
						this.iscollapsed = !this.iscollapsed;
					},
					showMenu: function(i, status) {
						console.log(status)
						this.$refs.menuCollapsed.getElementsByClassName('submenu-hook-' + i)[0].style.display = status ? 'block' : 'none';
					},
					getMenu:function(url,queryParams){ //目录跳转
					    queryParams = queryParams || {};
						this.$router.push({path:url, params:queryParams})
					}
        }
    }
</script>
