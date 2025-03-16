interface TopicInfoData {
  id?: number
  content?: string
  startDate?: string
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
    startDate?: string
    endTime?: string
    type: number
  }
}

export type { TopicInfoData, BaseResponse, SearchFormData }
