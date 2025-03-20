<template>
  <el-table-column type="selection" width="55" />
  <el-table-column label="考试名称" prop="examName"></el-table-column>
  <el-table-column label="简述内容" prop="examContent" show-overflow-tooltip></el-table-column>
  <el-table-column label="试卷" prop="paperName"></el-table-column>
  <el-table-column label="考试班级" prop="className"></el-table-column>
  <el-table-column label="状态" prop="status">
    <template #default="scope">
      <el-tag v-if="scope.row.status === '未开始'" type="info">未开始</el-tag>
      <el-tag v-if="scope.row.status === '进行中'" type="success">进行中</el-tag>
      <el-tag v-if="scope.row.status === '已结束'" type="warning">已结束</el-tag>
    </template>
  </el-table-column>
  <el-table-column label="开始时间" min-width="120px">
    <template #default="scope">
      <div style="display: flex; align-items: center">
        <el-icon><timer /></el-icon>
        <span style="margin-left: 10px">{{ scope.row.startTime }}</span>
      </div>
    </template>
  </el-table-column>
  <el-table-column label="结束时间" min-width="120px">
    <template #default="scope">
      <div style="display: flex; align-items: center">
        <el-icon><timer /></el-icon>
        <span style="margin-left: 10px">{{ scope.row.endTime }}</span>
      </div>
    </template>
  </el-table-column>
  <el-table-column label="用时(分钟)" prop="duration"></el-table-column>
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
