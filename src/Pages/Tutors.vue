<template>
    <div class="tutors-container">
      <h1 class="tutors-title">Available Tutors</h1>
  
      <div class="filters-section">
        <div class="filter-group">
          <label>Subject</label>
          <select v-model="filters.subject">
            <option value="">All Subjects</option>
            <option value="Math">Math</option>
            <option value="English">English</option>
            <option value="Science">Science</option>
            <option value="History">History</option>
            <option value="Art">Art</option>
            <option value="AP Physics">AP Physics</option>
          </select>
        </div>
  
        <div class="filter-group">
          <label>Max Price: £{{ filters.maxPrice }}/hr</label>
          <input 
            type="range" 
            v-model="filters.maxPrice" 
            min="15" 
            max="50" 
            step="5"
          />
        </div>
  
        <div class="filter-group">
          <label>Min Rating: {{ filters.minRating }}⭐</label>
          <input 
            type="range" 
            v-model="filters.minRating" 
            min="0" 
            max="5" 
            step="0.1"
          />
        </div>

        <div class ='filter-group'>
          <lablel>Location</lablel>
          <select v-model="filters.location">
            <option value="">All Locations</option>
            <option value="Hendon">Hendon</option>
            <option value="Rushden">Rushden</option>
            <option value="Hitchin">Hitchin</option>
            <option value="Sandy">Sandy</option>
            <option value="Biggleswade">Biggleswade</option>
            <option value="Huntingdon">Huntingdon</option>
            </select>
        </div>
  
        <button @click="resetFilters" class="reset-btn">Reset Filters</button>
      </div>
  
  
      <p class="results-count">
        Showing {{ filteredTutors.length }} of {{ tutors.length }} tutors
      </p>
  
  
      <div v-if="filteredTutors.length > 0" class="tutors-grid">
        <TutorCard
          v-for="tutor in filteredTutors"
          :key="tutor.id"
          :tutor="tutor"
        />
      </div>
  
  
      <div v-else class="no-results">
        <p>No tutors match your filters. Try adjusting your criteria!</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue'
  import TutorCard from '../components/TutorCard.vue'
  import { bookingStore } from '../JS/bookingStore.js'
  
  onMounted(() => {
    bookingStore.loadLessons()
  })
  
  const tutors = computed(() => bookingStore.tutors)
  
  const filters = ref({
    subject: '',
    maxPrice: 50,
    minRating: 0,
    location: ''
  })
  
  const filteredTutors = computed(() => {
    return tutors.value.filter(tutor => {
      const matchesSubject = !filters.value.subject || tutor.subject === filters.value.subject
      const matchesPrice = tutor.price <= filters.value.maxPrice
      const matchesRating = tutor.rating >= filters.value.minRating
      const matchesLocation = !filters.value.location || tutor.location === filters.value.location
      return matchesSubject && matchesPrice && matchesRating && matchesLocation
    })
  })
  
  function resetFilters() {
    filters.value = {
      subject: '',
      maxPrice: 50,
      minRating: 0,
      location: ''
    }
  }
  </script>
  
  
  <style scoped>
  
  .tutors-container {
    padding: 1.5rem;
    background-color: #f9fafb;
    min-height: 100vh;
  }
  
  
  .tutors-title {
    font-size: 1.75rem;
    font-weight: bold;
    margin-bottom: 1.5rem;
    color: #333;
    text-align: center;
  }
  
  
  .filters-section {
    background: white;
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    margin-bottom: 1.5rem;
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  @media (min-width: 768px) {
    .filters-section {
      grid-template-columns: repeat(3, 1fr) auto;
      align-items: end;
    }
  }
  
  .filter-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .filter-group label {
    font-weight: 600;
    color: #374151;
    font-size: 0.9rem;
  }
  
  .filter-group select {
    padding: 0.5rem;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    font-size: 0.95rem;
    cursor: pointer;
  }
  
  .filter-group input[type="range"] {
    cursor: pointer;
  }
  
  .reset-btn {
    padding: 0.5rem 1rem;
    background-color: #6b7280;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 500;
    height: fit-content;
  }
  
  .reset-btn:hover {
    background-color: #4b5563;
  }
  
  
  .results-count {
    text-align: center;
    color: #6b7280;
    margin-bottom: 1rem;
    font-size: 0.9rem;
  }
  
  
  .tutors-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  @media (min-width: 768px) {
    .tutors-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }
  
  
  .no-results {
    text-align: center;
    padding: 3rem;
    background: white;
    border-radius: 8px;
    color: #6b7280;
  }
  </style>