<template>
  <div>
    <Card>
      <p slot="title"><Icon type="ios-funnel"></Icon>筛选查询</p>

      <!-- 查询内容 -->
      <div>
        <Form :model="recordForm" ref="recordForm" :label-width="120">             
          <Row :gutter="32" type="flex" justify="start" align="middle">
            <Col span="8">
              <FormItem label="发放对象电话：">
                <Input
                  style="width: 200px;"
                  v-model="recordForm.mobile"
                  clearable
                  @on-enter="search"
                  placeholder="请输入">
                </Input>
              </FormItem>
            </Col>
          </Row>
          <Row style="text-align: center;">
              <Button @click="search" type="primary">查询</Button>
          </Row>
        </Form>
      </div>
    </Card>
    <!-- 列表 -->
    <Card style="margin-top: 20px;">
      <p slot="title"><Icon type="md-list"></Icon>{{recordTitle}}</p>
      <Table :loading="loading" ref="recordTable" class="margin-top-20"  :columns="tableTitle" :data="tableContent">
        <template slot="type" slot-scope="props">
          <div>{{props.row.getType | getTypeFilter}}</div>
        </template>
        <template slot="use" slot-scope="props">
          <div class="has-use">
            <span class="used" v-if="props.row.status === 2">是</span>
            <span class="not-used" v-else>否</span>
          </div>
        </template>
      </Table>
      <Row type="flex" justify="space-between"  style="margin-top: 20px;">
        <Col>
            <p>共{{total}}条记录 第{{pageNo}}/{{Math.ceil(total / pageSize) === 0 ? 1 : Math.ceil(total / pageSize)}}页</p>
        </Col>
        <Col>
          <Page
            :total="total"
            size="small"
            show-elevator
            show-sizer
            :current="pageNo"
            :page-size="pageSize"
            @on-change="changePage"
            @on-page-size-change="changePageSize"
            :page-size-opts="[10, 20, 30, 40]"
          ></Page>
        </Col>
      </Row>
    </Card>
  </div>
</template>

<script>
  import util from './../../../libs/util.js'
  export default {
    // name: 'coupon-grant-record',
    data() {
      return {
        id: null,
        recordForm: {
          mobile: null
        },
        recordTitle: '发放及领取记录',
        tableTitle: [
          {
            title: '优惠券标题',
            key:'backName',
            minWidth: 150
          },
          {
            title: '个人兑换码',
            key:'code',
            minWidth: 150
          },
          {
            title: '发放对象',
            key:'grantMobile',
            minWidth: 120
          },
          {
            title: '发放时间',
            key:'grantTime',
            minWidth: 160
          },
          {
            title: '发放方式',
            key:'getType',
            minWidth: 120,
            render: (h, params) => {
              return this.$refs.recordTable.$scopedSlots.type({row: params.row})
            }
          },
          {
            title: '领取对象',
            key:'getMobile',
            minWidth: 120
          },
          {
            title: '是否使用',
            key:'status',
            minWidth: 120,
            render: (h, params) => {
              return this.$refs.recordTable.$scopedSlots.use({row: params.row})
            }
          },
          {
            title: '使用时间',
            key:'useTime',
            minWidth: 160
          }
        ],
        tableContent: [],
        total: 0,
        pageNo: 1,
        pageSize: 10,
        loading: false
      }
    },
    filters: {
      getTypeFilter(type) {
        const arr = ['', '用户领取', '自动发放', '后台发放']
        return arr[type]
      }
    },
    watch: {
      $route(){
        // console.log(`route -- ${this.$route.params.couponId}`)
        this.id = this.$route.params.couponId
      },
      id() {
        this.initList()
      }
    },
    mounted() {
      this.id = this.$route.params.couponId
      this.initList()
    },
    methods: {
      initList() {
        this.loading = true
        const params = {
          couponId: this.id,
          phone: this.recordForm.mobile,
          pageNo: this.pageNo,
          pageSize: this.pageSize
        }
        // console.log(`params --- ${JSON.stringify(params)}`)
        util.ajax.post('api/coupon/queryCouponGrantList', params)
        .then((res) => {
          this.loading = false
          if (res.data.code === '000') {
            this.total = res.data.data.totalSize
            this.tableContent = res.data.data.dataList
          }
        }).catch(() => {
          this.loading = false
        })
      },
      search() {
        this.pageNo = 1
        this.initList()
      },
      changePage(val) {
        this.pageNo = val
        this.initList()
      },
      changePageSize(val) {
        this.pageSize = val
        this.initList()
      }
    }
  }
</script>

<style lang="less" scoped>
.has-use {
  span {
    display: inline-block;
    padding: 2px 8px;
    margin-right: 6px;
    color: #fff;
    border-radius: 4px;
  }
  .used {
    background-color: #76cf48;
  }
  .not-used {
    background-color: #999;
  }
}
</style>