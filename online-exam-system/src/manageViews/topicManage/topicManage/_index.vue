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
        width="700"
        :before-close="handleClose"
      >
        <el-form
          ref="operateFormListRef"
          style="max-width: 700px"
          :model="operateFormList"
          status-icon
          :rules="rules"
          label-width="auto"
          class="ex-operateFormList"
        >
          <el-form-item label="题目名称" prop="content">
            <el-input
              v-model="operateFormList.content"
              placeholder="请输入题目名称"
              clearable
              style="width: 240px"
            ></el-input>
          </el-form-item>
          <el-form-item label="题目类型" prop="type">
            <el-select
              v-model="operateFormList.type"
              placeholder="请选择题目类型"
              class="ex-form__item"
              style="width: 240px"
              @change="
                () => {
                  steps.splice(1, steps.length)
                }
              "
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
                :key="item.id"
                :label="item.title"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item
            label="选项"
            props="steps"
            v-if="operateFormList.type === 1 || operateFormList.type === 2"
          >
            <div v-for="(item, index) in steps">
              <el-input
                style="width: 240px; margin-right: 20px"
                v-model="item.selectInfo"
                placeholder="请输入选项"
              ></el-input>
              <el-checkbox
                v-model="item.checked"
                label="正确"
                size="large"
                style="margin-right: 20px"
                :disabled="
                  operateFormList.type === 1 &&
                  steps.filter((item) => item.checked).length > 0 &&
                  !item.checked
                "
              />
              <el-button type="primary" plain @click="addStep" v-if="index === steps.length - 1">
                添加选项
              </el-button>
              <el-button
                type="danger"
                plain
                @click="removeStep(index)"
                v-if="index !== 0 && index !== 1"
              >
                删除
              </el-button>
            </div>
          </el-form-item>
          <el-form-item label="答案" v-if="operateFormList.type === 3">
            <el-radio-group v-model="steps[0].checked">
              <el-radio label="0">错误</el-radio>
              <el-radio label="1">正确</el-radio>
            </el-radio-group>
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
import { onMounted, reactive, ref } from 'vue'
import type { FormInstance } from 'element-plus'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Timer } from '@element-plus/icons-vue'
import BaseManageLayout from '@/components/BaseManageLayout.vue'
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
const operateDialogVisible = ref<boolean>(false)
const operateFormList = ref<OperateForm>({
  content: '',
  type: 1,
  repoIds: [],
})
type FetchTopicDetail = {
  id: number[]
  content: string
  type: number
  answerList: {
    id: number
    content: string
    correctFlag: number
    questionId: number
  }[]
  judgeCorrection?: number
}

const currentTopic = ref<FetchTopicDetail>({
  content: '',
  type: 1,
  answerList: [],
  id: [],
})
const operateFormListRef = ref<FormInstance>()
const operateId = ref<number | null>(null)
const repos = ref<QurstionBankInfoData[]>([]) //题库
const steps = reactive<Steps[]>([
  {
    selectInfo: '',
    checked: false,
  },
  {
    selectInfo: '',
    checked: false,
  },
])
const rules = {
  content: [{ required: true, message: '请输入题目名称', trigger: 'blur' }],
  type: [{ required: true, message: '请选择题目类型', trigger: 'change' }],
  repoIds: [{ required: true, message: '请选择题库类型', trigger: 'blur' }],
  steps: [
    {
      validator: (_rule: any, _value: any, callback: any) => {
        if (operateFormList.value.type === 1 || operateFormList.value.type === 2) {
          if (steps.length < 2) {
            callback(new Error('至少需要2个选项'))
          } else if (steps.some((item) => !item.selectInfo)) {
            callback(new Error('所有选项内容不能为空'))
          } else if (
            operateFormList.value.type === 1 &&
            steps.filter((item) => item.checked).length !== 1
          ) {
            callback(new Error('单选题必须选择一个正确答案'))
          } else if (
            operateFormList.value.type === 2 &&
            steps.filter((item) => item.checked).length === 0
          ) {
            callback(new Error('多选题必须至少选择一个正确答案'))
          } else {
            callback()
          }
        } else {
          callback()
        }
      },
      trigger: 'change',
    },
  ],
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
  getQuestionBankList()
}

