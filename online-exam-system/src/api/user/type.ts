interface UserInfoData {
  id: number
  username: string
  password: string
  name: string
  salt: string
  phone: string
  email: string
  img: string
  role: number
  create_time: string
  update_time: string
  lock_flag: number
  del_flag: number
}

interface RegisterData {
  username: string
  password: string
  role: number
}

interface Response {
  data: { status: number; code: number; message?: string; data?: UserInfoData }
}

export type { UserInfoData, Response, RegisterData }
