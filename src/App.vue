<template>
  <div>
    <nav class="navbar">
      <h2 class="logo">Tutor Connect</h2>
      <ul class ="nav-links">
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/tutors">Tutors</router-link></li>
        <li><router-link to="/login">Login</router-link></li>
        <li><router-link to="/signup">Signup</router-link></li>
        <li><router-link to="/cart">Bookings</router-link></li>
      </ul>
    </nav>

    <router-view></router-view>
  </div>
</template>

<style>
.navbar {
  display: flex;
  gap: 1rem;
  background-color: rgb(10, 232, 232);
  padding: 10px 30px;
  color: black;
  width: 100%;
  height: 70px;
  align-items: center;
}

.logo {
  align-items: center;
  color: blue;
  
}

.navbar a {
  text-decoration: none;
  color: black;
  font-weight: bold;
}

.navbar a.router-link-active {
  color: blue;
}
</style>