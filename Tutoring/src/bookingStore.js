import { reactive } from 'vue'


export const bookingStore = reactive({
  bookedTutors: [],
  
  addBooking(tutor) {

    const exists = this.bookedTutors.find(t => t.id === tutor.id)
    if (!exists) {
      this.bookedTutors.push({
        ...tutor,
        bookedAt: new Date().toISOString()
      })
    }
  },
  
  removeBooking(tutorId) {
    const index = this.bookedTutors.findIndex(t => t.id === tutorId)
    if (index > -1) {
      this.bookedTutors.splice(index, 1)
    }
  }
})