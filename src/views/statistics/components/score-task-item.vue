<template>
  <div>
    <Modal v-model="modal.visit"
           title="积分任务详情"
           :mask-closable="false"
           @on-cancel="resetForm">
      <Form ref="modal"
            :model="modal.form"
            :label-width="150"
            style="margin:0 auto;">
        <FormItem label="任务名称：">
          {{modal.form.taskName}}
        </FormItem>
        <FormItem label="任务类别：">
          {{modal.form.taskGroupName}}
        </FormItem>
        <FormItem label="限制次数：">
          {{modal.form.taskLimitTypeDesc}}
        </FormItem>
        <FormItem label="可获得妈星币个数：">
          {{modal.form.taskAddMxb}} 个
        </FormItem>
        <FormItem label="可获得成长值：">
          {{modal.form.taskAddMlz}}
        </FormItem>
        <FormItem label="可获得雨露值：">
          {{modal.form.taskAddJkz}}
        </FormItem>
        <FormItem label="奖励发放方式：">
          {{modal.form.automaticAwardDesc}}
        </FormItem>
        <FormItem label="适用客户端：">
          {{modal.form.showUserDesc}}
        </FormItem>
        <FormItem label="在客户端显示：">
          {{modal.form.isShowDesc}}
        </FormItem>
        <FormItem label="启用状态：">
          {{modal.form.statusDesc}}
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
      <p slot="title">
        <Icon type="ios-photos"></Icon>
        积分任务列表
      </p>
      <Row type="flex"
           justify="end">
        <Col>
        <Button type="primary"
                @click="handleAdd">新增 +</Button>
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
                        :true-value="1"
                        :false-value="0"
                        @on-change="changeStatus(props.row)">
                <span slot="open">启用</span>
                <span slot="close">停用</span>
              </i-switch>
            </div>
          </template>
        </Table>
      </Row>
      <Row type="flex"
           justify="end"
           class="margin-top-10"
           v-if="!isChangeSort">
        <Col>
        <Button type="primary"
                @click="changeSort">修改排序</Button>
        </Col>
      </Row>
      <Row type="flex"
           justify="end"
           class="margin-top-10"
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

    </Card>
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
	            date: [],
	            isChangeSort: false,
	            saveChangeSortloding: false,
	            modal: {
	                visit: false,
	                form: {
	                    taskName: '',
	                    taskAddMxb: '',
	                    taskAddMlz: '',
	                    automaticAwardDesc: '',
	                    showUserDesc: '',
	                    isShowDesc: '',
	                    statusDesc: '',
	                    taskGroupName: '',
	                    taskLimitTypeDesc: '',
	                    taskAddJkz: ''
	                }
	            },
	            remindModal: false,
	            ExamTypeList: [],
	            routeName: 'score-task',
	            show: true,
	            tableLoading: false,
	            data: [],
	            columns: [
	                {title: '任务名称', align: 'center', key: 'taskName'},
	                {title: '任务类别', align: 'center', key: 'taskType'},
	                {
	                    title: '可获得妈星币个数/次', align: 'center', key: 'taskAddMxb'
	                },
	                {
	                    title: '可获得成长值', align: 'center', key: 'taskAddMlz'
	                },
	                {
	                    title: '可获得雨露值', align: 'center', key: 'taskAddJkz'
	                },
	                {
	                    title: '奖励发放方式', align: 'center', key: 'automaticAwardDesc'
	                },
	                {
	                    title: '状态',
                    align: 'center',
                    key: 'statusDesc',
	                    render: (h, params) => {
	                        return this.$refs.table.$scopedSlots.state({
	                            row: params.row
	                        });
	                    }
	                },
	                {title: '创建时间', align: 'center', key: 'createdAt'},
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
	                        if (params.row.status == '0') {
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
	                                            this.goToEdit(params.row.taskId);
	                                        }
	                                    }
	                                }, '编辑'), h('span', {
	                                    attrs: {
	                                        class: 'c-red pointer'
	                                    },
	                                    on: {
	                                        click: () => {
	                                            this.handleDelete(params.row.taskId);
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
	                                    this.getUserTaskConfigDetail(params.row.taskId);
	                                }
	                            }
	                        }, '详情');
	                    }
	                }
	            ],
	            filters: {
	                name: '',
	                showUser: this.showUser
	            }
	        };
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
	        saveChangeSort () {
	            if (this.isRepeat()) {
	                let b = [];
	                this.data.forEach(item => {
	                    b.push({
	                        taskId: item.taskId,
	                        sort: item.sort
	                    });
	                });
	                this.saveChangeSortloding = true;
	                this.$fetch({
	                    url: '/api/userTaskConfig/sort',
	                    method: 'post',
	                    data: {data: JSON.stringify(b)}
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
	            this.isChangeSort = true;
	        },
	        cancelChangeSort () {
	            this.isChangeSort = false;
	            this.getRouteData(this);
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
	                        url: 'api/userTaskConfig/deleteUserTaskConfig',
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
	                path: '/statistics/edit-score-task',
	                query: {
	                    id: val
	                }
	            });
	        },
	        changeStatus (val) {
	            this.tableLoading = true;
	            this.$fetch({
	                url: 'api/userTaskConfig/updateUserTaskConfigStatus',
	                method: 'post',
	                data: {
	                    id: val.taskId,
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
	                path: '/statistics/add-score-task'
	            });
	        },
	        handleRestSearch () {
	            this.resetSearch();
	        },
	        getUserTaskConfigDetail (val) {
	            this.$fetch({
	                url: '/api/userTaskConfig/getUserTaskConfigDetail',
	                method: 'post',
	                data: {
	                    id: val
	                }
	            }).then(res => {
	                if (res && res.code === '000') {
	                    this.modal.visit = true;
	                    this.modal.form.taskName = res.data.taskName;
	                    this.modal.form.taskAddMxb = res.data.taskAddMxb;
	                    this.modal.form.actionKindDesc = res.data.actionKindDesc;
	                    this.modal.form.taskAddMlz = res.data.taskAddMlz;
	                    this.modal.form.taskAddJkz = res.data.taskAddJkz;
	                    this.modal.form.automaticAwardDesc = res.data.automaticAwardDesc;
	                    this.modal.form.showUserDesc = res.data.showUserDesc;
	                    this.modal.form.isShowDesc = res.data.isShowDesc;
	                    this.modal.form.statusDesc = res.data.statusDesc;
	                    this.modal.form.taskGroupName = res.data.taskGroupName;
	                    this.modal.form.taskLimitTypeDesc = res.data.taskLimitTypeDesc;
	                }
	            });
	        },
	        skipToDetails (val) {
	            this.$router.push({
	                path: '/finance/distributor-details',
	                query: {
	                    id: val
	                }
	            });
	        },
	        resetSearch () {
	            this.filters.name = '';
	        },
	        search () {
	            this.getTableData();
	        },
	        getTableData () {
	            this.cleanParamsObject(this.filters);
	            this.tableLoading = true;
	            this.$fetch(
	                {
	                    url: 'api/userTaskConfig/getUserTaskConfigList',
	                    method: 'post',
	                    data: this.filters
	                }
	            ).then(res => {
	                this.tableLoading = false;
	                if (res && res.code === '000') {
	                    this.data = res.data;
	                }
	            });
	        }
	    },
	    created () {
	        this.getTableData();
	    }
	};
</script>

<style lang="less">
@import '../../../styles/common.less';
</style>
