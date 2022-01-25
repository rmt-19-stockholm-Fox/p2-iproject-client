import Vue from "vue";
import VueRouter from "vue-router";
import HomePage from "../views/HomePage.vue";
import RegistrationPage from "../views/RegistrationPage.vue";
import LoginPage from "../views/LoginPage.vue";
import EditPage from "../views/EditPage.vue";
import ChatPage from "../views/ChatPage.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "HomePage",
    component: HomePage,
  },
  {
    path: "/loginpage",
    name: "LoginPage",
    component: LoginPage,
  },
  {
    path: "/registrationpage",
    name: "RegistrationPage",
    component: RegistrationPage,
  },
  {
    path: "/editpage",
    name: "EditPage",
    component: EditPage,
  },
  {
    path: "/chatpage",
    name: "ChatPage",
    component: ChatPage,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
