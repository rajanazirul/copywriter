import { defineStore } from 'pinia'

export const useCopywritingStore = defineStore({
  id: 'copywriting',
  state: () => ({
    attention: '',
    interest: '',
    desire: '',
    action: '',
    content: ''
  }),
  getters: {
    copywritingContent: (state) => {
      return state.attention + state.interest + state.desire + state.action
    }
  },
  actions: {
    generateCopywriting() {
      this.content = this.attention + this.interest + this.desire + this.action
    },
  }
  
})
