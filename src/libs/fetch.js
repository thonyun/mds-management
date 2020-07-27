import env from '../../build/env';
import axios from 'axios';
import Qs from 'qs';
import Cookies from 'js-cookie';
import ajaxUrl from './baseURL'
const service = axios.create({
    baseURL: ajaxUrl,
    timeout: 10000
});
service.interceptors.request.use(
    config => {
        const token = Cookies.get('token');
        if (token) {
            config.headers['token'] = token;
        }
        config.headers['CTYPE'] = 'web';
        config.headers['APPID'] = '0';
        config.headers['content-type'] = 'application/json';
        config.headers['CINFO'] = '{}';
        config.headers['SIGN'] = 'eqemk131n31n3j131jda';
        config.headers['REQTIME'] = new Date().getTime();
        config.headers['VERSION'] = '1.0';
        // console.log('content', config)
        // if (config.method.toLowerCase() === 'post') {
        //     config.data = Qs.stringify(config.data);
        // }
        // if (config.method.toLowerCase() === 'get') {
        //     const iurl = config.data ? ('?' + Qs.stringify(config.data)) : '';
        //     config.url += iurl;
        // }
        return config;
    })
    ;

service.interceptors.response.use(
    response => {
        const res = response.data;
        // if (res.code === '000') {
        //     return res;
        // } else if (res.code === '996') {
        //     window.VMM.$store.commit('logout', window.VMM);
        //     Cookies.remove('token');
        //     window.VMM.$Message.error(res.msg);
        //     window.VMM.$router.push(
        //         { path: '/login' }
        //     );
        // } else {
        //     window.VMM.$Message.error(res.msg);
        //     // alert(res.msg);
        // }
        return res
    },
    error => {
        window.VMM.$Message.error(error);
        // return Promise.reject(error);
    });
export default service;

