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
    //根据题目id获取题库列表
    async FetchQuestionBankByTopicId(id: number) {
      const res: types.GetQuestionBankList | null =
        await AuthServeice.fetchQuestionBankByTopicId(id)
      if (!res) {
        console.error('查询接口返回为空')
        return null
      }
      return res
    },
    //查询题目详情
    async FetchTopicDetail(id: number) {
      const res: types.FetchTopicDetailResponse | null = await AuthServeice.fetchTopicDetail(id)
      if (!res) {
        console.error('查询接口返回为空')
        return null
      }
      return res
    },
    //添加题目
    async AddTopic(id: number, data: types.OperateTopic) {
      const res: types.BaseResponse | null = await AuthServeice.addTopic(id, data)
      if (!res) {
        console.error('添加接口返回为空')
        return null
      }
      return res
    },
    //编辑题目
    async EditTopic(id: number, data: types.OperateTopic) {
      const res: types.BaseResponse | null = await AuthServeice.editTopic(id, data)
      if (!res) {
        console.error('编辑接口返回为空')
        return null
      }
      return res
    },
    //删除题目
    async DeleteTopic(id: number) {
      const res: types.BaseResponse | null = await AuthServeice.deleteTopic(id)
      if (!res) {
        console.error('删除接口返回为空')
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

    //添加题库
    async AddQuestionBank(id: number, data: types.OperateQuestionBankData) {
      const res: types.BaseResponse | null = await AuthServeice.addQuestionBank(id, data)
      if (!res) {
        console.error('添加接口返回为空')
        return null
      }
      return res
    },
    //编辑题库
    async EditQuestionBank(id: number, data: types.OperateQuestionBankData) {
      const res: types.BaseResponse | null = await AuthServeice.addQuestionBank(id, data)
      if (!res) {
        console.error('编辑接口返回为空')
        return null
      }
      return res
    },
    //删除题库
    async DeleteQuestionBank(id: number) {
      const res: types.BaseResponse | null = await AuthServeice.deleteQuestionBank(id)
      if (!res) {
        console.error('删除接口返回为空')
        return null
      }
      return res
    },
    //获取题库列表
    async GetQuestionBankList() {
      const res: types.GetQuestionBankList | null = await AuthServeice.getQuestionBankList()
      if (!res) {
        console.error('查询接口返回为空')
        return null
      }
      return res
    },
  },
})

export default useTopicStore
