<script setup>
import { computed } from "vue"
import { bookingStore } from "./JS/bookingStore.js"

const cartCount = computed(() => bookingStore.bookedTutors.length)
</script>

<template>
  <div>
    <nav class="navbar">
      <h2 class="logo">Tutor Connect</h2>
      <ul class="nav-links">
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/tutors">Tutors</router-link></li>
        <li><router-link to="/login">Login</router-link></li>
        <li><router-link to="/signup">Signup</router-link></li>
        <li>
          <router-link to="/cart" class="cart-link">
            Bookings
            <span v-if="cartCount > 0" class="cart-badge">
              {{ cartCount }}
            </span>
          </router-link>
        </li>
      </ul>
    </nav>

    <router-view />
  </div>
</template>

<style scoped>
nav {
  background: linear-gradient(90deg, #d6d6e8, #ececff);
  padding: 1rem 1.5rem;
  display: flex;
  justify-content: center;
  gap: 2rem;
  border-bottom: 2px solid #c7c7dd;
}

nav a {
  text-decoration: none;
  font-size: 1.05rem;
  font-weight: 600;
  color: #5a4ca8;
  padding: 0.4rem 0.8rem;
  border-radius: 8px;
  transition: 0.25s ease;
}

nav a:hover {
  background: #e5e1ff;
  color: #463c91;
  transform: translateY(-2px);
}
</style>