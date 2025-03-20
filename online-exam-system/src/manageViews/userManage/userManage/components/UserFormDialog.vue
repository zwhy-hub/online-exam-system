<template>
  <el-dialog
    v-model="dialogVisible"
    :title="operateId ? '编辑用户' : '新增用户'"
    width="500"
    :before-close="handleClose"
  >
    <el-form
      ref="formRef"
      style="max-width: 600px"
      :model="formData"
      status-icon
      :rules="rules"
      label-width="auto"
      class="ex-operateFormList"
    >
      <el-form-item label="用户名" prop="username">
        <el-input
          v-model="formData.username"
          placeholder="请输入用户名"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="formData.password"
          placeholder="请输入密码"
          show-password
          clearable
          type="password"
        ></el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="name">
        <el-input
          v-model="formData.name"
          placeholder="请输入姓名"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input
          v-model="formData.email"
          placeholder="请输入邮箱"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input
          v-model="formData.phone"
          placeholder="请输入手机号"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="角色" prop="role">
        <el-select
          :disabled="currentUser === 2"
          v-model="formData.role"
          placeholder="请选择角色"
        >
          <el-option label="学生" :value="1" />
          <el-option label="老师" :value="2" />
          <el-option label="管理员" :value="3" />
          <el-option label="超级管理员" :value="4" />
        </el-select>
      </el-form-item>
      <el-form-item label="锁定状态" prop="lockFlag">
        <el-select v-model="formData.lockFlag" placeholder="请选择锁定状态">
          <el-option label="未锁定" :value="0" />
          <el-option label="已锁定" :value="1" />
        </el-select>
      </el-form-item>
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
import { ref, defineProps, defineEmits, defineExpose } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import type { FormInstance, FormRules } from 'element-plus';
import useUserStore from '@/stores/modules/user';

interface FormData {
  username: string;
  password: string;
  name: string;
  email: string;
  phone: string;
  role: number;
  lockFlag: number;
}

const userStore = useUserStore();
const currentUser = userStore.user?.role;

const emit = defineEmits<{
  submit: [
    operateId: number | null,
    formData: FormData,
    closeDialog: () => void
  ];
  'update:modelValue': [value: boolean];
}>();

const dialogVisible = ref(false);
const operateId = ref<number | null>(null);
const formRef = ref<FormInstance>();
const formData = ref<FormData>({
  username: '',
  password: '',
  name: '',
  email: '',
  phone: '',
  role: 1,
  lockFlag: 0,
});

const usernameValidate = (
  _rule: any,
  value: string,
  callback: (arg0?: Error) => void
) => {
  if (value === '') {
    callback(new Error('请输入用户名'));
  } else if (value.length < 2 || value.length > 12) {
    callback(new Error('用户名长度在2-12之间'));
  } else {
    callback();
  }
};

const passwordValidate = (
  _rule: any,
  value: string,
  callback: (arg0?: Error) => void
) => {
  if (value === '') {
    callback(new Error('请输入密码'));
  } else if (value.length < 6 || value.length > 12) {
    callback(new Error('密码长度在6-12之间'));
  } else {
    callback();
  }
};

const phoneValidate = (
  _rule: any,
  value: string,
  callback: (arg0?: Error) => void
) => {
  if (value === '') {
    callback(new Error('请输入手机号'));
  } else {
    callback();
  }
};

const rules = {
  username: [{ required: true, validate: usernameValidate, trigger: 'blur' }],
  password: [{ required: true, validate: passwordValidate, trigger: 'blur' }],
  phone: [{ required: true, validate: phoneValidate, trigger: 'blur' }],
};

const handleClose = (done: () => void) => {
  ElMessageBox.confirm('确认要关闭吗?')
    .then(() => {
      done();
    })
    .catch(() => {});
};

const closeDialog = () => {
  dialogVisible.value = false;
};

const submitForm = () => {
  formRef.value?.validate((valid) => {
    if (valid) {
      emit('submit', operateId.value, formData.value, closeDialog);
    }
  });
};

const openDialog = (id: number | null = null, userData: any = null) => {
  dialogVisible.value = true;
  operateId.value = id;

  if (userData) {
    formData.value = {
      username: userData.username,
      password: userData.password || '',
      name: userData.name,
      email: userData.email || '',
      phone: userData.phone,
      role: userData.role,
      lockFlag: userData.lockFlag,
    };
  } else {
    formData.value = {
      username: '',
      password: '',
      name: '',
      email: '',
      phone: '',
      role: 1,
      lockFlag: 0,
    };
  }
};

defineExpose({
  openDialog,
});
</script>

<style lang="scss" scoped></style>
