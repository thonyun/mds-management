<template>
  <section>
    <Card dis-hover>
      <p slot="title">
        <span> 
          孩子列表
        </span>
      </p>
      <Row>
        <i-col span="8"
               style="font-size:12px">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;孩子姓名：
          <i-input type="text"
                   clearable
                   placeholder="请输入"
                   style="padding-left:10px;color:rgba(0, 0, 0, 0.84);font-size:12px;height:30px;width:200px"
                   v-model="filters.realName"></i-input>
        </i-col>
        <i-col span="8"
               style="font-size:12px">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;用户电话：
          <i-input type="text"
                   clearable
                   placeholder="请输入"
                   style="padding-left:10px;color:rgba(0, 0, 0, 0.84);font-size:12px;height:30px;width:200px"
                   v-model="filters.userPhone"></i-input>
        </i-col>
        <i-col span="8"
               style="font-size:12px">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;孩子身份证：
          <i-input type="text"
                   clearable
                   placeholder="请输入"
                   style="padding-left:10px;color:rgba(0, 0, 0, 0.84);font-size:12px;height:30px;width:200px"
                   v-model="filters.idCard">
          </i-input>
        </i-col>
      </Row>
      <Row style="text-align:center; margin-top: 20px;">
        <i-button type="primary"
                  @click="handleSubmit"
                  style="width:150px">查询</i-button>&nbsp;&nbsp;&nbsp;&nbsp;
        <i-button type="primary"
                  @click="handleExport"
                  style="width:150px">导出</i-button>&nbsp;&nbsp;&nbsp;&nbsp;
      </Row>
    </Card>
    <Card style="margin-top: 20px;">
      <Row>
        <i-table :columns="tableTitle"
                 :loading="loading"
                 :data="tableContent"></i-table>
      </Row>
      <Row type="flex"
           justify="space-between"
           style="margin-top: 20px;">
        <Col>
        <p>共{{totalPage}}条记录 第{{filters.pageNo}}/{{Math.ceil(totalPage/filters.pageSize)}}页</p>
        </Col>
        <Col>
        <Page :total="totalPage"
              size="small"
              show-elevator
              show-sizer
              @on-change="changePage"
              @on-page-size-change="changePageSize"
              :page-size-opts="[10, 20, 30, 40]"></Page>
        </Col>
      </Row>
    </Card>

    <!-- 绑定社区 -->
    <Modal v-model="bindModal"
           width="420"
           :mask-closable="false"
           :closable="false"
           @on-visible-change="bindModalVisible"
           footer-hide
           :styles="{top: '160px'}">
      <Row type="flex"
           align="middle">
        <Icon style="font-size: 26px; color:#f90;"
              type="ios-alert" />
        <span style="font-size: 20px; font-weight: 600; margin-left: 10px;">提示</span>
      </Row>
      <Form style="margin: 10px 10px 10px 30px; font-size: 14px;"
            ref="bindForm"
            :model="bindForm"
            label-position="left">
        <FormItem>
          <div>
            绑定社区会影响孩子的计免预约，请注意
          </div>
          <Select v-model="bindForm.stationId">
            <Option v-for="item in stationList"
                    :label="item.name"
                    :value="item.id"
                    :key="item.id"></Option>
          </Select>
        </FormItem>
      </Form>
      <Row type="flex"
           justify="end"
           style="margin-top: 15px;">
        <Button @click="cancel">取消</Button>
        <Button style="margin: 0 10px;"
                type="primary"
                @click="handleBind">确定</Button>
      </Row>
    </Modal>
    <Modal v-model="identityCardModal"
           width="420"
           :mask-closable="false"
           :closable="false"
           @on-cancel="restIdentityCard"
           footer-hide
           :styles="{top: '160px'}">
      <Form :label-width="80"
            v-if="identityCardModal"
            style=""
            ref="identityCardForm"
            :rules="identityCardRuler"
            :model="identityCardForm">
        <FormItem label="身份证号"
                  prop="idCard">
          <Input v-model="identityCardForm.idCard"
                 placeholder="请输入新的身份证号"
                 style="width: 300px" />
        </FormItem>
      </Form>
      <Row type="flex"
           justify="end"
           style="margin-top: 15px;">
        <Button @click="cancelIdentityCardModal">取消</Button>
        <Button style="margin: 0 10px;"
                type="primary"
                @click="handleSubmitIdentityCardForm">确定</Button>
      </Row>
    </Modal>
  </section>
