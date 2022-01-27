import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/LoginPage.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/RegisterPage.vue')
  },
  {
    path: '/travel/:id',
    name: 'Detail Page',
    component: () => import('../views/DetailPage.vue')
  },
  {
    path: '/travelplace',
    name: 'TravelPlace',
    component: () => import(/* webpackChunkName: "about" */ '../views/TravelPlace.vue')
  },
  {
    path: '/travelpost',
    name: 'TravelPost',
    component: () => import(/* webpackChunkName: "about" */ '../views/TravelPostPage.vue')
  },
  {
    path: '/paymentonly',
    name: 'paymentonly',
    component: () => import(/* webpackChunkName: "about" */ '../views/paymentonly.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const accessToken = localStorage.getItem('access_token')
  if (to.name === 'Login' && accessToken) next({ name: 'Home' })
  if (to.name === 'Home' && !accessToken) next({ name: 'Login' })
  else next()
})

export default router
