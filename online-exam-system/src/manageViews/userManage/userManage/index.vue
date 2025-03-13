<template>
  <div class="ex-container">
    <div class="ex-header">
      <el-form size="large" :inline="true" :model="searchForm" class="ex-form">
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
          <el-time-picker v-model="searchForm.startTime" arrow-control placeholder="创建时间" />
        </el-form-item>
        <el-form-item>
          <el-select
            v-model="searchForm.role"
            placeholder="请选择角色"
            clearable
            class="ex-form__item"
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
          >
            <el-option label="未锁定" :value="0" />
            <el-option label="已锁定" :value="1" />
          </el-select>
        </el-form-item>
      </el-form>
      <div class="ex-header__footer">
        <el-button type="primary" plain @click="handleSearch" style="width: 100px">查询</el-button>
        <el-button type="primary" plain @click="handleReset" style="width: 100px">重置</el-button>
        <el-button type="danger" plain @click="handleDelete" style="width: 100px">
          批量删除
        </el-button>
        <el-button type="primary" plain @click="handleAdd" style="width: 100px">新增</el-button>
      </div>
    </div>
    <div class="ex-content">
      <el-table
        :data="UserList"
        style="width: 100%; min-width: 800px"
        border
        highlight-current-row
        :fit="true"
        :table-layout="'auto'"
        max-height="calc(100vh - 400px)"
        @selection-change="handleSelectionChange"
        ref="multipleTableRef"
      >
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
        <el-table-column label="锁定状态" prop="lockFlag"></el-table-column>
        <el-table-column label="角色" prop="role"></el-table-column>
        <el-table-column label="操作" min-width="120px">
          <template #default="scope">
            <el-button size="small" type="primary" plain> 编辑 </el-button>
            <el-popconfirm title="Are you sure to delete this?">
              <template #reference>
                <el-button @click="handleDelete" plain type="danger" size="small">删除</el-button>
              </template>
            </el-popconfirm>
            <el-button size="small" type="primary" plain> 解封 </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[5, 10, 15, 20]"
        layout="sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        style="margin-top: 10px"
      />
    </div>

    <el-dialog v-model="addDialogVisible" title="新增用户" width="500" :before-close="handleClose">
      <el-form
        ref="addFormListRef"
        style="max-width: 600px"
        :model="addFormList"
        status-icon
        :rules="rules"
        label-width="auto"
        class="demo-addFormList"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addFormList.username" placeholder="请输入用户名" clearable></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="addFormList.password"
            placeholder="请输入密码"
            show-password
            clearable
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="addFormList.name" placeholder="请输入姓名" clearable></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addFormList.email" placeholder="请输入邮箱" clearable></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="addFormList.phone" placeholder="请输入手机号" clearable></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="role">
          <el-select v-model="addFormList.role" placeholder="请选择角色">
            <el-option label="学生" :value="1" />
            <el-option label="老师" :value="2" />
            <el-option label="管理员" :value="3" />
            <el-option label="超级管理员" :value="4" />
          </el-select>
        </el-form-item>
        <el-form-item label="锁定状态" prop="lockFlag">
          <el-select v-model="addFormList.lockFlag" placeholder="请选择锁定状态">
            <el-option label="未锁定" :value="0" />
            <el-option label="已锁定" :value="1" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="addDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleDialogAdd(addFormListRef)"> 确定 </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import type {
  UserInfoData,
  SearchUserForm,
  FetchUserList,
  FetchUserListResponse,
  AddUserData,
  BaseResponse,
} from '@/api/user/type'
import { onMounted, ref } from 'vue'
import useUserStore from '@/stores/modules/user'
import { ElMessage, ElMessageBox, type FormInstance, type TableInstance } from 'element-plus'

const multipleTableRef = ref<TableInstance>()
const multipleSelection = ref<UserInfoData[]>([])
const selectable = (row: UserInfoData) => {
  return row.role !== 4
}
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)
const userStore = useUserStore()
const searchForm = ref<SearchUserForm>({
  role: 1,
  lockFlag: 0,
  username: '',
  name: '',
  startTime: '',
})
const UserList = ref<UserInfoData[]>([])
const addDialogVisible = ref(false)
const addFormList = ref({
  username: '',
  password: '',
  name: '',
  email: '',
  phone: '',
  role: 1,
  lockFlag: 0,
})
const addFormListRef = ref()
const usernameValidate = (_rule: any, value: string, callback: (arg0?: Error) => void) => {
  if (value === '') {
    callback(new Error('请输入用户名'))
  } //长度大于2《12
  else if (value.length < 2 || value.length > 12) {
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
const nameValidate = (_rule: any, value: string, callback: (arg0?: Error) => void) => {
  if (value === '') {
    callback(new Error('请输入姓名'))
  } else if (value.length < 2 || value.length > 12) {
    callback(new Error('姓名长度在2-12之间'))
  } else {
    callback()
  }
}
const emailValidate = (_rule: any, value: string, callback: (arg0?: Error) => void) => {
  if (value === '') {
    callback(new Error('请输入邮箱'))
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
  name: [{ required: true, validate: nameValidate, trigger: 'blur' }],
  email: [{ required: true, validate: emailValidate, trigger: 'blur' }],
  phone: [{ required: true, validate: phoneValidate, trigger: 'blur' }],
}

const handleSizeChange = (val: number) => {
  pageSize.value = val
  handleSearch()
}
const handleCurrentChange = (val: number) => {
  currentPage.value = val
  handleSearch()
}
const handleSelectionChange = (val: UserInfoData[]) => {
  multipleSelection.value = val
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
      // console.log(UserList.value)
      // searchForm.value = {
      //   lockFlag: 0,
      //   username: '',
      //   name: '',
      //   startTime: '',
      //   role: 1,
      // }
    } else {
      console.log(res?.result.msg || '查询失败')
    }
    // console.log(res)
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
  handleSearch()
}
const handleDelete = async () => {
  const res = await userStore.DeleteUserByid(17)
  console.log(res)
}
const handleAdd = () => {
  addDialogVisible.value = true
}
const handleClose = (done: () => void) => {
  ElMessageBox.confirm('Are you sure to close this dialog?')
    .then(() => {
      done()
    })
    .catch(() => {
      // catch error
    })
}
const handleDialogAdd = (formEl: FormInstance | undefined) => {
  formEl?.validate(async (valid) => {
    if (valid) {
      const params: AddUserData = {
        msg: '',
        code: '',
        data: {
          ...addFormList.value,
        },
      }
      // console.log(params)
      const res: BaseResponse | null = await userStore.AddUser(params)
      // console.log(res)
      if (res?.result.status === 1) {
        ElMessage.success('添加成功')
        handleSearch()
        addDialogVisible.value = false
      }
    }
  })
}

onMounted(() => {
  handleSearch()
})
</script>
<style lang="scss" scoped>
@include b(container) {
  width: 100%;
  height: 100%;
  padding: 20px;
}
@include b(header) {
  border-radius: 10px;
  background-color: #fff;
  padding: 10px;
}
@include b(form) {
  @include e(item) {
    width: 220px;
  }
}
@include b(content) {
  border-radius: 10px;
  margin-top: 20px;
  padding: 10px;
  // max-height: 600px;
  background-color: #fff;
}
</style>
