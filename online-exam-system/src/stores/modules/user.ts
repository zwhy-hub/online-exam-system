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
    // async Login(data: RegisterData) {
    //   const res: Response = await register(data)
    //   if (res.data.status === 0) {
    //     this.user = res.data.data
    //     localStorage.setItem('USER', JSON.stringify(res.data.data))
    //   }
    // },
  },
})

export default useUserStore
