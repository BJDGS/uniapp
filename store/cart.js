export default {
  namespaced: true,
  state:() => ({
    // JSON.parse转化成数组
    cart: JSON.parse(uni.getStorageSync('cart') || '[]')
  }),
  getters: {
    total(state) {
      let c = 0
      state.cart.forEach(goods => c += goods.goods_count)
      return c
    }
  },
  mutations: {
    addToCart(state, goods) {
      const findResult = state.cart.find(x => { x.goods_id === goods.goods_id })
      if (!findResult) {
        state.cart.push(goods)
      } else {
        findResult.goods_count++
      }
      this.commit('m_cart/saveToStorage')
    },
    // 官方给的本地化存储方法
    saveToStorage(state) {
      // cart本地存储名称，JSON.stringify转换成字符串
      uni.setStorageSync('cart', JSON.stringify(state.cart))
    }
  },
}
