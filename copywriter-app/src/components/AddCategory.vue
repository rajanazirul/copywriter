<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Header from '@/views/Header.vue'
import { db } from '@/firebase'
import { collection, deleteDoc, doc, query, onSnapshot, addDoc } from 'firebase/firestore'


const categoriesCollectionRef = collection(db, 'categories')
const categoriesCollectionQuery = query(categoriesCollectionRef)

const categories = ref([])

const newCategory = ref()

const addTodo = () => {
    addDoc(categoriesCollectionRef, {
        category: newCategory.value,
    })
    newCategory.value = ''
}

const deleteContent = (id: any) => {
    deleteDoc(doc(categoriesCollectionRef, id))
}

onMounted(() => {
    onSnapshot(categoriesCollectionQuery, (querySnapshot) => {
        const fbcategories: any = []
        querySnapshot.forEach((doc: any) => {
            const category = {
                id: doc.id,
                content: doc.data().content,
                group: doc.data().group,
                category: doc.data().category,
                user: doc.data().user
            }
            fbcategories.push(category)
        })
        categories.value = fbcategories
    })
})
</script>

<template>
    <div>
        <div class="py-7">
            <Header />
        </div>

        <div class="columns py-5">
            <v-form @submit.prevent="addTodo">
                <v-text-field label="Tambah Kategori Jualan" v-model="newCategory"></v-text-field>
                <v-btn type="submit" :disabled="!newCategory">
                    Add
                </v-btn>
            </v-form>
        </div>

        <div class="lg:grid grid-cols-4 gap-4">
            <div v-for="category in categories" class="d-flex align-center flex-column">
                <div>
                    <v-card width="300" class="mx-3 my-4">
                        <v-card-item>
                            <div>
                                <div class="text-overline mb-1">
                                    {{ category.category }}
                                </div>
                            </div>
                        </v-card-item>
                        <v-card-actions>
                            <button type="button" @click="deleteContent(category.id)"
                                class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Remove</button>
                        </v-card-actions>
                    </v-card>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
