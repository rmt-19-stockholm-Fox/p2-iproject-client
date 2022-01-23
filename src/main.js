import '@babel/polyfill';
import 'mutationobserver-shim';
import Vue from 'vue';
import './plugins/bootstrap-vue';
import App from './App.vue';
import router from './router';
import store from './store';
import GAuth from 'vue-google-oauth2';

const gauthOption = {
  clientId: '937902885217-7rhrnq4k7rk2i6ga3ek3uobl83e45kso.apps.googleusercontent.com',
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
