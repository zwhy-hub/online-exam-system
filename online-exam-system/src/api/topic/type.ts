interface TopicInfoData {
  id?: number
  content?: string
  createTime?: string
  endTime?: string
  type: number
  correctAnswerId?: number
  createUserId?: string
  deleteFlag?: number
}

interface BaseResponse {
  costTime: number
  result: {
    status: number
    code: number
    msg?: string
  }
  data?: TopicInfoData
}

interface SearchFormData {
  page: number
  limit: number
  data: {
    content?: string
    createTime?: string
    endTime?: string
    type: number
  }
}
interface FetchTopicListResponse {
  costTime: number
  result: {
    status: number
    code: number
    msg?: string
  }
  data?: {
    total: number
    size: number
    current: number
    countId?: number
    records: TopicInfoData[]
  }
}

interface QurstionBankInfoData {
  id?: number
  title: string
  createUserId?: number
  createTime?: string
  updateTime?: string
  deleteFlag?: number
}
interface FetchQuestionBankList {
  page: number
  limit: number
  data: {
    title?: string
    startTime?: string
    endTime?: string
  }
}
interface FetchQuestionBankListResponse {
  costTime: number
  result: {
    status: number
    code: number
    msg?: string
  }
  data: {
    total: number
    size: number
    current: number
    orders?: any[]
    optimizeCountSql: boolean
    hitCount: boolean
    countId?: number
    maxLimit?: number
    searchCount: boolean
    pages: number
    records: QurstionBankInfoData[]
  }
}
//添加题库
interface OperateQuestionBankData {
  msg: string
  code: string
  data: {
    title: string
  }
}
export type {
  TopicInfoData,
  BaseResponse,
  SearchFormData,
  FetchTopicListResponse,
  FetchQuestionBankList,
  FetchQuestionBankListResponse,
  QurstionBankInfoData,
  OperateQuestionBankData,
}
