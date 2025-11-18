<template>
    <div class="bookings-page">
      <h1>Your Booked Tutors</h1>
  
      <div v-if="bookingStore.bookedTutors.length === 0" class="empty-message">
        <p>You haven't booked any tutors yet.</p>
      </div>
  
      <div v-else class="bookings-list">
        <div v-for="tutor in bookingStore.bookedTutors" :key="tutor.id" class="booking-card">
          <h3>{{ tutor.name }}</h3>
          <p><strong>Subject:</strong> {{ tutor.subject }}</p>
          <p><strong>Price:</strong> £{{ tutor.price }}</p>
          <p><strong>Rating:</strong> ⭐ {{ tutor.rating }}</p>
          <p><em>Booked on: {{ formatDate(tutor.bookedAt) }}</em></p>
          <button @click="cancelBooking(tutor.id)" class="cancel-btn">Cancel</button>
        </div>
      </div>
  
  
      <div class="customer-form">
        <h2>🧾 Booking Details</h2>
        <p>Please enter your information to confirm your booking:</p>
  
        <form @submit.prevent="submitBooking">
          <div class="form-group">
            <label for="name">Full Name:</label>
            <input id="name" v-model="customer.name" type="text" required />
          </div>
  
          <div class="form-group">
            <label for="email">Email Address:</label>
            <input id="email" v-model="customer.email" type="email" required />
          </div>
  
          <div class="form-group">
            <label for="phone">Phone Number:</label>
            <input id="phone" v-model="customer.phone" type="tel" required />
          </div>
  
          <div class="form-group">
            <label for="address">Address:</label>
            <textarea id="address" v-model="customer.address" rows="3" required></textarea>
          </div>
  
          <button type="submit" class="submit-btn">Confirm Booking</button>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { reactive } from "vue"
  import { bookingStore } from "../JS/bookingStore.js"
  
  function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString()
  }
  
  function cancelBooking(tutorId) {
    if (confirm("Are you sure you want to cancel this booking?")) {
      bookingStore.removeBooking(tutorId)
    }
  }
  
  const customer = reactive({
    name: "",
    email: "",
    phone: "",
    address: ""
  })
  
  async function submitBooking() {
    if (!customer.name || !customer.email || !customer.phone || !customer.address) {
      alert("Please fill out all fields before submitting.")
      return
    }
  
    const orderData = {
      name: customer.name,
      phone: customer.phone,
      lessonIDs: bookingStore.bookedTutors.map(t => t.id),
      space: 1
    }
  
    try {
      const res = await fetch("https://cst3144-cw1-backend.onrender.com/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData)
      })
  
      const orderResult = await res.json()
      console.log("Order saved:", orderResult)
  
      for (const tutor of bookingStore.bookedTutors) {
        await fetch(`https://cst3144-cw1-backend.onrender.com/api/lessons/${tutor.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ space: tutor.space - 1 })
        })
      }
  
      alert("Booking completed!")
  
      bookingStore.bookedTutors = []
      customer.name = ""
      customer.email = ""
      customer.phone = ""
      customer.address = ""
  
    } catch (err) {
      console.error(err)
    }
  }
  </script>
  
  
  <style scoped>
  .bookings-page {
    padding: 2rem;
    max-width: 800px;
    margin: 0 auto;
    background-color: #fafafa;
    border-radius: 8px;
  }
  
  .bookings-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 2rem;
  }
  
  .booking-card {
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 1rem;
    box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  }
  
  .cancel-btn {
    margin-top: 0.5rem;
    background-color: #ef4444;
    color: white;
    border: none;
    padding: 0.4rem 0.8rem;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .cancel-btn:hover {
    background-color: #dc2626;
  }
  
  
  .customer-form {
    background-color: #fff;
    padding: 1.5rem;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 2px 6px rgba(0,0,0,0.05);
  }
  
  .customer-form h2 {
    margin-bottom: 0.5rem;
  }
  
  .form-group {
    margin-bottom: 1rem;
  }
  
  label {
    display: block;
    font-weight: 600;
    margin-bottom: 0.3rem;
  }
  
  input, textarea {
    width: 100%;
    padding: 0.6rem;
    border: 1px solid #ccc;
    border-radius: 6px;
    font-size: 1rem;
  }
  
  .submit-btn {
    background-color: #2563eb;
    color: white;
    border: none;
    padding: 0.6rem 1.2rem;
    border-radius: 6px;
    cursor: pointer;
  }
  
  .submit-btn:hover {
    background-color: #1d4ed8;
  }
  
  .empty-message {
    text-align: center;
    color: #666;
    padding: 2rem 0;
  }
  </style>