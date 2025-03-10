import * as types from './type'
import { Get, Post } from '@/utils/decorators' // 引入封装好的装饰器

class AuthService {
  @Post('/register')
  async register(data: types.RegisterData): Promise<types.RegisterResponse | null> {
    return null
  }

  @Post('/login')
  async login(data: types.LoginData): Promise<types.LoginResponse | null> {
    return null
  }
}

export default new AuthService()
