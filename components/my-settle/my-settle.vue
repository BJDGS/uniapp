<template>
  <view class="my-settle-container">
    <label class="radio">
      <radio :checked="isFullCheck" color="#C00000" @click="changeAllState"/><text></text>
    </label>
    <view class="amount-box">
      合计：
      <text class="amount">￥{{checkedGoodsAmount}}</text>
    </view>
    <view class="btn-settle">结算({{checkedCount}})</view>
  </view>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex'
  export default {
    name:"my-settle",
    data() {
      return {
        
      };
    },
    computed: {
      ...mapGetters('m_cart', ['checkedCount']),
      ...mapGetters('m_cart', ['total']),
      ...mapGetters('m_cart', ['checkedGoodsAmount']),
      isFullCheck() {
        // if (this.totle === this.checkedCount) return
        console.log(this.checkedCount)
        console.log(this.total)
        return this.total === this.checkedCount
      }
    },
    methods: {
      ...mapMutations('m_cart', ['updateAllGoodsState']),
      changeAllState() {
        this.updateAllGoodsState(!this.isFullCheck)
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