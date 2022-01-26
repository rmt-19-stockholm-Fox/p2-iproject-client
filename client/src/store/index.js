import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    travelPosts: [],
    bookings: [],
    detailTravel: {},
    email: '',
    role: '',
    chats: [],
    travelPlaces: []
  },
  mutations: {
    IS_ROLE (state, payload) {
      state.role = payload
    },
    IS_BOOKINGS (state, payload) {
      state.bookings = payload
    },
    IS_TRAVELPOSTS (state, payload) {
      state.travelPosts = payload
    },
    IS_DETAILTRAVEL (state, payload) {
      state.detailTravel = payload
    },
    SOCKET_RECMESSERVER (state, payload) {
      state.chats = payload
    },
    IS_EMAIL (state, payload) {
      state.email = payload
    },
    IS_TRAVELPLACES (state, payload) {
      state.travelPlaces = payload
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
            localStorage.setItem('email', data.data.email)
            localStorage.setItem('role', data.data.role)
            // context.dispatch('refresh')
            resolve(data.data)
          })
          .catch(err => reject(err))
      })
    },
    refresh (context, payload) {
      context.commit('IS_EMAIL', localStorage.getItem('email'))
      context.commit('IS_ROLE', localStorage.getItem('role'))
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
    bookSuccess (context, payload) {
      axios({
        url: `http://localhost:4000/bookings/${payload}`,
        method: 'post',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(data => console.log(data.data))
        .catch(err => console.log(err))
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
    },
    socket_connect () {
      console.log('connect', this._vm.$socket)
    },
    socket_disconect () {
      console.log('disconnect', this._vm.$socket)
    },
    forRefresh (_, payload) {
      this._vm.$socket.client.emit('forRefresh', payload)
    },
    setUsername (context, payload) {
      context.commit('IS_SET_EMAIL', payload)
      this._vm.$socket.client.emit('setUsername', payload)
    },
    sendMessage (_, payload) {
      this._vm.$socket.client.emit('sendMessageToServer', {
        access_token: payload.access_token,
        message: payload.chatMessage
      })
    },
    socket_receiveMessageFromServer (_, payload) {
      _.commit('SOCKET_RECMESSERVER', payload)
    },
    fetchTravelPlace (context, payload) {
      var options = {
        method: 'POST',
        url: 'https://travel-places.p.rapidapi.com/',
        headers: {
          'content-type': 'application/json',
          'x-rapidapi-host': 'travel-places.p.rapidapi.com',
          'x-rapidapi-key': '62b5b7d05fmsh9242deac6d72e6ap16cccejsnacc7c1e0a28d'
        },
        data: {
          query: '{ getPlaces(categories:["NATURE"],lat:-7,lng:112,maxDistMeters:500000) { name,lat,lng,abstract,distance,categories } }'
        }
      }
      axios.request(options).then(function (response) {
        console.log(response.data.data)
        context.commit('IS_TRAVELPLACES', response.data.data.getPlaces)
      }).catch(function (error) {
        console.error(error)
      })
    }
  },
  modules: {
  }
})
