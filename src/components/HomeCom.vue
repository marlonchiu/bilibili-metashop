<!--
 * @Description:
 * @Author: marlonchiu
 * @Date: 2023-04-21 22:24:02
 * @LastEditors: marlonchiu
 * @LastEditTime: 2023-04-25 21:02:45
-->
<template>
  <div class="home-page">
    <HomeSwiper :banner="state.banner"></HomeSwiper>
    <div class="live" v-if="state.sports.length !== 0">
      <h1>乐享生活100+</h1>
      <div class="live-list">
        <div class="live-item" v-for="index in 10" :key="state.sports[index].priority">
          <div class="live-btn">
            <img :src="state.sports[index].menuThumbnail" :alt="state.sports[index].displayName" />
            <h3>{{ state.sports[index].displayName }}</h3>
          </div>
        </div>
      </div>
      <a-button type="primary" size="large" @click="router.push('/product')">立即享受生活</a-button>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { getHomepage } from '@/api/index'
import HomeSwiper from './HomeSwiper.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const result = await getHomepage()
console.log('result: ', result)
const state = reactive({
  banner: result.banner,
  sports: result.sports
})
</script>

<style lang="less" scoped>
.home-page {
  padding-top: 46px;
  height: 575px;
  position: relative;
}

.live {
  width: 1200px;
  margin: 40px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 40px;
  h1 {
    font-size: 30px;
  }

  .live-list {
    display: flex;
    flex-wrap: wrap;
    .live-item {
      width: 240px;
    }
    .live-btn {
      display: flex;
      height: 73px;
      width: 200px;
      background-color: #fff;
      border-radius: 8px 8px 25px 8px;
      margin-bottom: 30px;
      box-shadow: 5px 5px 5px #ccc;
      align-items: center;
      justify-content: center;
      position: relative;
      img {
        position: absolute;
        width: 80px;
        height: 80px;
        left: -15px;
        top: -15px;
      }
      h3 {
        font-weight: 900;
        font-size: 20px;
      }
    }
  }
}
</style>
