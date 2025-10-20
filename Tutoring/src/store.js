import { reactive } from 'vue'

export const store = reactive({
  cart: [],

  addToCart(tutor) {
    // Prevent duplicates bc we dont like that
    if (!this.cart.find(item => item.id === tutor.id)) {
      this.cart.push(tutor)
    }
  },

  removeFromCart(id) {
    this.cart = this.cart.filter(item => item.id !== id)
  },

  clearCart() {
    this.cart = []
  }
})