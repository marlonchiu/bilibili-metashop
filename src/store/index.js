import { createStore } from 'vuex'
// 创建一个新的 store 实例
const store = createStore({
  state() {
    return {
      count: 0,
      isFullscreen: false,
      buyCartList: []
    }
  },
  mutations: {
    increment(state, payload) {
      state.count += payload
    },
    setFullscreen(state, payload) {
      state.isFullscreen = payload
    },
    addBuyCarts(state, payload) {
      state.buyCartList.push(payload)
    },
    addBuyCartsNum(state, payload) {
      state.buyCartList[payload].num++
    },
    minusBuyCartsNum(state, payload) {
      state.buyCartList[payload].num--
      if (state.buyCartList[payload].num == 0) {
        state.buyCartList.splice(payload, 1)
      }
    }
  },
  getters: {
    totalPrice(state) {
      let total = state.buyCartList.reduce((pre, item) => {
        return pre + item.price * item.num
      }, 0)
      return total
    }
  },
  actions: {
    asyncAdd(store, payload) {
      setTimeout(() => {
        store.commit('increment', payload)
      }, 1000)
    }
  }
})

export default store
