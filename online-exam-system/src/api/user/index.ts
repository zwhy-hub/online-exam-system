import * as types from './type'
import { Get, Post, Param, Delete } from '@/utils/decorators' // 引入封装好的装饰器

class AuthService {
  @Post('/register')
  async register(data: types.RegisterData): Promise<types.RegisterResponse | null> {
    return null
  }

  @Post('/login')
  async login(data: types.LoginData): Promise<types.LoginResponse | null> {
    return null
  }

  //添加管理员
  @Post('/user/saveAdmin')
  async addAdminInfo(data: types.AddAdminInfo): Promise<types.BaseResponse | null> {
    return null
  }

  //删除非管理员
  @Delete('/user/deleteUser/')
  async deleteUserByid(id: number): Promise<types.BaseResponse | null> {
    return null
  }

  //获取用户列表
  @Post('/user/listUserForPage')
  async fetchUserList(data: types.FetchUserList): Promise<types.FetchUserListResponse | null> {
    return null
  }

  //添加用户
  @Post('/user/saveUser')
  async addUser(data: types.AddUserData): Promise<types.BaseResponse | null> {
    return null
  }
}

export default new AuthService()
