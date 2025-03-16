import { defineStore } from 'pinia'
import * as types from '@/api/topic/type'
import AuthServeice from '@/api/topic/index'

const useTopicStore = defineStore('Topic', {
  actions: {
    async FetchTopicList(data: types.SearchFormData) {
      const res: types.BaseResponse | null = await AuthServeice.fetchTopicList(data)
      if (!res) {
        console.error('查询接口返回为空')
        return null
      }
      return res
    },
  },
})

export default useTopicStore
