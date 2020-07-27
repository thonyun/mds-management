import axios from 'axios';
import env from '../../build/env';
import Qs from 'qs';
import Cookies from 'js-cookie';
import moment from 'moment';
// import Mes from 'module';
// import md5 from './md5.js';
import ajaxUrl from './baseURL'
let util = {

};
util.title = function (title) {
  title = title || '后台管理';
  window.document.title = title;
};
const ajaxUrl2 = env === 'production'
  ? 'http://doctorwork.supermm.me/' : 'http://120.77.49.34:8099/';

// const ajaxUrl = env === 'production'
//     ? 'http://admin.supermm.me/' : 'http://192.168.200.252:8011/';

// const ajaxUrl2 = env === 'production'
//     ? 'http://doctorwork.supermm.me/' : 'http://192.168.200.252:8011/';

util.bucket = env === 'production' ? 'mmt-prod' : 'mmt-clund';

util.ossUrl = env === 'production'
  ? 'https://mmt-prod.oss-cn-shenzhen.aliyuncs.com/' : 'https://mmt-clund.oss-cn-shenzhen.aliyuncs.com/';

util.ajax = axios.create({
  baseURL: ajaxUrl,
  timeout: 400000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'CTYPE': 'web',
    'SIGN': 'eqemk131n31n3j131jda',
    'REQTIME': new Date().getTime(),
    'VERSION': '1.0',
    'CINFO': '{}',
    'APPID': '0'
  },
  transformRequest: [data => Qs.stringify(data)]
});
util.ajax2 = axios.create({
  baseURL: ajaxUrl2,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  transformRequest: [data => Qs.stringify(data)]
});

