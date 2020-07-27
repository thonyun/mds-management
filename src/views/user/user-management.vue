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
        <Button type="primary"
                @click="modal1=true"
                icon="ios-add">添加用户</Button>
        <Row style="margin-top: 20px;">
          <!-- :loading="tableContent.length > 0" -->
          <!-- <Table :columns="tableTitle"
                 :loading="tableLoading"
                 :data="tableContent"></Table> -->
           <i-table :columns="columns1" :data="data1"></i-table>
        </Row>
        <Row type="flex"
             justify="space-between"
             style="margin-top: 20px;">
          <Col>
          </Col>
        </Row>
      </Card>
      </Col>
     
    </Row>
    <!-- 添加用户 -->
     <!-- <Modal
        v-model="modal1"
        title="Common Modal dialog box title"
        @on-ok="ok"
        @on-cancel="cancel">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
            <FormItem label="Name" prop="name">
                <Input v-model="formValidate.name" placeholder="输入你的名字"></Input>
            </FormItem>
            <FormItem label="E-mail" prop="mail">
                <Input v-model="formValidate.mail" placeholder="输入你的邮箱"></Input>
            </FormItem>
            <FormItem label="City" prop="city">
                <Select v-model="formValidate.city" placeholder="Select your city">
                    <Option value="beijing">New York</Option>
                    <Option value="shanghai">London</Option>
                    <Option value="shenzhen">Sydney</Option>
                </Select>
            </FormItem>
            <FormItem label="Date">
                <Row>
                    <Col span="11">
                        <FormItem prop="date">
                            <DatePicker type="date" placeholder="Select date" v-model="formValidate.date"></DatePicker>
                        </FormItem>
                    </Col>
                    <Col span="2" style="text-align: center">-</Col>
                    <Col span="11">
                        <FormItem prop="time">
                            <TimePicker type="time" placeholder="Select time" v-model="formValidate.time"></TimePicker>
                        </FormItem>
                    </Col>
                </Row>
            </FormItem>
            <FormItem label="Gender" prop="gender">
                <RadioGroup v-model="formValidate.gender">
                    <Radio label="male">Male</Radio>
                    <Radio label="female">Female</Radio>
                </RadioGroup>
            </FormItem>
            <FormItem label="Hobby" prop="interest">
                <CheckboxGroup v-model="formValidate.interest">
                    <Checkbox label="Eat"></Checkbox>
                    <Checkbox label="Sleep"></Checkbox>
                    <Checkbox label="Run"></Checkbox>
                    <Checkbox label="Movie"></Checkbox>
                </CheckboxGroup>
            </FormItem>
            <FormItem label="Desc" prop="desc">
                <Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="handleSubmit('formValidate')">Submit</Button>
                <Button @click="handleReset('formValidate')" style="margin-left: 8px">Reset</Button>
            </FormItem>
        </Form>
    </Modal> -->
    </div>  
</template>
<script>
import axios from 'axios'
import qs from 'qs'
export default {
  data() {
    return {
      //控制出现弹出框
      modal1: false,
			// 页面数据条数
			pageNums: 0,
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
      columns1: [
				{
				  title: "ID",
				  key: "id",
				  align: "center",
					minWidth: 90
				},
				{
				  title: "用户编号",
				  key: "userNo",
				  align: "center",
					minWidth: 90
				},
        {
          title: "用户姓名",
          key: "userName",
          align: "center",
					minWidth: 90
        },
        {
          title: "手机号码",
          key: "phone",
          align: "center",
					minWidth: 120
        },
				{
				  title: "头像",
				  key: "headPic",
				  align: "center",
					minWidth: 120,
					render: (h, params) => {
						if(params.row.head_pic == '') {
							return h("div", "暂无内容")
						} else {
							return h("div", [
								h("img", {
										style: {
											width: '50px',
											height: '50px'
										},
										attrs: {
											src: params.row.head_pic
										}
								},)
							])
						}
					}
				},
        {
          title: "性别",
          key: "gender",
          align: "center",
					minWidth: 90,
          render: (h, params) => {
            return h("div", params.row.gender == 1 ? "男" : "女");
          }
        },
        {
          title: "住址",
          key: "address",
          align: "center",
					minWidth: 150
        },
				{
				  title: "邮箱",
				  key: "email",
				  align: "center",
					minWidth: 150
				},
				{
				  title: "用户来源",
				  key: "source",
				  align: "center",
					minWidth: 90
				},
				{
				  title: "邀请人",
				  key: "inviteUser",
				  align: "center",
					minWidth: 90
				},
				{
				  title: "邀请商",
				  key: "inviteStore",
				  align: "center",
					minWidth: 90
				},
				{
				  title: "注册时间",
				  key: "createTime",
				  align: "center",
					minWidth: 120
				},
				{
				  title: "更新时间",
				  key: "updateTime",
				  align: "center",
					minWidth: 120
				},
				{
				  title: "状态",
				  key: "status",
				  align: "center",
					
				},
        {
          title: "操作",
          key: "action",
          fixed: "right",
          align: "center",
          width: 150,
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                {
                  style: {
                    color: "#ff373a",
                    cursor: "pointer",
                    marginRight: "10px"
                  },
                  on: {
                    click: () => {
                      console.log(params);
                      this.open(params.row._rowKey);
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
			data1: []
    };
  },
  created() {
		
  	// axios.post('http://192.168.101.15:8080/user/userList',data)
		// axios.get('http://192.168.101.16:8080/pageList?current=1&size=2')
		
		// axios({
		// 	method: 'GET',
		// 	url: 'http://192.168.101.16:8080/pageList?current=1&size=2'
		// })
		
		axios({
			method: 'POST',
			url: 'http://192.168.101.15:8080/user/userList',
			data: {
				"pageSize": 1,
				"pageNum": 1
			}
		})
		.then(res => { 
			console.log('成功', res)
			this.data1 = res.data.data
		})
		.catch(err => {
			console.log('失败', err)
		})
  },
	methods: {
    //添加分类操作
    addClassification() {},
    ok() {
      this.$Message.info("Clicked ok");
    },
    cancel() {
      this.$Message.info("Clicked cancel");
    },
    open(index) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(index => {
          this.data1.splice(index, 1);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  },
  mounted() {
    console.log(this.modal1);
  }
};
</script>
<style lang="less">
</style>
