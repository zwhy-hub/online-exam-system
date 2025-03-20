<template>
  <Base-manage-layout
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
      <User-search-form
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
      <User-table @edit="handleEdit" @delete="handleDeleteById" />
    </template>

    <template #dialogs>
      <User-form-dialog ref="formDialogRef" @submit="handleFormSubmit" />
    </template>
  </Base-manage-layout>
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
import { ElMessage, ElMessageBox } from 'element-plus'
import BaseManageLayout from '@/components/BaseManageLayout.vue'
import UserSearchForm from './components/UserSearchForm.vue'
import UserTable from './components/UserTable.vue'
import UserFormDialog from './components/UserFormDialog.vue'

const multipleSelection = ref<UserInfoData[]>([])
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
const formDialogRef = ref<InstanceType<typeof UserFormDialog>>()

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

const handleDelete = () => {
  // 批量删除实现
}

const handleAdd = () => {
  formDialogRef.value?.openDialog()
}

const handleEdit = (row: any) => {
  formDialogRef.value?.openDialog(row.id, row)
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

const handleFormSubmit = async (
  operateId: number | null,
  formData: any,
  closeDialog: () => void,
) => {
  try {
    const params: OperateUser = {
      msg: '',
      code: '',
      data: {
        ...formData,
      },
    }

    let res: BaseResponse | null = null
    if (operateId) {
      res = await userStore.EditUser(operateId, params)
    } else {
      res = await userStore.AddUser(params)
    }

    if (res?.result.status === 1) {
      ElMessage.success(operateId ? '编辑成功' : '添加成功')
      closeDialog()
      handleReset()
    } else {
      ElMessage.warning(res?.result.msg || (operateId ? '编辑失败' : '添加失败'))
    }
  } catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  handleSearch()
})
</script>

<style lang="scss" scoped></style>
