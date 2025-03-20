<template>
  <Base-manage-layout
    :table-data="topicList"
    :total="total"
    :search-form="searchForm"
    @update:current-page="handleCurrentChange"
    @update:page-size="handleSizeChange"
    @selection-change="handleSelectionChange"
    v-model:current-page="currentPage"
    v-model:page-size="pageSize"
  >
    <template #search-form>
      <Topic-search-form
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
      <Topic-table @edit="handleEdit" @delete="handleDeleteById" />
    </template>

    <template #dialogs>
      <Topic-form-dialog ref="formDialogRef" :repos="repos" @submit="handleFormSubmit" />
    </template>
  </Base-manage-layout>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import BaseManageLayout from '@/components/BaseManageLayout.vue'
import TopicSearchForm from './components/TopicSearchForm.vue'
import TopicTable from './components/TopicTable.vue'
import TopicFormDialog from './components/TopicFormDialog.vue'
import type {
  FetchTopicListResponse,
  GetQuestionBankList,
  OperateTopic,
  QurstionBankInfoData,
  SearchFormData,
  TopicInfoData,
  BaseResponse,
  FetchTopicDetailResponse,
} from '@/api/topic/type'
import useTopicStore from '@/stores/modules/topic'
import useUserStore from '@/stores/modules/user'

interface SearchForm {
  content: string
  type: number
  createTime?: string
}

interface Steps {
  selectInfo: string
  checked: boolean
}

const userStore = useUserStore()
const currentUserId = userStore.user?.id
const topicStore = useTopicStore()
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
const repos = ref<QurstionBankInfoData[]>([])
const formDialogRef = ref<InstanceType<typeof TopicFormDialog>>()

// 处理表格选择变化
const handleSelectionChange = (val: TopicInfoData[]) => {
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

// 搜索
const handleSearch = async () => {
  try {
    const params: SearchFormData = {
      page: currentPage.value,
      limit: pageSize.value,
      data: {
        ...searchForm.value,
      },
    }
    const res: FetchTopicListResponse | null = await topicStore.FetchTopicList(params)
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

// 重置
const handleReset = () => {
  searchForm.value = {
    content: '',
    type: 1,
    createTime: '',
  }
  handleSearch()
}

// 批量删除
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

// 添加题目
const handleAdd = () => {
  getQuestionBankList()
  formDialogRef.value?.openDialog()
}

// 编辑题目
const handleEdit = (row: any) => {
  getQuestionBankList()
  fetchTopicDetails(row.id)
}

// 获取题库列表
const getQuestionBankList = async () => {
  try {
    const res: GetQuestionBankList | null = await topicStore.GetQuestionBankList()
    if (res?.result.status === 1 && res.data) {
      repos.value = res.data
    }
  } catch (error) {
    console.log(error)
  }
}

// 获取题目详情
const fetchTopicDetails = async (id: number) => {
  try {
    const res: FetchTopicDetailResponse | null = await topicStore.FetchTopicDetail(id)
    if (res?.result.status === 1 && res.data) {
      const data = res.data
      const questionBankList = await getRepoListById(id)
      // 创建用于编辑的表单数据
      const formData = {
        id,
        content: data.content,
        type: data.type,
        repoIds: questionBankList?.map((item) => item.id),
      }
      // 处理答案数据
      let steps: Steps[] = []
      let judgeAnswer = '0'
      if (data.type === 1 || data.type === 2) {
        steps = data.answerList.map((item: any) => ({
          selectInfo: item.content,
          checked: item.correctFlag === 1,
        }))
      } else if (data.type === 3) {
        judgeAnswer = data.judgeCorrection === 1 ? '1' : '0'
      }
      // 打开编辑对话框
      formDialogRef.value?.openDialog({
        ...formData,
        steps,
        judgeAnswer,
      })
    } else {
      ElMessage.error(res?.result.msg || '获取题目详情失败')
    }
  } catch (error) {
    console.error(error)
  }
}

//根据题目id获取题库列表
const getRepoListById = async (id: number) => {
  try {
    const res = await topicStore.FetchQuestionBankByTopicId(id)
    if (res?.result.status === 1 && res.data) {
      return res.data
    }
  } catch (error) {
    console.log(error)
  }
}

// 处理表单提交
const handleFormSubmit = async (
  id: number | null,
  formData: any,
  steps: Steps[],
  closeDialog: () => void,
) => {
  try {
    const params: OperateTopic = {
      msg: '',
      code: '',
      data: {
        ...formData,
      },
    }
    console.log('提交的数据:', params, 'id:', id)

    // 处理不同题型的数据
    if (formData.type === 1) {
      params.data.radioCorrectionList = steps.map((item) => (item.checked ? 1 : 0))
      params.data.radioAnswerList = steps.map((item) => item.selectInfo)
    } else if (formData.type === 2) {
      params.data.multipleCorrectionList = steps.map((item) => (item.checked ? 1 : 0))
      params.data.multipleAnswerList = steps.map((item) => item.selectInfo)
    } else if (formData.type === 3) {
      params.data.judgeCorrection = formData.judgeAnswer === '1' ? 1 : 0
    }
    let res
    // 区分新增和编辑
    if (id) {
      // 编辑
      res = await topicStore.EditTopic(id, params)
    } else {
      // 新增
      res = await topicStore.AddTopic(currentUserId as number, params)
    }

    if (res?.result.status === 1) {
      ElMessage.success(id ? '编辑成功' : '添加成功')
      closeDialog()
      handleSearch()
    } else {
      ElMessage.error(res?.result.msg || (id ? '编辑失败' : '添加失败'))
    }
  } catch (error) {
    console.error(error)
    ElMessage.error(id ? '编辑失败' : '添加失败')
  }
}

// 删除题目
const handleDeleteById = async (id: number) => {
  try {
    await ElMessageBox.confirm('确认删除该题目吗?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    })
    const res: BaseResponse | null = await topicStore.DeleteTopic(id)
    if (res?.result.status === 1) {
      ElMessage.success('删除成功')
      handleSearch()
    } else {
      ElMessage.error(res?.result.msg || '删除失败')
    }
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
