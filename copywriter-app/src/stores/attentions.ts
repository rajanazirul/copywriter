import { defineStore } from 'pinia'
import { db } from '@/firebase'
import { collection, onSnapshot, query, orderBy, limit } from 'firebase/firestore'

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
      const attentionsCollectionRef = collection(db, 'attentions')
      const attentionsCollectionQuery = query(attentionsCollectionRef, orderBy('date', 'desc'), limit(9))

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
