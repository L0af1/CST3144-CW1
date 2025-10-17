<template>
  <div>
    <nav class="navbar">
      <h2 class="logo">TutorConnect</h2>
      <ul>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/tutors">Tutors</router-link></li>
        <li><router-link to="/login">Login</router-link></li>
        <li><router-link to="/signup">Signup</router-link></li>
        <li><router-link to="/cart">Bookings</router-link></li>
      </ul>
    </nav>

    <router-view />
  </div>
</template>