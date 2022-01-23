import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';
import '../helpers/axios';
import storage from '../helpers/storage';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null
  },
  getters: {
    isLoggedIn(state) {
      return state.user != null;
    }
  },
  mutations: {
    LOG_IN(state, user) {
      state.user = user;
    },
    LOG_OUT(state) {
      state.user = null;
    }
  },
  actions: {
    async loginGoogle(context, token) {
      try {
        const { data } = await axios.post('/login-google', {
          token
        });

        storage.accessToken.set(data.access_token);
        context.commit('LOG_IN', data.user);
      } catch(err) {
        console.log(err);
      }
    },
    async verifyToken(context, token) {
      try {
        const { data } = await axios.post('/token-verification', {
          access_token: token
        });

        context.commit('LOG_IN', data);
      } catch(err) {
        console.log(err);
      }
    }
  },
  modules: {
  }
})
