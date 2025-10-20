import { createRouter, createWebHistory } from 'vue-router'

import Home from './Home.vue'
import Tutors from './Tutors.vue'
import TutorProfile from './TutorProfile.vue'
import Login from './Login.vue' // soon ill add this, just need to write the cpde
import Signup from './Signup.vue' // soon ill add this, just need to write the code
import Cart from './Cart.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/tutors', component: Tutors },
  { path: '/tutor/:id', component: TutorProfile, props: true },
  { path: '/login', component: Login }, 
  { path: '/signup', component: Signup },
  { path: '/cart', component: Cart },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})
export default router