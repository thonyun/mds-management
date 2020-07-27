<template>
  <div>
    <Row :gutter="24">
      <Col span="24">
      <Card>
        <p slot="title">用户列表</p>
        <Row>
          <Form :model="formItem">
            <FormItem>
              <Row type="flex"
                   justify="start">
                <!--<Col span="2" style="text-align: right;">注册时间：</Col>-->
                <!--<Col span="6">-->
                <!--<DatePicker :value="formItem.date" type="daterange" split-panels-->
                <!--placeholder="请选择" style="width: 200px"-->
                <!--@on-change="checkTime"-->
                <!--&gt;</DatePicker>-->
                <!--</Col>-->
                <Col span="2"
                     style="text-align: right;">用户信息：</Col>
                <Col span="6">
                <Input v-model="formItem.userName"
                       clearable
                       placeholder="输入用户昵称或姓名/电话号码"
                       style="width: 200px"></Input>
                </Col>
              </Row>
            </FormItem>
            <FormItem>
              <Row type="flex"
                   justify="center"
                   style="margin-top: 10px;">
                <Col span="4">
                <Button type="primary"
                        style="width: 180px;"
                        @click="handleSubmit">查询</Button>
                </Col>
                <!-- <Col span="4"
                     style="margin-left: 20px;">
                <Button style="width: 180px;"
                        long
                        @click="exportData">导出</Button>
                <form id="abc"
                      action="">
                  <input type="hidden"
                         name="userName"
                         id="userName" />
                </form>
                </Col> -->
              </Row>
            </FormItem>
          </Form>
        </Row>
        <Button type="primary"
                @click="addModalMask()"
                icon="ios-add">添加新用户</Button>
        <Row style="margin-top: 20px;">
          <!-- :loading="tableContent.length > 0" -->
          <Table :columns="tableTitle"
                 :loading="tableLoading"
                 :data="tableContent"></Table>
        </Row>
        <Row type="flex"
             justify="space-between"
             style="margin-top: 20px;">
          <Col>
          <p>共{{totalPage}}条记录 第{{formItem.currentPage}}/{{Math.ceil(totalPage/formItem.pageSize)}}页</p>
          </Col>
          <Col>
          <Page :total="totalPage"
                size="small"
                show-elevator
                show-sizer
                :current="formItem.currentPage"
                :page-size="formItem.pageSize"
                @on-change="changePage"
                @on-page-size-change="changePageSize"
                :page-size-opts="[10, 20, 30, 40]"></Page>
          </Col>
        </Row>
      </Card>
      </Col>
    </Row>
    <!-- table数据  -->
  <!-- <i-table :columns="columns1" :data="data1"></i-table> -->
    <!--退款-->
    <Modal v-model="childModal"
           title="用户小孩信息"
           :styles="{marginTop: '5%'}"
           @on-ok="refuseOk"
           @on-cancel="cancel"
           footer-hide="">
      <Table :columns="childTable"
             class="childBodyTable"
             :data="childTableContent"></Table>
    </Modal>
    <!--新建用户-->
    <Modal v-model="addModavislMask"
           title="添加新用户"
           :mask-closable="false">
      <Form ref="addModal"
            label-position="top"
            :model="addModal.form"
            :rules="addModal.formRules">
        <FormItem label="姓名："
                  prop="name">
          <Input v-model="addModal.form.name"
                 :maxlength="15"
                 placeholder="请输入(15字内)" />
        </FormItem>
        <FormItem label="昵称："
                  prop="nickname">
          <Input v-model="addModal.form.nickname"
                 :maxlength="15"
                 placeholder="请输入(15字内)" />
        </FormItem>

        <FormItem label="性别："
                  prop="gender">
          <RadioGroup v-model="addModal.form.gender">
            <Radio label="1">男</Radio>
            <Radio label="2">女</Radio>
          </RadioGroup>
        </FormItem>

        <FormItem label="手机号码："
                  prop="phone">
          <Input v-model="addModal.form.phone"
                 :maxlength="11"
                 placeholder="请输入" />
        </FormItem>

        <!-- <FormItem label="证件类型："
                  prop="certificateType">
          <Select v-model="addModal.form.certificateType"
                  placeholder="请选择">
            <Option v-for="item in certificateTypeList"
                    :value="item.value"
                    :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem> -->

        <FormItem label="商铺地址"
                  prop="storeAddress">
          <Input v-model="addModal.form.storeAddress"
                 placeholder="请输入你的商铺地址" />
        </FormItem>

        <FormItem label="商铺类型"
                  prop="storeType">
          <Input v-model="addModal.form.storeType"
                 placeholder="请输入你的商铺类型" />
        </FormItem>

        <!-- <FormItem label="证件号码："
                  prop="certificateNumber">
          <Input v-model="addModal.form.certificateNumber"
                 :maxlength="20"
                 placeholder="请输入" />
        </FormItem> -->

        <FormItem label="加入时间"
                  prop="birthday">
          <DatePicker format="yyyy-MM-dd"
                      :value="addModal.form.birthday"
                      @on-change="changeBirth"
                      type="date"
                      style="width:100%"
                      placeholder="请选择"></DatePicker>

        </FormItem>

        <FormItem label="加入方法"
                  prop=" joinmethods">
          <Input v-model="addModal.form.joinmethods"
                 placeholder="你的加入方式" />
        </FormItem>

      </Form>
      <Row slot="footer"
           type="flex"
           justify="center">
        <Button @click="handleCancel()">取消</Button>
        <Button type="primary"
                @click="addSubmit()">
          <span>提交</span>
        </Button>
      </Row>
    </Modal>

    <!--新建小孩-->
    <Modal v-model="addModavislChildMask"
           title="添加子女"
           :mask-closable="false">
      <Form ref="addModalChild"
            label-position="top"
            :model="addModalChild.form"
            :rules="addModalChild.formRules">
        <FormItem label="子女姓名："
                  :maxlength="15"
                  prop="name">
          <Input v-model="addModalChild.form.name"
                 placeholder="请输入(15字内)" />
        </FormItem>

        <FormItem label="性别："
                  prop="gender">
          <RadioGroup v-model="addModalChild.form.gender">
            <Radio label="1">男</Radio>
            <Radio label="2">女</Radio>
          </RadioGroup>
        </FormItem>
        
        <FormItem label="证件类型："
                  prop="certificateType">
          <Select v-model="addModalChild.form.certificateType"
                  placeholder="请选择">
            <Option v-for="item in certificateChildTypeList"
                    :value="item.value"
                    :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem> 

        <FormItem label="证件号码："
                  prop="certificateNumber">
          <Input v-model="addModalChild.form.certificateNumber"
                 :maxlength="20"
                 placeholder="请输入" />
        </FormItem>

        <FormItem label="出生日期："
                  prop="birthday">
          <DatePicker format="yyyy-MM-dd"
                      :value="addModalChild.form.birthday"
                      @on-change="changeChildBirth"
                      type="date"
                      style="width:100%"
                      placeholder="请选择"></DatePicker>
        </FormItem>

      </Form>
      <Row slot="footer"
           type="flex"
           justify="center">
        <Button @click="handleChildCancel">取消</Button>
        <Button type="primary"
                @click="addChildSubmit">
          <span>提交</span>
        </Button>
      </Row>
    </Modal>
    
    <!--绑定机构-->
    
    <!-- <Modal v-model="bindInstitutions"
           title="绑定机构"
           :mask-closable="false">
      <Row>
        <Col span="24">
        <Select v-model="bindInstitution"
                filterable
                remote
                :remote-method="remoteMethod1"
                placeholder="输入机构关键字进行搜索"
                :loading="loading1">
          <Option v-for="option in options1"
                  :value="option.value"
                  :key="option.id">{{option.label}}</Option>
        </Select> -->

        <!-- <Select v-model="bindInstitution"
                filterable
                @on-change="communityChange">
          <Option v-for="item in institutionsList"
                  :value="`${item.id.toString()}`"
                  :key="item.id">{{item.name}}</Option>
        </Select> -->

        <!-- </Col>
      </Row>
      <Row slot="footer"
           type="flex"
           justify="center">
        <Button type="primary"
                @click="saveBind()">
          <span>保存</span>
        </Button>
      </Row>
    </Modal> -->
  </div>
