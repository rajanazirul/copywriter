<script setup lang="ts">
import { onMounted } from 'vue';
import { useCategoryStore } from '@/stores/category'
import Header from '@/views/Header.vue'

const categoryStore = useCategoryStore()

onMounted(() => {
    categoryStore.getCategories()
})
</script>

<template>
    <div>
        <div class="py-7">
            <Header />
        </div>
        <div>
            <v-select v-model="categoryStore.category" :items="categoryStore.categories" label="Kategori Jualan"
                variant="outlined"></v-select>
        </div>
    </div>
</template>

<style scoped></style>
