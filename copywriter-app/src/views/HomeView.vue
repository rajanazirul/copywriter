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

    <div v-for="todo in todos" class="d-flex align-center flex-column" :class="{ 'has-background-success-light': todo.done}">

      <div class="text-subtitle-2">{{ todo.content }}</div>

      <div>
        <v-card width="400" :title=todo.content>
          <v-col cols="auto">
            <v-btn @click="deleteTodo(todo.id)" icon="mdi-plus"></v-btn>
            <v-btn icon="mdi-plus"></v-btn>
          </v-col>
        </v-card>
      </div>


    </div>

  </main>
</template>


<style scoped></style>
