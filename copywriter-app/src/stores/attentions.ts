import { defineStore } from 'pinia'
import { db } from '@/firebase'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { useCategoryStore } from '@/stores/category'

export const useAttentionsStore = defineStore({
  id: 'attentions',
  state: () => ({
    attentions: []
  }),
  getters: {
    attentionContent: (state) => {
      const data: Array<object> = []
      state.attentions.forEach((doc: any) => {
        data.push(doc.content)
      })
      return data
    }
  },
  actions: {
    getAttentions() {
      const categoryStore = useCategoryStore()
      const attentionsCollectionRef = collection(db, 'attentions')
      const attentionsCollectionQuery = query(attentionsCollectionRef, where("category", "==", categoryStore.category))

      onSnapshot(attentionsCollectionQuery, (querySnapshot) => {
        const fbattentions: any = []
        querySnapshot.forEach((doc: any) => {
          const attention = {
            id: doc.id,
            content: doc.data().content,
            group: doc.data().group,
            category: doc.data().category,
            user: doc.data().user
          }
          fbattentions.push(attention)
        })
        this.attentions = fbattentions
      })
    },
  }

})
