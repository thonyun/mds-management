<template>
    <div>  
            <Row :gutter="24">
      <Col span="24">
      <Card>
        <p slot="title">分类</p>
        <Row>
          <Form >
            <FormItem> 
              <Row type="flex"
                   justify="start">
                <!--<Col span="2" style="text-align: right;">注册时间：</Col>-->
                <!--<Col span="6">-->
                <!--<DatePicker :value="formItem.date" type="daterange" split-panels-->
                <!--placeholder="请选择" style="width: 200px"-->
                <!--@on-change="checkTime"-->
                <!--&gt;</DatePicker>-->
                <!--</Col>-->
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
									size="small">添加分类</el-button>
					<div class="query">
						<el-input v-model="queryKey" size="small" placeholder="请输入查询条件" clearable></el-input>
						<el-button type="primary" size="small" @click='classQuery'>查询</el-button>
					</div>
				</Row>
				
				
        <Row style="margin-top: 20px;">
          <!-- :loading="tableContent.length > 0" -->
          <!-- <Table :columns="tableTitle"
                 :loading="tableLoading"
                 :data="tableContent"></Table> -->
					
					<!-- .slice((pageNum - 1) * pageSize, pageNum * pageSize) -->
           <i-table :columns="columns" :data="pageData" ></i-table>
								
        </Row>
        <Row type="flex"
             justify="end"
             style="margin-top: 20px;">
          <Col>
						<el-pagination
									
									:hide-on-single-page="true"
									@prev-clivk='prevPage'
									@next-click='nextPage'
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
		<addclassify :show-dialog='showDialog' @closeDialog="closeDialog"></addclassify>
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
			showDialog: false,
			hovers: false,
			options: {},
			rules: {
				className: [
					{required: true, message: '请输入分类名称', trigger: 'blur'}
				]
			},
			pageSize: 10,
			type: 1,
			// 当前页数
			pageNum: 1,
			total: 0,
      //控制出现弹出框
      modal: false,
			// 查询关键字
			queryKey: '',
			modalTitle: '',
			// 新增分类数据
			form: {
				id: null,
				className: ''
			},
      //   iview提供的官方数据
      formValidate: {
        name: "",
        mail: "",
        city: "",
        gender: "",
        interest: [],
        date: "",
        time: "",
        desc: ""
      },
      ruleValidate: {
        name: [
          {
            required: true,
            message: "The name cannot be empty",
            trigger: "blur"
          }
        ],
        mail: [
          {
            required: true,
            message: "Mailbox cannot be empty",
            trigger: "blur"
          },
          { type: "email", message: "Incorrect email format", trigger: "blur" }
        ],
        city: [
          {
            required: true,
            message: "Please select the city",
            trigger: "change"
          }
        ],
        gender: [
          { required: true, message: "Please select gender", trigger: "change" }
        ],
        interest: [
          {
            required: true,
            type: "array",
            min: 1,
            message: "Choose at least one hobby",
            trigger: "change"
          },
          {
            type: "array",
            max: 2,
            message: "Choose two hobbies at best",
            trigger: "change"
          }
        ],
        date: [
          {
            required: true,
            type: "date",
            message: "Please select the date",
            trigger: "change"
          }
        ],
        time: [
          {
            required: true,
            type: "string",
            message: "Please select time",
            trigger: "change"
          }
        ],
        desc: [
          {
            required: true,
            message: "Please enter a personal introduction",
            trigger: "blur"
          },
          {
            type: "string",
            min: 20,
            message: "Introduce no less than 20 words",
            trigger: "blur"
          }
        ]
      },
      columns: [
				{
					title: 'ID',
					key: 'id',
					align: 'center'
				},
				{
					title: '分类名称',
					key: 'name',
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
							h("span", {
								style: {
									color: '#409eff',
									cursor: 'pointer',
									marginRight: '10px'
								},
								on: {
									click:() => {
										this.$store.commit('changeType', 2)
										this.$store.commit('changeForm', params.row)
										this.showDialog = !this.showDialog
									}
								}
							},
							"添加子分类"
							),
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
											this.$store.commit('changeType', 3)
											this.$store.commit('changeForm', params.row)
											this.showDialog = !this.showDialog
                      // console.log('编辑', this.$store.state.addClassForm);
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
				url: 'categoryOpt/queryAllCategory?pageSize=' + this.pageSize + '&pageNum=' + this.pageNum
			})
			.then(res => {
				this.pageData = res.data.records
				this.total = res.data.total
				console.log('成功', res)
			})
			.catch(err => {
				console.log('失败', err)
			})
		},
    //添加分类操作
    addClass() {
			this.$store.commit('changeType', 1)
			this.showDialog = !this.showDialog
		},
		closeDialog(code) {
			if (code === 1) {
				// 失败
			} else if (code === 2) {
				// 成功
				this.getPageData()
			}
			this.showDialog = !this.showDialog
		},
   //  },
    cancel() {
      this.$Message.info("提交取消");
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
          	method: 'delete',
          	url: 'categoryOpt/category/' + index
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
				this.$fetch({
					method: 'get',
					url: `categoryOpt/queryCategoryByKey?key=${queryKey}&pageSize=${this.pageSize}&pageNum=${this.pageNum}`
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
		prevPage() {
			console.log('上一页')
		},
		changePage(e) {
			this.pageNum = e
			this.getPageData()
		},
		nextPage() {
			console.log('下一页')
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
