// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { SSL_OP_COOKIE_EXCHANGE } from 'constants'

// STYLES
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import '@/assets/css/styles.scss'

Vue.use(VueMaterial)

// PROGRESS BAR
import VueProgressBar from 'vue-progressbar'
const options = {
  color: '#23f0ff',
  failedColor: '#ff3030',
  thickness: '5px',
  transition: {
    speed: '0.2s',
    opacity: '0.6s',
    termination: 300
  },
  autoRevert: true,
  location: 'top',
  inverse: false
}
Vue.use(VueProgressBar, options)

// CONFIG
Vue.config.productionTip = false

/* eslint-disable no-new */
export default new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
}).$mount('#app')