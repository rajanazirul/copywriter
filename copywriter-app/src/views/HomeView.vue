<script setup lang="ts">
import { ref } from 'vue';
import { v4 as uuidv4 } from 'uuid';

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

    <div class="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4">
      <div class="flex-shrink-0">
        <img class="h-12 w-12" src="@/assets/logo.svg" alt="ChitChat Logo">
      </div>
      <div>
        <div class="text-xl font-medium text-black">ChitChat</div>
        <p class="text-gray-500">You have a new message!</p>
      </div>
    </div>

    <div v-for="todo in todos" class="d-flex align-center flex-column" :class="{ 'has-background-success-light': to }">

      <div class="text-subtitle-2">{{ todo.content }}</div>

      <div>
        <v-card width="400" :title=todo.content>
          <v-col cols="auto">
            <button type="button"
              @click=""
              class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 ">Done</button>
            <button type="button"
              @click="deleteTodo(todo.id)"
              class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Remove</button>
          </v-col>
        </v-card>
      </div>

    </div>

  </main>
</template>


<style scoped></style>
