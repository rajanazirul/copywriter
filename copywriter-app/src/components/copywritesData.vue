<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { db } from '@/firebase'
import { collection, deleteDoc, doc, query, onSnapshot, addDoc } from 'firebase/firestore'

interface FormData {
    category: category;
}

interface category {
    category: string;
    content: string;
    user: string;
    group: string;
    date: Date;
    id: string;
}

const copywritesCollectionRef = collection(db, 'copywrite')
const copywritesCollectionQuery = query(copywritesCollectionRef)

const copywrites = ref<FormData>()

const deleteContent = (id: any) => {
    deleteDoc(doc(copywritesCollectionRef, id))
}

const headers = ['Ayat', 'Kumpulan', 'Kategori', 'Pengguna', 'Tarikh', 'Aksi']

onMounted(() => {
    onSnapshot(copywritesCollectionQuery, (querySnapshot) => {
        const fbcopywrites: any = []
        querySnapshot.forEach((doc: any) => {
            const category = {
                id: doc.id,
                content: doc.data().content,
                group: doc.data().group,
                category: doc.data().category,
                user: doc.data().user,
                date: new Date(doc.data().date)
            }
            fbcopywrites.push(category)
        })
        copywrites.value = fbcopywrites
    })
})
</script>

<template>
    <div>
        <v-card color="#385F73" theme="dark">
            <v-card-title class="text-h5">
                Kumpulan Ayat Copywriting
            </v-card-title>
        </v-card>

        <v-table>
            <thead>
                <tr>
                    <th class="text-left" v-for="data in headers">
                        {{ data }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="copywrite in copywrites" :key="copywrite.id">
                    <td>{{ copywrite.content }}</td>
                    <td>{{ copywrite.group }}</td>
                    <td>{{ copywrite.category }}</td>
                    <td>{{ copywrite.user }}</td>
                    <td>{{ copywrite.date }}</td>
                    <td><button type="button" @click="deleteContent(copywrite.id)"
                            class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Remove</button>
                    </td>
                </tr>
            </tbody>
        </v-table>
    </div>
</template>

<style scoped>
table th+th {
    border-left: 1px solid #dddddd;
}

table td+td {
    border-left: 1px solid #dddddd;
}
</style>
