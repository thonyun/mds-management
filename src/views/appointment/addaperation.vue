<template>
    <div>
        <el-button type="primary" @click="add">添加</el-button>
        <el-dialog
            title="封顶金额"
            :visible.sync="isAdd"
            width="840px"
            :modal-append-to-body="false"
            >

        <el-form 
            label-width="120px" 
            :model="addForm"  
            :rules="addFormRules"
            :inline="true" 
            ref="addForm" 
            >
            <!-- 活动名称 -->
            <el-form-item label="活动名称" prop="operationName">
                <el-input @input="change($event)" v-model="addForm.operationName" clearable disabled></el-input>
            </el-form-item>
            <!-- 活动描述 -->
            <el-form-item label="活动描述" prop="operationName">
                <el-input @input="change($event)" v-model="addForm.operationDiscribition" clearable disabled></el-input>
            </el-form-item>
            <!-- 活动图片 -->
            <el-form-item label="活动描述" prop="operationPoster">
                <el-input @input="change($event)" v-model="addForm.operationPoster" clearable disabled></el-input>
            </el-form-item>
            <!-- 活动页面地址 operationAddress -->
            <el-form-item label="活动页面地址" prop="operationAddress">
                <el-input @input="change($event)" v-model="addForm.operationAddress" clearable disabled></el-input>
            </el-form-item>
            <!-- 活动开始时间 -->
            <el-form-item label="活动开始时间" prop="operationAddress">
                <el-input @input="change($event)" v-model="addForm.startTime" clearable disabled></el-input>
            </el-form-item>
            <!-- 活动结束时间 -->
            <el-form-item label="活动结束时间" prop="operationAddress">
                <el-input @input="change($event)" v-model="addForm.endTime" clearable disabled></el-input>
            </el-form-item>
            <!-- 活动页面类型 -->
            <el-form-item label="活动页面类型" prop="schema">
                <el-select v-model="sizeForm.groupNo" filterable placeholder="请选择" clearable>
                <el-option
                  v-for="item in groupName"
                  :key="item.id"
                  :label="item.groupName"
                  :value="item.groupNo">
                </el-option>
              </el-select>
            </el-form-item>
        <!-- 保存按钮 -->
        <el-form-item style="margin-left:120px" size="large">
            <el-button type="primary" @click="onSave" >保存修改</el-button>
            <el-button @click="dialogVisible=false">取消</el-button>
        </el-form-item>

        </el-form>
    </el-dialog>
    
    </div>
</template>
<script>
export default {
  data() {
    return {
      isAdd: false
    };
  },
  methods: {
    add() {}
  }
};
</script>
<style scoped>
</style>
