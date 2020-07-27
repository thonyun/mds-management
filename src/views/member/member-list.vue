<template>
  <Card>
    <p slot="title">会员列表-健康档案</p>
      <div>

      <div class="graphic-li" v-for="item in contentData">
        <p style="font-weight: 650;font-size: 20px;color: rgba(0, 0, 0, 0.84);
">姓名：{{childData.childName}}</p><br>
        <div style="font-size: 16px;">
        <Row style="margin-bottom:10px">
            <i-col span="8" >性别：{{childData.childSex}}</i-col>
            <i-col span="8" >电话：{{childData.userPhone}}</i-col>
        </Row>
        <Row style="margin-bottom:10px">
            <i-col span="8" >创建时间：{{childData.childCreatedAt}}</i-col>
            <i-col span="8" >身份证：<span style="color: rgb(24, 144, 255);">{{childData.childIdCard}}</span></i-col>
        </Row>
        <Row style="margin-bottom:10px">
            <i-col span="8" >购买产品：{{childData.servicePackage}}</i-col>
            <i-col span="8" >生效日期：{{childData.fromTime}}-{{childData.toTime}}</i-col>
        </Row>
         <Row style="margin-bottom:10px">
            <i-col span="8" >门诊次数：<span style="color: rgb(24, 144, 255);">{{childData.clinicCount}}</span></i-col>
        </Row>
         <Row style="margin-bottom:10px">
            <i-col span="8" >专家预约次数：<span style="color: rgb(24, 144, 255);">{{childData.expertCount}}</span></i-col>
        </Row>
         <Row style="margin-bottom:10px">
            <i-col span="8" >电话咨询次数：<span style="color: rgb(24, 144, 255);">{{childData.phoneCount}}</span></i-col>
        </Row>
         <Row style="margin-bottom:10px">
            <i-col span="8" >图文咨询次数：<span style="color: rgb(24, 144, 255);">{{childData.orderImCount}}</span></i-col>
        </Row>
        </div>
      </div>

      <div style="margin-top:20px">
        <p style="font-weight: 650;font-size: 20px;color: rgba(0, 0, 0, 0.84);margin-left:40px">用户轨迹</p>
        <div style="margin:auto">
            <Timeline :key="index" v-for="(item, index) in behaviorList">
            <Timeline-item :color="item.color">{{item.type}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{item.createdTime}}&nbsp;&nbsp;&nbsp;
                <span style="color: rgb(24, 144, 255); cursor: pointer;" @click="getFocus(item)">{{item.remark}}</span></Timeline-item>
        </Timeline>
        </div>
      </div>

          <!--客服备注-->
          <Modal
                  v-model="remarkModal"
                  title="客服备注"
                  width=25
                  :styles="{marginTop: '15%'}"
                  footer-hide="">
              <p>{{remarkContent}}</p>
          </Modal>
      </div>
  </Card>
</template>
<script>
import util from './../../libs/util.js';
import moment from "moment";
import session from './../../libs/session.js';
export default {
  data() {
    return {
        id:'',
        remarkModal:false,
        remarkContent:'',
        behaviorList:[
            // {
            //     color:'red',
            //     type:'啦啦啦啦啦',
            //     createdTime:'2018-08-11 23:02:00'
            // }
        ],
        childData:{
            childId:'',
            childName:'',
            childSex:'',
            childBirth:'',
            childCreatedAt:'',
            userPhone:'',
            childIdCard:'',
            servicePackage:'',
            fromTime:'',
            toTime:'',
            clinicCount:'',
            expertCount:'',
            phoneCount:'',
            orderImCount:''
        },
      contentData: [
        {
          imgURL: '',
          name: '',
          time: '',
          content: ''
        }
      ],

    }
  },
  created(){
      this._getData();
  },
  methods: {
      getFocus(val){
          console.log(val.typeId+ '============= ' + val.objectId);
          let self = this;
          if (val.typeId === 2){ //客服备注
                this.remarkModal = true;
                this.remarkContent = val.serviceRemark;
          } else if (val.typeId === 7){ //计免
              self.$router.push({
                  path: `../../finance/planned-immunity-del/${val.objectId}`
              })
          } else if (val.typeId === 3){ //电话咨询
              self.$router.push({
                  path: `../../finance/telephone-detail/${val.objectId}`
              })
          } else if (val.typeId === 4){ //图文
              let a = {
                  id:val.objectId
              };
              this.$store.commit('setMMTdata', a);
              self.$router.push({
                  path: `../../statistics/graphic-consultingdet`
              })
          } else if (val.typeId === 5){ //专家预约
              let a = {
                  id: val.objectId
              };
              session.setMMTData('expert-appointment', a);
              console.log(window.sessionStorage)
              self.$router.push({
                  path: `../../finance/expert-exdetail`
              })
          } else if (val.typeId === 6){ //门诊
              let b = [];
              util.ajax.post('api/finance/getFinanceOrder', {
                  'id': val.objectId
              })
                  .then((res) => {
                      b = res.data.data.list;
                      let a = {
                          data: b[0],
                          title: '门诊预约'
                      };
                      this.$store.commit('set_finace_data', a);
                      this.$router.push({
                          path: `../../finance/finance-zgx`
                      });
                  })
                  .catch((error) => {
                  });
          }
      },
      turnType(val){
          let a = [1,2,3,4,5,6,7];
          let b = ['用户资料修改操作','客服备注','电话咨询','图文咨询','专家预约','门诊预约','计免预约'];
          let c = ['green','blue','green','green','green','green','green'];
          let d = ['','查看','查看','查看','查看','查看','查看'];
          return {
              type:b[a.indexOf(val)],
              color: c[a.indexOf(val)],
              remark: d[a.indexOf(val)]
          };
      },
  _getData() {         //获取数据请求(请求参数自取)
              util.ajax.post('/child/healthChildBasic', {
                    'childId': this.$route.params.id
              })
                  .then((res) => {
                      console.log(res.data);
                      let data = res.data.data;
                      let childData = this.childData;
                      childData.childName = data.childName;
                      childData.childSex = data.childSex;
                      childData.childId = this.$route.params.id;
                      childData.childCreatedAt = data.childCreatedAt;
                      childData.childIdCard = data.childIdCard;
                      childData.childName = data.childName;
                      childData.clinicCount = data.diagnoseCount;
                      childData.phoneCount = data.consultCount;
                      childData.orderImCount = data.orderImCount;
                      childData.expertCount = data.expertBespeakCount;
                      childData.servicePackage = data.servicePackage;
                      childData.fromTime = data.fromTime;
                      childData.toTime = data.toTime;
                      let behaviorList = this.behaviorList;
                      data.recordList.forEach((item) =>{
                          let a = this.turnType(item.type);
                          behaviorList.push({
                              typeId: item.type,
                              objectId:item.objectId,
                              type: a.type,
                              color: a.color,
                              createdTime: moment(Date(item.createdAt)).format('YYYY-MM-DD HH:mm:ss'),
                              remark: a.remark,
                              serviceRemark: item.remarks
                          })
                      })
                      })
                      .catch((error) => {
                          console.log(error);
                      });
          },
  }
}
</script>

<style lang="less">


.graphic-li{
  position: relative;
  padding-left: 40px;
  margin-top: 15px;
}

.graphic-li .graphic-img{
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 50%;
  border: 1px solid #e9eaec;
}
.ivu-timeline{
 margin-left: 40%
}
</style>
