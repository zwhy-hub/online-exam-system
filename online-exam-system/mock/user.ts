import { Random } from 'mockjs'

export default [
  {
    url: '/api/register',
    method: 'post',
    response: () => {
      return {
        costTime: 100,
        result: {
          status: 0,
          code: 200,
          msg: '注册成功',
        },
        data: {
          id: Random.id(),
          username: Random.name().toLowerCase(),
          name: Random.cname(),
          role: 1,
          phone: '13' + Random.string('number', 9),
          email: Random.email(),
          create_time: Random.datetime(),
          lock_flag: 0,
          del_flag: 0,
        },
      }
    },
  },
  {
    url: '/api/login',
    method: 'post',
    response: () => {
      return {
        costTime: 100,
        data: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MTU3NTY1NjY1NDAsInJvbGUiOjEsImlkIjoxfQ.1E4OiX0KMvz_XP_t9',
        result: {
          status: 0,
          code: 200,
          msg: '登录成功',
          id: 1,
          role: 1,
          username: 'admin',
        },
      }
    },
  },
  {
    url: '/api/user/saveAdmin',
    method: 'post',
    response: () => {
      return {
        costTime: 100,
        result: {
          status: 0,
          code: 200,
          msg: '添加管理员成功',
        },
      }
    },
  },
  {
    url: '/api/user/deleteUser/:id',
    method: 'post',
    response: () => {
      return {
        costTime: 100,
        result: {
          status: 0,
          code: 200,
          msg: '删除用户成功',
        },
      }
    },
  },
  {
    url: '/api/user/listUserForPage',
    method: 'post',
    response: () => {
      const users = []
      for (let i = 0; i < 10; i++) {
        users.push({
          id: i + 1,
          username: Random.name().toLowerCase(),
          name: Random.cname(),
          role: Random.integer(0, 1),
          phone: '13' + Random.string('number', 9),
          email: Random.email(),
          create_time: Random.datetime(),
          update_time: Random.datetime(),
          lock_flag: Random.integer(0, 1),
          del_flag: 0,
        })
      }
      return {
        costTime: 100,
        result: {
          status: 0,
          code: 200,
          msg: '获取用户列表成功',
        },
        data: {
          records: users,
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
        },
      }
    },
  },
  {
    url: '/api/user/saveUser',
    method: 'post',
    response: () => {
      return {
        costTime: 100,
        result: {
          status: 0,
          code: 200,
          msg: '添加用户成功',
        },
      }
    },
  },
  {
    url: '/api/user/updateUser/:id',
    method: 'post',
    response: () => {
      return {
        costTime: 100,
        result: {
          status: 0,
          code: 200,
          msg: '更新用户成功',
        },
      }
    },
  },
  {
    url: '/api/user/lockUser/:id',
    method: 'post',
    response: () => {
      return {
        costTime: 100,
        result: {
          status: 0,
          code: 200,
          msg: '修改用户状态成功',
        },
      }
    },
  },
]
