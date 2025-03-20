<template>
  <el-dialog
    v-model="dialogVisible"
    :title="isEdit ? '编辑题目' : '新增题目'"
    width="700"
    :before-close="handleClose"
  >
    <el-form
      ref="formRef"
      style="max-width: 700px"
      :model="formData"
      status-icon
      :rules="rules"
      label-width="auto"
      class="ex-operateFormList"
    >
      <el-form-item label="题目名称" prop="content">
        <el-input
          v-model="formData.content"
          placeholder="请输入题目名称"
          clearable
          style="width: 240px"
        ></el-input>
      </el-form-item>
      <el-form-item label="题目类型" prop="type">
        <el-select
          v-model="formData.type"
          placeholder="请选择题目类型"
          class="ex-form__item"
          style="width: 240px"
          @change="handleTypeChange"
        >
          <el-option label="单选题" :value="1" />
          <el-option label="多选题" :value="2" />
          <el-option label="判断题" :value="3" />
        </el-select>
      </el-form-item>
      <el-form-item label="选择题库" prop="repoIds">
        <el-select
          v-model="formData.repoIds"
          multiple
          collapse-tags
          collapse-tags-tooltip
          :max-collapse-tags="3"
          placeholder="Select"
          style="width: 240px"
        >
          <el-option v-for="item in repos" :key="item.id" :label="item.title" :value="item.id" />
        </el-select>
      </el-form-item>

      <!-- 单选/多选题选项 -->
      <el-form-item label="选项" prop="steps" v-if="formData.type === 1 || formData.type === 2">
        <topic-options v-model:steps="steps" :topic-type="formData.type" />
      </el-form-item>

      <!-- 判断题选项 -->
      <template v-if="formData.type === 3">
        <topic-judge v-model="judgeAnswer" />
      </template>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="closeDialog">取消</el-button>
        <el-button type="primary" @click="submitForm">确定</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, defineExpose, reactive, computed, watch } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import TopicOptions from './TopicOptions.vue'
import TopicJudge from './TopicJudge.vue'

interface Steps {
  selectInfo: string
  checked: boolean
}

interface FormData {
  content: string
  type: number
  repoIds: number[]
}

interface Props {
  repos: any[]
}

const props = withDefaults(defineProps<Props>(), {
  repos: () => [],
})

const emit = defineEmits<{
  submit: [operateId: number | null, formData: any, steps: Steps[], closeDialog: () => void]
  'update:modelValue': [value: boolean]
}>()

const dialogVisible = ref(false)
const isEdit = ref(false)
const formRef = ref<FormInstance>()
const formData = ref<FormData>({
  content: '',
  type: 1,
  repoIds: [],
})
const steps = ref<Steps[]>([
  { selectInfo: '', checked: false },
  { selectInfo: '', checked: false },
])
const judgeAnswer = ref('0')
const operateId = ref<number | null>(null)

const rules = reactive<FormRules>({
  content: [{ required: true, message: '请输入题目名称', trigger: 'blur' }],
  type: [{ required: true, message: '请选择题目类型', trigger: 'change' }],
  repoIds: [{ required: true, message: '请选择题库类型', trigger: 'blur' }],
  steps: [
    {
      validator: (_rule: any, _value: any, callback: any) => {
        if (formData.value.type === 1 || formData.value.type === 2) {
          if (steps.value.length < 2) {
            callback(new Error('至少需要2个选项'))
          } else if (steps.value.some((item) => !item.selectInfo)) {
            callback(new Error('所有选项内容不能为空'))
          } else if (
            formData.value.type === 1 &&
            steps.value.filter((item) => item.checked).length !== 1
          ) {
            callback(new Error('单选题必须选择一个正确答案'))
          } else if (
            formData.value.type === 2 &&
            steps.value.filter((item) => item.checked).length === 0
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
})

// 处理题目类型变更
const handleTypeChange = () => {
  if (formData.value.type === 3) {
    // 判断题重置
    judgeAnswer.value = '0'
  } else {
    // 单选/多选重置选项
    steps.value = [
      { selectInfo: '', checked: false },
      { selectInfo: '', checked: false },
    ]
  }
}

// 关闭对话框
const handleClose = (done: () => void) => {
  ElMessageBox.confirm('确认要关闭吗?')
    .then(() => {
      done()
    })
    .catch(() => {})
}

const closeDialog = () => {
  dialogVisible.value = false
}

// 提交表单
const submitForm = async () => {
  if (!formRef.value) return

  try {
    await formRef.value.validate()
    // 验证选项
    if (formData.value.type === 1 || formData.value.type === 2) {
      if (steps.value.some((item) => !item.selectInfo)) {
        ElMessage.error('所有选项内容不能为空')
        return
      }
      if (formData.value.type === 1 && steps.value.filter((item) => item.checked).length !== 1) {
        ElMessage.error('单选题必须选择一个正确答案')
        return
      }
      if (formData.value.type === 2 && steps.value.filter((item) => item.checked).length === 0) {
        ElMessage.error('多选题必须至少选择一个正确答案')
        return
      }
    }

    // 触发提交事件，传递数据
    const dataToSubmit = {
      ...formData.value,
      judgeAnswer: formData.value.type === 3 ? judgeAnswer.value : undefined,
    }

    emit('submit', operateId.value, dataToSubmit, steps.value, closeDialog)
  } catch (error) {
    console.error(error)
  }
}

// 打开对话框
const openDialog = (data?: any) => {
  dialogVisible.value = true

  if (data) {
    // console.log(data)
    operateId.value = data.id
    // 编辑模式
    isEdit.value = true
    formData.value = {
      content: data.content,
      type: data.type,
      repoIds: data.repoIds || [],
    }

    // 设置选项数据
    if (data.type === 1 || data.type === 2) {
      steps.value = data.steps || [
        { selectInfo: '', checked: false },
        { selectInfo: '', checked: false },
      ]
    } else if (data.type === 3) {
      judgeAnswer.value = data.judgeAnswer || '0'
    }
  } else {
    // 新增模式
    isEdit.value = false
    formData.value = {
      content: '',
      type: 1,
      repoIds: [],
    }
    steps.value = [
      { selectInfo: '', checked: false },
      { selectInfo: '', checked: false },
    ]
    judgeAnswer.value = '0'
  }
}

// 暴露方法给父组件
defineExpose({
  openDialog,
})
</script>

<style lang="scss" scoped></style>
