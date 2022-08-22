export default {
  namespaced: true,
  state: () => ({
    // 1. 读取本地数据对象， 2. 空对象
    address: JSON.parse(uni.getStorageSync('address') || '{}'),
    // token: uni.getStorageSync('token') || '',
    token: uni.getStorageSync('token') || '',
    userinfo: JSON.parse(uni.getStorageSync('userinfo') || '{}'),
    redirectInfo: null
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
    saveUserInfoToStorage(state) {
      uni.setStorageSync('userinfo', JSON.stringify(state.userinfo))
    },
    saveTokenToStorage(state) {
      uni.setStorageSync('token', state.token)
    },
    updateAddress(state, address) {
      state.address = address
      this.commit('m_user/saveAddressToStorage')
    },
    updateUserInfo(state, userinfo) {
      state.userinfo = userinfo
      this.commit('m_user/saveUserInfoToStorage')
    },
    updateToken(state, token) {
      state.token = token
      this.commit('m_user/saveTokenToStorage')
    },
    updateRedirectInfo(state, info) {
      state.redirectInfo = info
    }
  }
}