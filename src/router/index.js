import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login'
import Signup from '../views/Signup'
import Dashboard from '../views/Dashboard'
import SignupCompleted from '../views/SignupCompleted'
const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard,
    meta : {
      title: 'Dashboard'
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: 'Login Catena'
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
