<template>
  <el-table-column type="selection" width="55" />
  <el-table-column label="试卷名称" prop="paperName"></el-table-column>

  <el-table-column label="单选题" align="center">
    <el-table-column label="数量" prop="singleChoiceNum" width="80" align="center" />
    <el-table-column label="分值" prop="singleChoiceScore" width="80" align="center" />
  </el-table-column>

  <el-table-column label="多选题" align="center">
    <el-table-column label="数量" prop="multipleChoiceNum" width="80" align="center" />
    <el-table-column label="分值" prop="multipleChoiceScore" width="80" align="center" />
  </el-table-column>

  <el-table-column label="判断题" align="center">
    <el-table-column label="数量" prop="judgmentNum" width="80" align="center" />
    <el-table-column label="分值" prop="judgmentScore" width="80" align="center" />
  </el-table-column>

  <el-table-column label="总分值" prop="totalScore" width="100" align="center"></el-table-column>

  <el-table-column label="创建时间" min-width="120px">
    <template #default="scope">
      <div style="display: flex; align-items: center">
        <el-icon><timer /></el-icon>
        <span style="margin-left: 10px">{{ scope.row.createTime }}</span>
      </div>
    </template>
  </el-table-column>

  <el-table-column label="操作" min-width="120px" fixed="right">
    <template #default="scope">
      <el-button size="small" type="primary" plain @click="handleEdit(scope.row)"> 编辑 </el-button>
      <el-button @click="handleDelete(scope.row.id)" plain type="danger" size="small">
        删除
      </el-button>
    </template>
  </el-table-column>
</template>

<script setup lang="ts">
import { Timer } from '@element-plus/icons-vue'

const emit = defineEmits<{
  edit: [row: any]
  delete: [id: number]
}>()

const handleEdit = (row: any) => {
  emit('edit', row)
}

const handleDelete = (id: number) => {
  emit('delete', id)
}
</script>

<style lang="scss" scoped></style>
