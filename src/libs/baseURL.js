import env from '../../build/env';
const ajaxUrl = env === 'production'
    //? 'http://qa.mdsgww.com/admin/' : 'http://192.168.151.6/';
    ? 'https://qa.mdsgww.com/admin/' : 'https://qa.mdsgww.com/admin/'

export default ajaxUrl