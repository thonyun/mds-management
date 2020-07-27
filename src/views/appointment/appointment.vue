<template>
    <div>
        <!-- 卡片 -->
    <el-card class="box-card">
        <!-- 标题 -->
        <div slot="header" class="clearfix">
            <span>空调预约</span>
        </div>
        <!-- 搜索框 -->
    <el-row :gutter="20">
        <el-col :span="4"><el-input v-model="content" width="100%" placeholder="请输入内容"></el-input></el-col>
        <el-col :span="12"><el-button type="primary" @click="search">搜索</el-button></el-col>
        <el-col :span="2"><el-button type="primary" @click="add">添加</el-button></el-col>
    </el-row>
    <!-- 所有预约订单 -->
     <el-table
    :data="operationList"
    border
    style="width: 100%;margin-top:50px">
    <el-table-column
      prop="operationNo"
      label="活动编号"
      width="180">
    </el-table-column>
    <el-table-column
      prop="operationName"
      label="活动名称"
      width="140">
    </el-table-column>
    <el-table-column
      prop="operationDiscribition"
      label="活动描述"
      width="140">
    </el-table-column>
    <el-table-column
      prop="operationPoster"
      label="活动图片"
      width="140">
    </el-table-column>
    <el-table-column
      prop="operationAddress"
      label="活动页面地址"
      width="180">
    </el-table-column>
    <el-table-column
      prop="createTime"
      label="活动开始时间"
      width="180">
    </el-table-column>
    <el-table-column
      prop="updateTime"
      label="活动更新时间"
      width="180">
    </el-table-column>
    <el-table-column
      prop="endTime"
      label="活动结束时间"
      >
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="160"
  >
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
        <el-button type="text" size="small">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
    </el-card>

    </div>
</template>
<script>
export default {
  data() {
    return {
      content: "",
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1517 弄",
          zip: 200333
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1519 弄",
          zip: 200333
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1516 弄",
          zip: 200333
        }
      ],
      operationList: []
    };
  },
  methods: {
    handleClick(row) {
      console.log(row);
    },
    // 这是添加
    add(){

    },
    // 这是搜索
    search(){

    },
    getOperationList() {
      this.$fetch({
        url: "api/operation/operationList",
        method: "GET",
        params: {
          pageSize: 10,
          pageNum: 1
        }
      }).then(res => {
        console.log("获取列表xgj", res);
        this.operationList = res.data.records;
      });
    }
  },
  created() {
    this.getOperationList();
  }
};
</script>
<style scoped>
.clearfix > span {
  font: bold 14px arial, sans-serif;
}
</style>

