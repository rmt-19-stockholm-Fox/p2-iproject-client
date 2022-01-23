import Vue from 'vue'
import VueRouter from 'vue-router'
import storage from '../helpers/storage'
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
    component: () => import('../views/Login.vue'),
    beforeEnter(to, from, next) {
      if (storage.accessToken.value()) {
        next('/');
      } else {
        next();
      }
    }
  },
  {
    path: '/logout',
    name: 'Logout',
    component: () => import('../views/Logout.vue'),
    beforeEnter(to, from, next) {
      if (!storage.accessToken.value()) {
        next('/');
      } else {
        next();
      }
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
