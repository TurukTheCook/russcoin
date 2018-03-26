// ESSENTIALS
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// COMPONENTS
import Login from '@/components/auth/Login'
import Register from '@/components/auth/Register'

import Home from '@/components/home/Home'
import Welcome from '@/components/home/welcome/Welcome'
import Users from '@/components/home/users/Users'
import SendMessage from '@/components/home/users/SendMessage'
import Messages from '@/components/home/messages/Messages'
import MessageDetails from '@/components/home/messages/MessageDetails'

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
      component: Login,
      meta: {
        requireAuth : false
      }
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: {
        requireAuth : false
      }
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
  if (to.matched.some(record => record.meta.requireAuth == false)) next()
  else {
    if (localStorage.getItem('token')) {
      next()
    } else {
      next({ name: 'login' })
      // next(false)
    }
  }
})

// EXPORT
export default router