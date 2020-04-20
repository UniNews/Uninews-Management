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
      path: '/',
      name: 'Dashboard',
      component: () => import('../views/Dashboard')
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
    }
  ]
})