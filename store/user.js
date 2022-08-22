export default {
  namespaced: true,
  state: () => ({
    // 1. 读取本地数据对象， 2. 空对象
    address: JSON.parse(uni.getStorageSync('address') || '{}')
  }),
  getters: {
    addstr(state) {
      if (!state.address.provinceName) return ''
      return state.address.provinceName + state.address.cityName + state.address.countyName + state.address.detailInfo
    },
  },
  mutations: {
    // 官方给的方法，持久化存储到本地
    saveAddressToStorage(state) {
      // address本地存储名称，JSON.stringify转换成字符串
      uni.setStorageSync('address', JSON.stringify(state.address))
    },
    updateAddress(state, address) {
      state.address = address
      this.commit('m_user/saveAddressToStorage')
    }
  }
}