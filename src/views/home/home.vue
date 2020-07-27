<template>
  <div>
    <!-- <template v-if="!this.homeInfo">欢迎来到后台管理系统</template> -->
    <!-- <template v-if="this.homeInfo">欢迎来到后台管理系统</template> -->
    <template>
      <Row class="home-header-wrapper">
        <Row class="home-header-content"
             type="flex">
          <Col>
          <div class="home-user-avatar"
               :style="avatarBG"></div>
          </Col>
          <Col style="margin-left: 10px;">
          <div class="home-user-greet">欢迎 买单省管理员</div>
<!--          <div class="home-user-info">
            <span class="user-info-position">{{userInfo.positionName}}</span>
            <span class="user-info-department">{{userInfo.divisionName}}</span>
          </div> -->
          </Col>
        </Row>
      </Row>
    </template>
  </div>
</template>

<script>
import util from "./../../libs/util.js";
import session from "./../../libs/session.js";
import { showRouteArr } from "../login/showRouteArr";
export default {
  name: "home",
  data() {
    return {
      homeInfo: false,
      userInfo: {},
      schedule: {},
      recordList: {},
      communityList: [],
      defaultAvatar:
        "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3448484253,3685836170&fm=27&gp=0.jpg"
    };
  },
  computed: {
    avatarBG() {
      return {
        // background: 'url(' + this.userInfo.avatar + ') no-repeat center center / contain'
      };
    }
  },
  created() {
    //this.init();
    this.getPendingRecordList();
  },
  methods: {
    getPendingRecordList() {
      // fetch({
      //     url: 'api/immunization/getPendingRecordList',
      //     method: 'post'
      // }).then((resp) => {
      //     console.log(resp);
      // });
      util.ajax
        .post("api/immunization/getPendingRecordList")
        .then(res => {
          if (res && res.data.code === "000") {
            this.stationCount = res.data.data.stationCount;
            this.orderCount = res.data.data.orderCount;
            this.communityList = res.data.data.list;
          }
        })
        .catch();
    },
    init() {
      util.ajax
        .post("api/finance/index")
        .then(res => {
          if (res && res.data.code === "000") {
            const data = res.data.data;
            if (data.divisionId === 1) {
              // 财务部门
              this.homeInfo = true;
              this.userInfo = data.userInfo;
              this.schedule = data.schedule;
              this.recordList = data.recordList;
            } else {
              this.homeInfo = false;
            }
          } else {
            if (res) {
              this.$Message.error({
                content: res.data.msg,
                duration: 3
              });
            }
          }
        })
        .catch();
    },
    goMore() {
      this.$router.push({
        path: "finance/outpatient-reconciliation?balanceState=2"
      });
    },
    toOutpatientService() {
      // 跳转门诊预约明细
      const obj = {
        status: "3",
        accountStatus: "5009"
      };
      session.setMMTData("outpatient-service", obj);
      this.$router.push({
        path: "../finance/outpatient-service"
      });
    },
    toStationBusiness() {
      // 跳转医院业务入口
      this.$router.push({
        path: "../finance/station-business"
      });
    },
    toOutpatientRecord() {
      // 跳转保险对账单
      const obj = {
        status: ["1", "2"]
      };
      session.setMMTData("outpatient-record", obj);
      this.$router.push({
        path: "../finance/outpatient-record"
      });
    },
    toExpertRefund() {
      // 跳转退款申请列表
      const obj = {
        payStatus: ["7"]
      };
      session.setMMTData("expert-refund", obj);
      this.$router.push({
        path: "../finance/expert-refund"
      });
    }
  }
};
</script>

<style lang="less" scoped>
.hlAuto {
  height: 235px;
  overflow: auto;
}
.hAuto {
  width: 100%;
  height: 175px;
  overflow: auto;
}
.f14 {
  font-size: 14px;
}
.flex {
  display: flex;
}
.line35 {
  line-height: 35px;
}
.communityTop {
  width: 100%;
  color: #ccc;
  line-height: 30px;
  height: 30px;
}
.mb30 {
  margin-bottom: 30px;
}
.tl {
  text-align: left;
}
.tc {
  text-align: center;
}
.communityTitle {
  display: flex;
  width: 100%;
  height: 30px;
  line-height: 30px;
  border-bottom: 1px solid #ccc;
  color: #1890ff;
  font-weight: bold;
}
.home-header-wrapper {
  background: #fff;
  padding: 20px 30px;
  .home-header-title {
    font-size: 12px;
    color: #444;
  }
  .home-header-content {
    margin: 20px 0px;
    .home-user-avatar {
      width: 58px;
      height: 58px;
      margin-right: 5px;
      border: 1px solid #b8b8b8;
      border-radius: 50%;
      text-align: center;
    }
    .home-user-greet {
      font-size: 20px;
      font-weight: 600;
      color: #333;
    }
    .home-user-info {
      line-height: 50px;
      span {
        font-size: 16px;
        color: #999;
      }
      .user-info-position {
        padding-right: 8px;
      }
      .user-info-department {
        padding-left: 8px;
        border-left: 1px solid #999;
      }
    }
  }
}

.home-task-wrapper {
  border: 1px solid #eee;
  .home-task-title {
    font-size: 16px;
    color: #999;
  }
  .home-task-number {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #2593fc;
    font-weight: 600;
    padding: 20% 0;
    font-size: 30px;
    cursor: pointer;
  }
}

.home-dynamic-wrapper {
  padding: 10px 20px;
  .dynamic-user-avatar {
    width: 38px;
    height: 38px;
    margin-right: 5px;
    border: 1px solid #b8b8b8;
    border-radius: 50%;
    text-align: center;
  }
  .dynamic-info {
    color: #333;
    font-weight: 600;
    span {
      color: #2593fc;
    }
  }
  .dynamic-time {
    font-size: 14px;
    color: #999;
  }
}
.no-dynamic {
  font-size: 12px;
  text-align: center;
  color: #999;
  padding: 10px 0;
}
.mt30 {
  margin-top: 30px;
}
.w49 {
  width: 49%;
}
.jfl {
  float: left;
}
.jfr {
  float: right;
}
</style>
