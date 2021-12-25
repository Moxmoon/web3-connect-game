import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '@/views/home.vue')
  },
  {
    path: '/two',
    name: 'Two',
    component: () => import(/* webpackChunkName: "about" */ '@/views/two.vue')
  },
  {
    path: '/three',
    name: 'Three',
    component: () => import(/* webpackChunkName: "about" */ '@/views/three.vue')
  },
  {
    path: '/four',
    name: 'Four',
    component: () => import(/* webpackChunkName: "about" */ '@/views/four.vue')
  },
  {
    path: '/five',
    name: 'Five',
    component: () => import(/* webpackChunkName: "about" */ '@/views/five.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
