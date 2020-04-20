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
      component: () => import('../views/News')
    },
    {
      path: '/news',
      name: 'NewsDetail',
      component: () => import('../views/News')
    },
    {
      path: '/report',
      name: 'Report',
      component: () => import('../views/Report')
    },
    {
      path: '/community',
      name: 'Community',
      component: () => import('../views/Community')
    },
    {
      path: '/user',
      name: 'User',
      component: () => import('../views/user/User')
    }
  ]
})