import { defineStore } from 'pinia'
import * as types from '@/api/topic/type'
import AuthServeice from '@/api/topic/index'

const useTopicStore = defineStore('Topic', {
  actions: {
    //获取题目列表
    async FetchTopicList(data: types.SearchFormData) {
      const res: types.FetchTopicListResponse | null = await AuthServeice.fetchTopicList(data)
      if (!res) {
        console.error('查询接口返回为空')
        return null
      }
      return res
    },

    //获取题库列表
    async FetchQuestionBank(data: types.FetchQuestionBankList) {
      const res: types.FetchQuestionBankListResponse | null =
        await AuthServeice.fetchQuestionBankList(data)
      if (!res) {
        console.error('查询接口返回为空')
        return null
      }
      return res
    },
  },
})

export default useTopicStore
