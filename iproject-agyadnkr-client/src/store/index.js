import Vue from "vue";
import Vuex from "vuex";
import axios from 'axios';
import router from '../router/index';

Vue.use(Vuex);

const ORIGIN = 'http://localhost:3000'

export default new Vuex.Store({
  state: {
    center: {
      lat: -7.759722999999999,
      lng: 110.3989719
    },
    allLocation: [],
    locationMarkers: [],
    locPlaces: [],
    existingPlace: {},
  },
  mutations: {
    ADD_ALL_LOCATION(state, payload) {
      state.allLocation = payload;
    },
    ADD_LOCATION_MARKER(state, payload) {
      state.locationMarkers.push({ position: payload })
    },
    ADD_LOCPLACES(state, payload) {
      state.locPlaces.push(payload);
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
        console.log(error.response)
      }

    },

    //to set existing place
    initMarker({ commit }, loc) {
      // console.log(loc, '>>>>>>>');
      // console.log('Di Store')
      commit('SET_EXISTINGPLACE', loc);
      // console.log(state.existingPlace)
    },

    //Fetch locations from database
    async fetchLocations({ commit }) {
      try {
        const result = await axios.get(`${ORIGIN}/locations`);

        // console.log(result.data)
        result.data.forEach(el => {
          const markers = {
            lat: +el.lattitude,
            lng: +el.longitude
          }

          commit('ADD_LOCATION_MARKER', markers)
          commit('ADD_ALL_LOCATION', result)
        })
      } catch (error) {
        console.log(error.response.data)
      }
    },
  },
  modules: {},
});
