import { defineStore } from 'pinia'

export const useCopywritingStore = defineStore({
    id: 'copywriting',
    state: () => ({
        group: '',
        user: '',
        category: '',
        attention: '',
        interest: '',
        desire: '',
        action: '',
        content: ''
    }),
    getters: {
        copywritingContent: (state) => {
            return state.attention + '\n' + state.interest + '\n' + state.desire + '\n' + state.action
        }
    },
    actions: {
        validateCopywriting() {
            if ((this.attention == '') || (this.interest == '') || (this.desire == '') || (this.action == '')) {
                return false
            }
            return true
        },
    }
})
