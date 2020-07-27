import Cookies from 'js-cookie';
import util from '@/libs/util';
import app from './app.js';

const user = {
	state: {},
	mutations: {
		logout(state, vm) {
			Cookies.remove('user');
			Cookies.remove('password');
			Cookies.remove('access');
			Cookies.remove('token');
			// 恢复默认样式
			let themeLink = document.querySelector('link[name="theme"]');
			themeLink.setAttribute('href', '');
			// 将打开页面标签重置
			app.state.pageOpenedList = [{
				title: '首页',
				path: '',
				name: 'home_index'
			}];
			// 清空打开的页面等数据，但是保存主题数据
			let theme = '';
			if (localStorage.theme) {
				theme = localStorage.theme;
			}
			localStorage.clear();
			if (theme) {
				localStorage.theme = theme;
			}
		},
		setStatisticsDetData(state, obj) {
			state.statisticsDetData = obj;
		},
		set_finace_data(state, obj) {
			state.finacedata = obj;
		},
		remove_finace_data(state) {
			state.finacedata = '';
		},
		setMMTdata(state, obj) {
			state.mmtData = obj;
		},
		removeMMTdata(state) {
			state['mmtData'] = '';
		}
	},
	actions: {
		getMenuInfo() {
			// console.log("getMenuInfo ... ");
			util.ajax.post('jurisdiction/api/user/getApplicationModules', {
				applicationId: 2
			}).then((res) => {
				if (res.data.code === '000') {
					let showRouteArr = res.data.data; // 后台返回的动态菜单数组
					showRouteArr = [{
						"id": 1,
						"name": "运营管理",
						"parentId": null,
						"children": [{
							"id": 103,
							"name": "分类管理",
							"parentId": 1,
							"applicationId": 2,
							"applicationName": null,
							"uri": null,
							"createTime": 1560700800000,
							"enabled": 1
						},
						{
							"id": 104,
							"name": "社区管理",
							"parentId": 1,
							"applicationId": 2,
							"applicationName": null,
							"uri": null,
							"createTime": 1560700800000,
							"enabled": 1
						}
						]
					},
					{
						"id": 2,
						"name": "商家管理",
						"parentId": 2,
						"children": [
							{
								"id": 201,
								"name": "账单管理",
								"parentId": 2,
								"applicationId": 2,
								"applicationName": null,
								"uri": null,
								"createTime": 1560700800000,
								"enabled": 1
							},
							{
								"id": 202,
								"name": "商户管理",
								"parentId": 2,
								"applicationId": 2,
								"applicationName": null,
								"uri": null,
								"createTime": 1560700800000,
								"enabled": 1
							},
						]
					},
					{
						"id": 3,
						"name": "活动管理",
						"parentId": 3,
						"children": [{
							"id": 301,
							"name": "预约管理",
							"parentId": 3,
							"applicationId": 2,
							"applicationName": null,
							"uri": null,
							"createTime": 1560700800000,
							"enabled": 1
						}
						]
					},
					]
					this.commit('initDynamicMenuArr', showRouteArr); // 将后台返回的菜单数组保存
					this.commit('updateMenulist'); // 更新menuList
				}
			}).catch((err) => {
				console.log(`error -- ${err}`);
			});
		}
	}
};

export default user;
