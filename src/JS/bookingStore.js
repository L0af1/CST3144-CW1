import { reactive } from "vue"

export const bookingStore = reactive({

  tutors: [], // made it so all gets loaeded from the backend
  bookedTutors: [],

  async loadLessons() {
    try {
      const res = await fetch("https://cst3144-cw1-backend.onrender.com/api/lessons")
      const data = await res.json()

      // Replace everything inside tutors array (keep reactivity) (This is pretty cool because it keeps the same array reference)
      this.tutors.splice(0, this.tutors.length, ...data)

    } catch (err) {
      console.error("FAILED TO LOAD LESSONS:", err)
    }
  },

  addBooking(tutor) {
    const match = this.tutors.find(t => t.id === tutor.id)

    if (match && match.space > 0) {
      match.space -= 1

      this.bookedTutors.push({
        ...match,
        bookedAt: new Date().toISOString()
      })
    } else {
      alert("No spaces left for this tutor.")
    }
  },

  removeBooking(tutorId) {
    const index = this.bookedTutors.findIndex(t => t.id === tutorId)

    if (index > -1) {
      const tutor = this.tutors.find(t => t.id === tutorId)
      tutor.space += 1
      this.bookedTutors.splice(index, 1)
    }
  }
})
