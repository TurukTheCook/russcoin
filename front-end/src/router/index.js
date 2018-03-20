import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'
import Auth from '@/components/auth/Auth'
import Home from '@/components/home/Home'
import Send from '@/components/send/Send'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import '@/assets/css/styles.scss'


Vue.use(BootstrapVue);
Vue.use(Router)
Vue.use(VueResource)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Auth',
      component: Auth
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/send',
      name: 'Send',
      component: Send,
      props: true
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
