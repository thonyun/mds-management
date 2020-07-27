<template>
    <div>  
            <Row :gutter="24">
      <Col span="24">
      <Card>
        <p slot="title">商家管理</p>
        <Row>
          <Form >
            <FormItem>
              <Row type="flex"
                   justify="start">
              </Row>
            </FormItem>
          </Form>
        </Row>
        <!-- 查询 -->
				<Row
					type='flex'
					justify='space-between'>
						<el-form :inline="true" :model="formInline" class="demo-form-inline">
              <!-- 商家名称 -->
							<el-form-item label="商家名称">
								<el-input v-model="formInline.user" placeholder="请输出查询的商家名称" clearable></el-input>
							</el-form-item>
              <!-- 分类名称 -->
							<el-form-item label="分类名称">
              <div class="block">
                <el-cascader
                  @focus=focus()
                  placeholder="搜索分类"
                  :options="classify"
                  v-model="classifyValue"
                  clearable
                  filterable>
                  </el-cascader>
              </div>

            <!-- 查询操作 -->
							</el-form-item>
          <el-form-item label="操作查询">
               <el-select v-model="action" filterable placeholder="请选择" clearable>
                <el-option
                  v-for="item in actionname"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
          </el-form-item>
							<el-form-item>
								<el-button type="primary" @click="onSubmit">查询</el-button>
							</el-form-item>
						</el-form>
				</Row>
        <!-- 表格数据 -->
        <Row style="margin-top: 20px;">
           <i-table :columns="tableList" :data="merchantList"></i-table>
        </Row>
        <Row type="flex"
             justify="end"
             style="margin-top: 20px;">
          <Col>
          <!-- 分页 -->
						<el-pagination
						  @current-change="handleCurrentChange"
              @size-change="handleSizeChange"
						  :current-page.sync="currentPage"
						  :page-size="pageSize"
						  layout="total, prev, pager, next, jumper"
						  :total="total">
						</el-pagination>
          </Col>
        </Row>
      </Card>
      </Col>
    </Row>
    <!-- 点击编辑弹出编辑信息from表单 -->
  <el-dialog
  title="修改信息"
  :visible.sync="dialogVisible"
  width="840px"
  :modal-append-to-body="false"
  >
  <!-- form表单 -->
  <el-form 
  label-width="120px" 
  :model="sizeForm"  
  :rules="sizeFormRules"
  :inline="true" 
  ref="sizeForm" 
  >
  <!-- 社区编号 -->
  <el-form-item label="社区名称" prop="groupNo">
    <!-- <el-input @input="change($event)" v-model.number="sizeForm.groupName" clearable></el-input> -->
    <!-- <el-select v-model="sizeForm.groupNo" filterable placeholder="请选择" clearable> -->
      <el-select v-model="sizeForm.groupNo" filterable placeholder="请选择" clearable>
                <el-option
                  v-for="item in groupName"
                  :key="item.id"
                  :label="item.groupName"
                  :value="item.groupNo">
                </el-option>
              </el-select>
  </el-form-item>
   <!-- 商家编号 -->
  <el-form-item label="商家编号" prop="merchantNo">
    <el-input @input="change($event)" v-model="sizeForm.merchantNo" clearable disabled></el-input>
  </el-form-item>
 <!-- 商家名称 -->
  <el-form-item label="商家名称" prop="merchantName">
    <el-input @input="change($event)" v-model="sizeForm.merchantName" clearable></el-input>
  </el-form-item>
  <!-- 手机号码 -->

<el-form-item label="手机号码" prop="accountPhone">
    <el-input @input="change($event)" v-model="sizeForm.accountPhone" clearable></el-input>
  </el-form-item>

 <!-- 商家地址 -->
  <el-form-item label="商家地址" prop="address">
    <el-input @input="change($event)" v-model="sizeForm.address" clearable></el-input>
  </el-form-item>
