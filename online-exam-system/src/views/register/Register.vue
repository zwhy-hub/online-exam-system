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
      <el-form-item label="用户名" prop="username">
        <el-input v-model="registerForm.username" placeholder="Username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="registerForm.password" placeholder="Password"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="confirmPassword">
        <el-input v-model="registerForm.confirmPassword" placeholder="Confirm Password"></el-input>
      </el-form-item>
      <el-form-item label="角色" prop="role">
        <el-radio-group v-model="registerForm.role">
          <el-radio label="1" value="1">学生</el-radio>
          <el-radio label="2" value="2">教师</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleRegister(ruleFormRef)">点击注册</el-button>
        <el-button type="text">已有帐号？点击登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { RegisterProps } from './type'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import useUserStore from '../../stores/modules/user'
import type { RegisterData, Response } from '@/api/user/type'
// import user from '@/mock/user'

const userStore = useUserStore()
const ruleFormRef = ref<FormInstance>()
const registerForm = reactive<RegisterProps>({
  username: '',
  password: '',
  confirmPassword: '',
  role: 1,
})
const rules = <FormRules>{
  username: [
    { required: true, message: 'Please input username', trigger: 'blur' },
    { min: 3, max: 20, message: 'Length should be 3 to 20', trigger: 'blur' },
  ],
  password: [
    { required: true, message: 'Please input password', trigger: 'blur' },
    { min: 6, max: 20, message: 'Length should be 6 to 20', trigger: 'blur' },
  ],
  confirmPassword: [
    { required: true, message: 'Please input password again', trigger: 'blur' },
    { min: 6, max: 20, message: 'Length should be 6 to 20', trigger: 'blur' },
  ],
  role: [{ required: true, message: 'Please select role', trigger: 'change' }],
}
const handleRegister = async (formEl: FormInstance | undefined) => {
  formEl?.validate(async (valid) => {
    if (valid) {
      const params: RegisterData = {
        username: registerForm.username,
        password: registerForm.password,
        role: registerForm.role,
      }
      const res: Response = await userStore.Register(params)
      console.log(res)

      if (res.data?.status === 0) {
        ElMessage.success('注册成功')
      } else {
        ElMessage.error(res.data.message)
      }
    }
  })
}
</script>
<style lang="scss" scoped>
@include b(form) {
  border: 1px solid #ebeef5;
  width: 600px;
  padding: 100px;
  margin: 100px auto;
}
</style>
