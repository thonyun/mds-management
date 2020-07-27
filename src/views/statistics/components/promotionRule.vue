<template>
  <Row>
    <Col :span="23">
      <Form ref="serveForm" :model="form" :rules="rule"
            style="border: 1px solid #D1D3D8;padding: 15px;background: #F2F2F2">
        <FormItem prop="rebateType" label="返利类型：" style="margin-bottom: 15px">
          <Select v-model="form.rebateType">
            <Option v-for="item in rebateTypeList" :value="item.value" :key="item.value">{{ item.name }}
            </Option>
          </Select>
        </FormItem>
        <FormItem prop="condition" label="充值条件：" style="margin-bottom: 15px">
          <Row type="flex" style="margin-bottom: 5px" :gutter="10">
            <Col :span="12">
              <Input v-model.number="form.rechargeMin" placeholder="请输入最小金额"/>
            </Col>
            <Col :span="12">
              <Input v-model.number="form.rechargeMax" placeholder="请输入最大金额"/>
            </Col>
          </Row>
        </FormItem>
        <FormItem prop="money" label="返利金额：">
          <Row type="flex" style="margin-bottom: 5px" :gutter="10">
            <Col :span="3">
              <Select v-model="form.rebateMoneyType" @on-change="rebateMoneyTypeChange">
                <Option v-for="item in rebateMoneyTypeList" :value="item.value" :key="item.value">{{ item.label }}
                </Option>
              </Select>
            </Col>
            <Col :span="21" v-if="form.rebateMoneyType==0">
              <Input v-model="form.rebateMoney" style="width: 100%" placeholder="请输入返利金额" key="1"/>
            </Col>
            <Col :span="21" v-if="form.rebateMoneyType==1">
              <Input v-model="form.rebateRate" style="width: 100%" placeholder="请输入返利比例" key="2">
              <span slot="append">%</span>
              </Input>
            </Col>
          </Row>
        </FormItem>
      </Form>
    </Col>
    <Col :span="1" v-if="goodsDetailIndex!=0">
      <Icon type="ios-trash-outline" style="font-size: 22px;color:red;cursor:pointer"
            @click="handleDelet(goodsDetailIndex)"/>
    </Col>
  </Row>
</template>

<script>
	import service from "../../../libs/fetch";
	
	export default {
		name: "promotionRule",
		props: ['rebateTypeList', 'item', 'goodsDetailIndex', 'disabled'],
		data() {
			const validatorCondition = (rule, value, callback) => {
				if (this.form.rechargeMin === '' || this.form.rechargeMin == null) {
					callback(new Error('请填写最小金额'));
					return
				}
				if (!Number.isInteger(parseFloat(this.form.rechargeMin)) || this.form.rechargeMin <= 0) {
					callback(new Error('最小金额为大于0的整数'));
					return
				}
				let a = ['', null, undefined]
				if (!a.includes(this.form.rechargeMax)) {
				
				}
				if (!a.includes(this.form.rechargeMax)) {
					if (this.form.rechargeMax <= 0) {
						callback(new Error('最大金额为大于0的整数'));
						return
					}
					if (!Number.isInteger(parseFloat(this.form.rechargeMax))) {
						callback(new Error('最大金额为大于0的整数'));
						return
					}
					if (this.form.rechargeMax < this.form.rechargeMin) {
						callback(new Error('最大金额不能小于最小金额'));
						return
					}
				}
				callback()
			}
			const validatorMoney = (rule, value, callback) => {
				if (this.form.rebateMoneyType === '' || this.form.rebateMoneyType == null) {
					console.log(this.form.rebateMoneyType);
					callback(new Error('请选择返利金额类型'))
					return
				}
				if (this.form.rebateMoneyType === 0) {
					if (!Number.isInteger(parseFloat(this.form.rebateMoney)) || this.form.rebateMoney > 10000) {
						callback(new Error('返利金额为大于0小于10000的整数'))
						return
					}
				}
				if (this.form.rebateMoneyType === 1) {
					if (!Number.isInteger(parseFloat(this.form.rebateRate)) || this.form.rebateRate > 100 || this.form.rebateRate < 1) {
						callback(new Error('返利比例为大于0小于100的整数'))
						return
					}
				}
				callback()
			}
			return {
				rebateMoneyTypeList: [{label: '按金额数', value: 0}, {label: '按比例', value: 1}],
				form: {
					rebateType: this.item.rebateType,
					rechargeMin: this.item.rechargeMin,
					rechargeMax: this.item.rechargeMax,
					rebateMoneyType: this.item.rebateMoneyType,
					rebateMoney: this.item.rebateMoney,
					rebateRate: this.item.rebateRate,
					id: this.item.id,
					actId: this.item.actId,
				},
				rule: {
					rebateType: [{required: true, message: '请选择服务类型', trigger: 'blur', type: 'number'}],
					condition: [{required: true, validator: validatorCondition, trigger: 'blur'}],
					money: [{required: true, validator: validatorMoney, trigger: 'blur'}]
				},
			}
		},
		methods: {
			rebateMoneyTypeChange(val) {
				if (val == 0) {
					this.form.rebateRate = null
					return
				}else {
					this.form.rebateMoney = null
				}
			},
			handleDelet(val) {
				this.$emit('delete', val)
			},
			validateServeForm() {
				return this.$refs.serveForm.validate(valid => {
						return valid
					}
				)
			},
		},
		watch: {
			item(val) {
				this.form.rebateType = val.rebateType
				this.form.rechargeMin = val.rechargeMin
				this.form.rechargeMax = val.rechargeMax
				this.form.rebateMoneyType = val.rebateMoneyType
				this.form.rebateMoney = val.rebateMoney
				this.form.rebateRate = val.rebateRate
				this.form.id = val.id
				this.form.actId = val.actId
			},
			form: {
				handler(val) {
					this.$emit('sendData', {form: this.form, index: this.goodsDetailIndex})
				},
				deep: true
			},
		},
	}
</script>

<style>

</style>
