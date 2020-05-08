import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/Login')
    },
    {
      path: '/users',
      name: 'Users',
      component: () => import('../views/user/Users')
    },
    {
      path: '/news',
      name: 'News',
      component: () => import('../views/news/News')
    },
    {
      path: '/newsdetail',
      name: 'NewsDetail',
      component: () => import('../views/news/NewsDetail')
    },
    {
      path: '/reports',
      name: 'Reports',
      component: () => import('../views/report/Reports')
    },
    {
      path: '/community',
      name: 'Community',
      component: () => import('../views/community/Community')
    },
    {
      path: '/user',
      name: 'User',
      component: () => import('../views/user/User')
    },
    {
      path: '/myUser',
      name: 'MyUser',
      component: () => import('../views/user/MyUser')
    },
    {
      path: '/comment',
      name: 'Comment',
      component: () => import('../views/comment/Comment')
    },
    {
      path: '/communities',
      name: 'Communities',
      component: () => import('../views/community/Communities')
    }
  ]
})