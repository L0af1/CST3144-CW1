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
          <label>Search</label>
          <input 
          type="text" 
          v-model="searchQuery" 
          placeholder="Search by name, subject, or location..."
          />
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
  const searchQuery = ref("")
  
  const filteredTutors = computed(() => {
    return tutors.value.filter(tutor => {
      const matchesSubject = !filters.value.subject || tutor.subject === filters.value.subject
      const matchesPrice = tutor.price <= filters.value.maxPrice
      const matchesRating = tutor.rating >= filters.value.minRating
      const matchesLocation = !filters.value.location || tutor.location === filters.value.location

      const q = searchQuery.value.toLowerCase()
      const matchesSearch =
      tutor.name.toLowerCase().includes(q) ||
      tutor.subject.toLowerCase().includes(q) ||
      tutor.location.toLowerCase().includes(q)


      return matchesSubject && matchesPrice && matchesRating && matchesLocation && matchesSearch
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
  background: #f4f4fb;
  min-height: 100vh;
}


.tutors-title {
  font-size: 2rem;
  font-weight: 700;
  color: #4b3e9b;
  text-align: center;
  margin-bottom: 1.5rem;
}

.filters-section {
  background: #ffffff;
  padding: 1.5rem;
  border-radius: 12px;
  border: 1px solid #d3d3ea;
  box-shadow: 0 4px 10px rgba(90, 76, 168, 0.08);
  margin-bottom: 1.5rem;
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

.filter-group input[type="text"] {
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 0.95rem;
}

@media (min-width: 768px) {
  .filters-section {
    grid-template-columns: repeat(4, 1fr);
  }
}

.filter-group label {
  color: #4b3e9b;
  font-weight: 600;
}

.filter-group select,
.filter-group input[type="range"] {
  border: 1px solid #c5c5df;
  border-radius: 8px;
  padding: 0.5rem;
}

.reset-btn {
  background-color: #7a6fe3;
  color: white;
  border: none;
  padding: 0.6rem 1rem;
  border-radius: 8px;
  font-weight: 600;
  transition: 0.25s ease;
}

.reset-btn:hover {
  background-color: #675ac7;
}

.results-count {
  text-align: center;
  color: #6c6c86;
  margin-bottom: 1rem;
}

.tutors-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.25rem;
}

@media (min-width: 768px) {
  .tutors-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.no-results {
  text-align: center;
  padding: 3rem;
  background: #ffffff;
  border: 1px solid #d1d1eb;
  border-radius: 12px;
  color: #6c6c86;
}
</style>