import { defineStore } from 'pinia'
import type { userState } from './types/userType'
import AuthService from '@/api/user'
import type {
  BaseResponse,
  AddAdminInfo,
  LoginData,
  LoginResponse,
  RegisterData,
  RegisterResponse,
  FetchUserList,
  FetchUserListResponse,
} from '@/api/user/type'

const useUserStore = defineStore('User', {
  state: (): userState => ({
    user: JSON.parse(localStorage.getItem('USER') as any),
  }),

  actions: {
    //注册
    async Register(data: RegisterData) {
      const res: RegisterResponse | null = await AuthService.register(data)
      if (!res) {
        console.error('注册接口返回为空')
        return null
      }
      return res
    },

    //登录
    async Login(data: LoginData) {
      const res: LoginResponse | null = await AuthService.login(data)
      if (!res) {
        console.error('登录接口返回为空')
        return null
      }
      return res
    },

    //修改用户信息
    async AddAdminInfo(data: AddAdminInfo) {
      const res: BaseResponse | null = await AuthService.addAdminInfo(data)
      if (!res) {
        console.log('修改用户信息接口返回为空')
        return null
      }
      return res
    },

    //删除用户
    async DeleteUserByid(id: number) {
      const res: BaseResponse | null = await AuthService.deleteUserByid(id)
      if (!res) {
        console.log('删除用户接口返回为空')
        return null
      }
      return res
    },

    // 获取用户列表
    async FetchUserList(data: FetchUserList) {
      const res: FetchUserListResponse | null = await AuthService.fetchUserList(data)
      if (!res) {
        console.log('获取用户列表接口返回为空')
        return null
      }
      return res
    },
  },
})

export default useUserStore
