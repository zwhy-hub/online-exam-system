import * as types from './type'
import { Post, PostById, PostIdOnly } from '@/utils/decorators' // 引入封装好的装饰器

class AuthService {
  //注册
  @Post('/register')
  async register(data: types.RegisterData): Promise<types.RegisterResponse | null> {
    return null
  }

  //登录
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
  @PostIdOnly('/user/deleteUser/')
  async deleteUserById(id: number): Promise<types.BaseResponse | null> {
    return null
  }

  //获取用户列表
  @Post('/user/listUserForPage')
  async fetchUserList(data: types.FetchUserList): Promise<types.FetchUserListResponse | null> {
    return null
  }

  //添加用户
  @Post('/user/saveUser')
  async addUser(data: types.OperateUser): Promise<types.BaseResponse | null> {
    return null
  }

  //编辑用户
  @PostById('/user/updateUser')
  async editUser(id: number, data: types.OperateUser): Promise<types.BaseResponse | null> {
    return null
  }

  //封禁/解封用户
  @PostIdOnly('/user/lockUser')
  async lockUser(id: number): Promise<types.BaseResponse | null> {
    return null
  }
}

export default new AuthService()
