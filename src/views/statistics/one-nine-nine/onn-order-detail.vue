<template>
  <div>
    <card class="style-of-card">
      <p slot="title">
        订单详情
      </p>
      <Row type="flex" justify="space-between">
        <Col span="10">
          <p class="font-large-bold">订单号：<span>{{orderData.orderNo}}</span></p>
        </Col>
        <Col span="8" style="display: flex; justify-content: flex-end; margin-bottom: 20px;">
          <Button type="primary" :disabled="!orderData.isRefund" @click="refund(orderData)">申请退款</Button>
        </Col>
      </Row>
      <Row :gutter="16" type="flex" justify="start">
        <Col span="14" style="line-height: 28px;">
          <Row>
            <Col span="12" v-for="(val, key) in orderTitleArr" :key="key">
              <span>{{orderTitleArr[key]}}：</span>
              <span>{{orderData[key]}}</span>
            </Col>
          </Row>
        </Col>
        <Col span="10">
          <Row type="flex" justify="end">
            <Col span="6" style="text-align: right;">
              <span class="font-small-gray">订单状态</span>
              <P class="font-large-bold">{{orderData.paymentStatusName}}</P>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row :gutter="16" type="flex" justify="start">
        <Col span="14" style="line-height: 35px;">
          <Row>
            <Col span="24">
              <span>绑定医生：</span>
              <span>{{orderData.doctorName}}</span>
              <span style="margin-left: 10px;">
                <Button size="small" v-if="orderData.doctorName" type="primary" @click="clickChangeDoc">修改医生</Button>
              </span>
            </Col>
            <Col span="24">
              <span>档案状态：</span>
              <span>{{orderData.buildStateName}}</span>
              <span style="margin-left: 10px;">
                <Button size="small" v-if="orderData.buildStatus === 1" @click="checkFileModal = true">档案审核</Button>
                <Button size="small" v-if="orderData.buildStatus === -1" @click="clickBookFile(orderData.doctorId, orderData.doctorName)">预约建档</Button>
                <Button size="small" v-else-if="orderData.buildStatus === 2" :disabled="true">档案已通过</Button>
                <Button size="small" v-else-if="orderData.buildStatus === 3" :disabled="true">档案被拒</Button>
              </span>
            </Col>
            <Col span="24">
              <span>照片状态：</span>
              <span>{{photoStateName[orderData.cardImgStatus]}}</span>
              <span style="margin-left: 10px;">
                <Button size="small" v-if="orderData.cardImgStatus === 1" @click="clickPhotoCheck(orderData)">照片审核</Button>
                <Button size="small" v-else-if="orderData.cardImgStatus === 3" @click="clickPhotoCheck(orderData)">照片审核通过</Button>
                <Button size="small" v-else-if="orderData.cardImgStatus === 2" @click="clickPhotoCheck(orderData)">照片审核拒绝</Button>
              </span>
            </Col>
            <Col span="24">
              <span>保险状态：</span>
              <span>{{orderData.status199Name}}</span>
            </Col>
          </Row>
        </Col>
      </Row>
    </card>
    <Tabs size="small" style="margin-top: 20px;">
      <TabPane label="详细信息">
        <card class="style-of-card">
          <p slot="title">家庭医生服务卡使用情况</p>
          <Row class="service-header">
            <Col span="8">项目</Col>
            <Col span="4">使用情况</Col>
          </Row>
          <Row class="service-content">
            <Col span="8">家庭医生签约建档</Col>
            <Col span="4">{{usedInfo.buildStateName}}</Col>
          </Row>
          <Row class="service-content">
            <Col span="8">7*24小时图文咨询</Col>
            <Col span="4">{{usedInfo.imCount}}次</Col>
          </Row>
          <Row class="service-content">
            <Col span="8">7*24小时电话咨询</Col>
            <Col span="4">{{usedInfo.phoneCount}}次</Col>
          </Row>
          <Row class="service-content">
            <Col span="8">华西二院转诊</Col>
            <Col span="4">{{usedInfo.huaxiCount}}/{{usedInfo.huaxiMaxCount}}</Col>
            <Col span="6" v-if="usedInfo.huaxiCount < usedInfo.huaxiMaxCount">
              <Button type="primary" @click="recoverCount">
                <span>恢复</span>
              </Button>
            </Col>
          </Row>
          <Row class="service-content">
            <Col span="8">儿童保险</Col>
            <Col span="4">{{usedInfo.status199Name}}</Col>
          </Row>
        </card>
        <card class="style-of-card" v-if="showFile" style="margin-top: 15px;">
          <p slot="title">档案信息</p>
          <Row v-for="(val, key1) in fileTitleArr" :key="key1" :gutter="32" style="padding-left: 30px;">
            <p class="title-of-file">{{fileTitleArr[key1]}}</p>
            <Col
              span="8"
              style="line-height: 28px;"
              v-for="(val, key2) in fileTitle2Arr[key1]"
              :key="key2">
              <span>{{fileTitle2Arr[key1][key2]}}：</span>
              <span>{{fileData[key1][key2]}}</span>
            </Col>
          </Row>
        </card>
        <!-- <div v-else style="padding: 10px 0;text-align: center; font-size: 12px; color: #a9a9a9;">暂无数据</div> -->
      </TabPane>
    </Tabs>

    <!-- 建档预约 -->
    <Modal
      v-model="bookDialogVisible"
      :closable="false"
      @on-visible-change="clearBookForm"
      footer-hide
      width="440"
      >
      <Row class="change-doctor-head">
        <Icon type="ios-alert" style="color: #f8ac30; font-size: 26px;" />
        <span style="margin-left: 15px; font-size: 14px; font-weight: bold;">建档预约</span>
      </Row>
      <Form v-if="!docHasBind" ref="docBind" :model="docBind" :rules="docBindRule" :label-width="80">
        <Row>
          <FormItem label="医生：" prop="id">
            <Select
              style="width:260px"
              v-model="docBind.id"
              clearable
              filterable
              placeholder="医生姓名或电话"
              not-found-text="无匹配数据"
              :loading="loading4"
              ref="docBindSelect"
              @on-clear="clearDoctorList"
              @on-query-change="dealDoctorList"
              @on-open-change="docBindChange"
              @on-change="selectDoctor">
              <Option v-for="option in doctorList" :label="option.realname" :value="option.id" :key="option.id">{{option.realname}}</Option>
            </Select>
          </FormItem>
        </Row>
      </Form>
      <Form ref="timeBook" :model="timeBook" :rules="timeBookRule" :label-width="80">
        <Row>
          <FormItem label="日期：" prop="date">
            <DatePicker
            type="date"
            @on-change="selectWorkDay"
            :options="dateOptions"
            placeholder="选择日期"
            v-model="timeBook.date"
            style="width:260px"></DatePicker>
          </FormItem>
        </Row>
        <Row>
          <FormItem label="时间：" prop="timeId">
            <Select clearable v-model="timeBook.timeId" style="width:260px">
              <Option v-for="item in validTimeList" :disabled="item.disabled" :value="item.id" :key="item.id">{{item.time}}</Option>
            </Select>
          </FormItem>
        </Row>
      </Form>
      <Row class="change-doctor-foot" type="flex" justify="end">
        <Button @click="cancelBook">取消</Button>
        <Button type="primary" @click="bookConfirm">确定</Button>
      </Row>
    </Modal>

    <!-- 更改医生 -->
    <Modal
      v-model="changeDialogVisible"
      :closable="false"
      @on-visible-change="clearDoctorChangeForm"
      footer-hide
      width="440">
      <Row class="change-doctor-head">
        <Icon type="ios-alert" style="color: #f8ac30; font-size: 26px;" />
        <span style="margin-left: 15px; font-size: 14px; font-weight: bold;">更改医生</span>
      </Row>
      <Form ref="docChange" :model="docChange" :rules="docChangeRule" :label-width="80">
        <Row>
          <FormItem label="医生：" prop="doctorTeamId">
            <Select
              style="width:260px"
              v-model="docChange.doctorTeamId"
              clearable
              filterable
              remote
              placeholder="医生姓名或电话"
              not-found-text="无匹配数据"
              :remote-method="getDoctor"
              :loading="loading4"
              ref="docChangeSelect"
              @on-clear="clearDoctorList"
              @on-query-change="dealDoctorList"
              @on-open-change="docChangeChange">
              <Option v-for="option in doctorList" :label="option.realname" :value="option.id" :key="option.id">{{option.realname}}</Option>
            </Select>
          </FormItem>
        </Row>
      </Form>
      <Row class="change-doctor-foot" type="flex" justify="end">
        <Button @click="cancelChangeDoc">取消</Button>
        <Button type="primary" @click="changeDoctor">确定</Button>
      </Row>
    </Modal>

    <!-- 照片审核 -->
    <Modal
      :styles="{top: '130px'}"
      v-model="photoDialogVisible"
      :mask-closable="false"
      @on-visible-change="clearPhotoCheckForm"
      footer-hide
      width="500"
      v-if="photoDialogVisible"
      :transfer="false">
      <P slot="header">{{this.orderId}}({{this.childName}})</P>
      <div class="photo-modal-content">
        <div class="swiper-container" id="gallery">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(imgUrl, index) in orderPhotos" :key="index" @click="showOriginImg(imgUrl)">
              <img :src="imgUrl" />
              <div class="gallery-tips"><Icon type="ios-add-circle-outline" />点击查看原图</div>
            </div>
          </div>
        </div>
        <div class="swiper-container" id="thumbs">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(imgUrl, index) in orderPhotos" :key="index">
              <img :src="imgUrl" />
            </div>
          </div>
        </div>
      </div>
      <Row v-if="showPhotoCheckForm" class="check-photo-content">
        <Form ref="checkPhotoForm" :model="checkPhotoForm" style="margin-top: 5px;">
        <Row type="flex" justify="start">
          <Col span="16">
            <FormItem label="状态:">
              <RadioGroup v-model="checkPhotoForm.checkState" @on-change="photoStateChange">
                <Radio :label="1">待审核</Radio>
                <Radio :label="3">通过</Radio>
                <Radio :label="2">拒绝</Radio>
              </RadioGroup>
            </FormItem>
          </Col>
        </Row>
        <Row type="flex" justify="start">
          <Col span="16">
            <FormItem label="原因:" v-if="checkPhotoForm.checkState === 2">
              <RadioGroup v-model="checkPhotoForm.refuseReason" @on-change="reasonChange">
                <Row><Radio label="不清晰">不清晰</Radio></Row>
                <Row><Radio label="不是本人">不是本人</Radio></Row>
                <Row>
                  <Radio label="其他">其他</Radio>
                  <Input class="input-line" v-model="otherReason" placeholder="请输入拒绝原因" @on-focus="checkReasonAlert = false" clearable/>
                  <Alert style="margin-top: 8px;" v-show="checkReasonAlert === true" type="error" show-icon>必须输入拒绝原因</Alert>
                </Row>
              </RadioGroup>
            </FormItem>
          </Col>
        </Row>
      </Form>
      <Row type="flex" justify="end">
        <Col>
          <Button type="primary" @click="handlePhotoCheck">提交</Button>
        </Col>
      </Row>
      </Row>
    </Modal>

    <!-- 查看原图 -->
     <Modal
      :styles="{top: '50px'}"
      v-model="originImgVisible"
      :mask-closable="false"
      footer-hide>
      <P slot="header">原图</P>
      <div class="origin-img-container">
        <img :src="originUrl" />
      </div>
    </Modal>

    <!-- 档案审核 -->
    <Modal
      v-model="checkFileModal"
      footer-hide
      @on-visible-change="clearFileForm"
      width="440"
      >
      <Row type="flex" align="middle" slot="header">
            <Icon style="font-size: 26px; color:#f90;" type="ios-alert" />
            <span style="font-size: 20px; font-weight: 600; margin-left: 10px;">档案审核</span>
      </Row>
      <Form ref="fileForm" :model="fileForm" :rules="fileFormRules" :label-width="80">
        <FormItem label="状态：" prop="state">
          <RadioGroup v-model="fileForm.state" @on-change="stateChange">
            <Radio :label="2">通过</Radio>
            <Radio :label="3">拒绝</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem v-if="fileForm.state === 3" label="原因：" prop="refuseMsg">
          <Input v-model="fileForm.refuseMsg" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请填写拒绝原因(必填，最多填写200字)"></Input>
        </FormItem>
      </Form>
      <Row type="flex" justify="end" style="margin-top: 15px;">
            <Button type="primary" @click="checkFile">提交</Button>
        </Row>
    </Modal>

    <!-- 申请退款 -->
    <Modal
      v-model="refundModal"
      width="420"
      :mask-closable="false"
      :closable="false"
      @on-visible-change="refundModalVisible"
      footer-hide
      :styles="{top: '160px'}">
      <Row type="flex" align="middle">
        <Icon style="font-size: 26px; color:#f90;" type="ios-alert" />
        <span style="font-size: 20px; font-weight: 600; margin-left: 10px;">提示</span>
      </Row>
      <Form style="margin: 10px 10px 10px 30px; font-size: 14px;" ref="refundForm" :model="refundForm" label-position="left">
        <FormItem>
          <div>申请退款：{{refundForm.refundMoney}}元</div>
          <div>
            申请退款后订单状态变更为“发起退款”，选择退款的原因：
          </div>
          <Select v-model="refundForm.reason">
            <Option v-for="item in refuseList" :label="item" :value="item" :key="item"></Option>
          </Select>
        </FormItem>
      </Form>
      <Row type="flex" justify="end" style="margin-top: 15px;">
        <Button @click="cancel">取消</Button>
        <Button style="margin: 0 10px;" type="primary" @click="handleRefund">确定</Button>
      </Row>
    </Modal>

    <!-- 恢复华西转诊次数 -->
    <Modal
      v-model="recoverModal"
      width="420"
      :mask-closable="false"
      :closable="false"
      footer-hide
      :styles="{top: '160px'}">
      <Row type="flex" align="middle">
        <Icon style="font-size: 26px; color:#f90;" type="ios-alert" />
        <span style="font-size: 20px; font-weight: 600; margin-left: 10px;">提示</span>
      </Row>
      <Row style="margin-top: 10px;">
        确认要恢复该用户199家庭医生服务卡的华西二院转诊次数吗？
      </Row>
      <Row type="flex" justify="end" style="margin-top: 15px;">
        <Button @click="cancelRecover">取消</Button>
        <Button style="margin: 0 10px;"  type="primary" :loading="loading" @click="handleRecover">
          <span v-if="!loading">确定</span>
          <span v-else>处理中...</span>
        </Button>
      </Row>
    </Modal>
  </div>
