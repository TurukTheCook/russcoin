// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { SSL_OP_COOKIE_EXCHANGE } from 'constants';

Vue.config.productionTip = false

// Intercepteur de requetes HTTP, pour chaque requete http on defini un header
// qui se nomme 'Authorization' et qui contient le token (depuis le localstorage)
// Le token est donc envoyé pour chacune des requete vers le back-end.
Vue.http.interceptors.push(function(request) {
  request.headers.set('Authorization', localStorage.getItem('token'));
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
