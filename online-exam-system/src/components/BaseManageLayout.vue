<template>
  <div class="ex-container">
    <div class="ex-header">
      <el-form size="large" :inline="true" :model="searchForm" class="ex-form">
        <slot name="search-form"></slot>
      </el-form>
      <div class="ex-header__footer">
        <slot name="operation-buttons"></slot>
      </div>
    </div>
    <div class="ex-content">
      <el-table
        :data="tableData"
        style="width: 100%"
        border
        highlight-current-row
        :fit="true"
        :table-layout="'auto'"
        max-height="calc(100vh - 300px)"
        @selection-change="handleSelectionChange"
        ref="multipleTableRef"
      >
        <slot name="table-columns"></slot>
      </el-table>
      <el-pagination
        v-if="showPagination"
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="pageSizes"
        :layout="paginationLayout"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        style="margin-top: 10px"
      />
    </div>
    <slot name="dialogs"></slot>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { TableInstance } from 'element-plus'

interface Props {
  tableData: any[]
  total: number
  searchForm: Record<string, any>
  showPagination?: boolean
  pageSizes?: number[]
  paginationLayout?: string
}

const props = withDefaults(defineProps<Props>(), {
  showPagination: true,
  pageSizes: () => [5, 10, 15, 20],
  paginationLayout: 'total, sizes, prev, pager, next, jumper',
})

const emit = defineEmits<{
  (e: 'update:currentPage', page: number): void
  (e: 'update:pageSize', size: number): void
  (e: 'selection-change', selection: any[]): void
}>()

const multipleTableRef = ref<TableInstance>()
const currentPage = ref(1)
const pageSize = ref(5)

const handleSizeChange = (val: number) => {
  pageSize.value = val
  emit('update:pageSize', val)
}

const handleCurrentChange = (val: number) => {
  currentPage.value = val
  emit('update:currentPage', val)
}

const handleSelectionChange = (selection: any[]) => {
  emit('selection-change', selection)
}
</script>

<style lang="scss" scoped>
@include b(container) {
  width: 100%;
  height: 100%;
  padding: 0 20px;
}

@include b(header) {
  margin-top: 20px;
  border-radius: 10px;
  background-color: #fff;
  padding: 10px;
}

@include b(form) {
  @include e(item) {
    width: 220px;
  }
}

@include b(content) {
  border-radius: 10px;
  margin-top: 20px;
  padding: 10px;
  background-color: #fff;
}
</style>
