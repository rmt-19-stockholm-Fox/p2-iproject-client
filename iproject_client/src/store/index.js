import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userData: {},
  },
  mutations: {
    CHANGE_USERDATA(state, payload) {
      state.userData = payload;
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
      } catch (err) {
        console.log(err.response);
      }
    },
  },
  modules: {},
});
