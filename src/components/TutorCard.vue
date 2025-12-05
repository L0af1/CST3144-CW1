<template>
  <div class="tutor-card">
    <div class="tutor-image-wrapper">
      <img
        :src="imageUrl"
        :alt="`${tutor.subject} tutor`"
        class="tutor-image"
      />
    </div>

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
import { computed } from "vue"

const props = defineProps({
  tutor: Object
})

const imageUrl = computed(() => {
  const subjectKey = props.tutor.subject.toLowerCase()

  const map = {
    math: "math.png",
    english: "english.png",
    science: "science.png",
    history: "history.png",
    art: "art.png",
    "ap physics": "apPhysics.png"
  }

  const fileName = map[subjectKey] || "math.png"
  return `https://cst3144-cw1-backend.onrender.com/images/${fileName}`
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
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.tutor-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 16px rgba(90, 76, 168, 0.15);
}

.tutor-image-wrapper {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  overflow: hidden;
  background: #f0efff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.4rem;
}

.tutor-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
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