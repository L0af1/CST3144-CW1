<template>
    <div class="tutor-card">
      <h2 class="tutor-name">{{ tutor.name }}</h2>
      <p><strong>Subject:</strong> {{ tutor.subject }}</p>
      <p><strong>Rate:</strong> £{{ tutor.price }}/hr</p>
      <p><strong>⭐</strong> {{ tutor.rating }}</p>
      <p><strong>Space: </strong>{{ tutor.space }}</p>
      <p><strong>Location: </strong>{{ tutor.location }}</p>
  
      <router-link
        :to="`/tutor/${tutor.id}`"
        class="view-profile-btn"
      >
        View Profile
      </router-link>
    </div>
  </template>
  
  <script setup>
  defineProps({
    tutor: Object
  })
  </script>
  
  <style scoped>
.tutor-card {
  border-radius: 14px;
  padding: 1.25rem;
  background: #ffffff;
  border: 1px solid #cccce4;
  box-shadow: 0 4px 10px rgba(90, 76, 168, 0.08);
  transition: 0.25s ease;
}

.tutor-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 16px rgba(90, 76, 168, 0.15);
}

.tutor-name {
  color: #4b3e9b;
  font-size: 1.25rem;
  font-weight: 700;
}

p {
  color: #55556b;
  margin: 0.3rem 0;
}

.view-profile-btn {
  display: inline-block;
  margin-top: 0.8rem;
  background-color: #7a6fe3;
  color: white;
  padding: 0.55rem 1rem;
  border-radius: 6px;
  text-decoration: none;
  font-size: 0.95rem;
  transition: 0.25s ease;
}

.view-profile-btn:hover {
  background-color: #675ac7;
}
</style>