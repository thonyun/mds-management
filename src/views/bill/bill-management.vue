<template>
	<div>
		<!-- 卡片 -->
		<el-card class="box-card">
			<!-- 标题 -->
			<div slot="header" class="clearfix"><span>账单管理</span></div>
			<!-- 内容-->
			<div>
				<el-row :gutter="20">
					<el-col :span="22"> 
						<el-row :gutter="20">
								<el-col :span="4">
									<el-select filterable v-model="queryKeyPhone" clearable>
										<el-option v-for="item in merchantList" :key="item.accountPhone" :label="`${item.merchantName} ${item.accountPhone}`" :value="item.accountPhone"></el-option>
									</el-select>
								</el-col>
								<el-col :span="12" v-show="switchs">
									<el-date-picker
										value-format="yyyy-MM-dd HH:mm:ss"
										v-model="times"
										type="datetimerange"
										range-separator="至"
										start-placeholder="开始日期"
										end-placeholder="结束日期">
									</el-date-picker>
								</el-col>

								<el-col :span="6">
									<el-button type="primary" @click="queryData(1)" >查询</el-button>
								</el-col>
						</el-row>
					</el-col>

							<el-col :span="2">
								<el-button type="primary" @click="openDialog" v-if="merchant">打款</el-button>
							</el-col> 
					</el-row>
				
				
			<div v-if="isWithdrawalOrderPage">				
				<div v-if="switchs">
					<div class="message-div" v-if="merchant">
						<ul>
							<li>
								商家名称:
								<span>{{ merchant.accountName }}</span>
							</li>
							<!-- <li>
								商家类型:
								<span>{{ merchant.category }}</span>
							</li> -->
							<li>
								收入:
								<span>{{Money.earning/100||'暂无数据'}} <span v-show="Money.earning">元</span> </span>
							</li>
							<li>
								支出:
								<span>{{Money.expend/100||'暂无数据'}} <span v-show="Money.earning">元</span> </span>
							</li>
							<li>
								当前余额:
								<span>{{ merchant.accountAmountRealtime / 100 }} 元</span>
							</li>
							<li>
								冻结余额:
								<span>{{ merchant.accountLockAmountRealtime / 100 }} 元</span>
							</li>
							<li>
								可用余额:
								<span>{{ merchant.accountUsableAmountRealtime / 100 }} 元</span>
							</li>
							<li>
								商家状态:
								<span>{{ merchant.merchantStatus == 1 ? '审核通过' : '未通过' }}</span>
							</li>
						</ul>
					</div>
					<div class="list-div" v-if="lists.length > 0">
						<el-table :data="lists" border>
							<el-table-column prop="tradeNo" label="交易订单号" width="300"></el-table-column>
							<el-table-column prop="tradeType" label="收支类型" width="180"></el-table-column>
							<el-table-column prop="changeAmount" label="金额" width="180"></el-table-column>
							<el-table-column prop="createTime" label="交易时间"></el-table-column>
							<!-- <el-table-column label="操作" fixed="right" width="100" center>
								<template slot-scope="scope">
									
								</template>
							</el-table-column> -->
						</el-table>
					</div>
				</div>
				<!-- 商家详情 -->
				<div v-else>
					<el-table style="margin-top:2%" :data="merchantList_" border>
							<el-table-column prop="merchantName" label="商家名称" width="300"></el-table-column>
							<el-table-column prop="accountPhone" label="电话号码" width="180"></el-table-column>
							<el-table-column prop="createTimes"></el-table-column>
							<el-table-column
								fixed="right"
								label="操作"
								width="150">
							<template slot-scope="scope">
								<el-button @click="merchantDetail(scope.row)" type="text" size="small">查看详情</el-button>
								<el-button @click="getWithdrawalOrderPage(scope.row)" type="text" size="small">打款记录</el-button>
							</template>
							
							
							</el-table-column>
					</el-table>
					<div class="paging">
						<el-pagination
						  @current-change="handleCurrentChange1"
						  :current-page.sync="currentPage"
						  :page-size="pageSize"
						  layout="total, prev, pager, next, jumper"
						  :total="total">
						</el-pagination>
					</div>
				</div>	
			</div>
			<div v-else>
				<withdrawalOrderPage :queryKeyPhone="queryKeyPhone"></withdrawalOrderPage>
			</div>
				<div class="paging" v-if="lists.length > 0">
					<el-pagination hide-on-single-page @current-change="handleCurrentChange" :page-size="10" layout="total, prev, pager, next, jumper" :total="total"></el-pagination>
				</div>

				<!-- 打款对话框 -->
				<Modal :value.sync="moneyDialog" title="打款" :closable="false" :mask-closable="false">
					<el-form label-width="20%"  :model="moneyForm" :rules="rules" ref='moneyForm'>
						<el-form-item label="打款金额:" prop="money">
							<el-col :span="16"> 
								<el-input v-model.trim="moneyForm.money" placeholder="单位是: 元"></el-input>
							</el-col> 
						</el-form-item>
						 
						<el-form-item label="打款原因:"> 
							<el-col :span="16"> 
								<el-input v-model="moneyForm.cause" placeholder="输入您打款原因"></el-input>
							</el-col> 
						</el-form-item>
						<el-form-item label=" 打款凭证:">
							<el-upload
								class="upload-demo"
								:action="baseURL+'api/qiniu/upload'"
								name='content'
								:before-upload="beforeAvatarUpload"
								:on-success="successUpload"
								:on-error="errorUpload"
								:on-remove="imgRemove"
								:file-list="fileList"
								list-type="picture"
							>
								<el-button size="small" type="primary">点击上传</el-button>
								<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过5M</div>
							</el-upload>
						</el-form-item>
					</el-form>
					<div slot="footer">
						<el-button type="primary" @click="ok('moneyForm')">提交</el-button>
						<el-button type="infor" @click="cancel">取消</el-button>
					</div>
				</Modal>
			</div>
		</el-card>
	</div>
