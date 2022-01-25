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
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/user/register',
    name: 'UserRegister',
    component: () => import('../views/UserRegister.vue')
  },
  {
    path: '/shop/register',
    name: 'ShopRegister',
    component: () => import('../views/ShopRegister.vue')
  },
  {
    path: '/shop/edit',
    name: 'EditShopPage',
    component: () => import('../views/EditShopPage.vue')
  },
  {
    path: '/product',
    name: 'ProductsPage',
    component: () => import('../views/ProductsPage.vue')
  },
  {
    path: '/product/add',
    name: 'AddProductPage',
    component: () => import('../views/AddProductPage.vue')
  },
  {
    path: '/product/edit/:productId',
    name: 'EditProductPage',
    component: () => import('../views/EditProductPage.vue')
  },
  {
    path: '/order/history',
    name: 'OrderHistoryList',
    component: () => import('../views/OrderHistoryList.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
