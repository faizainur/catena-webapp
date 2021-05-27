import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login'
import Signup from '../views/Signup'
import Dashboard from '../views/Dashboard'
import SignupCompleted from '../views/SignupCompleted'
import Profile from '../views/Profile'
import DemoIPFS from '../views/DemoIPFS'
import axios from 'axios'

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard,
    meta : {
      title: 'Dashboard'
    },
    // beforeEnter: (to, from) => {
    //   var email = localStorage.getItem('email')
    //   var userUid = localStorage.getItem('user_uid')

    //   if (email === null || userUid === null) {
    //       return '/login'
    //   }
    //   return true
    // }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta : {
      title: 'Profile'
    },
    // beforeEnter: (to, from) => {
    //   var email = localStorage.getItem('email')
    //   var userUid = localStorage.getItem('user_uid')

    //   if (email === null || userUid === null) {
    //     return '/login'
    //   }
    //   return true
    // }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: 'Login Catena'
    },
    beforeEnter: (to, from) => {
      var email = localStorage.getItem('email')
      var userUid = localStorage.getItem('user_uid')

      if (email !== null && userUid !==  null) {
        return '/'
      }
      return true
    }
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup,
    meta: {
      title: 'Sign up to Catena'
    },
    beforeEnter: (to, from) => {
      return true
    }
  },
  {
    path: '/signup_completed',
    name: 'SignupCompleted',
    component: SignupCompleted,
    meta: {
      title: 'Signup Completed'
    }
  },
  {
    path: '/demo-ipfs',
    name: 'DemoIPFS',
    component: DemoIPFS,
    meta: {
      title: 'Demo IPFS'
    }
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
