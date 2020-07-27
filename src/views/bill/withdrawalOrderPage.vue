<template>
    <div class="block">
      <el-table style="margin-top:2%" :data="withdrawalOrderPage" border>
							<el-table-column prop="withdraOrderNo" label="提现单号" width="300"></el-table-column>
							<el-table-column prop="accountNo" label="账户号" width="180"></el-table-column>
							<el-table-column prop="accountName" label="账户名" width="180"></el-table-column>
              <el-table-column prop="phone" label="手机号" width="180"></el-table-column>
              <el-table-column prop="withdrawalAmt" label="提现金额" width="180"></el-table-column>
              <el-table-column prop="withdrawalChannel" label="提现渠道" width="180"></el-table-column>
              <el-table-column prop="withdrawalMode" label="提现模式" width="180"></el-table-column>
              <el-table-column prop="withdrawalState" label="提现状态" width="180"></el-table-column>
              <el-table-column prop="stateReason" label="转账状态原因" width="180"></el-table-column>
              <el-table-column prop="createTime" label="创建时间" width="180"></el-table-column>
              <el-table-column prop="updateTime" label="修改时间" width="180"></el-table-column>
					</el-table>

          <el-pagination
           style="text-align: right;margin-top:2%" 
            @current-change="handleCurrentChange" 
            :page-size="10" 
            layout="total, prev, pager, next, jumper" 
            :total="total">
          </el-pagination>
  </div>
</template>
<script>
export default {
  data() {
    return {
      total: 3,
      pickerOptions: {},
      value1: [],
      size: 10,
      current: 1,
      withdrawalOrderPage: []
    };
  },
  watch: {},
  props: ["queryKeyPhone"],
  methods: {
    handleCurrentChange(e) {
      getWithdrawalOrderPage(e);
    },
    //   向父组件传值
    getWithdrawalOrderPage(current = 1) {
      this.$fetch({
        url: "/getWithdrawalOrderPage",
        methods: "GET",
        params: {
          size: 10,
          phone: this.queryKeyPhone,
          current: current
        }
      }).then(res => {
        res.data.records.forEach(item => {
          if (item.withdrawalChannel == 1) {
            item.withdrawalChannel = "微信";
          }
          if (item.withdrawalChannel == 2) {
            item.withdrawalChannel = "支付宝";
          }
          if (item.withdrawalChannel == 3) {
            item.withdrawalChannel = "三方渠道";
          }
          if (item.withdrawalMode == 1) {
            item.withdrawalMode == "至微信余额";
          }
          if (item.withdrawalMode == 2) {
            item.withdrawalMode == "至支付宝余额";
          }
          if (item.withdrawalMode == 3) {
            item.withdrawalMode = "至银行卡";
          }
          if (item.withdrawalState == 1) {
            item.withdrawalState = "转账中";
          }
          if (item.withdrawalState == 2) {
            item.withdrawalState = "转账成功";
          }
          if (item.withdrawalState == 3) {
            item.withdrawalState = "转账失败";
          }
        });
        this.withdrawalOrderPage = res.data.records;
        this.total = res.data.total;
      });
    }
  },
  created() {
    this.getWithdrawalOrderPage();
  }
};
</script>
<style>
.app {
  text-align: right;
}
</style>
