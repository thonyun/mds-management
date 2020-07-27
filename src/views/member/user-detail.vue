<style lang="less">
@import '../../styles/common.less';
@import '../finance/finace.less';
</style>
<template>
  <div>
    <Modal v-model="modal.visit"
           title="用户保险理赔照照片"
           :mask-closable="false"
           @on-cancel="resetForm">
      <Form ref="modal"
            :model="modal.form"
            :label-width="85"
            style="margin:0 auto;">
        <FormItem label="被保人姓名：">
          {{modal.form.childName}}
        </FormItem>
        <FormItem label="理赔照片：">
          <span>可上传多张照片，点击可查看大图</span>
          <upload-img @changeImgList="getImgList"
                      :maxSize="10240"
                      :imgList="modal.form.cardImgPath"></upload-img>
        </FormItem>
      </Form>
      <Row slot="footer"
           type="flex"
           justify="center">
        <Button @click="handleCancel">取消</Button>
        <Button :loading="modal.loading"
                type="primary"
                @click="handleSubmit">
          <span v-if="!modal.loading">提交</span>
          <span v-else>处理中</span>
        </Button>
      </Row>
    </Modal>
    <Modal v-model="frozenModal.visit"
           :mask-closable="false"
           title=""
           @on-visible-change="frozenModalVisitChange">
      <Form ref="frozenForm"
            class="margin-top-20"
            :model="frozenModal.form"
            :rules="frozenModal.rule">
        <FormItem prop="freezeReason"
                  style="margin-bottom: 10px">
          <Input type="textarea"
                 v-model="frozenModal.form.freezeReason"
                 placeholder="请输入冻结原因（100字内）" />
        </FormItem>
      </Form>
      <Row slot="footer"
           type="flex"
           justify="center">
        <Button @click="handleFreezeReasonCancel">取消</Button>
        <Button :loading="frozenModal.loading"
                type="primary"
                @click="handleFreezeReasonOnOk">
          <span v-if="!frozenModal.loading">冻结</span>
          <span v-else>处理中</span>
        </Button>
      </Row>
    </Modal>
    <Card dis-hover>
      <p slot="title">基础信息</p>
      <a href="#"
         slot="extra"
         v-if="!basicsForm.visit"
         @click.prevent="handleEditBasics">
        编辑
      </a>
      <template v-else>
        <a href="#"
           class="c-gray"
           slot="extra"
           @click.prevent="handleEditBasicsCancel">
          取消
        </a>
        <a href="#"
           slot="extra"
           @click.prevent="handleEditBasicsSubmit">
          保存
        </a>
      </template>
      <Form v-if="basicsForm.visit"
            ref="basicsForm"
            :model="basicsForm.model"
            :rules="basicsForm.rule"
            label-position="left">
        <Row>
          <Col :span="8">
          <FormItem label="USERID：">
            {{basicsForm.model.userId}}
          </FormItem>
          </Col>
          <Col :span="8">
          <FormItem label="昵称/姓名："
                    prop="realname">
            <Input type="text"
                   v-model="basicsForm.model.name"
                   style="width: 200px">
            </Input>
          </FormItem>
          </Col>
          <Col :span="8">
          <FormItem label="注册手机号：">
            {{detailDate.mobile}}
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col :span="8">
          <FormItem label="证件类型："
                    prop="cardType">
            <Select v-model="basicsForm.model.cardType"
                    style="width: 200px"
                    clearable>
              <Option v-for="(item,index) in basicsForm.selectList"
                      :key="index"
                      :value="item.value">{{item.label}}
              </Option>
            </Select>
          </FormItem>
          </Col>
          <Col :span="8">
          <FormItem label="证件号码："
                    prop="idcard">
            <Input type="text"
                   v-model="basicsForm.model.cardNo"
                   @on-focus="cardNoFocus"
                   @on-blur="autoEdit"
                   style="width: 200px" />
          </FormItem>
          </Col>
          <Col :span="8">
          <FormItem label="性别："
                    prop="gender">
            <RadioGroup v-model="basicsForm.model.gender">
              <Radio :label="1">男</Radio>
              <Radio :label="2">女</Radio>
            </RadioGroup>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col :span="8">
          <FormItem label="出生日期："
                    prop="birth">
            <DatePicker format="yyyy-MM-dd"
                        :value="basicsForm.model.birth"
                        @on-change="birthChange"
                        type="date"
                        placement="bottom-end"></DatePicker>
          </FormItem>
          </Col>
        </Row>
      </Form>
      <template v-else>
        <Row>
          <Col :span="8"
               class="">
          <span>USERID：</span>
          <span>{{detailDate.id}}</span>
          </Col>
          <Col :span="8"
               class="">
          <span>昵称/姓名：</span>
          <span>{{detailDate.username}}</span>
          </Col>
          <Col :span="8"
               class="">
          <span>注册手机号：</span>
          <span>{{detailDate.mobile}}</span>
          </Col>
        </Row>
        <Row>
          <Col :span="8"
               class="">
          <span>证件类型：</span>
          <span>{{detailDate.cardTypeDesc}}</span>
          </Col>
          <Col :span="8"
               class="">
          <span>证件号码：</span>
          <span>{{detailDate.idcardsn}}</span>
          </Col>
          <Col :span="8"
               class="">
          <span>性别：</span>
          <span>{{detailDate.genderDesc}}</span>
          </Col>
        </Row>
        <Row>
          <Col :span="8"
               class="">
          <span>出生日期：</span>
          <span>{{detailDate.birth}}</span>
          </Col>
          <Col :span="8"
               class="">
          <span>会员等级：</span>
          <span>{{detailDate.levelDesc}}</span>
          </Col>
          <Col :span="8"
               class="">
          <span>成长值：</span>
          <span @click="handleGoToScore"
                class="pointer c-blue"
                v-if="detailDate.score>0">{{detailDate.score}}</span>
          <span v-else>{{detailDate.score}}</span>
          </Col>
        </Row>
      </template>
    </Card>
    <Card class="margin-top-20"
          dis-hover>
      <p slot="title">账户信息</p>
      <a href="#"
         slot="extra"
         @click.prevent="handleGoWaste">
        账户流水
      </a>
      <a href="#"
         v-if="detailDate.status==1"
         class="c-red"
         slot="extra"
         @click.prevent="handleChangeStatus(2)">
        账户冻结
      </a>
      <a href="#"
         v-else-if="detailDate.status==2"
         slot="extra"
         @click.prevent="handleChangeStatus(1)">
        解除冻结
      </a>
      <Row>
        <Col :span="8"
             class="">
        <span>账户余额：</span>
        <span>¥ {{detailDate.balance}}</span>
        </Col>
        <Col :span="8"
             class="">
        <span>账户本金：</span>
        <span>¥ {{detailDate.capital}}</span>
        </Col>
        <Col :span="8"
             class="">
        <span>返利金额：</span>
        <span>¥ {{detailDate.virMoney}}</span>
        </Col>
      </Row>
      <Row>
        <Col :span="8"
             class="">
        <span>账户状态：</span>
        <span v-if="detailDate.status!=2">{{detailDate.statusDesc}}</span>
        <span v-else
              class="c-red">{{detailDate.statusDesc}}</span>
        </Col>
        <Col :span="8"
             class="">
        <span>妈星币：</span>
        <span @click="goToMxbList()"
              class="pointer c-blue"
              v-if="detailDate.mxbCnt>0">{{detailDate.mxbCnt}}</span>
        <span v-else>{{detailDate.mxbCnt}}</span>
        </Col>
      </Row>
    </Card>
    <child-info class="margin-top-20"
                ref="childInfo"
                :selectList="basicsForm.childSelectList"
                v-for="(item,index) in childList"
                @ChildImgDate="getChildImgDate"
                :childInfoDate="item"
                :userId="userId"
                :key="index"
                :index="index"></child-info>
    <Card class="margin-top-20"
          dis-hover
          v-if="addressList.length!=0">
      <p slot="title">收货信息</p>
      <Row v-for="(item,index) in addressList"
           :key="index"
           :class="{bb:index!=0}"
           style="border-bottom: 1px solid gray;padding-bottom: 10px">
        <Col :span="8">
        <span>收货人姓名：</span>
        <span>{{item.name}}</span>
        </Col>
        <Col :span="8">
        <span>收货地址：</span>
        <span>{{item.address}}</span>
        </Col>
        <Col :span="8">
        <span>联系电话：</span>
        <span>{{item.mobile}}</span>
        </Col>
      </Row>
    </Card>
  </div>
