import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    travelPosts: [],
    bookings: [],
    detailTravel: {}
  },
  mutations: {
    IS_BOOKINGS (state, payload) {
      state.bookings = payload
    },
    IS_TRAVELPOSTS (state, payload) {
      state.travelPosts = payload
    },
    IS_DETAILTRAVEL (state, payload) {
      state.detailTravel = payload
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
    },
    fetchBookings (context, payload) {
      axios({
        url: 'http://localhost:4000/bookings',
        method: 'get',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(data => {
          context.commit('IS_BOOKINGS', data.data)
        })
        .catch(err => console.log(err))
    },
    fetchDetailTravel (context, payload) {
      axios({
        url: `http://localhost:4000/travel/${payload}`,
        method: 'get',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(data => {
          context.commit('IS_DETAILTRAVEL', data.data)
        })
        .catch(err => console.log(err))
    },
    bookNow (context, payload) {
      return new Promise((resolve, reject) => {
        axios({
          url: 'http://localhost:4000/midtrans',
          method: 'post',
          headers: {
            access_token: localStorage.getItem('access_token')
          },
          data: {
            amount: payload
          }
        })
          .then(data => resolve(data.data))
          .catch(err => resolve(err))
      })
    },
    submitEvents (context, payload) {
      return new Promise((resolve, reject) => {
        axios({
          url: `http://localhost:4000/events/${payload.postId}`,
          method: 'post',
          headers: {
            access_token: localStorage.getItem('access_token')
          },
          data: {
            destination: payload.formAddEvent.destination,
            imageUrl: payload.formAddEvent.imageUrl,
            schedule: payload.formAddEvent.schedule,
            price: payload.formAddEvent.price
          }
        })
          .then(data => resolve(data))
          .catch(err => reject(err.response.data))
      })
    }
  },
  modules: {
  }
})
