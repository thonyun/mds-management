<template>
    <div>
            <!-- 选项二 -->
            <!-- <el-table
                ref="multipleTable"
                :data="tableData"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange">
                <el-table-column
                type="selection"
                width="55">
                </el-table-column>
                
                <el-table-column
                prop="deductionConfigName"
                label="规则"
                width="120">
                </el-table-column>
                <el-table-column
                prop="createTime"
                label="创建时间"
                width="200"
               >
                </el-table-column>
                <el-table-column
                prop="updateTime"
                label="更新时间"
                width="200">
                </el-table-column>
              <el-table-column
                prop="deductionPercent"
                label="结算比列"
                width="200">

                <template slot-scope="scope">
                    <el-form :model="scope.row">
                      <el-form-item size="mini">
                        <el-input v-if="scope.row.isOK" v-model="scope.row.deductionPercent"></el-input>
                        <span v-else>{{scope.row.deductionPercent}}</span>
                      </el-form-item>
                    </el-form>
              </template>

                </el-table-column>
            </el-table> -->

           <!-- <el-table 
           :data="tableData" 
           type="selection" 
           class="tb-edit" 
           style="width: 100%" 
           highlight-current-row
           @selection-change="handleSelectionChange"
          > -->
          <el-table
                ref="multipleTable"
                :data="tableData"
                tooltip-effect="dark"
                style="width: 100%"
                class="tb-edit"
                highlight-current-row 
                @selection-change="handleSelectionChange">
                <el-table-column
                type="selection"
                width="55">
                </el-table-column>
            <!-- <el-table-column  label="选择规则" width="180">
                <template scope="scope">
                    <el-input size="small" v-model="scope.row.id" placeholder="请输入内容" @change="handleEdit(scope.$index, scope.row)"></el-input> <span>{{scope.row.id}}</span>
                </template>
            </el-table-column> -->
            <el-table-column
                prop="name"
                label="规则"
                width="120">
            </el-table-column>
                
            <el-table-column
                prop="createTime"
                label="创建时间"
                width="200"
               >
                </el-table-column>
            <el-table-column
                prop="updateTime"
                label="更新时间"
                width="200">
          </el-table-column>

              <el-table-column  label="会员比列" width="180">
                <template scope="scope">
                    <el-input size="small" v-model="scope.row.deductionPercent" placeholder="请输入内容" @change="handleEdit(scope.$index, scope.row)"></el-input> <span>{{scope.row.deductionPercent}}</span>
                </template>
            </el-table-column>

        </el-table>

        <!-- <br>数据:{{tableData}} -->

        <!-- 下拉框 -->
        <el-select v-model="value1" style="width:800px;margin:30px 0px;"  multiple placeholder="请选择">
          <el-option
            v-for="(item,index) in options"
            :key="index"
            :label="item.label"
            :value="index">
          </el-option>
      </el-select>

              <div class="add">
                <img @click="add()" class="addImg" src="./add.png" style="witdh:28px;height:28px;"></img>
              </div>
                <div style="margin:40px">
                    <el-button @click="save()" type="primary">保存</el-button>
                    <el-button @click="toggleSelection()">取消选择</el-button>
                </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      // discount:this.discount,
      options: [],
      value1: [],
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ],

      multipleSelection: [],
      list: [],
      isMaxSelect: false
    };
  },
  props: ["getMaxSelectMerchantNo", "getMaxSelect", "discount"],
  methods: {
    add() {
      if (this.multipleSelection == "") {
        this.getMdsDeductionConfigNameList();
      } else {
        var arr = JSON.parse(JSON.stringify(this.multipleSelection));
        this.tableData = this.tableData.concat(arr);
      }
    },
    getMdsDeductionConfigNameList() {
      this.$fetch({
        url: "getMdsDeductionConfigNameList",
        method: "GET"
      }).then(res => {
        res.data.forEach(item => {
          item.name = item.deductionConfigName;
          item.deductionPercent = item.deductionPercent || 0.9;
          item.label = item.name;
        });
        var arr = JSON.parse(JSON.stringify(res.data));
        var arr_ = [];
        this.options = arr;
        this.value1.forEach(item => {
          arr_ = arr_.concat(arr[item]);
        });
        this.tableData = this.tableData.concat(arr_);
        this.value1 = [];
      });
    },
    handleCurrentChange(row, event, column) {
      console.log(row, event, column, event.currentTarget);
      // this.multipleSelection = this.multipleSelection.push(row);
    },
    handleEdit(index, row) {
      console.log("啦啦啦", index, row);
    },
    handleDelete(index, row) {
      // console.log(index, row);
    },
    handleSelectionChange(val) {
      console.log("选择val", val);
      this.multipleSelection = val;
    },
    save() {
      if (this.multipleSelection == "") {
        this.$message.error("选择不能为空");
      } else {
        var discount=0;
        this.multipleSelection.forEach(item => {
          item.merchantNo = this.getMaxSelectMerchantNo;
          item.deductionType = item.id;
          discount+=item.deductionPercent
          delete item.deductionConfigName;
          delete item.id;
          delete item.createTime;
          delete item.updateTime;
          delete item.status;
        });
        console.log("啦啦啦啦", this.multipleSelection);
        console.log(discount)
        if(discount<this.discount){
            this.$fetch({
            url: "insertMdsDeductionConfigList",
            method: "POST",
            data: this.multipleSelection
          }).then(res => {
            if (res.code == 0) {
              this.$emit("isMaxSelect", false);
              this.$message.success("保存成功");
              this.getSelectList();
            }
          });
        }else{
          this.$message.error("会员比列超出可选择比例");
        }
        
      }
    },
    getSelectList() {
      this.$fetch({
        url: "getConfigListByMerchantNo",
        method: "GET",
        params: {
          merchantNo: this.getMaxSelectMerchantNo
        }
      }).then(res => {
        if (res.code == 0) {
          console.log(res);
          this.tableData = res.data;
        }
      });
    },
    toggleSelection() {
      {
        this.$refs.multipleTable.clearSelection();
      }
    }
  },
  created() {
    this.getSelectList();
    this.getMdsDeductionConfigNameList();
    console.log("肖高杰", this.discount);
  },
  watch: {
    getMaxSelect(val, oldval) {
      console.log("val=" + val, "oldval=" + oldval);
      if (val) {
        this.getSelectList();
        this.value1 = [];
      }
    },
    value1(val) {
      console.log(val);
    }
  }
};
</script>
<style scoped>
h2 {
  margin: 20px;
}
.addImg {
  width: 28px;
  height: 28px;
  text-align: center;
  position: relative;
  left: 50%;
}
.add {
  width: 100%;
  padding: 20px;
}
.tb-edit .el-input {
  display: none;
}
.tb-edit .current-row .el-input {
  display: block;
}
.tb-edit .current-row .el-input + span {
  display: none;
}
</style>
