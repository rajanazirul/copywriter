<script setup lang="ts">
import Header from '@/views/Header.vue'
import attentionsData from '@/components/attentionsData.vue';
import { ref } from 'vue';

const dataView = ref('attention')
</script>

<template>
    <div class="py-7">
        <Header />
    </div>
    <button @click="() => { dataView = 'attention' }"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded mx-3 my-2">
        Attention Data
    </button>
    <button @click="() => { dataView = 'attention' }"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded mx-3 my-2">
        Interest Data
    </button>
    <button @click="() => { dataView = 'attention' }"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded mx-3 my-2">
        Desire Data
    </button>
    <button @click="() => { dataView = 'attention' }"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded mx-3 my-2">
        Action Data
    </button>

    <div v-if="dataView == 'attention'">
        <attentionsData />
    </div>
</template>

<style scoped></style>
