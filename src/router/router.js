import Main from '@/views/Main.vue';

// 不作为Main组件的子页面展示的页面单独写，如下
export const loginRouter = {
  path: '/login',
  name: 'login',
  meta: {
    title: 'Login - 登录'
  },
  component: () => import('@/views/login.vue')
};

export const page404 = {
  path: '/*',
  name: 'error-404',
  meta: {
    title: '404-页面不存在'
  },
  component: () => import('@/views/error-page/404.vue')
};

export const page403 = {
  path: '/403',
  meta: {
    title: '403-权限不足'
  },
  name: 'error-403',
  component: () => import('@//views/error-page/403.vue')
};

export const page500 = {
  path: '/500',
  meta: {
    title: '500-服务端错误'
  },
  name: 'error-500',
  component: () => import('@/views/error-page/500.vue')
};

export const locking = {
  path: '/locking',
  name: 'locking',
  component: () => import('@/views/main-components/lockscreen/components/locking-page.vue')
};

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
  path: '/',
  name: 'otherRouter',
  redirect: '/home',
  component: Main,
  children: [{
    path: 'home',
    title: {
      i18n: 'home'
    },
    name: 'home_index',
    component: () => import('@/views/home/home.vue')
  }]
};

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [
  {
    path: '/customer',
    name: 'customer',
    accessTag: '1',
    title: '运营管理',
    component: Main,
    children: [{
      path: '/setting',
      accessTag: '103',
      title: '分类管理',
      name: 'setting',
      component: () => import('@/views/setting/classify.vue')
    },
		{
		  path: '/community',
		  accessTag: '104',
		  title: '社区管理',
		  name: 'community',
		  component: () => import('@/views/community/community.vue')
		},
    ]
  },
  {
    path: '/merchant',
    name: 'merchant',
    accessTag: '2',
    title: '商家管理',
    component: Main,
    children: [{
      path: 'bill-management',
      accessTag: '201',
      title: '账单管理',
      name: 'bill-management',
      component: () => import('@/views/bill/bill-management.vue')
    },
    {
      path: 'business-management',
      accessTag: '202',
      title: '商户管理',
      name: 'business-management',
      component: () => import('@/views/merchant/business-management.vue')
    },
    ]
  },
  {
    path: '/activity',
    name: 'activity',
    accessTag: '3',
    title: '活动管理',
    component: Main,
    children: [{
      path: 'appointment',
      accessTag: '301',
      title: '预约管理',
      name: 'appointment',
      component: () => import('@/views/appointment/appointment.vue')
    },]
  }
];

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
  loginRouter,
  otherRouter,
  locking,
  ...appRouter,
  page500,
  page403,
  page404
];
