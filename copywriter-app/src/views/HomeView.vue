<script setup lang="ts">
import { ref, reactive } from 'vue';
import { db } from '@/firebase'
import { useVuelidate } from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'
import { collection, addDoc} from 'firebase/firestore'
import { useCopywritingStore } from '@/stores/copywriting'

const cwStore = useCopywritingStore()
const user = ref()
const group = ref()
const category = ref()

const items = ref([
  'Item 1',
  'Item 2',
  'Item 3',
  'Item 4',
])


// ATTENTIONS
const content = ref(cwStore.attention)

const initialState = {
  content: '',
  group: null,
  category: '',
  user: '',
}

const attentions = reactive({
  ...initialState,
})

const required$ = helpers.withMessage('Sila isi ruang yang berwarna merah!', required)
const rules = {
  user: { required$ },
  group: { required$ },
  category: { required$ },
  content: { required$ },
}
const v$ = useVuelidate(rules, attentions)

const attentionsCollectionRef = collection(db, 'attentions')
const addAttentionContent = () => {
  addDoc(attentionsCollectionRef, {
    content: content.value,
    group: group.value,
    category: category.value,
    user: user.value,
    date: Date.now()
  })
  cwStore.attention = ''
}

// INTERESTS
const interestContent = ref(cwStore.interest)

const initialInterest = {
  interestContent: '',
  group: null,
  category: '',
  user: '',
}

const interests = reactive({
  ...initialInterest,
})

const requiredInterest$ = helpers.withMessage('Sila isi ruang yang berwarna merah!', required)
const rulesInterest = {
  user: { requiredInterest$ },
  group: { requiredInterest$ },
  category: { requiredInterest$ },
  interestContent: { requiredInterest$ },
}
const vi$ = useVuelidate(rulesInterest, interests)

const interestsCollectionRef = collection(db, 'interests')
const addInterestsContent = () => {
  addDoc(interestsCollectionRef, {
    content: interestContent.value,
    group: group.value,
    category: category.value,
    user: user.value,
    date: Date.now()
  })
  cwStore.interest = ''
}


// DESIRE
const desireContent = ref(cwStore.desire)

const initialDesire = {
  desireContent: '',
  group: null,
  category: '',
  user: '',
}

const desires = reactive({
  ...initialDesire,
})

const requiredDesire$ = helpers.withMessage('Sila isi ruang yang berwarna merah!', required)
const rulesDesire = {
  user: { requiredDesire$ },
  group: { requiredDesire$ },
  category: { requiredDesire$ },
  desireContent: { requiredDesire$ },
}
const vd$ = useVuelidate(rulesDesire, desires)

const desiresCollectionRef = collection(db, 'desires')
const addDesiresContent = () => {
  addDoc(desiresCollectionRef, {
    content: desireContent.value,
    group: group.value,
    category: category.value,
    user: user.value,
    date: Date.now()
  })
  cwStore.desire = ''
}

// ACTION
const actionContent = ref(cwStore.action)

const initialAction = {
  actionContent: '',
  group: null,
  category: '',
  user: '',
}

const actions = reactive({
  ...initialAction,
})

const requiredAction$ = helpers.withMessage('Sila isi ruang yang berwarna merah!', required)
const rulesAction = {
  user: { requiredAction$ },
  group: { requiredAction$ },
  category: { requiredAction$ },
  actionContent: { requiredAction$ },
}
const va$ = useVuelidate(rulesAction, actions)

const actionsCollectionRef = collection(db, 'actions')
const addActionsContent = () => {
  addDoc(actionsCollectionRef, {
    content: actionContent.value,
    group: group.value,
    category: category.value,
    user: user.value,
    date: Date.now()
  })
  cwStore.action = ''
}
</script>


<template>
  <main>
    <div class="home">
      <v-text-field v-model="user" label="Pengguna" required @input="v$.user.$touch"
        @blur="v$.user.$touch"></v-text-field>

      <v-text-field v-model="group" label="Nama Kumpulan" required @input="v$.group.$touch"
        @blur="v$.group.$touch"></v-text-field>

      <v-autocomplete v-model="category" label="Kategori Jualan"
        :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"></v-autocomplete>

      <form @submit.prevent="addAttentionContent">
        <v-card width="600" title="A - ATTENTION [PERHATIAN]" subtitle="(Ayat menangkap minat pembaca)">
          <textarea id="message" rows="4" v-model="cwStore.attention" :error-messages="v$.content.$errors.map(e => e.$message)"
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
      </form>

      <form @submit.prevent="addInterestsContent">
        <v-card width="600" title="I - INTEREST [MINAT]" subtitle="(Ayat untuk menarik minat orang membaca iklan anda)">
          <textarea id="message" rows="4" v-model="cwStore.interest" :error-messages="vi$.interestContent.$errors.map(e => e.$message)"
            required @input="vi$.interestContent.$touch" @blur="vi$.interestContent.$touch"
            class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            :placeholder="items[0]"></textarea>
        </v-card>

        <v-btn
          class="me-4 mx-4 my-4 inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
          @click="vi$.$validate" type="submit">
          Simpan
        </v-btn>
        <v-btn
          class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-red-700 rounded-lg focus:ring-4 focus:ring-red-200 dark:focus:ring-red-900 hover:bg-red-800"
          @click="">
          Kosongkan
        </v-btn>
      </form>

      <form @submit.prevent="addDesiresContent">
        <v-card width="600" title="D - DESIRE [KEINGINAN]" subtitle="(Ayat untuk menarik pembaca membeli produk anda)">
          <textarea id="message" rows="4" v-model="cwStore.desire" :error-messages="vd$.desireContent.$errors.map(e => e.$message)"
            required @input="vd$.desireContent.$touch" @blur="vd$.desireContent.$touch"
            class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            :placeholder="items[0]"></textarea>
        </v-card>

        <v-btn
          class="me-4 mx-4 my-4 inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
          @click="vd$.$validate" type="submit"> 
          Simpan
        </v-btn>
        <v-btn
          class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-red-700 rounded-lg focus:ring-4 focus:ring-red-200 dark:focus:ring-red-900 hover:bg-red-800"
          @click="">
          Kosongkan
        </v-btn>
      </form>

      <form @submit.prevent="addActionsContent">
        <v-card width="600" title="A - ACTION [TINDAKAN]" subtitle="(Maklumat mengenai cara membuat pembelian)">
          <textarea id="message" rows="4" v-model="cwStore.action" :error-messages="va$.actionContent.$errors.map(e => e.$message)"
            required @input="va$.actionContent.$touch" @blur="va$.actionContent.$touch"
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
      </form>

    </div>

  </main>
</template>


<style scoped></style>
