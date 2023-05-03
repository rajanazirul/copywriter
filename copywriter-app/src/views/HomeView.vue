<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { v4 as uuidv4 } from 'uuid';
import { db } from '@/firebase'
import { collection, onSnapshot, addDoc } from 'firebase/firestore'

const todos = ref([])

const newToDoContent = ref('')

const addTodo = () => {
  const newToDo = {
    id: uuidv4(),
    content: newToDoContent.value,
    done: false
  }
  todos.value.unshift(newToDo)
  newToDoContent.value = ''
}

const deleteTodo = id => {
  todos.value = todos.value.filter(todo => todo.id !== id)
}

const toggleDone = id => {
  const index = todos.value.findIndex(todo => todo.id === id)
  todos.value[index].done = !todos.value[index].done
}

// Get Todos
onMounted(() => {
  onSnapshot(collection(db, 'todos'), (querySnapshot) => {
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
  <main>
    <div class="columns">
      <v-form @submit.prevent="addTodo">
        <v-text-field label="Label" v-model="newToDoContent"></v-text-field>
        <v-btn type="submit" :disabled="!newToDoContent">
          Add
        </v-btn>

      </v-form>
    </div>


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

    </div>

  </main>
</template>


<style scoped></style>
