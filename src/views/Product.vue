<template>
  <div class="loading" v-show="state.isLoading">
    <Loading :progress="state.progress"></Loading>
  </div>
  <div class="product" v-show="!state.isLoading" id="product">
    <template v-if="state.products[state.pIndex]">
      <div
        class="desc"
        :class="{ active: state.descIndex === idx }"
        v-for="(desc, idx) in state.products[state.pIndex].desc"
        :key="idx"
      >
        <h1 class="title">{{ desc.title }}</h1>
        <p class="content">{{ desc.content }}</p>
      </div>
    </template>

    <div class="prod-list" :class="{ hidden: store.state.isFullscreen }">
      <h1><SketchOutlined></SketchOutlined>产品推荐</h1>
      <div class="products">
        <div
          class="prod-item"
          :class="{ active: state.pIndex === pIdx }"
          v-for="(prod, pIdx) in state.products"
          :key="prod.id"
          @click="changeModel(prod, pIdx)"
        >
          <div class="prod-title">
            {{ prod.title }}
          </div>
          <div class="img">
            <img :src="prod.imgsrc" :alt="prod.title" />
          </div>
          <a-button type="primary" block @click.stop="addBuyCart(prod)">
            <template #icon>
              <ShoppingCartOutlined></ShoppingCartOutlined>
            </template>
            加入购物车
          </a-button>
        </div>
      </div>
    </div>
    <div class="scene-list" :class="{ hidden: store.state.isFullscreen }">
      <h3><RadarChartOutlined></RadarChartOutlined> 切换使用场景</h3>
      <div class="scenes">
        <div
          class="scene-item"
          v-for="(scene, sIdx) in state.scenes"
          :key="`${scene}__${sIdx}`"
          @click="changeHdr(scene, sIdx)"
        >
          <img :class="{ active: state.sceneIndex === sIdx }" :src="`./files/hdr/${scene}.jpg`" :alt="scene" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, onUnmounted } from 'vue'
import { getProducts } from '@/api/index'
import { useStore } from 'vuex'
import { SketchOutlined, RadarChartOutlined, ShoppingCartOutlined } from '@ant-design/icons-vue'
import Loading from '../components/Loading.vue'
import Base3d from '../utils/Base3d.js'

const store = useStore()
// console.log(route);
const state = reactive({
  products: [],
  isLoading: true,
  scenes: [],
  pIndex: 0,
  sceneIndex: 0,
  base3d: {},
  descIndex: 0,
  progress: 0
})

function LoadingFinish() {
  state.isLoading = false
}

onMounted(async () => {
  let result = await getProducts()
  console.log(result)
  state.isLoading = false
  state.products = result.list
  state.scenes = result.hdr
  state.base3d = new Base3d('#product', LoadingFinish)
  state.base3d.onProgress((e) => {
    let progressNum = e.loaded / e.total
    progressNum = progressNum.toFixed(2) * 100
    state.progress = progressNum
    // console.log(progressNum)
  })
})

function changeModel(prod, index) {
  state.pIndex = index
  state.base3d.setModel(prod.modelName)
}

function changeHdr(scene, index) {
  state.sceneIndex = index
  state.base3d.setEnvMap(scene)
}

function addBuyCart(prod) {
  let product = { ...prod, num: 1 }
  let index = 0
  let isExist = store.state.buyCartList.some((item, i) => {
    if (product.id == item.id) {
      index = i
      return true
    } else {
      return false
    }
  })
  if (isExist) {
    store.commit('addBuyCartsNum', index)
  } else {
    store.commit('addBuyCarts', product)
  }
}

window.addEventListener('mousewheel', (e) => {
  if (e.deltaY > 0) {
    store.commit('setFullscreen', true)
  } else if (e.deltaY < 0) {
    store.commit('setFullscreen', false)
  }
})

window.addEventListener('mousewheel', (e) => {
  let duration = state.base3d.animateAction._clip.duration
  let time = state.base3d.animateAction.time
  let index = Math.floor((time / duration) * 4)
  state.descIndex = index
})

// onUnmounted(() => {
//   window.removeEventListener('mousewheel')
// })
</script>

<style lang="less" scoped>
.desc {
  position: fixed;
  z-index: 100000;
  background-color: rgba(255, 255, 255, 0.5);
  width: 600px;
  top: 100px;
  left: 50%;
  margin-left: -300px;
  transition: all 0.5s;

  transform: translate(-100vw, 0);
  padding: 15px;
}
.desc.active {
  transform: translate(0, 0);
}
.prod-list {
  width: 300px;
  height: 100vh;
  padding: 60px 0 0;
  position: fixed;
  z-index: 100000;
  transition: all 0.5s;
  background-color: rgba(255, 255, 255, 0.8);
  left: 0;
  top: 0;
  h1 {
    font-size: 20px;
    font-weight: 900;
    padding: 10px 25px 0;
  }
  .products {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .prod-item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 250px;
      background-color: #fff;
      border-radius: 20px;
      overflow: hidden;
      margin: 10px 0;
      box-shadow: 2px 2px 5px #666;
      transition: all 0.3s;
      &.active {
        box-shadow: 2px 2px 5px #666, 0px 0px 10px red;
      }
      &:hover {
        transform: translate(0px, -5px);
        box-shadow: 2px 2px 5px #666, 0px 0px 10px orangered;
        // background-color: orange;
      }
      img {
        width: 190px;
      }
      .prod-title {
        padding: 0 20px;
      }
    }
  }
}
.prod-list.hidden {
  transform: translate(-100%, 0);
}
.scene-list {
  width: 300px;
  height: 100vh;
  padding: 60px 0 0;
  position: fixed;
  z-index: 100000;
  transition: all 0.5s;
  background-color: rgba(255, 255, 255, 0.8);
  right: 0;
  top: 0;
  h3 {
    font-size: 20px;
    font-weight: 900;
    padding: 0 30px;
  }
  .scenes {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .scene-item {
    padding: 6px 0;

    img {
      width: 250px;
      border-radius: 10px;
      box-shadow: 2px 2px 10px #666;
      transition: all 0.3s;
      &.active {
        box-shadow: 2px 2px 5px #666, 0px 0px 10px red;
      }
      &:hover {
        transform: translate(0px, -5px);
        box-shadow: 2px 2px 5px #666, 0px 0px 10px orangered;
      }
    }
  }
}
.scene-list.hidden {
  transform: translate(100%, 0);
}
</style>
