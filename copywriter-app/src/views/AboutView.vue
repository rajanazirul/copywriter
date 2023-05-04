<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { db } from '@/firebase'
import { collection, deleteDoc, doc, addDoc } from 'firebase/firestore'
import { useAttentionsStore } from '@/stores/attentions'
import { useCopywritingStore } from '@/stores/copywriting';

const cwStore = useCopywritingStore()

const attentionsCollectionRef = collection(db, 'attentions')

const attentionStore = useAttentionsStore()

const alert = ref()
const dialog = ref(false)
const dialog1 = ref(false)

const content = ref('')

const deleteContent = id => {
  deleteDoc(doc(attentionsCollectionRef, id))
}

const checkCw = () => {
  alert.value = cwStore.validateCopywriting()
  if (alert.value == true) {
    content.value = cwStore.copywritingContent
  }
  else {
    dialog.value = true
  }
}

// Add content copywriting
const copywriteCollectionRef = collection(db, 'copywrite')
const addCopywriteContent = () => {
  alert.value = cwStore.validateCopywriting()
  if ((content.value == '') || (alert.value == false)) {
    dialog.value = true
  }
  else {
    addDoc(copywriteCollectionRef, {
      content: content.value,
      group: cwStore.group,
      category: cwStore.category,
      user: cwStore.user,
      date: Date.now()
    })
    content.value = ''
    dialog1.value = true
  }
}

// Get attentions
onMounted(() => {
  attentionStore.getAttentions()
})
</script>

<template>
  <div class="about">

    <!-- Dialog -->
    <div class="text-center">
      <v-dialog v-model="dialog" width="auto">
        <v-card>
          <v-card-text>
            Maklumat AYAT disalah satu kotak A-Attention, I-Interest, D-Desire, A-Action tidak DIISI
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" block @click="dialog = false">Tutup</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>

    <!-- Dialog success -->
    <v-dialog
        transition="dialog-bottom-transition"
        width="auto"
        v-model="dialog1"
      >
        <template v-slot:default="{ isActive }">
          <v-card>
            <v-toolbar
              color="primary"
              title="Berjaya!"
            ></v-toolbar>
            <v-card-text>
              <div class="text-h2 pa-12">Ayat berjaya disimpan!</div>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn
                variant="text"
                @click="isActive.value = false"
              >Tutup</v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
    <!-- <div v-for="todo in attentionStore.attentions" class="d-flex align-center flex-column">
      <div>
        <v-card width="400" :title=todo.id>
          <v-col cols="auto">
            <button type="button" @click="deleteContent(todo.id)"
              class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Remove</button>
          </v-col>
        </v-card>
      </div>
    </div> -->

    <div class="grid h-screen place-items-center">

      <div class="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
        <div class="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
          <label for="comment" class="sr-only">Ayat copywriting</label>
          <textarea id="comment" rows="4" v-model="content"
            class="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400 h-96"
            placeholder="Ayat copywriting..."></textarea>
        </div>
        <div class="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
          <form @submit.prevent="checkCw()">
            <button type="submit"
              class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
              Jana Copywriting
            </button>
          </form>
          <div class="flex pl-0 space-x-1 sm:pl-2">
            <button @click="addCopywriteContent"
              class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-red-700 rounded-lg focus:ring-4 focus:ring-red-200 dark:focus:ring-red-900 hover:bg-red-800">
              Simpan Copywriting
            </button>
          </div>
        </div>
      </div>
      <p class="ml-auto text-xs text-gray-500 dark:text-gray-400">Sistem aplikasi copywriting dilengkapi database
        <a href="#" class="text-blue-600 dark:text-blue-500 hover:underline">Hak Cipta terpelihara</a>.
      </p>

    </div>

  </div>
</template>

<style>
@media (min-width: 1024px) {}
</style>
