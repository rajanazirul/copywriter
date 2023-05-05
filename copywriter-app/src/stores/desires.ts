import { defineStore } from 'pinia'
import { db } from '@/firebase'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { useCategoryStore } from '@/stores/category'

export const useDesiresStore = defineStore({
  id: 'desires',
  state: () => ({
    desires: []
  }),
  getters: {
    desireContent: (state) => {
      const data: Array<object> = []
      state.desires.forEach((doc: any) => {
        data.push(doc.content)
      })
      return data
    }
  },
  actions: {
    getDesires() {
      const categoryStore = useCategoryStore()
      const desiresCollectionRef = collection(db, 'desires')
      const attentionsCollectionQuery = query(desiresCollectionRef, where("category", "==", categoryStore.category))

      onSnapshot(attentionsCollectionQuery, (querySnapshot) => {
        const fbattentions: any = []
        querySnapshot.forEach((doc: any) => {
          const desire = {
            id: doc.id,
            content: doc.data().content,
            group: doc.data().group,
            category: doc.data().category,
            user: doc.data().user
          }
          fbattentions.push(desire)
        })
        this.desires = fbattentions
      })
    },
  }

})
