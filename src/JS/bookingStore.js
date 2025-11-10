import { reactive } from 'vue'

export const bookingStore = reactive({
  bookedTutors: [],

  tutors: [
    { id: 1, name: 'Lewis Johnson', subject: 'Math', price: 25, rating: 4.8, space: 5, location: 'Hendon', about: 'Experienced Math tutor with a passion for helping students excel in their studies.' },
    { id: 2, name: 'Vinnie Hec', subject: 'English', price: 20, rating: 4.6, space: 3, location: 'Rushden', about: 'Dedicated English tutor specializing in literature and writing skills for high school students.' },
    { id: 3, name: 'Jude Richard', subject: 'Science', price: 30, rating: 4.9, space: 4, location: 'Hitchin', about: 'Passionate Science tutor with expertise in biology, chemistry, and physics for GCSE and A-Level students.' },
    { id: 4, name: 'Emma Watson', subject: 'History', price: 22, rating: 4.7, space: 2, location: 'Sandy', about: 'Enthusiastic History tutor focused on making historical events engaging and relevant for students.' },
    { id: 5, name: 'Olivia Brown', subject: 'Art', price: 28, rating: 4.5, space: 6, location: 'Biggleswade', about: 'Creative Art tutor dedicated to nurturing students artistic talents and encouraging self-expression through various mediums.' },
    { id: 6, name: 'Liam Smith', subject: 'AP Physics', price: 35, rating: 4.9, space: 1, location: 'Huntingdon', about: 'Expert AP Physics tutor with a strong background in advanced physics concepts and problem-solving techniques for high-achieving students.' },
  ],

  addBooking(tutor) {
    const match = this.tutors.find(t => t.id === tutor.id)
    if (match && match.space > 0) {
      match.space -= 1
      this.bookedTutors.push({ ...match, bookedAt: new Date().toISOString() })
    } else {
      alert('No spaces left for this tutor.')
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
