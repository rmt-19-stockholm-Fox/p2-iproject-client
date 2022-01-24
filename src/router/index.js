import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginRegis from '../views/LoginRegister.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: LoginRegis
  },
  {
    path: '/register',
    name: 'Register',
    component: LoginRegis
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
