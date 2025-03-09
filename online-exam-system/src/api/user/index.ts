import * as types from './type'
import req from '@/utils/axios'

enum api {
  registerUrl = '/register',
  loginUrl = '/api/user/login',
}
//用户注册
const register = async (data: types.RegisterData): Promise<types.RegisterResponse | null> => {
  try {
    const res: types.RegisterResponse = await req.post(api.registerUrl, data)
    return res
  } catch (error) {
    console.error('Register API error:', error)
    return null
  }
}
//用户登录
const login = async (data: types.LoginData): Promise<types.LoginRespose | null> => {
  try {
    const res: types.LoginRespose = await req.post(api.loginUrl, data)
    return res
  } catch (error) {
    console.error('LOGIN API error:', error)
    return null
  }
}

export { register, login }
