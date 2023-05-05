import { defineStore } from 'pinia'
import { db } from '@/firebase'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { useCategoryStore } from '@/stores/category'

export const useActionsStore = defineStore({
  id: 'actions',
  state: () => ({
    actions: []
  }),
  getters: {
    attentionContent: (state) => {
      const data: Array<object> = []
      state.actions.forEach((doc: any) => {
        data.push(doc.content)
      })
      return data
    }
  },
  actions: {
    getActions() {
      const categoryStore = useCategoryStore()
      const actionsCollectionRef = collection(db, 'actions')
      const actionsCollectionQuery = query(actionsCollectionRef, where("category", "==", categoryStore.category))

      onSnapshot(actionsCollectionQuery, (querySnapshot) => {
        const fbactions: any = []
        querySnapshot.forEach((doc: any) => {
          const action = {
            id: doc.id,
            content: doc.data().content,
            group: doc.data().group,
            category: doc.data().category,
            user: doc.data().user
          }
          fbactions.push(action)
        })
        this.actions = fbactions
      })
    },
  }

})
