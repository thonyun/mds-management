<template>
  <Card dis-hover>
    <p slot="title">成长值记录详情</p>
    <Form ref="detailForm" class="mxb-detail" :model="detail" label-position="right" :label-width="130">
      <FormItem label="用户昵称：">
        {{detail.userName}}
      </FormItem>
      <FormItem label="联系电话：">
        {{detail.mobile}}
      </FormItem>
      <FormItem label="获得日期：">
        {{detail.createdAt}}
      </FormItem>
      <FormItem label="行为活动：">
        {{detail.ruleName}}
        <span class="pointer c-blue" v-if="detail.orderType=='shop_order'" @click="handelGoTo">查看交易详情 ></span>
      </FormItem>
      <FormItem label="成长值：">
        {{detail.score}}
      </FormItem>
    </Form>
  </Card>
</template>

<script>
	import filter from '../../mixin/filter'
	
	export default {
		name: "score-detail",
		mixins: [filter],
		data() {
			return {
				detail: {
					userName: '',
					mobile: '',
					createdAt: '',
					ruleName: '',
					score: '',
					orderType: '',
					orderId: ''
				}
			}
		},
		methods: {
			handelGoTo() {
				this.$router.push(
					{
						path: `/order-management/goods-details`,
						query: {
							id: this.detail.orderId
						}
					}
				)
			},
			getRouteData(vm) {
				const params = Object.assign({}, vm.$route.query)
				let id = vm.convertQueryObjectPropertiesInt(params, ['id'])
				vm.cleanParamsObject(id)
				vm.getData(id)
			},
			getData(val) {
				this.$fetch({
					url: '/api/accountAction/getAccountActionDetail',
					method: 'post',
					data: val
				}).then(res => {
					if (res && res.code === '000') {
						const data = res.data
						this.detail.userName = data.userName
						this.detail.mobile = data.mobile
						this.detail.createdAt = data.createdAt
						this.detail.ruleName = data.ruleName
						this.detail.score = data.score
						this.detail.orderType = data.orderType
						this.detail.orderId = data.orderId
					}
				})
			}
		},
		beforeRouteEnter(to, from, next) {
			next(vm => {
				vm.getRouteData(vm)
			})
		},
		beforeRouteUpdate(to, from, next) {
			this.$nextTick(() => {
				this.getRouteData(this)
			})
			next()
		},
	}
</script>

<style lang="less">
  @import '../../styles/common.less';
  
  .mxb-detail.ivu-form .ivu-form-item-label {
    font-weight: 900;
  }
</style>
