import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/location/add",
    name: "LocationAddForm",
    component: () =>
      import("../views/LocationAddForm.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () =>
      import("../views/Register.vue"),
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('access_token')) {
        next('/')
      } else {
        next()
      }
    }
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import("../views/Login.vue"),
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('access_token')) {
        next('/')
      } else {
        next()
      }
    }
  },
  {
    path: "/favourite",
    name: "Favourite",
    component: () =>
      import("../views/Favourite.vue"),
    beforeEnter: (to, from, next) => {
      if (!localStorage.getItem('access_token')) {
        next('/')
      } else {
        next()
      }
    }
  },
  {
    path: "/location/:locationId",
    name: "LocationDetail",
    component: () =>
      import("../views/Detail.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
