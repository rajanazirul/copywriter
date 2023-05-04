<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue';
import { db } from '@/firebase'
import { useVuelidate } from '@vuelidate/core'
import { email, required, helpers } from '@vuelidate/validators'
import { collection, onSnapshot, addDoc, deleteDoc, doc, updateDoc, query, orderBy, limit } from 'firebase/firestore'


// code block for form
const required$ = helpers.withMessage('Sila isi ruang yang berwarna merah!', required)

const initialState = {
  name: '',
  group: '',
  select: null,
}

const state = reactive({
  ...initialState,
})

const items = ref([
  'Item 1',
  'Item 2',
  'Item 3',
  'Item 4',
])

const rules = {
  name: { required$ },
  group: { required$ },
  select: { required$ },
  items: { required$ },
}

const v$ = useVuelidate(rules, state)

function clear() {
  v$.value.$reset()

  for (const [key, value] of Object.entries(initialState)) {
    state[key] = value
  }
}
</script>


<template>
  <main>
    <div class="home">
      <form>
        <v-text-field v-model="state.name" :error-messages="v$.name.$errors.map(e => e.$message)" s
          label="Pengguna" required @input="v$.name.$touch" @blur="v$.name.$touch"></v-text-field>

        <v-text-field v-model="state.group" :error-messages="v$.group.$errors.map(e => e.$message)" label="Nama Kumpulan"
          required @input="v$.group.$touch" @blur="v$.group.$touch"></v-text-field>

        <v-select v-model="state.select" :items="items" :error-messages="v$.select.$errors.map(e => e.$message)"
          label="Kategori Jualan" required @change="v$.select.$touch" @blur="v$.select.$touch"></v-select>

        <v-card width="600" title="A - ATTENTION [PERHATIAN]" subtitle="(Ayat menangkap minat pembaca)">
          <textarea id="message" rows="4"
            class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            :placeholder="items[0]"></textarea>
        </v-card>

        <v-btn class="me-4 mx-4 my-4 inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800" @click="v$.$validate">
          Simpan
        </v-btn>
        <v-btn class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-red-700 rounded-lg focus:ring-4 focus:ring-red-200 dark:focus:ring-red-900 hover:bg-red-800" @click="clear">
          Kosongkan
        </v-btn>


        <v-card width="600" title="I - INTEREST [MINAT]" subtitle="(Ayat untuk menarik minat orang membaca iklan anda)">
          <textarea id="message" rows="4"
            class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            :placeholder="items[0]"></textarea>
        </v-card>


        <v-btn class="me-4 mx-4 my-4 inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800" @click="v$.$validate">
          Simpan
        </v-btn>
        <v-btn class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-red-700 rounded-lg focus:ring-4 focus:ring-red-200 dark:focus:ring-red-900 hover:bg-red-800" @click="clear">
          Kosongkan
        </v-btn>


        <v-card width="600" title="D - DESIRE [KEINGINAN]" subtitle="(Ayat untuk menarik pembaca membeli produk anda)">
          <textarea id="message" rows="4"
            class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            :placeholder="items[0]"></textarea>
        </v-card>


        <v-btn class="me-4 mx-4 my-4 inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800" @click="v$.$validate">
          Simpan
        </v-btn>
        <v-btn class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-red-700 rounded-lg focus:ring-4 focus:ring-red-200 dark:focus:ring-red-900 hover:bg-red-800" @click="clear">
          Kosongkan
        </v-btn>


        <v-card width="600" title="A - ACTION [TINDAKAN]" subtitle="(Maklumat mengenai cara membuat pembelian)">
          <textarea id="message" rows="4"
            class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            :placeholder="items[0]"></textarea>
        </v-card>


        <v-btn class="me-4 mx-4 my-4 inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800" @click="v$.$validate">
          Simpan
        </v-btn>
        <v-btn class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-red-700 rounded-lg focus:ring-4 focus:ring-red-200 dark:focus:ring-red-900 hover:bg-red-800" @click="clear">
          Kosongkan
        </v-btn>
      </form>
    </div>

  </main>
</template>


<style scoped></style>
