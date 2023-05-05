<script setup lang="ts">
import { ref, reactive, onMounted, watch } from 'vue';
import { db } from '@/firebase'
import { useVuelidate } from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'
import { collection, addDoc, query, orderBy, limit, onSnapshot } from 'firebase/firestore'
import { useCopywritingStore } from '@/stores/copywriting'
import { useAttentionsStore } from '@/stores/attentions'
import { useInterestsStore } from '@/stores/interests'
import { useDesiresStore } from '@/stores/desires'
import { useActionsStore } from '@/stores/actions'
import { useCategoryStore } from '@/stores/category'
import Category from '@/components/Category.vue'
import DigitalClock from '@/components/DigitalClock.vue'


const cwStore = useCopywritingStore()
const attentionStore = useAttentionsStore()
const interestStore = useInterestsStore()
const desireStore = useDesiresStore()
const actionStore = useActionsStore()
const categoryStore = useCategoryStore()

const dialog = ref(false)
const resetAttention = () => { cwStore.attention = '' }
const resetInterest = () => { cwStore.interest = '' }
const resetDesire = () => { cwStore.desire = '' }
const resetAction = () => { cwStore.action = '' }

// ATTENTIONS
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
    content: cwStore.attention,
    group: cwStore.group,
    category: categoryStore.category,
    user: cwStore.user,
    date: Date.now()
  })
  dialog.value = true
}

// INTERESTS
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
    content: cwStore.interest,
    group: cwStore.group,
    category: categoryStore.category,
    user: cwStore.user,
    date: Date.now()
  })
  dialog.value = true
}


// DESIRE
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
    content: cwStore.desire,
    group: cwStore.group,
    category: categoryStore.category,
    user: cwStore.user,
    date: Date.now()
  })
  dialog.value = true
}

// ACTION
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
    content: cwStore.action,
    group: cwStore.group,
    category: categoryStore.category,
    user: cwStore.user,
    date: Date.now()
  })
  dialog.value = true
}

watch(() => categoryStore.category, () => {
  attentionStore.getAttentions()
  interestStore.getInterests()
  desireStore.getDesires()
  actionStore.getActions()
  cwStore.attention = ''
  cwStore.interest = ''
  cwStore.desire = ''
  cwStore.action = ''

}, { immediate: true });


</script>


<template>
  <main>
    <div class="home">

      <DigitalClock />

      <v-text-field v-model="cwStore.user" label="Pengguna" required @input="v$.user.$touch"
        @blur="v$.user.$touch" variant="outlined"></v-text-field>

      <v-text-field v-model="cwStore.group" label="Nama Kumpulan" required @input="v$.group.$touch"
        @blur="v$.group.$touch" variant="outlined"></v-text-field>

      <Category />

      <form @submit.prevent="addAttentionContent">
        <v-card width="600" title="A - ATTENTION [PERHATIAN]" subtitle="(Ayat menangkap minat pembaca)">
          <v-select v-model="cwStore.attention" :items="attentionStore.attentionContent" label="Pilihan Ayat"></v-select>
          <textarea id="message" rows="4" v-model="cwStore.attention"
            :error-messages="v$.content.$errors.map(e => e.$message)" required @input="v$.content.$touch"
            @blur="v$.content.$touch"
            class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Sila isi ayat disini..."></textarea>
        </v-card>

        <v-btn
          class="me-4 mx-4 my-4 inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
          @click="v$.$validate" type="submit">
          Simpan
        </v-btn>
        <v-btn
          class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-red-700 rounded-lg focus:ring-4 focus:ring-red-200 dark:focus:ring-red-900 hover:bg-red-800"
          @click="resetAttention">
          Kosongkan
        </v-btn>
      </form>

      <form @submit.prevent="addInterestsContent">
        <v-card width="600" title="I - INTEREST [MINAT]" subtitle="(Ayat untuk menarik minat orang membaca iklan anda)">
          <v-select v-model="cwStore.interest" :items="interestStore.interestContent" label="Pilihan Ayat"></v-select>
          <textarea id="message" rows="4" v-model="cwStore.interest"
            :error-messages="vi$.interestContent.$errors.map(e => e.$message)" required
            @input="vi$.interestContent.$touch" @blur="vi$.interestContent.$touch"
            class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Sila isi ayat disini..."></textarea>
        </v-card>

        <v-btn
          class="me-4 mx-4 my-4 inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
          @click="vi$.$validate" type="submit">
          Simpan
        </v-btn>
        <v-btn
          class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-red-700 rounded-lg focus:ring-4 focus:ring-red-200 dark:focus:ring-red-900 hover:bg-red-800"
          @click="resetInterest">
          Kosongkan
        </v-btn>
      </form>

      <form @submit.prevent="addDesiresContent">
        <v-card width="600" title="D - DESIRE [KEINGINAN]" subtitle="(Ayat untuk menarik pembaca membeli produk anda)">
          <v-select v-model="cwStore.desire" :items="desireStore.desireContent" label="Pilihan Ayat"></v-select>
          <textarea id="message" rows="4" v-model="cwStore.desire"
            :error-messages="vd$.desireContent.$errors.map(e => e.$message)" required @input="vd$.desireContent.$touch"
            @blur="vd$.desireContent.$touch"
            class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Sila isi ayat disini..."></textarea>
        </v-card>

        <v-btn
          class="me-4 mx-4 my-4 inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
          @click="vd$.$validate" type="submit">
          Simpan
        </v-btn>
        <v-btn
          class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-red-700 rounded-lg focus:ring-4 focus:ring-red-200 dark:focus:ring-red-900 hover:bg-red-800"
          @click="resetDesire">
          Kosongkan
        </v-btn>
      </form>

      <form @submit.prevent="addActionsContent">
        <v-card width="600" title="A - ACTION [TINDAKAN]" subtitle="(Maklumat mengenai cara membuat pembelian)">
          <v-select v-model="cwStore.action" :items="actionStore.attentionContent" label="Pilihan Ayat"></v-select>
          <textarea id="message" rows="4" v-model="cwStore.action"
            :error-messages="va$.actionContent.$errors.map(e => e.$message)" required @input="va$.actionContent.$touch"
            @blur="va$.actionContent.$touch"
            class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Sila isi ayat disini..."></textarea>
        </v-card>

        <v-btn
          class="me-4 mx-4 my-4 inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
          @click="v$.$validate" type="submit">
          Simpan
        </v-btn>
        <v-btn
          class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-red-700 rounded-lg focus:ring-4 focus:ring-red-200 dark:focus:ring-red-900 hover:bg-red-800"
          @click="resetAction">
          Kosongkan
        </v-btn>
      </form>

    </div>

    <!-- Dialog success -->
    <v-dialog transition="dialog-bottom-transition" width="auto" v-model="dialog">
      <template v-slot:default="{ isActive }">
        <v-card>
          <v-toolbar color="primary" title="Berjaya!"></v-toolbar>
          <v-card-text>
            <div class="text-h2 pa-12">Ayat berjaya disimpan!</div>
          </v-card-text>
          <v-card-actions class="justify-end">
            <v-btn variant="text" @click="isActive.value = false">Tutup</v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>

  </main>
</template>


<style scoped></style>
