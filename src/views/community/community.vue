<template>
    <div>  
            <Row :gutter="24">
      <Col span="24">
      <Card>
        <p slot="title">社区管理</p>
        <Row>
          <Form >
            <FormItem> 
              <Row type="flex"
                   justify="start">
              </Row>
            </FormItem>
          </Form>
        </Row>
				
				<Row 
					type="flex"
					justify="space-between">
					<el-button type="primary"
					        @click="addClass"
					        icon="ios-add"
									size="small">添加社区</el-button>
					<div class="query">
						<el-input v-model.trim="queryKey" size="small" placeholder="请输入查询条件" clearable></el-input>
						<el-button type="primary" size="small" @click='classQuery'>查询</el-button>
					</div>
				</Row>
				
				
        <Row style="margin-top: 20px;">
           <i-table :columns="columns" :data="pageData" ></i-table>
        </Row>
        <Row type="flex"
             justify="end"
             style="margin-top: 20px;">
          <Col>
						<el-pagination
									
									:hide-on-single-page="true"
									@current-change='changePage'
						      :current-page="pageNum"
						      :page-size="pageSize"
						      layout="total, prev, pager, next, jumper"
						      :total="total">
						    </el-pagination>
          </Col>
        </Row>
      </Card>
      </Col>
     
    </Row>
		<Modal :value.sync="communtiyDialog" :title="modalTitle" :closable="false" :mask-closable="false">
			<el-form :model="communtiyForm" :rules="rules" ref='communtiyForm'>
				<el-form-item label="社区名称:" prop="name">
					<el-input v-model.trim="communtiyForm.name" placeholder="请输入社区名称"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer">
				<el-button type="primary" @click="ok('communtiyForm')">提交</el-button>
				<el-button type="infor" @click="cancel">取消</el-button>
			</div>
		</Modal>
    </div>  
</template>
<script>
import addclassify from '../components/add_classify.vue'
import axios from 'axios'
export default {
	components: {
		addclassify
	},
  data() {
    return {
			dialogVisible: false,
			dialogData: {},
			communtiyDialog: false,
			hovers: false,
			options: {},
			rules: {
				name: [
					{required: true, message: '请输入社区名称', trigger: 'blur'}
				]
			},
			modalTitle: '',
			groupID: null,
			pageSize: 10,
			type: 1,
			// 当前页数
			pageNum: 1,
			total: 0,
      //控制出现弹出框
      modal: false,
			// 查询关键字
			queryKey: '',
			// 新增分类数据
			communtiyForm: {
				name: ''
			},
      columns: [
				{
					title: 'ID',
					key: 'id',
					align: 'center'
				},
				{
					title: '社区名称',
					key: 'groupName',
					align: 'center'
				},
				{
					title: '社区编号',
					key: 'groupNo',
					align: 'center'
				},
				{
					title: '创建时间',
					key: 'createTime',
					align: 'center'
				},
        {
          title: "操作",
          key: "action",
          fixed: "right",
          align: "center",
          width: 200,
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                {
                  style: {
                    color: "#409eff",
                    cursor: "pointer",
                    marginRight: "10px"
                  },
                  on: {
                    click: () => {
											this.modalTitle = '编辑'
											this.communtiyDialog = true
											this.groupID = params.row.id
											this.communtiyForm.name = params.row.groupName
                      console.log('编辑', params);
                    }
                  }
                },
                "编辑"
              ),
							h(
							  "span",
							  {
							    style: {
							      color: "#ff373a",
							      cursor: "pointer",
							      // marginRight: "10px"
							    },
							    on: {
							      click: () => {
							        // console.log(params);
							        this.open(params.row.id);
							      }
							    }
							  },
							  "删除"
							),
            ]);
          }
        }
      ],
      pageData: [],
    };
  },
	created() {
		this.getPageData()
	},
	computed: {},
	// 侦听器
	watch: {},
  methods: {
		getPageData() {
			this.$fetch({
				method: 'get',
				url: 'getMdsGroupPage?size=' + this.pageSize + '&current=' + this.pageNum
			})
			.then(res => {
				this.pageData = res.data.records
				this.total = res.data.total
				// console.log('成功', res)
			})
			.catch(err => {
				console.log('失败', err)
			})
		},
    //添加分类操作
    addClass() {
			this.communtiyDialog = true
			this.modalTitle = '添加社区'
		},
		ok(form) {
			var that = this;
			that.$refs[form].validate((valid) => {
				if (valid) {
					var data = {}
					if (that.modalTitle == '编辑') {
						data = {
							url: 'updateMdsGroup',
							method: 'put',
							data: {
								id: that.groupID,
								groupName: that.communtiyForm.name
							}
						} 
					} else if (that.modalTitle == '添加社区') {
						data = {
							url: 'addMdsGroup',
							method: 'post',
							data: {
								groupName: that.communtiyForm.name
							}
						}
					}
					that
						.$fetch(data)
						.then(res => {
							if (res.code === 0) {
								that.$message.success('添加成功');
								that.communtiyDialog = false;
								that.getPageData()
							}
						})
						.catch(err => {
							that.$message.error('提交失败');
						});
				}
			})
		},
		cancel() {
			this.communtiyDialog = false;
		},
		// 删除分类
    open(index) {
      this.$confirm("此操作将永久删除该分类, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(res => {
					// console.log(index)
          this.$fetch({
          	method: 'get',
          	url: 'deleteMdsGroup?id=' + index
          })
          .then(res => {
          	this.$Message.success("删除成功");
						
						this.getPageData()
          	// console.log('删除成功', res)
          })
          .catch(err => {
						
          	this.$Message.error("删除失败");
          	console.log('删除失败', err)
          })
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消删除"
          });
        });
    },
		// 查询
		classQuery() {
			this.queryKey = this.queryKey.replace(/\s+/g, "")
			let queryKey = this.queryKey
			if (queryKey == '') {
				this.getPageData()
			} else {
				// console.log('查询', this.pageSize, this.pageNum)
				this.$fetch({
					method: 'get',
					url: `getMdsGroupPage?groupName=${queryKey}&size=${this.pageSize}&current=1`
				})
				.then(res => {
					// 查询成功后的操作
					this.pageData = res.data.records
					this.total = res.data.total
					console.log(res)
				})
				.catch(err => {
					// 查询失败
					console.log("查询失败", err)
					this.$message.error('查询失败')
				})
			}
		},
		// 分类编辑
		editClass(params) {
			
			// console.log(params)
		},
		changePage(e) {
			this.pageNum = e
			this.getPageData()
		},
  },
	watch: {
		communtiyDialog:function() {
			if (this.communtiyDialog == false) {
				this.communtiyForm.name = ''
			}
		}
	},
  mounted() {
    // console.log(this.modal);
  }
};
</script>
<style lang="less">
	.query {
		display: inline-block;
		
		& > .el-input {
			width: 150px;
			margin-right: 10px;
		}
	}
</style>
