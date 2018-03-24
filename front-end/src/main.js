// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { SSL_OP_COOKIE_EXCHANGE } from 'constants';
import axios from 'axios'
import VueAxios from 'vue-axios'
import { loadProgressBar } from 'axios-progress-bar'

Vue.use(VueAxios, axios)
loadProgressBar()

// Intercepteur de requetes HTTP, pour chaque requete http on defini un header
// qui se nomme 'Authorization' et qui contient le token (depuis le localstorage)
// Le token est donc envoyé pour chacune des requete vers le back-end.
// Vue.http.interceptors.push(function(request) {
//   request.headers.set('Authorization', localStorage.getItem('token'));
// });
axios.defaults.baseURL = 'http://localhost:1407';
axios.interceptors.request.use((config) => {
  config.headers.Authorization = localStorage.getItem('token');
  return config;
});

// STYLES
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import '@/assets/css/styles.scss'

Vue.use(VueMaterial)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})