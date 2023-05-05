<script setup lang="ts">

const weekday = ['Ahad','Isnin','Selasa','Rabu','Khamis','Jumaat','Sabtu']
const current = new Date();
const date = `${weekday[current.getDay()]} ${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()} ${current.getHours()}:${current.getMinutes()}`;

</script>

<template>
    <div class="digital_clock">
        <v-card class="mx-auto my-4" variant="outlined">
            <v-card-item>
                <div class="text-overline mb-1">
                    {{date}}
                </div>
            </v-card-item>
        </v-card>
    </div>
</template>

<style scoped></style>
