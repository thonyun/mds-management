<template>
    <div>  
            <Row :gutter="24">
      <Col span="24">
      <Card>
        <p slot="title">商家审核</p>
        <Row>
          <Form >
            <FormItem>
              <Row type="flex"
                   justify="start">
              </Row>
            </FormItem>
          </Form>
        </Row>
        <Button type="primary"
                @click="modal1=true"
                >审核</Button>
        <Row style="margin-top: 20px;">
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
     <Modal
        v-model="modal1"
        title="Common Modal dialog box title"
        @on-ok="ok"
        @on-cancel="cancel">
        <!-- 表单 -->
    
    </Modal>
    </div>  
</template>
<script>
export default {
  data() {
    return {
      //控制出现弹出框
      modal1: false,
      //   iview提供的官方数据
      columns1: [
        {
          title: "用户姓名/昵称",
          key: "name",
          align: "center"
        },
        {
          title: "手机号码",
          key: "phone",
          align: "center"
        },
        {
          title: "年龄",
          key: "age",
          align: "center"
        },
        {
          title: "性别",
          key: "gender",
          align: "center",
          render: (h, params) => {
            return h("div", params.row.gender ? "男" : "女");
          }
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
                    color: "#5cadff",
                    cursor: "pointer",
                    marginRight: "10px"
                  },
                  on: {
                    click: () => {}
                  }
                },
                "待审核"
              )
            ]);
          }
        }
      ],
      data1: [
        {
          name: "王小明",
          age: 18,
          address: "北京市朝阳区芍药居",
          gender: 1,
          phone: 13512345678
        }
      ]
    };
  },
  methods: {
    //添加分类操作
    addClassification() {},
    ok() {
      this.$Message.info("Clicked ok");
    },
    cancel() {
      this.$Message.info("Clicked cancel");
    }
  },
  mounted() {}
};
</script>
<style lang="less">
.vertical-center-modal {
  display: flex;
  align-items: center;
  justify-content: center;

  .ivu-modal {
    top: 0;
  }
}
