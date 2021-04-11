import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login'
import Signup from '../views/Signup'
import Dashboard from '../views/Dashboard'
import SignupCompleted from '../views/SignupCompleted'
import Profile from '../views/Profile'
import axios from 'axios'

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard,
    meta : {
      title: 'Dashboard'
    },
    beforeEnter: (to, from) => {
      var email = localStorage.getItem('email')
      var userUid = localStorage.getItem('user_uid')

      if (email === null || userUid === null) {
        return '/login'
      }
      return true
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta : {
      title: 'Profile'
    },
    beforeEnter: (to, from) => {
      var email = localStorage.getItem('email')
      var userUid = localStorage.getItem('user_uid')

      if (email === null || userUid === null) {
        return '/login'
      }
      return true
    }
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
    }
  },
  {
    path: '/signup_completed',
    name: 'Signup Completed',
    component: SignupCompleted,
    meta: {
      title: 'Signup Completed'
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
