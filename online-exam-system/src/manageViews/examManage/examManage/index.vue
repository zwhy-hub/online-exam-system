<template>
  <base-manage-layout
    :table-data="examList"
    :total="total"
    :search-form="searchForm"
    :current-page="currentPage"
    :page-size="pageSize"
    @update:current-page="handleCurrentChange"
    @update:page-size="handleSizeChange"
    @selection-change="handleSelectionChange"
    :show-pagination="true"
    :page-sizes="[5, 10, 15, 20]"
    :pagination-layout="'total, sizes, prev, pager, next, jumper'"
  >
    <template #search-form>
      <exam-search-form
        :search-form="searchForm"
        :multiple-selection="multipleSelection"
        @search="handleSearch"
        @reset="handleReset"
        @delete="handleDelete"
        @add="handleAdd"
      />
    </template>

    <template #operation-buttons>
      <el-button type="primary" plain @click="handleSearch" style="width: 100px">查询</el-button>
      <el-button type="primary" plain @click="handleReset" style="width: 100px">重置</el-button>
      <el-button
        type="danger"
        plain
        @click="handleDelete"
        style="width: 100px"
        :disabled="multipleSelection.length === 0"
      >
        批量删除
      </el-button>
      <el-button type="primary" plain @click="handleAdd" style="width: 100px">新增</el-button>
    </template>

    <template #table-columns>
      <exam-table @edit="handleEdit" @delete="handleDeleteById" />
    </template>

    <template #dialogs>
      <exam-form-dialog ref="formDialogRef" @submit="handleFormSubmit" />
    </template>
  </base-manage-layout>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import BaseManageLayout from '@/components/BaseManageLayout.vue'
import ExamSearchForm from './components/ExamSearchForm.vue'
import ExamTable from './components/ExamTable.vue'
import ExamFormDialog from './components/ExamFormDialog.vue'

interface ExamInfo {
  id: number
  examName: string
  examContent: string
  paperId: string
  paperName: string
  classId: string
  className: string
  status: string
  startTime: string
  endTime: string
  duration: number
  examTime: number
  createTime: string
}

interface SearchExamForm {
  examName: string
  examContent: string
  status: string
  startTime: string
}

const multipleSelection = ref<ExamInfo[]>([])
const currentPage = ref<number>(1)
const pageSize = ref<number>(5)
const total = ref<number>(0)
const examList = ref<ExamInfo[]>([])
const searchForm = ref<SearchExamForm>({
  examName: '',
  examContent: '',
  status: '',
  startTime: '',
})

const formDialogRef = ref<InstanceType<typeof ExamFormDialog>>()

// 模拟数据
const mockExamList = [
  {
    id: 1,
    examName: 'Java期中考试',
    examContent: 'Java基础知识考核',
    paperId: '1',
    paperName: 'Java期中试卷',
    classId: '1',
    className: '计算机1班',
    status: '未开始',
    startTime: '2023-03-20 09:00:00',
    endTime: '2023-03-20 11:00:00',
    duration: 120,
    examTime: 120,
    createTime: '2023-03-15 10:00:00',
  },
]

const handleSelectionChange = (val: ExamInfo[]) => {
  multipleSelection.value = val
}

const handleSizeChange = (val: number) => {
  pageSize.value = val
  currentPage.value = 1
  handleSearch()
}

const handleCurrentChange = (val: number) => {
  currentPage.value = val
  handleSearch()
}

const handleSearch = async () => {
  // 模拟API调用
  examList.value = mockExamList
  total.value = mockExamList.length
}

const handleReset = () => {
  searchForm.value = {
    examName: '',
    examContent: '',
    status: '',
    startTime: '',
  }
  currentPage.value = 1
  pageSize.value = 5
  handleSearch()
}

const handleDelete = () => {
  if (multipleSelection.value.length === 0) return

  ElMessageBox.confirm('确认批量删除所选考试吗?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(() => {
      ElMessage.success('批量删除成功')
      handleSearch()
    })
    .catch(() => {
      ElMessage.info('已取消删除')
    })
}

const handleAdd = () => {
  formDialogRef.value?.openDialog()
}

const handleEdit = (row: ExamInfo) => {
  formDialogRef.value?.openDialog(row.id, row)
}

const handleDeleteById = (id: number) => {
  ElMessageBox.confirm('确认删除该考试吗?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(() => {
      ElMessage.success('删除成功')
      handleSearch()
    })
    .catch(() => {
      ElMessage.info('已取消删除')
    })
}

const handleFormSubmit = async (
  operateId: number | null,
  formData: any,
  closeDialog: () => void,
) => {
  try {
    if (operateId) {
      ElMessage.success('编辑成功')
    } else {
      ElMessage.success('添加成功')
    }
    closeDialog()
    handleSearch()
  } catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  handleSearch()
})
</script>

<style lang="scss" scoped></style>
