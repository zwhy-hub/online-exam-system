import * as types from './type'
import { Get, GetIdOnly, Post, PostById, PostIdOnly } from '@/utils/decorators'

class AuthServeice {
  //获取题目列表
  @Post('/question/listForPage')
  async fetchTopicList(data: types.SearchFormData): Promise<types.FetchTopicListResponse | null> {
    return null
  }
  //查询题目详情
  @GetIdOnly('/question/getDetail')
  async fetchTopicDetail(id: number): Promise<types.FetchTopicDetailResponse | null> {
    return null
  }
  //根据题目id获取题库列表
  @GetIdOnly('/repo/listByQuestionId')
  async fetchQuestionBankByTopicId(id: number): Promise<types.GetQuestionBankList | null> {
    return null
  }
  //添加题目
  @PostById('/question/save')
  async addTopic(id: number, data: types.OperateTopic): Promise<types.BaseResponse | null> {
    return null
  }
  //编辑题目
  @PostById('/question/update')
  async editTopic(id: number, data: types.OperateTopic): Promise<types.BaseResponse | null> {
    return null
  }
  @PostIdOnly('/question/delete')
  async deleteTopic(id: number): Promise<types.BaseResponse | null> {
    return null
  }
  //获取题库列表
  @Post('/repo/listForPage')
  async fetchQuestionBankList(
    data: types.FetchQuestionBankList,
  ): Promise<types.FetchQuestionBankListResponse | null> {
    return null
  }
  //添加题库
  @PostById('/repo/save')
  async addQuestionBank(
    id: number,
    data: types.OperateQuestionBankData,
  ): Promise<types.BaseResponse | null> {
    return null
  }
  //编辑题库
  @PostById('/repo/update')
  async editQuestionBank(
    id: number,
    data: types.OperateQuestionBankData,
  ): Promise<types.BaseResponse | null> {
    return null
  }
  //删除题库
  @PostIdOnly('/repo/delete')
  async deleteQuestionBank(id: number): Promise<types.BaseResponse | null> {
    return null
  }
  //获取题库列表
  @Get('/repo/list')
  async getQuestionBankList(): Promise<types.GetQuestionBankList | null> {
    return null
  }
}

export default new AuthServeice()
