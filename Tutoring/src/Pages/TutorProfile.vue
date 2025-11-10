<template>
    <div class="profile-page">
      <h1>Tutor Profile</h1>
  
      <div v-if="tutor">
        <p><strong>Tutor ID:</strong> {{ tutorId }}</p>
        <p><strong>Tutor:</strong> {{ tutor.name }}</p>
        <p><strong>About:</strong> {{ tutor.about }}</p>
        <p><strong>Subject:</strong> {{ tutor.subject }}</p>
        <p><strong>Price:</strong> £{{ tutor.price }} per hour</p>
        <p><strong>Rating:</strong> ⭐ {{ tutor.rating }}</p>
        <p><strong>Space: </strong>{{ tutor.space }}</p>
        <p><strong>Location: </strong>{{ tutor.location }}</p>
  
        <button @click="bookTutor" class="book-btn" :disabled="isBooked">
          {{ isBooked ? '✓ Already Booked' : 'Book Session' }}
        </button>
      </div>
      
      <div v-else>
        <p>Tutor not found.</p>
      </div>
    </div>
  </template>
  
  <script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { bookingStore } from '../JS/bookingStore.js'

const router = useRouter()
const route = useRoute()

const tutorId = Number(route.params.id)
const tutor = bookingStore.tutors.find(t => t.id === tutorId)

const isBooked = computed(() => {
  return bookingStore.bookedTutors.some(t => t.id === tutorId)
})

function bookTutor() {
  bookingStore.addBooking(tutor)
  router.push('/cart')
}
</script>
  
  <style scoped>
  .profile-page {
    padding: 2rem;
    max-width: 700px;
    margin: 0 auto;
    background-color: #f9fafb;
    border-radius: 8px;
  }
  
  .book-btn {
    margin-top: 1rem;
    background-color: #3b82f6;
    color: white;
    border: none;
    padding: 0.6rem 1rem;
    border-radius: 6px;
    cursor: pointer;
  }
  
  .book-btn:hover {
    background-color: #2563eb;
  }
  
  .book-btn:disabled {
    background-color: #9ca3af;
    cursor: not-allowed;
  }
  </style>