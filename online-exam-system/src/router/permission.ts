import router from './index'
import pinia from '../stores'
import useUserStore from '../stores/modules/user'

let useStoer = useUserStore(pinia)

router.beforeEach((to: any, _from: any, next: any) => {
  const user = useStoer.user
  if (to.meta.isLogin) {
    if (user) {
      next()
    } else {
      next({ path: '/login' })
    }
  } else if (to.meta.isAdmin) {
    if (user?.role === 2 || user?.role === 3 || user?.role === 4) {
      next()
    } else {
      next({ path: '/404' })
    }
  } else if (to.meta.isAdmin) {
    if (user?.role === 4) {
      next()
    } else {
      next({ path: '/404' })
    }
  } else {
    next()
  }
})
