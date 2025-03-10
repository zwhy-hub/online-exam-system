interface UserInfoData {
  id: number
  username: string
  password?: string
  name?: string
  salt?: string
  phone?: string
  email?: string
  img?: string
  role: number
  create_time?: string
  update_time?: string
  lock_flag?: number
  del_flag?: number
}
interface Result {
  status: number
  code: number
  msg?: string
}
interface RegisterData {
  msg: string
  code: string
  data: {
    username: string
    password: string
    role: number
  }
}
interface RegisterResponse {
  costTime: number
  result: Result
  data?: UserInfoData
}
interface LoginData {
  username: string
  password: string
  code: string
}
interface LoginResponse {
  costTime: number
  data: string
  result: {
    status: number
    code: number
    msg?: string
    id: number
    role: number
    username: string
  }
}
interface Response {
  data: { status: number; code: number; message?: string; data?: UserInfoData }
}

export type { UserInfoData, Response, RegisterData, RegisterResponse, LoginData, LoginResponse }
