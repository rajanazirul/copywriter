import { defineStore } from 'pinia'
import { db } from '@/firebase'
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore'

export const useCategoryStore = defineStore({
    id: 'categories',
    state: () => ({
        categories: [],
        category: ''
    }),
    getters: {
        categoriesContent: (state) => {
            const data: Array<object> = []
            state.categories.forEach((doc: any) => {
                data.push(doc.category)
            })
            return data
        }
    },
    actions: {
        getCategories() {
            const categoriesCollectionRef = collection(db, 'categories')
            const categoriesCollectionQuery = query(categoriesCollectionRef)

            onSnapshot(categoriesCollectionQuery, (querySnapshot) => {
                const fbcategories: any = []
                querySnapshot.forEach((doc: any) => {
                    fbcategories.push(doc.data().category)
                })
                this.categories = fbcategories
            })
        },
    }

})
