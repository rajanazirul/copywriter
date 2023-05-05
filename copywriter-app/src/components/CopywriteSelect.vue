<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import Category from '@/components/Category.vue'
import { useCopywritingStore } from '@/stores/copywriting'
import useClipboard from 'vue-clipboard3'
import { useCategoryStore } from '@/stores/category'
import Header from '@/views/Header.vue'

const copywritingStore = useCopywritingStore()
const categoryStore = useCategoryStore()

const content = ref('')

const { toClipboard } = useClipboard()

const copy = async () => {
    try {
        await toClipboard(content.value)
        console.log('Copied to clipboard')
    } catch (e) {
        console.error(e)
    }
}

onMounted(() => {
    copywritingStore.getCopywrite()
})

watch(() => categoryStore.category, () => {
    copywritingStore.getCopywrite()
}, { immediate: true });
</script>

<template>
    <div>
        <div class="py-7">
            <Header />
        </div>
        <div>
            <div>
                <Category />
            </div>

            <div>
                <v-select v-model="content" :items="copywritingStore.copywritesContent" label="Pilihan Ayat"
                    variant="outlined"></v-select>
            </div>

            <div class="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                <div class="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
                    <label class="sr-only">Ayat copywriting</label>
                    <textarea rows="4" v-model="content"
                        class="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400 h-96"
                        placeholder="Ayat copywriting..."></textarea>
                </div>
                <div class="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
                    <button @click="copy"
                        class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
                        Copy Clipboard
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
