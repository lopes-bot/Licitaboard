import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Selecionar from '../views/Selecionar.vue'
import Licitacoes from '../views/Licitacoes.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/selecionar',
    name: 'selecionar',
    component: Selecionar
  },
  {
    path: '/licitacoes',
    name: 'licitacoes',
    component: Licitacoes
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
