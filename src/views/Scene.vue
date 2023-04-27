<template>
  <div class="scene" id="scene"></div>
</template>

<script setup>
import Base3d from '../utils/Base3d.js'
import { reactive, onMounted } from 'vue'

const state = reactive({
  base3d: {}
})

const onFinish = () => {
  console.log('finish')
}

onMounted(() => {
  state.base3d = new Base3d('#scene', onFinish)
})
</script>
