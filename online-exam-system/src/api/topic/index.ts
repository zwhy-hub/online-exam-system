import * as types from './type'
import { Post, PostById, PostIdOnly } from '@/utils/decorators'

class AuthServeice {
  //获取题目列表
  @Post('/question/listForPage')
  async fetchTopicList(data: types.SearchFormData): Promise<types.FetchTopicListResponse | null> {
    return null
  }

  //获取题库列表
  @Post('/repo/listForPage')
  async fetchQuestionBankList(
    data: types.FetchQuestionBankList,
  ): Promise<types.FetchQuestionBankListResponse | null> {
    return null
  }
}

export default new AuthServeice()
