export const finance = {
    // 获取对账记录列表
    getInsuranceCheckRecord () {
        console.log('getInsuranceCheckRecord');
        const res = {
            code: '000',
            msg: 'success',
            resptime: '1539755010463',
            data: {
                total: 1,
                list: [
                    {
                        buttNumber: '555151512121212',
                        actualMoney: 90.55,
                        createdAt: '2018-10-17 13:34:57',
                        overCount: 0,
                        diagnoseCount: 1,
                        applyMoney: 100.22,
                        successCount: 0,
                        stationName: '青羊区草堂社区卫生服务中心',
                        invoiceAmount: 11.11,
                        id: 1,
                        status: 2,
                        statusName: '接收被拒'
                    },
                    {
                        buttNumber: '555151512134543',
                        actualMoney: 200.33,
                        createdAt: '2018-10-19 10:07:57',
                        overCount: 1,
                        diagnoseCount: 3,
                        applyMoney: 88.00,
                        successCount: 2,
                        stationName: '正广兴门诊',
                        invoiceAmount: 32.04,
                        id: 1,
                        status: 3,
                        statusName: '接收成功'
                    }
                ]
            }
        };
        return res;
    }
};

export const order = {
    // 获取保险订单详情
    getInsuranceOrderDetail () {
        const res = {
            code: '000',
            msg: 'success',
            resptime: '1540534351377',
            data: {
                orderId: 'P111120180101X0000520',
                underwriteStart: '2018-10-18 16:32:37',
                document: {
                    'Version': 2,
                    'Code': '2001',
                    'Remark': null,
                    'State': 1,
                    'BasicInfo': { // 基础信息
                        'Name': '黄梓淇',
                        'Sex': '女',
                        'Birth': '2010-11-01',
                        'IdCard': '510184201111030100',
                        'Age': '7',
                        'HxCard': '', // (华西二院就诊卡)
                        'BirthHospital': 'c',
                        'GuardianName': '赵银凤',
                        'Phone': '18519937126',
                        'Address': 'a',
                        'ProvinceCode': '510000',
                        'CityCode': '510100',
                        'Email': '2@163.com'
                    },
                    'BirthInfo': { // (出生情况)
                        'GestationalAge': '2',
                        'Fetus': '多胎',
                        'BornWay': '剖腹产',
                        'EutociaWay': [], // (顺产方式)
                        'Apgar': '2'
                    },
                    'PregnancyIllness': { // (母亲妊娠患病情况)
                        'Illness': ['妊娠期糖尿病'], // (病种)
                        'Anemia': null, // (贫血程度)
                        'Other': null // (其他)
                    },
                    'BloodInfo': { // (血型)
                        'BloodType': 'A',
                        'RhBlood': '阴性'
                    },
                    'AllergyInfo': { // (过敏史)
                        'FoodAllergy': ['无'], // (食物过敏)
                        'FoodAllergyOther': null, // (其他食物过敏)
                        'MedicineAllergy': ['青霉素类'], // (药物过敏)
                        'MedicineAllergyOther': null, // (其他药物过敏)
                        'OtherAllergy': '2'
                    },
                    'FeedInfo': { // (喂养史)
                        'FeedWay': null, // (喂养方式)
                        'FeedTime': null, // (喂养时长)
                        'Complementary': null, // (辅食添加情况)
                        'Vitamin': null // (维生素)
                    },
                    'VaccinationInfo': { // (预防接种史)
                        'Statutory': '否',
                        'StatutoryOther': null, // (法定接种其他)
                        'Supplement': ['轮状病毒疫苗'], // (补充接种)
                        'SupplementOther': null // (补充接种其他疫苗)
                    },
                    'DiseaseInfo': { // (疾病史)
                        'Newborn': [], // (新生儿疾病)
                        'NewbornOther': null, // (新生儿疾病其他)
                        'Inheritance': [], // (遗传及先天性疾病)
                        'InheritanceOther': null, // (遗传及其他先天性疾病)
                        'OtherDisease': [], // (其他重要疾病)
                        'OtherDiseaseText': null, // (重要疾病其他)
                        'InheritanceDisease': ['既往遗传代谢性疾病检查阳性',
                            '家族遗传代谢性疾病病史'], // (遗传性代谢疾病)
                        'MajorDisease': ['无'], // (重大疾病及后遗症)
                        'MajorDiseaseOther': null, // (重大疾病及后遗症其他)
                        'ChronicDiseases': ['无'], // (慢性疾病)
                        'ChronicDiseasesOther': null, // (慢性疾病其他)
                        'ImmuneDysfunction': ['无'], // (免疫功能紊乱)
                        'ImmuneDysfunctionOther': null, // (免疫功能紊乱其他)
                        'GrowthRetardation': ['无'], // (生长发育迟缓)
                        'GrowthRetardationOther': null// (生长发育迟缓其他)
                    },
                    'HealthProblems': { // (多发健康问题)
                        'Problems': ['呕吐'],
                        'FeverCount': null, // (发热次数)
                        'AppetiteCount': null, // (食欲不振次数)
                        'CoughCount': null, // (咳嗽次数)
                        'RashCount': null, // (皮疹次数)
                        'DiarrheaCount': null, // (腹泻次数)
                        'SleepCount': null, // (睡眠障碍次数)
                        'VomitingCount': '2'
                    }
                },
                orderInfo: {
                    orderId: 'P111120180101X0000520',
                    underwriteStart: '2018-10-18 16:32:37',
                    effectStart: '2018-11-18 00:00:00',
                    insuredBirth: '20160602',
                    cardNo: '150122201606020012',
                    productName: '众惠“宝无忧“家庭医生互助计划',
                    createAt: '2018-10-18 16:32:39',
                    buildStatus: 2,
                    doctorName: '郭思雨',
                    ensureCardNo: '14072219921101003X',
                    doctorId: 48,
                    stateName: '审核通过待生效',
                    ensureName: '洗衣机',
                    lastDay: '22天',
                    insureAddress: 'asdaf',
                    id: 826,
                    state: '1004',
                    ensureCompany: '众惠',
                    insuredName: '洗',
                    cardImgStatus: 0,
                    orderNo: 'P111120180101X0000520',
                    stateNum: 1004,
                    cardType: '身份证',
                    ensureMobile: '18011441724',
                    childId: 1992,
                    userId: 3032,
                    ensureEmail: '704019967@qq.com',
                    insuredSex: '男',
                    money: '2000',
                    claimState: '9001',
                    ensureCardType: '身份证',
                    shareName: '-',
                    effectEnd: '2019-11-17 23:59:59',
                    imgList: [null]
                }
            }
        };
        return res;
    }
};
