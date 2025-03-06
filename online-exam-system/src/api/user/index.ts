import * as types from './type'
import req from '@/utils/axios'

enum api {
  registerUrl = '/register',
}

const register = async (data: types.RegisterData): Promise<types.RegisterResponse | null> => {
  try {
    const res: types.RegisterResponse = await req.post(api.registerUrl, data)
    return res
  } catch (error) {
    console.error('Register API error:', error)
    return null
  }
}

export { register }
