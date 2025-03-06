// import router from './index'
// import pinia from '../stores'
// import useUserStore from '../stores/modules/user'

// let useStoer = useUserStore(pinia)

// router.beforeEach((to: any, _from: any, next: any) => {
//   const user = useStoer.user
//   if (user && user.id) {
//     if (to.path == '/login') {
//       next({ path: '/' })
//     } else {
//       next()
//     }
//   } else {
//     if (to.path === '/login' || to.path === '/register') {
//       next()
//     } else {
//       {
//         next({ path: '/login' })
//       }
//     }
//   }
// })
