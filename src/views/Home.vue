<!--
 * @Description:
 * @Author: marlonchiu
 * @Date: 2023-03-10 12:05:04
 * @LastEditors: marlonchiu
 * @LastEditTime: 2023-04-25 21:12:10
-->
<template>
  <suspense>
    <template #fallback>
      <div class="loading">
        <Loading></Loading>
      </div>
    </template>
    <template #default>
      <h1>
        <HomeAsync></HomeAsync>
      </h1>
    </template>
  </suspense>
</template>

<script setup>
import { onMounted, defineAsyncComponent } from 'vue'
// import { getHomepage } from '@/api/index'
import Loading from '../components/Loading.vue'
const HomeAsync = defineAsyncComponent(() => import('../components/HomeCom.vue'))

onMounted(async () => {
  // const result = await getHomepage()
  // console.log(result)
})
</script>

<style lang="less" scoped></style>
