<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useCategoryStore } from '@/stores/category'

const categoryStore = useCategoryStore()

const categorySubmit = ref()

onMounted(() => {
    categoryStore.getCategories()
})
</script>

<template>
    <div class="category">
        <v-select v-model="categoryStore.category" :items="categoryStore.categories" label="Pilihan Ayat" variant="outlined"></v-select>
        <h1>{{ categorySubmit }}</h1>

    </div>
</template>

<style scoped></style>
