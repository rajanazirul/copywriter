<script setup lang="ts">
import { RouterLink } from 'vue-router'

</script>

<template>
    <nav>
        <div>
            <v-btn>
                <RouterLink to="/" class="text-black">
                    Home
                </RouterLink>
            </v-btn>
        </div>
        <div>
            <v-btn>
                <RouterLink to="/copywriting" class="text-black">
                    Pilihan Ayat copywriting
                </RouterLink>
            </v-btn>
        </div>
    </nav>
</template>

<style scoped></style>
