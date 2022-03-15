import { createStore } from 'vuex'
// 创建一个新的 store 实例
const store = createStore({
  state() {
    return {
      count: 0
    }
  },
  mutations: {
    increment(state, payload) {
      state.count += payload
    }
  },
  getters: {
    totalPrice(state) {
      return state.count * 98.8
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
