import { defineStore } from 'pinia'
import { db } from '@/firebase'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { useCategoryStore } from '@/stores/category'

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
        content: '',
        copywrite: []
    }),
    getters: {
        copywritingContent: (state) => {
            if (state.content != '') {
                return state.attention + '\n' + state.interest + '\n' + state.desire + '\n' + state.action
            }
            return state.content
        },
        copywritesContent: (state) => {
            const data: Array<object> = []
            state.copywrite.forEach((doc: any) => {
                data.push(doc.content)
            })
            return data
        }
    },
    actions: {
        validateCopywriting() {
            if ((this.attention == '') || (this.interest == '') || (this.desire == '') || (this.action == '')) {
                return false
            }
            return true
        },
        getCopywrite() {
            const categoryStore = useCategoryStore()
            const copywritesCollectionRef = collection(db, 'copywrite')
            const copywritesCollectionQuery = query(copywritesCollectionRef, where("category", "==", categoryStore.category))

            onSnapshot(copywritesCollectionQuery, (querySnapshot) => {
                const fbcopywrite: any = []
                querySnapshot.forEach((doc: any) => {
                    const copywrite = {
                        id: doc.id,
                        content: doc.data().content,
                        group: doc.data().group,
                        category: doc.data().category,
                        user: doc.data().user
                    }
                    fbcopywrite.push(copywrite)
                })
                this.copywrite = fbcopywrite
            })
        },
    }
})
