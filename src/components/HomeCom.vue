<template>
  <div>异步首页</div>
  <ul>
    <li v-for="(item, index) in hero" :key="index">{{ item.name }}</li>
  </ul>
</template>

<script setup>
import { reactive } from 'vue'
import { getHomepage } from '@/api/index'

const result = await getHomepage()
const hero = reactive(result.hero)
console.log('result: ', result)
</script>
