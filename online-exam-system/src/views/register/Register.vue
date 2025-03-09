<template>
  <div class="ex-container">
    <el-form
      :model="registerForm"
      ref="ruleFormRef"
      :rules="rules"
      class="ex-form"
      label-position="right"
      label-width="100px"
    >
      <el-form-item class="ex-form__title">
        <h1>注册</h1>
        <el-icon class="ex-icon__user"><User /><Plus /></el-icon>
      </el-form-item>
      <el-form-item label="用户名" prop="username">
        <el-input v-model="registerForm.username" placeholder="Username" clearable></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="registerForm.password"
          placeholder="Password"
          type="password"
          show-password
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="confirmPassword">
        <el-input
          v-model="registerForm.confirmPassword"
          placeholder="Confirm Password"
          type="password"
          show-password
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="角色" prop="role">
        <el-radio-group v-model="registerForm.role">
          <el-radio :value="1">学生</el-radio>
          <el-radio :value="2">教师</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleRegister(ruleFormRef)">点击注册</el-button>
        <el-button link @click="handleLogin">已有帐号？点击登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { RegisterProps } from './type'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import useUserStore from '../../stores/modules/user'
import type { RegisterData, RegisterResponse } from '@/api/user/type'
import { useRouter } from 'vue-router'

const router = useRouter()
const userStore = useUserStore()
const ruleFormRef = ref<FormInstance>()
const registerForm = reactive<RegisterProps>({
  username: '',
  password: '',
  confirmPassword: '',
  role: 1,
})

const validateUsername = (_rule: any, value: string, callback: any) => {
  if (!value) {
    return callback(new Error('请输入用户名'))
  } //只能输入数字和字母并且长度在2-12位之间
  else if (!/^[a-zA-Z0-9]{2,12}$/.test(value)) {
    return callback(new Error('只能输入数字和字母并且长度在2-12位之间'))
  } else {
    callback()
  }
}
const validatePass = (_rule: any, value: string, callback: any) => {
  if (!value) {
    return callback(new Error('请输入密码'))
  } else if (
    /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_!@#$%^&*`~()-+=]+$)(?![a-z0-9]+$)(?![a-z\W_!@#$%^&*`~()-+=]+$)(?![0-9\W_!@#$%^&*`~()-+=]+$)[a-zA-Z0-9\W_!@#$%^&*`~()-+=]/.test(
      value,
    )
  ) {
    return callback(new Error('密码必须包含数字、字母、特殊字符'))
  } else {
    callback()
  }
}
const validateConfirmPass = (_rule: any, value: string, callback: any) => {
  if (!value) {
    return callback(new Error('请再次输入密码'))
  } else if (value !== registerForm.password) {
    return callback(new Error('两次输入密码不一致!'))
  } else {
    callback()
  }
}
const validateRole = (_rule: any, value: string, callback: any) => {
  if (!value) {
    return callback(new Error('请选择角色'))
  } else {
    callback()
  }
}
const rules = <FormRules>{
  username: [{ validator: validateUsername, trigger: 'blur', required: true }],
  password: [{ validator: validatePass, trigger: 'blur', required: true }],
  confirmPassword: [{ validator: validateConfirmPass, trigger: 'blur', required: true }],
  role: [{ validator: validateRole, trigger: 'blur', required: true }],
}

const handleRegister = async (formEl: FormInstance | undefined) => {
  formEl?.validate(async (valid) => {
    if (valid) {
      const params: RegisterData = {
        msg: '',
        code: '',
        data: {
          username: registerForm.username,
          password: registerForm.password,
          role: registerForm.role,
        },
      }
      // console.log(params)
      const res: RegisterResponse | null = await userStore.Register(params)
      // console.log(res)
      if (res?.result?.status === 1) {
        ElMessage.success('注册成功')
        handleLogin()
      } else {
        ElMessage.error(res?.result.msg)
      }
    }
  })
}
const handleLogin = () => {
  router.push('/login')
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
