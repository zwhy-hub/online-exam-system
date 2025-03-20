<template>
  <base-manage-layout
    :table-data="paperList"
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
      <paper-search-form
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
      <paper-table @edit="handleEdit" @delete="handleDeleteById" />
    </template>

    <template #dialogs>
      <paper-form-dialog ref="formDialogRef" @submit="handleFormSubmit" />
    </template>
  </base-manage-layout>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import BaseManageLayout from '@/components/BaseManageLayout.vue'
import PaperSearchForm from './components/PaperSearchForm.vue'
import PaperTable from './components/PaperTable.vue'
import PaperFormDialog from './components/PaperFormDialog.vue'

interface PaperInfo {
  id: number
  paperName: string
  singleChoiceNum: number
  singleChoiceScore: number
  multipleChoiceNum: number
  multipleChoiceScore: number
  judgmentNum: number
  judgmentScore: number
  totalScore: number
  questionBankId: string
  questionBankName?: string
  createTime: string
}

interface SearchPaperForm {
  paperName: string
  createTime: string
}

const multipleSelection = ref<PaperInfo[]>([])
const currentPage = ref<number>(1)
const pageSize = ref<number>(5)
const total = ref<number>(0)
const paperList = ref<PaperInfo[]>([])
const searchForm = ref<SearchPaperForm>({
  paperName: '',
  createTime: '',
})

const formDialogRef = ref<InstanceType<typeof PaperFormDialog>>()

// 模拟数据
const mockPaperList = [
  {
    id: 1,
    paperName: 'Java期中试卷',
    singleChoiceNum: 10,
    singleChoiceScore: 5,
    multipleChoiceNum: 5,
    multipleChoiceScore: 10,
    judgmentNum: 5,
    judgmentScore: 5,
    totalScore: 150,
    questionBankId: '1',
    questionBankName: 'Java基础题库',
    createTime: '2025-03-06 14:16:37',
  },
  {
    id: 2,
    paperName: '数据库期末试卷',
    singleChoiceNum: 20,
    singleChoiceScore: 2,
    multipleChoiceNum: 10,
    multipleChoiceScore: 5,
    judgmentNum: 10,
    judgmentScore: 3,
    totalScore: 150,
    questionBankId: '2',
    questionBankName: '数据库概论题库',
    createTime: '2025-03-06 14:16:37',
  },
]

const handleSelectionChange = (val: PaperInfo[]) => {
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
  paperList.value = mockPaperList
  total.value = mockPaperList.length
}

const handleReset = () => {
  searchForm.value = {
    paperName: '',
    createTime: '',
  }
  currentPage.value = 1
  pageSize.value = 5
  handleSearch()
}

const handleDelete = () => {
  if (multipleSelection.value.length === 0) return

  ElMessageBox.confirm('确认批量删除所选试卷吗?', '提示', {
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

const handleEdit = (row: PaperInfo) => {
  formDialogRef.value?.openDialog(row.id, row)
}

const handleDeleteById = (id: number) => {
  ElMessageBox.confirm('确认删除该试卷吗?', '提示', {
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
    // 计算总分
    const totalScore =
      formData.singleChoiceNum * formData.singleChoiceScore +
      formData.multipleChoiceNum * formData.multipleChoiceScore +
      formData.judgmentNum * formData.judgmentScore

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
