<template>
  <el-form-item>
    <el-input placeholder="题目名称" v-model="searchForm.content" class="ex-form__item"></el-input>
  </el-form-item>
  <el-form-item>
    <el-select
      v-model="searchForm.type"
      placeholder="请选择题目类型"
      clearable
      class="ex-form__item"
      style="width: 220px"
    >
      <el-option label="单选题" :value="1" />
      <el-option label="多选题" :value="2" />
      <el-option label="判断题" :value="3" />
    </el-select>
  </el-form-item>
  <el-form-item>
    <el-date-picker v-model="searchForm.createTime" type="datetime" placeholder="创建时间" />
  </el-form-item>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

interface SearchForm {
  content: string
  type: number
  createTime?: string
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
