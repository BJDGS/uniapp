<template>
  <view class="cart-container">
    <my-address></my-address>
    <view class="cart-title">
      <uni-icons type="shop" size="20"></uni-icons>
      <text class="cart-title-text">购物车</text>
    </view>
    <!-- 1. 在block标签外面写的这个uni-swipe-action就可以给item加滑动效果, 滑动组合1 -->
    <uni-swipe-action v-if="cart.length !== 0">
      <block v-for="(item, i) in cart">
        <!-- radio-change自定义方法 -->
        <!-- 在每一个商品外面也写一个uni-swipe-action-item标签，滑动组合2 -->
        <!-- 教程是options没有滑动效果，看官方文档:right-options有效 -->
        <uni-swipe-action-item :right-options="options" @click="swipeActionClickHandler(item)">
          <my-goods :goods="item" :showRadio="true" :showNum="true" @radio-change="radioChangeHandler" @num-change="numberChangeHandler"></my-goods>
        </uni-swipe-action-item>
      </block>
    </uni-swipe-action>
    <view class="empty-cart" v-else>
      <image class="empty-img" src="/static/cart_empty@2x.png" mode=""></image>
      <text class="tip-text">空空如也~</text>
    </view>
    <my-settle></my-settle>
  </view>
</template>

<script>
  import badgeMix from '@/mixins/tabbar-badge.js'
  import { mapState, mapMutations } from 'vuex'
  export default {
    mixins: [badgeMix],
    computed: {
      ...mapState('m_cart', ['cart'])
    },
    data() {
      return {
        // 滑动删除效果数据
        options: [{
          text: '删除', // 显示的文本内容
          style: {
            backgroundColor: '#C00000' // 按钮的背景颜色
          }
        }]
      }
    },
    methods: {
      ...mapMutations('m_cart', ['updateGoodsState']),
      ...mapMutations('m_cart', ['updateGoodsCount', 'removeGoodsById']),
      radioChangeHandler(e) {
        // console.log(e)
        this.updateGoodsState(e)
      },
      numberChangeHandler(e) {
        this.updateGoodsCount(e)
        // this.updateGoodsState(e)
      },
      swipeActionClickHandler(item) {
        this.removeGoodsById(item.goods_id)
      }
    }
  }
</script>

<style lang="scss">
.cart-title {
  height: 40px;
  font-size: 14px;
  border-bottom: 1px solid #ccc;
  // line-height: 40px;
  display: flex;
  align-items: center;
  padding-left: 5px;
  text {
    margin-left: 8px;
  }
}
.cart-container {
  padding-bottom: 50px;
}
.empty-cart {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 150px;

  .empty-img {
    width: 90px;
    height: 90px;
  }

  .tip-text {
    font-size: 12px;
    color: gray;
    margin-top: 15px;
  }
}
</style>
