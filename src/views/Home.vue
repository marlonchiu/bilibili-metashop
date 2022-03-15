<template>
  <div class="home">
    <h1>首页</h1>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { getHomepage } from '@/api/index'

onMounted(async () => {
  const result = await getHomepage()
  console.log('result: ', result);
})
</script>
