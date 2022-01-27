import '@babel/polyfill';
import 'mutationobserver-shim';
import Vue from 'vue';
import './plugins/bootstrap-vue';
import App from './App.vue';
import router from './router';
import store from './store';
import GAuth from 'vue-google-oauth2';
import { initializeApp } from 'firebase/app';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
  faPlus,
  faAngleLeft,
  faAngleRight,
  faBraille,
  faMapMarkerAlt
} from '@fortawesome/free-solid-svg-icons';

library.add(
  faPlus, faAngleLeft, 
  faAngleRight, faBraille,
  faMapMarkerAlt
);
Vue.component('font-awesome-icon', FontAwesomeIcon);

initializeApp({
  storageBucket: 'gs://instafood-93ec5.appspot.com'
});

const gauthOption = {
  clientId: '937902885217-kt2rv9ofqhqbo61o6ho147oueub8utf8.apps.googleusercontent.com',
  scope: 'profile email',
  prompt: 'select_account'
};
Vue.use(GAuth, gauthOption);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
