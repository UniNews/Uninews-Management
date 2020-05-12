import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/Login'),
      meta: { title: 'Login' }
    },
    {
      path: '/users',
      name: 'Users',
      component: () => import('../views/user/Users'),
      meta: { title: 'Users' }
    },
    {
      path: '/',
      name: 'News',
      component: () => import('../views/news/News'),
      meta: { title: 'News' }
    },
    {
      path: '/newsdetail',
      name: 'NewsDetail',
      component: () => import('../views/news/NewsDetail'),
      meta: { title: 'NewsDetail' }
    },
    {
      path: '/reports',
      name: 'Reports',
      component: () => import('../views/report/Reports'),
      meta: { title: 'Reports' }
    },
    {
      path: '/community',
      name: 'Community',
      component: () => import('../views/community/Community'),
      meta: { title: 'Community' }
    },
    {
      path: '/user',
      name: 'User',
      component: () => import('../views/user/User'),
      meta: { title: 'User' }
    },
    {
      path: '/myUser',
      name: 'MyUser',
      component: () => import('../views/user/MyUser'),
      meta: { title: 'MyUser' }
    },
    {
      path: '/comment',
      name: 'Comment',
      component: () => import('../views/comment/Comment'),
      meta: { title: 'Comment' }
    },
    {
      path: '/communities',
      name: 'Communities',
      component: () => import('../views/community/Communities'),
      meta: { title: 'Communities' }
    }
  ]
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})

export default router