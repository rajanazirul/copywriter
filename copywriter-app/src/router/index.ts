import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import DefaultLayout from '../layouts/DefaultLayout.vue'
import CopywriteSelect from '../components/CopywriteSelect.vue'
import AddCategory from '../components/AddCategory.vue'
import DataView from '../views/DataView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'public',
      component: DefaultLayout,
      redirect: '/',
      children:[
        {
          path: '/',
          name: 'home',
          component: Home
        },
        {
          path: '/copywriting',
          name: 'copywriting',
          component: CopywriteSelect
        },
        {
          path: '/tambah-kategori',
          name: 'add_category',
          component: AddCategory
        },
        {
          path: '/lihat-data',
          name: 'dataview',
          component: DataView
        }
      ]
    },
    
  ]
})

export default router
