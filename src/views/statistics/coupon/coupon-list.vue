<template>
  <div>
    <Card>
      <p slot="title"><Icon type="ios-funnel"></Icon>筛选查询</p>

      <!-- 查询内容 -->
      <div>
        <Form :model="couponForm" ref="couponForm" :label-width="80">             
          <Row :gutter="32" type="flex" justify="start" align="middle">
            <Col span="8">
              <FormItem label="后台标题：">
                <Input
                  style="width: 200px;"
                  v-model="couponForm.title"
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
      <Row type="flex" justify="space-between" style="margin: 15px 0px;">
        <Button type="primary" @click="grantCoupon">发放优惠券</Button>
          <Button type="primary" icon="md-add-circle" @click="addCouponType">添加优惠券类型</Button>
      </Row>
      <p slot="title"><Icon type="md-list"></Icon>优惠券类型</p>
      <Table :loading="loading" ref="couponTable" class="margin-top-20"  :columns="tableTitle" :data="tableContent">
        <template slot="userType" slot-scope="props">
          <span>{{props.row.useType | userTypeFilter}}</span>
        </template>

        <template slot="getType" slot-scope="props">
          <span>{{props.row.getType | getTypeFilter}}</span>
        </template>

        <template slot="status" slot-scope="props">
          <Dropdown trigger="click">
                <span class="has-active active" v-if="props.row.status === 1">生效</span>
                <span class="has-active pause" v-else>暂停</span>
                <Icon type="ios-arrow-down"></Icon>
              <DropdownMenu slot="list">
                  <DropdownItem :disabled="props.row.status === 1" @click.native="handleStatus(props.row.id, '1')">生效</DropdownItem>
                  <DropdownItem :disabled="props.row.status === 2" @click.native="handleStatus(props.row.id, '2')">暂停</DropdownItem>
              </DropdownMenu>
            </Dropdown>
        </template>

        <template slot="action" slot-scope="props">
          <div class="action-content">
            <span @click="showDetail(props.row.id)" style="border-right: 1px solid #2d8cf0;">查看</span>
            <span @click="showGrantRecord(props.row.id)">发放领取记录</span>
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

    <Modal
      v-model="grantModal"
      @on-visible-change="grantModalVisible"
      footer-hide
      title="发放对象设置"
      >
      <Form ref="grantForm">
        <FormItem>
          <p solt="label">选择要发放的优惠券：</p>
          <Select v-model="grantForm.couponId">
            <Option v-for="item in couponList" :value="item.id" :key="item.id">{{item.backName}}</Option>
          </Select>
        </FormItem>
        <Row class="grant-object">
          发放目标-群体
        </Row>
        <FormItem>
          <p solt="label">购买过这些产品的用户：</p>
          <CheckboxGroup v-model="grantForm.userType">
            <Checkbox label="1">166门诊</Checkbox>
            <Checkbox label="21">199服务包</Checkbox>
            <Checkbox label="20">999宝无忧</Checkbox>
            <Checkbox label="2">电话咨询</Checkbox>
            <Checkbox label="6">图文咨询</Checkbox>
          </CheckboxGroup>
        </FormItem>
        <Row class="grant-object">
          发放目标-个人
        </Row>
        <FormItem>
          <p solt="label">
            <Poptip word-wrap width="200" placement="top-end">
              <Icon type="ios-information-circle-outline" />
              <div slot="content">
                打开个人兑换码会给用户发送一个六位数的大写英文+数字组合的字符串，任何人都可以使用该兑换码进行兑换获取优惠券，不开启个人兑换码则直接将优惠券发送给用户。
              </div>
            </Poptip>
            <span>输入用户手机号码（一行一个，多个用户请换行）：</span>
          </p>
          <Input v-model="grantForm.mobiles" type="textarea" :autosize="{minRows: 1,maxRows: 1000}" placeholder="请输入手机号码"/>
        </FormItem>
        <FormItem label="个人兑换码：">
          <i-switch v-model="grantForm.usePersonCode">
            <span slot="open">是</span>
            <span slot="close">否</span>
          </i-switch>
        </FormItem>
      </Form>

      <div class="error-tip" v-if="grantForm.errorTips">{{grantForm.errorTips}}</div>
      <Row type="flex" justify="end" style="margin-top: 15px;">
            <Button @click="grantModal = false">取消</Button>
            <Button style="margin: 0 10px;" type="primary" @click="saveGrant()">确定</Button>
        </Row>
    </Modal>
  </div>
</template>

