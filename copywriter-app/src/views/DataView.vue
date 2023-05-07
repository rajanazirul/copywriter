<script setup lang="ts">
import Header from '@/views/Header.vue'
import attentionsData from '@/components/attentionsData.vue';
import interestsData from '@/components/interestsData.vue';
import desiresData from '@/components/desiresData.vue';
import actionsData from '@/components/actionsData.vue';
import copywritesData from '@/components/copywritesData.vue';
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
    <button @click="() => { dataView = 'interest' }"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded mx-3 my-2">
        Interest Data
    </button>
    <button @click="() => { dataView = 'desire' }"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded mx-3 my-2">
        Desire Data
    </button>
    <button @click="() => { dataView = 'action' }"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded mx-3 my-2">
        Action Data
    </button>
    <button @click="() => { dataView = 'copywrites' }"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded mx-3 my-2">
        Copywriting Data
    </button>
    

    <div v-if="dataView == 'attention'">
        <attentionsData />
    </div>
    <div v-if="dataView == 'interest'">
        <interestsData />
    </div>
    <div v-if="dataView == 'desire'">
        <desiresData />
    </div>
    <div v-if="dataView == 'action'">
        <actionsData />
    </div>
    <div v-if="dataView == 'copywrites'">
        <copywritesData />
    </div>
</template>

<style scoped></style>
