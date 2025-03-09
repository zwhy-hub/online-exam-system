import { defineStore } from 'pinia'
import type { userState } from './types/userType'
import { register } from '@/api/user'
import type { RegisterData, RegisterResponse } from '@/api/user/type'

const useUserStore = defineStore('User', {
  state: (): userState => ({
    user: JSON.parse(localStorage.getItem('USER') as string),
  }),

  actions: {
    async Register(data: RegisterData) {
      const res: RegisterResponse | null = await register(data)
      return res
    },
  },
})

export default useUserStore
