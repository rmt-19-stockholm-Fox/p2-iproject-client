import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    travelPosts: []
  },
  mutations: {
    IS_TRAVELPOSTS (state, payload) {
      state.travelPosts = payload
    }
  },
  actions: {
    loginSubmit (context, payload) {
      return new Promise((resolve, reject) => {
        axios({
          url: 'http://localhost:4000/login',
          method: 'post',
          data: {
            email: payload.email,
            password: payload.password
          }
        })
          .then(data => {
            localStorage.setItem('access_token', data.data.access_token)
            resolve(data.data)
          })
          .catch(err => reject(err))
      })
    },
    registerSubmit (context, payload) {
      return new Promise((resolve, reject) => {
        axios({
          url: 'http://localhost:4000/register',
          method: 'post',
          data: {
            email: payload.email,
            password: payload.password
          }
        })
          .then(data => {
            resolve(data.data)
          })
          .catch(err => reject(err))
      })
    },
    fetchTravels (context, payload) {
      axios({
        url: 'http://localhost:4000/travel',
        method: 'get',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(data => {
          context.commit('IS_TRAVELPOSTS', data.data)
        })
        .catch(err => console.log(err))
    }
  },
  modules: {
  }
})
