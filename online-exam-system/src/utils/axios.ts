import axios from 'axios'

// 创建 axios 实例
const req = axios.create({
  baseURL: '/api', //  通过 Vite 代理请求后端
  timeout: 10000, // 超时时间 10s
  withCredentials: true, // 允许携带 Cookie
})

// 请求拦截器
req.interceptors.request.use(
  (config) => {
    // 添加 token
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// 响应拦截器
req.interceptors.response.use(
  (response) => {
    return response.data //直接返回 data，避免每次取 `.data`
  },
  (error) => {
    console.error('API Error:', error)
    return Promise.reject(error)
  },
)

export default req
