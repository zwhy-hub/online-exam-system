<template>
  <div ex-container>
    <el-form
      :model="loginForm"
      ref="ruleFormRef"
      :rules="rules"
      class="ex-form"
      label-position="right"
      label-width="100px"
    >
      <el-form-item class="ex-form__title">
        <h1>登录</h1>
        <el-icon class="ex-icon__user"><User /><Plus /></el-icon>
      </el-form-item>
      <el-form-item label="用户名" prop="username">
        <el-input v-model="loginForm.username" placeholder="Username" clearable></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="loginForm.password"
          placeholder="Password"
          type="password"
          show-password
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleLogin(ruleFormRef)">登录</el-button>
        <el-button link @click="handleRegister">没有账号？立即注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup lang="ts">
import { ElMessage, type FormInstance } from 'element-plus'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import useUserStore from '@/stores/modules/user'

const userStore = useUserStore()
const router = useRouter()
const loginForm = reactive({
  username: '',
  password: '',
})
const ruleFormRef = ref<FormInstance>()
const validateUsername = (_rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error('请输入用户名'))
  }
  callback()
}
const validatePassword = (_rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error('请输入密码'))
  }
  callback()
}
const rules = {
  username: [{ required: true, trigger: 'blur', validator: validateUsername }],
  password: [{ required: true, trigger: 'blur', validator: validatePassword }],
}

const handleLogin = (formEl: FormInstance | undefined) => {
  formEl?.validate((valid) => {
    if (valid) {
      localStorage.setItem(
        'USER',
        JSON.stringify({
          id: 1,
          role: 4,
          ...loginForm,
        }),
      )
      ElMessage.success('登陆成功')

      router.push('/')
    }
  })
}
const handleRegister = () => {
  router.push('/register')
}
</script>
<style lang="scss" scoped>
@include b(form) {
  border: 1px solid #000;
  border-radius: 4px;
  width: 600px;
  padding: 100px;
  margin: 100px auto;
}
@include b(icon) {
  @include e(user) {
    font-size: 50px;
    color: #409eff;
  }
}
.ex-form__title {
  height: 50px;
  line-height: 50px;
}
</style>
