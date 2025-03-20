<template>
  <el-form-item>
    <el-input placeholder="考试名称" v-model="searchForm.examName" class="ex-form__item"></el-input>
  </el-form-item>
  <el-form-item>
    <el-input
      placeholder="考试内容"
      v-model="searchForm.examContent"
      class="ex-form__item"
    ></el-input>
  </el-form-item>
  <el-form-item>
    <el-date-picker v-model="searchForm.startTime" type="datetime" placeholder="选择时间" />
  </el-form-item>
  <el-form-item>
    <el-select
      v-model="searchForm.status"
      placeholder="请选择状态"
      clearable
      class="ex-form__item"
      style="width: 220px"
    >
      <el-option label="未开始" value="未开始" />
      <el-option label="进行中" value="进行中" />
      <el-option label="已结束" value="已结束" />
    </el-select>
  </el-form-item>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

interface SearchForm {
  examName: string
  examContent: string
  startTime: string
  status: string
}

const props = defineProps<{
  searchForm: SearchForm
  multipleSelection: any[]
}>()

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
