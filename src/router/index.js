import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "main" */ '@/views/home.vue')
  },
  {
    path: '/two',
    name: 'Two',
    component: () => import(/* webpackChunkName: "main" */ '@/views/two.vue')
  },
  {
    path: '/three',
    name: 'Three',
    component: () => import(/* webpackChunkName: "main" */ '@/views/three.vue')
  },
  {
    path: '/four',
    name: 'Four',
    component: () => import(/* webpackChunkName: "main" */ '@/views/four.vue')
  },
  {
    path: '/five',
    name: 'Five',
    component: () => import(/* webpackChunkName: "main" */ '@/views/five.vue')
  }
]

const router = new VueRouter({
  mode: 'hash',
  routes
})

export default router
