<template>
  <div>
    <card dis-hover
          :class="{'active':!show}">
      <p slot="title"
         class="fl-space-between">
        <span>
          <Icon type="ios-funnel" />筛选查询</span>
        <span class="pointer">
          <span @click="toggle(1)"
                v-if="show">收起
            <Icon type="ios-arrow-up" />
          </span>
          <span @click="toggle(2)"
                v-else>展开
            <Icon type="ios-arrow-down" />
          </span>
        </span>
      </p>
      <div v-show="show">
        <Form ref="filterForm"
              :model="filters">
          <Row :gutter="32">
            <Col span="8">
            <FormItem label="任务名称："
                      :label-width="80">
              <Input class="w-200"
                     clearable
                     v-model="filters.name"
                     placeholder="输入关键字搜索" />
            </FormItem>
            </Col>
            <Col span="8">
            <FormItem label="任务类型："
                      :label-width="80">
              <Select v-model="filters.taskType"
                      clearable
                      style="width:200px">
                <Option v-for="item in taskTypeList"
                        :value="item.key"
                        :key="item.key">{{ item.value }}</Option>
              </Select>
            </FormItem>
            </Col>
            <Col span="8">
            <FormItem label="状态："
                      :label-width="80">
              <Select v-model="filters.taskStatus"
                      clearable
                      style="width:200px">
                <Option v-for="items in taskStatusList"
                        :value="items.value"
                        :key="items.value">{{items.label}}</Option>
              </Select>
            </FormItem>
            </Col>
          </Row>
        </Form>
        <Row type="flex"
             justify="center"
             class="mb-20">
          <Button @click="handleRestSearch"
                  class="mr-20 button-w-180">重置</Button>
          <Button type="primary"
                  @click="search"
                  class=" button-w-180 mr-20">查询</Button>
        </Row>
      </div>
    </card>
    <Card dis-hover
          class="margin-top-10">
      <Row type="flex"
           justify="start">
        <Col>
        <Button type="primary"
                @click="handleAdd"> + 新增任务</Button>
        </Col>
      </Row>
      <Row type="flex"
           justify="end"
           class="mtC30"
           v-if="!isChangeSort && data.length > 0 ">
        <Col>
        <Button type="primary"
                @click="changeSort">修改排序</Button>
        </Col>
      </Row>
      <Row type="flex"
           justify="end"
           class="mtC30"
           v-if="isChangeSort">
        <Col>
        <Button @click="cancelChangeSort">取消</Button>
        </Col>
        <Col style="margin-left: 10px;">
        <Button type="primary"
                @click="saveChangeSort"
                :loading="saveChangeSortloding">保存排序</Button>
        </Col>
      </Row>
      <Row class="margin-top-10">
        <Table :columns="columns"
               ref="table"
               :loding="tableLoading"
               :data="data">
          <template slot="state"
                    slot-scope="props">
            <div>
              <i-switch v-model="props.row.status"
                        size="large"
                        :true-value="2"
                        :false-value="1"
                        @on-change="changeStatus(props.row)">
                <span slot="open">启用</span>
                <span slot="close">停用</span>
              </i-switch>
            </div>
          </template>
        </Table>
      </Row>

      <Row type="flex"
           justify="space-between"
           style="margin-top: 20px;">
        <Col>
        <div>共{{total}}条记录 第{{pageNo}}/{{Math.ceil(total / pageSize) === 0 ? 1 : Math.ceil(total / pageSize)}}页</div>
        </Col>
        <Col>
        <Page :total="total"
              :page-size='pageSize'
              :current='pageNo'
              size="small"
              show-sizer
              show-elevator
              @on-change="changePageNo"
              @on-page-size-change="changePageSize" />
        </Col>
      </Row>

    </Card>
    <Modal v-model="modal.visit"
           title="任务详情"
           :mask-closable="false"
           @on-cancel="resetForm">
      <Form ref="modal"
            :model="modal.form"
            :label-width="150"
            style="margin:0 auto;">
        <FormItem label="任务名称：">
          <span class="textWarp">{{modal.form.taskName}}</span>
        </FormItem>
        <FormItem label="任务类型：">
          {{modal.form.taskTypeName}}
        </FormItem>
        <FormItem label="任务图标：">
          <img :src="modal.form.taskPic"
               width="50px" />
        </FormItem>
        <FormItem label="任务描述：">
          <span class="textWarp">{{modal.form.taskDesc}}</span>
        </FormItem>
        <FormItem :label="item.fieldTitle+'：'"
                  v-for="(item,index) in modal.form.fieldList"
                  :key="index">
          {{item.fieldValue}}
        </FormItem>

        <FormItem label="妈星币奖励：">
          {{modal.form.rewardMxb}}
        </FormItem>
        <FormItem label="妈星币限制：">
          {{modal.form.maxMxbNum}}
        </FormItem>
      </Form>
      <Row slot="footer"
           type="flex"
           justify="center">
        <Button type="primary"
                @click="handleClose">关闭
        </Button>
      </Row>
    </Modal>
  </div>

