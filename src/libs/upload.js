let OSS = require('ali-oss');

const ossUrl = 'https://mmt-clund.oss-cn-shenzhen.aliyuncs.com/';

let uploadUtil = {};

uploadUtil.getclient = async function () {
    var response = await OSS.urllib.request("http://39.108.82.209:8080/aliyun/oss", {method: 'GET'});
    console.log(1);
    var result = JSON.parse(response.data);
    console.log(2);
    var client = new OSS({
        accessKeyId: result.AccessKeyId,
        accessKeySecret: result.AccessKeySecret,
        stsToken: result.SecurityToken,
        endpoint: 'oss-cn-shenzhen.aliyuncs.com',
        bucket: 'mmt-clund'
    });
    console.log(3);
    return client;
};

uploadUtil.ossuploadFile = async function (file) {

    console.log(0);
    console.log(file);
    var date = new Date();
    var month = '';
    if (date.getMonth() < 9) {
        month = '0' + (date.getMonth() + 1);
    } else {
        month = (date.getMonth() + 1) + '';
    }
    var baseOSSPath = 'doctorAvatar/' + date.getFullYear() + month + date.getDate() + '/';
    console.log(0.1);
    var nameSplit = file.name.split('.');
    console.log(0.2);
    var nameTail = nameSplit[nameSplit.length - 1];
    var filePath = baseOSSPath + date.getTime() + '.' + nameTail;
    console.log(0.3);
    let client = await uploadUtil.getclient();
    console.log(client);
    try {
        let result = await client.put(filePath, file);
        console.log(result);
        result.then(function (res) {
            console.log(res);
        });

    } catch (e) {
        console.log(er);
    }
    console.log(4);
    // console.log(result);
    // return ossUrl + filePath;


    // client.put(filePath, file).then(function (r1) {
    //     console.log('put success: %j', r1);
    //     return client.get('object');
    // })


};

export default uploadUtil;
