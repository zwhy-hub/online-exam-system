<template>
  <el-table-column type="selection" width="55" />
  <el-table-column label="题目名称" prop="content"></el-table-column>
  <el-table-column label="题目类型" width="120">
    <template #default="scope">
      <el-tag :type="getTopicTypeTag(scope.row.type)">
        {{ getTopicTypeLabel(scope.row.type) }}
      </el-tag>
    </template>
  </el-table-column>
  <el-table-column label="创建时间" min-width="120px">
    <template #default="scope">
      <div style="display: flex; align-items: center">
        <el-icon><Timer /></el-icon>
        <span style="margin-left: 10px">{{ scope.row.createTime }}</span>
      </div>
    </template>
  </el-table-column>
  <el-table-column label="操作" min-width="120px">
    <template #default="scope">
      <el-button
        size="small"
        type="primary"
        plain
        @click="handleEdit(scope.row)"
      >
        编辑
      </el-button>
      <el-button
        @click="handleDelete(scope.row.id)"
        plain
        type="danger"
        size="small"
      >
        删除
      </el-button>
    </template>
  </el-table-column>
</template>

<script setup lang="ts">
import { Timer } from '@element-plus/icons-vue';
import { defineEmits } from 'vue';

const emit = defineEmits<{
  edit: [row: any];
  delete: [id: number];
}>();

const getTopicTypeLabel = (type: number) => {
  switch (type) {
    case 1:
      return '单选题';
    case 2:
      return '多选题';
    case 3:
      return '判断题';
    default:
      return '未知类型';
  }
};

const getTopicTypeTag = (type: number) => {
  switch (type) {
    case 1:
      return 'success';
    case 2:
      return 'warning';
    case 3:
      return 'info';
    default:
      return 'danger';
  }
};

const handleEdit = (row: any) => {
  emit('edit', row);
};

const handleDelete = (id: number) => {
  emit('delete', id);
};
</script>

<style lang="scss" scoped></style>
