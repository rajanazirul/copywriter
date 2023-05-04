import { defineStore } from 'pinia'

export const useCounterStore = defineStore({
  id: 'counter',
  state: () => ({
    count: 0
  }),
  getters: {
    oddOrEven: (state) => {
      if (state.count % 2 === 0) return 'even'
      return 'odd'
    }
  },
  actions: {
    increment() {
      this.count++;
    },
    decrement() {
      this.count--;
    },
  }
  
})
