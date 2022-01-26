import Vue from "vue";
import VueRouter from "vue-router";
import HomePage from "../views/HomePage.vue";
import RegistrationPage from "../views/RegistrationPage.vue";
import LoginPage from "../views/LoginPage.vue";
import EditPage from "../views/EditPage.vue";
import ChatPage from "../views/ChatPage.vue";
import CreateDiary from "../views/CreateDiary.vue";
import FindPage from "../views/FindPage.vue";

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
    path: "/editpage/:diaryId",
    name: "EditPage",
    component: EditPage,
  },
  {
    path: "/chatpage",
    name: "ChatPage",
    component: ChatPage,
  },
  {
    path: "/creatediary",
    name: "CreateDiary",
    component: CreateDiary,
  },
  {
    path: "/findpage",
    name: "FindPage",
    component: FindPage,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
