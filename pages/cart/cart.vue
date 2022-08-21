<template>
  <view>
    <view class="cart-title">
      <uni-icons type="shop" size="20"></uni-icons>
      <text class="cart-title-text">购物车</text>
    </view>
    <!-- 1. 在block标签外面写的这个uni-swipe-action就可以给item加滑动效果, 滑动组合1 -->
    <uni-swipe-action>
      <block v-for="(item, i) in cart">
        <!-- radio-change自定义方法 -->
        <!-- 在每一个商品外面也写一个uni-swipe-action-item标签，滑动组合2 -->
        <!-- 教程是options没有滑动效果，看官方文档:right-options有效 -->
        <uni-swipe-action-item :right-options="options" @click="swipeActionClickHandler(item)">
          <my-goods :goods="item" :showRadio="true" :showNum="true" @radio-change="radioChangeHandler" @num-change="numberChangeHandler"></my-goods>
        </uni-swipe-action-item>
      </block>
    </uni-swipe-action>
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
</style>