<!-- 商家折扣比列 -->
  <el-form-item 
  label="封顶金额" 
  >
  <el-col :span="20"> 
    <el-input
    v-model="sizeForm.discountPriceMax" 
    @input="setDiscountPriceMax()"
    clearable></el-input>
    </el-col>
    <el-col :span="4"> 
       （元）
      </el-col>
  </el-form-item>
 <!-- 商家经度 -->
  <!-- <el-form-item label="商家经度" prop="longitude">
    <el-input @input="change($event)" v-model="sizeForm.longitude" clearable></el-input>
  </el-form-item> -->
 <!-- 商家纬度 -->
<!-- <el-form-item label="商家纬度" prop="latitude">
    <el-input @input="change($event)" v-model="sizeForm.latitude" clearable></el-input>
  </el-form-item> -->

 <!-- 折扣封顶金额 -->
<el-form-item label="会员比例" prop="discount">
    <el-input @input="change($event)" v-model="sizeForm.discount" clearable></el-input>
  </el-form-item>

  <!-- 经纬度拾取 -->
  <el-form-item label="经纬拾取">
    <span style="color: #0000FF; cursor: pointer;" @click="tencent"> 腾讯地图</span>
</el-form-item>
  
<!-- 商家经纬度 -->
  <el-form-item label="商家经纬度" prop="longitudeAndLatitude">
    <el-input @input="change($event)" v-model="sizeForm.longitudeAndLatitude" clearable></el-input>
  </el-form-item>

  <!-- 服务折扣 -->
<!-- <el-form-item label="结算比例" prop="serviceFeeDiscount">
    <el-input 
    @input="change($event)"
    v-model="sizeForm.serviceFeeDiscount"  
    clearable></el-input>
  </el-form-item> -->
 <!-- 分类 -->
  <el-form-item label="分类" prop="categoryName">
    <!-- <el-input @input="change($event)" v-model="sizeForm.categoryName" clearable></el-input> -->
               <el-select @focus="fenlei()" v-model="sizeForm.category" filterable placeholder="请选择" clearable>
                <el-option
                  v-for="item in classify"
                  :key="item.name"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
  </el-form-item>

  <!-- 图片信息 -->
  <el-form-item style="display:block" label="图片信息" prop="photo">
    <!-- 图片上传 -->
   <el-image
      style="width: 100px; height: 100px"
      :src="url"
     ></el-image>

  </el-form-item>
  <el-form-item style="margin-left:120px" size="large">
    <el-button type="primary" @click="onSave" >保存修改</el-button>
    <el-button @click="dialogVisible=false">取消</el-button>
  </el-form-item>

</el-form>
  
</el-dialog>

<!-- 点击银行卡信息弹出消息 -->
<el-dialog
    title="银行卡信息"
    :visible.sync="dialogVisible_two"
    width="40%"
    :modal-append-to-body="false"
    >
    <!-- 这是银行卡from表内容 -->
<!-- <el-form :model="ruleForm"  label-width="120px" class="demo-ruleForm"> -->
  <el-form
  :model="bankForm"  
  label-width="120px" 
  ref='bankForm'
  :rules="bankFormRules"
  >
<!-- 收款账号 -->
<el-form-item 
  label="收款账户" 
  prop="recAccount" 
  placeholder="请输如收款账号"
  clearable
  >
   <el-col :span="12"> 
    <el-input  @input="change($event)"  v-model.trim ="bankForm.recAccount"  clearable></el-input>
  </el-col>
  </el-form-item>

  <!-- 银行卡表单选择 -->
<el-form-item 
  label="开户行" 
  placeholder="请输入开户行" 
  clearable
>
    <el-select v-model="selectBankvalue" @change="xgj()" filterable placeholder="请选择">
      <el-option
        v-for="item in selectBank"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
  </el-form-item>


  <!-- 收款账户名称 -->
  <el-form-item 
  label="收款账户名称" 
  prop="accountName" 
  placeholder="请输入收款名称" 
  clearable
  >
    <el-col :span="12">
    <el-input @input="change($event)" v-model="bankForm.accountName" clearable></el-input>
    </el-col>
  </el-form-item>

<!-- 银行卡表单的按钮 -->
  <el-form-item size="large">
    <el-button type="primary" @click="Sub()">保存</el-button>
    <el-button @click='dialogVisible_two = false'>取消</el-button>
  </el-form-item>
