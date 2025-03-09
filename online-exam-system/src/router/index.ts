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
        {
          path: 'back',
          name: 'back',
          component: () => import('../views/back/index.vue'),
          meta: {
            isLogin: true,
          },
        },
        {
          path: 'teacherBack',
          name: 'teacherBack',
          component: () => import('../views/teacherBack/index.vue'),
          meta: {
            isLogin: true,
          },
        },
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
              path: 'home',
              name: 'manageHome',
              component: () => import('../manageViews/home/index.vue'),
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
            },
            {
              path: 'topicManage',
              name: 'topicManage',
              component: () => import('../manageViews/topicManage/index.vue'),
              meta: {
                isAdmin: true,
              },
            },
            {
              path: 'examManage',
              name: 'examManage',
              component: () => import('../manageViews/examManage/index.vue'),
              meta: {
                isAdmin: true,
              },
            },
            {
              path: 'adminManage',
              name: 'adminManage',
              component: () => import('../manageViews/adminManage/index.vue'),
              meta: {
                isAdmin: true,
              },
            },
            {
              path: 'noticeManage',
              name: 'noticeManage',
              component: () => import('../manageViews/noticeManage/index.vue'),
              meta: {
                isAdmin: true,
              },
            },
            {
              path: 'logData',
              name: 'logData',
              component: () => import('../manageViews/logData/index.vue'),
              meta: {
                isAdmin: true,
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
