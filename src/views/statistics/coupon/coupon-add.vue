<template>
  <Card>
        <p slot="title">{{pageTitle}}</p>
        <Form ref="addForm" :model="addForm" :rules="addFormRules" :label-width="120">
            <FormItem prop="name" label="用户端标题：" >
                <Input :disabled="isDetails" v-model="addForm.name" :clearable="!isDetails"></Input>
            </FormItem>

            <FormItem prop="backName" label="后台标题：">
                <Input :disabled="isDetails" v-model="addForm.backName" :clearable="!isDetails"></Input>
            </FormItem>

            <FormItem prop="desc" label="简介：">
                <Input :disabled="isDetails" v-model="addForm.desc" type="textarea" :autosize="{minRows: 5,maxRows: 20}"></Input>
            </FormItem>

            <FormItem prop="useType" label="适用业务：">
                <RadioGroup v-model="addForm.useType">
                    <Radio :disabled="isDetails" label="zgxdiagnose">166门诊</Radio>
                    <Radio :disabled="isDetails" label="servicePackage">199服务包</Radio>
                    <Radio :disabled="isDetails" label="bwy">999宝无忧</Radio>
                    <Radio :disabled="isDetails" label="phone">电话咨询</Radio>
                    <Radio :disabled="isDetails" label="orderIm">图文咨询</Radio>
                    <Radio :disabled="isDetails" label="0" v-show="isSuperAdmin">全部</Radio>
                </RadioGroup>
            </FormItem>

            <FormItem prop="timeType" label="有效日期：">
                <RadioGroup v-model="addForm.wayOfValid" vertical @on-change="validWayChange">
                    <Radio :disabled="isDetails" label="1">永久有效</Radio>
                    <Radio :disabled="isDetails" label="2">自定义</Radio>
                </RadioGroup>
                <Row v-if="addForm.wayOfValid === '2'">
                <FormItem prop="startType" label="起始日期：" style="margin-bottom: 10px;">
                    <Select :disabled="isDetails" v-model="addForm.startType" style="width:200px" @on-change="startTypeChange">
                        <Option v-for="item in startList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                    <DatePicker :disabled="isDetails" v-if="addForm.startType === '1'" type="date" v-model="addForm.startDate" placeholder="请选择" style="width: 200px" @on-change='startDateChange'></DatePicker>
                </FormItem>
                <FormItem prop="endType" label="截止日期：" @on-change="endTypeChange">
                    <Select :disabled="isDetails" v-model="addForm.endType" style="width:200px">
                        <Option v-for="item in endList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                    <DatePicker
                        :disabled="isDetails"
                        v-if="addForm.endType === '1'"
                        type="date"
                        v-model="addForm.endDate"
                        placeholder="请选择"
                        style="width: 200px"
                        @on-change='endDateChange'
                        :options="endOption"
                        ></DatePicker>
                </FormItem>
                </Row>
            </FormItem>
            <FormItem prop="wayOfDiscount" label="优惠方式：">
                <RadioGroup v-model="addForm.wayOfDiscount" vertical @on-change="discountWayChange">
                    <Radio :disabled="isDetails" label="1">免费</Radio>
                    <Row type="flex">
                        <Radio :disabled="isDetails" label="2">折扣</Radio>
                        <div v-if="addForm.wayOfDiscount === '2'">
                            <Poptip word-wrap width="200" placement="right-end">
                                <Icon type="ios-information-circle-outline" />
                                <div slot="content">折扣百分比是将被减少的百分比，比如设置“折扣20%”，表示该优惠券可以在原价基础上-20%</div>
                            </Poptip>
                            <InputNumber :disabled="isDetails" :max="100" :min="0" :step="1" :precision="0" v-model="addForm.discount"></InputNumber>
                            <span style="margin-left: 2px;">%</span>
                        </div>
                    </Row>
                    <Row type="flex">
                        <Radio :disabled="isDetails" label="3">金额</Radio>
                        <div v-if="addForm.wayOfDiscount === '3'">
                            <Poptip word-wrap width="200" placement="right-end">
                                <Icon type="ios-information-circle-outline" />
                                <div slot="content">金额数值是将被减少的具体数额，比如设置“金额5元”，表示该优惠券可以在原价基础上减5元</div>
                            </Poptip>
                            <input :disabled="isDetails" v-model="addForm.discountMoney" class="number__input" type="number" @input="oninput(addForm, $event)"/>
                            <span style="margin-left: 2px;">元</span>
                        </div>
                    </Row>
                </RadioGroup>
            </FormItem>
            <FormItem prop="wayOfGrant" label="发放方式：">
                <RadioGroup v-model="addForm.wayOfGrant" vertical @on-change="grantWayChange">
                    <Row type="flex">
                        <Radio :disabled="isDetails" label="1">用户领取</Radio>
                        <Row type="flex" v-if="addForm.wayOfGrant === '1'" class="grant-wrapper">
                            <span>领取方式：</span>
                            <RadioGroup :disabled="isDetails" v-model="addForm.wayOfGet" vertical @on-change="getWayChange">
                                <Row type="flex">
                                    <Radio :disabled="isDetails" label="1">点击领取</Radio>
                                    <FormItem v-if="addForm.wayOfGet === '1'" prop="getMax" label="最多领取" style="display: flex;">
                                        <InputNumber :disabled="isDetails" :min="1" :step="1" :precision="0" v-model="addForm.getMax"></InputNumber>
                                        <span style="margin-left: 2px;">次</span>
                                    </FormItem>
                                </Row>
                                <Row type="flex">
                                    <Radio :disabled="isDetails" label="2">公共兑换码领取</Radio>
                                    <FormItem v-if="addForm.wayOfGet === '2'" prop="code" style="display: flex;">
                                        <span slot="label">
                                            <Poptip word-wrap width="200" placement="top">
                                                <Icon type="ios-information-circle-outline" />
                                                <div slot="content">只能是英文字母和数字组合,字符长度为3-6位，提交后英文部分自动转换为大写字母，不能与其他公共兑换码相同。</div>
                                            </Poptip>
                                            <span>兑换码：</span>
                                        </span>
                                        <Input :disabled="isDetails" v-model="addForm.code" @on-change="codeChange"></Input>
                                    </FormItem>
                                    <span @click="autoGenerate" v-if="addForm.wayOfGet === '2' && !isDetails" style="padding-left: 8px; text-decoration: underline; cursor: pointer;">自动生成</span>
                                </Row>
                            </RadioGroup>
                        </Row>
                    </Row>
                    <Row type="flex">
                        <Radio :disabled="isDetails" label="2">自动发放</Radio>
                        <Row type="flex" v-if="addForm.wayOfGrant === '2'" class="grant-wrapper">
                            <span>触发条件：</span>
                            <RadioGroup v-model="addForm.wayOfTrigger" vertical @on-change="triggerChange">
                                <Radio :disabled="isDetails" label="2">新用户注册</Radio>
                                <Row type="flex">
                                    <Radio :disabled="isDetails" label="3">购买产品</Radio>
                                    <FormItem v-if="addForm.wayOfTrigger === '3'" prop="products" style="display: flex;">
                                        <CheckboxGroup v-model="addForm.products">
                                            <Checkbox :disabled="isDetails" label="zgxdiagnose">166门诊</Checkbox>
                                            <Checkbox :disabled="isDetails" label="servicePackage">199服务包</Checkbox>
                                            <Checkbox :disabled="isDetails" label="bwy">999宝无忧</Checkbox>
                                            <Checkbox :disabled="isDetails" label="phone">电话咨询</Checkbox>
                                            <Checkbox :disabled="isDetails" label="orderIm">图文咨询</Checkbox>
                                        </CheckboxGroup>
                                    </FormItem>
                                </Row>
                            </RadioGroup>
                        </Row>
                    </Row>
                    <Row type="flex">
                        <Radio :disabled="isDetails" label="3">后台发放</Radio>
                        <Row type="flex" v-if="addForm.wayOfGrant === '3'" class="grant-tip-wrapper">
                            <span>后台发放的动作在列表中点击“发放”操作进行，仅生效且发放方式为“后台发放”的优惠券才有此操作</span>
                        </Row>
                    </Row>
                </RadioGroup>
            </FormItem>
            <FormItem prop="wayOfTotal" label="最大发放数量：">
                <RadioGroup v-model="addForm.wayOfTotal" @on-change="totalWayChange">
                    <Radio :disabled="isDetails" label="1">无限制</Radio>
                    <Radio :disabled="isDetails" label="2">自定义</Radio>
                    <InputNumber :disabled="isDetails" :max="100000" :min="1" :step="1" :precision="0" v-if="addForm.wayOfTotal === '2'" v-model="addForm.totalMoney"></InputNumber>
                    <span v-if="addForm.wayOfTotal === '2'" style="margin-left: 2px;">次</span>
                </RadioGroup>
            </FormItem>
            <FormItem prop="status" label="生效/暂停：">
                <i-switch :disabled="isDetails" size="large" v-model="addForm.status">
                    <span slot="open">生效</span>
                    <span slot="close">暂停</span>
                </i-switch>
            </FormItem>
        </Form>
        <Row type="flex" justify="start" style="margin: 10px 0; margin-left: 120px;" v-if="!isDetails">
            <Button type="primary" :loading="loading" @click="addCoupon">
                <span v-if="!loading">提交</span>
                <span v-else>处理中...</span>
            </Button>
        </Row>
    </Card>
