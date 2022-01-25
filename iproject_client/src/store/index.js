import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    registrationStatus: false,
    userData: {},
    diaryList: {},
  },
  mutations: {
    CHANGE_USERDATA(state, payload) {
      state.userData = payload;
    },
    CHANGE_REGISTRATION_STATUS(state, payload) {
      state.registrationStatus = payload;
    },
    CHANGE_DIARY_LIST(state, payload) {
      state.diaryList = payload;
    },
  },
  actions: {
    async login(context) {
      try {
        const userData = context.state.userData;
        const login = await axios({
          url: "http://localhost:3000/login",
          method: "post",
          data: {
            email: userData.email,
            password: userData.password,
          },
        });
        localStorage.setItem("access_token", login.data.access_token);
        localStorage.setItem("userId", login.data.userId);
      } catch (err) {
        console.log(err.response);
      }
    },
    async registration(context) {
      try {
        const userData = context.state.userData;
        const registerUser = await axios({
          url: "http://localhost:3000/register",
          method: "post",
          data: {
            name: userData.name,
            username: userData.username,
            password: userData.password,
            email: userData.email,
            phoneNumber: userData.phoneNumber,
          },
        });
        console.log(registerUser);
        context.commit("CHANGE_REGISTRATION_STATUS", true);
      } catch (err) {
        console.log(err.response.data);
      }
    },
    async getDiary(context) {
      try {
        const diaryList = await axios.get(`http://localhost:3000/diaries`, {
          headers: { access_token: localStorage.getItem("access_token") },
        });
        context.commit("CHANGE_DIARY_LIST", diaryList.data);
      } catch (err) {
        console.log(err.response);
      }
    },
  },
  modules: {},
});
