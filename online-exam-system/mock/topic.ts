import { Random } from 'mockjs'

export default [
  // 获取题目列表
  {
    url: '/api/question/listForPage',
    method: 'post',
    response: () => {
      const topics = []
      for (let i = 0; i < 10; i++) {
        topics.push({
          id: i + 1,
          content: Random.sentence(5, 10),
          createTime: Random.datetime(),
          endTime: Random.datetime(),
          type: Random.integer(0, 2), // 0:单选 1:多选 2:判断
          correctAnswerId: Random.integer(1, 4),
          createUserId: Random.integer(1, 100),
          deleteFlag: 0,
        })
      }
      return {
        costTime: 100,
        result: {
          status: 0,
          code: 200,
          msg: '获取题目列表成功',
        },
        data: {
          total: 100,
          size: 10,
          current: 1,
          countId: null,
          records: topics,
        },
      }
    },
  },

  // 查询题目详情
  {
    url: '/api/question/getDetail/:id',
    method: 'get',
    response: ({ url }: { url: string }) => {
      const id = url.match(/\/api\/question\/getDetail\/(\d+)/)?.[1] || '1'

      // 根据题目类型返回不同的答案列表
      const type = Random.integer(0, 2)
      let answerList = []

      if (type === 0) {
        // 单选
        for (let i = 0; i < 4; i++) {
          answerList.push({
            id: i + 1,
            content: Random.sentence(3, 6),
            correctFlag: i === 0 ? 1 : 0, // 第一个为正确答案
            questionId: id,
          })
        }
      } else if (type === 1) {
        // 多选
        for (let i = 0; i < 4; i++) {
          answerList.push({
            id: i + 1,
            content: Random.sentence(3, 6),
            correctFlag: i < 2 ? 1 : 0, // 前两个为正确答案
            questionId: id,
          })
        }
      }

      return {
        costTime: 100,
        result: {
          status: 0,
          code: 200,
          msg: '获取题目详情成功',
        },
        data: {
          id: [parseInt(id)],
          content: Random.sentence(5, 10),
          type: type,
          answerList: answerList,
          judgeCorrection: type === 2 ? Random.integer(0, 1) : undefined, // 判断题时才有
        },
      }
    },
  },

  // 根据题目id获取题库列表
  {
    url: '/api/repo/listByQuestionId/:id',
    method: 'get',
    response: () => {
      const repos = []
      for (let i = 0; i < Random.integer(1, 5); i++) {
        repos.push({
          id: i + 1,
          title: `题库${i + 1}`,
          createUserId: Random.integer(1, 100),
          createTime: Random.datetime(),
          updateTime: Random.datetime(),
          deleteFlag: 0,
        })
      }
      return {
        costTime: 100,
        result: {
          status: 0,
          code: 200,
          msg: '获取题库列表成功',
        },
        data: repos,
      }
    },
  },

  // 添加题目
  {
    url: '/api/question/save/:id',
    method: 'post',
    response: () => {
      return {
        costTime: 100,
        result: {
          status: 0,
          code: 200,
          msg: '添加题目成功',
        },
      }
    },
  },

  // 编辑题目
  {
    url: '/api/question/update/:id',
    method: 'post',
    response: () => {
      return {
        costTime: 100,
        result: {
          status: 0,
          code: 200,
          msg: '编辑题目成功',
        },
      }
    },
  },

  // 删除题目
  {
    url: '/api/question/delete/:id',
    method: 'post',
    response: () => {
      return {
        costTime: 100,
        result: {
          status: 0,
          code: 200,
          msg: '删除题目成功',
        },
      }
    },
  },

  // 获取题库列表(分页)
  {
    url: '/api/repo/listForPage',
    method: 'post',
    response: () => {
      const repos = []
      for (let i = 0; i < 10; i++) {
        repos.push({
          id: i + 1,
          title: `题库${i + 1}`,
          createUserId: Random.integer(1, 100),
          createTime: Random.datetime(),
          updateTime: Random.datetime(),
          deleteFlag: 0,
        })
      }
      return {
        costTime: 100,
        result: {
          status: 0,
          code: 200,
          msg: '获取题库列表成功',
        },
        data: {
          total: 100,
          size: 10,
          current: 1,
          orders: [],
          optimizeCountSql: true,
          hitCount: false,
          countId: null,
          maxLimit: null,
          searchCount: true,
          pages: 10,
          records: repos,
        },
      }
    },
  },

  // 添加题库
  {
    url: '/api/repo/save/:id',
    method: 'post',
    response: () => {
      return {
        costTime: 100,
        result: {
          status: 0,
          code: 200,
          msg: '添加题库成功',
        },
      }
    },
  },

  // 编辑题库
  {
    url: '/api/repo/update/:id',
    method: 'post',
    response: () => {
      return {
        costTime: 100,
        result: {
          status: 0,
          code: 200,
          msg: '编辑题库成功',
        },
      }
    },
  },

  // 删除题库
  {
    url: '/api/repo/delete/:id',
    method: 'post',
    response: () => {
      return {
        costTime: 100,
        result: {
          status: 0,
          code: 200,
          msg: '删除题库成功',
        },
      }
    },
  },

  // 获取题库列表(不分页)
  {
    url: '/api/repo/list',
    method: 'get',
    response: () => {
      const repos = []
      for (let i = 0; i < 10; i++) {
        repos.push({
          id: i + 1,
          title: `题库${i + 1}`,
          createUserId: Random.integer(1, 100),
          createTime: Random.datetime(),
          updateTime: Random.datetime(),
          deleteFlag: 0,
        })
      }
      return {
        costTime: 100,
        result: {
          status: 0,
          code: 200,
          msg: '获取题库列表成功',
        },
        data: repos,
      }
    },
  },
]
