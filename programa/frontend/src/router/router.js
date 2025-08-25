import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import RulesPage from '../views/RulesPage.vue'
import GamePage from '../views/GamePage.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/rules',
    name: 'Rules',
    component: RulesPage
  },
  {
    path: '/game',
    name: 'Game',
    component: GamePage
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router