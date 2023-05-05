import { defineStore } from 'pinia'
import { db } from '@/firebase'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { useCategoryStore } from '@/stores/category'

export const useInterestsStore = defineStore({
  id: 'interests',
  state: () => ({
    interests: []
  }),
  getters: {
    interestContent: (state) => {
      const data: Array<object> = []
      state.interests.forEach((doc: any) => {
        data.push(doc.content)
      })
      return data
    }
  },
  actions: {
    getInterests() {
      const categoryStore = useCategoryStore()
      const interestsCollectionRef = collection(db, 'interests')
      const interestsCollectionQuery = query(interestsCollectionRef, where("category", "==", categoryStore.category))

      onSnapshot(interestsCollectionQuery, (querySnapshot) => {
        const fbinterests: any = []
        querySnapshot.forEach((doc: any) => {
          const interest = {
            id: doc.id,
            content: doc.data().content,
            group: doc.data().group,
            category: doc.data().category,
            user: doc.data().user
          }
          fbinterests.push(interest)
        })
        this.interests = fbinterests
      })
    },
  }

})
