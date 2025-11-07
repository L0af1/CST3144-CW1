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
        <p><strong>Space:</strong>{{ tutor.space }}</p>
        <p><strong>Location</strong>{{ tutor.location }}</p>
  
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
  import { bookingStore } from './bookingStore'
  
  const router = useRouter()   
  const route = useRoute()  
  const tutorId = route.params.id
  
  const tutors = [
    { id: 1, name: 'Lewis Johnson', subject: 'Math', price: 25, rating: 4.8, location: Hendon, about: 'Mathematics major passionate about teaching problem solving.' },
    { id: 2, name: 'Vinnie Hec', subject: 'English', price: 20, rating: 4.6, location: Rushden, about: 'English literature graduate who loves creative writing.' },
    { id: 3, name: 'Jude Richard', subject: 'Science', price: 30, rating: 4.9, location: Hitchin, about: 'Biochemist with 5 years of teaching experience.' },
    { id: 4, name: 'Emma Watson', subject: 'History', price: 22, rating: 4.7, location: Sandy , about: 'History teacher who brings the past to life.' },
    { id: 5, name: 'Olivia Brown', subject: 'Art', price: 28, rating: 4.5, location: Biggleswade, about: 'Fine arts graduate helping students express creativity.' },
    { id: 6, name: 'Liam Smith', subject: 'AP Physics', price: 35, rating: 4.9, location: Huntingdon, about: 'Physics expert passionate about STEM education.' }
  ]
  
  const tutor = tutors.find(t => t.id === Number(tutorId))
  
  
  const isBooked = computed(() => {
    return bookingStore.bookedTutors.some(t => t.id === tutor?.id)
  })
  
  function bookTutor() {
    if (tutor) {
      bookingStore.addBooking(tutor)
      alert(`${tutor.name} has been booked successfully!`)
      router.push('/cart')
    }
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