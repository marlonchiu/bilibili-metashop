<template>
  <Header></Header>
  <router-view></router-view>
</template>

<script setup>
import Header from '@/components/Header.vue'
import { useRoute, useRouter } from 'vue-router'
// 获取路由信息
let route = useRoute()
// 执行路由的跳转
let router = useRouter()
</script>

<style>
.ant-menu-submenu {
  z-index: 1000000000 !important;
}

body .ant-menu-sub .ant-menu-item {
  height: auto;
}
.ant-menu-sub .ant-menu-item .prod-item {
  display: flex;
  width: 400px;
  justify-content: space-between;
}
.ant-menu .prod-item img {
  width: 100px;
  height: 100px;
}
.ant-menu-item .prod-item .middle {
  width: 220px;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.ant-menu-item .prod-item .middle .title {
  font-size: 16px;
  font-weight: 900;
}
.ant-menu-item .prod-item .middle .content {
  display: flex;
  justify-content: space-between;
}
.ant-menu-item .prod-item .middle .btn {
  display: inline-block;
  width: 30px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  border: 1px solid #ccc;
  margin: 0 5px;
}
.ant-menu-item .prod-item .right .price {
  font-weight: 900;
  color: orange;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.ant-menu-item .total {
  font-weight: 900;
  display: flex;
  justify-content: flex-end;
  font-size: 16px;
}
.ant-menu-item .total .num {
  color: orange;
  padding-right: 20px;
}
</style>
