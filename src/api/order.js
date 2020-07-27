import fetch from '../libs/fetch';
// 查询药品订单列表
export function getMedicineList (data) {
    return fetch({
        url: 'api/onlineBuyMedicine/getOnlineBuyMedicineList',
        method: 'post',
        data
    });
}

// 查询药品订单详情
export function getMedicineDetail (data) {
    return fetch({
        url: 'api/onlineBuyMedicine/queryOnlineBuyMedicineDetail',
        method: 'post',
        data
    });
}
