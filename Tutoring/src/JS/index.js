import { createRouter, createWebHistory } from 'vue-router'

import Home from '../Pages/Home.vue'
import Tutors from '../Pages/Tutors.vue'
import TutorProfile from '../Pages/TutorProfile.vue'
import Login from '../Extra/Login.vue'
import Signup from '../Extra/Signup.vue'
import Cart from '../Pages/Cart.vue'

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