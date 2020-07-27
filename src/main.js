import Vue from 'vue';
import iView from 'iview';
import {
    router
} from './router/index';
import {
    appRouter
} from './router/router';
import store from './store';
import App from './app.vue';
import '@/locale';
import 'iview/dist/styles/iview.css';
import VueClipboard from 'vue-clipboard2';
import VueI18n from 'vue-i18n';
import util from './libs/util';
import fetch from './libs/fetch';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// if (env === 'development') require('@/mock');
import lodash from 'lodash';
Vue.use(VueClipboard);
Vue.use(VueI18n);
Vue.use(iView);
Vue.use(ElementUI);
window.VMM = new Vue({
    el: '#app',
    router: router,
    store: store,
    render: h => h(App),
    data: {
        currentPageName: ''
    },
    mounted() {
        this.currentPageName = this.$route.name;
        // 显示打开的页面的列表
        this.$store.commit('setOpenedList');
        this.$store.commit('initCachepage');
        // 权限菜单过滤相关
        this.$store.commit('updateMenulist');
    },
    created() {
        let tagsList = [];
        appRouter.map((item) => {
            if (item.children.length <= 1) {
                tagsList.push(item.children[0]);
            } else {
                tagsList.push(...item.children);
            }
        });
        this.$store.commit('setTagsList', tagsList);
    }
});
Object.defineProperty(Vue.prototype, '$lodash', {
    value: lodash
});
Object.defineProperty(Vue.prototype, '$util', {
    value: util
});
Object.defineProperty(Vue.prototype, '$fetch', {
    value: fetch
});
Object.defineProperty(Vue.prototype, '$token', {
    value: util.getToken()
});