</template>

<script>
	import util from './../../libs/util.js'
	import UploadImg from "../components/upload-img";
	import utility from '../../mixin/utility'
	import ChildInfo from "./component/child-info";
	
	export default {
		components: {ChildInfo, UploadImg},
		mixins: [utility],
		data() {
			const validatorFreezeReason = (rule, value, callback) => {
				if (this.isEmpty(this.frozenModal.form.freezeReason.trim())) {
					callback(new Error('冻结原因不能为空'))
					return
				}
				if (this.frozenModal.form.freezeReason.length > 100) {
					callback(new Error('冻结原因最多100字'))
					return
				}
				callback()
			}
			const validatorRealname = (rule, value, callback) => {
				if (this.isEmpty(this.basicsForm.model.name)) {
					callback(new Error('姓名不能为空'))
					return
				}
				if (this.basicsForm.model.name.length > 10) {
					callback(new Error('姓名不能超过10个字'))
					return
				}
				callback()
			}
			const validatorCardType = (rule, value, callback) => {
				if (this.isEmpty(this.basicsForm.model.cardType)) {
					callback(new Error('证件类型不能为空'))
					return
				}
				if (this.basicsForm.model.cardType == -1) {
					callback(new Error('证件类型不能为空'))
					return
				}
				callback()
			}
			const validatorIdcard = (rule, value, callback) => {
				if (this.basicsForm.model.cardType == 1 && (!this.isEmpty(this.basicsForm.model.cardNo)) && !this.checkIdCard(this.basicsForm.model.cardNo)) {
					callback(new Error('请输入正确的身份证号'))
					return
				}
				if (!this.isEmpty(this.basicsForm.model.cardNo) && this.basicsForm.model.cardNo.length > 30) {
					callback(new Error('证件号码不能超过30位'))
					return
				}
				callback()
			}
			const validatorGender = (rule, value, callback) => {
				if (this.isEmpty(this.basicsForm.model.gender)) {
					callback(new Error('请选择性别'))
					return
				}
				callback()
			}
			const validatorBirth = (rule, value, callback) => {
				if (this.isEmpty(this.basicsForm.model.birth)) {
					callback(new Error('请选择出生日期'))
					return
				}
				if (this.basicsForm.model.birth == '--') {
					callback(new Error('请选择出生日期'))
					return
				}
				callback()
			}
			return {
				title: '',
				userId: '',
				detailDate: {
					username: '',
					capital: '',
					id: '',
					mobile: '',
					cardTypeDesc: '',
					cardType: '',
					idcardsn: '',
					genderDesc: '',
					gender: '',
					levelDesc: '',
					score: '',
					birth: '',
					balance: '',
					virMoney: '',
					statusDesc: '',
					status: '',
					mxbCnt: '',
					accountId: ''
				},
				childTable: [
					{
						title: '编号',
						key: 'childId',
						align: 'center',
					},
					{
						title: '孩子姓名',
						key: 'childName',
						align: 'center',
					},
					{
						title: '性别',
						key: 'childSex',
						align: 'center',
					},
					{
						title: '生日',
						key: 'childBirth',
						align: 'center',
					},
					{
						title: '操作',
						key: 'pi',
						align: 'center',
						render: (h, params) => {
							return h('div', [h('span', {
								style: {
									color: '#5cadff',
									cursor: 'pointer'
								},
								on: {
									click: () => {
										this.$store.commit('set_finace_data', params.row);
										this.$router.push({
											path: `member-list/${params.row.childId}`
										})
									}
								}
							}, '健康档案'),
								h('span', {
									style: {
										color: '#5cadff',
										cursor: 'pointer',
										marginLeft: '10px'
									},
									on: {
										click: () => {
											this.modal.visit = true
											this.getChildImgDate(params.row)
										}
									}
								}, '理赔照片')
							])
						}
					}
				],
				childList: [],
				addressList: [],
				frozenModal: {
					visit: false,
					loading: false,
					form: {
						accountId: '',
						status: 2,
						freezeReason: ''
					},
					rule: {
						freezeReason: [
							{validator: validatorFreezeReason, trigger: 'click'}
						]
					}
				},
				modal: {
					visit: false,
					form: {
						childId: '',
						cardImgPath: [],
						childName: ''
					},
					loading: false
				},
				basicsForm: {
					model: {
						userId: '',
						name: '',
						cardType: '',
						cardNo: '',
						gender: '',
						birth: '',
					},
					rule: {
						realname: [
							{required: true, validator: validatorRealname, trigger: 'click'},
						],
						cardType: [
							// {required: true, validator: validatorCardType, trigger: 'click'},
						],
						idcard: [
							{validator: validatorIdcard, trigger: 'click'},
						],
						gender: [
							// {required: true, validator: validatorGender, trigger: 'click'},
						],
						birth: [
							// { validator: validatorBirth, trigger: 'click'},
						]
					},
					visit: false,
					selectList: [
						{label: '身份证', value: 1},
						{label: '护照', value: 2},
						{label: '港澳通行证', value: 3},
						{label: '台胞证', value: 4},
						{label: '港澳居民居住证', value: 5},
						{label: '台湾居民居住证', value: 6},
						{label: '出生证明', value: 7},
						{label: '其他', value: 8},
          ],
          childSelectList:[
						{label: '身份证', value: 1},
						{label: '出生证明', value: 7}
          ],
				},
				lifted: {
					accountId: '',
					status: 1
				}
			}
		},
		created() {
			this.init();
			this.getData();
			this.getUserChild(this.userId);
			this.getUserAddressList(this.userId)
		},
		methods: {
			cardNoFocus() {
				if (this.basicsForm.model.cardNo == '--') {
					this.basicsForm.model.cardNo = ''
				}
			},
			autoEdit() {
				if (this.basicsForm.model.cardNo.length == 0 || this.basicsForm.model.cardType != 1 || !(/^\d{6}(18|19|20)\d{2}(0\d|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$/).test(this.basicsForm.model.cardNo)) {
					return
				}
				const birth = this.basicsForm.model.cardNo.substring(6, 10) + '-' + this.basicsForm.model.cardNo.substring(10, 12) + '-' + this.basicsForm.model.cardNo.substring(12, 14)
				const gender = this.basicsForm.model.cardNo.substring(14, 17) % 2 ? 1 : 2
				this.basicsForm.model.gender = gender
				this.basicsForm.model.birth = birth
			},
			getUserAddressList(val) {
				this.$fetch({
					url: '/api/patient/getUserAddressList',
					method: 'post',
					data: {
						userId: val
					}
				}).then(res => {
					if (res && res.code === '000') {
						console.log(res)
					}
				})
			},
			handleGoToScore() {
				this.$router.push({
					path: `/member/score-list`,
					query: {
						mobile: this.detailDate.mobile
					}
				})
			},
			goToMxbList() {
				this.$router.push({
					path: `/member/mxb-list`,
					query: {
						mobile: this.detailDate.mobile
					}
				})
			},
			frozenModalVisitChange(val) {
				if (!val) {
					this.cancelFrozenModalForm()
				}
			},
			handleFreezeReasonCancel() {
				this.frozenModal.visit = false
				this.cancelFrozenModalForm()
			},
			handleFreezeReasonOnOk() {
				this.$refs.frozenForm.validate((valid) => {
					if (valid) {
						this.changeStatus(this.frozenModal.form)
					}
				})
			},
			cancelFrozenModalForm() {
				this.frozenModal.form.freezeReason = ''
				this.frozenModal.form.accountId = ''
				this.$refs.frozenForm.resetFields()
			},
			handleChangeStatus(val) {
				if (val == 2) {
					this.frozenModal.form.accountId = this.detailDate.accountId
					this.frozenModal.visit = true
					return
				}
				this.lifted.accountId = this.detailDate.accountId
				this.$Modal.confirm({
					title: '提醒',
					content: '<p>确定解除冻结，恢复此账户状态为正常状态</p>',
					loading: true,
					onOk: () => {
						this.changeStatus(this.lifted)
					},
					onCancel: () => {
						this.cancelLifted()
					}
				});
			},
			cancelLifted() {
				this.lifted.accountId = ''
			},
			changeStatus(val) {
				if (val == 2) {
					this.frozenModal.loading = true
				}
				this.$fetch({
					url: '/api/accountBalance/editAccountStatus',
					method: 'post',
					data: val
				}).then(res => {
					this.frozenModal.loading = false
					if (res && res.code === '000') {
						this.getData()
						if (val.status == 2) {
							this.frozenModal.visit = false
							this.$Message.success('冻结账户成功')
							this.cancelFrozenModalForm()
							return
						}
						this.$Message.success('解除冻结成功')
						this.$Modal.remove();
						this.cancelLifted()
					}
				})
			},
			handleGoWaste() {
				this.$router.push({
					path: `/finance/withdrawal-waste`,
					query: {
						businessUserRole: 'user',
						doctorName: this.detailDate.username
					}
				})
			},
			birthChange(val) {
				this.basicsForm.model.birth = val
			},
			handleEditBasics() {
				this.basicsForm.visit = true
				this.basicsForm.model.name = this.detailDate.username
				this.basicsForm.model.userId = this.detailDate.id
				this.basicsForm.model.cardType = this.detailDate.cardType
				this.basicsForm.model.cardNo = this.detailDate.idcardsn
				this.basicsForm.model.gender = this.detailDate.gender
				this.basicsForm.model.birth = this.detailDate.birth
			},
			handleEditBasicsCancel() {
				this.basicsForm.visit = false
			},
			switchParam(val) {
				if (val == null || val == '--' || val == '' || val !== val) {
					return ''
				}
				return val
			},
			handleEditBasicsSubmit() {
				let param = Object.assign({},
					this.basicsForm.model,
					{birth: this.switchParam(this.basicsForm.model.birth)},
					{gender: this.switchParam(this.basicsForm.model.gender)},
					{cardNo: this.switchParam(this.basicsForm.model.cardNo)},
				)
				this.$refs.basicsForm.validate((valid) => {
					if (valid) {
						this.$fetch({
							url: '/api/patient/editUserBasicInfo',
							method: 'post',
							data: param
						}).then(res => {
							this.basicsForm.visit = false
							if (res && res.code === '000') {
								this.$Message.success('保存基础信息成功')
								this.getData()
							}
						})
					}
				})
			},
			getImgList(val) {
				this.modal.form.cardImgPath = val
			},
			getChildImgDate(val) {
				this.modal.visit = true
				this.modal.form.childId = val.childId
				this.modal.form.childName = val.childName
				this.modal.form.cardImgPath = val.cardImgPath
			},
			resetForm() {
				this.modal.form.childId = '';
				this.modal.form.cardImgPath = [];
				this.modal.form.childName = '';
			},
			handleSubmit() {
				console.log(this.$refs.childInfo)
				let childInfoIndex = ''
				this.childList.forEach((item, index) => {
					if (item.id == this.modal.form.childId) {
						childInfoIndex = index
					}
				})
				if (this.modal.form.cardImgPath.length == 0) {
					this.$Message.error('最少有一张理赔照片')
					return
				}
				this.modal.loading = true
				let cardImgPath = ''
				if (this.modal.form.cardImgPath.length > 0) {
					cardImgPath = this.modal.form.cardImgPath.join(',')
				} else {
					cardImgPath = ''
				}
				let params = Object.assign({}, this.modal.form, {cardImgPath: cardImgPath})
				this.$fetch({
					url: 'child/saveCardImgPath',
					method: 'post',
					data: params
				}).then(res => {
					this.modal.loading = false
					if (res && res.code === '000') {
						this.modal.visit = false
						this.$Message.success('提交照片成功')
						this.$refs.childInfo[childInfoIndex].getUserChildInfo()
						this.resetForm()
						return
					}
					this.$Message.success(res.msg)
				})
			},
			handleCancel() {
				this.modal.visit = false
				this.resetForm()
			},
			conversionEmpty(val) {
				if (val === '' || val == null || val === '--') {
					return '--'
				}
				return val
			},
			getUserChild(val) {
				this.$fetch({
					url: '/api/patient/getUserChildInfo',
					method: 'post',
					data: {
						userId: val
					}
				}).then(res => {
					if (res && res.code === '000') {
						this.childList = res.data.map(item => {
							return Object.assign(item, {visit: false}, {cardType: item.card_type})
						})
					}
				})
			},
			init() {
				this.userId = this.$route.query.userId
			},
			getData() {         //获取数据请求(请求参数自取)
				this.$fetch({
					url: 'api/patient/getUserInfo',
					method: 'post',
					data: {userId: this.userId}
				}).then(res => {
					if (res && res.code === '000') {
						const data = res.data[0]
						this.detailDate.username = data.username
						this.detailDate.id = data.id
						this.detailDate.mobile = data.mobile
						this.detailDate.cardTypeDesc = data.cardTypeDesc
						this.detailDate.idcardsn = this.conversionEmpty(data.idcardsn)
						this.detailDate.genderDesc = this.conversionEmpty(data.genderDesc)
						this.detailDate.cardType = data.cardType == undefined ? "" : parseFloat(data.cardType)
						this.detailDate.gender = data.gender == undefined ? '' : parseFloat(data.gender)
						this.detailDate.levelDesc = this.conversionEmpty(data.levelDesc)
						this.detailDate.score = this.conversionEmpty(data.score)
						this.detailDate.birth = this.conversionEmpty(data.birth)
						this.detailDate.balance = this.conversionEmpty(data.balance)
						this.detailDate.capital = this.conversionEmpty(data.capital)
						this.detailDate.virMoney = this.conversionEmpty(data.virMoney)
						this.detailDate.statusDesc = this.conversionEmpty(data.statusDesc)
						this.detailDate.status = data.status
						this.detailDate.mxbCnt = this.conversionEmpty(data.mxbCnt)
						this.detailDate.accountId = data.accountId
					}
				})
			}
		}
	};
</script>
<style scoped>
.center {
  text-align: center;
}

.bb {
  border-bottom: 1px solid gray;
}
</style>
<style>
.frozenModal .ivu-modal-footer {
  text-align: center;
}
</style>