</template>
<script>
import axios from "axios";
import withdrawalOrderPage from "./withdrawalOrderPage";
import baseURL from "@/libs/baseURL";
export default {
  data() {
    var checkMoney = (rule, value, callback) => {
      var amountRealtime = this.merchant.accountUsableAmountRealtime / 100;
      if (value <= 0) {
        callback(new Error("请输入正确的打款金额"));
      } else if (value > amountRealtime) {
        callback(new Error("金额不能大于可用余额"));
      } else {
        callback();
      }
    };
    return {
      baseURL:baseURL,
      isWithdrawalOrderPage: true,
      currentPage: 1,
      // 显示的总页数
      total: 0,
      // 每页多少条数据
      pageSize: "",
      size: 1,
      // 获取统计收入对象
      Money: {},
      // 控制时间查询的开关按钮
      switchs: false,
      // 存放开始时间结束时间的数组
      times: [],
      merchantList: null,
      merchantList_: null,
      lists: [],
      merchant: null,
      queryKeyName: "",
      queryKeyPhone: "",
      total: 0,
      moneyForm: {
        money: "",
        imgPath: "",
        merchantNo: "",
        // 这是打款原因
        cause: ""
      },
      fileImg: {},
      rules: {
        money: [
          { required: true, message: "请输入打款金额", trigger: "blur" },
          // { type: 'number', message: '金额必须为数字' },
          { validator: checkMoney, trigger: "blur" }
        ]
      },
      moneyDialog: false,
      imageUrl: "",
      fileList: []
    };
  },
  created() {
    this.getMerchant();
    this.Axios({});
    console.log("baseURL=" + baseURL);
  },
  components: {
    withdrawalOrderPage
  },

  methods: {
    getWithdrawalOrderPage(scope) {
      console.log(scope.accountPhone);
      this.queryKeyPhone = scope.accountPhone;
      this.isWithdrawalOrderPage = false;
    },

    getMerchant() {
      this.$fetch({
        method: "get",
        url: "getMerchantAccountDetailList"
      })
        .then(res => {
          this.merchantList = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },

    Axios({
      size = 10,
      current = 1,
      category = "",
      groupNo = "",
      merchantName = "",
      merchantStatus = ""
    }) {
      this.pageSize = size;
      this.$fetch({
        url: `pageMdsGrpMch`,
        method: "get",
        params: {
          size,
          current,
          category,
          groupNo,
          merchantName,
          merchantStatus
        }
      }).then(res => {
        this.merchantList_ = res.data.records;
        console.log("xiaogoajie", res);
        // 如果后台传入最大金不为null，则最大金额要除以100（单位换算成元）
        this.total = res.data.total;
      });
    },

    merchantDetail(row) {
      this.queryKeyPhone = row.accountPhone;
      this.getData();
    },
    // 获取商家详情的所有数据
    getData(page = 1) {
      var that = this;
      this.$fetch({
        method: "get",
        url: `queryMerchantAccountPage`,
        params: {
          phone: this.queryKeyPhone,
          current: page,
          size: 10,
          startTime: this.times[0] || "",
          endTime: this.times[1] || ""
        }
      })
        .then(res => {
          if (res.data.records.length === 0) {
            that.$message.error("该商家暂无账单数据");
            that.lists = [];
            that.merchant = null;
            that.total = 0;
          } else {
            this.switchs = true;
            that.total = res.data.total;
            that.merchant = res.data.records[0];
            that.moneyForm.merchantNo = res.data.records[0].merchantNo;
            res.data.records.forEach(item => {
              item.changeAmount = item.changeAmount / 100;
              if (item.tradeType == 1) {
                item.tradeType = "收入";
              } else if (item.tradeType == 2) {
                item.tradeType = "支出";
              } else if (item.tradeType == 3) {
                item.tradeType = "冻结";
              } else if (item.tradeType == 4) {
                item.tradeType = "解冻";
              }
            });
            // 获取收入支出
            that.lists = res.data.records;
            if (that.times[0]) {
              that.getMoney();
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 获取统计金额详情
    getMoney() {
      this.$fetch({
        method: "get",
        url: "countAmount",
        params: {
          phone: this.queryKeyPhone,
          startTime: this.times[0],
          endTime: this.times[1]
        }
      }).then(res => {
        this.Money = res.data;
      });
    },
    queryData(page) {
      var that = this;
      that.isWithdrawalOrderPage = true;
      if (that.queryKeyPhone == "") {
        this.$message.info("请选择商家进行查询");
      } else {
        this.getData(page);
      }
    },
    handleCurrentChange(e) {
      this.queryData(e);
    },
    handleCurrentChange1(e) {
      this.Axios({ current: e });
    },
    openDialog() {
      this.moneyDialog = true;
    },
    successUpload(res) {
      if (res.code === 0) {
        this.moneyForm.imgPath = res.data;
      }
    },
    errorUpload(err) {
      console.log("上传失败", err);
    },
    imgRemove(e) {},
    // 打款提交
    ok(form) {
      var that = this;
      that.$refs[form].validate(valid => {
        if (valid) {
          that
            .$fetch({
              url: "queryAndUpdateAccountMch",
              method: "get",
              params: {
                changeAmount: parseInt(that.moneyForm.money * 100),
                evidencePath: that.moneyForm.imgPath,
                merchantNo: that.moneyForm.merchantNo,
                reason: that.moneyForm.cause
              }
            })
            .then(res => {
              if (res.code == 0) {
                that.$message.success("提交成功");
                that.moneyDialog = false;
                that.getData();
              }
            });

          /*
          that
            .$fetch({
              url: "/addPayForRecord",
              method: "post",
              data: {
                changeAmount: that.moneyForm.money * 100,
                evidencePath: that.moneyForm.imgPath,
                merchantNo: that.moneyForm.merchantNo
              }
            })
            .then(res => {
              if (res.code === 0) {
                that.$message.success("提交成功");
                that.moneyDialog = false;
                that
                  .$fetch({
                    url: `updateAccountMch?merchantNo=${
                      that.moneyForm.merchantNo
                    }&changeAmount=${that.moneyForm.money * 100}`
                  })
                  .then(res => {
                    // console.log('更新', res)
                    that.queryData(1);
                  });
              }
              console.log(res);
            })
            .catch(err => {
              that.$message.error("提交失败");
            });
		*/
        }
      });
    },
    cancel() {
      this.moneyDialog = false;
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      console.log(file.type);
      const isJPG = file.type === "image/jpeg" || file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 5;

      if (!isJPG) {
        this.$message.error("上传图片只能是 JPG 格式和 PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传图片不能大于5 MB!");
      }
      return isJPG && isLt2M;
    }
  },
  watch: {
    moneyDialog: function() {
      if (this.moneyDialog == false) {
        this.fileList = [];
        this.moneyForm.money = "";
        this.$nextTick(() => {
          this.$refs.moneyForm.resetFields();
        });
      }
    }
  }
};
</script>
<style scoped lang="less">
.clearfix > span {
  font: bold 14px arial, sans-serif;
}

.query-div {
  width: 100%;
  display: flex;
  justify-content: space-between;

  .el-input {
    width: 70%;
  }

  & > div {
    width: 30%;
    display: flex;
    justify-content: space-between;
  }

  .query-name {
    margin-right: 20px;
  }
}

.message-div {
  width: 100%;
  display: flex;
  justify-content: center;

  ul {
    width: 100%;
    height: 50px;
    margin-top: 20px;
    border: 1px solid rgba(118, 118, 118, 0.2);
    border-left: 0;
    border-right: 0;
    line-height: 50px;
    list-style: none;
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    color: #909399;

    & span {
      color: #474747;
    }
  }
}

.list-div {
  margin-top: 20px;
}

.paging {
  width: 100%;
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}

.empty {
  width: 100%;
  margin-top: 20px;
  display: flex;
  justify-content: center;
  font-size: 14px;
  color: #b6b6bc;
}
</style>