</template>

<script>
import filter from '../../../mixin/filter';

export default {
    name: 'score-task-item',
    mixins: [filter],
    props: ['showUser'],
    data () {
        return {
            total: 0,
            pageNo: 1,
            pageSize: 10,
            userRole: this.showUser,
            taskStatusList: [{
                value: '2',
                label: '启用'
            }, {
                value: '1',
                label: '停用'
            }],
            // 任务类型
            taskTypeList: [],
            filters: {
                name: '',
                taskType: '',
                taskStatus: ''
            },
            date: [],
            isChangeSort: false,
            saveChangeSortloding: false,
            modal: {
                visit: false,
                form: {
                    taskName: '',
                    taskTypeName: '',
                    taskPic: '',
                    taskDesc: '',
                    rewardMxb: '',
                    maxMxbNum: '',
                    fieldList: []
                }
            },
            remindModal: false,
            ExamTypeList: [],
            routeName: 'score-task',
            show: true,
            tableLoading: false,
            data: [],
            columns: [
                {title: '任务图标',
                    align: 'center',
                    key: 'taskPic',
                    render: (h, params) => {
                        return h('div', [
                            h('img', {
                                style: {
                                    verticalAlign: 'middle',
                                    width: '70px',
                                    height: '70px',
                                    margin: '10px'
                                },
                                attrs: {
                                    src: params.row.taskPic
                                }
                            })
                        ]);
                    }
                },
                {title: '任务名称', align: 'center', key: 'taskName'},
                {title: '任务类型', align: 'center', key: 'taskTypeName'},
                {
                    title: '状态',
                    align: 'center',
                    key: 'status',
                    render: (h, params) => {
                        return this.$refs.table.$scopedSlots.state({
                            row: params.row
                        });
                    }
                },
                {title: '奖励', align: 'center', key: 'rewardMxb'},
                {title: '创建时间', align: 'center', key: 'createTime'},
                {
                    title: '排序',
                    key: 'sort',
                    align: 'center',
                    minWidth: 100,
                    render: (h, params) => {
                        return h('InputNumber', {
                            props: {
                                value: this.data[params.index].sort,
                                activeChange: false
                            },
                            attrs: {
                                disabled: !this.isChangeSort
                            },
                            on: {
                                'on-change': (event) => {
                                    let str = String(event);
                                    if (str.indexOf('.') !== -1) {
                                        this.$Modal.confirm({
                                            title: '提醒',
                                            content: '请输入大于0的正整数',
                                            onOk: () => {
                                                this.data[params.index].sort = null;
                                            }
                                        });
                                    }
                                    if (event <= 0) {
                                        this.$Modal.confirm({
                                            title: '提醒',
                                            content: '请输入大于0的正整数',
                                            onOk: () => {
                                                this.data[params.index].sort = null;
                                            }
                                        });
                                    } else {
                                        this.$set(this.data[params.index], 'sort', event);
                                    }
                                }
                            }
                        });
                    }
                },
                {
                    title: '操作',
                    align: 'center',
                    key: 'totalProxy',
                    render: (h, params) => {
                        if (params.row.status == '1') {
                            return h('div', [
                                h('span', {
                                    attrs: {
                                        class: 'c-blue pointer'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.getUserTaskConfigDetail(params.row.id);
                                        }
                                    }
                                }, '详情'),
                                h('span', {
                                    attrs: {
                                        class: 'c-blue pointer'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.goToEdit(params.row.id);
                                        }
                                    }
                                }, '编辑'), h('span', {
                                    attrs: {
                                        class: 'c-red pointer'
                                    },
                                    on: {
                                        click: () => {
                                            this.handleDelete(params.row.id);
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                        return h('div', {
                            attrs: {
                                class: 'c-blue pointer'
                            },
                            on: {
                                click: () => {
                                    this.getUserTaskConfigDetail(params.row.id);
                                }
                            }
                        }, '详情');
                    }
                }
            ]
        };
    },
    created () {
        this.getkeyList();
        this.getTableData();
    },
    methods: {
        isRepeat () {
            let a = [];
            for (let i = 0; i < this.data.length - 1; i++) {
                for (let j = i + 1; j < this.data.length; j++) {
                    if (this.data[i].sort == this.data[j].sort) {
                        a.push(this.data[i]);
                        a.push(this.data[j]);
                    }
                }
            }
            // let repeat = Array.from(new Set(a))
            if (a.length > 0) {
                this.$Modal.warning({
                    title: '提示',
                    content: '排序不能重复，请检查'
                });
                return false;
            }
            return true;
        },
        // 获取字典key
        getkeyList () {
            this.$fetch({
                url: 'api/sysDictValues/getDicByCategoryKey',
                method: 'post',
                data: {
                    categoryKey: 'score_task_type'
                }
            }).then(res => {
                if (res && res.code === '000') {
                    this.taskTypeList = res.data;
                }
            });
        },
        saveChangeSort () {
            if (this.isRepeat()) {
                let b = [];
                this.data.forEach(item => {
                    b.push({
                        id: item.id,
                        sort: item.sort
                    });
                });
                this.saveChangeSortloding = true;
                this.$fetch({
                    url: '/api/taskScore/editTaskScoreSort',
                    method: 'post',
                    data: {scoreList: JSON.stringify(b)}
                }).then(res => {
                    if (res && res.code === '000') {
                        this.saveChangeSortloding = false;
                        this.isChangeSort = false;
                        this.getTableData();
                        this.$Message.success('保存排序成功');
                        return;
                    }
                    this.saveChangeSortloding = false;
                    this.$Message.error(res.data.msg);
                });
            }
        },

        changeSort () {
            if (this.data.total <= 0) {
                return;
            }
            this.isChangeSort = true;
        },
        cancelChangeSort () {
            this.isChangeSort = false;
            // this.getRouteData(this);
        },
        handleClose () {
            this.modal.visit = false;
        },
        resetForm () {
            this.modal.form.taskName = '';
            this.modal.form.taskAddMxb = '';
            this.modal.form.taskAddMlz = '';
            this.modal.form.taskAddJkz = '';
            this.modal.form.automaticAwardDesc = '';
            this.modal.form.showUserDesc = '';
            this.modal.form.isShowDesc = '';
            this.modal.form.statusDesc = '';
            this.modal.form.taskGroupName = '';
            this.modal.form.taskLimitTypeDesc = '';
        },
        handleDelete (id) {
            this.$Modal.confirm({
                title: '提醒',
                content: '<p>确定删除吗？</p>',
                onOk: () => {
                    this.$fetch({
                        url: 'api/taskScore/deleteTaskScore',
                        data: {
                            id: id
                        },
                        method: 'post'
                    }).then(res => {
                        if (res && res.code === '000') {
                            this.$Message.success('删除规则成功');
                            this.getTableData();
                        }
                    });
                },
                onCancel: () => {
                }
            });
        },
        goToEdit (val) {
            this.$router.push({
                path: '/statistics/add-score-manage-task?id=' + val + '&userRole=' + this.userRole
            });
        },
        changeStatus (val) {
            this.tableLoading = true;
            this.$fetch({
                url: 'api/taskScore/editTaskScoreStatus',
                method: 'post',
                data: {
                    id: val.id,
                    status: val.status
                }
            }).then(res => {
                this.tableLoading = false;
                if (res && res.code === '000') {
                    this.$Message.success('状态修改成功');
                    this.getTableData();
                }
            });
        },
        handleAdd () {
            this.$router.push({
                path: '/statistics/add-score-manage-task?userRole=' + this.userRole
            });
        },
        // 重置
        handleRestSearch () {
            this.filters.name = '';
            this.filters.taskType = '';
            this.filters.taskStatus = '';
        },
        getUserTaskConfigDetail (val) {
            this.$fetch({
                url: 'api/taskScore/getTaskScoreDetail',
                method: 'post',
                data: {
                    id: val
                }
            }).then(res => {
                if (res && res.code === '000') {
                    this.modal.visit = true;
                    this.modal.form.taskName = res.data.taskName;
                    this.modal.form.taskTypeName = res.data.taskTypeName;
                    this.modal.form.taskPic = res.data.taskPic;
                    this.modal.form.taskDesc = res.data.taskDesc;
                    this.modal.form.rewardMxb = res.data.rewardMxb;
                    this.modal.form.maxMxbNum = res.data.maxMxbNum;
                    this.modal.form.fieldList = res.data.fieldList;
                }
            });
        },
        search () {
            this.getTableData();
        },
        changePageNo (index) { // 页数选择
            this.pageNo = index;
            this.getTableData();
        },
        changePageSize (size) { // 分页调试切换时
            this.pageSize = size;
            this.pageNo = 1;
            this.getTableData();
        },
        getTableData () {
            this.cleanParamsObject(this.filters);
            this.tableLoading = true;
            this.$fetch(
                {
                    url: 'api/taskScore/getTaskScoreList',
                    method: 'post',
                    data: {
                        pageSize: this.pageSize,
                        page: this.pageNo,
                        taskName: this.filters.name,
                        taskType: this.filters.taskType,
                        status: this.filters.taskStatus,
                        userRole: this.userRole
                    }
                }
            ).then(res => {
                this.tableLoading = false;
                if (res && res.code === '000') {
                    this.data = res.data.list;
                    this.total = res.data.total;
                }
            });
        }
    }

};
</script>

<style lang="less">
@import '../../../styles/common.less';
.mtC30 {
  margin-top: -30px;
}
.textWarp {
  overflow-wrap: break-word;
}
</style>
