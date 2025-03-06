import * as types from './type'
import axios from 'axios'
enum api {
  registerUrl = '/api/user/register',
}

const register = (data: types.RegisterData) => {
  return axios.post<any, types.Response>(api.registerUrl, data)
}

export { register }