</el-form>
    </el-dialog>

    <!-- 审核通过 -->
    <el-dialog
    title="审核通过"
    :visible.sync="dialogVisible_audit"
    width="40%"
    :modal-append-to-body="false"
    >

  <el-button type="success" @click="auditSucc(1)">审核通过</el-button>
  <el-button type="danger" @click="auditSucc(2)">不通过</el-button>

    </el-dialog>
 <!-- 填写了银行卡信息才可以弹出审核 -->
  <el-dialog
    title="您当前还未填写银行卡信息"
    :visible.sync="dialogVisible_bankStatus"
    width="40%"
    :modal-append-to-body="false"
    >

  <el-button type="success" @click="writeBankInfo()">去填写</el-button>
  <el-button type="danger" @click="dialogVisible_bankStatus=false">取消</el-button>

    </el-dialog>
     <!-- 二维码弹框遮罩层 -->
     <el-dialog
    :visible.sync="ismerchantCodeUrl"
    width="450px"
    height="450px"
    :modal-append-to-body="false"
    >
      <div class="merchantCodeUrl">
        <el-image
          style="width: 400px; height: 400px"
          :src="merchantCodeUrl[0]"
          ></el-image>
      </div>
    </el-dialog>
    <!-- 设置封顶金额的表格list --> 
     <el-dialog
      title="结算比列"
      :visible.sync="getMaxSelect"
      width="840px"
      :modal-append-to-body="false"
      >
      <discountPriceMaxSelect @isMaxSelect="isMaxSelect" :discount="discount" :getMaxSelect="getMaxSelect" :getMaxSelectMerchantNo="getMaxSelectMerchantNo"></discountPriceMaxSelect>  
    </el-dialog>
    
  </div>  

    