</template>
<script>
import util from "./../../libs/util.js";
import baseUtil from "./../../libs/util.js";
import filter from "../../mixin/filter";
export default {
  mixins: [filter],
  data() {
    const validateIdCard = (rule, value, callback) => {
      if (this.identityCardForm.idCard == undefined) {
        callback(new Error("请输入身份证号"));
        return;
      }
      let re = /^[0-9]+.?[0-9]*/;
      if (!re.test(this.identityCardForm.idCard)) {
        callback(new Error("身份证号为数字"));
        return;
      }
      if (this.identityCardForm.idCard.length != 18) {
        callback(new Error("身份证号为18位"));
        return;
      }
      callback();
    };
    return {
      identityCardModal: false,
      identityCardRuler: {
        idCard: [
          {
            required: true,
            validator: validateIdCard,
            trigger: "blur"
          }
        ]
      },
      identityCardForm: {
        idCard: "",
        id: ""
      },
      tableTitle: [
        {
          title: "孩子编号",
          key: "id",
          align: "center",
          minWidth: 90
        },
        {
          title: "孩子姓名",
          key: "realname",
          align: "center",
          minWidth: 120
        },
        {
          title: "孩子身份证号码",
          key: "idcard",
          align: "center",
          minWidth: 200
        },
        {
          title: "孩子生日",
          key: "birth",
          align: "center",
          minWidth: 120
        },
        {
          title: "孩子性别",
          key: "gender",
          align: "center",
          minWidth: 80
        },
        {
          title: "用户编号",
          key: "user_id",
          align: "center",
          minWidth: 80
        },
        {
          title: "用户姓名",
          key: "user_name",
          align: "center",
          minWidth: 120
        },
        {
          title: "联系电话",
          key: "user_phone",
          align: "center",
          minWidth: 120
        },
        {
          title: "所在社区",
          key: "stationName",
          align: "center",
          minWidth: 120
        },
        {
          title: "已绑定服务包",
          key: "serviceName",
          align: "center",
          minWidth: 160
        },
        {
          title: "操作",
          align: "center",
          key: "id",
          minWidth: 200,
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                {
                  style: {
                    color: "#5cadff",
                    cursor: "pointer",
                    padding: "0 5px"
                  },
                  on: {
                    click: () => {
                      this.popIdentityCardModal(params.row.id);
                    }
                  }
                },
                "更改身份证"
              )
            ]);
          }
        }
      ],
      loading: false,
      tableContent: [],
      currentPage: 1,
      totalPage: 0,
      pageSize: 10,
      filters: {
        realName: "",
        userPhone: "",
        idCard: "",
        vipFlag: false,
        pageSize: 10,
        pageNo: 1
      },
      modal1: false,
      bespeakTime: ["", ""],
      bindModal: false,
      bindChildId: null,
      stationList: [],
      bindForm: {
        stationId: null
      }
    };
  },
  created() {
    // this._getData();
    this.initStationList();
  },
  methods: {
    popIdentityCardModal(val) {
      this.identityCardModal = true;
      this.identityCardForm.id = val;
    },

    restIdentityCard() {
      this.identityCardForm.idCard = "";
      this.identityCardForm.id = "";
    },
    cancelIdentityCardModal() {
      this.identityCardModal = false;
      this.restIdentityCard();
    },
    handleSubmitIdentityCardForm() {
      this.$refs.identityCardForm.validate(valid => {
        if (valid) {
          this.identityCardModal = false;
          this.$fetch({
            url: "child/updateChildInfo",
            method: "post",
            data: this.identityCardForm
          })
            .then(res => {
              if (res && res.code === "000") {
                this.identityCardModal = false;
                this.$Message.success("身份证号提交成功");
                this._getData(this.filters);
              }
              this.restIdentityCard();
            })
            .catch(error => {
              this.$Message.error("操作失败");
              this.identityCardModal = false;
              this.restIdentityCard();
            });
        }
      });
    },
    handleExport() {
      let url =
        baseUtil.ajax.defaults.baseURL +
        "child/childInfoExcel" +
        "?" +
        "&TOKEN=" +
        this.$token +
        "&realName=" +
        this.filters.realName +
        "&userPhone=" +
        this.filters.userPhone +
        "&idCard=" +
        this.filters.idCard;
      window.location.href = url;
    },
    handleSubmit() {
      // 查询
      // this.currentPage = 1;
      // this._getData();
      this.filterWith(
        this.filters,
        { random: Math.random() },
        { pageSize: 10, pageNo: 1 }
      );
    },
    initStationList() {
      util.ajax
        .post("api/area/station", {
          isPlannedImmunity: 1
        })
        .then(res => {
          if (res.data.code === "000") {
            this.stationList = res.data.data;
            this.bindForm.stationId = this.stationList[0].id;
          } else {
            this.$Message.error({
              content: res.data.msg,
              duration: 3
            });
          }
        })
        .catch();
    },
    _getData(val) {
      // 获取数据请求(请求参数自取)
      this.cleanParamsObject(val);
      this.loading = true;
      this.$fetch({
        url: "/child/index",
        method: "post",
        data: val
      }).then(res => {
        if (res && res.code === "000") {
          this.loading = false;
          this.totalPage = res.data.totalSize;
          let tableList = [];
          res.data.dataList.forEach(item => {
            tableList.push({
              gender: item.gender == 1 ? "男" : "女", // 性别1男
              user_id: item.user_id,
              user_name: item.user_name,
              idcard: item.idcard,
              birth: item.birth,
              user_phone: item.user_phone,
              id: item.id,
              stationName: item.stationName,
              realname: item.realname, // 孩子名称
              serviceName: item.serviceName
            });
          });
          this.tableContent = tableList;
        }
        //  else {
        //     this.loading = false;
        // }
      });
    },
    changePage(index) {
      this.filters.pageNo = index;
      this.filterWith(this.filters);
    },
    changePageSize(size) {
      this.filters.pageSize = size;
      this.filterWith(this.filters);
    },
    bindModalVisible(val) {
      if (!val) {
        this.bindForm.stationId = this.stationList[0].id;
      }
    },
    cancel() {
      this.bindModal = false;
    },
    handleBind() {
      util.ajax
        .post("/child/bindChildStation", {
          id: this.bindChildId,
          stationId: this.bindForm.stationId
        })
        .then(res => {
          if (res.data.code === "000") {
            this.$Message.success({
              content: "绑定社区成功",
              duration: 3
            });
            this.bindModal = false;
            this._getData(this.filters);
          } else {
            this.$Message.error({
              content: res.data.msg,
              duration: 3
            });
          }
        })
        .catch();
    },
    getRouteData(vm) {
      const params = Object.assign({}, vm.$route.query);
      Object.assign(
        vm.filters,
        this.convertQueryObjectPropertiesInt(params, ["pageNo", "pageSize"])
      );
      vm._getData(vm.filters);
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