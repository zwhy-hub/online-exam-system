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
        <el-table-column label="邮箱" prop="email"></el-table-column>
        <el-table-column label="手机号" prop="phone"></el-table-column>
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
            <el-button size="small"> 编辑 </el-button>
            <el-button size="small"> 删除 </el-button>
            <el-button size="small"> 解封 </el-button>
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
  </div>
</template>
<script setup lang="ts">
import type {
  UserInfoData,
  SearchUserForm,
  FetchUserList,
  FetchUserListResponse,
} from '@/api/user/type'
import { onMounted, ref } from 'vue'
import useUserStore from '@/stores/modules/user'
import type { TableInstance } from 'element-plus'

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

const handleSizeChange = (val: number) => {
  pageSize.value = val
}
const handleCurrentChange = (val: number) => {
  currentPage.value = val
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
      console.log(UserList.value)
    } else {
      console.log(res?.result.msg || '查询失败')
    }
    // console.log(res)
  } catch (error) {
    console.log(error)
  }
}
const handleReset = () => {}
const handleDelete = async () => {
  const res = await userStore.DeleteUserByid(17)
  console.log(res)
}
const handleAdd = () => {}

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
