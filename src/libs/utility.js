import util from './util.js';
import lodash from 'lodash';
export const parseExportUrlAndExport = (url, params) => {
    const token = util.getToken();
    let exportUrl = `${util.ajax.defaults.baseURL}${url}?TOKEN=${token}`;
    if (params) {
        lodash.forOwn(params, (value, key) => {
            if (key !== 'page' && key !== 'pageInex' && key !== 'pageSize' && key !== 'pageNo') {
                exportUrl += `&${key}=${value}`;
            }
        });
    }
    window.location.href = exportUrl;
}
;
