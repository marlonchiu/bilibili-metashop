import { createRouter, createWebHashHistory } from 'vue-router'

const Home = () => import('../views/Home.vue')
const Product = () => import('../views/Product.vue')
const BuyCart = () => import('../views/BuyCart.vue')
const Scene = () => import('../views/Scene.vue')

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
  },
  {
    path: '/buy-cart',
    name: 'buy-cart',
    component: BuyCart
  },
  {
    path: '/scene',
    name: 'scene',
    component: Scene
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
