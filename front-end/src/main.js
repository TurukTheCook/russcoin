// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { SSL_OP_COOKIE_EXCHANGE } from 'constants';

// STYLES
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import '@/assets/css/styles.scss'

Vue.use(VueMaterial)


// NOT WORKING (i dont know why)
// import { MdElevation, MdButton, MdContent, MdForms, MdDivider, MdIcon, MdList, MdMenu, MdProgress } from 'vue-material/dist/components'
// import 'vue-material/dist/vue-material.min.css'

// Vue.use(MdElevation)
// Vue.use(MdButton)
// Vue.use(MdContent)
// Vue.use(MdForms)
// Vue.use(MdDivider)
// Vue.use(MdIcon)
// Vue.use(MdList)
// Vue.use(MdMenu)
// Vue.use(MdProgress)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})