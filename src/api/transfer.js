import fetch from '../libs/fetch';

// 查询上转列表
export function getUpTransferList (data) {
    return fetch({
        url: 'api/transfer/upList',
        method: 'post',
        data
    });
}

// 查询上转及上级医院详情
export function getUpTransferInfo (data) {
    return fetch({
        url: 'api/transfer/upInfo',
        method: 'post',
        data
    });
}

// 查询下转列表
export function getDownTransferList (data) {
    return fetch({
        url: 'api/transfer/downList',
        method: 'post',
        data
    });
}

// 查询下转详情
export function getDownTransferInfo (data) {
    return fetch({
        url: 'api/transfer/downInfo',
        method: 'post',
        data
    });
}
