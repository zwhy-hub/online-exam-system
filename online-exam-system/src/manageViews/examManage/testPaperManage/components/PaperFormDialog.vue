<template>
  <el-dialog
    v-model="dialogVisible"
    :title="operateId ? '编辑试卷' : '添加试卷'"
    width="50%"
    @close="handleClose"
  >
    <el-form
      ref="formRef"
      :model="formData"
      label-width="120px"
      :rules="rules"
      style="max-height: 70vh; overflow-y: auto"
    >
      <el-form-item label="试卷名称" prop="paperName">
        <el-input v-model="formData.paperName" placeholder="请输入试卷名称" />
      </el-form-item>

      <el-divider content-position="center">单选题设置</el-divider>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="题目数量" prop="singleChoiceNum">
            <el-input-number
              v-model="formData.singleChoiceNum"
              :min="0"
              :max="100"
              controls-position="right"
              @change="calculateTotalScore"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="每题分值" prop="singleChoiceScore">
            <el-input-number
              v-model="formData.singleChoiceScore"
              :min="0"
              :max="100"
              :precision="1"
              :step="0.5"
              controls-position="right"
              @change="calculateTotalScore"
            />
          </el-form-item>
        </el-col>
      </el-row>

      <el-divider content-position="center">多选题设置</el-divider>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="题目数量" prop="multipleChoiceNum">
            <el-input-number
              v-model="formData.multipleChoiceNum"
              :min="0"
              :max="100"
              controls-position="right"
              @change="calculateTotalScore"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="每题分值" prop="multipleChoiceScore">
            <el-input-number
              v-model="formData.multipleChoiceScore"
              :min="0"
              :max="100"
              :precision="1"
              :step="0.5"
              controls-position="right"
              @change="calculateTotalScore"
            />
          </el-form-item>
        </el-col>
      </el-row>

      <el-divider content-position="center">判断题设置</el-divider>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="题目数量" prop="judgmentNum">
            <el-input-number
              v-model="formData.judgmentNum"
              :min="0"
              :max="100"
              controls-position="right"
              @change="calculateTotalScore"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="每题分值" prop="judgmentScore">
            <el-input-number
              v-model="formData.judgmentScore"
              :min="0"
              :max="100"
              :precision="1"
              :step="0.5"
              controls-position="right"
              @change="calculateTotalScore"
            />
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item label="总分值">
        <el-tag size="large" type="success">{{ totalScore }}</el-tag>
      </el-form-item>

      <el-form-item label="选择题库" prop="questionBankId">
        <el-select v-model="formData.questionBankId" placeholder="请选择题库">
          <el-option label="Java基础题库" value="1" />
          <el-option label="数据库概论题库" value="2" />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitForm">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, defineEmits, defineExpose, computed } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'

interface FormData {
  paperName: string
  singleChoiceNum: number
  singleChoiceScore: number
  multipleChoiceNum: number
  multipleChoiceScore: number
  judgmentNum: number
  judgmentScore: number
  questionBankId: string
}

const emit = defineEmits<{
  submit: [operateId: number | null, formData: FormData, closeDialog: () => void]
}>()

const dialogVisible = ref(false)
const operateId = ref<number | null>(null)
const formRef = ref<FormInstance>()

const formData = ref<FormData>({
  paperName: '',
  singleChoiceNum: 10,
  singleChoiceScore: 5,
  multipleChoiceNum: 5,
  multipleChoiceScore: 10,
  judgmentNum: 5,
  judgmentScore: 5,
  questionBankId: '',
})

const totalScore = ref(0)

const calculateTotalScore = () => {
  totalScore.value =
    formData.value.singleChoiceNum * formData.value.singleChoiceScore +
    formData.value.multipleChoiceNum * formData.value.multipleChoiceScore +
    formData.value.judgmentNum * formData.value.judgmentScore
}

const rules = ref<FormRules>({
  paperName: [{ required: true, message: '请输入试卷名称', trigger: 'blur' }],
  singleChoiceNum: [{ required: true, message: '请输入单选题数量', trigger: 'blur' }],
  singleChoiceScore: [{ required: true, message: '请输入单选题分值', trigger: 'blur' }],
  multipleChoiceNum: [{ required: true, message: '请输入多选题数量', trigger: 'blur' }],
  multipleChoiceScore: [{ required: true, message: '请输入多选题分值', trigger: 'blur' }],
  judgmentNum: [{ required: true, message: '请输入判断题数量', trigger: 'blur' }],
  judgmentScore: [{ required: true, message: '请输入判断题分值', trigger: 'blur' }],
  questionBankId: [{ required: true, message: '请选择题库', trigger: 'change' }],
})

const resetForm = () => {
  formData.value = {
    paperName: '',
    singleChoiceNum: 10,
    singleChoiceScore: 5,
    multipleChoiceNum: 5,
    multipleChoiceScore: 10,
    judgmentNum: 5,
    judgmentScore: 5,
    questionBankId: '',
  }
  calculateTotalScore()
}

const handleClose = () => {
  resetForm()
  dialogVisible.value = false
}

const submitForm = async () => {
  if (!formRef.value) return

  try {
    await formRef.value.validate((valid) => {
      if (valid) {
        emit('submit', operateId.value, formData.value, () => {
          dialogVisible.value = false
          resetForm()
        })
      }
    })
  } catch (error) {
    console.log('表单验证失败', error)
  }
}

// 对外暴露的方法
const openDialog = (id?: number, row?: any) => {
  dialogVisible.value = true
  if (id && row) {
    operateId.value = id
    formData.value = {
      paperName: row.paperName || '',
      singleChoiceNum: row.singleChoiceNum || 10,
      singleChoiceScore: row.singleChoiceScore || 5,
      multipleChoiceNum: row.multipleChoiceNum || 5,
      multipleChoiceScore: row.multipleChoiceScore || 10,
      judgmentNum: row.judgmentNum || 5,
      judgmentScore: row.judgmentScore || 5,
      questionBankId: row.questionBankId || '',
    }
  } else {
    operateId.value = null
    resetForm()
  }
  calculateTotalScore()
}

// 初始化时计算总分
calculateTotalScore()

defineExpose({
  openDialog,
})
</script>

<style lang="scss" scoped></style>
