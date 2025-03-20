<template>
  <el-form-item>
    <el-input placeholder="用户名" v-model="searchForm.username" class="ex-form__item"></el-input>
  </el-form-item>
  <el-form-item>
    <el-input placeholder="姓名" v-model="searchForm.name" class="ex-form__item"></el-input>
  </el-form-item>
  <el-form-item>
    <el-date-picker v-model="searchForm.startTime" type="datetime" placeholder="选择时间" />
  </el-form-item>
  <el-form-item>
    <el-select
      v-model="searchForm.role"
      placeholder="请选择角色"
      clearable
      class="ex-form__item"
      style="width: 220px"
      :disabled="currentUser === 2"
    >
      <el-option label="学生" :value="1" />
      <el-option label="管理员" :value="3" />
      <el-option label="超级管理员" :value="4" />
      <el-option label="老师" :value="2" />
    </el-select>
  </el-form-item>
  <el-form-item>
    <el-select
      v-model="searchForm.lockFlag"
      placeholder="请选择锁定状态"
      clearable
      class="ex-form__item"
      style="width: 220px"
    >
      <el-option label="未锁定" :value="0" />
      <el-option label="已锁定" :value="1" />
    </el-select>
  </el-form-item>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import useUserStore from '@/stores/modules/user'

interface SearchForm {
  username?: string
  name?: string
  startTime?: string
  role: number
  lockFlag?: number
}

const props = defineProps<{
  searchForm: SearchForm
  multipleSelection: any[]
}>()

const userStore = useUserStore()
const currentUser = userStore.user?.role

const emit = defineEmits<{
  'update:searchForm': [value: SearchForm]
  search: []
  reset: []
  delete: []
  add: []
}>()

const handleSearch = () => {
  emit('search')
}

const handleReset = () => {
  emit('reset')
}

const handleDelete = () => {
  emit('delete')
}

const handleAdd = () => {
  emit('add')
}
</script>

<style lang="scss" scoped></style>
