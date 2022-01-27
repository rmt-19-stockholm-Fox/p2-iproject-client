import Vue from "vue";
import Vuex from "vuex";
import axios from 'axios';
import router from '../router/index';
import Swal from 'sweetalert2';

Vue.use(Vuex);

const ORIGIN = 'https://iproject-agyadnkr.herokuapp.com'

export default new Vuex.Store({
  state: {
    isLogged: false,
    center: {
      lat: -7.759722999999999,
      lng: 110.3989719
    },
    allLocation: [],
    locationMarkers: [],
    locPlaces: [],
    existingPlace: {},
    detailLoc: {}
  },
  mutations: {
    SET_ISLOGGED(state, payload) {
      state.isLogged = payload;
    },
    ADD_ALL_LOCATION(state, payload) {
      state.allLocation = payload;
    },
    ADD_LOCATION_MARKER(state, payload) {
      state.locationMarkers.push({ position: payload })
    },
    ADD_LOCPLACES(state, payload) {
      state.locPlaces.push(payload);
    },
    ADD_DETAIL_LOC(state, payload) {
      state.detailLoc = payload;
    },
    SET_CENTER(state, payload) {
      state.center = payload;
    },
    SET_EXISTINGPLACE(state, payload) {
      state.existingPlace = payload;
    },
    SET_PRICE(state, payload) {
      state.existingPlace.price = payload;
    }
  },
  actions: {
    //add location marker based on longitude and lattitude
    async addLocationMarker({ state, commit, dispatch }) {
      try {
        // console.log(state.existingPlace, '>>>> Existing places')
        // console.log(state.price)

        if (state.existingPlace) {
          // console.log('Masukkk')
          const marker = {
            lat: state.existingPlace.geometry.location.lat(),
            lng: state.existingPlace.geometry.location.lng(),
          };

          commit('ADD_LOCATION_MARKER', marker);
          commit('ADD_LOCPLACES', state.existingPlace);
          commit('SET_CENTER', marker)

          const payload = {
            name: state.existingPlace.name,
            address: state.existingPlace.formatted_address,
            lattitude: state.existingPlace.geometry.location.lat(),
            longitude: state.existingPlace.geometry.location.lng(),
            mapsUrl: state.existingPlace.url,
            price: '2000'
          }
          // console.log(payload, '>>>>> payload')
          const result = await axios.post(`${ORIGIN}/locations`, payload)
          console.log(result);
          console.log(state.locationMarkers)
          // console.log(state.locPlaces)
          // console.log(marker);
          dispatch('fetchLocations');
          commit('SET_EXISTINGPLACE', {});
          router.push({ name: 'Home' })

        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.response.data.message
        })
      }

    },

    //to set existing place
    initMarker({ commit }, loc) {
      // console.log(loc, '>>>>>>>');
      // console.log('Di Store')
      commit('SET_EXISTINGPLACE', loc);
      // console.log(state.existingPlace)
    },

    async detailHandler({ commit }, locationId) {
      try {
        const result = await axios.get(`${ORIGIN}/locations/${locationId}`)

        commit('ADD_DETAIL_LOC', result.data)

        router.push({
          name: "LocationDetail",
          params: { locationId },
        });
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.response.data.message
        })
      }
    },

    //Fetch locations from database
    async fetchLocations({ commit, state }) {
      try {
        const result = await axios.get(`${ORIGIN}/locations`);

        // console.log(result.data)
        result.data.forEach(el => {
          const markers = {
            lat: +el.lattitude,
            lng: +el.longitude
          }

          // console.log(result.data[0])
          commit('ADD_LOCATION_MARKER', markers)
        })
        commit('ADD_ALL_LOCATION', result.data)
        console.log(state.allLocation)
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.response.data.message
        })
      }
    },

    async loginHandler({ commit, dispatch }, payload) {
      try {
        const result = await axios({
          method: 'POST',
          url: `${ORIGIN}/login`,
          data: payload
        })

        console.log(result)
        localStorage.setItem('access_token', result.data.access_token)
        localStorage.setItem('userId', result.data.id)
        localStorage.setItem('userEmail', result.data.email)
        localStorage.setItem('username', result.data.username)

        dispatch('fetchLocations')
        commit('SET_ISLOGGED', true)

        router.push({ name: 'Home' });

      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.response.data.message
        })
      }
    },

    async loginGoogleHandler({ commit, dispatch }, googleUser) {
      try {
        const token = googleUser.getAuthResponse().id_token
        await axios.post(`${ORIGIN}/login/google`, { token })
          .then((res) => {
            // console.log(res)
            localStorage.setItem('access_token', res.data.access_token)
            localStorage.setItem('userId', res.data.id)
            localStorage.setItem('userEmail', res.data.email)
            localStorage.setItem('username', res.data.username)

            dispatch('fetchLocations')
            commit('SET_ISLOGGED', true)

            router.push({ name: 'Home' });
          })
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.response.data.message
        })
      }
    },

    async registerHandler(context, payload) {
      try {
        await axios({
          method: 'POST',
          url: `${ORIGIN}/register`,
          data: payload
        })

        router.push({ name: 'Login' })
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.response.data.message
        })
      }
    }
  },
  modules: {},
});