</template>
<script>
import { provs, allCity } from "./mapList";
import selectBank from "./selectBank";
import baseURL from "@/libs/baseURL";
import discountPriceMaxSelect from "./discountPriceMaxSelect";
export default {
  data() {
    return {
      // 给子组件传入的会员比列
      discount:"",
      getMaxSelectMerchantNo: "",
      // 最大金额弹框遮罩层打开或开启
      getMaxSelect: false,
      selectBankvalue: "",
      selectBank: selectBank,
      mdsggw: baseURL,
      //
      //selectCity: "",
      //
      action: "",
      //按照操作查询
      actionname: [
        {
          value: "0",
          label: "待审核"
        },
        {
          value: "1",
          label: "审核通过"
        },
        {
          value: "2",
          label: "未通过"
        }
      ],
      // 银行卡填是否填写的弹出框
      dialogVisible_bankStatus: false,
      //商家id
      uid: "",
      //审核弹框
      dialogVisible_audit: false,
      // 图片上传
      url: "http://qiniuyun.mdsgww.com/common/imgage/coupon.png",
      // 商户二维码
      merchantCodeUrl: [],
      // 是否显示二维码 大图
      ismerchantCodeUrl: false,
      // 判断是否有填写过银行卡信息。返回给子组件Maplist.
      bankcardStatus: "",
      // 银行卡表单的验证
      bankFormRules: {
        recAccount: [
          { required: true, message: "收款账户不能为空", trigger: "blur" },
          {
            message: "请输如正确的银行卡号",
            pattern: /^([1-9]{1})(\d{15}|\d{18})$/
          }
        ],
        accountName: [
          { required: true, message: "收款账户名称不能为空", trigger: "blur" }
        ],
        accountBank: [
          { required: true, message: "开户银行不能为空", trigger: "blur" }
        ],
        website: [
          { required: true, message: "开户网点不能为空", trigger: "blur" }
        ],
        bankNo: [
          { required: true, message: "开户行不能为空", trigger: "blur" }
        ],
        province: [{ required: true, message: "省份不能为空", trigger: "blur" }]
      },

      // 编辑表单的验证
      sizeFormRules: {
        groupNo: [
          { required: true, message: "社区编号不能为空", trigger: "blur" }
        ],
        merchantNo: [
          { required: true, message: "商家编号不能为空", trigger: "blur" }
        ],
        merchantName: [
          { required: true, message: "商家名称不能为空", trigger: "blur" }
        ],
        photo: [
          { required: true, message: "图片信息不能为空", trigger: "blur" }
        ],
        accountPhone: [
          {
            required: true,
            message: "手机号码不能为空",
            trigger: "blur"
          },
          {
            message: "请输如正确手机号码",
            pattern: /^1[3456789]\d{9}$/
          }
        ],
        address: [
          { required: true, message: "商家地址不能为空", trigger: "blur" }
        ],
        longitudeAndLatitude: [
          { required: true, message: "商家经纬度不能为空", trigger: "blur" }
        ],
        // discountPriceMax: [
        //   { required: true, message: "封顶金额不能为空", trigger: "blur" }
        // ],
        discount: [
          {
            required: true,
            message: "折扣比例不能为空",
            trigger: "blur"
          },

          {
            message: "请输如正确折扣:例如:9和10或者9.1",
            // pattern: /[1-9]\.\d{1,2}\b/
            pattern: /^(\d|10)(\.\d{1})?$/
          }
        ],
        serviceFeeDiscount: [
          { required: true, message: "服务折扣", trigger: "blur" }
        ],
        categoryName: [{ required: true, message: "请分类", trigger: "blur" }]
      },
      //分类下拉选择的value值
      classifyValue: "",
      // 分类
      classify: [
        {
          value: "zhinan",
          label: "指南"
        }
      ],
      // 向子组件传递商家id的charmetNO
      mid: "",
      // 这是银行卡表单的3条数据
      // region: "",
      // resource: "",
      // resource1: "",
      //从子组件地图拿传过来的省份
      MsgFormProv: "",
      MsgFormCity: "",
      // 从服务器拿到的银行卡信息
      banklist: {},
      //开户银行
      options: [
        {
          value: "中国工商银行",
          label: "中国工商银行"
        }
      ],
      // 模拟开户网点数据
      // 分页查询
      // 第几页
      currentPage: 1,
      // 显示的总页数
      total: 0,
      // 每页多少条数据
      pageSize: "",
      // 银行卡信息
      bankForm: {
        city: "",
        province: ""
      },
      // 审核表单
      sizeForm: [],

      //这是控制提示框
      dialogVisible: false,
      dialogVisible_two: false,
      // 查询搜索框的双向绑定
      formInline: {
        user: "",
        region: ""
      },

      //控制出现弹出框
      modal1: false,
      //   iview提供的官方数据 这是table标题栏
      tableList: [
        {
          title: "商户id",
          key: "id",
          align: "center",
          minWidth: 120
        },
        {
          title: "社区名称",
          key: "groupName",
          align: "center",
          minWidth: 120
        },
        {
          title: "商家编号",
          key: "merchantNo",
          align: "center",
          minWidth: 120
        },
        {
          title: "商家名称",
          key: "merchantName",
          align: "center",
          minWidth: 120
        },
        {
          title: "手机号码",
          key: "accountPhone",
          align: "center",
          minWidth: 120
        },
        {
          title: "图片信息",
          key: "photo",
          align: "center",
          minWidth: 120,
          render: (h, parmas) => {
            return h("img", {
              style: {
                width: "60px",
                height: "60px",
                cursor: "pointer",
                color: "",
                backgroundColor: "#c3c3c3"
              },
              domProps: {
                src: parmas.row.photo
                //  src:"http://qiniuyun.mdsgww.com/20200429/deb290c1b6594aa5be1e5a4d0c878a1d"
              },
              on: {
                click: () => {}
              }
            });
          }
        },
        // 二维码下载

        {
          title: "商家地址",
          key: "address",
          align: "center",
          minWidth: 120
        },
        {
          title: "商家经度",
          key: "longitude",
          align: "center",
          minWidth: 120
        },
        {
          title: "商家纬度",
          key: "latitude",
          align: "center",
          minWidth: 120
        },
        {
          title: "封顶金额",
          key: "discountPriceMax",
          align: "center",
          minWidth: 120
        },
        {
          title: "会员比例",
          key: "discount",
          align: "center",
          minWidth: 120
        },
        {
          title: "结算比例",
          key: "serviceFeeDiscount",
          align: "center",
          minWidth: 120,
          render: (h, params) => {
            return h(
              "div",
              {
                style: {
                  color: "#5cadff",
                  cursor: "pointer",
                  marginRight: "10px"
                },
                on: {
                  click: () => {
                    this.getMaxSelect = true;
                    this.getMaxSelectMerchantNo = params.row.merchantNo;
                    this.discount=(10-params.row.discount)
                  }
                }
              },
              "设置分成"
            );
          }
        },
        {
          title: "分类",
          key: "categoryName",
          align: "center",
          minWidth: 120
        },
        {
          title: "二维码下载",
          key: "merchantCode",
          align: "center",
          minWidth: 120,
          render: (h, parmas) => {
            if (parmas.row.merchantStatus != 1) {
              return h(
                "div",
                {
                  style: {
                    color: "red"
                  }
                },
                "暂无可用二维码"
              );
            }
            return h("img", {
              style: {
                width: "60px",
                height: "60px",
                cursor: "pointer",
                color: "",
                backgroundColor: "#c3c3c3"
              },
              domProps: {
                src:
                  parmas.row.merchantStatus == 1
                    ? `${this.mdsggw}merchantCode/downloadCodeImg?merchantNo=` +
                      parmas.row.merchantNo
                    : ""
              },
              on: {
                click: () => {
                  parmas.row.merchantStatus == 1
                    ? (this.merchantCodeUrl = [
                        `${
                          this.mdsggw
                        }merchantCode/downloadCodeImg?merchantNo=` +
                          parmas.row.merchantNo
                      ])
                    : (this.merchantCodeUrl = []);
                  this.ismerchantCodeUrl = !this.ismerchantCodeUrl;
                }
              }
            });
          }
        },
        {
          title: "银行卡信息",
          key: "yinhangka",
          align: "center",
          minWidth: 200,
          render: (h, params) => {
            return h(
              "div",
              {
                style: {
                  color: "#5cadff",
                  cursor: "pointer",
                  marginRight: "10px"
                },
                on: {
                  click: () => {
                    this.staffVisible = true; //弹窗打开
                    if (this.$refs.bankForm !== undefined) {
                      this.$nextTick(() => {
                        this.$refs.bankForm.resetFields();
                      });
                    }
                    //this.$refs.bankForm.resetFields();
                    this.mid = params.row.id;
                    this.bankcardStatus = params.row.bankcardStatus;
                    this.bankForm.merchantNo = params.row.merchantNo;
                    this.dialogVisible_two = true;
                    // 用户已经填写了银行卡信息
                    if (params.row.bankcardStatus) {
                      this.getBankForm(params.row.merchantNo);
                    } else {
                      (this.bankForm.province = ""), (this.bankForm.city = "");
                    }
                    //
                  }
                }
              },
              // params.row.yinhangka == "" ? "填写银行卡信息" : "完善银行卡信息"
              params.row.bankcardStatus ? "完善银行卡信息" : "添加银行卡信息"
            );
          }
        },
        {
          title: "操作",
          key: "action",
          fixed: "right",
          align: "center",
          width: 150,
          render: (h, params) => {
            if (params.row.merchantStatus == 1) {
              return h("div", [
                h(
                  "span",
                  {
                    style: {
                      color: "#5cadff",
                      cursor: "pointer",
                      marginRight: "10px"
                    },
                    on: {
                      click: () => {
                        // 清空表单之前的提示和数据
                        if (this.$refs.sizeForm !== undefined) {
                          this.$nextTick(() => {
                            this.$refs.sizeForm.resetFields();
                          });
                        }
                        // 获取每条商户的图片URL
                        this.url = params.row.photo;
                        this.dialogVisible = true;
                        // 进行对象的浅拷贝。阻止双向绑定
                        let form = JSON.stringify(params.row);
                        this.sizeForm = JSON.parse(form);
                        // 添加经纬度的属性
                        this.sizeForm.longitudeAndLatitude =
                          this.sizeForm.latitude +
                          "," +
                          this.sizeForm.longitude;
                        // 后台传的最大金额是null，则显示空

                        if (this.sizeForm.discountPriceMax == null) {
                          this.sizeForm.discountPriceMax = "";
                          // 否则最大金额除以100（单位换算分转为元）
                        } else {
                          // this.sizeForm.discountPriceMax =
                          //   this.sizeForm.discountPriceMax / 100;
                        }
                      }
                    }
                  },
                  "编辑"
                )
              ]);
            } else if (params.row.merchantStatus == 0) {
              return h("div", [
                h(
                  "span",
                  {
                    style: {
                      color: "red",
                      cursor: "pointer",
                      marginRight: "10px"
                    },
                    on: {
                      click: () => {
                        // if (this.$refs.bankForm !== undefined) {
                        //   this.$nextTick(() => {
                        //     this.$refs.bankForm.resetFields();
                        //   });
                        // }
                        // 打开表单钱先进行清空操作
                        this.clearForm();
                        this.mid = params.row.id;
                        this.bankcardStatus = params.row.bankcardStatus;
                        this.bankForm.merchantNo = params.row.merchantNo;
                        // 根据后台传入的银行卡状态，分别进行不同的操作弹框
                        if (params.row.bankcardStatus == 1) {
                          this.uid = params.row.id;
                          this.dialogVisible_audit = true;
                        } else {
                          this.dialogVisible_bankStatus = true;
                        }
                      }
                    }
                  },
                  "待审核"
                )
              ]);
            } else {
              return h("div", [
                h(
                  "span",
                  {
                    style: {
                      color: "red",
                      cursor: "pointer",
                      marginRight: "10px"
                    },
                    on: {
                      click: () => {}
                    }
                  },
                  "未通过"
                )
              ]);
            }
          }
        }
      ],
      // 这是服务器拿到的数据
      merchantList: [],
      citys: [],
      selectProv: "",
      selectCity: "",
      // 拿到社区编号
      groupName: [],
      groupNames: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        }
      ],
      GroupNo: ""
    };
  },
  components: {
    discountPriceMaxSelect
  },
  watch: {
    
  },

  methods: {
    isMaxSelect(data) {
      this.getMaxSelect = data;
    },
    // 表单打开前先清空表单内容
    clearForm() {
      if (this.$refs.bankForm !== undefined) {
        this.$nextTick(() => {
          this.$refs.bankForm.resetFields();
        });
      }
    },
    // 跳转腾讯地图坐标拾取器
    tencent() {
      window.open("http://lbs.qq.com/tool/getpoint/", "_blank");
    },
    // 获取社区分类
    getGroupName() {
      this.$fetch({
        methods: "get",
        url: "getMdsGroupList"
      }).then(res => {
        this.groupName = res.data;
      });
    },
    // 嵌套太深防止input框不能输入
    change(e) {
      this.$forceUpdate();
    },
    // 对商家的最大金额做校验
    setDiscountPriceMax() {
      this.$forceUpdate();
      if (this.sizeForm.discountPriceMax == 1) {
        this.sizeForm.discountPriceMax = this.sizeForm.discountPriceMax.replace(
          /[^1-9]/g,
          ""
        );
      } else {
        this.sizeForm.discountPriceMax = this.sizeForm.discountPriceMax.replace(
          /\D/g,
          ""
        );
      }
    },
    //用户填写银行卡信息
    writeBankInfo() {
      this.dialogVisible_bankStatus = false;
      this.dialogVisible_two = true;
    },
    // 审核通过按钮
    auditSucc(merchantStatus) {
      this.$fetch({
        method: "put",
        url: `toExamine?id=${this.uid}&merchantStatus=${merchantStatus}`
      }).then(res => {
        this.dialogVisible_audit = false;
        if (merchantStatus == 1) {
          this.$message({
            message: "恭喜你，审核成功",
            type: "success"
          });
        } else {
          this.$message.error({
            message: "审核不通过"
          });
        }
        this.Axios({});
      });
    },
    // 图片上传
    handleRemove(file, fileList) {},
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //获取填写的用户的银行卡信息
    getBankForm(id) {
      this.$fetch({
        method: "get",
        url: `getByMerchantNo?no=${id}`
      }).then(res => {
        this.bankForm = res.data;
      });
    },
    // 用户点击分类下拉框就发送一次请求

    focus() {
      this.getPageData();
    },
    //向服务器拿到分类数据
    getPageData() {
      this.$fetch({
        method: "get",
        url: "categoryOpt/selectAllCategory "
      })
        .then(res => {
          res.data.forEach(item => {});
          this.classify = res.data;
          this.classify.forEach((item, index) => {
            item.value = item.id;
            item.label = item.name;
          });
        })
        .catch(err => {});
    },
    handleSizeChange(val) {},
    // 通过自定义属性拿到子组件传过来的值
    // 审核（保存编辑）
    onSave() {
      this.$refs.sizeForm.validate(valid => {
        if (valid) {
          // let form = JSON.stringify(sizeForm);
          // this.sizeForm = JSON.parse(form);
          var sizeForm = JSON.stringify(this.sizeForm);
          sizeForm = JSON.parse(sizeForm);
          // 经纬度分割
          (sizeForm.latitude = this.sizeForm.longitudeAndLatitude.split(
            ","
          )[0]),
            (sizeForm.longitude = this.sizeForm.longitudeAndLatitude.split(
              ","
            )[1]);
          for (var key in sizeForm) {
            if (key == "discountPriceMax") {
              if (sizeForm[key] == "") {
                sizeForm[key] = null;
              } else {
                sizeForm[key] = sizeForm[key] * 100;
              }
            }
          }
          delete sizeForm.longitudeAndLatitude;
          this.$fetch({
            url: `/updateMdsGrpMch`,
            method: "put",
            data: sizeForm
          }).then(res => {
            if (res.code == 0) {
              this.$message({
                message: "恭喜你，编辑信息成功",
                type: "success"
              });
              this.dialogVisible = false;
              this.Axios({});
            }
          });
        } else {
        }
      });
      this.bankForm = {};
    },
    //银行卡表单点击确定
    Sub() {
      // 判断非空验证
      this.$refs.bankForm.validate(valid => {
        if (valid) {
          // 关闭银行卡弹出框
          this.dialogVisible_two = false;
          //获取银行卡数据
          var bankForm = this.bankForm;
          if (this.bankcardStatus == 0) {
            this.$fetch({
              url: `addBankcardInfo?id=${this.mid}`,
              method: "post",
              data: bankForm
            })
              .then(res => {
                // 判断是否修改成功
                if (res.code == "0") {
                  this.Axios({});
                  this.$message({
                    message: "恭喜你，银行卡信息添加成功",
                    type: "success"
                  });
                }
              })
              .catch(err => {
                console.log(err);
              });
          } else {
            // 用户更新银行卡
            this.$fetch({
              url: `updateByBankcardInfoId`,
              method: "put",
              data: bankForm
            }).then(res => {
              this.Axios({});
              this.$message({
                message: "恭喜你，银行卡信息更新成功",
                type: "success"
              });
            });
          }
        } else {
          this.$message.error({
            message: "编辑失败"
          });
        }
      });
    },
    // 点击查询
    onSubmit() {
      this.Axios({
        // 查询搜索
        merchantName: this.formInline.user,
        category: this.classifyValue[0],
        merchantStatus: this.action
      });
    },
    //分页，以及按商家名称查询
    Axios({
      size = 10,
      current = this.currentPage,
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
        this.merchantList = res.data.records;
        // 如果后台传入最大金不为null，则最大金额要除以100（单位换算成元）
        this.merchantList.forEach(item => {
          item.discountPriceMax != null
            ? (item.discountPriceMax = item.discountPriceMax / 100)
            : "";
        });
        this.total = res.data.total;
      });
    },
    // 分页查询
    handleCurrentChange(e) {
      // 用户点击实现分页查询
      this.Axios({ current: e });
    }
  },
  created() {
    //先服务器端发送请求
    this.Axios({});
    this.getPageData();
    this.getGroupName();
  }
};
</script>
<style lang="less">
.merchantCodeUrl {
  text-align: center;
}
.vertical-center-modal {
  display: flex;
  align-items: center;
  justify-content: center;
  .ivu-modal {
    top: 0;
  }
}
.tencent {
  color: #2276d2;
}
