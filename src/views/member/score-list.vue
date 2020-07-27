<template>
  <Card dis-hover>
    <p slot="title">手机号为{{filters.mobile}}的用户成长值流水记录</p>
    <Form ref="filterForm" :model="filters">
      <Row :gutter="32">
        <Col span="8">
          <FormItem label="下单日期:" :label-width="80">
            <DatePicker :value="date" format="yyyy-MM-dd" clearable type="daterange" placeholder="选择日期"
                        style="width: 200px" @on-change="dateChange"></DatePicker>
          </FormItem>
        </Col>
      </Row>
    </Form>
    <Row type="flex" justify="center" class="mb-20">
      <Button @click="handleRestSearch" class="mr-20 button-w-180">重置</Button>
      <Button type="primary" @click="search" class=" button-w-180 mr-20">查询</Button>
    </Row>
    <Row class="margin-top-10">
      <Table :columns="columns" :loding="loading" :data="data"></Table>
    </Row>
    <Row type="flex" justify="space-between" class="margin-top-20">
      <Col>
        <p>共{{dataSize}}条记录 第{{filters.page}}/{{Math.ceil(dataSize/filters.pageSize)}}页</p>
      </Col>
      <Col>
        <Page :total="dataSize" size="small" show-elevator show-sizer :current="filters.page"
              :page-size="filters.pageSize" @on-change="changePage" @on-page-size-change="changePageSize"
              :page-size-opts="[10, 20, 30, 40]"></Page>
      </Col>
    </Row>
  </Card>
</template>

<script>
	import filter from '../../mixin/filter'
	
	export default {
		name: "score-list",
		mixins: [filter],
		data() {
			return {
				data: [],
				date: [],
				dataSize: 0,
				loading: false,
				routeName: 'score-list',
				filters: {
					pageSize: 10,
					page: 1,
					mobile: '',
					startTime: '',
					endTime: '',
					scoreType: 'mlz'
				},
				columns: [
					{title: '日期', align: 'center', key: 'createdAt'},
					{title: '行为项', align: 'center', key: 'ruleName'},
					{
						title: '积分值', align: 'center', key: 'score',
						render: (h, params) => {
							if (params.row.score >= 0) {
								return h('div', {
									attrs: {
										class: 'c-green'
									}
								}, '+' + params.row.score)
							}
							return h('div', {
								attrs: {
									class: 'c-red'
								}
							}, params.row.score)
						}
					},
					{
						title: '操作', align: 'center', render: (h, params) => {
							return h('div', {
								attrs: {
									class: 'c-blue pointer'
								},
								on: {
									click: () => {
										this.$router.push({
											path: `/member/score-detail`,
											query: {
												id: params.row.id
											}
										})
									}
								}
							}, '详情')
						}
					},
				]
			}
		},
		methods: {
			changePage(val) {
				this.filters.page = val
				this.filterWith(this.filters)
			},
			changePageSize(val) {
				this.filters.pageSize = val
				this.filterWith(this.filters)
			},
			handleRestSearch() {
				this.filters.pageSize = 10
				this.filters.page = 1
				this.filters.startTime = ''
				this.filters.endTime = ''
				this.date = []
			},
			search() {
				this.filterWith(this.filters, {random: Math.random()}, {pageSize: 10, page: 1})
			},
			dateChange(val) {
				this.filters.startTime = val[0]
				this.filters.endTime = val[1]
			},
			getRouteData(vm) {
				const params = Object.assign({}, vm.$route.query)
				Object.assign(vm.filters, this.convertQueryObjectPropertiesInt(params, ['page', 'pageSize']))
				if (params.startTime || params.endTime) {
					vm.date = [params.startTime, params.endTime]
				}
				vm.cleanParamsObject(vm.filters)
				vm.getTableData(vm.filters)
			},
			getTableData(val) {
				this.loading = true
				this.$fetch({
					url: '/api/accountAction/getAccountActionList',
					method: 'post',
					data: val
				}).then(res => {
					this.loading = false
					if (res && res.code === '000') {
						this.data = res.data.list
						this.dataSize = res.data.total
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
</style>
