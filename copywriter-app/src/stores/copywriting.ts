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
        if ((this.attention == '') || (this.interest == '') || (this.desire == '') || (this.action == '')){
            return this.content = 'bad'
        }
        return this.content = 'good'
    },
  }
})
