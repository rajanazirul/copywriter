import { defineStore } from 'pinia'
import { ref, onMounted, reactive } from 'vue';
import { db } from '@/firebase'
import { collection, onSnapshot, addDoc, deleteDoc, doc, updateDoc, query, orderBy, limit } from 'firebase/firestore'

export const useAttentionsStore = defineStore( {
  id: 'attentions',
  state: () => ({
    attentions: []
  }),
  actions: {
    async getAttentions() {
        const attentionsCollectionRef = collection(db, 'attentions')
        const attentionsCollectionQuery = query(attentionsCollectionRef, orderBy('date', 'desc'), limit(9))

        onSnapshot(attentionsCollectionQuery, (querySnapshot) => {
            const fbattentions: Array<object> = []
            querySnapshot.forEach((doc) => {
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
