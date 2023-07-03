<script setup lang="ts">
import ContentView from '@/views/ContentView.vue'
import CopywriteView from '@/views/CopywriteView.vue'
</script>

<template>
    <div class="home">
        <div>
            <ContentView />
        </div>

        <div>
            <CopywriteView />
        </div>
    </div>
</template>

<style scoped>
@media (min-width: 1024px) {
    .home body {
        display: flex;
        place-items: center;
    }

    .home {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 10%;
        padding: 0 2rem;
    }
}
</style>
