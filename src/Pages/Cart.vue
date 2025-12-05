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
          <input id="name" v-model="customer.name" type="text" required pattern="[A-Za-z ]+"
            :class="{ 'input-error': customer.name && !isValidName }" />
          <p v-if="customer.name && !isValidName" class="error-message">
            Name must contain letters and spaces only.
          </p>
        </div>

        <div class="form-group">
          <label for="email">Email Address:</label>
          <input id="email" v-model="customer.email" type="email" required />
        </div>

        <div class="form-group">
          <label for="phone">Phone Number:</label>
          <input id="phone" v-model="customer.phone" type="tel" required pattern="[0-9]+"
            :class="{ 'input-error': customer.phone && !isValidPhone }" />
          <p v-if="customer.phone && !isValidPhone" class="error-message">
            Phone must contain numbers only.
          </p>
        </div>

        <div class="form-group">
          <label for="address">Address:</label>
          <textarea id="address" v-model="customer.address" rows="3" required></textarea>
        </div>

        <button type="submit" class="submit-btn" :disabled="!isValidName || !isValidPhone">
          Confirm Booking
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed, onMounted } from "vue"
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

const isValidName = computed(() => /^[A-Za-z ]+$/.test(customer.name))
const isValidPhone = computed(() => /^[0-9]+$/.test(customer.phone))

onMounted(() => {
  bookingStore.loadLessons()
})

async function submitBooking() {
  if (!customer.name || !customer.email || !customer.phone || !customer.address) {
    alert("Please fill out all fields before submitting.")
    return
  }

  if (!isValidName.value || !isValidPhone.value) {
    alert("Name must be letters only and phone numbers only.")
    return
  }

  if (bookingStore.bookedTutors.length === 0) {
    alert("You have no tutors in your booking cart.")
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

    await bookingStore.loadLessons()

    alert("Booking completed!")

    bookingStore.bookedTutors.splice(0, bookingStore.bookedTutors.length)

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
  max-width: 900px;
  margin: 0 auto;
  background: #f5f5fc;
  border-radius: 14px;
}

h1 {
  text-align: center;
  color: #4b3e9b;
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
}

.bookings-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.booking-card {
  background: #ffffff;
  border: 1px solid #cbcbe4;
  padding: 1.2rem;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(90, 76, 168, 0.08);
}

.cancel-btn {
  margin-top: 0.5rem;
  background-color: #d46c6c;
  color: white;
  padding: 0.45rem 0.8rem;
  border: none;
  border-radius: 8px;
  transition: 0.25s ease;
}

.cancel-btn:hover {
  background-color: #b55656;
}

.customer-form {
  background: #ffffff;
  border: 1px solid #cbcbe4;
  padding: 1.5rem;
  border-radius: 12px;
  margin-top: 2rem;
  box-shadow: 0 4px 10px rgba(90, 76, 168, 0.08);
}

.customer-form h2 {
  color: #4b3e9b;
  margin-bottom: 0.75rem;
}

label {
  font-weight: 600;
  color: #4b3e9b;
}

input,
textarea {
  width: 100%;
  border: 1px solid #c5c5df;
  border-radius: 8px;
  padding: 0.6rem;
  margin-top: 0.3rem;
}

.submit-btn {
  background-color: #7a6fe3;
  color: white;
  border: none;
  padding: 0.7rem 1.2rem;
  border-radius: 8px;
  font-weight: 600;
  transition: 0.25s ease;
  margin-top: 1rem;
}

.submit-btn:hover {
  background-color: #675ac7;
}

.empty-message {
  text-align: center;
  color: #6c6c86;
  padding: 2rem 0;
}

.input-error {
  border-color: #e11d48;
  outline: none;
  box-shadow: 0 0 0 1px rgba(225, 29, 72, 0.2);
}

.error-message {
  color: #e11d48;
  font-size: 0.85rem;
  margin-top: 0.25rem;
}


</style>