<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { db } from '@/firebase'
import { collection, onSnapshot, addDoc, deleteDoc, doc, updateDoc, query, orderBy, limit } from 'firebase/firestore'


const todos = ref([])
const newToDoContent = ref('')
const todosCollectionRef = collection(db, 'todos')
const todosCollectionQuery = query(todosCollectionRef, orderBy('date', 'desc'), limit(9))

// TODO function with firebase
const addTodo = () => {
  addDoc(todosCollectionRef, {
    content: newToDoContent.value,
    done: false,
    date: Date.now()
  })
  newToDoContent.value = ''
}

const deleteTodo = id => {
  deleteDoc(doc(todosCollectionRef, id))
}

const toggleDone = id => {
  const index = todos.value.findIndex(todo => todo.id === id)

  updateDoc(doc(todosCollectionRef, id), {
    done: !todos.value[index].done
  })
}

// Get Todos
onMounted(() => {
  onSnapshot(todosCollectionQuery, (querySnapshot) => {
    const fbTodos = []
    querySnapshot.forEach((doc) => {
      const todo = {
        id: doc.id,
        content: doc.data().content,
        done: doc.data().done
      }
      fbTodos.push(todo)
    })
    todos.value = fbTodos
  })
})
</script>

<template>
  <div class="about">

    <!-- <v-form @submit.prevent="addTodo">
      <v-text-field label="Label" v-model="newToDoContent"></v-text-field>
      <v-btn type="submit" :disabled="!newToDoContent">
        Add
      </v-btn>
    </v-form>

    <div v-for="todo in todos" class="d-flex align-center flex-column">
      <div class="text-subtitle-2">{{ todo.content }}</div>
      <div>
        <v-card width="400" :title=todo.content
          :class="{ 'text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4': todo.done }">
          <v-col cols="auto">
            <button type="button" @click="toggleDone(todo.id)"
              class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 ">Done</button>
            <button type="button" @click="deleteTodo(todo.id)"
              class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Remove</button>
          </v-col>
        </v-card>
      </div>
    </div> -->

    <div class="grid h-screen place-items-center">

      <form>
        <div class="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
          <div class="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
            <label for="comment" class="sr-only">Ayat copywriting</label>
            <textarea id="comment" rows="4"
              class="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400 h-96"
              placeholder="Ayat copywriting..." required></textarea>
          </div>
          <div class="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
            <button type="submit"
              class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
              Jana Copywriting
            </button>
            <div class="flex pl-0 space-x-1 sm:pl-2">
              <button type="submit"
                class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-red-700 rounded-lg focus:ring-4 focus:ring-red-200 dark:focus:ring-red-900 hover:bg-red-800">
                Simpan Copywriting
              </button>
            </div>
          </div>
        </div>
      </form>
      <p class="ml-auto text-xs text-gray-500 dark:text-gray-400">Remember, contributions to this topic should follow our
        <a href="#" class="text-blue-600 dark:text-blue-500 hover:underline">Community Guidelines</a>.
      </p>

    </div>

  </div>
</template>

<style>
@media (min-width: 1024px) {}
</style>
