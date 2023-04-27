<template>
  <h1>购物车</h1>
  <h1>商品数量{{ store.state.count }}</h1>
  <h1>商品总结{{ store.getters.totalPrice }}</h1>

  <button @click="addProd">添加商品数量+2</button>
  <button @click="asyncAddProd">异步添加商品数量+10</button>
</template>

<script setup>
import { useStore } from 'vuex'

let store = useStore()
function addProd() {
  store.commit('increment', 2)
}

function asyncAddProd() {
  store.dispatch('asyncAdd', 5)
}
</script>
