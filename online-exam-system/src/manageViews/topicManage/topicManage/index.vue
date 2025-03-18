<template>
  <base-manage-layout
    :table-data="topicList"
    :total="total"
    :search-form="searchForm"
    @selection-change="handleSelectionChange"
    v-model:current-page="currentPage"
    v-model:page-size="pageSize"
  >
    <template #search-form>
      <el-form-item>
        <el-input
          placeholder="题目名称"
          v-model="searchForm.content"
          class="ex-form__item"
        ></el-input>
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
      <el-table-column label="题目名称" prop="content"></el-table-column>
      <el-table-column label="题目类型" width="120">
        <template #default="scope">
          <el-tag :type="getTopicTypeTag(scope.row.type)">
            {{ getTopicTypeLabel(scope.row.type) }}
          </el-tag>
        </template>
      </el-table-column>
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
        :title="operateId ? '编辑题目' : '新增题目'"
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
          <el-form-item label="题目名称" prop="topicName">
            <el-input
              v-model="operateFormList.content"
              placeholder="请输入题目名称"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="题目类型" prop="type">
            <el-select
              v-model="operateFormList.type"
              placeholder="请选择题目类型"
              class="ex-form__item"
            >
              <el-option label="单选题" :value="1" />
              <el-option label="多选题" :value="2" />
              <el-option label="判断题" :value="3" />
            </el-select>
          </el-form-item>
          <el-form-item label="选择题库" prop="repoIds">
            <el-select
              v-model="operateFormList.repoIds"
              multiple
              collapse-tags
              collapse-tags-tooltip
              :max-collapse-tags="3"
              placeholder="Select"
              style="width: 240px"
            >
              <el-option
                v-for="item in repos"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
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
import type { FetchTopicListResponse, SearchFormData, TopicInfoData } from '@/api/topic/type'
import type { BaseResponse } from '@/api/user/type'
import useTopicStore from '@/stores/modules/topic'
import topic from '@/api/topic'

const topicStore = useTopicStore()

interface SearchForm {
  content: string
  type: number
  createTime?: string
}

interface OperateForm {
  content: string
  type: number
  radioCorrectionList?: number[] //单选答案
  radioAswerList?: string[] //单选选项
  multipleCorrectionList?: number[] //多选答案
  multipleAnswerList?: string[] //多选选项
  judgeCorrection?: number //判断
  repoIds: number[] //题库id
}

const multipleSelection = ref<TopicInfoData[]>([])
const currentPage = ref<number>(1)
const pageSize = ref<number>(5)
const total = ref<number>(0)
const searchForm = ref<SearchForm>({
  content: '',
  type: 1,
  createTime: '',
})
const topicList = ref<TopicInfoData[]>([])
const operateDialogVisible = ref<boolean>(false)
const operateFormList = ref<OperateForm>({
  content: '',
  type: 1,
  repoIds: [],
})
const operateFormListRef = ref<FormInstance>()
const operateId = ref<number | null>(null)
const repos = ref() //题库

const contentValidate = (_rule: any, value: string, callback: (arg0?: Error) => void) => {
  if (value === '') {
    callback(new Error('请输入题目名称'))
  } else if (value.length < 2 || value.length > 100) {
    callback(new Error('题目名称长度在2-100之间'))
  } else {
    callback()
  }
}

const rules = {
  contentName: [{ required: true, validate: contentValidate, trigger: 'blur' }],
  type: [{ required: true, message: '请选择题目类型', trigger: 'change' }],
}

const getTopicTypeLabel = (type: number) => {
  switch (type) {
    case 1:
      return '单选题'
    case 2:
      return '多选题'
    case 3:
      return '判断题'
    default:
      return '未知类型'
  }
}

const getTopicTypeTag = (type: number) => {
  switch (type) {
    case 1:
      return 'success'
    case 2:
      return 'warning'
    case 3:
      return 'info'
    default:
      return 'danger'
  }
}

const handleSelectionChange = (val: TopicInfoData[]) => {
  multipleSelection.value = val
}

const handleSearch = async () => {
  try {
    const params: SearchFormData = {
      page: currentPage.value,
      limit: pageSize.value,
      data: {
        ...searchForm.value,
      },
    }
    // console.log(params)
    const res: FetchTopicListResponse | null = await topicStore.FetchTopicList(params)
    // console.log(res)
    if (res?.result.status === 1) {
      topicList.value = res.data?.records as TopicInfoData[]
      total.value = res.data?.total as number
    } else {
      console.log(res?.result.msg || '查询失败')
    }
  } catch (error) {
    console.error(error)
    ElMessage.error('查询失败')
  }
}

const handleReset = () => {
  searchForm.value = {
    content: '',
    type: 1,
    createTime: '',
  }
  handleSearch()
}

const handleDelete = async () => {
  try {
    await ElMessageBox.confirm('确认批量删除选中的题目吗?', '提示', {
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
    content: '',
    type: 1,
    repoIds: [],
  }
  operateDialogVisible.value = true
}

const handleEdit = (row: any) => {
  operateId.value = row.id
  operateFormList.value = {
    content: row.content,
    type: row.type,
    repoIds: row.repoIds,
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
      await editTopic()
    } else {
      await addTopic()
    }
    operateDialogVisible.value = false
    handleSearch()
  } catch (error) {
    console.error(error)
  }
}

const addTopic = async () => {
  try {
    // TODO: 调用添加题目接口
    console.log('添加题目:', operateFormList.value)
    ElMessage.success('添加成功')
  } catch (error) {
    console.error(error)
    ElMessage.error('添加失败')
  }
}

const editTopic = async () => {
  try {
    // TODO: 调用编辑题目接口
    console.log('编辑题目:', { id: operateId.value, ...operateFormList.value })
    ElMessage.success('编辑成功')
  } catch (error) {
    console.error(error)
    ElMessage.error('编辑失败')
  }
}

const handleDeleteById = async (id: number) => {
  try {
    await ElMessageBox.confirm('确认删除该题目吗?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    })
    // TODO: 调用删除题目接口
    console.log('删除题目ID:', id)
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
