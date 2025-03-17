<template>
  <base-manage-layout
    :table-data="UserList"
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
      <el-form-item>
        <el-input
          placeholder="用户名"
          v-model="searchForm.username"
          class="ex-form__item"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-input placeholder="姓名" v-model="searchForm.name" class="ex-form__item"></el-input>
      </el-form-item>
      <el-form-item>
        <el-date-picker v-model="searchForm.startTime" type="datetime" placeholder="选择时间" />
      </el-form-item>
      <el-form-item>
        <el-select
          v-model="searchForm.role"
          placeholder="请选择角色"
          clearable
          class="ex-form__item"
          style="width: 220px"
        >
          <el-option label="学生" :value="1" />
          <el-option label="老师" :value="2" />
          <el-option label="管理员" :value="3" />
          <el-option label="超级管理员" :value="4" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select
          v-model="searchForm.lockFlag"
          placeholder="请选择锁定状态"
          clearable
          class="ex-form__item"
          style="width: 220px"
        >
          <el-option label="未锁定" :value="0" />
          <el-option label="已锁定" :value="1" />
        </el-select>
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
      <el-table-column type="selection" :selectable="selectable" width="55" />
      <el-table-column label="用户名" prop="username"></el-table-column>
      <el-table-column label="姓名" prop="name"></el-table-column>
      <el-table-column label="头像" prop="img"></el-table-column>
      <el-table-column label="邮箱" prop="email" show-overflow-tooltip></el-table-column>
      <el-table-column label="手机号" prop="phone" show-overflow-tooltip></el-table-column>
      <el-table-column label="注册时间" min-width="120px">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <el-icon><timer /></el-icon>
            <span style="margin-left: 10px">{{ scope.row.createTime }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="锁定状态" prop="lockFlag">
        <template #default="scope">
          <el-tag v-if="scope.row.lockFlag === 0" type="success">未锁定</el-tag>
          <el-tag v-if="scope.row.lockFlag === 1" type="danger">已锁定</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="角色" prop="role">
        <template #default="scope">
          <el-tag v-if="scope.row.role === 1" type="success">学生</el-tag>
          <el-tag v-if="scope.row.role === 2" type="warning">老师</el-tag>
          <el-tag v-if="scope.row.role === 3" type="primary">管理员</el-tag>
          <el-tag v-if="scope.row.role === 4" type="danger">超级管理员</el-tag>
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
          <el-button
            size="small"
            type="primary"
            plain
            @click="handleLock(scope.row.id, scope.row.lockFlag)"
          >
            {{ scope.row.lockFlag ? '解封' : '封禁' }}
          </el-button>
        </template>
      </el-table-column>
    </template>

    <template #dialogs>
      <el-dialog
        v-model="operateDialogVisible"
        :title="operateId ? '编辑用户' : '新增用户'"
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
          <el-form-item label="用户名" prop="username">
            <el-input
              v-model="operateFormList.username"
              placeholder="请输入用户名"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              v-model="operateFormList.password"
              placeholder="请输入密码"
              show-password
              clearable
              type="password"
            ></el-input>
          </el-form-item>
          <el-form-item label="姓名" prop="name">
            <el-input v-model="operateFormList.name" placeholder="请输入姓名" clearable></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="operateFormList.email" placeholder="请输入邮箱" clearable></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="phone">
            <el-input
              v-model="operateFormList.phone"
              placeholder="请输入手机号"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="角色" prop="role">
            <el-select v-model="operateFormList.role" placeholder="请选择角色">
              <el-option label="学生" :value="1" />
              <el-option label="老师" :value="2" />
              <el-option label="管理员" :value="3" />
              <el-option label="超级管理员" :value="4" />
            </el-select>
          </el-form-item>
          <el-form-item label="锁定状态" prop="lockFlag">
            <el-select v-model="operateFormList.lockFlag" placeholder="请选择锁定状态">
              <el-option label="未锁定" :value="0" />
              <el-option label="已锁定" :value="1" />
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
import type {
  UserInfoData,
  SearchUserForm,
  FetchUserList,
  FetchUserListResponse,
  BaseResponse,
  OperateUser,
} from '@/api/user/type'
import useUserStore from '@/stores/modules/user'
import { ElMessage, ElMessageBox, type FormInstance } from 'element-plus'
import { Timer } from '@element-plus/icons-vue'
import BaseManageLayout from '@/components/BaseManageLayout.vue'

const multipleSelection = ref<UserInfoData[]>([])
const selectable = (row: UserInfoData) => {
  return row.role !== 4
}
const currentPage = ref<number>(1)
const pageSize = ref<number>(5)
const total = ref<number>(0)
const userStore = useUserStore()
const searchForm = ref<SearchUserForm>({
  role: 1,
  lockFlag: 0,
  username: '',
  name: '',
  startTime: '',
})
const UserList = ref<UserInfoData[]>([])
const operateDialogVisible = ref<boolean>(false)
const operateFormList = ref({
  username: '',
  password: '',
  name: '',
  email: '',
  phone: '',
  role: 1,
  lockFlag: 0,
})
const operateFormListRef = ref()
const operateId = ref<number | null>(null)

const usernameValidate = (_rule: any, value: string, callback: (arg0?: Error) => void) => {
  if (value === '') {
    callback(new Error('请输入用户名'))
  } else if (value.length < 2 || value.length > 12) {
    callback(new Error('用户名长度在2-12之间'))
  } else {
    callback()
  }
}

const passwordValidate = (_rule: any, value: string, callback: (arg0?: Error) => void) => {
  if (value === '') {
    callback(new Error('请输入密码'))
  } else if (value.length < 6 || value.length > 12) {
    callback(new Error('密码长度在6-12之间'))
  } else {
    callback()
  }
}

const phoneValidate = (_rule: any, value: string, callback: (arg0?: Error) => void) => {
  if (value === '') {
    callback(new Error('请输入手机号'))
  } else {
    callback()
  }
}

const rules = {
  username: [{ required: true, validate: usernameValidate, trigger: 'blur' }],
  password: [{ required: true, validate: passwordValidate, trigger: 'blur' }],
  phone: [{ required: true, validate: phoneValidate, trigger: 'blur' }],
}

const handleSearch = async () => {
  try {
    const params: FetchUserList = {
      page: currentPage.value,
      limit: pageSize.value,
      data: {
        username: searchForm.value.username,
        name: searchForm.value.name,
        role: searchForm.value.role,
        startTime: searchForm.value.startTime,
        lockFlag: searchForm.value.lockFlag,
      },
    }
    // console.log(params)

    const res: FetchUserListResponse | null = await userStore.FetchUserList(params)
    if (res?.result.status === 1) {
      UserList.value = res.data.records
      total.value = res.data.total
    } else {
      ElMessage.warning(res?.result.msg || '查询失败')
    }
  } catch (error) {
    console.log(error)
  }
}

const handleReset = () => {
  searchForm.value = {
    lockFlag: 0,
    username: '',
    name: '',
    startTime: '',
    role: 1,
  }
  currentPage.value = 1
  pageSize.value = 5
  handleSearch()
}

const handleDelete = () => {}

const handleAdd = () => {
  operateDialogVisible.value = true
}

const handleEdit = (row: any) => {
  operateId.value = row.id
  operateFormList.value = {
    username: row.username,
    password: row.password,
    name: row.name,
    email: row.email || '',
    phone: row.phone,
    role: row.role,
    lockFlag: row.lockFlag,
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

const addUserCommit = async () => {
  try {
    const params: OperateUser = {
      msg: '',
      code: '',
      data: {
        ...operateFormList.value,
      },
    }
    const res: BaseResponse | null = await userStore.AddUser(params)
    if (res?.result.status === 1) {
      ElMessage.success('添加成功')
      operateDialogVisible.value = false
      handleReset()
    } else {
      ElMessage.warning(res?.result.msg || '添加失败')
    }
  } catch (error) {
    console.log(error)
  }
}

const editUserCommit = async () => {
  try {
    const params: OperateUser = {
      msg: '',
      code: '',
      data: {
        ...operateFormList.value,
      },
    }
    const res: BaseResponse | null = await userStore.EditUser(operateId.value as number, params)
    if (res?.result.status === 1) {
      ElMessage.success('编辑成功')
      operateDialogVisible.value = false
      handleReset()
    } else {
      ElMessage.warning(res?.result.msg || '编辑失败')
    }
  } catch (error) {
    console.log(error)
  }
}

const handleDialogOperate = (formEl: FormInstance | undefined) => {
  formEl?.validate((valid) => {
    if (valid) {
      !operateId.value ? addUserCommit() : editUserCommit()
    }
  })
}

const handleDeleteById = (id: number) => {
  ElMessageBox.confirm('确认删除该用户吗?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(async () => {
      try {
        const res: BaseResponse | null = await userStore.DeleteUserById(id)
        if (res?.result.status === 1) {
          ElMessage.success('删除成功')
          handleReset()
        } else {
          ElMessage.warning(res?.result.msg || '删除失败')
        }
      } catch (error) {
        console.log(error)
      }
    })
    .catch(() => {
      ElMessage.info('已取消删除')
    })
}

const handleLock = async (id: number, lockFlag: number) => {
  const isLock: string = lockFlag ? '解封' : '封禁'
  ElMessageBox.confirm(`确认${isLock}该用户吗`, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(async () => {
      try {
        const res: BaseResponse | null = await userStore.LockUser(id)
        if (res?.result.status === 1) {
          ElMessage.success(`${isLock}成功`)
          handleReset()
        } else {
          ElMessage.warning(res?.result.msg || `${isLock}失败`)
        }
      } catch (error) {
        console.log(error)
      }
    })
    .catch(() => {
      ElMessage.info(`已取消${isLock}`)
    })
}

const handleSelectionChange = (val: UserInfoData[]) => {
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

onMounted(() => {
  handleSearch()
})
</script>

<style lang="scss" scoped></style>