</template>
<script>
import util from './../../../libs/util.js'
import {common} from './../../../libs/common.js'
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'
export default {
  name: 'onn-order-detail',
  created() {
    this.id = this.$route.params.onnOrderId
    this.pageId = this.$route.params.pageId
    this.getOrderDetail()
  },
  mounted() {
  },
  data() {
    return {
      orderTitleArr: {
        userName: '成人用户',
        childName: '儿童',
        mobile: '电话',
        createdAt: '购买时间'
      },
      fileTitleArr: {
        BasicInfo: '基础信息',
        BirthInfo: '出生情况',
        PregnancyIllness: '母亲妊娠患病情况',
        BloodInfo: '血型',
        AllergyInfo: '过敏史',
        FeedInfo: '喂养史',
        VaccinationInfo: '预防接种史',
        DiseaseInfo: '疾病史',
        HealthProblems: '多发健康问题'
      },
      fileTitle2Arr: {
        BasicInfo: {
          "Name": "姓名",
          "Sex": "性别",
          "Birth": "出生日期",
          "IdCard": "身份证号码",
          "BirthHospital": "出生医院",
          "HxCard": "华西二院就诊卡",
          "GuardianName": "监护人姓名",
          "Phone": "联系电话",
          "Address": "家庭住址",
          "Email": "电子邮箱"
        },
        BirthInfo: {
          "GestationalAge": "出生胎龄",
          "Fetus": "单胎或多胎",
          "BornWay": "生产方式",
          "EutociaWay": "顺产方式",
          "Apgar": "apgar评分"
        },
        PregnancyIllness: {
          "Illness": "病种",
          "Anemia": "贫血程度",
          "Other": "其他"
        },
        BloodInfo: {
          "BloodType": "ABO血型",
          "RhBlood": "RH血型"
        },
        AllergyInfo: {
          "FoodAllergy": "食物过敏",
          "FoodAllergyOther": "其他食物过敏",
          "MedicineAllergy": "药物过敏",
          "MedicineAllergyOther": "其他药物过敏",
          "OtherAllergy": "其他过敏"
        },
        FeedInfo: {
          "FeedWay": "喂养方式",
          "FeedTime": "喂养时长",
          "Complementary": "辅食添加情况",
          "Vitamin": "维生素"
        },
        VaccinationInfo: {
          "Statutory": "法定接种",
          "StatutoryOther": "法定接种其他",
          "Supplement": "补充接种",
          "SupplementOther": "补充接种其他疫苗"
        },
        DiseaseInfo: {
          "Newborn": "新生儿疾病",
          "NewbornOther": "新生儿疾病其他",
          "Inheritance": "遗传及先天性疾病",
          "InheritanceOther": "遗传及其他先天性疾病",
          "OtherDisease": "其他重要疾病",
          "OtherDiseaseText": "重要疾病其他",
          "InheritanceDisease": "遗传性代谢疾病",
          "MajorDisease": "重大疾病及后遗症",
          "MajorDiseaseOther": "重大疾病及后遗症其他",
          "ChronicDiseases": "慢性疾病",
          "ChronicDiseasesOther": "慢性疾病其他",
          "ImmuneDysfunction": "免疫功能紊乱",
          "ImmuneDysfunctionOther": "免疫功能紊乱其他",
          "GrowthRetardation": "生长发育迟缓",
          "GrowthRetardationOther": "生长发育迟缓其他"
        },
        HealthProblems: {
          "Problems": "症状",
          "FeverCount": "发热次数",
          "AppetiteCount": "食欲不振次数",
          "CoughCount": "咳嗽次数",
          "RashCount": "皮疹次数",
          "DiarrheaCount": "腹泻次数",
          "SleepCount": "睡眠障碍次数",
          "VomitingCount": "呕吐次数"
        }
      },
      orderData: {},
      usedInfo: {},
      fileData: {},
      id: '',
      pageId: '',
      childId: '',
      showFile: false,
      photoStateName: ['未提交','待审核','审核拒绝','审核通过'],
      checkFileModal: false,
      fileForm: {
        state: 2,
        refuseMsg: null
      },
      fileFormRules: {
        state: [
          { required: true, type: 'number', message: '请选择通过或拒绝', trigger: 'change' }
        ],
        refuseMsg: [
          { pattern: /^(?!(\s+$))/, required: true, message: '拒绝原因必须填写', trigger: 'blur' },
          { type: 'string', max: 200,  message: '超出200字字数上限', trigger: 'blur' }
        ]
      },
      // 订单号
      orderId: '',
      // 照片审核孩子姓名
      childName: '',
      bookDialogVisible: false, // 预约建档弹框
      changeDialogVisible: false, // 修改医生弹框
      photoDialogVisible: false, // 照片审核弹框
      checkReasonAlert: false,
      showPhotoCheckForm: false,
      orderPhotos: [],
      checkPhotoForm: {
        checkState: 1,
        refuseReason: ''
      },
      otherReason: '',
      originUrl: '',
      originImgVisible: false,
      // 绑定医生表单数据
      docBind: {
        id: ''
      },
      // 绑定医生验证规则
      docBindRule: {
       id: [{ required: true, type: 'number',  message: '请选择医生', trigger: 'change' }]
      },
      // 是否已绑定医生
      docHasBind: true,
      // 预约时间
      timeBook: {
        date: '',
        timeId: ''
      },
      // 日期和时间验证规则
      timeBookRule: {
        date: [{required: true, type: 'date', message: '请选择预约日期', trigger: 'change'}],
        timeId: [{required: true, type: 'number', message: '请选择预约时间段', trigger: 'change'}]
      },
       // 可选时间段
      validTimeList: [],
      // 不可选时间设置项
      dateOptions: {},
      // 可选时间数组
      canSelectDate: [],
      // 已绑定医生
      bindDoctor: '',
      // 已绑定医生id
      bindDoctorId:'',
      // 照片审核孩子姓名
      childName: '',
      // 选择的日期
      workDay: '',
      // 更改医生表单数据
      docChange: {
        doctorTeamId: ''
      },
      // 更改医生验证规则
      docChangeRule: {
        doctorTeamId: [{ required: true, type: 'number', message: '请选择医生', trigger: 'change' }]
      },
      // 医生列表
      doctorList: [],
      loading4: false,
      loading: false,
      refundId: '', // 退款订单号
      refundModal: false, // 退款弹框
      refundForm: { // 退款金额，原因
        reason: '已通过其他渠道预约华西医生',
        refundMoney: ''
      },
      refuseList: [ // 退款原因
        '已通过其他渠道预约华西医生',
        '非成都本地用户',
        '服务条款不匹配需求',
        '冲动消费'
      ],
      recoverModal: false // 恢复华西转诊次数弹框
    }
  },
  methods: {
    getOrderDetail() {
      util.ajax.post('api/ensurance/getChildDocument199', {
        "id": this.id
      }).then((res) => {
        if(res.data.code === '000') {
          const data = res.data.data
          // const item = data.orderInfo
          // const startArr = item.effectStart.split(' ')
          // item.effectStart = startArr[0]
          // const endArr = item.effectEnd.split(' ')
          // item.effectEnd = endArr[0]
          // item.effect = `${item.effectStart} ~ ${item.effectEnd}`
          // console.log(`effect === ${item.effect}`)
          this.orderData = data.orderInfo
          this.usedInfo = data.usedInfo
          this.childId = this.orderData.childId
          this.fileData = this.handleFile(data.document)
        }
      })
    },
    handleFile(data){
      if (!data) {
        this.showFile = false
        data = {
          "BasicInfo": {},
          "BirthInfo": {},
          "PregnancyIllness": {},
          "BloodInfo": {},
          "AllergyInfo": {},
          "FeedInfo": {},
          "VaccinationInfo": {},
          "DiseaseInfo": {},
          "HealthProblems": {}
        }
      } else {
        this.formatData(data)
        this.showFile = true
      }
      return data
    },
    formatData(info) {
      for (let key in info) {
        // console.log(`key -- ${key}`)
        const obj = info[key]
        for (let i in obj) {
          if (!obj[i] || obj[i].length === 0) {
            obj[i]= "-"
          } else if (obj[i] instanceof Array && obj[i].length > 0) {
           obj[i] = obj[i].join(' / ')
          }
        }
      }
    },
    clearFileForm() {
      this.fileForm.refuseMsg = null
      this.$refs.fileForm.resetFields()
    },
    stateChange(val) {
      if (val === 2) {
        this.fileForm.refuseMsg = null
      }
    },
    checkFile() {
      this.$refs.fileForm.validate((valid) => {
        if (valid) {
          const state = this.fileForm.state
          const params = {
            "childId": this.childId,
            "state" : this.fileForm.state
          }
          if (state === 3) {
            params.refuseMsg = util.trim(this.fileForm.refuseMsg)
          }
          util.ajax.post('api/ensurance/examineChildDocument', params).then((res) => {
            if (res.data.code === '000') {
              this.checkFileModal = false
              this.$Message.success('操作成功')
              this.getOrderDetail()
              this.$store.state.app.refreshIns199Order = this.id
            } else {
              this.$Message.error(res.data.msg)
            }
          }).catch((err) => {
            console.log(err)
          })
        }
      })
    },
    clickChangeDoc() { // 点击修改医生按钮
      this.clearDoctorList()
      this.changeDialogVisible = true
    },
    // 点清除按钮后置空
    clearDoctorList() {
      this.doctorList = []
      this.docBind.id = null
      this.docChange.doctorTeamId = null
    },
    dealDoctorList(query) {
      this.getDoctor(query)
    },
    docBindChange(val) {
      if (!val && !this.docBind.id) {
        this.$refs.docBindSelect.setQuery(null)
        this.doctorList = []
      }
    },
    docChangeChange(val) {
      if (!val && !this.docChange.doctorTeamId) {
        this.$refs.docChangeSelect.setQuery(null)
        this.doctorList = []
      }
    },
    // 搜索查询医生
    getDoctor(query) {
      query = util.trim(query)
      if (!query || query === '') {
        this.doctorList = []
        this.docBind.id = null
        this.docChange.doctorTeamId = null
        return
      } else if (/^[0-9]+$/.test(query) && query.length < 3) {
        return
      }
      // console.log(`change doctor --- ${query}`)
      this.loading4 = true
      common.searchDoctorOfTeam(query).then((res) => {
        this.loading4 = false
        if (res.data.code === '000' && res.data.data && res.data.data.length !== 0) {
          const data = res.data.data
          data.forEach((item) => {
            item.realname = `${item.realname} - ${item.mobile} - ${item.stationName}`
          })
          this.doctorList = data
        }
      })
    },
    initSwiper() {
      // console.log(`init-swiper --- `)
      let thumbsSwiper = new Swiper('#thumbs',{
        slidesPerView: 4,
        watchSlidesVisibility: true,//防止不可点击
        // navigation: {
        //   nextEl: '.swiper-button-next',
        //   prevEl: '.swiper-button-prev',
        // }
        observer:true, //初始化子元素
        observerParents:true, //初始化父元素
      })
      let gallerySwiper = new Swiper('#gallery',{
        spaceBetween: 10,
        thumbs: {
          swiper: thumbsSwiper,
        },
        observer:true, //初始化子元素
        observerParents:true, //初始化父元素
      })
    },
    clickBookFile(doctorId, doctorName) {
      if(doctorId && doctorId !== '') {
        this.docHasBind = true
        this.bindDoctor = doctorName
        // console.log(`doctor id -- ${params.row.doctorId}`)
        this.bindDoctorId = doctorId
        this.getValidDate(this.bindDoctorId)
      } else {
        this.docHasBind = false
        this.clearDoctorList()
      }
      this.bookDialogVisible = true
    },
    clickPhotoCheck(info) {
      this.orderId = info.orderNo
      this.childName = info.childName
      this.id = info.id
      this.orderPhotos = info.cardImgPath
      if (info.cardImgStatus === 1) {
        this.showPhotoCheckForm = true
      } else {
        this.showPhotoCheckForm = false
      }
      this.photoDialogVisible = true
      this.$nextTick(() => {
        this.initSwiper()
      })
    },
    // 更改医生
    changeDoctor() {
      const doctorTeamId = this.docChange.doctorTeamId
      this.$refs.docChange.validate((validate) => {
        // console.log(`teamid -- ${doctorTeamId}`)
        if(validate) {
         util.ajax.post('api/ensurance/updateUserPackageDoctor199', {
            "id": this.id,
            "doctorId": doctorTeamId
          }).then((res) => {
            if(res.data.code === '000') {
              this.$Message.success('更改成功')
              this.getOrderDetail()
              this.$store.state.app.refreshIns199Order = doctorTeamId+'docChange'
            } else {
              this.$Message.error(res.data.msg)
            }
            this.changeDialogVisible = false
          })
        }
      })
    },
    // 点击更改医生取消按钮
    cancelChangeDoc() {
      this.changeDialogVisible = false
    },
    selectDoctor(id) {
        this.bindDoctorId = id
        this.getValidDate(this.bindDoctorId)
    },
    // 字符串转时间
    getDate(t) {
      t = t.replace(/-/g,"/")
      return new Date(t)
    },
    // 时间转字符串
    dateToStr(date) {
      const y = date.getFullYear()
      let m = date.getMonth() + 1
      m = m > 9 ? m : (`0${m}`)
      let d = date.getDate()
      d = d > 9 ? d : (`0${d}`)
      const str = `${y}-${m}-${d}`
      return str
    },
    // 检查是否显示
    canSelectCheck(date,that) {
        let str = that.dateToStr(date);
        let flag = true;
        that.canSelectDate.forEach(item => {
          if(item === str){
            flag = false;
          }
        })
        return flag;
    },
    // 获取排班日期
    getValidDate(id) {
      util.ajax.post('api/ensurance/queryDoctorScheduling', {
        "doctorId":id,
      }).then((res) => {
        if(res.data.code === '000') {
          // console.log(`validDate -- ${JSON.stringify(res.data.data)}`)
          const data = res.data.data
          const arr = []
          data.forEach((item) => {
            arr.push(item.workDay)
          })
          this.canSelectDate = arr
          // console.log(`select -- ${JSON.stringify(this.canSelectDate)}`)
          const that = this
          const options = {
            disabledDate (date) {
              return that.canSelectCheck(date, that)
            }
          }
          this.dateOptions = options
        }
      })
    },
    // 选择排班日期
    selectWorkDay(day) {
      this.workDay = day
      const param = {
        "doctorId": this.bindDoctorId,
        "workDay": this.workDay
      }
      this.getValidTime(param)
    },
    // 获取可选时间
    getValidTime(param) {
      util.ajax.post('api/ensurance/queryDoctorSchedulingDetails', param)
      .then((res) => {
        if(res.data.code === '000') {
          const time = res.data.data
          // console.log(`valid time -- ${JSON.stringify(time)}`)
          const list = []
          time.forEach((item) => {
            const obj = {}
            obj.id = item.schedulingDetailId
            obj.time = `${item.startTime} - ${item.endTime}`
            if(item.num > 0) {
             obj.disabled = false
            } else {
              obj.disabled = true
            }
            list.push(obj)
          })
          this.validTimeList = list
        }
      })
    },
    // 取消预约建档
    cancelBook() {
      // console.log(`cancel Book`)
      this.bookDialogVisible = false
    },
    // 验证绑定医生
    validateBindDoctor() {
      let v = true
      if (!this.docHasBind) {
        this.$refs.docBind.validate((validate) => {
          // console.log(`validate -- ${validate}`)
          v = validate
        })
      }
      return v
    },
    // 预约建档
    bookConfirm() {
      // console.log(`book confirm`)
      const v = this.validateBindDoctor()
      if(v) {
        this.$refs.timeBook.validate((validate) => {
          if(validate) {
             util.ajax.post('api/ensurance/schedulingByDoctor199', {
              "id": this.id,
              "schedulingDetailId": this.timeBook.timeId
            })
            .then((res) => {
              if(res.data.code === '000') {
                this.$Message.success('预约成功')
                this.getOrderDetail()
              this.$store.state.app.refreshIns199Order = this.id+'bookConfirm'
              } else {
                this.$Message.error(res.data.msg)
              }
              this.bookDialogVisible = false
            })
          }
        })
      }
    },
    // 照片审核状态变化
    photoStateChange(val) {
      if (val === 1 || val === 3) {
        this.checkReasonAlert = false
        this.checkPhotoForm.refuseReason = ''
        this.otherReason = ''
      } else {
        this.checkPhotoForm.refuseReason = '不清晰'
        this.otherReason = ''
      }
    },
    // 原因选择变化
    reasonChange(val) {
      if (val === '不清晰' || val === '不是本人') {
        this.checkReasonAlert = false
        this.otherReason = ''
      }
    },
    // 提交照片审核
    handlePhotoCheck() {
      const state = this.checkPhotoForm.checkState
      let refuseReason = this.checkPhotoForm.refuseReason
      if (refuseReason === '其他') {
        if (state === 2 && (!this.otherReason || util.trim(this.otherReason) === '')) {
          this.checkReasonAlert = true
          return
        }
        refuseReason = this.otherReason
      }
      // console.log(`state -- ${state} == refuseReason -- ${refuseReason}`)
     const params = {
        "childId": this.orderData.childId,
        "cardImgStatus": this.checkPhotoForm.checkState,
        "refuseReason": refuseReason
      }
      // console.log(`check photo --- ${JSON.stringify(params)}`)
      util.ajax.post('api/ensurance/examineChildCardImg199', params)
      .then((res) => {
        if(res.data.code === '000') {
          this.$Message.success('审核成功')
          this.photoDialogVisible = false
          this.getOrderDetail()
          this.$store.state.app.refreshIns199Order = this.id+'photoCheck'
        } else {
          this.$Message.error(res.data.msg)
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    // 建档预约弹框状态改变
    clearBookForm(show) {
      if (!show) {
        if(!this.docHasBind) {
          this.$refs.docBind.resetFields()
          this.clearDoctorList()
        }
        this.$refs.timeBook.resetFields()
      }
    },
    // 修改医生弹框状态改变
    clearDoctorChangeForm(show) {
      if (!show) {
        this.$refs.docChange.resetFields()
        this.clearDoctorList()
      }
    },
    clearPhotoCheckForm(show) {
      if (!show) {
        this.checkPhotoForm.checkState = 1
        this.checkPhotoForm.refuseReason = ''
        this.otherReason = ''
      }
    },
    showOriginImg(imgUrl) {
      this.originUrl = imgUrl
      this.originImgVisible = true
    },
    refund(data) { // 退款确认
      this.refundForm.refundMoney = data.actualPay
      this.refundId = data.orderNo
      this.refundModal = true
    },
    refundModalVisible(val) {
      if (!val) {
          this.refundForm.reason = '已通过其他渠道预约华西医生'
          this.refundForm.refundMoney = ''
      }
    },
    cancel() { // 取消退款
        this.refundModal = false
    },
    handleRefund() { // 操作退款
      util.ajax.post('api/finance/salesOrderRefund', {
          'menuId': this.pageId,
          'orderNo': this.refundId,
          'refundMsg': this.refundForm.reason
      }).then((res) => {
          if (res.data.code === '000') {
              this.$Message.success({
                  content: '申请退款成功',
                  duration: 3
              })
              this.refundModal = false
              this.getOrderDetail()
          } else {
              this.$Message.error({
                  content: res.data.msg,
                  duration: 3
              })
          }
      }).catch()
    },
    // 华西转诊次数恢复
    recoverCount() {
      this.recoverModal = true
    },
    cancelRecover() {
      this.recoverModal = false
    },
    handleRecover() {
      this.loading = true
      util.ajax.post('api/ensurance/getBackHuaxiCount', {
        'packageId': this.orderData.packageId
      }).then((res) => {
        this.loading = false
        if (res.data.code === '000') {
          this.recoverModal = false
          this.$Message.success({
            content: '恢复成功',
            duration: 3
          })
          this.getOrderDetail()
        } else {
          this.$Message.error({
            content: res.data.msg,
            duration: 3
          })
        }
      }).catch()
    }
  },
  watch: {
    $route(){
      // console.log(`route -- ${this.$route.params.id}`)
      this.id = this.$route.params.onnOrderId
    },
    id() {
      this.getOrderDetail()
    }
  }
}
</script>
<style>
.swiper-button-disabled{
  display:none;
}
</style>
<style lang="less" scoped>
.style-of-card {
  background:#fff;
  padding: 0 20px;
  .service-header {
    border: 1px solid #eee;
    background: #fafafa;
    padding: 15px;
    font-weight: 600;
  }
  .service-content {
    border-bottom: 1px solid #eee;
    padding: 15px;
  }
}
.title-of-file {
  font-size: 18px;
  font-weight: bold;
  margin: 10px 0;
  border-bottom: 1px solid #eee;
}
.font-small-gray {
  font-size: 14px; 
  color: #a9a9a9;
}
.font-large-bold {
  font-size: 20px; 
  font-weight: bolder;
  margin: 10px 0px;
}
.change-doctor-head {
  height: 35px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
}
.change-doctor-foot {
  margin-top: 10px;
}
.change-doctor-foot Button {
  margin: 10px;
}
.photo-modal-content {
  width: 460px;
  margin: 0 auto;
  padding-bottom: 10px;
  .swiper-container {
    margin: 0 auto;
    position: relative;
    overflow: hidden;
    list-style: none;
    padding: 0;
    z-index: 1;
    &#gallery {
      .swiper-slide {
        width: 460px;
        height: 400px;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .gallery-tips {
          position: absolute;
          bottom: 0;
          right: 0;
          color: #2d8cf0;
          font-size: 14px;
        }
      }
    }
    &#thumbs {
      margin-top: 10px;
      .swiper-slide {
        width: 90px;
        height: 90px;
        img {
          width:90px;
          height:90px;
        }
      }
    }
  }
}
.check-photo-content {
  border-top: 1px solid #e8eaec;
}
.origin-img-container img {
  width: 100%;
  height: 100%;
}
</style>

