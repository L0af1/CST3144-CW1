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
  import { ref, computed, onMounted } from "vue";
  import { useRoute, useRouter } from "vue-router";
  import { bookingStore } from "../JS/bookingStore.js";
  
  const router = useRouter();
  const route = useRoute();
  
  const tutorId = Number(route.params.id);
  const tutor = ref(null);
  
  onMounted(async () => {
    await bookingStore.loadLessons();
    tutor.value = bookingStore.tutors.find(t => t.id === tutorId);
  });

  const isBooked = computed(() => {
    return bookingStore.bookedTutors.some(t => t.id === tutorId);
  });
  
  function bookTutor() {
    if (!tutor.value) return;
  
    if (isBooked.value) {
      alert("You already booked this tutor.");
      return;
    }
    bookingStore.addBooking(tutor.value);
    router.push("/cart");
  }
  </script>
  
<style scoped>
.profile-page {
  padding: 2rem;
  max-width: 750px;
  margin: 0 auto;
  background: #fafaff;
  border: 1px solid #d3d3ea;
  border-radius: 14px;
  box-shadow: 0 4px 10px rgba(90, 76, 168, 0.1);
}

h1 {
  color: #4b3e9b;
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
}

p {
  margin: 0.4rem 0;
  color: #545468;
}

.book-btn {
  margin-top: 1rem;
  background-color: #7a6fe3;
  color: white;
  padding: 0.65rem 1.2rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: 0.25s ease;
}

.book-btn:hover {
  background-color: #675ac7;
}

.book-btn:disabled {
  background-color: #bdb9df;
  cursor: not-allowed;
}
</style>