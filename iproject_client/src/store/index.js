import Vue from "vue";
import Vuex from "vuex";

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
  actions: {},
  modules: {},
});
