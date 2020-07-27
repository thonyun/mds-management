import util from './util.js';

export const common = {
    // 查询成人
    searchAdult (query) {
        return util.ajax.post('api/patient/queryUserMess', {
            'userMessage': query
        });
    },
    // 查询微信用户
    searchWxAdult (query) {
        return util.ajax.post('api/patient/queryWxUserMess', {
            'userMessage': query
        });
    },
    // 查询儿童
    searchChild (query) {
        return util.ajax.post('child/queryChildMess', {
            'childName': query
        });
    },
    // 查询微信儿童
    searchWxChild (query) {
        return util.ajax.post('child/queryWxChildMess', {
            'childName': query
        });
    },
    // 查询医生
    searchDoctor (query) {
        return util.ajax.post('api/doctor/queryDoctorMess', {
            'doctorMessage': query
        });
    },
    // 查询关联渠道实体
    searObject (query) {
        return util.ajax.post('/api/sellChannel/getObjectByChannelKey', {
            sellChannelDicId: query.sellChannelDicId,
            objectName: query.objectName
        });
    },
    // 健康服务预约查询孩子
    getChildList (query) {
        return util.ajax.post('/child/getChildList', {
            'name': query
        });
    },
    // 查询题库
    getTopicContent (query) {
        return util.ajax.post('/api/questionBank/query', {
            'topicContent': query
        });
    },
    // 查询医生团队
    searchDoctorOfTeam (query) {
        return util.ajax.post('api/doctor/queryDoctorMess', {
            'doctorMessage': query,
            'isDoctorTeam': 1
        });
    },
    // 查询护士
    searchNurse (query) {
        return util.ajax.post('api/reservation/getNurseList', {
            'nurseMessage': query
        });
    },
    // 查询医院
    searchStation (query) {
        return util.ajax.post('api/area/station', {
            'stationName': query
        });
    },

    // 查询开通了门诊的医院
    searchOutpatientStation (query) {
        return util.ajax.post('api/area/station', {
            'stationName': query,
            'isCheckOrder': 1
        });
    },
    // 查询发帖人
    searchPoster (query) {
        return util.ajax.post('api/doctor/queryDoctorMess', {
            'doctorMessage': query
        });
    },
    // 修改帖子和评论状态接口
    updatePostStatus (params) {
        return util.ajax.post('api/society/updateEssayStatus', params);
    },
    // 查询省份
    searchProvince () {
        return util.ajax.post('api/area/province');
    },
    // 查询城市
    searchCity (id) {
        return util.ajax.post('api/area/city', {
            'provinceId': id
        });
    },
    // 查询区域
    searchArea (id) {
        return util.ajax.post('api/area/district', {
            'cityId': id
        });
    }
};
