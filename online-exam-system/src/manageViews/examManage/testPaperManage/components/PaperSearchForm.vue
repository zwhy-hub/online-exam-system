<template>
  <el-form-item>
    <el-input
      placeholder="试卷名称"
      v-model="searchForm.paperName"
      class="ex-form__item"
    ></el-input>
  </el-form-item>
  <el-form-item>
    <el-date-picker v-model="searchForm.createTime" type="datetime" placeholder="创建时间" />
  </el-form-item>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

interface SearchForm {
  paperName: string
  createTime: string
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
