import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: '',
      component: () => import('../Layout/index.vue'),

      children: [
        {
          path: '/',
          name: 'home',
          component: () => import('../views/home/Home.vue'),
        },
        {
          path: 'examList',
          name: 'examList',
          component: () => import('../views/examList/index.vue'),
          meta: {
            isLogin: true,
          },
        },
        {
          path: 'score',
          name: 'score',
          component: () => import('../views/score/index.vue'),
          meta: {
            isLogin: true,
          },
        },
        // {
        //   path: 'back',
        //   name: 'back',
        //   component: () => import('../views/back/index.vue'),
        //   meta: {
        //     isLogin: true,
        //   },
        // },
        // {
        //   path: 'teacherBack',
        //   name: 'teacherBack',
        //   component: () => import('../views/teacherBack/index.vue'),
        //   meta: {
        //     isLogin: true,
        //   },
        // },
        {
          path: 'reTeacher',
          name: 'reTeacher',
          component: () => import('../views/reTeacher/index.vue'),
          meta: {
            isLogin: true,
          },
        },
        {
          path: 'user',
          name: 'user',
          component: () => import('../views/user/index.vue'),
          meta: {
            isLogin: true,
          },
        },
        {
          path: 'manage',
          name: 'manage',
          component: () => import('../manageViews/home/index.vue'),
          meta: {
            isAdmin: true,
          },
          children: [
            {
              path: 'adminHome',
              name: 'adminHome',
              component: () => import('../manageViews/home/adminHome.vue'),
              meta: {
                isAdmin: true,
              },
            },
            {
              path: 'teacherHome',
              name: 'teacherHome',
              component: () => import('../manageViews/home/teacherHome.vue'),
              meta: {
                isAdmin: true,
              },
            },
            {
              path: 'userManage',
              name: 'userManage',
              component: () => import('../manageViews/userManage/index.vue'),
              meta: {
                isAdmin: true,
              },
              children: [
                {
                  path: '__userManage',
                  name: '__userManage',
                  component: () => import('../manageViews/userManage/userManage/index.vue'),
                  meta: {
                    isAdmin: true,
                  },
                },
                {
                  path: '__orderManage',
                  name: '__orderManage',
                  component: () => import('../manageViews/userManage/orderManage/index.vue'),
                  meta: {
                    isAdmin: true,
                  },
                },
                {
                  path: '__classManage',
                  name: '__classManage',
                  component: () => import('../manageViews/userManage/classManage/index.vue'),
                  meta: {
                    isAdmin: true,
                  },
                },
              ],
            },
            {
              path: 'topicManage',
              name: 'topicManage',
              component: () => import('../manageViews/topicManage/index.vue'),
              meta: {
                isAdmin: true,
              },
              children: [
                {
                  path: '__topicManage',
                  name: '__topicManage',
                  component: () => import('../manageViews/topicManage/topicManage/index.vue'),
                  meta: {
                    isAdmin: true,
                  },
                },
                {
                  path: '__questionBankManage',
                  name: '__questionBankManage',
                  component: () =>
                    import('../manageViews/topicManage/questionBankManage/index.vue'),
                  meta: {
                    isAdmin: true,
                  },
                },
              ],
            },
            {
              path: 'examManage',
              name: 'examManage',
              component: () => import('../manageViews/examManage/index.vue'),
              meta: {
                isAdmin: true,
              },
              children: [
                {
                  path: '__examManage',
                  name: '__examManage',
                  component: () => import('../manageViews/examManage/examManage/index.vue'),
                  meta: {
                    isAdmin: true,
                  },
                },
                {
                  path: '__scoreManage',
                  name: '__scoreManage',
                  component: () => import('../manageViews/examManage/scoreManage/index.vue'),
                  meta: {
                    isAdmin: true,
                  },
                },
                {
                  path: '__testPaperManage',
                  name: '__testPaperManage',
                  component: () => import('../manageViews/examManage/testPaperManage/index.vue'),
                  meta: {
                    isAdmin: true,
                  },
                },
              ],
            },
            {
              path: 'adminManage',
              name: 'adminManage',
              component: () => import('../manageViews/adminManage/index.vue'),
              meta: {
                isSuperAdmin: true,
              },
            },
            {
              path: 'noticeManage',
              name: 'noticeManage',
              component: () => import('../manageViews/noticeManage/index.vue'),
              meta: {
                isSuperAdmin: true,
              },
            },
            {
              path: 'logData',
              name: 'logData',
              component: () => import('../manageViews/logData/index.vue'),
              meta: {
                isSuperAdmin: true,
              },
            },
          ],
        },
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login/Login.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/register/Register.vue'),
    },
    //404
    {
      path: '/:pathMatch(.*)*',
      name: '404',
      component: () => import('../views/404.vue'),
    },
  ],
})

export default router
