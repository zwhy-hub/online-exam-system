export default [
  {
    url: '/api/user/register',
    method: 'post',
    response: () => {
      return {
        code: 200,
        status: 0,
        message: 'success',
      }
    },
  },
]
