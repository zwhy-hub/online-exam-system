<template>
  <base-manage-layout
    :table-data="questionBankList"
    :total="total"
    :search-form="searchForm"
    @selection-change="handleSelectionChange"
    v-model:current-page="currentPage"
    v-model:page-size="pageSize"
    @update:current-page="handleCurrentChange"
    @update:page-size="handleSizeChange"
  >
    <template #search-form>
      <el-form-item>
        <el-input
          placeholder="题库名称"
          v-model="searchForm.data.title"
          class="ex-form__item"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="searchForm.data.startTime"
          type="datetime"
          placeholder="创建时间"
        />
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
      <el-table-column label="题库名称" prop="title"></el-table-column>
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
            :disabled="currentUserId !== scope.row.createUserId"
          >
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
          <el-form-item label="题库名称" prop="title">
            <el-input
              v-model="operateFormList.title"
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
import type {
  OperateQuestionBankData,
  FetchQuestionBankList,
  FetchQuestionBankListResponse,
  QurstionBankInfoData,
} from '@/api/topic/type'
import useTopicStore from '@/stores/modules/topic'
import type { BaseResponse } from '@/api/topic/type'
import useUserStore from '@/stores/modules/user'

const userStore = useUserStore()
const topicStore = useTopicStore()
interface OperateForm {
  title: string
}
const multipleSelection = ref<QurstionBankInfoData[]>([])
const currentPage = ref<number>(1)
const pageSize = ref<number>(5)
const total = ref<number>(0)
const searchForm = ref({
  data: {
    title: '',
    startTime: '',
  },
})
const questionBankList = ref<QurstionBankInfoData[]>([])
const operateDialogVisible = ref<boolean>(false)
const operateFormList = ref<OperateForm>({
  title: '',
})
const operateFormListRef = ref<FormInstance>()
const operateId = ref<number | null>(null)
const currentUserId = userStore.user?.id as number

const titleValidate = (_rule: any, value: string, callback: (arg0?: Error) => void) => {
  if (value === '') {
    callback(new Error('请输入题库名称'))
  } else if (value.length < 2 || value.length > 100) {
    callback(new Error('题库名称长度在2-100之间'))
  } else {
    callback()
  }
}

const rules = {
  title: [{ required: true, validate: titleValidate, trigger: 'blur' }],
}

const handleSelectionChange = (val: QurstionBankInfoData[]) => {
  multipleSelection.value = val
}

const handleSearch = async () => {
  try {
    const params: FetchQuestionBankList = {
      page: currentPage.value,
      limit: pageSize.value,
      data: searchForm.value.data,
    }
    // console.log(params)
    const res: FetchQuestionBankListResponse | null = await topicStore.FetchQuestionBank(params)
    // console.log(res)
    if (res?.result.status === 1) {
      questionBankList.value = res.data.records
      total.value = res.data.total
    } else {
      console.log(res?.result.msg || '查询失败')
    }
  } catch (error) {
    console.error(error)
    ElMessage.error('查询失败')
  }
}

const handleReset = () => {
  currentPage.value = 1
  pageSize.value = 5
  searchForm.value = {
    data: {
      title: '',
      startTime: '',
    },
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
    title: '',
  }
  operateDialogVisible.value = true
}

const handleEdit = (row: any) => {
  operateId.value = row.id
  operateFormList.value = {
    title: row.title,
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
    const params: OperateQuestionBankData = {
      msg: '',
      code: '',
      data: {
        title: operateFormList.value.title,
      },
    }
    // console.log(id, params)
    const res: BaseResponse | null = await topicStore.AddQuestionBank(currentUserId, params)
    // console.log(res)
    if (res?.result.status === 1) {
      ElMessage.success('添加成功')
      handleSearch()
    }
  } catch (error) {
    console.error(error)
    ElMessage.error('添加失败')
  }
}

const editQuestionBank = async () => {
  try {
    const params: OperateQuestionBankData = {
      msg: '',
      code: '',
      data: {
        title: operateFormList.value.title,
      },
    }
    console.log(params)
    const res: BaseResponse | null = await topicStore.EditQuestionBank(
      operateId.value as number,
      params,
    )
    console.log(res)
    if (res?.result.status === 1) {
      ElMessage.success('编辑成功')
      handleSearch()
    }
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
    const res: BaseResponse | null = await topicStore.DeleteQuestionBank(id)
    if (res?.result.status === 1) {
      console.log('删除题库ID:', id)
      ElMessage.success('删除成功')
      handleSearch()
    } else {
      ElMessage.warning(res?.result.msg || '删除失败')
    }
  } catch (error) {
    if (error !== 'cancel') {
      console.error(error)
      ElMessage.error('删除失败')
    }
  }
}

const handleSizeChange = (val: number) => {
  // console.log(val)
  pageSize.value = val
  currentPage.value = 1
  handleSearch()
}

const handleCurrentChange = (val: number) => {
  // console.log(val)
  currentPage.value = val
  handleSearch()
}

onMounted(() => {
  handleSearch()
})
</script>

<style lang="scss" scoped></style>
