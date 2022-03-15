<template>
  <div class="home">
    <h1>商品</h1>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { getProducts } from '@/api/index'

onMounted(async () => {
  const result = await getProducts()
  console.log('products: ', result);
})
</script>
