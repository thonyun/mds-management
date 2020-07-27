import Mock from 'mockjs';
import {finance, order} from './data.js';

// 医院业务及门诊对账记录
Mock.mock(/api\/finance\/queryEnsuranceAccountBatchList/, finance.getInsuranceCheckRecord);

// 保险订单详情
Mock.mock(/api\/ensurance\/getChildEnsuranceDocument/, order.getInsuranceOrderDetail);

export default Mock;
