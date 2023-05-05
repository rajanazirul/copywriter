<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useCategoryStore } from '@/stores/category'

const categoryStore = useCategoryStore()

onMounted(() => {
    categoryStore.getCategories()
})
</script>

<template>
    <div class="category">
        <v-select v-model="categoryStore.category" :items="categoryStore.categories" label="Kategori Jualan" variant="outlined"></v-select>
    </div>
</template>

<style scoped></style>