util.ajax.interceptors.request.use(config => {
  const token = Cookies.get('token');
  if (token) {
    config.headers['token'] = token;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

// 响应拦截器即异常处理
util.ajax.interceptors.response.use(response => {
  const resp = response.data;
  if (resp.code === '996') {
    window.VMM.$store.commit('logout', window.VMM);
    // setTimeout(function () {
    Cookies.remove('token');
    // window.location.href = '/';
    window.VMM.$Message.error({
      content: resp.msg
    });
    window.VMM.$router.push({
      path: '/login'
    });
    // }, 1500);
  } else {
    return response;
  }
}, error => {
  if (error && error.response) {
    // console.log(error);
    switch (error.response.status) {
      case 400:
        error.message = '错误请求';
        break;
      case 401:
        error.message = '未授权，请重新登录';
        break;
      case 403:
        error.message = '拒绝访问';
        break;
      case 404:
        error.message = '请求错误,未找到该资源';
        break;
      case 405:
        error.message = '请求方法未允许';
        break;
      case 408:
        error.message = '请求超时';
        break;
      case 500:
        error.message = '服务器端出错';
        break;
      case 501:
        error.message = '网络未实现';
        break;
      case 502:
        error.message = '网络错误';
        break;
      case 503:
        error.message = '服务不可用';
        break;
      case 504:
        error.message = '网络超时';
        break;
      case 505:
        error.message = 'http版本不支持该请求';
        break;
      default:
        error.message = `连接错误${error.response.status}`;
    }
  } else {
    error.message = '连接到服务器失败';
  }
  // message.error(error)
  return Promise.resolve(error.response);
});

util.inOf = function (arr, targetArr) {
  let res = true;
  arr.forEach(item => {
    if (targetArr.indexOf(item) < 0) {
      res = false;
    }
  });
  return res;
};

util.oneOf = function (ele, targetArr) {
  if (targetArr.indexOf(ele) >= 0) {
    return true;
  } else {
    return false;
  }
};

// 动态获取菜单数组
// util.getDynamicRoute = (dynamicMenuArr, appRouter) => {
//     let routeShow = []; // 最后得到的动态菜单路由数组
//     let accessTags = {};
//     // 定义一个递归遍历数组的方法
//     const traverseArr = (dynamicMenuArr, appRouter, accessTags) => {
//         let showArr = [];
//         // 遍历后台返回的菜单数组
//         dynamicMenuArr.forEach((item1, index) => {
//             // 遍历本地菜单路由数组
//             appRouter.forEach((item2, index) => {
//                 // 如果后台和本地匹配，就存入最后的菜单数组中
//                 if (item1.name === item2.title) {
//                     accessTags[item2.accessTag] = item2.accessTag;
//                     showArr.push(item2);
//                     // 判断后台数组和本地路由项中有没有孩子
//                     if (item1.children && item1.children.length > 0 && item2.children && item2.children.length > 0) {
//                         // 递归遍历各自的孩子数组
//                         item2.children = traverseArr(item1.children, item2.children, accessTags);
//                     }
//                 } else {
//                     // 判断本地路由项中有没有孩子
//                     if (item2.children && item2.children.length > 0) {
//                         // 递归遍历各自的孩子数组
//                         item2 = traverseArr(dynamicMenuArr, item2.children, accessTags);
//                     }
//                 }
//             });
//         });
//         return showArr;
//     };
//     // 在这里调用这个递归遍历方法
//     routeShow = traverseArr(dynamicMenuArr, appRouter, accessTags);
//     const result = {routeShow, accessTags};
//     return result;
// };

let toMap = function (map, arr) {
  arr.forEach(item => {
    map[item.title] = item;
    if (item.children && item.children.length !== 0) {
      toMap(map, item.children);
    }
  });
};

util.getDynamicRoute1 = function (menus, routers) {
  let rm = {};
  toMap(rm, routers);
  let routeShow = [];
  let accessTags = {};
  const filterRouter = function (sr, tags, ms) {
    ms.forEach(item => {
      let r = rm[item.name];
      if (r) {
        sr.push(r);
        tags[r.accessTag] = r.accessTag;
        if (r.children) {
          delete r.children;
        }
        if (item.children && item.children.length !== 0) {
          r.children = [];
          filterRouter(r.children, tags, item.children);
        }
      }
    });
  };
  filterRouter(routeShow, accessTags, menus);
  return {
    routeShow,
    accessTags
  };
};

util.showThisRoute = function (itAccess, currentAccess) {
  if (typeof itAccess === 'object' && Array.isArray(itAccess)) {
    return util.oneOf(currentAccess, itAccess);
  } else {
    return itAccess === currentAccess;
  }
};

util.getRouterObjByName = function (routers, name) {
  if (!name || !routers || !routers.length) {
    return null;
  }

  const foreachArr = (arr, map) => {
    arr.forEach(item => {
      map[item.name] = item;
      if (item.children && item.children.length !== 0) {
        foreachArr(item.children, map);
      }
    });
  };
  let obj = {};
  foreachArr(routers, obj);
  let routeObj = null;
  if (obj[name]) {
    routeObj = obj[name];
  }
  return routeObj;
};

util.handleTitle = function (vm, item) {
  if (typeof item.title === 'object') {
    return vm.$t(item.title.i18n);
  } else {
    return item.title;
  }
};

util.setCurrentPath = function (vm, name) {
  let title = '';
  let isOtherRouter = false;
  vm.$store.state.app.routers.forEach(item => {
    if (item.children) {
      if (item.children.length === 1) {
        if (item.children[0].name === name) {
          title = util.handleTitle(vm, item);
          if (item.name === 'otherRouter') {
            isOtherRouter = true;
          }
        }
      } else {
        item.children.forEach(child => {
          if (child.name === name) {
            title = util.handleTitle(vm, child);
            if (item.name === 'otherRouter') {
              isOtherRouter = true;
            }
          }
        });
      }
    }
  });
  let currentPathArr = [];
  if (name === 'home_index') {
    currentPathArr = [{
      title: util.handleTitle(vm, util.getRouterObjByName(vm.$store.state.app.routers, 'home_index')),
      path: '',
      name: 'home_index'
    }];
  } else if ((name.indexOf('_index') >= 0 || isOtherRouter) && name !== 'home_index') {
    currentPathArr = [{
      title: util.handleTitle(vm, util.getRouterObjByName(vm.$store.state.app.routers, 'home_index')),
      path: '/home',
      name: 'home_index'
    },
    {
      title: title,
      path: '',
      name: name
    }
    ];
  } else {
    let currentPathObj = vm.$store.state.app.routers.filter(item => {
      if (item.children.length <= 1) {
        return item.children[0].name === name;
      } else {
        let i = 0;
        let childArr = item.children;
        let len = childArr.length;
        while (i < len) {
          if (childArr[i].name === name) {
            return true;
          }
          i++;
        }
        return false;
      }
    })[0];
    if (currentPathObj.children.length <= 1 && currentPathObj.name === 'home') {
      currentPathArr = [{
        title: '首页',
        path: '',
        name: 'home_index'
      }];
    } else if (currentPathObj.children.length <= 1 && currentPathObj.name !== 'home') {
      currentPathArr = [{
        title: '首页',
        path: '/home',
        name: 'home_index'
      },
      {
        title: currentPathObj.title,
        path: '',
        name: name
      }
      ];
    } else {
      let childObj = currentPathObj.children.filter((child) => {
        return child.name === name;
      })[0];
      // if (name === 'diagnose-schedule') {
      //     childObj.title = '门诊排班哈哈哈';
      // }
      currentPathArr = [{
        title: '首页',
        path: '/home',
        name: 'home_index'
      },
      {
        title: currentPathObj.title,
        path: '',
        name: currentPathObj.name
      },
      {
        title: childObj.title,
        path: currentPathObj.path + '/' + childObj.path,
        name: name
      }
      ];
    }
  }
  vm.$store.commit('setCurrentPath', currentPathArr);

  return currentPathArr;
};

util.openNewPage = function (vm, name, argu, query) {
  let pageOpenedList = vm.$store.state.app.pageOpenedList;
  let openedPageLen = pageOpenedList.length;
  let i = 0;
  let tagHasOpened = false;
  while (i < openedPageLen) {
    if (name === pageOpenedList[i].name) { // 页面已经打开
      vm.$store.commit('pageOpenedList', {
        index: i,
        argu: argu,
        query: query
      });
      tagHasOpened = true;
      break;
    }
    i++;
  }
  if (!tagHasOpened) {
    let tag = vm.$store.state.app.tagsList.filter((item) => {
      if (item.children) {
        return name === item.children[0].name;
      } else {
        return name === item.name;
      }
    });
    tag = tag[0];
    if (tag) {
      tag = tag.children ? tag.children[0] : tag;
      if (argu) {
        tag.argu = argu;
      }
      if (query) {
        tag.query = query;
      }
      vm.$store.commit('increateTag', tag);
    }
  }
  vm.$store.commit('setCurrentPageName', name);
};

util.toDefaultPage = function (routers, name, route, next) {
  let len = routers.length;
  let i = 0;
  let notHandle = true;
  while (i < len) {
    if (routers[i].name === name && routers[i].children && routers[i].redirect === undefined) {
      route.replace({
        name: routers[i].children[0].name
      });
      notHandle = false;
      next();
      break;
    }
    i++;
  }
  if (notHandle) {
    next();
  }
};

util.fullscreenEvent = function (vm) {
  vm.$store.commit('initCachepage');
  // 权限菜单过滤相关
  vm.$store.commit('updateMenulist');
  // 全屏相关
};

util.trim = function (query) {
  if (typeof query !== 'string') {
    query = query.toString();
  }
  if (query && query !== '') {
    return query.replace(/(^\s*)|(\s*$)/g, '');
  }
};

util.strToDate = function (dateStr) {
  const date = new Date();
  if (dateStr.indexOf('-') !== -1) {
    const arr = dateStr.split('-');
    date.setFullYear(arr[0]);
    date.setMonth(arr[1] - 1);
  }
  return date;
};

util.dateToStr = function (date) {
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  month = month < 10 ? `0${month}` : `${month}`;
  return `${year}-${month}`;
};

util.dateToDay = function (date) {
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  month = month < 10 ? `0${month}` : `${month}`;
  day = day < 10 ? `0${day}` : `${day}`;
  return `${year}-${month}-${day}`;
};

util.getStart = function (d) {
  if (typeof d === 'string') {
    d = util.strToDate(d);
  }
  let m = d.getMonth() + 1;
  m = m < 10 ? `0${m}` : m;
  const start = `${d.getFullYear()}-${m}-01 00:00:00`;
  return start;
};

util.getMonthStart = function (d) {
  if (typeof d === 'string') {
    d = util.strToDate(d);
  }
  let m = d.getMonth() + 1;
  m = m < 10 ? `0${m}` : m;
  const start = `${d.getFullYear()}-${m}-01`;
  return start;
};

util.getEnd = function (d) {
  if (typeof d === 'string') {
    d = util.strToDate(d);
  }
  d.setMonth(d.getMonth() + 1);
  d.setDate(0);
  const y = d.getFullYear();
  let m = d.getMonth() + 1;
  m = m < 10 ? `0${m}` : m;
  const day = d.getDate();
  const end = `${y}-${m}-${day} 23:59:59`;
  return end;
};

util.getMonthEnd = function (d) {
  if (typeof d === 'string') {
    d = util.strToDate(d);
  }
  d.setMonth(d.getMonth() + 1);
  d.setDate(0);
  const y = d.getFullYear();
  let m = d.getMonth() + 1;
  m = m < 10 ? `0${m}` : m;
  const day = d.getDate();
  const end = `${y}-${m}-${day}`;
  return end;
};

util.formatDate = function (date, val) {
  // console.log(`type -- ${typeof date}`);
  if (typeof date === 'string') {
    return date;
  } else {
    return moment(date).format(val);
  }
};

util.getToken = function () {
  const token = Cookies.get('token');
  if (token) {
    return token;
  } else {
    return '';
  }
};

util.toDecimal = function (x) { // 强制小数点后两位
  let f = parseFloat(x);
  if (isNaN(f)) {
    return false;
  }
  let g = Math.round(x * 100) / 100;
  let s = g.toString();
  let rs = s.indexOf('.');
  if (rs < 0) {
    rs = s.length;
    s += '.';
  }
  while (s.length <= rs + 2) {
    s += '0';
  }
  return s;
};

/* eslint-disable */
util.hasProperty = function (obj) {
  let c = false;
  for (const val in obj) {
    c = true;
  }
  return c;
};
/* eslint-disable */

util.notEqualObject = function (o1, o2) {
  let c = false;
  if (JSON.stringify(o1) !== JSON.stringify(o2)) {
    c = true;
  }
  return c;
};

export default util;
// export { util }
// export { ajaxUrl }