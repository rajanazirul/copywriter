<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue';
import { db } from '@/firebase'
import { useVuelidate } from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'
import { collection, onSnapshot, addDoc, deleteDoc, doc, updateDoc, query, orderBy, limit } from 'firebase/firestore'



const user = ref()
const group = ref()
const category = ref()
const content = ref()


const initialState = {
  content: '',
  group: null,
  category: '',
  user: '',
}

const attentions = reactive({
  ...initialState,
})

const items = ref([
  'Item 1',
  'Item 2',
  'Item 3',
  'Item 4',
])

const required$ = helpers.withMessage('Sila isi ruang yang berwarna merah!', required)

const rules = {
  user: { required$ },
  group: { required$ },
  category: { required$ },
  content: { required$ },
}

const v$ = useVuelidate(rules, attentions)

// ATTENTIONS
const attentionsCollectionRef = collection(db, 'attentions')

const addAttentionContent = () => {
  addDoc(attentionsCollectionRef, {
    content: content.value,
    group: group.value,
    category: category.value,
    user: user.value,
    date: Date.now()
  })
  content.value = null
}

</script>


<template>
  <main>
    <div class="home">
      <form @submit.prevent="addAttentionContent">
        <h1>{{ user }}</h1>
        <v-text-field v-model="user" label="Pengguna" required @input="v$.user.$touch"
          @blur="v$.user.$touch"></v-text-field>

        <h1>{{ group }}</h1>
        <v-text-field v-model="group" label="Nama Kumpulan" required @input="v$.group.$touch"
          @blur="v$.group.$touch"></v-text-field>

        <h1>{{ category }}</h1>
        <v-autocomplete v-model="category" label="Kategori Jualan"
          :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"></v-autocomplete>

        <h1>{{ content }}</h1>
        <v-card width="600" title="A - ATTENTION [PERHATIAN]" subtitle="(Ayat menangkap minat pembaca)">
          <textarea id="message" rows="4" v-model="content" :error-messages="v$.group.$errors.map(e => e.$message)"
            required @input="v$.content.$touch" @blur="v$.content.$touch"
            class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            :placeholder="items[0]"></textarea>
        </v-card>

        <v-btn
          class="me-4 mx-4 my-4 inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
          @click="v$.$validate" type="submit">
          Simpan
        </v-btn>
        <v-btn
          class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-red-700 rounded-lg focus:ring-4 focus:ring-red-200 dark:focus:ring-red-900 hover:bg-red-800"
          @click="">
          Kosongkan
        </v-btn>


        <v-card width="600" title="I - INTEREST [MINAT]" subtitle="(Ayat untuk menarik minat orang membaca iklan anda)">
          <textarea id="message" rows="4"
            class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            :placeholder="items[0]"></textarea>
        </v-card>


        <v-btn
          class="me-4 mx-4 my-4 inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
          @click="v$.$validate" type="submit">
          Simpan
        </v-btn>
        <v-btn
          class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-red-700 rounded-lg focus:ring-4 focus:ring-red-200 dark:focus:ring-red-900 hover:bg-red-800"
          @click="">
          Kosongkan
        </v-btn>


        <v-card width="600" title="D - DESIRE [KEINGINAN]" subtitle="(Ayat untuk menarik pembaca membeli produk anda)">
          <textarea id="message" rows="4"
            class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            :placeholder="items[0]"></textarea>
        </v-card>


        <v-btn
          class="me-4 mx-4 my-4 inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
          @click="v$.$validate">
          Simpan
        </v-btn>
        <v-btn
          class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-red-700 rounded-lg focus:ring-4 focus:ring-red-200 dark:focus:ring-red-900 hover:bg-red-800"
          @click="">
          Kosongkan
        </v-btn>


        <v-card width="600" title="A - ACTION [TINDAKAN]" subtitle="(Maklumat mengenai cara membuat pembelian)">
          <textarea id="message" rows="4"
            class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            :placeholder="items[0]"></textarea>
        </v-card>


        <v-btn
          class="me-4 mx-4 my-4 inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
          @click="v$.$validate">
          Simpan
        </v-btn>
        <v-btn
          class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-red-700 rounded-lg focus:ring-4 focus:ring-red-200 dark:focus:ring-red-900 hover:bg-red-800"
          @click="">
          Kosongkan
        </v-btn>
      </form>
    </div>

  </main>
</template>


<style scoped></style>
