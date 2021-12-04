import { createRouter, createWebHashHistory } from 'vue-router'
import broghue from '../views/broghue.vue'
import mojarico from '../views/mojarico.vue'
import bakino from '../views/bakino.vue'


const routes = [
  {
    path: '/',
    redirect: '/broghue'
  },
  {
    name: 'Broghue',
    path: '/broghue',
    component: broghue
  },
  {
    name: 'Mojarico',
    path: '/mojarico',
    component: mojarico
  },
  {
    name: 'Bakino',
    path: '/bakino',
    component: bakino
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
