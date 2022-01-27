import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Detail from "../views/Detail.vue";
import RegisterCust from "../views/RegisterCust.vue";
import RegisterSeller from "../views/RegisterSeller.vue";
import MyProduct from "../views/MyProduct.vue";
import Bookmark from "../views/Bookmark.vue";
import AddProduct from "../views/AddProduct.vue";
import EditProduct from "../views/Edit.vue";
import Chat from "../views/Chat.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/detail-page/:id",
    name: "Detail",
    component: Detail,
  },
  {
    path: "/register/customer",
    name: "RegisterCust",
    component: RegisterCust,
  },
  {
    path: "/register/seller",
    name: "RegisterSeller",
    component: RegisterSeller,
  },
  {
    path: "/seller/myProduct",
    name: "MyProduct",
    component: MyProduct,
    beforeEnter: (to, from, next) => {
      if (to.name === "MyProduct" && !localStorage.access_token) {
        next({ name: "Login" });
      } else {
        next();
      }
    },
  },
  {
    path: "/bookmark",
    name: "Bookmark",
    component: Bookmark,
    beforeEnter: (to, from, next) => {
      if (to.name === "Bookmark" && !localStorage.access_token) {
        next({ name: "Login" });
      } else {
        next();
      }
    },
  },
  {
    path: "/add-product",
    name: "AddProduct",
    component: AddProduct,
    beforeEnter: (to, from, next) => {
      if (to.name === "AddProduct" && !localStorage.access_token) {
        next({ name: "Login" });
      } else {
        next();
      }
    },
  },
  {
    path: "/edit-product/:id",
    name: "EditProduct",
    component: EditProduct,
    beforeEnter: (to, from, next) => {
      if (to.name === "EditProduct" && !localStorage.access_token) {
        next({ name: "Login" });
      } else {
        next();
      }
    },
  },
  {
    path: "/chat",
    name: "Chat",
    component: Chat,
  },
  {
    path: "/chat",
    name: "Chat",
    component: Chat,
    beforeEnter: (to, from, next) => {
      if (to.name === "Chat" && !localStorage.access_token) {
        next({ name: "Login" });
      } else {
        next();
      }
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
