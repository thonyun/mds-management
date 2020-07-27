<template>
  <div>
    <card>
      <p slot="title">
        <Icon type="ios-funnel"/>
        筛选查询
      </p>
      <Form ref="formOrder" :model="formOrder">
        <Row :gutter="32">
          <Col span="8">
            <FormItem label="用户信息:" prop="userId" :label-width="80">
              <Input clearable v-model="formOrder.name" placeholder="请输入用户名称/手机号查询"
                     style="width: 200px"/>
              <!--<Select-->
              <!--style="width: 200px"-->
              <!--v-model="formOrder.userId"-->
              <!--clearable-->
              <!--filterable-->
              <!--remote-->
              <!--placeholder="用户姓名或电话"-->
              <!--not-found-text="无匹配数据"-->
              <!--ref="adultSelect"-->
              <!--:loading="loading1"-->
              <!--@on-clear="clearAdultData"-->
              <!--@on-query-change="dealAdultData"-->
              <!--@on-open-change="adultSelectChange">-->
              <!--<Option v-for="option in adultData" :label="option.userName" :value="option.userId"-->
              <!--:key="option.userId">{{option.userName}}-->
              <!--</Option>-->
              <!--</Select>-->
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="儿童:" prop="childId" :label-width="80">
              <Input clearable v-model="formOrder.childName" placeholder="请输入儿童名称"
                     style="width: 200px"/>
              <!--<Select-->
              <!--style="width: 200px"-->
              <!--v-model="formOrder.childId"-->
              <!--clearable-->
              <!--filterable-->
              <!--remote-->
              <!--placeholder="儿童姓名"-->
              <!--not-found-text="无匹配数据"-->
              <!--ref="childSelect"-->
              <!--:loading="loading2"-->
              <!--@on-clear="clearChildData"-->
              <!--@on-query-change="dealChildData"-->
              <!--@on-open-change="childSelectChange">-->
              <!--<Option v-for="option in childData" :label="option.childName" :value="option.childId"-->
              <!--:key="option.childId">{{option.childName}}-->
              <!--</Option>-->
              <!--</Select>-->
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="医生:" prop="doctorId" :label-width="80">
              <Input clearable v-model="formOrder.doctorName" placeholder="请输入医生名称"
                     style="width: 200px"/>
              <!--<Select-->
              <!--v-model="formOrder.doctorId"-->
              <!--style="width: 200px"-->
              <!--clearable-->
              <!--filterable-->
              <!--remote-->
              <!--placeholder="医生姓名或电话"-->
              <!--not-found-text="无匹配数据"-->
              <!--ref="docSelect"-->
              <!--:loading="loading3"-->
              <!--@on-clear="clearDoctorData"-->
              <!--@on-query-change="dealDoctorData"-->
              <!--@on-open-change="docSelectChange">-->
              <!--<Option v-for="option in doctorData" :label="option.realname" :value="option.id" :key="option.id">-->
              <!--{{option.realname}}-->
              <!--</Option>-->
              <!--</Select>-->
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="32">
          <Col span="8">
            <FormItem label="档案状态:" prop="fileStates" :label-width="80">
              <Select
                clearable
                v-model="formOrder.fileStates"
                style="width:200px"
                @on-clear="clearFileStatus">
                <Option v-for="item in fileStatus" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="保险状态:" prop="states" :label-width="80">
              <Select
                clearable
                v-model="formOrder.states"
                style="width:200px"
                @on-clear="clearOrderStatus">
                <Option v-for="item in orderStatus" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="订单编号:" prop="orderId" :label-width="80">
              <Input clearable @on-change="clearOrderId" v-model="formOrder.orderId" placeholder="请输入保险单号"
                     style="width: 200px"/>
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="32">
          <Col span="8">
            <FormItem label="购买日期:" :label-width="80">
              <DatePicker v-model="formOrder.dateRange" clearable @on-clear="clearDateData" @on-change="dateChange"
                          type="daterange" placeholder="选择日期" style="width: 200px"></DatePicker>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="照片状态:" prop="photoStates" :label-width="80">
              <CheckboxGroup v-model="formOrder.photoStates" @on-change="statusChange">
                <Checkbox label="0">照片未提交</Checkbox>
                <Checkbox label="1">待审核</Checkbox>
                <Checkbox label="3">通过</Checkbox>
                <Checkbox label="2">拒绝</Checkbox>
              </CheckboxGroup>
            </FormItem>
          </Col>
        </Row>
      </Form>
      <Row type="flex" justify="center" style="margin-bottom: 20px;">
        <Button type="primary" @click="handleSearch" style="margin-right: 20px;">查询</Button>
        <Button @click="resetData" style="margin-right: 20px;">重置</Button>
        <Button type="primary" @click="handlerExport">导出</Button>
      </Row>
    </card>
    <card style="margin-top: 20px;">
      <p slot="title">
        <Icon type="md-list"/>
        199保险用户
      </p>
      <Row>
        <Table ref="orderTable" :loading="loading" :columns="tableColumns" :data="tableData" style="width: 100%;">
          <template slot="action" slot-scope="props">
            <Row type="flex" justify="center">
              <Col v-if="props.limit.canChangeDoc">
                <div :class="props.limit.changeDocClass" @click="clickChangeDoc(props.row.id)">修改医生</div>
              </Col>
              <Col v-if="props.limit.canBook">
                <div :class="props.limit.bookFileClass"
                     @click="clickBookFile(props.row.id, props.row.doctorId, props.row.doctorName)">建档预约
                </div>
              </Col>
              <Col v-if="props.limit.canShowPhoto && props.limit.canClickPhoto">
                <div :class="props.limit.photoCheckClass" @click="clickPhotoCheck(props.row)">
                  {{props.limit.photoShowMsg}}
                </div>
              </Col>
              <Col v-if="props.limit.canShowPhoto && !props.limit.canClickPhoto">
                <div :class="props.limit.photoNotCheckClass">{{props.limit.photoShowMsg}}</div>
              </Col>
              <Col>
                <div class="font-blue" @click="clickFileCheck(props.row.id)">查看</div>
              </Col>
            </Row>
          </template>
        </Table>
      </Row>
      <Row type="flex" justify="space-between" style="margin-top: 20px;">
        <Col>
          <div>共{{total}}条记录 第{{pageNo}}/{{Math.ceil(total / pageSize) === 0 ? 1 : Math.ceil(total / pageSize)}}页</div>
        </Col>
        <Col>
          <Page
            :total="total"
            :page-size='pageSize'
            :current='pageNo'
            size="small"
            show-sizer
            show-elevator
            @on-change="changePageNo"
            @on-page-size-change="changePageSize"
          />
        </Col>
      </Row>
    </card>
    <Modal
      v-model="bookDialogVisible"
      :closable="false"
      @on-visible-change="clearBookForm"
      footer-hide
      width="440"
    >
      <Row class="change-doctor-head">
        <Icon type="ios-alert" style="color: #f8ac30; font-size: 26px;"/>
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
              <Option v-for="option in doctorList" :label="option.realname" :value="option.id" :key="option.id">
                {{option.realname}}
              </Option>
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
              <Option v-for="item in validTimeList" :disabled="item.disabled" :value="item.id" :key="item.id">
                {{item.time}}
              </Option>
            </Select>
          </FormItem>
        </Row>
      </Form>
      <Row class="change-doctor-foot" type="flex" justify="end">
        <Button @click="cancelBook">取消</Button>
        <Button type="primary" @click="bookConfirm">确定</Button>
      </Row>
    </Modal>
    <Modal
      v-model="changeDialogVisible"
      :closable="false"
      @on-visible-change="clearDoctorChangeForm"
      footer-hide
      width="440">
      <Row class="change-doctor-head">
        <Icon type="ios-alert" style="color: #f8ac30; font-size: 26px;"/>
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
              <Option v-for="option in doctorList" :label="option.realname" :value="option.id" :key="option.id">
                {{option.realname}}
              </Option>
            </Select>
          </FormItem>
        </Row>
      </Form>
      <Row class="change-doctor-foot" type="flex" justify="end">
        <Button @click="cancelChangeDoc">取消</Button>
        <Button type="primary" @click="changeDoctor">确定</Button>
      </Row>
    </Modal>
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
            <div class="swiper-slide" v-for="(imgUrl, index) in orderPhotos" :key="index"
                 @click="showOriginImg(imgUrl)">
              <img :src="imgUrl"/>
              <div class="gallery-tips">
                <Icon type="ios-add-circle-outline"/>
                点击查看原图
              </div>
            </div>
          </div>
        </div>
        <div class="swiper-container" id="thumbs">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(imgUrl, index) in orderPhotos" :key="index">
              <img :src="imgUrl"/>
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
                  <Row>
                    <Radio label="不清晰">不清晰</Radio>
                  </Row>
                  <Row>
                    <Radio label="不是本人">不是本人</Radio>
                  </Row>
                  <Row>
                    <Radio label="其他">其他</Radio>
                    <Input class="input-line" v-model="otherReason" placeholder="请输入拒绝原因"
                           @on-focus="checkReasonAlert = false" clearable/>
                    <Alert style="margin-top: 8px;" v-show="checkReasonAlert === true" type="error" show-icon>必须输入拒绝原因
                    </Alert>
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
    <Modal
      :styles="{top: '50px'}"
      v-model="originImgVisible"
      :mask-closable="false"
      footer-hide>
      <P slot="header">原图</P>
      <div class="origin-img-container">
        <img :src="originUrl"/>
      </div>
    </Modal>
  </div>
