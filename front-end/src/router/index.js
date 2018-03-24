// ESSENTIALS
import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(Router)
Vue.use(VueAxios, axios)

// COMPONENTS
import Login from '@/components/auth/Login'
import Register from '@/components/auth/Register'

import Home from '@/components/home/Home'
import Welcome from '@/components/home/welcome/Welcome'
import Users from '@/components/home/users/Users'
import SendMessage from '@/components/home/users/SendMessage'
import Messages from '@/components/home/messages/Messages'
import MessageDetails from '@/components/home/messages/MessageDetails'


// Intercepteur de requetes HTTP, pour chaque requete http on defini un header
// qui se nomme 'Authorization' et qui contient le token (depuis le localstorage)
// Le token est donc envoyé pour chacune des requete vers le back-end.
// Vue.http.interceptors.push(function(request) {
//   request.headers.set('Authorization', localStorage.getItem('token'));
// });
axios.defaults.baseURL = 'http://localhost:1407';
axios.interceptors.request.use(function (config) {
  config.headers.Authorization = localStorage.getItem('token');
  return config;
}, function (error) {
  return Promise.reject(error);
});

// ROUTER VIEW TEMPLATE
const routerTemplate = {
  template: '<div><router-view/></div>'
}

// ROUTES
const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/home',
      component: Home,
      children: [
        {
          path: '',
          name: 'home',
          component: Welcome
        },
        {
          path: 'users',
          name: 'home.users',
          component: Users,
          children: [
            {
              path: 'send/:sendingTo',
              name: 'home.users.sendMessage',
              component: SendMessage
            }
          ]
        },
        {
          path: 'messages',
          name: 'home.messages',
          component: Messages,
          children: [
            {
              path: ':msgId',
              name: 'home.messages.messageDetails',
              component: MessageDetails
            }
          ]
        }
      ]
    },
    {
      path: '*',
      redirect: { name: 'login' }
    }
    // {
    //   path: '/',
    //   name: 'Auth',
    //   component: Auth,
    //   children: [
    //     {
    //       path: '',
    //       name: 'Login',
    //       component: Login
    //     },
    //     {
    //       path: 'register',
    //       name: 'Register',
    //       component: Register
    //     }
    //   ]
    // }
  ]
})

// GLOBAL GUARD
// On effectue des actions avant de d'afficher une route
// Ici on verifie que l'utilisateur dispose d'un token valide
router.beforeEach((to, from, next) => {
  if (to.name == 'login' || to.name == 'register') next()
  else {
    if (localStorage.getItem('token')) {
      next()
    } else {
      next({ name: 'login' })
    }
  }
})


// EXPORT
export default router