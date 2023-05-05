<script setup lang="ts">
import { RouterLink } from 'vue-router'

</script>

<template>
    <nav>
        <div>
            <v-btn class="my-2">
                <RouterLink to="/" class="text-black">
                    Home
                </RouterLink>
            </v-btn>
        </div>
        <div>
            <v-btn class="my-2">
                <RouterLink to="/copywriting" class="text-black">
                    Pilihan Ayat copywriting
                </RouterLink>
            </v-btn>
        </div>
        <div>
            <v-btn class="my-2">
                <RouterLink to="/tambah-kategori" class="text-black">
                    Tambah Kategori
                </RouterLink>
            </v-btn>
        </div>
    </nav>
</template>

<style scoped></style>
