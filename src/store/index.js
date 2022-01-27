import axios from "axios";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    server: `http://localhost:3000/`,
    start: false,
    start2: false,
    perftime: false,
    perfplace: false,
  },
  mutations: {
    CHANGE_START(state, plod) {
      state.start = plod;
    },
    CHANGE_START2(state, plod) {
      state.start2 = plod;
    },
    CHANGE_PERFTIME(state, plod) {
      state.perftime = plod;
    },
    CHANGE_PERFPLACE(state, plod) {
      state.perfplace = plod;
    },
  },
  actions: {
    async getmydays(context, plod) {
      try {
        console.log(plod);
        const resu = await axios.post(`${this.state.server}findtime`, plod);
        context.commit(`CHANGE_PERFTIME`, resu.data.output);
      } catch (error) {
        console.log(error);
      }
    },
    async getmyplaces(context, plod) {
      try {
        console.log(plod);
        const resu = await axios.post(`${this.state.server}findplace`, plod);
        context.commit(`CHANGE_PERFPLACE`, resu.data);
      } catch (error) {
        console.log(error);
      }
    },
  },
  modules: {},
});
