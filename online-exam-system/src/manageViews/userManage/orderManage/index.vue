<template>
  <base-manage-layout
    :table-data="orderList"
    :total="total"
    :search-form="searchForm"
    @selection-change="handleSelectionChange"
    v-model:current-page="currentPage"
    v-model:page-size="pageSize"
  >
    <template #search-form>
      <el-form-item>
        <el-input
          placeholder="学生用户名"
          v-model="searchForm.studentUsername"
          class="ex-form__item"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-input
          placeholder="教师用户名"
          v-model="searchForm.teacherUsername"
          class="ex-form__item"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-input
          placeholder="班级名称"
          v-model="searchForm.className"
          class="ex-form__item"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-select
          v-model="searchForm.status"
          placeholder="请选择状态"
          clearable
          class="ex-form__item"
          style="width: 220px"
        >
          <el-option label="进行中" :value="1" />
          <el-option label="已完成" :value="2" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-date-picker v-model="searchForm.applyTime" type="datetime" placeholder="申请时间" />
      </el-form-item>
    </template>

    <template #operation-buttons>
      <el-button type="primary" plain @click="handleSearch" style="width: 100px">查询</el-button>
      <el-button type="primary" plain @click="handleReset" style="width: 100px">重置</el-button>
      <el-button
        type="danger"
        plain
        @click="handleBatchDelete"
        style="width: 100px"
        :disabled="multipleSelection.length === 0"
      >
        批量删除
      </el-button>
      <el-button type="primary" plain @click="handleAdd" style="width: 100px">新增</el-button>
    </template>

    <template #table-columns>
      <el-table-column type="selection" width="55" />
      <el-table-column label="学生用户名" prop="studentUsername"></el-table-column>
      <el-table-column label="学生姓名" prop="studentName"></el-table-column>
      <el-table-column label="教师用户名" prop="teacherUsername"></el-table-column>
      <el-table-column label="教师姓名" prop="teacherName"></el-table-column>
      <el-table-column label="班级名" prop="className"></el-table-column>
      <el-table-column label="状态">
        <template #default="scope">
          <el-tag :type="scope.row.status === 1 ? 'warning' : 'success'">
            {{ scope.row.status === 1 ? '进行中' : '已完成' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="申请时间" min-width="120px">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <el-icon><Timer /></el-icon>
            <span style="margin-left: 10px">{{ scope.row.applyTime }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="完成时间" min-width="120px">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <el-icon><Timer /></el-icon>
            <span style="margin-left: 10px">{{ scope.row.finishTime || '-' }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="120px">
        <template #default="scope">
          <el-button
            v-if="scope.row.status === 1"
            size="small"
            type="success"
            plain
            @click="handleComplete(scope.row)"
          >
            完成
          </el-button>
          <el-button size="small" type="danger" plain @click="handleDelete(scope.row.id)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </template>
  </base-manage-layout>

  <el-dialog
    v-model="operateDialogVisible"
    :title="operateId ? '编辑申请' : '新增申请'"
    width="500"
    :before-close="handleClose"
  >
    <el-form
      ref="operateFormRef"
      style="max-width: 600px"
      :model="operateForm"
      status-icon
      :rules="rules"
      label-width="120px"
      class="ex-operateForm"
    >
      <el-form-item label="学生用户名" prop="studentUsername">
        <el-input
          v-model="operateForm.studentUsername"
          placeholder="请输入学生用户名"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="教师用户名" prop="teacherUsername">
        <el-input
          v-model="operateForm.teacherUsername"
          placeholder="请输入教师用户名"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="班级名称" prop="className">
        <el-input v-model="operateForm.className" placeholder="请输入班级名称" clearable></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="operateDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleDialogConfirm(operateFormRef)"> 确定 </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Timer } from '@element-plus/icons-vue'
import BaseManageLayout from '@/components/BaseManageLayout.vue'
import type { FormInstance, FormRules } from 'element-plus'

interface OrderInfo {
  id: number
  studentUsername: string
  studentName: string
  teacherUsername: string
  teacherName: string
  className: string
  status: number
  applyTime: string
  finishTime?: string
}

interface SearchForm {
  studentUsername: string
  teacherUsername: string
  className: string
  status: number | null
  applyTime: string | null
}

interface OperateForm {
  studentUsername: string
  teacherUsername: string
  className: string
}

const multipleSelection = ref<OrderInfo[]>([])
const currentPage = ref<number>(1)
const pageSize = ref<number>(5)
const total = ref<number>(0)

const searchForm = ref<SearchForm>({
  studentUsername: '',
  teacherUsername: '',
  className: '',
  status: null,
  applyTime: null,
})

const orderList = ref<OrderInfo[]>([])

const handleSelectionChange = (val: OrderInfo[]) => {
  multipleSelection.value = val
}

const handleSearch = async () => {
  try {
    // TODO: 实现申请查询逻辑
    const mockData: OrderInfo[] = [
      {
        id: 1,
        studentUsername: 'student1',
        studentName: '张三',
        teacherUsername: 'teacher1',
        teacherName: '李老师',
        className: '高三一班',
        status: 1,
        applyTime: '2024-03-20 10:00:00',
      },
      {
        id: 2,
        studentUsername: 'student2',
        studentName: '李四',
        teacherUsername: 'teacher2',
        teacherName: '王老师',
        className: '高三二班',
        status: 2,
        applyTime: '2024-03-20 11:00:00',
        finishTime: '2024-03-20 12:00:00',
      },
    ]
    orderList.value = mockData
    total.value = mockData.length
  } catch (error) {
    console.error(error)
    ElMessage.error('查询失败')
  }
}

const handleReset = () => {
  searchForm.value = {
    studentUsername: '',
    teacherUsername: '',
    className: '',
    status: null,
    applyTime: null,
  }
  handleSearch()
}

const handleComplete = async (row: OrderInfo) => {
  try {
    await ElMessageBox.confirm('确认完成该申请吗?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    })
    // TODO: 调用完成申请接口
    console.log('完成申请:', row.id)
    ElMessage.success('操作成功')
    handleSearch()
  } catch (error) {
    if (error !== 'cancel') {
      console.error(error)
      ElMessage.error('操作失败')
    }
  }
}

const handleDelete = async (id: number) => {
  try {
    await ElMessageBox.confirm('确认删除该申请吗?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    })
    // TODO: 调用删除申请接口
    console.log('删除申请:', id)
    ElMessage.success('删除成功')
    handleSearch()
  } catch (error) {
    if (error !== 'cancel') {
      console.error(error)
      ElMessage.error('删除失败')
    }
  }
}

const operateDialogVisible = ref(false)
const operateId = ref<number | null>(null)
const operateFormRef = ref<FormInstance>()
const operateForm = ref<OperateForm>({
  studentUsername: '',
  teacherUsername: '',
  className: '',
})

const rules: FormRules = {
  studentUsername: [
    { required: true, message: '请输入学生用户名', trigger: 'blur' },
    { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' },
  ],
  teacherUsername: [
    { required: true, message: '请输入教师用户名', trigger: 'blur' },
    { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' },
  ],
  className: [
    { required: true, message: '请输入班级名称', trigger: 'blur' },
    { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' },
  ],
}

const handleAdd = () => {
  operateId.value = null
  operateForm.value = {
    studentUsername: '',
    teacherUsername: '',
    className: '',
  }
  operateDialogVisible.value = true
}

const handleClose = (done: () => void) => {
  ElMessageBox.confirm('确认关闭？')
    .then(() => {
      done()
    })
    .catch(() => {})
}

const handleDialogConfirm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      try {
        // TODO: 调用新增申请接口
        console.log('新增申请:', operateForm.value)
        ElMessage.success('操作成功')
        operateDialogVisible.value = false
        handleSearch()
      } catch (error) {
        console.error(error)
        ElMessage.error('操作失败')
      }
    } else {
      console.log('error submit!', fields)
    }
  })
}

const handleBatchDelete = async () => {
  try {
    await ElMessageBox.confirm('确认批量删除选中的申请吗?', '提示', {
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

onMounted(() => {
  handleSearch()
})
</script>
<style lang="scss" scoped></style>
