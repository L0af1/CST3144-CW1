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
  import { ref, computed } from 'vue'
  import TutorCard from './components/TutorCard.vue'
  
  const tutors = [
    { id: 1, name: 'Lewis Johnson', subject: 'Math', price: 25, rating: 4.8 , location: 'Hendon'}, 
    { id: 2, name: 'Vinnie Hec', subject: 'English', price: 20, rating: 4.6, location: 'Rushden' },
    { id: 3, name: 'Jude Richard', subject: 'Science', price: 30, rating: 4.9, location: 'Hitchin' },
    { id: 4, name: 'Emma Watson', subject: 'History', price: 22, rating: 4.7, location: 'Sandy' },
    { id: 5, name: 'Olivia Brown', subject: 'Art', price: 28, rating: 4.5, location: 'Biggleswade' },
    { id: 6, name: 'Liam Smith', subject: 'AP Physics', price: 35, rating: 4.9, location: 'Huntingdon' }
  ]
  
  const filters = ref({
    subject: '',
    maxPrice: 50,
    minRating: 0
  })
  
  const filteredTutors = computed(() => {
    return tutors.filter(tutor => {
      const matchesSubject = !filters.value.subject || tutor.subject === filters.value.subject
      const matchesPrice = tutor.price <= filters.value.maxPrice
      const matchesRating = tutor.rating >= filters.value.minRating
      
      return matchesSubject && matchesPrice && matchesRating
    })
  })
  
  function resetFilters() {
    filters.value = {
      subject: '',
      maxPrice: 50,
      minRating: 0
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