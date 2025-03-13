//基本返回示例
interface BaseResponse {
  costTime: number
  result: Result
  data?: UserInfoData
}
//用户信息
interface UserInfoData {
  id?: number
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
//返回结果
interface Result {
  status: number
  code: number
  msg?: string
}
//注册
interface RegisterData {
  msg: string
  code: string
  data: {
    username: string
    password: string
    role: number
  }
}
//注册返回
interface RegisterResponse {
  costTime: number
  result: Result
  data?: UserInfoData
}
//登录
interface LoginData {
  username: string
  password: string
  code: string
}
//登录返回
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
//搜索用户表单
interface SearchUserForm {
  username?: string
  name?: string
  startTime?: string
  endTime?: string
  role: number
  lockFlag?: number
}
//搜索用户表单返回
interface SearchUserFormResponse {}
//添加管理员
interface AddAdminInfo {
  msg: string
  code: string
  data: UserInfoData
}
//获取用户列表
interface FetchUserList {
  page: number
  limit: number
  data: SearchUserForm
}
//获取用户列表返回
interface FetchUserListResponse {
  constTime: number
  result: Result
  data: {
    records: UserInfoData[]
    total: number
    size: number
    current: number
    orders: []
    optimizeCountSql: boolean
    hitCount: boolean
    countId: number
    maxLimit: number
    searchCount: boolean
    pages: number
  }
}
//添加用户
interface AddUserData {
  msg: string
  code: string
  data: UserInfoData
}

export type {
  UserInfoData,
  BaseResponse,
  RegisterData,
  RegisterResponse,
  LoginData,
  LoginResponse,
  SearchUserForm,
  SearchUserFormResponse,
  AddAdminInfo,
  FetchUserList,
  FetchUserListResponse,
  AddUserData,
}
