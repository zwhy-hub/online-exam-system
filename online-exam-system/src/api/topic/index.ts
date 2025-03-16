import * as types from './type'
import { Post, PostById, PostIdOnly } from '@/utils/decorators'

class AuthServeice {
  @Post('/question/listForPage')
  async fetchTopicList(data: types.SearchFormData): Promise<types.BaseResponse | null> {
    return null
  }
}

export default new AuthServeice()