</template>
<script>
	import util from './../../../libs/util.js'
	import {common} from './../../../libs/common.js'
	import session from './../../../libs/session.js'
	import Swiper from 'swiper'
	import 'swiper/dist/css/swiper.min.css'
	import baseUtil from './../../../libs/util.js';
	
	export default {
		name: 'onn-order',
		data() {
			return {
				pageSize: 10,
				pageNo: 1,
				total: 0,
				loading: false,
				loading1: false,
				loading2: false,
				loading3: false,
				loading4: false,
				bookDialogVisible: false,
				changeDialogVisible: false,
				photoDialogVisible: false,
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
				// 查询表单数据
				formOrder: {
					name: null,
					childName: null,
					doctorName: null,
					userId: null,
					childId: null,
					doctorId: null,
					dateRange: null, // 重置使用
					startTime: null,
					endTime: null,
					states: null,
					fileStates: null,
					photoStates: [],
					orderId: null
				},
				fileStatus: [
					{
						value: '-1',
						label: '待预约建档'
					},
					{
						value: '0',
						label: '已预约建档'
					},
					{
						value: '1',
						label: '档案待审核'
					},
					{
						value: '2',
						label: '审核通过'
					},
					{
						value: '3',
						label: '审核被拒'
					}
				],
				orderStatus: [
					{
						value: '0',
						label: '失效'
					},
					{
						value: '1',
						label: '生效'
					},
					{
						value: '2',
						label: '用户已提交'
					},
					{
						value: '3',
						label: '已提交保险'
					},
					{
						value: '4',
						label: '已成功激活'
					},
					{
						value: '5',
						label: '保险激活失败'
					}
				],
				// 成人数据
				adultData: [],
				// 儿童数据
				childData: [],
				// 医生数据
				doctorData: [],
				// 绑定医生表单数据
				docBind: {
					id: ''
				},
				// 绑定医生验证规则
				docBindRule: {
					id: [{required: true, type: 'number', message: '请选择医生', trigger: 'change'}]
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
				bindDoctorId: '',
				// 订单id
				id: '',
				// 审核照片孩子id
				childId: '',
				// 订单号
				orderId: '',
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
					doctorTeamId: [{required: true, type: 'number', message: '请选择医生', trigger: 'change'}]
				},
				// 医生列表
				doctorList: [],
				// 列表列数据
				tableColumns: [
					{
						title: 'ID',
						key: 'id',
						minWidth: 80,
						fixed: 'left',
						align: 'center',
						className: 'table-blue',
						render: (h, params) => {
							return h('span', {
								on: {
									click: () => {
										// console.log(`ID --- ${params.row.id}`)
										this.$router.push({
											path: `onn-order-detail/${params.row.id}/${this.$store.state.app.currentPageId}`
										})
									}
								}
							}, params.row.id)
						}
					},
					{
						title: '成人用户',
						key: 'userName',
						minWidth: 100,
						align: 'center'
					},
					{
						title: '是否新199',
						key: 'goodsId',
						minWidth: 100,
						align: 'center',
						render: (h, params) => {
							if (params.row.goodsId === 4) {
								return h('span', {}, '老')
							}
							if (params.row.goodsId === 17) {
								return h('span', {}, '新')
							}
						}
					},
					{
						title: '儿童',
						key: 'childName',
						minWidth: 100,
						align: 'center'
					},
					{
						title: '用户电话',
						key: 'mobile',
						minWidth: 150,
						align: 'center'
					},
					{
						title: '档案状态',
						key: 'buildStatus',
						align: 'center',
						minWidth: 150,
						render: (h, params) => {
							const state = params.row.buildStatus
							let colorArr = ['#D2691E', '#6aa5df', '#19be6b', '#dc143c', '#a9a9a9'];
							if (state === -1 || state === 1) {
								return h('div', {
									style: {
										width: '90px',
										display: 'inline-block',
										background: colorArr[0],
										color: '#fff',
										padding: '0 3px'
									}
								}, params.row.buildStateName)
							} else if (state === 0) {
								return h('div', {
									style: {
										width: '90px',
										display: 'inline-block',
										background: colorArr[1],
										color: '#fff',
										padding: '0 3px'
									}
								}, params.row.buildStateName)
							} else if (state === 2) {
								return h('div', {
									style: {
										width: '90px',
										display: 'inline-block',
										background: colorArr[2],
										color: '#fff',
										padding: '0 3px'
									}
								}, params.row.buildStateName)
							} else if (state === 3) {
								return h('div', {
									style: {
										width: '90px',
										display: 'inline-block',
										background: colorArr[3],
										color: '#fff',
										padding: '0 3px'
									}
								}, params.row.buildStateName)
							}
						}
					},
					{
						title: '保险状态',
						key: 'status199Name',
						align: 'center',
						minWidth: 150,
						render: (h, params) => {
							const state = params.row.status199
							let colorArr = ['#D2691E', '#6aa5df', '#19be6b', '#dc143c', '#a9a9a9'];
							if (state === 1) {
								return h('div', {
									style: {
										width: '90px',
										display: 'inline-block',
										background: colorArr[2],
										color: '#fff',
										padding: '0 3px'
									}
								}, params.row.status199Name)
							} else if (state === 2) {
								return h('div', {
									style: {
										width: '90px',
										display: 'inline-block',
										background: colorArr[0],
										color: '#fff',
										padding: '0 3px'
									}
								}, params.row.status199Name)
							} else if (state === 3 || state === 4) {
								return h('div', {
									style: {
										width: '90px',
										display: 'inline-block',
										background: colorArr[1],
										color: '#fff',
										padding: '0 3px'
									}
								}, params.row.status199Name)
							} else if (state === 5) {
								return h('div', {
									style: {
										width: '90px',
										display: 'inline-block',
										background: colorArr[3],
										color: '#fff',
										padding: '0 3px'
									}
								}, params.row.status199Name)
							} else {
								return h('div', {
									style: {
										width: '90px',
										display: 'inline-block',
										background: colorArr[4],
										color: '#fff',
										padding: '0 3px'
									}
								}, params.row.status199Name)
							}
						}
					},
					{
						title: '绑定医生',
						key: 'doctorName',
						minWidth: 100,
						align: 'center',
						render: (h, params) => {
							let name = params.row.doctorName
							name = name === '' ? '-' : name
							return h('span', {
								style: {
									// color: '#6aa5df'
								}
							}, name)
						}
					},
					{
						title: '购买日期',
						key: 'createdAt',
						align: 'center',
						minWidth: 150
					},
					{
						title: '操作',
						key: 'state',
						align: 'center',
						fixed: 'right',
						width: 240,
						render: (h, params) => {
							const photoMsg = ['照片未提交', '照片审核', '照片审核拒绝', '照片审核通过']
							let limit = {
								'canChangeDoc': false,
								'canBook': false,
								'canShowPhoto': false
							}
							// 只要绑定医生就可以修改医生
							if (params.row.doctorId && params.row.doctorId !== '') {
								limit.canChangeDoc = true
							}
							limit.photoShowMsg = ''
							if (params.row.buildStatus === -1) {
								limit.canBook = true
							}
							limit.canShowPhoto = true
							const photoState = params.row.cardImgStatus
							if (photoState === 0) {
								limit.canClickPhoto = false
								limit.photoShowMsg = photoMsg[photoState]
							} else {
								limit.canClickPhoto = true
								limit.photoShowMsg = photoMsg[photoState]
							}
							// // 绑定医生才显示照片审核
							// if (photoState === 1 && (!params.row.doctorId || params.row.doctorId === '')) {
							//   limit.canShowPhoto = false
							// }
							// console.log(limit.canBook && (limit.canShowPhoto || limit.canCheckFile))
							limit.changeDocClass = {
								'font-blue': true,
								'line-style': limit.canChangeDoc
							}
							limit.bookFileClass = {
								'font-blue': true,
								'line-style': limit.canBook
							}
							limit.photoCheckClass = {
								'font-blue': true,
								'line-style': limit.canShowPhoto
							}
							limit.photoNotCheckClass = {
								'font-gray': true,
								'line-style': limit.canShowPhoto
							}
							return this.$refs.orderTable.$scopedSlots.action({row: params.row, limit: limit})
						}
					}
				],
				tableData: []
			}
		},
		created() {
			this.getOrderData()
		},
		mounted() {
		},
		computed: {
			// 若详情页档案审核状态改变，则刷新列表页
			refreshList() {
				return this.$store.state.app.refreshIns199Order
			}
		},
		watch: {
			refreshList(newVal, oldVal) {
				this.searchAccess()
			}
		},
		methods: {
			handlerExport(){
				let url = baseUtil.ajax.defaults.baseURL +'api/ensurance/userPackage199Excel'+'?' + 'TOKEN=' + this.$token
				this.$lodash.forOwn(this.formOrder, (v, k) => {
					if (k != 'dateRange'&&v!=null&&v.length!=0) {
						url += '&' + k + '=' + v
					}
				})
				window.location.href = url
      },
			clearForm() {
				this.formOrder.userId = null
				this.formOrder.childId = null
				this.formOrder.doctorId = null
				this.formOrder.dateRange = null
				this.formOrder.startTime = null
				this.formOrder.endTime = null
				this.formOrder.states = null
				this.formOrder.fileStates = null
				this.formOrder.photoStates = []
				this.formOrder.orderId = null
				this.formOrder.name = null
				this.formOrder.childName = null
				this.formOrder.doctorName = null
				this.adultData = []
				this.childData = []
				this.doctorData = []
				this.pageSize = 10
				this.pageNo = 1
			},
			resetData() {
				this.clearForm()
				this.getOrderData()
			},
			// 获取订单列表数据
			getOrderData(paramData) {
				this.loading = true
				let param = paramData ? paramData : {
					"pageSize": this.pageSize,
					"pageNo": this.pageNo
				}
				util.ajax.post('api/ensurance/queryUserPackage199', param).then((res) => {
					this.loading = false
					if (res.data.code && res.data.code === '000') {
						const data = res.data.data
						this.tableData = data.list
						this.total = data.total
					}
				})
			},
			initSwiper() {
				// console.log(`init-swiper --- `)
				let thumbsSwiper = new Swiper('#thumbs', {
					slidesPerView: 4,
					watchSlidesVisibility: true,//防止不可点击
					// navigation: {
					//   nextEl: '.swiper-button-next',
					//   prevEl: '.swiper-button-prev',
					// }
					observer: true, //初始化子元素
					observerParents: true, //初始化父元素
				})
				let gallerySwiper = new Swiper('#gallery', {
					spaceBetween: 10,
					thumbs: {
						swiper: thumbsSwiper,
					},
					observer: true, //初始化子元素
					observerParents: true, //初始化父元素
				})
			},
			// 点清除按钮后置空
			clearAdultData() {
				this.adultData = []
				this.formOrder.userId = null
				this.handleSearch()
			},
			dealAdultData(query) {
				this.searchAdult(query)
			},
			adultSelectChange(val) {
				if (!val && !this.formOrder.userId) {
					this.$refs.adultSelect.setQuery(null)
					this.adultData = []
				}
			},
			// 用户模糊查询
			searchAdult(query) {
				query = util.trim(query)
				if (!query || query === '') {
					this.adultData = []
					this.formOrder.userId = null
					return
				} else if (/^[0-9]+$/.test(query) && query.length < 3) {
					return
				}
				// console.log(`search adult --- ${query}`)
				this.loading1 = true
				common.searchWxAdult(query).then((res) => {
					this.loading1 = false
					if (res.data.code === '000' && res.data.data && res.data.data.length !== 0) {
						const data = res.data.data
						data.forEach((item) => {
							item.userName = item.mobile === '' ? item.userName : `${item.userName} - ${item.mobile}`
						})
						this.adultData = data
					}
				})
			},
			// 点清除按钮后置空
			clearChildData() {
				this.childData = []
				this.formOrder.childId = null
				this.handleSearch()
			},
			dealChildData(query) {
				this.searchChild(query)
			},
			childSelectChange(val) { // 模糊匹配下拉框收起
				if (!val && !this.formOrder.childId) {
					this.$refs.childSelect.setQuery(null)
					this.childData = []
				}
			},
			// 儿童模糊查询
			searchChild(query) {
				query = util.trim(query)
				if (!query || query === '') {
					this.childData = []
					this.formOrder.childId = null
					return
				}
				// console.log(`search child --- ${query}`);
				this.loading2 = true
				common.searchWxChild(query).then((res) => {
					this.loading2 = false
					if (res.data.code === '000' && res.data.data && res.data.data.length !== 0) {
						const data = res.data.data
						data.forEach((item) => {
							item.childName = item.childName
						})
						this.childData = data
					}
				})
			},
			// 点清除按钮后置空
			clearDoctorData() {
				this.doctorData = []
				this.formOrder.doctorId = null
				// 刷新页面
				this.handleSearch()
			},
			dealDoctorData(query) {
				this.searchDoctor(query)
			},
			docSelectChange(val) { // 模糊匹配下拉框收起
				if (!val && !this.formOrder.doctorId) {
					this.$refs.docSelect.setQuery(null)
					this.doctorData = []
				}
			},
			// 医生模糊查询
			searchDoctor(query) {
				return new Promise((resolve) => {
					query = util.trim(query)
					if (!query || query === '') {
						this.doctorData = []
						this.formOrder.doctorId = null
						return
					} else if (/^[0-9]+$/.test(query) && query.length < 3) {
						return
					}
					// console.log(`search doctor --- ${query}`)
					this.loading3 = true
					common.searchDoctor(query).then((res) => {
						this.loading3 = false
						if (res.data.code === '000' && res.data.data && res.data.data.length !== 0) {
							const data = res.data.data
							data.forEach((item) => {
								item.realname = `${item.realname} - ${item.mobile} - ${item.stationName}`
							})
							this.doctorData = data
							resolve()
						}
					})
				})
			},
			// 清空保险单号
			clearOrderId(event) {
				// console.log(`event --- ${JSON.stringify(event)}`)
				if (event.target && event.target.value === "") {
					this.handleSearch()
				}
			},
			// 日期清空处理
			clearDateData() {
				this.formOrder.startTime = ''
				this.formOrder.endTime = ''
				this.handleSearch()
			},
			//  日期选择
			dateChange(value) {
				this.formOrder.startTime = value[0] ? `${value[0]} 00:00:00` : ''
				this.formOrder.endTime = value[1] ? `${value[1]} 23:59:59` : ''
			},
			// 照片审核状态清空处理
			statusChange(arr) {
				// console.log(`1032 status --- ${arr.length}`)
				if (arr.length === 0) {
					this.handleSearch()
				}
			},
			// 清空档案状态
			clearFileStatus() {
				this.formOrder.fileStates = null
				this.handleSearch()
			},
			// 清空订单状态
			clearOrderStatus() {
				this.formOrder.states = null
				this.handleSearch()
			},
			// 根据条件查询
			searchAccess() {
				const paramData = {
					"userId": this.formOrder.userId,
					"childId": this.formOrder.childId,
					"doctorId": this.formOrder.doctorId,
					"startTime": this.formOrder.startTime,
					"endTime": this.formOrder.endTime,
					"status199": this.formOrder.states,
					"buildStatus": this.formOrder.fileStates,
					"cardImgStatus": this.formOrder.photoStates ? this.formOrder.photoStates.join(',') : null,
					"orderNo": this.formOrder.orderId ? util.trim(this.formOrder.orderId) : null,
					"pageSize": this.pageSize,
					"pageNo": this.pageNo,
					"name": this.formOrder.name,
					"childName": this.formOrder.childName,
					"doctorName": this.formOrder.doctorName,
				}
				for (let i in paramData) {
					if (!paramData[i]) {
						delete paramData[i]
					}
				}
				this.getOrderData(paramData)
			},
			// 查询按钮
			handleSearch() {
				this.pageNo = 1
				this.searchAccess()
			},
			clickChangeDoc(id) {
				this.id = id
				this.clearDoctorList()
				this.changeDialogVisible = true
			},
			clickBookFile(id, doctorId, doctorName) {
				this.id = id
				if (doctorId && doctorId !== '') {
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
				this.childName = info.childName
				this.orderId = info.orderNo
				this.childId = info.childId
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
			clickFileCheck(id) {
				// console.log(`id -- ${id}`)
				this.$router.push({
					path: `onn-order-detail/${id}/${this.$store.state.app.currentPageId}`
				})
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
			// 跳转到某一页
			changePageNo(index) {
				this.pageNo = index
				this.searchAccess()
			},
			// 更改每一页显示的订单数
			changePageSize(num) {
				this.pageSize = num
				this.searchAccess()
			},
			// 更改医生
			changeDoctor() {
				const doctorTeamId = this.docChange.doctorTeamId
				this.$refs.docChange.validate((validate) => {
					// console.log(`teamid -- ${doctorTeamId}`)
					if (validate) {
						util.ajax.post('api/ensurance/updateUserPackageDoctor199', {
							"id": this.id,
							"doctorId": doctorTeamId
						}).then((res) => {
							if (res.data.code === '000') {
								this.$Message.success('更改成功')
								this.searchAccess()
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
				if (id) {
					this.bindDoctorId = id
					this.getValidDate(this.bindDoctorId)
				}
			},
			// 字符串转时间
			getDate(t) {
				t = t.replace(/-/g, "/")
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
			canSelectCheck(date, that) {
				let str = that.dateToStr(date);
				let flag = true;
				that.canSelectDate.forEach(item => {
					if (item === str) {
						flag = false;
					}
				})
				return flag;
			},
			// 获取排班日期
			getValidDate(id) {
				util.ajax.post('api/ensurance/queryDoctorScheduling', {
					"doctorId": id,
				}).then((res) => {
					if (res.data.code === '000') {
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
							disabledDate(date) {
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
						if (res.data.code === '000') {
							const time = res.data.data
							// console.log(`valid time -- ${JSON.stringify(time)}`)
							const list = []
							time.forEach((item) => {
								const obj = {}
								obj.id = item.schedulingDetailId
								obj.time = `${item.startTime} - ${item.endTime}`
								if (item.num > 0) {
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
				if (v) {
					this.$refs.timeBook.validate((validate) => {
						if (validate) {
							util.ajax.post('api/ensurance/schedulingByDoctor199', {
									"id": this.id,
									"schedulingDetailId": this.timeBook.timeId
								})
								.then((res) => {
									if (res.data.code === '000') {
										this.$Message.success('预约成功')
										this.searchAccess()
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
					"childId": this.childId,
					"cardImgStatus": this.checkPhotoForm.checkState,
					"refuseReason": refuseReason
				}
				// console.log(`check photo --- ${JSON.stringify(params)}`)
				util.ajax.post('api/ensurance/examineChildCardImg199', params)
					.then((res) => {
						if (res.data.code === '000') {
							this.$Message.success('审核成功')
							this.photoDialogVisible = false
							this.searchAccess()
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
					if (!this.docHasBind) {
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
			}
		}
	}
</script>
<style>
  .ivu-table td.table-blue {
    color: #6aa5df;
    cursor: pointer;
  }
  
  .input-line.ivu-input-wrapper {
    width: auto;
  }
  
  .input-line .ivu-input {
    border-width: 0px;
    border-radius: 0px;
    border-bottom: 1px solid black;
  }
  
  .swiper-button-disabled {
    display: none;
  }
</style>
<style lang="less" scoped>
  .font-blue {
    color: #6aa5df;
    cursor: pointer;
    padding: 0 5px;
  }
  
  .line-style {
    border-right: 1px solid #6aa5df;
  }
  
  .font-gray {
    color: #a9a9a9;
    padding: 0 5px;
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
            width: 90px;
            height: 90px;
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

