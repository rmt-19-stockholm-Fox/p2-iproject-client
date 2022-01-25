import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
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
    }
  },
  modules: {
  }
})
