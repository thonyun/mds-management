<template>
  <div>
    <Card>
      <p slot="title">
        <Icon type="ios-funnel"></Icon>筛选查询</p>

      <!-- 查询内容 -->
      <div>
        <Form :model="recordForm"
              ref="recordForm"
              :label-width="100">
          <Row :gutter="32"
               type="flex"
               justify="start"
               align="middle">
            <Col span="8">
            <FormItem label="管理员：">
              <Input style="width: 200px;"
                     v-model="recordForm.operateName"
                     clearable
                     @on-enter="search"
                     placeholder="请输入">
              </Input>
            </FormItem>
            </Col>
            <Col span="8">
            <FormItem label="操作日期：">
              <DatePicker clearable
                          @on-clear="clearDateData"
                          @on-change="dateChange"
                          v-model="oDate"
                          type="daterange"
                          placeholder="选择日期"
                          style="width: 200px"></DatePicker>
            </FormItem>
            </Col>
          </Row>
          <Row style="text-align: center;">
            <Button @click="search"
                    type="primary">查询</Button>
          </Row>
        </Form>
      </div>
    </Card>
    <!-- 列表 -->
    <Card style="margin-top: 20px;">
      <p slot="title">
        <Icon type="md-list"></Icon>优惠券操作记录</p>
      <Table :loading="loading"
             ref="crTable"
             class="margin-top-20"
             :columns="tableTitle"
             :data="tableContent">
        <template slot="type"
                  slot-scope="props">
          <div>{{props.row.operateType | operateTypeFilter}}</div>
        </template>
      </Table>
      <Row type="flex"
           justify="space-between"
           style="margin-top: 20px;">
        <Col>
        <p>共{{total}}条记录 第{{recordForm.pageNo}}/{{Math.ceil(total / recordForm.pageSize) === 0 ? 1 : Math.ceil(total / recordForm.pageSize)}}页</p>
        </Col>
        <Col>
        <Page :total="total"
              size="small"
              show-elevator
              show-sizer
              :current="recordForm.pageNo"
              :page-size="recordForm.pageSize"
              @on-change="changePage"
              @on-page-size-change="changePageSize"
              :page-size-opts="[10, 20, 30, 40]"></Page>
        </Col>
      </Row>
    </Card>
  </div>
</template>

<script>
  import util from './../../../libs/util.js';
  import filter from '../../../mixin/filter';
  export default {
      // name: 'coupon-record',
      mixins: [filter],
      data () {
          return {
  
              tableTitle: [
                  {
                      title: 'ID',
                      key: 'id',
                      width: 100
                  },
                  {
                      title: '操作人',
                      key: 'operateName',
                      minWidth: 100
                  },
                  {
                      title: '操作类型',
                      key: 'operateType',
                      minWidth: 120,
                      render: (h, params) => {
                          return this.$refs.crTable.$scopedSlots.type({row: params.row});
                      }
                  },
                  {
                      title: '优惠券',
                      key: 'backName',
                      minWidth: 120
                  },
                  {
                      title: '发放人数',
                      key: 'grantNum',
                      minWidth: 100
                  },
                  {
                      title: '操作时间',
                      key: 'createdAt',
                      minWidth: 160
                  }
              ],
              tableContent: [],
              total: 0,
              pageNo: 1,
              pageSize: 10,
              loading: false,
              oDate: '',
              recordForm: {
                  operateName: null,
                  startTime: null,
                  endTime: null,
                  pageSize: 10,
                  pageNo: 1
              }
          };
      },
      filters: {
          operateTypeFilter (type) {
              const arr = ['', '添加优惠券', '修改优惠券', '后台发放优惠券', '生效', '暂停'];
              return arr[type];
          }
      },
      // mounted () {
      //     this.initList();
      // },
      methods: {
          initList () {
              this.loading = true;
              const params = {
                  operateName: this.recordForm.operateName,
                  startTime: this.recordForm.startTime,
                  endTime: this.recordForm.endTime,
                  pageNo: this.recordForm.pageNo,
                  pageSize: this.recordForm.pageSize
              };
              // console.log(`params --- ${JSON.stringify(params)}`)
              util.ajax.post('api/coupon/queryCouponOperateList', params).then((res) => {
                  this.loading = false;
                  if (res.data.code === '000') {
                      this.total = res.data.data.totalSize;
                      this.tableContent = res.data.data.dataList;
                  }
              }).catch(() => {
                  this.loading = false;
              });
          },
          search () {
              this.pageNo = 1;
              // this.initList();
              this.filterWith(this.recordForm, {random: Math.random()}, {pageSize: 10, pageNo: 1});
          },
          clearDateData () {
              this.recordForm.startTime = null;
              this.recordForm.endTime = null;
              this.search();
          },
          dateChange (value) {
              //  日期选择
              this.recordForm.startTime = value[0] ? `${value[0]} 00:00:00` : '';
              this.recordForm.endTime = value[1] ? `${value[1]} 23:59:59` : '';
          },
          changePage (val) {
              this.recordForm.pageNo = val;
              this.filterWith(this.recordForm);
          },
          changePageSize (val) {
              this.recordForm.pageSize = val;
              this.recordForm.pageNo = 1;
              this.filterWith(this.recordForm);
          },
          getRouteData (vm) {
              const params = Object.assign({}, vm.$route.query);
              Object.assign(vm.recordForm, this.convertQueryObjectPropertiesInt(params, ['pageNo', 'pageSize']));
              if (params.startTime || params.endTime) {
                  this.oDate = params.startTime + ' - ' + params.endTime;
                  vm.date = [params.startTime, params.endTime];
              }
              vm.initList(vm.recordForm);
          }
      },
      beforeRouteEnter (to, from, next) {
          next(vm => {
              vm.getRouteData(vm);
          });
      },
      beforeRouteUpdate (to, from, next) {
          this.$nextTick(() => {
              this.getRouteData(this);
          });
          next();
      }
  };
</script>

<style lang="less" scoped>
</style>