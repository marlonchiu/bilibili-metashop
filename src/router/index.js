import { createRouter, createWebHashHistory } from 'vue-router'

const Home = () =>  import('../views/Home.vue')
const Product = () => import('../views/Product.vue')

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/product',
    name: 'product',
    component: Product
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