<script>
  import util from './../../../libs/util.js'
  export default {
    name: 'coupon-list',
    data() {
      return {
        couponForm: {
          title: null
        },
        grantModal: false,
        grantForm: {
          couponId: 1,
          userType: [],
          mobiles: null,
          usePersonCode: false,
          errorTips: null
        },
        couponList: [],
        tableTitle: [
          {
            title: 'ID',
            key:'id',
            fixed: 'left',
            width: 100
          },
          {
            title: '后台标题',
            key:'backName',
            minWidth: 150
          },
          {
            title: '用户端标题',
            key:'name',
            minWidth: 150
          },
          {
            title: '适用业务',
            key:'useType',
            minWidth: 150,
             render: (h, params) => {
              return this.$refs.couponTable.$scopedSlots.userType({row: params.row})
            }
          },
          {
            title: '优惠方式',
            key:'amount',
            minWidth: 120
          },
          {
            title: '发放方式',
            key:'getType',
            minWidth: 120,
            render: (h, params) => {
              return this.$refs.couponTable.$scopedSlots.getType({row: params.row})
            }
          },
          {
            title: '最大发放数量',
            key:'total',
            minWidth: 120
          },
          {
            title: '已发放',
            key:'grantedNum',
            minWidth: 120
          },
          {
            title: '已使用',
            key:'usedNum',
            minWidth: 120
          },
          {
            title: '状态',
            key:'status',
            minWidth: 120,
            render: (h, params) => {
              return this.$refs.couponTable.$scopedSlots.status({row: params.row})
            }
          },
          {
            title: '创建时间',
            key:'createdAt',
            minWidth: 160
          },
          {
            title: '操作',
            key:'action',
            fixed: 'right',
            minWidth: 180,
            render: (h, params) => {
              return this.$refs.couponTable.$scopedSlots.action({row: params.row})
            }
          }
        ],
        tableContent: [],
        total: 0,
        pageNo: 1,
        pageSize: 10,
        loading: false
      }
    },
    activated() {
      this.initList()
    },
    // mounted() {
    //   this.initList()
    // },
    filters: {
      userTypeFilter(userType) {
        const map = {
          '0': '全部',
          '6': '华西特需券',
          'zgxdiagnose': '166门诊',
          'phone': '电话咨询',
          'orderIm': '图文咨询',
          'plannedImmunity': '计免',
          'bwy': '999宝无忧',
          'servicePackage': '199服务包'
        }
        const arr = userType.split(',')
        const arr2 = []
        arr.forEach((key) => {
          arr2.push(map[key])
        })
        return arr2.join(',')
      },
      getTypeFilter(getType) {
        const arr = ['', '用户领取', '自动发放', '后台发放']
        return arr[getType]
      }
    },
    methods: {
      initList() {
        // this.loading = true
        const params = {
          name: this.couponForm.title,
          pageNo: this.pageNo,
          pageSize: this.pageSize
        }
        // console.log(`params --- ${JSON.stringify(params)}`)
        util.ajax.post('api/coupon/queryCouponList', params)
        .then((res) => {
          this.loading = false
          if (res.data.code === '000') {
            this.total = res.data.data.totalSize
            this.tableContent = res.data.data.dataList
          }
        })
        .catch()
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
      },
      addCouponType() { //添加优惠券类型
        this.$router.push({
          path: `/statistics/coupon-add`
        })
      },
      grantCoupon() { // 发放优惠券
        this.grantModal = true
        this.initCouponList()
      },
      initCouponList() {
        util.ajax.get('api/coupon/queryBackGrantList')
        .then((res) => {
          if (res.data.code === '000') {
            const list = res.data.data.dataList
            if (list[0]) {
              this.grantForm.couponId = list[0].id
            }
            this.couponList = list
          }
        }).catch()
      },
      grantModalVisible(val) { // 弹框消失
        if (!val) {
          this.$refs.grantForm.resetFields()
          this.grantForm.couponId = null
          this.grantForm.userType = []
          this.grantForm.mobiles = null
          this.grantForm.usePersonCode = false
          this.grantForm.errorTips = null
        }
      },
      saveGrant() { // 确定发放
        if ((!this.grantForm.userType || this.grantForm.userType.length === 0) && (!this.grantForm.mobiles || this.grantForm.mobiles === '')) {
          this.grantForm.errorTips = '你当前未选择目标对象，请至少选择一个'
          return
        }
        let mobiles = ''
        if (this.grantForm.mobiles) { // 有电话号码
          const arr = this.grantForm.mobiles.split('\n')
          mobiles = arr.join(',')
        }
        util.ajax.post('api/coupon/grantCoupon', {
          'id': this.grantForm.couponId,
          'userType': this.grantForm.userType.join(','),
          'userPhone': mobiles,
          'usePrivateCode': this.grantForm.usePersonCode ? 1 : 0
        }).then((res) => {
          if (res.data.code === '000') {
            this.$Message.success({
              content: '发放成功',
              duration: 3
            })
            this.grantModal = false
          } else {
            this.grantForm.errorTips = res.data.msg
          }
        }).catch()
      },
      showDetail(id) {
        this.$router.push({
          path: `../statistics/coupon-details/${id}`
        })
      },
      showGrantRecord(id) { // 发放领取记录
        this.$router.push({
          path: `../statistics/coupon-grant-record/${id}`
        })
      },
      handleStatus(id, s) {
        util.ajax.post('api/coupon/couponStatus', {
          'couponId': id,
          'status': s
        }).then((res) => {
          if (res.data.code === '000') {
            this.$Message.success({
              content: '操作成功',
              duration: 3
            })
            this.initList()
          } else {
            this.$Message.error({
              content: res.data.msg,
              duration: 3
            })
          }
        }).catch()
      }
    }
  }
</script>

<style lang="less" scoped>
.has-active {
  display: inline-block;
  padding: 2px 8px;
  margin-right: 6px;
  color: #fff;
  border-radius: 4px;
  &.active {
    background-color: #76cf48;
  }
  &.pause {
    background-color: #999;
  }
}
.action-content span {
  color: #2d8cf0;
  cursor: pointer;
  padding: 0 5px;
}
.grant-object {
  padding: 10px 0;
  margin-bottom: 10px;
  border-bottom: 1px dashed #ccc;
  color: #999;
}
.error-tip {
  color: red;
  font-weight: 600;
}
</style>