</template>

<script>
  import util from './../../../libs/util.js'
  import moment from 'moment'
  import Cookies from 'js-cookie'
  export default {
    name: 'coupon-add',
    data() {
      return {
        isSuperAdmin: false,
        loading: false,
        isDetails: false,
        pageTitle: null,
        addForm: {
            id: this.$route.params.id, // 详情id
            name: null, // 用户端标题
            backName: null, // 后台标题
            desc: null,
            useType: '0', // zgxdiagnose”.166门诊 “phone”.电话咨询 “orderIm”.图文咨询 “plannedImmunity”.计免 “bwy”999宝无忧 “servicePackage”-199服务包） 0.表示全部可以使用
            wayOfValid: '1', // 有效日期 1，永久有效 2，自定义
            startType: null, // 开始日期类型
            endType: null, // 结束日期类型
            startDate: null, //  日历开始日期
            endDate: null, // 日历结束日期
            wayOfDiscount: '1', // 优惠方式
            discount: null, // 折扣
            discountMoney: null, // 抵扣金额
            wayOfTotal: '1', // 最大发放数量 1，无限制 2，自定义
            totalMoney: 1, // 自定义最大发放数量
            wayOfGrant: '3', // 发放方式 1，用户领取 2，自动发放 3，后台发放
            wayOfGet: '1', // 用户领取---领取方式：1，点击领取 2，公共兑换码领取
            code: null, // 若领取方式为公共兑换码领取，需填 公共兑换码;公共券码3-6位大写英文加数字
            getMax: 1, // 若领取方式为点击领取，需填最多领取次数,
            wayOfTrigger: '2', // 触发条件
            products: [], // 购买产品
            status: false // 1.生效 2.暂停

            // timeType: null, // 后台定义 生效时间类型 1.日历选择 2.优惠券发放日 3.优惠券领取日。若选择永久有效则传1,startTime开始时间为now，endTime结束时间加一百年。
            // startTime: null, //开始时间
            // endTime: null, // 结束时间
            // effectiveTimeLength: null, // 时间段天数，如：一周=7（天） 一年=365（天）
            // type: null, // 优惠券类型 1.金额抵扣券 2.折扣券3.线下券 4.第三方图片优惠券 5.第三放链接优惠券。若为免费，type为2 折扣值传100
            // amount: null, // 抵扣券为 金额如100 ， 折扣 为折扣，如20（20%）
            // getType: null, // 发放方式：”1”-点击领取；”2”-公共兑换码领取；”0”-新用户注册触发领取；”zgxdiagnose”-购买166门诊领取；”servicePackage”-购买199服务包领取；bwy-购买保无忧领取；“phone”-购买电话咨询领取；”orderIm”-购买图文咨询领取；”9”-后台发放’ ；若多选则逗号隔开
            // total: null, // 最大发放数量，无限制填0
        },
        endOption: {
            disabledDate (date) {
                return date && date.valueOf() < Date.now();
            }
        },
        startList: [
            {
                value: '1',
                label: '日历选择'
            },
            {
                value: '2',
                label: '优惠券发放日'
            },
            {
                value: '3',
                label: '优惠券领取日'
            }
        ],
        endList: [
            {
                value: '1',
                label: '日历选择'
            },
            {
                value: '7',
                label: '一周内'
            },
            {
                value: '30',
                label: '30天内'
            },
            {
                value: '90',
                label: '90天内'
            },
            {
                value: '365',
                label: '一年内'
            }
        ],
        addFormRules: {
            name: [
                { required: 'true', message: '请填写用户端标题', trigger: 'blur' },
                { pattern: /^(?!(\s+$))/, message: '请填写用户端标题', trigger: 'blur' }
            ],
            backName: [
                { required: 'true', message: '请填写后台标题', trigger: 'blur' },
                { pattern: /^(?!(\s+$))/, message: '请填写后台标题', trigger: 'blur' }
            ],
            startType: [
                { required: 'true', message: '请选择开始日期', trigger: 'change' }
            ],
            endType: [
                { required: 'true', message: '请选择截止日期', trigger: 'change' }
            ],
            getMax: [
                { required: 'true', type: 'number', message: '请填写最多领取次数', trigger: 'change' }
            ],
            code: [
                { required: 'true', message: '请填写公共兑换码', trigger: 'blur' },
                { pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{3,6}$/, message: '兑换码为3-6位大写字母加数字组合', trigger: 'blur' }
            ]
        }
      }
    },
    created() {
        console.log(Cookies.get('permissionAdmin'))
       
        this.init();
    },
    methods: {
        init() {
            // 只有超级管理员能看见“适用业务”中的“全部”选项——迭代“2.6.2”
            this.isSuperAdmin = Cookies.get('permissionAdmin') == 1
            if (!this.addForm.id){
                this.pageTitle = '添加优惠券类型'
                this.$store.commit('removeTag', 'coupon-add-details')
                return;
            }
            this.isDetails = true
            this.$store.commit('removeTag', 'coupon-add-add')
            util.ajax.post('api/coupon/couponDetail', {
                'id': this.addForm.id
            })
            .then((res) => {
                if (res.data.code === '000') {
                    const info = res.data.data
                    this.pageTitle = info.backName
                    this.addForm.backName = info.backName
                    this.addForm.name = info.name
                    this.addForm.desc = info.desc ? info.desc : null
                    this.addForm.useType = info.userType // 适用业务
                    // 有效日期
                    if (info.timeType === 4) { // 永久有效
                        this.addForm.wayOfValid = '1'
                    } else { // 自定义
                        this.addForm.wayOfValid = '2'
                        this.addForm.startType = info.timeType.toString()
                        if (info.timeType === 1) { // 日历选择
                            this.addForm.startDate= info.startTime.split(' ')[0]
                        }
                    }
                    if (info.endTime) {
                        this.addForm.endType = '1'
                        this.addForm.endDate = info.endTime.split(' ')[0]
                    } else {
                        this.addForm.endType = info.effectiveTimeLength ? info.effectiveTimeLength.toString() : null
                    }

                    // 优惠方式
                    if (info.type === 2) {
                        const arr = info.amount.split('.')
                        if (arr[0] === "100") {
                            this.addForm.wayOfDiscount = '1'
                        } else {
                            this.addForm.wayOfDiscount = '2'
                            this.addForm.discount = parseInt(arr[0])
                        }
                    } else {
                        this.addForm.wayOfDiscount = '3'
                        this.addForm.discountMoney = parseFloat(info.amount)
                    }

                    // 发放方式
                    if (info.getType === '1') {
                        this.addForm.wayOfGrant = '1'
                        this.$nextTick(() => {
                            this.addForm.wayOfGet = '1'
                            this.addForm.getMax = info.getMax
                        })
                    } else if (info.getType === '2') {
                        this.addForm.wayOfGrant = '1'
                        this.$nextTick(() => {
                            this.addForm.wayOfGet = '2'
                            this.addForm.code = info.code
                        })
                    } else if (info.getType === '0') {
                        this.addForm.wayOfGrant = '2'
                        this.addForm.wayOfTrigger = '2'
                    } else if (info.getType === '9') {
                        this.addForm.wayOfGrant = '3'
                    } else {
                        this.addForm.wayOfGrant = '2'
                        this.$nextTick(() => {
                            this.addForm.wayOfTrigger = '3'
                            this.addForm.products = info.getType.split(',')
                        })
                    }

                    // 最大发放数量
                    if (info.total === 0) {
                        this.addForm.wayOfTotal = '1'
                    } else {
                        this.addForm.wayOfTotal = '2'
                        this.addForm.totalMoney = info.total
                    }

                    // 生效/暂停
                    this.addForm.status = info.status === 1 ? true : false
                } else {
                    this.$Message.error({
                        content: res.data.msg,
                        duration: 3
                    })
                }
            })
            .catch()
        },
        validWayChange(val) { // 有效日期改变
            if (val === '1') {
                // console.log(`val -- ${val}`)
                this.resetValidDate()
            }
        },
        resetValidDate() { // 重置有效日期表单
            this.addForm.startType = null
            this.addForm.endType = null
            this.addForm.startDate = null
            this.addForm.endDate = null
        },
        discountWayChange(val) { // 优惠方式改变
            this.addForm.discount = null
            this.addForm.discountMoney = null
        },
        grantWayChange(val) { // 发放方式改变
            this.addForm.wayOfGet = '1'
            this.addForm.code = null
            this.addForm.getMax = 1
            this.addForm.wayOfTrigger = '2'
            this.addForm.products = []
        },
        getWayChange(val) { // 用户领取-领取方式
            this.addForm.getMax = 1
            this.addForm.code = null
        },
        triggerChange() { // 自动发放-触发条件
            this.addForm.products = []
        },
        totalWayChange() { // 最大发放数量
            this.addForm.totalMoney = 1
        },
        codeChange(event) { // 公共兑换码-转换大写字母
            let val = event.currentTarget.value
            val = val.toUpperCase()
            this.addForm.code = val
        },
        startTypeChange() {
            this.addForm.startDate = null
        },
        endTypeChange() {
            this.addForm.endDate = null
        },
        startDateChange(val) {
            this.addForm.startDate = val
        },
        endDateChange(val) {
            this.addForm.endDate = val
        },
        oninput(addForm, e) {
            // 通过正则过滤小数点后两位
            e.target.value = (e.target.value.match(/^\d*(\.?\d{0,2})/g)[0]) || null
            addForm.discountMoney = e.target.value
            // console.log('e',e.target.value)
        },
        autoGenerate() { // 自动生成
            util.ajax.post('api/coupon/gengeratePublicCouponCode').then((res) => {
                if (res.data.code === '000') {
                    const code = res.data.data.publicCode
                    this.addForm.code = code
                } else {
                    this.$Message.error({
                        content: '自动生成兑换码失败！',
                        duration: 3
                    })
                }
            }).catch()
        },
        addCoupon() { // 提交新增优惠券
            this.$refs.addForm.validate((valid) => {
                if (valid) {
                    const param = {
                        name: this.addForm.name, // 用户端标题
                        backName: this.addForm.backName, // 后台标题
                        desc: this.addForm.desc,
                        useType: this.addForm.useType
                    }
                    // 有效日期处理
                    if (this.addForm.wayOfValid === '1') { // 无限制
                        param.timeType = 4
                    } else {
                        if (this.addForm.startType === '1' && !this.addForm.startDate) {
                            this.$Modal.error({
                                title: '提示',
                                content: '开始时间不能为空！'
                            })
                            return
                        } else if (this.addForm.startType === '1' && this.addForm.startDate) {
                            param.timeType = this.addForm.startType
                            param.startTime = this.addForm.startDate
                        } else {
                            param.timeType = this.addForm.startType
                        }

                        if (this.addForm.endType === '1' && !this.addForm.endDate) {
                            this.$Modal.error({
                                title: '提示',
                                content: '截止时间不能为空！'
                            })
                            return
                        } else if (this.addForm.endType === '1') {
                            if (this.addForm.startType === '1' && this.addForm.startDate) {
                                const start = moment(this.addForm.startDate, 'YYYY-MM-DD').valueOf()
                                const end = moment(this.addForm.endDate, 'YYYY-MM-DD').valueOf()
                                if (end < start) {
                                    this.$Modal.error({
                                        title: '提示',
                                        content: '截止时间不能小于开始时间！'
                                    })
                                    return
                                }
                            }
                            param.endTime = this.addForm.endDate
                        } else {
                            param.effectiveTimeLength = this.addForm.endType
                        }
                    }

                    // 优惠方式
                    if (this.addForm.wayOfDiscount === '1') {
                        param.type = 2
                        param.amount = 100
                    } else if (this.addForm.wayOfDiscount === '2') {
                        if (!this.addForm.discount) {
                            this.$Modal.error({
                                title: '提示',
                                content: '折扣不能为空！'
                            })
                            return
                        }
                        param.type = 2
                        param.amount = this.addForm.discount
                    } else {
                        if (!this.addForm.discountMoney) {
                            this.$Modal.error({
                                title: '提示',
                                content: '金额不能为空！'
                            })
                            return
                        }
                        param.type = 1
                        param.amount = this.addForm.discountMoney
                    }

                    // 发放方式
                    if (this.addForm.wayOfGrant === '1') {
                        if (this.addForm.wayOfGet === '1') {
                            param.getType = 1
                            param.getMax = this.addForm.getMax
                        } else {
                            param.getType = 2
                            param.code = this.addForm.code
                        }
                    } else if (this.addForm.wayOfGrant === '2') {
                        if (this.addForm.wayOfTrigger === '2') {
                            param.getType = 0
                        } else {
                            if (!this.addForm.products || this.addForm.products.length === 0) {
                                this.$Modal.error({
                                    title: '提示',
                                    content: '选择的产品不能为空！'
                                })
                                return
                            }
                            param.getType = this.addForm.products.join(',')
                        }
                    } else {
                        param.getType = 9 // 后台发放
                    }

                    // 最大发放数量
                    if (this.addForm.wayOfTotal === '1') {
                        param.total = 0
                    } else {
                        if (!this.addForm.totalMoney) {
                            this.$Modal.error({
                                title: '提示',
                                content: '自定义次数不能为空！'
                            })
                            return
                        }
                        param.total = this.addForm.totalMoney
                    }

                    // 生效/暂停
                    param.status = this.addForm.status ? 1 : 2

                    // console.log(`提交参数 ---- ${JSON.stringify(param)}`)
                    this.loading = true
                    util.ajax.post('api/coupon/addCoupon', param)
                    .then((res) => {
                        this.loading = false
                        if (res.data.code === '000') {
                            this.$Message.success({
                                content: '新增优惠券成功',
                                duration: 3
                            })
                            this.$store.commit('removeTag', 'coupon-add-add')
                            this.$router.back()
                        } else {
                            this.$Message.error({
                                content: res.data.msg,
                                duration: 3
                            })
                        }
                    })
                    .catch()
                } else {
                    // console.log(valid)
                    const page = document.querySelector('.single-page-con')
                    page.scrollTop = 0
                }
            })
        }
    }
  }
</script>

<style lang="less" scoped>
    .number__input {
        width: 70px;
        padding-left: 10px;
        border: 1px solid #ccc;
        border-radius: 4px;
        &:hover {
            border: 1px solid #57a3f3;
        }
    }
    .grant-wrapper {
        margin-left: 10px;
        border: 1px dashed #ccc;
        background: #eee;
        border-radius: 4px;
        padding: 14px;
    }
    .grant-tip-wrapper {
        margin-left: 10px;
        border: 1px dashed #ccc;
        background: #eee;
        border-radius: 4px;
        padding: 2px 10px;
        font-weight: 600;
    }
    /deep/ .ivu-form .ivu-form-item-label {
        font-weight: 600;
    }
</style>