<template>
    <div class="tutor-card">
      <h2 class="tutor-name">{{ tutor.name }}</h2>
      <p><strong>Subject:</strong> {{ tutor.subject }}</p>
      <p><strong>Rate:</strong> £{{ tutor.price }}/hr</p>
      <p><strong>⭐</strong> {{ tutor.rating }}</p>
  
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
    border: 1px solid #ddd;
    border-radius: 12px;
    padding: 1rem;
    background-color: #fff;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
    transition: box-shadow 0.3s ease, transform 0.2s ease;
  }
  

  .tutor-card:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    transform: translateY(-2px);
  }
  

  .tutor-name {
    font-size: 1.125rem; 
    font-weight: 600; 
    color: #333;
    margin-bottom: 0.5rem;
  }
  

  .tutor-card p {
    margin: 0.25rem 0;
    color: #555;
  }
  

  .view-profile-btn {
    display: inline-block;
    margin-top: 0.75rem;
    background-color: #3b82f6; 
    color: white;
    padding: 0.5rem 0.75rem; 
    border-radius: 6px;
    text-decoration: none;
    font-size: 0.95rem;
    transition: background-color 0.3s;
  }
  
  .view-profile-btn:hover {
    background-color: #2563eb; 
  }
  </style>