</template>
<style lang="less">
@import "../../styles/common.less";
</style>
<script>
import util from "./../../libs/util.js";
import baseUtil from "./../../libs/util.js";
import filter from "../../mixin/filter";
export default {
  mixins: [filter],
  data() {
    const formRulesPhone = (rule, value, callback) => {
      if (!/^1[3456789]\d{9}$/.test(value)) {
        callback(new Error("请输入正确的手机号码"));
        return;
      }
      if (!value) {
        callback(new Error("请输入正确的手机号码"));
        return;
      }
      callback();
    };
    const birthdayRequired = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请选择出生日期"));
        return;
      }
      callback();
    };
    const birthdayNumber = (rule, value, callback) => {
      const reg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;

      if (this.addModalChild.form.certificateType === "1") {
        if (!reg.test(value)) {
          callback(new Error("请输入正确的身份证号码"));
          return;
        }
      } else {
        if (!value) {
          callback(new Error("请输入出生证号码"));
          return;
        }
      }

      callback();
    };
    return {
      bindInstitution: "",
      options1: [],
      loading1: false,
      institutionsList: [],
      bindId: "",
      tableLoading: false,
      certificateChildTypeList: [
        {
          value: "1",
          label: "身份证"
        },
        {
          value: "7",
          label: "出生证明"
        }
      ],
      certificateTypeList: [
        {
          value: "1",
          label: "身份证"
        },

        {
          value: "2",
          label: "护照"
        },
        {
          value: "3",
          label: "港澳通行证"
        },
        {
          value: "4",
          label: "台胞证"
        },
        {
          value: "5",
          label: "港澳居民居住证"
        },
        {
          value: "6",
          label: "台湾居民居住证"
        },
        {
          value: "7",
          label: "出生证明"
        },
        {
          value: "8",
          label: "其他"
        }
      ],
      addModavislMask: false,
      addModavislChildMask: false,
      bindInstitutions: false,
      childParentId: "",
      addModalChild: {
        form: {
          name: "",
          gender: "",
          certificateType: "",
          certificateNumber: "",
          birthday: ""
        },
        formRules: {
          name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
          gender: [
            { required: true, message: "请选择性别", trigger: "change" }
          ],
          certificateType: [
            { required: true, message: "请选择证件类型", trigger: "change" }
          ],
          certificateNumber: [
            { required: true, validator: birthdayNumber, trigger: "blur" }
          ],
          birthday: [
            { required: true, validator: birthdayRequired, trigger: "change" }
          ]
        }
      },
      addModal: {
        form: {
          name: "",
          nickname: "",
          gender: "",
          phone: "",
          certificateType: "",
          certificateNumber: "",
          birthday: "",
          storeAddress: "",
          storeType: "",
          joinmethods: ""
        },
        formRules: {
          name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
          nickname: [{ required: false, trigger: "blur" }],
          gender: [
            { required: true, message: "请选择性别", trigger: "change" }
          ],
          phone: [
            { required: true, validator: formRulesPhone, trigger: "blur" }
          ],
          certificateType: [{ required: false, trigger: "change" }],
          certificateNumber: [{ required: false, trigger: "blur" }],
          birthday: [{ required: false, trigger: "change" }]
        }
      },
      childModal: false,
      totalPage: 0,
      formItem: {
        userName: "",
        date: [],
        currentPage: 1,
        pageSize: 10
      },
      tableContent: [],
      childTable: [
        {
          title: "编号",
          key: "childId",
          align: "center"
        },
        {
          title: "孩子姓名",
          key: "childName",
          align: "center"
        },
        {
          title: "性别",
          key: "childSex",
          align: "center",
          render: (h, params) => {
            let color = "#5cadff";
            let handle = "pointer";
            console.log("xgj" + params);
          }
        },
        {
          title: "生日",
          key: "childBirth",
          align: "center"
        },
        {
          title: "操作",
          key: "pi",
          align: "center",
          render: (h, params) => {
            return h(
              "span",
              {
                style: {
                  color: "#5cadff",
                  cursor: "pointer"
                },
                on: {
                  click: () => {
                    this.$store.commit("set_finace_data", params.row);
                    this.$router.push({
                      path: `/member/member-list/${params.row.childId}`
                    });
                  }
                }
              },
              "健康档案"
            );
          }
        }
      ],
      childTableContent: [],
      tableTitle: [
        {
          title: "姓名",
          key: "name",
          align: "center"
        },
        {
          title: "性别",
          key: "1",
          align: "center",
          render: (h, params) => {
            return h("div", params.row.gender == 1 ? "男" : "女");
          }
        },
        {
          title: "手机号",
          key: "phone",
          align: "center"
        },
        {
          title: "商铺地址",
          key: "storeAddress",
          align: "center"
        },
        {
          title: "商铺类型",
          key: "storeType",
          align: "center"
        },
        {
          title: "加入时间",
          key: " joinTime",
          align: "center",
          render: (h, params) => {
            return h("div", params.row.joinTime);
          }
        },
        {
          title: "加入方式",
          key: "joinmethods",
          align: "center"
        },

        // {
        //     title: '子女数',
        //     key: 'child',
        //     align: 'center',
        //     render: (h, params) => {
        //         let color = '#5cadff';
        //         let handle = 'pointer';
        //         let count = params.row.childCount;
        //         if (count === 0) {
        //             color = '';
        //             handle = '';
        //         }
        //         return h('span', {
        //             style: {
        //                 color: color,
        //                 cursor: handle
        //             },
        //             on: {
        //                 click: () => {
        //                     this.childModal = true;
        //                     this.getUserChild(params.row.userId);
        //                 }
        //             }
        //         }, count);
        //     }
        // },(h, params) => {
        //         let color = '#5cadff';
        //         let handle = 'pointer';
        //         let count = params.row.childCount;
        //         if (count === 0) {
        //             color = '';
        //             handle = '';
        //         }
        //         return h('span', {
        //             style: {
        //                 color: color,
        //                 cursor: handle
        //             },
        //             on: {
        //                 click: () => {
        //                     this.childModal = true;
        //                     this.getUserChild(params.row.userId);
        //                 }
        //             }
        //         }, count);
        //     }
        // },
        {
          title: "注册时间",
          key: "createdAt",
          align: "center"
        },
        {
          title: "操作",
          key: "id",
          align: "center",
          width: 240,
          render: (h, params) => {
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
                      this.addModavislMask = true;
                      this.addModal.form.name = params.row.name;
                      this.addModal.form.nickname = params.row.name;
                      this.addModal.form.gender = params.row.gender;
                      this.addModal.form.phone = params.row.phone;
                      this.addModal.form.storeAddress = params.row.storeAddress;
                      this.addModal.form.storeType = params.row.storeType;
                      this.addModal.form.joinTime = params.row.joinTime;
                      this.addModal.form.joinmethods = params.row.joinmethods;
                      console.log(111, params);
                    }
                  }
                },
                "编辑"
              ),
              h(
                "span",
                {
                  style: {
                    color: "#5cadff",
                    cursor: "pointer"
                  },
                  on: {
                    click: () => {
                      this.$store.commit("set_finace_data", params.row);
                      this.$router.push({
                        path: "/member/user-detail",
                        query: { userId: params.row.userId }
                      });
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ]
    };
  },
  created() {
    // this._getData();
    this.getStationsList();
  },
  methods: {
    // 确定绑定机构
    saveBind() {
      if (!this.bindInstitution) {
        this.$Message.error("请选择机构");
        return false;
      }
      this.$fetch({
        url: "/api/user/bindStation",
        method: "post",
        data: {
          id: this.bindId,
          stationId: this.bindInstitution
        }
      }).then(resp => {
        if (resp && resp.code === "000") {
          this.$Message.success("操作成功");
          this.bindInstitutions = false;
          this._getData(this.formItem);
        }
      });
    },
    // 解除绑定
    removeBindInstitutions(id) {
      this.$Modal.confirm({
        title: "提示",
        content: "确认解除绑定吗？",
        onOk: () => {
          this.$fetch({
            url: "/api/user/unbindStation",
            data: {
              id: id
            }
          }).then(resp => {
            if (resp && resp.code === "000") {
              this.$Message.success("操作成功");
              this._getData(this.formItem);
            }
          });
        }
      });
    },
    // 获得所属机构医院list
    getStationsList() {
      this.$fetch({
        url: "api/area/stations",
        method: "post",
        data: {
          isAvailable: 1,
          stationType: this.stationType
        }
      }).then(resp => {
        if (resp && resp.code === "000") {
          this.institutionsList = resp.data;
          // this.contrastStation();
        }
      });
    },
    // 对比机构 是否存在
    // contrastStation () {
    //     const stationList = this.institutionsList;
    //     let arr = [];
    //     for (let i = 0; i < stationList.length; i++) {
    //         arr.push(stationList[i].id);
    //     }
    //     if (arr.indexOf(parseFloat(this.bindInstitution)) > -1) {

    //     } else {
    //         this.bindInstitution = '';
    //     }
    // },
    // 选中的元素
    communityChange(val) {
      this.bindInstitution = val;
      // this.isSchoolDoctor(val);
    },
    // isSchoolDoctor (val) {
    //     this.$fetch({
    //         url: '/jurisdiction/api/organization/getOne',
    //         method: 'post',
    //         data: {id: val}
    //     }).then(res => {
    //         this.communityStationType = res.data.resultBean.stationType;
    //     });
    // },
    remoteMethod1(query) {
      if (query !== "") {
        this.loading1 = true;
        setTimeout(() => {
          this.loading1 = false;
          const list = this.institutionsList.map(item => {
            return {
              value: item.id,
              label: item.name
            };
          });
          this.options1 = list.filter(
            item => item.label.toLowerCase().indexOf(query.toLowerCase()) > -1
          );
        }, 200);
      } else {
        this.options1 = [];
      }
    },
    // 添加子女
    addChildSubmit() {
      this.$refs["addModalChild"].validate(valid => {
        if (valid) {
          this.$fetch({
            url: "/child/addChild",
            method: "post",
            data: {
              userId: this.childParentId,
              childName: this.addModalChild.form.name,
              gender: this.addModalChild.form.gender,
              cardType: this.addModalChild.form.certificateType,
              cardNo: this.addModalChild.form.certificateNumber,
              birth: this.addModalChild.form.birthday
            }
          }).then(res => {
            if (res.code === "000") {
              this._getData(this.formItem);
              this.handleChildCancel();
              this.$Message.success("添加成功");
            } else {
              this.$Message.error(res.msg);
            }
          });
        }
      });
    },
    changeChildBirth(val) {
      this.addModalChild.form.birthday = val;
    },
    changeBirth(val) {
      this.addModal.form.birthday = val;
    },
    // 关闭添加子女
    handleChildCancel() {
      this.addModavislChildMask = false;
      this.childParentId = "";
      this.addModalChild.form.name = "";
      this.addModalChild.form.gender = "";
      this.addModalChild.form.certificateType = "";
      this.addModalChild.form.certificateNumber = "";
      this.addModalChild.form.birthday = "";
    },
    // 提交菜单
    addSubmit() {
      this.$refs["addModal"].validate(valid => {
        if (valid) {
          this.$fetch({
            url: "api/user/saveUser",
            method: "post",
            data: {
              userName: this.addModal.form.name,
              gender: this.addModal.form.gender,
              nickName: this.addModal.form.nickname,
              mobile: this.addModal.form.phone,
              idType: this.addModal.form.certificateType,
              cardNo: this.addModal.form.certificateNumber,
              birth: this.addModal.form.birthday
            }
          }).then(res => {
            if (res.code === "000") {
              this._getData(this.formItem);
              this.handleCancel();
              this.$Message.success("添加成功");
            } else {
              this.$Message.error(res.msg);
            }
          });
        }
      });
    },
    // 关闭添加新用户
    handleCancel() {
      this.addModavislMask = false;
      this.addModal.form.name = "";
      this.addModal.form.gender = "";
      this.addModal.form.nickname = "";
      this.addModal.form.phone = "";
      this.addModal.form.certificateType = "";
      this.addModal.form.certificateNumber = "";
      this.addModal.form.birthday = "";
    },
    // 打开添加新用户
    addModalMask() {
      this.addModavislMask = true;
    },
    getUserChild(val) {
      this.childTableContent = [];
      util.ajax
        .post("api/patient/getUserChild", {
          userId: val
        })
        .then(res => {
          if (res.data.code === "000") {
            let chileList = [];
            res.data.data.forEach(item => {
              chileList.push({
                childId: item.id,
                childName: item.realName,
                childSex: item.gender === 2 ? "女" : "男",
                childBirth: item.birth
              });
            });
            this.childTableContent = chileList;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    checkServiceId(serviceName) {
      let serviceId = "";
      this.servicesList.forEach(item => {
        if (serviceName === item.serviceName) {
          serviceId = item.serviceId;
        }
      });
      return serviceId;
    },
    checkTime(val) {
      // 预约日期
      this.formItem.date = [];
      this.formItem.date = val;
      if (val[0]) {
        this.formItem.date[0] += " 00:00:00";
        this.formItem.date[1] += " 23:59:59";
      }
    },
    checkServices() {
      util.ajax
        .post("api/doctorService/getList", {})
        .then(res => {
          let dataList = [];
          res.data.data.forEach(item => {
            dataList.push({
              serviceId: item.id + "",
              serviceName: item.realname
            });
          });
          this.servicesList = dataList;
        })
        .catch(error => {});
    },
    handleSubmit() {
      // 查询
      // this._getData();
      this.filterWith(
        this.formItem,
        { random: Math.random() },
        { pageSize: 10, currentPage: 1 }
      );
    },
    commitCheckStatus(val) {
      let data = "";
      for (let i = 0; i < val.length; i++) {
        data += val[i] + ",";
      }
      if (data.length > 0) {
        data = data.substr(0, data.length - 1);
      }
      return data;
    },
    exportData() {
      // 导出表格数据
      var a = document.getElementById("abc");
      document.getElementById("userName").value = this.formItem.service;
      a.action = baseUtil.ajax.defaults.baseURL + "api/finance/getRefundExcel";
      a.submit();
    },
    _getData(val) {
      // 获取数据请求(请求参数自取)
      this.tableLoading = true;
      this.cleanParamsObject(val);
      this.$fetch({
        url: "api/user/getUserList",
        method: "post",
        data: val
      }).then(res => {
        if (res && res.code === "000") {
          this.tableLoading = false;
          this.totalPage = res.data.dataSize;
          let tableList = [];
          res.data.dataList.forEach(item => {
            tableList.push({
              userId: item.userId,
              userName: item.userName,
              mobile: item.userPhone,
              childCount: item.childCount,
              createdAt: item.createdAt,
              stationName: item.stationName,
              stationId: item.stationId
            });
          });
          tableList = [
            {
              id: 1,
              name: "肖高杰",
              gender: "1",
              phone: "18328510362",
              storeAddress: "成都双流",
              storeType: "个体",
              joinTime: "2020-11-11",
              joinmethods: "推广"
            },
            {
              id: 1,
              name: "肖高杰2",
              gender: "1",
              phone: "18328510362",
              storeAddress: "成都双流",
              storeType: "个体",
              joinTime: "2020-01-14",
              joinmethods: "推广"
            }
          ];
          this.tableContent = tableList;
        }
      });
    },
    changePage(index) {
      this.formItem.currentPage = index;
      this.filterWith(this.formItem);
    },
    changePageSize(size) {
      this.formItem.pageSize = size;
      this.formItem.currentPage = 1;
      this.filterWith(this.formItem);
    },
    refuseOk() {},
    cancel() {},
    getRouteData(vm) {
      const params = Object.assign({}, vm.$route.query);
      Object.assign(
        vm.formItem,
        this.convertQueryObjectPropertiesInt(params, [
          "currentPage",
          "pageSize"
        ])
      );
      vm._getData(vm.formItem);
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.getRouteData(vm);
    });
  },
  beforeRouteUpdate(to, from, next) {
    this.$nextTick(() => {
      this.getRouteData(this);
    });
    next();
  }
};
</script>

<style>
.childBodyTable .ivu-table-body {
  height: 300px;
  overflow: auto;
}
</style>

