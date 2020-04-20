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
      path: '/report',
      name: 'Report',
      component: () => import('../views/Report')
    },
    {
      path: '/community',
      name: 'Community',
      component: () => import('../views/community/Community')
    },
    {
      path: '/communities',
      name: 'Communities',
      component: () => import('../views/community/Communities')
    },
    {
      path: '/user',
      name: 'User',
      component: () => import('../views/user/User')
    }
  ]
})