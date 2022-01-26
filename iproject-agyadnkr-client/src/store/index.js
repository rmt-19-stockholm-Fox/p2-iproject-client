import Vue from "vue";
import Vuex from "vuex";
import axios from 'axios';

Vue.use(Vuex);

const ORIGIN = 'http://localhost:3000'

export default new Vuex.Store({
  state: {
    center: {
      lat: -7.759722999999999,
      lng: 110.3989719
    },
    locationMarkers: [
      // {
      //   position: {
      //     lat: -7.759722999999999,
      //     lng: 110.3989719,
      //   },
      // },
      // {
      //   position: {
      //     lat: -7.76,
      //     lng: 110.39898,
      //   },
      // },
    ],
    locPlaces: [],
    existingPlace: {},
  },
  mutations: {
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
  },
  actions: {
    //add location marker based on longitude and lattitude
    async addLocationMarker({ state, commit, dispatch }) {
      try {
        console.log(state.existingPlace, '>>>> Existing places')

        if (state.existingPlace) {
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
          // console.log(state.locPlaces)
          // console.log(marker);
          dispatch('fetchLocations')
          commit('SET_EXISTINGPLACE', null)
        }
      } catch (error) {
        console.log(error.response)
      }

    },

    //to set existing place
    initMarker({ commit }, loc) {
      // console.log(loc, '>>>>>>>');
      commit('SET_EXISTINGPLACE', loc);
    },

    //Fetch locations from database
    async fetchLocations({ commit }) {
      try {
        const result = await axios.get(`${ORIGIN}/locations`);

        console.log(result.data)
        result.data.forEach(el => {
          const markers = {
            lat: +el.lattitude,
            lng: +el.longitude
          }

          commit('ADD_LOCATION_MARKER', markers)
        })
      } catch (error) {
        console.log(error.response.data)
      }
    },
  },
  modules: {},
});
