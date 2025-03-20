<template>
  <el-dialog
    v-model="dialogVisible"
    :title="operateId ? '编辑考试' : '添加考试'"
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
      <el-form-item label="考试名称" prop="examName">
        <el-input v-model="formData.examName" placeholder="请输入考试名称" />
      </el-form-item>
      <el-form-item label="简述内容" prop="examContent">
        <el-input
          v-model="formData.examContent"
          type="textarea"
          placeholder="请输入简述内容"
          :rows="3"
        />
      </el-form-item>
      <el-form-item label="选择试卷" prop="paperId">
        <el-select v-model="formData.paperId" placeholder="请选择试卷">
          <el-option label="Java期中试卷" value="1" />
          <el-option label="Java期末试卷" value="2" />
        </el-select>
      </el-form-item>
      <el-form-item label="选择班级" prop="classId">
        <el-select v-model="formData.classId" placeholder="请选择班级">
          <el-option label="计算机1班" value="1" />
          <el-option label="计算机2班" value="2" />
        </el-select>
      </el-form-item>
      <el-form-item label="考试时间" prop="examTime">
        <el-input-number
          v-model="formData.examTime"
          :min="1"
          :max="180"
          placeholder="考试时间(分钟)"
        />
      </el-form-item>
      <el-form-item label="开始时间" prop="startTime">
        <el-date-picker
          v-model="formData.startTime"
          type="datetime"
          placeholder="选择开始时间"
          format="YYYY-MM-DD HH:mm:ss"
          value-format="YYYY-MM-DD HH:mm:ss"
        />
      </el-form-item>
      <el-form-item label="结束时间" prop="endTime">
        <el-date-picker
          v-model="formData.endTime"
          type="datetime"
          placeholder="选择结束时间"
          format="YYYY-MM-DD HH:mm:ss"
          value-format="YYYY-MM-DD HH:mm:ss"
        />
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
import { ref, defineEmits, defineExpose } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'

interface FormData {
  examName: string
  examContent: string
  paperId: string
  classId: string
  examTime: number
  startTime: string
  endTime: string
}

const emit = defineEmits<{
  submit: [operateId: number | null, formData: FormData, closeDialog: () => void]
}>()

const dialogVisible = ref(false)
const operateId = ref<number | null>(null)
const formRef = ref<FormInstance>()

const formData = ref<FormData>({
  examName: '',
  examContent: '',
  paperId: '',
  classId: '',
  examTime: 60,
  startTime: '',
  endTime: '',
})

const rules = ref<FormRules>({
  examName: [{ required: true, message: '请输入考试名称', trigger: 'blur' }],
  paperId: [{ required: true, message: '请选择试卷', trigger: 'change' }],
  classId: [{ required: true, message: '请选择班级', trigger: 'change' }],
  examTime: [{ required: true, message: '请输入考试时间', trigger: 'blur' }],
  startTime: [{ required: true, message: '请选择开始时间', trigger: 'change' }],
  endTime: [{ required: true, message: '请选择结束时间', trigger: 'change' }],
})

const resetForm = () => {
  formData.value = {
    examName: '',
    examContent: '',
    paperId: '',
    classId: '',
    examTime: 60,
    startTime: '',
    endTime: '',
  }
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
      examName: row.examName || '',
      examContent: row.examContent || '',
      paperId: row.paperId || '',
      classId: row.classId || '',
      examTime: row.examTime || 60,
      startTime: row.startTime || '',
      endTime: row.endTime || '',
    }
  } else {
    operateId.value = null
    resetForm()
  }
}

defineExpose({
  openDialog,
})
</script>

<style lang="scss" scoped></style>
