import {otherRouter, appRouter} from '@/router/router';
import Util from '@/libs/util';
import Cookies from 'js-cookie';
import Vue from 'vue';

const app = {
    state: {
        cachePage: [],
        lang: '',
        isFullScreen: false,
        openedSubmenuArr: [], // 要展开的菜单数组
        menuTheme: 'dark', // 主题
        themeColor: '',
        pageOpenedList: [{
            title: '首页',
            path: '',
            name: 'home_index'
        }],
        currentPageName: '',
        currentPageId: '',
        currentPath: [
            {
                title: '首页',
                path: '',
                name: 'home_index'
            }
        ], // 面包屑数组
        dynamicMenuArr: [], // 接口返回动态菜单数组
        menuList: [], // 左侧菜单栏显示
        accessTags: [], // 记录菜单权限
        routers: [
            otherRouter,
            ...appRouter
        ],
        tagsList: [...otherRouter.children],
        messageCount: 0,
        refreshInsOrder: '', // 是否刷新999保险订单
        refreshIns199Order: '', // 是否刷新199保险订单
        refreshForumList: '', // 是否刷新帖子列表
        refreshDoctorPost: '', // 是否刷新医生帖子
        docDetailTab: '0', // 医生详情tab
        forumDetailTab: '0', // 帖子详情tab
        postCommentId: '', // 帖子详情评论id
        videoTypeTab: '2', // 视频类型tab
        videoEditTitle: '', // 视频编辑标题
        videoDetailType: '', // 视频详情类型
        typeManageTitle: '', // 类目管理
        dontCache: ['graphic-consultingdet'] // 在这里定义你不想要缓存的页面的name属性值(参见路由配置router.js)
    },
    mutations: {
        setVideoTypeTab (state, tabIndex) {
            state.videoTypeTab = tabIndex;
        },
        setVideoEditTitle (state, title) {
            state.videoEditTitle = title;
            localStorage.videoEditTitle = state.videoEditTitle;
        },
        setVideoDetailType (state, type) {
            state.videoDetailType = type;
            localStorage.videoDetailType = state.videoDetailType;
        },
        setTypeManageTitle (state, typeManageTitle) {
            state.typeManageTitle = typeManageTitle;
            localStorage.typeManageTitle = state.typeManageTitle;
        },
        setTagsList (state, list) {
            state.tagsList.push(...list);
        },
        // 初始化动态菜单数据
        initDynamicMenuArr (state, dynamicMenuArr) {
            state.dynamicMenuArr = dynamicMenuArr;
            localStorage.dynamicMenuArr = JSON.stringify(state.dynamicMenuArr);
        },
        // 初始化动态菜单数据
        initAccessTags (state, accessTags) {
            state.accessTags = accessTags;
            localStorage.accessTags = JSON.stringify(state.accessTags);
        },
        updateMenulist (state) {
            // 从localStorage获取菜单数据，否则刷新state中的值会丢失
            if (localStorage.dynamicMenuArr) {
                state.dynamicMenuArr = JSON.parse(localStorage.dynamicMenuArr);
            }
            let menuList = [];
            // 获取动态菜单数组
            const res = Util.getDynamicRoute1(state.dynamicMenuArr, appRouter);
            menuList = res.routeShow;
            state.menuList = menuList;
            this.commit('initAccessTags', res.accessTags);
            /***
             * 以前显示左侧菜单的逻辑，需删掉
             *
             ***/
            // let accessCode = parseInt(Cookies.get('access'));
            // appRouter.forEach((item, index) => {
            //     if (item.access !== undefined) {
            //         if (Util.showThisRoute(item.access, accessCode)) {
            //             if (item.children.length === 1) {
            //                 menuList.push(item);
            //             } else {
            //                 let len = menuList.push(item);
            //                 let childrenArr = [];
            //                 childrenArr = item.children.filter(child => {
            //                     if (child.access !== undefined) {
            //                         if (child.access === accessCode) {
            //                             return child;
            //                         }
            //                     } else {
            //                         return child;
            //                     }
            //                 });
            //                 menuList[len - 1].children = childrenArr;
            //             }
            //         }
            //     } else {
            //         if (item.children.length === 1) {
            //             menuList.push(item);
            //         } else {
            //             let len = menuList.push(item);
            //             let childrenArr = [];
            //             childrenArr = item.children.filter(child => {
            //                 if (child.access !== undefined) {
            //                     if (Util.showThisRoute(child.access, accessCode)) {
            //                         return child;
            //                     }
            //                 } else {
            //                     return child;
            //                 }
            //             });
            //             if (childrenArr === undefined || childrenArr.length === 0) {
            //                 menuList.splice(len - 1, 1);
            //             } else {
            //                 let handledItem = JSON.parse(JSON.stringify(menuList[len - 1]));
            //                 handledItem.children = childrenArr;
            //                 menuList.splice(len - 1, 1, handledItem);
            //             }
            //         }
            //     }
            // });
            // state.menuList = menuList;
        },
        changeMenuTheme (state, theme) {
            state.menuTheme = theme;
        },
        changeMainTheme (state, mainTheme) {
            state.themeColor = mainTheme;
        },
        addOpenSubmenu (state, name) {
            let hasThisName = false;
            let isEmpty = false;
            if (name.length === 0) {
                isEmpty = true;
            }
            if (state.openedSubmenuArr.indexOf(name) > -1) {
                hasThisName = true;
            }
            if (!hasThisName && !isEmpty) {
                state.openedSubmenuArr.push(name);
            }
        },
        closePage (state, name) {
            state.cachePage.forEach((item, index) => {
                if (item === name) {
                    state.cachePage.splice(index, 1);
                }
            });
        },
        initCachepage (state) {
            if (localStorage.cachePage) {
                state.cachePage = JSON.parse(localStorage.cachePage);
            }
        },
        removeTag (state, name) {
            state.pageOpenedList.map((item, index) => {
                if (item.name === name) {
                    state.pageOpenedList.splice(index, 1);
                }
            });
        },
        pageOpenedList (state, get) {
            let openedPage = state.pageOpenedList[get.index];
            if (get.argu) {
                openedPage.argu = get.argu;
            }
            if (get.query) {
                openedPage.query = get.query;
            }
            state.pageOpenedList.splice(get.index, 1, openedPage);
            localStorage.pageOpenedList = JSON.stringify(state.pageOpenedList);
        },
        clearAllTags (state) {
            state.pageOpenedList.splice(1);
            state.cachePage.length = 0;
            localStorage.pageOpenedList = JSON.stringify(state.pageOpenedList);
        },
        clearOtherTags (state, vm) {
            let currentName = vm.$route.name;
            let currentIndex = 0;
            state.pageOpenedList.forEach((item, index) => {
                if (item.name === currentName) {
                    currentIndex = index;
                }
            });
            if (currentIndex === 0) {
                state.pageOpenedList.splice(1);
            } else {
                state.pageOpenedList.splice(currentIndex + 1);
                state.pageOpenedList.splice(1, currentIndex - 1);
            }
            let newCachepage = state.cachePage.filter(item => {
                return item === currentName;
            });
            state.cachePage = newCachepage;
            localStorage.pageOpenedList = JSON.stringify(state.pageOpenedList);
        },
        setOpenedList (state) {
            state.pageOpenedList = localStorage.pageOpenedList ? JSON.parse(localStorage.pageOpenedList) : [otherRouter.children[0]];
        },
        setCurrentPath (state, pathArr) {
            state.currentPath = pathArr;
        },
        setCurrentPageName (state, name) {
            state.currentPageName = name;
        },
        setCurrentPageId (state, id) {
            state.currentPageId = id;
        },
        setAvator (state, path) {
            localStorage.avatorImgPath = path;
        },
        switchLang (state, lang) {
            state.lang = lang;
            Vue.config.lang = lang;
        },
        clearOpenedSubmenu (state) {
            state.openedSubmenuArr.length = 0;
        },
        setMessageCount (state, count) {
            state.messageCount = count;
        },
        increateTag (state, tagObj) {
            if (!Util.oneOf(tagObj.name, state.dontCache)) {
                state.cachePage.push(tagObj.name);
                localStorage.cachePage = JSON.stringify(state.cachePage);
            }
            state.pageOpenedList.push(tagObj);
            localStorage.pageOpenedList = JSON.stringify(state.pageOpenedList);
        }
    }
};

export default app;
