<template>
  <view class="my-settle-container">
    <label class="radio">
      <radio :checked="isFullCheck" color="#C00000" @click="changeAllState"/><text></text>
    </label>
    <view class="amount-box">
      合计：
      <text class="amount">￥{{checkedGoodsAmount}}</text>
    </view>
    <view class="btn-settle" @click="settlement">结算({{checkedCount}})</view>
  </view>
</template>

<script>
  import { mapGetters, mapMutations, mapState } from 'vuex'
  export default {
    name:"my-settle",
    data() {
      return {
        seconds: 5,
        timer: null
      };
    },
    computed: {
      ...mapGetters('m_cart', ['checkedCount', 'total', 'checkedGoodsAmount']),
      ...mapGetters('m_user', ['addstr']),
      ...mapState('m_user', ['token']),
      isFullCheck() {
        // if (this.totle === this.checkedCount) return
        console.log(this.checkedCount)
        console.log(this.total)
        return this.total === this.checkedCount
      }
    },
    methods: {
      ...mapMutations('m_cart', ['updateAllGoodsState']),
      ...mapMutations('m_user', ['updateRedirectInfo']),
      changeAllState() {
        this.updateAllGoodsState(!this.isFullCheck)
      },
      settlement() {
        if (!this.checkedCount) return uni.$showMsg('请选择要结算的商品！')
        if (!this.addstr) return uni.$showMsg('请选择收货地址！')
        // if (!this.token) return uni.$showMsg('请先登录！')
        if (!this.token) return this.delayNavigate()
      },
      // 展示倒计时的提示消息
      showTips(n) {
        uni.showToast({
          icon: 'none',
          title: '请登录后再结算！' + n + '秒之后自动跳转到登录页',
          mask: true,
          duration: 1500
        })
      },
      delayNavigate() {
        this.seconds = 5
        this.showTips(this.seconds)
        this.timer = setInterval(() => {
          this.showTips(this.seconds)
          this.seconds--
          if (this.seconds <= 0) {
            clearInterval(this.timer)
            uni.switchTab({
              url: '/pages/my/my',
              success: () => {
                this.updateRedirectInfo({
                  openType: 'switchTab',
                  from: '/pages/cart/cart'
                })
              }
            })
            return
          }
          this.showTips(this.seconds)
        }, 1000)
      }
    }
  }
</script>

<style lang="scss">
.my-settle-container {
  height: 50px;
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  // padding-left: 10px;
  font-size: 14px;
  z-index: 99;
  .radio {
    padding-left: 10px;
  }
  .amount-box {
    .amount {
      color: #c00000;
      font-weight: 600;
    }
  }
  .btn-settle {
    width: 100px;
    height: 50px;
    background-color: #c00000;
    display: flex;
    justify-content: center;
    align-items: center;
    color: aliceblue;
  }
}
</style>