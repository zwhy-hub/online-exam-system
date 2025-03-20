<template>
  <el-table-column type="selection" :selectable="selectable" width="55" />
  <el-table-column label="用户名" prop="username"></el-table-column>
  <el-table-column label="姓名" prop="name"></el-table-column>
  <el-table-column label="头像" prop="img"></el-table-column>
  <el-table-column
    label="邮箱"
    prop="email"
    show-overflow-tooltip
  ></el-table-column>
  <el-table-column
    label="手机号"
    prop="phone"
    show-overflow-tooltip
  ></el-table-column>
  <el-table-column label="注册时间" min-width="120px">
    <template #default="scope">
      <div style="display: flex; align-items: center">
        <el-icon><timer /></el-icon>
        <span style="margin-left: 10px">{{ scope.row.createTime }}</span>
      </div>
    </template>
  </el-table-column>
  <el-table-column label="锁定状态" prop="lockFlag">
    <template #default="scope">
      <el-tag v-if="scope.row.lockFlag === 0" type="success">未锁定</el-tag>
      <el-tag v-if="scope.row.lockFlag === 1" type="danger">已锁定</el-tag>
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
import type { UserInfoData } from '@/api/user/type';

const emit = defineEmits<{
  edit: [row: any];
  delete: [id: number];
}>();

const selectable = (row: UserInfoData) => {
  return row.role !== 4;
};

const handleEdit = (row: any) => {
  emit('edit', row);
};

const handleDelete = (id: number) => {
  emit('delete', id);
};
</script>

<style lang="scss" scoped></style>
