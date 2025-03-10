import { defineStore } from 'pinia'
import type { userState } from './types/userType'
import AuthService from '@/api/user'
import type { LoginData, LoginResponse, RegisterData, RegisterResponse } from '@/api/user/type'

const useUserStore = defineStore('User', {
  state: (): userState => ({
    user: JSON.parse(localStorage.getItem('USER') as any),
  }),

  actions: {
    async Register(data: RegisterData) {
      const res: RegisterResponse | null = await AuthService.register(data)
      if (!res) {
        console.error('注册接口返回为空')
        return null
      }
      return res
    },

    async Login(data: LoginData) {
      const res: LoginResponse | null = await AuthService.login(data)
      if (!res) {
        console.error('登录接口返回为空')
        return null
      }
      return res
    },
  },
})

export default useUserStore
