<template>
  <base-manage-layout
    :table-data="questionBankList"
    :total="total"
    :search-form="searchForm"
    @selection-change="handleSelectionChange"
    v-model:current-page="currentPage"
    v-model:page-size="pageSize"
  >
    <template #search-form>
      <el-form-item>
        <el-input
          placeholder="题库名称"
          v-model="searchForm.bankName"
          class="ex-form__item"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-date-picker v-model="searchForm.createTime" type="datetime" placeholder="创建时间" />
      </el-form-item>
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
      <el-table-column type="selection" width="55" />
      <el-table-column label="题库名称" prop="bankName"></el-table-column>
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
          <el-button size="small" type="primary" plain @click="handleEdit(scope.row)">
            编辑
          </el-button>
          <el-button @click="handleDeleteById(scope.row.id)" plain type="danger" size="small">
            删除
          </el-button>
        </template>
      </el-table-column>
    </template>

    <template #dialogs>
      <el-dialog
        v-model="operateDialogVisible"
        :title="operateId ? '编辑题库' : '新增题库'"
        width="500"
        :before-close="handleClose"
      >
        <el-form
          ref="operateFormListRef"
          style="max-width: 600px"
          :model="operateFormList"
          status-icon
          :rules="rules"
          label-width="auto"
          class="ex-operateFormList"
        >
          <el-form-item label="题库名称" prop="bankName">
            <el-input
              v-model="operateFormList.bankName"
              placeholder="请输入题库名称"
              clearable
            ></el-input>
          </el-form-item>
        </el-form>
        <template #footer>
          <div class="dialog-footer">
            <el-button @click="operateDialogVisible = false">取消</el-button>
            <el-button type="primary" @click="handleDialogOperate(operateFormListRef)">
              确定
            </el-button>
          </div>
        </template>
      </el-dialog>
    </template>
  </base-manage-layout>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { FormInstance } from 'element-plus'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Timer } from '@element-plus/icons-vue'
import BaseManageLayout from '@/components/BaseManageLayout.vue'

interface QuestionBankInfo {
  id: number
  bankName: string
  createTime: string
}

interface SearchForm {
  bankName: string
  createTime: string | null
}

interface OperateForm {
  bankName: string
}

const multipleSelection = ref<QuestionBankInfo[]>([])
const currentPage = ref<number>(1)
const pageSize = ref<number>(5)
const total = ref<number>(0)

const searchForm = ref<SearchForm>({
  bankName: '',
  createTime: null,
})

const questionBankList = ref<QuestionBankInfo[]>([])
const operateDialogVisible = ref<boolean>(false)
const operateFormList = ref<OperateForm>({
  bankName: '',
})
const operateFormListRef = ref<FormInstance>()
const operateId = ref<number | null>(null)

const bankNameValidate = (_rule: any, value: string, callback: (arg0?: Error) => void) => {
  if (value === '') {
    callback(new Error('请输入题库名称'))
  } else if (value.length < 2 || value.length > 100) {
    callback(new Error('题库名称长度在2-100之间'))
  } else {
    callback()
  }
}

const rules = {
  bankName: [{ required: true, validate: bankNameValidate, trigger: 'blur' }],
}

const handleSelectionChange = (val: QuestionBankInfo[]) => {
  multipleSelection.value = val
}

const handleSearch = async () => {
  try {
    // TODO: 实现题库查询逻辑
    const mockData: QuestionBankInfo[] = [
      {
        id: 1,
        bankName: '测试题库1',
        createTime: '2024-03-20 10:00:00',
      },
      {
        id: 2,
        bankName: '测试题库2',
        createTime: '2024-03-20 11:00:00',
      },
    ]
    questionBankList.value = mockData
    total.value = mockData.length
  } catch (error) {
    console.error(error)
    ElMessage.error('查询失败')
  }
}

const handleReset = () => {
  searchForm.value = {
    bankName: '',
    createTime: null,
  }
  handleSearch()
}

const handleDelete = async () => {
  try {
    await ElMessageBox.confirm('确认批量删除选中的题库吗?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    })
    const ids = multipleSelection.value.map((item) => item.id)
    // TODO: 调用批量删除接口
    console.log('批量删除的ID:', ids)
    ElMessage.success('删除成功')
    handleSearch()
  } catch (error) {
    if (error !== 'cancel') {
      console.error(error)
      ElMessage.error('删除失败')
    }
  }
}

const handleAdd = () => {
  operateId.value = null
  operateFormList.value = {
    bankName: '',
  }
  operateDialogVisible.value = true
}

const handleEdit = (row: QuestionBankInfo) => {
  operateId.value = row.id
  operateFormList.value = {
    bankName: row.bankName,
  }
  operateDialogVisible.value = true
}

const handleClose = (done: () => void) => {
  ElMessageBox.confirm('确认要关闭吗?')
    .then(() => {
      done()
    })
    .catch(() => {})
}

const handleDialogOperate = async (formEl: FormInstance | undefined) => {
  if (!formEl) return

  try {
    await formEl.validate()
    if (operateId.value) {
      await editQuestionBank()
    } else {
      await addQuestionBank()
    }
    operateDialogVisible.value = false
    handleSearch()
  } catch (error) {
    console.error(error)
  }
}

const addQuestionBank = async () => {
  try {
    // TODO: 调用添加题库接口
    console.log('添加题库:', operateFormList.value)
    ElMessage.success('添加成功')
  } catch (error) {
    console.error(error)
    ElMessage.error('添加失败')
  }
}

const editQuestionBank = async () => {
  try {
    // TODO: 调用编辑题库接口
    console.log('编辑题库:', { id: operateId.value, ...operateFormList.value })
    ElMessage.success('编辑成功')
  } catch (error) {
    console.error(error)
    ElMessage.error('编辑失败')
  }
}

const handleDeleteById = async (id: number) => {
  try {
    await ElMessageBox.confirm('确认删除该题库吗?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    })
    // TODO: 调用删除题库接口
    console.log('删除题库ID:', id)
    ElMessage.success('删除成功')
    handleSearch()
  } catch (error) {
    if (error !== 'cancel') {
      console.error(error)
      ElMessage.error('删除失败')
    }
  }
}

onMounted(() => {
  handleSearch()
})
</script>

<style lang="scss" scoped></style>