const handleEdit = (row: any) => {
  operateId.value = row.id
  fetchTopicDetails(row.id)
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
    if (operateFormList.value.type === 1 || operateFormList.value.type === 2) {
      if (steps.some((item) => !item.selectInfo)) {
        ElMessage.error('所有选项内容不能为空')
        return
      }
      if (operateFormList.value.type === 1 && steps.filter((item) => item.checked).length !== 1) {
        ElMessage.error('单选题必须选择一个正确答案')
        return
      }
      if (operateFormList.value.type === 2 && steps.filter((item) => item.checked).length === 0) {
        ElMessage.error('多选题必须至少选择一个正确答案')
        return
      }
    }
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
    const params: OperateTopic = {
      msg: '',
      code: '',
      data: {
        ...operateFormList.value,
      },
    }
    if (operateFormList.value.type === 1) {
      params.data.radioCorrectionList = steps.map((item) => (item.checked ? 1 : 0))
      params.data.radioAnswerList = steps.map((item) => item.selectInfo)
    } else if (operateFormList.value.type === 2) {
      params.data.multipleCorrectionList = steps.map((item) => (item.checked ? 1 : 0))
      params.data.multipleAnswerList = steps.map((item) => item.selectInfo)
    } else if (operateFormList.value.type === 3) {
      params.data.judgeCorrection = steps.findIndex((item) => item.checked)
    }
    console.log(params)
    const res: BaseResponse | null = await topicStore.AddTopic(currentUserId as number, params)
    console.log(res)
    if (res?.result.status === 1) {
      ElMessage.success('添加成功')
      handleReset()
      operateDialogVisible.value = false
    } else {
      ElMessage.error(res?.result.msg || '添加失败')
    }
  } catch (error) {
    console.error(error)
    ElMessage.error('添加失败')
  }
}

const editTopic = async () => {
  try {
    const params: OperateTopic = {
      msg: '',
      code: '',
      data: {
        ...operateFormList.value,
      },
    }
    const topicId = operateId.value as number
    if (operateFormList.value.type === 1) {
      params.data.radioCorrectionList = steps.map((item) => (item.checked ? 1 : 0))
      params.data.radioAnswerList = steps.map((item) => item.selectInfo)
    } else if (operateFormList.value.type === 2) {
      params.data.multipleCorrectionList = steps.map((item) => (item.checked ? 1 : 0))
      params.data.multipleAnswerList = steps.map((item) => item.selectInfo)
    } else if (operateFormList.value.type === 3) {
      params.data.judgeCorrection = steps.findIndex((item) => item.checked)
    }
    console.log(params)
    const res: BaseResponse | null = await topicStore.EditTopic(topicId, params)
    console.log(res)
    if (res?.result.status === 1) {
      ElMessage.success('编辑成功')
      handleReset()
      operateDialogVisible.value = false
    } else {
      ElMessage.error(res?.result.msg || '编辑失败')
    }
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

// ... existing code ...
const fetchTopicDetails = async (id: number) => {
  try {
    const res: FetchTopicDetailResponse | null = await topicStore.FetchTopicDetail(id)
    console.log(res)

    if (res?.result.status === 1) {
      const data = res.data as FetchTopicDetail
      operateFormList.value = {
        content: data.content,
        type: data.type,
        repoIds: data.id || [],
      }

      // 清空所有步骤
      steps.splice(0, steps.length)

      if (data.type === 1) {
        data.answerList.forEach((item) => {
          steps.push({
            selectInfo: item.content,
            checked: item.correctFlag === 1,
          })
        })
      } else if (data.type === 2) {
        data.answerList.forEach((item) => {
          steps.push({
            selectInfo: item.content,
            checked: item.correctFlag === 1,
          })
        })
      } else if (data.type === 3) {
        steps.push({
          selectInfo: '正确',
          checked: data.judgeCorrection === 1,
        })
        steps.push({
          selectInfo: '错误',
          checked: data.judgeCorrection === 0,
        })
      }
      getQuestionBankList()
    } else {
      ElMessage.error(res?.result.msg || '获取题目详情失败')
    }
  } catch (error) {
    console.error(error)
  }
}

// 添加选项
const addStep = () => {
  if (steps.length >= 7) {
    ElMessage.warning('最多添加7个选项')
    return
  }
  steps.push({
    selectInfo: '',
    checked: false,
  })
}

// 删除选项
const removeStep = (index: any) => {
  if (steps.length === 2) {
    ElMessage.warning('至少保留2个选项')
    return
  }
  steps.splice(index, 1)
}
onMounted(() => {
  handleSearch()
})
</script>

<style lang="scss" scoped></style>
