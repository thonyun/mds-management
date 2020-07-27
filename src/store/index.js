import Vue from 'vue';
import Vuex from 'vuex';

import app from './modules/app';
import user from './modules/user';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        //
        addClassType: null,
        addClassForm: {}
    },
    mutations: {
        //
        changeType(state, type) {
            state.addClassType = type
        },
        changeForm(state, form) {
            state.addClassForm = form
        }
    },
    actions: {
        // 
    },
    modules: {
        app,
        user
    }
});

export default store;
